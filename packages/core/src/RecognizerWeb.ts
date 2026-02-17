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
    await this.loadDictFromContent(text);

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

  async recognize(canvas: HTMLCanvasElement): Promise<RecognitionResult> {
    if (!this.session) throw new Error('Session not initialized');
    const { data, width, height } = this.getPreprocessingCanvas(canvas);
    const tensor = new ort.Tensor('float32', data, [1, 3, height, width]);
    const results = await this.session.run({ [this.session.inputNames[0]!]: tensor });
    const output = results[this.session.outputNames[0]!];
    return this.postProcess(output!.data as Float32Array, output!.dims as number[]);
  }
}
