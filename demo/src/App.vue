<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch, nextTick} from 'vue';
import {HandwritingInput} from 'ibus-qikai';
import * as ort from 'onnxruntime-web';

// ONNX Runtime configuration
ort.env.wasm.wasmPaths = (fileName: string) => `./libs/${fileName}`;
ort.env.wasm.numThreads = 4; // 使用多线程以获得更好的性能
ort.env.wasm.initTimeout = 10000; // 增加初始化超时时间

const activeTab = ref<'handwriting' | 'keyboard'>('handwriting');
const isInitializing = ref(true);
const loaderText = ref('正在初始化离线引擎...');
const currentText = ref('');
const currentPinyin = ref('');
const candidates = ref<any[]>([]);
const isPinyinMode = ref(false);
const isDrawing = ref(false);
const isRecognizing = ref(false);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

let inputEngine: HandwritingInput;
let ctx: CanvasRenderingContext2D | null = null;
let recognitionController: AbortController | null = null;
let recognitionTimer: any = null;
let drawAnimationFrameId: number | null = null;
let pendingDrawPoints: Array<{ x: number; y: number }> = [];

// Initialize engine
onMounted(async () => {
  try {
    inputEngine = new HandwritingInput({topK: 15});
    await inputEngine.init(
      './libs/PP-OCRv5_rec_mobile_infer.ort',
      './libs/ppocrv5_dict.txt',
      './libs/pinyin_dict.json'
    );
    isInitializing.value = false;
    nextTick(() => {
      initCanvas();
    });
  } catch (e) {
    loaderText.value = '初始化失败: ' + (e as Error).message;
    console.error(e);
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(async () => {
  window.removeEventListener('resize', handleResize);
  if (drawAnimationFrameId !== null) {
    cancelAnimationFrame(drawAnimationFrameId);
    drawAnimationFrameId = null;
  }
  if (inputEngine) {
    await inputEngine?.dispose();
  }
});

// Canvas logic
const initCanvas = () => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext('2d');
  handleResize();
};

const setupCanvasStyle = () => {
  if (!ctx) return;
  ctx.lineWidth = 12;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#1c1c1e';
};

const handleResize = () => {
  if (!canvasRef.value || !containerRef.value) return;
  const container = containerRef.value;
  canvasRef.value.width = container.clientWidth;
  canvasRef.value.height = container.clientHeight;
  setupCanvasStyle();
};

const getCoords = (e: MouseEvent | TouchEvent) => {
  if (!canvasRef.value) return {x: 0, y: 0};
  const rect = canvasRef.value.getBoundingClientRect();
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  return {
    x: (clientX - rect.left) * (canvasRef.value.width / rect.width),
    y: (clientY - rect.top) * (canvasRef.value.height / rect.height)
  };
};

const startDrawing = (e: MouseEvent | TouchEvent) => {
  if (activeTab.value !== 'handwriting' || !ctx) return;

  // 如果当前正在推理，立即中断它
  if (recognitionController) {
    recognitionController.abort();
    recognitionController = null;
  }
  isRecognizing.value = false;

  isDrawing.value = true;
  const {x, y} = getCoords(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
  clearTimeout(recognitionTimer);

  if (currentPinyin.value) {
    currentPinyin.value = '';
    candidates.value = [];
  }
};

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !ctx) return;
  const {x, y} = getCoords(e);

  // 收集绘图点，使用 requestAnimationFrame 统一渲染
  pendingDrawPoints.push({x, y});

  if (drawAnimationFrameId === null) {
    drawAnimationFrameId = requestAnimationFrame(() => {
      if (!ctx || pendingDrawPoints.length === 0) {
        drawAnimationFrameId = null;
        return;
      }

      // 批量渲染所有待绘制点
      for (const point of pendingDrawPoints) {
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();

      pendingDrawPoints = [];
      drawAnimationFrameId = null;
    });
  }
};

const stopDrawing = () => {
  if (!isDrawing.value) return;
  isDrawing.value = false;

  // 刷新任何待处理的绘图
  if (drawAnimationFrameId !== null) {
    cancelAnimationFrame(drawAnimationFrameId);
    if (ctx && pendingDrawPoints.length > 0) {
      for (const point of pendingDrawPoints) {
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();
    }
    pendingDrawPoints = [];
    drawAnimationFrameId = null;
  }

  recognitionTimer = setTimeout(async () => {
    if (recognitionController) recognitionController.abort();
    recognitionController = new AbortController();
    const signal = recognitionController.signal;

    try {
      if (!canvasRef.value) return;
      isRecognizing.value = true;
      const result = await inputEngine.recognize(canvasRef.value, signal);
      candidates.value = result.candidates;
      isPinyinMode.value = false;
    } catch (e: any) {
      if (e.message !== 'Aborted') console.error('识别出错:', e);
    } finally {
      if (!signal.aborted) {
        isRecognizing.value = false;
      }
    }
  }, 300);
};

// Pinyin logic
const handleKeyClick = (key: string) => {
  if (key === 'space') {
    confirmChar(' ');
  } else if (key === 'backspace' || key === '退格') {
    currentPinyin.value = currentPinyin.value.slice(0, -1);
  } else if (key === 'clear' || key === '清空') {
    currentPinyin.value = '';
  } else {
    currentPinyin.value += key;
  }
};

watch(currentPinyin, (val) => {
  if (val) {
    isPinyinMode.value = true;
    candidates.value = inputEngine.matchPinyin(val);
  } else {
    if (isPinyinMode.value) candidates.value = [];
  }
});

const confirmChar = (char: string) => {
  currentText.value += char;
  if (isPinyinMode.value) {
    currentPinyin.value = '';
  }
  if (ctx && canvasRef.value) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
  candidates.value = [];
};

const resetAll = () => {
  currentText.value = '';
  currentPinyin.value = '';
  candidates.value = [];
  if (ctx && canvasRef.value) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
};

const copyResult = async () => {
  if (!currentText.value) return;
  await navigator.clipboard.writeText(currentText.value);
  const originalText = '复制结果';
  const btn = document.getElementById('copyBtn');
  if (btn) {
    btn.innerText = '已复制!';
    setTimeout(() => {
      btn.innerText = originalText;
    }, 1500);
  }
};

const kbRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['清空', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '退格']
];
</script>

<template>
  <div class="app-container">
    <div v-if="isInitializing" class="loading-overlay">
      <div class="spinner"></div>
      <div class="loader-text">{{ loaderText }}</div>
    </div>

    <div class="main-card">
      <header class="header">
        <div class="logo">
          <span class="logo-icon">✎</span>
          <h1>ibus-qikai</h1>
        </div>
        <a href="https://github.com/kekxv/ibus-qikai" target="_blank" class="github-link">
          GitHub
        </a>
      </header>

      <div class="display-area">
        <div class="pinyin-indicator" :class="{ visible: currentPinyin || isPinyinMode }">
          {{ currentPinyin || '拼音输入' }}
        </div>
        <div class="input-display">
          {{ currentText }}<span class="cursor">|</span>
        </div>
      </div>

      <div class="candidate-bar" :class="{ empty: candidates.length === 0 }">
        <template v-if="isRecognizing">
          <div class="empty-hint recognizer-hint">
            <span class="mini-spinner"></span> 正在识别...
          </div>
        </template>
        <template v-else-if="candidates.length > 0">
          <div
            v-for="c in candidates"
            :key="c.character"
            class="candidate-item"
            @click="confirmChar(c.character)"
            :title="!isPinyinMode ? `置信度: ${(c.score * 100).toFixed(1)}%` : ''"
          >
            {{ c.character }}
          </div>
        </template>
        <div v-else class="empty-hint">
          {{ activeTab === 'handwriting' ? '请在下方区域书写' : '请点击键盘输入' }}
        </div>
      </div>

      <div class="input-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'handwriting' }"
          @click="activeTab = 'handwriting'"
        >
          手写输入
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'keyboard' }"
          @click="activeTab = 'keyboard'"
        >
          拼音键盘
        </button>
      </div>

      <div class="panel-container">
        <!-- Handwriting Panel -->
        <div v-show="activeTab === 'handwriting'" class="panel handwriting-panel">
          <div
            ref="containerRef"
            class="canvas-container"
            :class="{ drawing: isDrawing }"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            @touchstart.prevent="startDrawing"
            @touchmove.prevent="draw"
            @touchend.prevent="stopDrawing"
          >
            <canvas ref="canvasRef"></canvas>
          </div>
        </div>

        <!-- Keyboard Panel -->
        <div v-show="activeTab === 'keyboard'" class="panel keyboard-panel">
          <div class="keyboard">
            <div v-for="(row, i) in kbRows" :key="i" class="kb-row">
              <div
                v-for="key in row"
                :key="key"
                class="key"
                :class="{ 
                  wide: key === '退格' || key === '清空',
                  danger: key === '清空'
                }"
                @click="handleKeyClick(key)"
              >
                {{ key }}
              </div>
            </div>
            <div class="kb-row">
              <div class="key space" @click="handleKeyClick('space')">Space</div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" @click="resetAll">重置</button>
        <button id="copyBtn" class="btn btn-primary" @click="copyResult">复制结果</button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --primary: #007aff;
  --primary-hover: #0062cc;
  --bg: #f5f5f7;
  --card-bg: rgba(255, 255, 255, 0.8);
  --text: #1d1d1f;
  --text-secondary: #86868b;
  --border: #d2d2d7;
  --key-bg: #ffffff;
  --key-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  --radius: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.main-card {
  width: 100%;
  max-width: 480px;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 20px;
  color: var(--primary);
}

.header h1 {
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.github-link {
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.github-link:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text);
}

.display-area {
  padding: 0 24px 16px;
}

.pinyin-indicator {
  font-size: 13px;
  color: var(--primary);
  height: 18px;
  margin-bottom: 4px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.2s;
}

.pinyin-indicator.visible {
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  will-change: opacity;
  word-break: break-all;
  line-height: 1.2;
}

.cursor {
  color: var(--primary);
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  will-change: opacity;
}

@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.candidate-bar {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  background: rgba(0, 0, 0, 0.02);
  overflow-x: auto;
  scrollbar-width: none;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.candidate-bar::-webkit-scrollbar {
  display: none;
}

.candidate-item {
  min-width: 44px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.candidate-item:hover {
  background: rgba(0, 122, 255, 0.1);
  color: var(--primary);
}

.candidate-item:active {
  transform: scale(0.9);
}

.empty-hint {
  width: 100%;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.input-tabs {
  display: flex;
  padding: 12px 24px;
  gap: 8px;
}

.tab-btn {
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
  transition: all 0.2s;
}

.tab-btn.active {
  background: #ffffff;
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.panel-container {
  padding: 0 24px 20px;
  height: 260px;
}

.canvas-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid var(--border);
  touch-action: none;
  cursor: crosshair;
  transition: border-color 0.3s;
}

.canvas-container.drawing {
  border-color: var(--primary);
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kb-row {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.key {
  height: 44px;
  flex: 1;
  background: var(--key-bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: var(--key-shadow);
  cursor: pointer;
  user-select: none;
  transition: all 0.1s;
}

.key:active {
  transform: translateY(2px);
  background: #f2f2f7;
  box-shadow: none;
}

.key.wide {
  flex: 1.5;
  font-size: 14px;
  background: #f2f2f7;
}

.key.danger {
  color: #ff3b30;
}

.key.space {
  flex: 5;
  font-size: 14px;
}

.actions {
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
}

.btn {
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text);
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: scale(0.98);
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f2f2f7;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-text {
  font-size: 15px;
  color: var(--text-secondary);
}

.mini-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 6px;
  vertical-align: middle;
}

.recognizer-hint {
  color: var(--primary);
  font-weight: 500;
}
</style>
