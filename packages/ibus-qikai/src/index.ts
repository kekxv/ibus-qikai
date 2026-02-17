import { HandwritingRecognizerWeb as RecognizerWeb, PinyinMatch } from '@ibus-qikai/core';
import models from '@ibus-qikai/models';

export * from '@ibus-qikai/core';

export class HandwritingInput {
  private recognizer: RecognizerWeb | null = null;
  private pinyinMatcher: PinyinMatch;
  private topK: number;

  constructor(options: { topK?: number } = {}) {
    this.topK = options.topK || 10;
    this.pinyinMatcher = new PinyinMatch();
  }

  /**
   * 初始化识别引擎
   * @param modelPath 手动指定 ONNX 模型路径
   * @param dictPath 手动指定汉字字典 (.txt) 路径
   * @param pinyinDictPath 手动指定拼音字典 (.json) 路径
   */
  async init(modelPath?: string, dictPath?: string, pinyinDictPath?: string) {
    // 默认使用项目内置的文件名
    const finalModelPath = modelPath || models.modelPath;
    const finalDictPath = dictPath || models.dictPath;
    const finalPinyinDictPath = pinyinDictPath || models.pinyinDictPath;

    this.recognizer = new RecognizerWeb({
      dictPath: finalDictPath,
      topK: this.topK
    });

    await Promise.all([
      this.recognizer.init(finalModelPath),
      this.pinyinMatcher.init(finalPinyinDictPath)
    ]);
  }

  async recognize(canvas: HTMLCanvasElement, signal?: AbortSignal) {
    if (!this.recognizer) throw new Error('Call init() first');
    return this.recognizer.recognize(canvas, signal);
  }

  matchPinyin(pinyin: string) {
    return this.pinyinMatcher.match(pinyin);
  }
}
