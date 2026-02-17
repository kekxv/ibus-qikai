import { HandwritingInput } from 'ibus-qikai';
import * as ort from 'onnxruntime-web';

// 配置 WASM 路径
ort.env.wasm.wasmPaths = (fileName: string) => `./libs/${fileName}`;
ort.env.wasm.numThreads = 1;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
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
let recognitionTimer: any = null;

// 初始化引擎
async function init() {
    try {
        inputEngine = new HandwritingInput({ topK: 15 });
        await inputEngine.init({ pathPrefix: './libs/' });
        loader.style.display = 'none'; // 隐藏加载遮罩
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
        panels.forEach(p => p.classList.remove('active')); 
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target')!;
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        document.getElementById(targetId)!.classList.add('active');
        if (targetId === 'handwriting-panel') resizeCanvas();
    });
});

// 键盘逻辑
document.getElementById('keyboard')!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('key')) return;

    const key = target.innerText.toLowerCase();
    if (key === 'space') {
        confirmChar(' ');
    } else if (key === '退格') {
        currentPinyin = currentPinyin.slice(0, -1);
        updatePinyinSearch();
    } else if (key === '清空') {
        currentPinyin = '';
        updatePinyinSearch();
    } else if (key.length === 1) {
        currentPinyin += key;
        updatePinyinSearch();
    }
});

function updatePinyinSearch() {
    pinyinIndicator.innerText = currentPinyin;
    if (currentPinyin) {
        const candidates = inputEngine.matchPinyin(currentPinyin);
        renderCandidates(candidates, true);
    } else {
        candidateBar.innerHTML = '';
    }
}

// 画布逻辑
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
    const {x, y} = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    clearTimeout(recognitionTimer);
    if (currentPinyin) { currentPinyin = ''; updatePinyinSearch(); }
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
    recognitionTimer = setTimeout(async () => {
        const result = await inputEngine.recognize(canvas);
        renderCandidates(result.candidates);
    }, 500);
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
canvas.addEventListener('touchend', stopDrawing);

// 候选词处理
function renderCandidates(candidates: any[], isPinyin = false) {
    candidateBar.innerHTML = '';
    if (candidates.length === 0) {
        candidateBar.innerHTML = `<span style="color:#ccc;margin:auto;font-size:14px">${isPinyin?'无匹配':'未识别'}</span>`;
        return;
    }
    candidates.forEach(c => {
        const div = document.createElement('div');
        div.className = 'candidate-item';
        div.innerText = c.character;
        div.onclick = () => {
            confirmChar(c.character);
            if (isPinyin) { currentPinyin = ''; updatePinyinSearch(); }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        candidateBar.appendChild(div);
    });
}

function confirmChar(char: string) {
    currentText += char;
    display.innerText = currentText + '|';
}

// 底部操作
document.getElementById('clearAllBtn')!.onclick = () => {
    currentText = '';
    currentPinyin = '';
    display.innerText = '|';
    pinyinIndicator.innerText = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    candidateBar.innerHTML = '';
};

document.getElementById('copyBtn')!.onclick = () => {
    navigator.clipboard.writeText(currentText);
    alert('文本已复制');
};

window.addEventListener('resize', resizeCanvas);
init();
