# @ibus-qikai/word-association

基于 [jieba-wasm](https://github.com/fengkx/jieba-wasm) 的浏览器端中文词汇联想模块。

## 安装

```bash
npm install @ibus-qikai/word-association jieba-wasm
```

## 使用方法

### 基本用法

```javascript
import WordAssociation from '@ibus-qikai/word-association';

const wa = new WordAssociation();

// 必须先异步初始化
await wa.init();

// 分词
const words = wa.cut('我爱自然语言处理');
console.log(words); // ['我', '爱', '自然语言处理']

// 全模式分词
const allWords = wa.cutAll('中国科学院');
console.log(allWords);

// 精确模式分词
const searchWords = wa.cutForSearch('小明硕士毕业于中国科学院计算所');
console.log(searchWords);

// 词性标注
const tagged = wa.posseg('我爱自然语言处理');
console.log(tagged); // [{word: '我', tag: 'r'}, {word: '爱', tag: 'v'}, ...]

// 提取关键词
const tags = wa.extractTags('我爱自然语言处理', 5);
console.log(tags);

// 提取短语
const phrases = wa.extractPhrases('我爱自然语言处理', 5);
console.log(phrases);
```

### 自定义词典

```javascript
import WordAssociation from '@ibus-qikai/word-association';

// 创建时加载用户词典
const wa = new WordAssociation({
  userDict: '词语 1000 n\n词语 2 500 v'
});

// 初始化（会自动加载用户词典）
await wa.init();

// 或动态加载
wa.loadUserDict('新词 1000 n\n另一个词 500 v');

// 添加新词
wa.addWord('自然语言处理', 1000, 'n');
```

### 词汇联想

```javascript
import WordAssociation from '@ibus-qikai/word-association';

const wa = new WordAssociation();
await wa.init();

// 获取词汇联想结果
const associations = wa.associate('自然语言', 10);
console.log(associations);
```

## API

### 构造函数

- `new WordAssociation(options?: WordAssociationOptions)`
  - `options.userDict?: string` - 用户词典文件内容

### 方法

| 方法 | 描述 | 参数 | 返回值 |
|------|------|------|--------|
| `init()` | 初始化 WASM 模块 | - | `Promise<void>` |
| `cut(text, hmm?)` | 分词 | `text: string`, `hmm?: boolean` | `string[]` |
| `cutAll(text)` | 全模式分词 | `text: string` | `string[]` |
| `cutForSearch(text, hmm?)` | 精确模式分词 | `text: string`, `hmm?: boolean` | `string[]` |
| `posseg(text, hmm?)` | 词性标注 | `text: string`, `hmm?: boolean` | `PossegResult[]` |
| `extractTags(text, topK?)` | 提取关键词 | `text: string`, `topK?: number` | `string[]` |
| `extractPhrases(text, topK?)` | 提取短语 | `text: string`, `topK?: number` | `string[]` |
| `loadUserDict(dictContent)` | 加载用户词典 | `dictContent: string` | `void` |
| `addWord(word, freq?, tag?)` | 添加新词 | `word: string`, `freq?: number`, `tag?: string` | `number` |
| `delWord(word)` | 删除词语（不支持） | `word: string` | `void` |
| `getFreq(word)` | 获取词频（不支持） | `word: string` | `number` |
| `suggestFreq(word, freq)` | 调整词频（不支持） | `word: string`, `freq: number` | `number` |
| `associate(word, limit?)` | 词汇联想 | `word: string`, `limit?: number` | `string[]` |

## 词典格式

用户词典文件格式（每行一个词）：

```
词语 词频 词性
自然语言处理 1000 n
机器学习 1000 n
深度学习 800 n
```

- 词频和词性为可选参数

## 构建

```bash
cd packages/word-association
npm run build
```

## 注意事项

1. **必须先调用 `init()`**：在使用任何方法前，必须先异步调用 `init()` 方法初始化 WASM 模块
2. **浏览器兼容性**：需要浏览器支持 WebAssembly
3. **部分功能不支持**：`delWord`、`getFreq`、`suggestFreq` 方法在 jieba-wasm 中不支持

## License

MIT
