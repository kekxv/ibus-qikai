import * as ort from 'onnxruntime-web';
import { BaseRecognizer } from './BaseRecognizer';
import { RecognitionResult, RecognizerOptions } from './types';

export class HandwritingRecognizerWeb extends BaseRecognizer {
  private session: ort.InferenceSession | null = null;
  private dictPath: string;

  constructor(options: RecognizerOptions) {
    super(options);
    this.dictPath = options.dictPath;
  }

  async init(modelPath: string, options: ort.InferenceSession.SessionOptions = {}) {
    // 加载词典
    console.log(`正在加载汉字词典: ${this.dictPath}`);
    const res = await fetch(this.dictPath);
    if (!res.ok) {
      throw new Error(`汉字词典请求失败: ${res.status} ${res.statusText} (路径: ${this.dictPath})`);
    }
    const text = await res.text();
    await this.loadDictFromContent(text, this.dictPath);

    // 加载模型
    console.log(`正在加载 ONNX 模型: ${modelPath}`);
    try {
      this.session = await ort.InferenceSession.create(modelPath, {
        executionProviders: ['webgpu', 'webgl', 'wasm'],
        ...options
      });
      console.log('模型加载成功');
    } catch (e) {
      console.error('ONNX 模型加载失败:', e);
      throw e;
    }
  }

  async recognize(canvas: HTMLCanvasElement, signal?: AbortSignal): Promise<RecognitionResult> {
    if (!this.session) throw new Error('Session not initialized');
    
    const { data, width, height } = this.getPreprocessingCanvas(canvas);
    
    // 如果在预处理后已经取消，直接抛出
    if (signal?.aborted) throw new Error('Aborted');

    const tensor = new ort.Tensor('float32', data, [1, 3, height, width]);
    
    // 执行推理
    const results = await this.session.run({ [this.session.inputNames[0]!]: tensor });
    
    // 推理结束后检查信号，防止耗时的后处理继续执行
    if (signal?.aborted) throw new Error('Aborted');

    const output = results[this.session.outputNames[0]!];
    return this.postProcess(output!.data as Float32Array, output!.dims as number[]);
  }
}
