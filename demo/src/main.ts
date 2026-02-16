import { HandwritingRecognizerWeb } from '@ibus-qikai/core';
import * as ort from 'onnxruntime-web';

// 核心修复：使用函数形式配置 wasmPaths，并手动管理路径前缀。
// 这样可以确保如果文件名已经带了查询参数（例如 ?v=...），
// 我们不会通过简单的路径拼接搞错。
ort.env.wasm.wasmPaths = (fileName: string) => {
    // 强制指到我们拷贝好的 libs 目录
    return `./libs/${fileName}`;
};
ort.env.wasm.numThreads = 1;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const display = document.getElementById('input-display')!;
const candidateBar = document.getElementById('candidate-bar')!;
const clearBtn = document.getElementById('clearBtn')!;
const backspaceBtn = document.getElementById('backspaceBtn')!;
const spaceBtn = document.getElementById('spaceBtn')!;
const copyBtn = document.getElementById('copyBtn')!;

let isDrawing = false;
let recognizer: HandwritingRecognizerWeb;
let currentText = '';
let recognitionTimer: any = null;

function resizeCanvas() {
    const container = canvas.parentElement!;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.lineWidth = 14;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
}

async function init() {
    recognizer = new HandwritingRecognizerWeb({
        // 字典和模型现在都移到了 libs 目录下
        dictPath: './libs/ppocrv5_dict.txt',
        topK: 12
    });
    // 初始化模型
    await recognizer.init('./libs/PP-OCRv5_rec_mobile_infer.onnx');
    resizeCanvas();
}

function getCoords(e: any) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
}

canvas.addEventListener('mousedown', (e) => { isDrawing = true; const {x, y} = getCoords(e); ctx.beginPath(); ctx.moveTo(x, y); clearTimeout(recognitionTimer); });
canvas.addEventListener('mousemove', (e) => { if (!isDrawing) return; const {x, y} = getCoords(e); ctx.lineTo(x, y); ctx.stroke(); });
window.addEventListener('mouseup', () => { if (!isDrawing) return; isDrawing = false; recognitionTimer = setTimeout(recognize, 500); });

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; const {x, y} = getCoords(e); ctx.beginPath(); ctx.moveTo(x, y); clearTimeout(recognitionTimer); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (!isDrawing) return; const {x, y} = getCoords(e); ctx.lineTo(x, y); ctx.stroke(); });
canvas.addEventListener('touchend', () => { if (!isDrawing) return; isDrawing = false; recognitionTimer = setTimeout(recognize, 500); });

async function recognize() {
    const result = await recognizer.recognize(canvas);
    renderCandidates(result.candidates);
}

function renderCandidates(candidates: any[]) {
    if (candidates.length === 0) {
        candidateBar.innerHTML = '<span style="color: #c7c7cc; font-size: 14px; margin: auto;">未检测到字符</span>';
        return;
    }
    candidateBar.innerHTML = '';
    candidates.forEach(c => {
        const item = document.createElement('div');
        item.className = 'candidate-item';
        item.innerText = c.character;
        item.title = `得分: ${(c.score * 100).toFixed(1)}%`;
        item.onclick = () => { currentText += c.character; display.innerText = currentText + '|'; ctx.clearRect(0, 0, canvas.width, canvas.height); candidateBar.innerHTML = ''; };
        candidateBar.appendChild(item);
    });
}

clearBtn.onclick = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); candidateBar.innerHTML = '<span style="color: #c7c7cc; font-size: 14px; margin: auto;">已清除</span>'; };
backspaceBtn.onclick = () => { currentText = currentText.slice(0, -1); display.innerText = currentText + '|'; };
spaceBtn.onclick = () => { currentText += ' '; display.innerText = currentText + '|'; };
copyBtn.onclick = () => { navigator.clipboard.writeText(currentText); alert('已复制'); };

window.onresize = resizeCanvas;
init();
