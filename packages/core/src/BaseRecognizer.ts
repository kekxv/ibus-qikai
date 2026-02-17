import { RecognitionCandidate, RecognitionResult, RecognizerOptions } from './types';

export abstract class BaseRecognizer {
  protected dictionary: string[] = [];
  protected topK: number;

  constructor(options: RecognizerOptions) {
    this.topK = options.topK || 10;
  }

  // 子类需要实现的初始化字典方法
  abstract init(modelPath: string, options?: any): Promise<void>;

  protected async loadDictFromContent(content: string) {
    this.dictionary = ['', ...content.split(/\r?\n/)];
  }

  protected getPreprocessingCanvas(source: HTMLCanvasElement): { data: Float32Array; width: number; height: number } {
    const box = this.getBoundingBox(source);
    const imgH = 48;
    const imgW = 128;
    
    const offscreen = document.createElement('canvas');
    offscreen.width = imgW;
    offscreen.height = imgH;
    const ctx = offscreen.getContext('2d')!;
    
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

    const imageData = ctx.getImageData(0, 0, imgW, imgH);
    const { data } = imageData;
    const floatData = new Float32Array(1 * 3 * imgH * imgW);
    
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

  private getBoundingBox(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    let hasContent = false;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        if (data[(y * canvas.width + x) * 4 + 3]! > 0) {
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

    const frameData = outputData.slice(bestT * dictSize!, (bestT + 1) * dictSize!);
    return {
      candidates: Array.from(frameData)
        .map((prob, index) => ({ index, prob }))
        .filter(c => c.index !== 0)
        .sort((a, b) => b.prob - a.prob)
        .slice(0, this.topK)
        .map(c => ({
          character: this.dictionary[c.index] || '?',
          score: c.prob / maxNonBlank
        }))
    };
  }
}
