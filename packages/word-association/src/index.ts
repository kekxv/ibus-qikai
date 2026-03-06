import init, { cut, cut_all, cut_for_search, tag, tokenize, add_word, with_dict, type Token, type Tag } from 'jieba-wasm';
import { phraseDict as defaultPhraseDict } from './assets/phrase_dict';

// 默认词典路径
export const dictPath = 'dict.txt';

// 默认 WASM 路径
export const wasmPath = '/libs/jieba_rs_wasm_bg.wasm';

// 词组词典条目
export interface PhraseEntry {
  phrase: string;
  freq: number;
}

export interface WordAssociationOptions {
  userDict?: string;
  wasmPath?: string;
  phraseDict?: PhraseEntry[];
}

export interface PossegResult {
  word: string;
  tag: string;
}

export interface AssociationResult {
  phrase: string;
  freq: number;
  matchType: 'prefix' | 'contains';
}

/**
 * 词汇联想类
 * 使用 jieba-wasm 进行中文分词和词汇联想
 */
export class WordAssociation {
  private userDict: string | null;
  private initialized: boolean;
  private wasmPath: string;
  private phraseDict: Record<string, PhraseEntry[]>;

  constructor(options: WordAssociationOptions = {}) {
    this.userDict = options.userDict || null;
    this.wasmPath = options.wasmPath || wasmPath;
    // 合并默认词典和自定义词典
    this.phraseDict = { ...defaultPhraseDict };

    // 合并自定义词组词典
    if (options.phraseDict) {
      options.phraseDict.forEach(entry => {
        const firstChar = entry.phrase.charAt(0);
        if (!this.phraseDict[firstChar]) {
          this.phraseDict[firstChar] = [];
        }
        this.phraseDict[firstChar].push(entry);
      });
    }

    this.initialized = false;
  }

  /**
   * 初始化 jieba-wasm
   */
  async init(): Promise<void> {
    await init(this.wasmPath);
    this.initialized = true;
    if (this.userDict) {
      this.loadUserDict(this.userDict);
    }
  }

  /**
   * 确保已初始化
   */
  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('WordAssociation not initialized. Call async init() first.');
    }
  }

  /**
   * 分词
   * @param text - 输入文本
   * @param hmm - 是否使用 HMM 模式
   * @returns 分词结果数组
   */
  cut(text: string, hmm: boolean = true): string[] {
    this.ensureInitialized();
    return cut(text, hmm);
  }

  /**
   * 全模式分词
   * @param text - 输入文本
   * @returns 全模式分词结果数组
   */
  cutAll(text: string): string[] {
    this.ensureInitialized();
    return cut_all(text);
  }

  /**
   * 精确模式分词
   * @param text - 输入文本
   * @param hmm - 是否使用 HMM 模式
   * @returns 精确模式分词结果数组
   */
  cutForSearch(text: string, hmm: boolean = true): string[] {
    this.ensureInitialized();
    return cut_for_search(text, hmm);
  }

  /**
   * 带词性标注的分词
   * @param text - 输入文本
   * @param hmm - 是否使用 HMM 模式
   * @returns 带词性的分词结果
   */
  posseg(text: string, hmm: boolean = true): PossegResult[] {
    this.ensureInitialized();
    const result: Tag[] = tag(text, hmm);
    return result.map((item: Tag) => ({ word: item.word, tag: item.tag }));
  }

  /**
   * 提取关键词
   * @param text - 输入文本
   * @param topK - 返回的关键词数量
   * @returns 关键词数组
   */
  extractTags(text: string, topK: number = 5): string[] {
    this.ensureInitialized();
    const tokens: Token[] = tokenize(text, 'search', true);
    const words = tokens.map((t: Token) => t.word);
    const freqMap = new Map<string, number>();
    words.forEach((word: string) => {
      if (word.trim().length > 1) {
        freqMap.set(word, (freqMap.get(word) || 0) + 1);
      }
    });
    return Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK)
      .map((entry) => entry[0]);
  }

  /**
   * 提取短语
   * @param text - 输入文本
   * @param topK - 返回的短语数量
   * @returns 短语数组
   */
  extractPhrases(text: string, topK: number = 5): string[] {
    this.ensureInitialized();
    const words = cut_all(text);
    return words.filter((w: string) => w.length > 2).slice(0, topK);
  }

  /**
   * 加载用户自定义词典
   * @param dictContent - 词典文件内容
   */
  loadUserDict(dictContent: string): void {
    this.ensureInitialized();
    with_dict(dictContent);
    this.userDict = dictContent;
  }

  /**
   * 添加新词到词典
   * @param word - 新词
   * @param freq - 词频（可选）
   * @param tag - 词性（可选）
   */
  addWord(word: string, freq?: number, tag?: string): number {
    this.ensureInitialized();
    return add_word(word, freq, tag);
  }

  /**
   * 从词典中删除词语（jieba-wasm 不支持）
   * @param word - 要删除的词语
   */
  delWord(word: string): void {
    this.ensureInitialized();
    console.warn('delWord is not supported in jieba-wasm');
  }

  /**
   * 获取词频（jieba-wasm 不支持）
   * @param word - 词语
   * @returns 词频
   */
  getFreq(word: string): number {
    this.ensureInitialized();
    console.warn('getFreq is not supported in jieba-wasm');
    return 0;
  }

  /**
   * 调整词频（jieba-wasm 不支持）
   * @param word - 词语
   * @param freq - 新词频
   * @returns 实际设置的词频
   */
  suggestFreq(word: string, freq: number): number {
    this.ensureInitialized();
    console.warn('suggestFreq is not supported in jieba-wasm');
    return 0;
  }

  /**
   * 词汇联想 - 根据输入的字/词，联想包含该字/词的常用词组
   * @param text - 输入文本
   * @param limit - 返回结果数量限制
   * @returns 联想词组数组
   */
  associate(text: string, limit: number = 10): { phrase: string; freq: number }[] {
    this.ensureInitialized();

    if (!text || text.length === 0) {
      return [];
    }

    const results: Map<string, number> = new Map();

    // 1. 首先查找以输入文本开头的词组（前缀匹配）
    const prefixMatches = this.phraseDict[text];
    if (prefixMatches) {
      prefixMatches.forEach(entry => {
        results.set(entry.phrase, entry.freq);
      });
    }

    // 2. 如果是单字，还查找包含该字的词组
    if (text.length === 1) {
      const char = text;
      // 遍历词典，查找包含该字符的所有词组
      for (const [key, entries] of Object.entries(this.phraseDict)) {
        entries.forEach(entry => {
          if (entry.phrase.includes(char) && !results.has(entry.phrase)) {
            // 降低包含匹配的权重
            results.set(entry.phrase, Math.round(entry.freq * 0.5));
          }
        });
      }
    } else if (text.length > 1) {
      // 多字输入，查找包含整个文本的词组
      for (const entries of Object.values(this.phraseDict)) {
        entries.forEach(entry => {
          if (entry.phrase.includes(text) && !results.has(entry.phrase)) {
            results.set(entry.phrase, Math.round(entry.freq * 0.3));
          }
        });
      }
    }

    // 3. 按词频排序并返回
    return Array.from(results.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([phrase, freq]) => ({ phrase, freq }));
  }

  /**
   * 获取词组联想（支持多字连续输入）
   * @param text - 完整输入文本
   * @param limit - 每个字返回的联想数量
   * @returns 联想词组数组
   */
  associateForInput(text: string, limit: number = 15): AssociationResult[] {
    this.ensureInitialized();

    if (!text || text.length === 0) {
      return [];
    }

    const results: Map<string, { freq: number; matchType: 'prefix' | 'contains' }> = new Map();

    // 1. 前缀匹配 - 查找以输入文本开头的词组
    const prefixMatches = this.phraseDict[text];
    if (prefixMatches) {
      prefixMatches.forEach(entry => {
        if (entry.phrase.length > text.length) {
          results.set(entry.phrase, { freq: entry.freq, matchType: 'prefix' });
        }
      });
    }

    // 2. 逐字联想 - 对输入中的每个字进行联想
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const entries = this.phraseDict[char];
      if (entries) {
        entries.forEach(entry => {
          if (entry.phrase.length > text.length && !results.has(entry.phrase)) {
            // 根据位置调整权重 - 越靠前的字权重越高
            const weight = 1 - (i / text.length) * 0.5;
            results.set(entry.phrase, {
              freq: Math.round(entry.freq * weight),
              matchType: 'contains'
            });
          }
        });
      }
    }

    // 3. 按词频排序并返回
    return Array.from(results.entries())
      .sort((a, b) => b[1].freq - a[1].freq)
      .slice(0, limit)
      .map(([phrase, data]) => ({ phrase, freq: data.freq, matchType: data.matchType }));
  }
}

export default WordAssociation;
