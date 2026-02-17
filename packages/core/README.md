# @ibus-qikai/core

`ibus-qikai` 核心识别引擎。提供基于 ONNX Runtime 的手写识别逻辑及拼音匹配工具。

## 安装

```bash
pnpm add @ibus-qikai/core onnxruntime-web
```

## 功能

- `HandwritingRecognizerWeb`: 处理 Canvas 预处理、模型加载及 CTC 解码。
- `PinyinMatch`: 轻量级拼音转汉字匹配器。

## 使用示例

```typescript
import { HandwritingRecognizerWeb } from '@ibus-qikai/core';

const recognizer = new HandwritingRecognizerWeb({
  dictPath: '/path/to/dict.txt',
  topK: 5
});

await recognizer.init('/path/to/model.onnx');
const result = await recognizer.recognize(canvasElement);
```
