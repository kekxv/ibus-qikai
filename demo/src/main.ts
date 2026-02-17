import { HandwritingInput } from 'ibus-qikai';
import * as ort from 'onnxruntime-web';

// 配置 WASM 路径
ort.env.wasm.wasmPaths = (fileName: string) => {
    return `./libs/${fileName}`;
};
ort.env.wasm.numThreads = 1;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const display = document.getElementById('input-display')!;
const candidateBar = document.getElementById('candidate-bar')!;
const pinyinInput = document.getElementById('pinyin-input') as HTMLInputElement;
const clearBtn = document.getElementById('clearBtn')!;
const backspaceBtn = document.getElementById('backspaceBtn')!;
const spaceBtn = document.getElementById('spaceBtn')!;
const copyBtn = document.getElementById('copyBtn')!;

let isDrawing = false;
let inputEngine: HandwritingInput;
let currentText = '';
let recognitionTimer: any = null;

function setupCanvasStyle() {
    ctx.lineWidth = 14; // 适中粗细，确保复杂字不粘连，简单字不破碎
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000'; // 纯黑
}

function resizeCanvas() {
    const container = canvas.parentElement!;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // 只有当尺寸发生变化时才重置，避免不必要的清空
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        setupCanvasStyle();
    }
}

async function init() {
    try {
        display.innerText = '正在初始化引擎...';
        inputEngine = new HandwritingInput({ topK: 12 });
        // 使用相对路径，适配 GitHub Pages 子路径
        await inputEngine.init({
            pathPrefix: './libs/'
        });
        display.innerText = '|';
        resizeCanvas();
    } catch (e) {
        console.error('初始化失败:', e);
        display.style.color = 'red';
        display.innerText = '初始化失败: ' + (e as Error).message;
    }
}

// 拼音输入逻辑
pinyinInput.oninput = () => {
    const pinyin = pinyinInput.value.trim();
    if (pinyin) {
        const candidates = inputEngine.matchPinyin(pinyin);
        renderCandidates(candidates, true);
    } else {
        candidateBar.innerHTML = '<span style="color: #c7c7cc; font-size: 14px; margin: auto;">等待输入...</span>';
    }
};

function getCoords(e: any) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    
    // 计算点击位置在 rect 中的相对百分比，再映射到画布的实际宽度
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y };
}

canvas.addEventListener('mousedown', (e) => { 
    isDrawing = true; 
    const {x, y} = getCoords(e); 
    ctx.beginPath(); 
    ctx.moveTo(x, y); 
    clearTimeout(recognitionTimer); 
    pinyinInput.value = ''; // 手写时清空拼音
});
canvas.addEventListener('mousemove', (e) => { 
    if (!isDrawing) return; 
    const {x, y} = getCoords(e); 
    ctx.lineTo(x, y); 
    ctx.stroke(); 
});
window.addEventListener('mouseup', () => { 
    if (!isDrawing) return; 
    isDrawing = false; 
    recognitionTimer = setTimeout(recognize, 500); 
});

canvas.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    isDrawing = true; 
    const {x, y} = getCoords(e); 
    ctx.beginPath(); 
    ctx.moveTo(x, y); 
    clearTimeout(recognitionTimer); 
    pinyinInput.value = ''; 
});
canvas.addEventListener('touchmove', (e) => { 
    e.preventDefault(); 
    if (!isDrawing) return; 
    const {x, y} = getCoords(e); 
    ctx.lineTo(x, y); 
    ctx.stroke(); 
});
canvas.addEventListener('touchend', () => { 
    if (!isDrawing) return; 
    isDrawing = false; 
    recognitionTimer = setTimeout(recognize, 500); 
});

async function recognize() {
    if (!inputEngine) return;
    try {
        const result = await inputEngine.recognize(canvas);
        renderCandidates(result.candidates);
    } catch (e) {
        console.error('识别失败:', e);
    }
}

function renderCandidates(candidates: any[], isPinyin = false) {
    if (candidates.length === 0) {
        candidateBar.innerHTML = `<span style="color: #c7c7cc; font-size: 14px; margin: auto;">${isPinyin ? '无拼音匹配' : '未检测到字符'}</span>`;
        return;
    }
    candidateBar.innerHTML = '';
    candidates.forEach(c => {
        const item = document.createElement('div');
        item.className = 'candidate-item';
        item.innerText = c.character;
        if (!isPinyin) item.title = `得分: ${(c.score * 100).toFixed(1)}%`;
        item.onclick = () => { 
            currentText += c.character; 
            display.innerText = currentText + '|'; 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            candidateBar.innerHTML = ''; 
            pinyinInput.value = ''; 
            pinyinInput.focus();
        };
        candidateBar.appendChild(item);
    });
}

clearBtn.onclick = () => { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    pinyinInput.value = '';
    candidateBar.innerHTML = '<span style="color: #c7c7cc; font-size: 14px; margin: auto;">已清除</span>'; 
};
backspaceBtn.onclick = () => { currentText = currentText.slice(0, -1); display.innerText = currentText + '|'; };
spaceBtn.onclick = () => { currentText += ' '; display.innerText = currentText + '|'; };
copyBtn.onclick = () => { navigator.clipboard.writeText(currentText); alert('已复制'); };

window.onresize = resizeCanvas;
init();
