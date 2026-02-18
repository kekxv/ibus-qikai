# ibus-qikai (拼音、手写识别)

`ibus-qikai` 是一个基于 **ONNX Runtime** 和 **PP-OCRv5** 模型构建的高性能、全离线手写识别库。它专为 Web 环境设计，提供了从图像预处理、拼音检索到输入法 UI 的完整解决方案。

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

## ✨ 核心特性

- 🚀 **高性能推理**：基于百度 PaddleOCRv5 移动端识别模型，兼顾速度与精度。
- 🌐 **全离线运行**：所有资源（模型、字典、WASM）均可本地化部署，无需联网。
- ⚡ **硬件加速**：自动检测并利用 **WebGPU**、WebGL 或 WASM SIMD 进行推理加速。
- 🎯 **智能预处理**：内置自动去白边（Bounding Box）、等比例缩放和居中对齐，支持任意位置书写且无坐标偏移。
- 🔍 **混合输入模式**：
  - **手写输入**：支持多候选结果及置信度评分。
  - **拼音输入**：内置拼音词典匹配，支持通过拼音查找汉字。
- 📦 **工业级架构**：Monorepo 结构，支持 NPM 按需安装，逻辑与资源分离。

## 📂 软件包说明

| 包名 | 说明 |
| :--- | :--- |
| [`@ibus-qikai/core`](./packages/core) | **核心引擎**。包含图像预处理、拼音匹配和 ONNX 推理逻辑。 |
| [`@ibus-qikai/models`](./packages/models) | **离线资源**。内置 PP-OCRv5 模型、汉字字典及拼音映射表。 |
| [`ibus-qikai`](./packages/ibus-qikai) | **开箱即用聚合包**。封装了逻辑与默认模型，极简 API。 |

## 🚀 快速开始

### 1. 安装

```bash
pnpm add ibus-qikai onnxruntime-web
```

### 2. 基础用法 (Web)

```typescript
import { HandwritingInput } from 'ibus-qikai';

// 1. 初始化引擎
const input = new HandwritingInput({ topK: 10 });
// 支持手动指定模型、字典、拼音路径，不传则使用默认文件名
await input.init(
  '/path/to/model.onnx',
  '/path/to/dict.txt',
  '/path/to/pinyin.json'
);

// 2. 手写识别 (传入 Canvas 元素)
const canvas = document.getElementById('myCanvas');
const result = await input.recognize(canvas);
console.log(result.candidates);

// 3. 拼音匹配
const pinyinCandidates = input.matchPinyin('pin');
console.log(pinyinCandidates); 
```

## 🛠 开发与部署

### 本地调试
```bash
pnpm install
pnpm demo:dev  # 启动拼音+手写混合输入演示页面
```

### 自动化流程 (CI/CD)
- **单元测试**：`pnpm --filter @ibus-qikai/core test` 验证算法。
- **自动部署**：代码合并至 `main` 后，Demo 自动部署至 GitHub Pages。
- **自动发布**：提交信息含 `release` 关键字时，自动发布包至 NPM。

## 🌍 GitHub Pages 部署注意

构建产物位于 `demo/dist`。由于使用了 ONNX Runtime，部署时需确保：
1. `libs/` 目录下的 `.wasm` 和 `.mjs` 文件被正确托管。
2. 配置好 `wasmPaths`（Demo 已内置动态路径计算逻辑）。

## 📝 许可证

本项目基于 [ISC License](./LICENSE) 开源。

---
*Powered by ibus-qikai & PaddleOCR*
