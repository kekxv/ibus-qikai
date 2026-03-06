export const dictPath: string;

export interface WordAssociationOptions {
  userDict?: string;
}

export interface PossegResult {
  word: string;
  tag: string;
}

/**
 * 词汇联想类
 * 使用 jieba-wasm 进行中文分词和词汇联想
 */
declare class WordAssociation {
  constructor(options?: WordAssociationOptions);

  /**
   * 初始化 jieba-wasm（异步加载 WASM）
   */
  init(): Promise<void>;

  /**
   * 分词
   */
  cut(text: string, hmm?: boolean): string[];

  /**
   * 全模式分词
   */
  cutAll(text: string): string[];

  /**
   * 精确模式分词
   */
  cutForSearch(text: string, hmm?: boolean): string[];

  /**
   * 带词性标注的分词
   */
  posseg(text: string, hmm?: boolean): PossegResult[];

  /**
   * 提取关键词
   */
  extractTags(text: string, topK?: number): string[];

  /**
   * 提取短语
   */
  extractPhrases(text: string, topK?: number): string[];

  /**
   * 加载用户自定义词典
   */
  loadUserDict(dictContent: string): void;

  /**
   * 添加新词到词典
   */
  addWord(word: string, freq?: number, tag?: string): number;

  /**
   * 从词典中删除词语
   */
  delWord(word: string): void;

  /**
   * 获取词频
   */
  getFreq(word: string): number;

  /**
   * 调整词频
   */
  suggestFreq(word: string, freq: number): number;

  /**
   * 获取词汇联想结果
   */
  associate(word: string, limit?: number): string[];
}

declare const wordAssociation: {
  new (options?: WordAssociationOptions): WordAssociation;
  dictPath: string;
};

export default wordAssociation;
