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
   * @param options 路径配置
   */
  async init(options: { 
    modelPath?: string; 
    dictPath?: string; 
    pinyinDictPath?: string;
    pathPrefix?: string;
  } = {}) {
    const prefix = options.pathPrefix || '';
    
    // 如果没有传具体路径，则使用默认文件名拼接前缀
    const finalModelPath = options.modelPath || (prefix + models.modelPath);
    const finalDictPath = options.dictPath || (prefix + models.dictPath);
    const finalPinyinDictPath = options.pinyinDictPath || (prefix + models.pinyinDictPath);

    this.recognizer = new RecognizerWeb({
      dictPath: finalDictPath,
      topK: this.topK
    });

    await Promise.all([
      this.recognizer.init(finalModelPath),
      this.pinyinMatcher.init(finalPinyinDictPath)
    ]);
  }

  async recognize(canvas: HTMLCanvasElement) {
    if (!this.recognizer) throw new Error('Call init() first');
    return this.recognizer.recognize(canvas);
  }

  matchPinyin(pinyin: string) {
    return this.pinyinMatcher.match(pinyin);
  }
}
