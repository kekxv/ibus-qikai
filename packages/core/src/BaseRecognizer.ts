import { RecognitionCandidate, RecognitionResult, RecognizerOptions } from './types';

export abstract class BaseRecognizer {
  protected dictionary: string[] = [];
  protected topK: number;

  // 用于复用的离线画布和缓冲区
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private offscreenCtx: CanvasRenderingContext2D | null = null;
  private floatDataBuffer: Float32Array | null = null;

  constructor(options: RecognizerOptions) {
    this.topK = options.topK || 10;
  }

  // 子类需要实现的初始化字典方法
  abstract init(modelPath: string, options?: any): Promise<void>;

  /**
   * 释放资源
   */
  dispose() {
    this.dictionary = [];
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.floatDataBuffer = null;
  }

  protected async loadDictFromContent(content: string, dictPath: string) {
    if (content.includes('<html') || content.includes('<!DOCTYPE')) {
      console.error(`字典内容非法 (HTML): ${dictPath}`, content.substring(0, 200));
      throw new Error(`字典加载失败：路径 "${dictPath}" 返回了 HTML 页面而非文本。请检查路径配置是否指向了正确的 .txt 文件。`);
    }
    this.dictionary = ['', ...content.split(/\r?\n/)];
  }

  protected getPreprocessingCanvas(source: HTMLCanvasElement, signal?: AbortSignal): { data: Float32Array; width: number; height: number } {
    const box = this.getBoundingBox(source, signal);
    const imgH = 48;
    const imgW = 128; // 降低宽度到 128，单字符绰绰有余，且能极大减少内存压力

    if (signal?.aborted) throw new Error('Aborted');

    if (!this.offscreenCanvas) {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = imgW;
      this.offscreenCanvas.height = imgH;
      this.offscreenCtx = this.offscreenCanvas.getContext('2d')!;
    }
    
    const ctx = this.offscreenCtx!;
    ctx.fillStyle = 'rgb(128, 128, 128)';
    ctx.fillRect(0, 0, imgW, imgH);

    if (box) {
      const padding = 6;
      const availableH = imgH - padding * 2;
      const scale = availableH / box.h;
      const drawW = box.w * scale;
      const drawH = availableH;
      const dx = (imgW - drawW) / 2;
      const dy = padding;
      
      ctx.drawImage(source, box.x, box.y, box.w, box.h, dx, dy, drawW, drawH);
    }

    if (signal?.aborted) throw new Error('Aborted');

    const imageData = ctx.getImageData(0, 0, imgW, imgH);
    const { data } = imageData;
    
    const bufferSize = 1 * 3 * imgH * imgW;
    if (!this.floatDataBuffer || this.floatDataBuffer.length !== bufferSize) {
      this.floatDataBuffer = new Float32Array(bufferSize);
    }
    const floatData = this.floatDataBuffer;
    
    for (let i = 0; i < imgH * imgW; i++) {
      const r = data[i * 4]! / 255.0;
      const g = data[i * 4 + 1]! / 255.0;
      const b = data[i * 4 + 2]! / 255.0;
      floatData[i] = (b - 0.5) / 0.5;
      floatData[imgH * imgW + i] = (g - 0.5) / 0.5;
      floatData[2 * imgH * imgW + i] = (r - 0.5) / 0.5;
    }

    return { data: floatData, width: imgW, height: imgH };
  }

  private getBoundingBox(canvas: HTMLCanvasElement, signal?: AbortSignal) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    
    // 限制读取范围以减少内存消耗，尤其是针对极大的画布
    const scanW = canvas.width;
    const scanH = canvas.height;
    
    const imageData = ctx.getImageData(0, 0, scanW, scanH);
    const data = imageData.data;
    let minX = scanW, minY = scanH, maxX = 0, maxY = 0;
    let hasContent = false;
    
    // 步进扫描以加速检测，且在高分屏下非常必要
    const step = 4; // 增加步长到 4 以进一步提升速度和降低处理负担
    for (let y = 0; y < scanH; y += step) {
      // 每一行扫描检查一次中断信号，确保极速响应
      if (y % (step * 5) === 0 && signal?.aborted) throw new Error('Aborted');

      for (let x = 0; x < scanW; x += step) {
        if (data[(y * scanW + x) * 4 + 3]! > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          hasContent = true;
        }
      }
    }
    return hasContent ? { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 } : null;
  }

  protected postProcess(outputData: Float32Array, dims: number[]): RecognitionResult {
    const [_, seqLen, dictSize] = dims;
    let bestT = -1;
    let maxNonBlank = -1;

    for (let t = 0; t < seqLen!; t++) {
      const blankProb = outputData[t * dictSize! + 0]!;
      const nonBlank = 1.0 - blankProb;
      if (nonBlank > maxNonBlank) {
        maxNonBlank = nonBlank;
        bestT = t;
      }
    }

    if (bestT === -1 || maxNonBlank < 0.001) return { candidates: [] };

    const frameStart = bestT * dictSize!;
    
    // 优化：不再使用 Array.from，改为手动循环
    const items: { index: number; prob: number }[] = [];
    
    // 我们只需要前 topK 个候选者，不需要排序整个 18k 长度的数组
    // 这里先过滤出有意义的候选者（索引 0 是空白占位符，跳过）
    const threshold = 0.0001 * maxNonBlank;
    for (let i = 1; i < dictSize!; i++) {
        const prob = outputData[frameStart + i]!;
        if (prob > threshold) {
            items.push({ index: i, prob });
        }
    }
    
    items.sort((a, b) => b.prob - a.prob);
    
    return {
      candidates: items.slice(0, this.topK).map(item => ({
        character: this.dictionary[item.index] || '?',
        score: item.prob / maxNonBlank
      }))
    };
  }
}
