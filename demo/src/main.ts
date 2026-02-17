import { HandwritingInput } from 'ibus-qikai';
import * as ort from 'onnxruntime-web';

// 配置 WASM 路径
ort.env.wasm.wasmPaths = (fileName: string) => `./libs/${fileName}`;
ort.env.wasm.numThreads = 1;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const canvasContainer = document.getElementById('canvas-container')!;
const ctx = canvas.getContext('2d')!;
const display = document.getElementById('input-display')!;
const candidateBar = document.getElementById('candidate-bar')!;
const pinyinIndicator = document.getElementById('pinyin-indicator')!;
const loader = document.getElementById('loader')!;
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

let inputEngine: HandwritingInput;
let currentText = '';
let currentPinyin = '';
let isDrawing = false;
let recognitionController: AbortController | null = null; // 用于取消上次识别
let recognitionTimer: any = null;

// 初始化引擎
async function init() {
    try {
        inputEngine = new HandwritingInput({ topK: 15 });
        // 初始化，显式传入资源路径
        await inputEngine.init(
            './libs/PP-OCRv5_rec_mobile_infer.onnx',
            './libs/ppocrv5_dict.txt',
            './libs/pinyin_dict.json'
        );
        loader.style.display = 'none'; 
        resizeCanvas();
    } catch (e) {
        document.getElementById('loader-text')!.innerText = '初始化失败: ' + (e as Error).message;
        console.error(e);
    }
}

// UI 交互：Tab 切换
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetId = tab.getAttribute('data-target')!;
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(targetId)!.classList.add('active');
        
        if (targetId === 'handwriting-panel') {
            resizeCanvas();
        } else {
            pinyinIndicator.innerText = currentPinyin || '请点击下方键盘输入拼音';
        }
    });
});

// 虚拟键盘逻辑
document.getElementById('keyboard')!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('key')) return;

    const key = target.innerText.toLowerCase();
    if (key === 'space') {
        confirmChar(' ');
    } else if (target.id === 'kb-back' || key === '退格') {
        currentPinyin = currentPinyin.slice(0, -1);
        updatePinyinSearch();
    } else if (target.id === 'kb-clear' || key === '清空') {
        currentPinyin = '';
        updatePinyinSearch();
    } else if (key.length === 1) {
        currentPinyin += key;
        updatePinyinSearch();
    }
});

function updatePinyinSearch() {
    pinyinIndicator.innerText = currentPinyin || '等待输入...';
    if (currentPinyin) {
        const candidates = inputEngine.matchPinyin(currentPinyin);
        renderCandidates(candidates, true);
    } else {
        candidateBar.innerHTML = '';
    }
}

// 手写画布样式与逻辑
function setupCanvasStyle() {
    ctx.lineWidth = 14;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
}

function resizeCanvas() {
    const container = canvas.parentElement!;
    if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        setupCanvasStyle();
    }
}

function getCoords(e: any) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    return { x, y };
}

const startDrawing = (e: any) => {
    isDrawing = true;
    canvasContainer.classList.add('active');
    const {x, y} = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    clearTimeout(recognitionTimer);
    
    // 手写时清空拼音状态
    if (currentPinyin) { 
        currentPinyin = ''; 
        pinyinIndicator.innerText = '';
    }
};

const draw = (e: any) => {
    if (!isDrawing) return;
    const {x, y} = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
};

const stopDrawing = () => {
    if (!isDrawing) return;
    isDrawing = false;
    canvasContainer.classList.remove('active');
    
    // 准备新的识别任务，设置延时 500ms 触发
    recognitionTimer = setTimeout(async () => {
        // 1. 如果有正在进行的识别，立即取消它
        if (recognitionController) {
            recognitionController.abort();
        }
        
        // 2. 创建新的控制器
        recognitionController = new AbortController();
        const signal = recognitionController.signal;

        try {
            const result = await inputEngine.recognize(canvas, signal);
            renderCandidates(result.candidates);
        } catch (e: any) {
            // 如果是取消导致的错误，不打印
            if (e.message !== 'Aborted') {
                console.error('识别出错:', e);
            }
        } finally {
            if (recognitionController?.signal === signal) {
                recognitionController = null;
            }
        }
    }, 500);
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
canvas.addEventListener('touchend', stopDrawing);

// 渲染候选词
function renderCandidates(candidates: any[], isPinyin = false) {
    candidateBar.innerHTML = '';
    if (candidates.length === 0) {
        candidateBar.innerHTML = `<span style="color:#ccc;margin:auto;font-size:14px">${isPinyin ? '无匹配字符' : '未检测到内容'}</span>`;
        return;
    }
    
    candidates.forEach(c => {
        const div = document.createElement('div');
        div.className = 'candidate-item';
        div.innerText = c.character;
        if (!isPinyin) div.title = `匹配度: ${(c.score * 100).toFixed(1)}%`;
        
        div.onclick = () => {
            confirmChar(c.character);
            if (isPinyin) { 
                currentPinyin = ''; 
                updatePinyinSearch(); 
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            candidateBar.innerHTML = '';
        };
        candidateBar.appendChild(div);
    });
}

function confirmChar(char: string) {
    currentText += char;
    display.innerText = currentText + '|';
}

// 底部功能键
document.getElementById('clearAllBtn')!.onclick = () => {
    currentText = '';
    currentPinyin = '';
    display.innerText = '|';
    pinyinIndicator.innerText = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    candidateBar.innerHTML = '';
};

document.getElementById('copyBtn')!.onclick = () => {
    if (!currentText) return;
    navigator.clipboard.writeText(currentText);
    const oldText = copyBtn.innerText;
    copyBtn.innerText = '已复制!';
    setTimeout(() => { copyBtn.innerText = oldText; }, 1500);
};

window.addEventListener('resize', resizeCanvas);
init();
