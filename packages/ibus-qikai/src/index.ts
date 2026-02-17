import { HandwritingRecognizerWeb as RecognizerWeb } from '@ibus-qikai/core';
import models from '@ibus-qikai/models';

export * from '@ibus-qikai/core';

export class HandwritingInput {
  private recognizer: RecognizerWeb;

  /**
   * 创建一个集成了默认模型的手写识别实例
   * @param options 可选的覆盖配置（如 topK）
   */
  constructor(options: { topK?: number } = {}) {
    this.recognizer = new RecognizerWeb({
      dictPath: models.dictPath,
      topK: options.topK || 10
    });
  }

  /**
   * 初始化识别引擎（加载模型和字典）
   * @param modelPath 可选：覆盖默认模型路径
   */
  async init(modelPath?: string) {
    await this.recognizer.init(modelPath || models.modelPath);
  }

  /**
   * 识别 Canvas 上的手写字符
   */
  async recognize(canvas: HTMLCanvasElement) {
    return this.recognizer.recognize(canvas);
  }
}
