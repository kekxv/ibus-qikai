import * as ort from 'onnxruntime-node';
import * as fs from 'fs';
import { BaseRecognizer } from './BaseRecognizer';
import { RecognitionResult, RecognizerOptions } from './types';

export class HandwritingRecognizerNode extends BaseRecognizer {
  private session: ort.InferenceSession | null = null;

  constructor(options: RecognizerOptions) {
    super(options);
    this.initDict(options.dictPath);
  }

  private initDict(path: string) {
    const content = fs.readFileSync(path, 'utf-8');
    this.loadDictFromContent(content);
  }

  async init(modelPath: string, options: ort.InferenceSession.SessionOptions = {}) {
    this.session = await ort.InferenceSession.create(modelPath, options);
  }

  /**
   * Node.js 端识别
   * @param imageData Float32Array 格式的图像数据 [1, 3, 48, 128]
   */
  async recognize(imageData: Float32Array, width: number, height: number): Promise<RecognitionResult> {
    if (!this.session) throw new Error('Session not initialized');
    
    const tensor = new ort.Tensor('float32', imageData, [1, 3, height, width]);
    const results = await this.session.run({ [this.session.inputNames[0]!]: tensor });
    const output = results[this.session.outputNames[0]!];
    
    return this.postProcess(output!.data as Float32Array, output!.dims as number[]);
  }
}
