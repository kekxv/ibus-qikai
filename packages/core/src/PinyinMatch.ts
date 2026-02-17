import { RecognitionCandidate } from './types';

export class PinyinMatch {
  private dict: Record<string, string> = {};

  async init(dictPath: string) {
    console.log(`正在加载拼音词典: ${dictPath}`);
    const res = await fetch(dictPath);
    if (!res.ok) {
      throw new Error(`拼音词典请求失败: ${res.status} ${res.statusText} (路径: ${dictPath})`);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const text = await res.text();
      console.error('收到的 HTML 内容前 100 字符:', text.substring(0, 100));
      throw new Error(`拼音词典加载失败：路径 "${dictPath}" 返回了 HTML 页面而非 JSON。这通常是因为文件不存在，且服务器返回了 404 备用页面。`);
    }
    this.dict = await res.json();
    console.log('拼音词典加载成功');
  }

  match(pinyin: string): RecognitionCandidate[] {
    const chars = this.dict[pinyin.toLowerCase()];
    if (!chars) return [];
    
    return chars.split('').map(char => ({
      character: char,
      score: 1.0 
    }));
  }
}
