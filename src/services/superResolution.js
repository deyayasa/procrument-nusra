// Super-resolution service — ONNX Real-ESRGAN dijalankan di Web Worker.
// WebGPU dulu (GPU, cepat), fallback WASM (CPU, lebih kecil input).

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

// Max input: WebGPU=512 (GPU cepat), WASM=256 (CPU lambat)
const MAX_WEBGPU = 512;
const MAX_WASM = 256;

let worker = null;
let modelReady = false;
let activeProvider = 'wasm';
let maxInputSize = MAX_WASM;
let readyResolve = null;
const readyPromise = new Promise((r) => { readyResolve = r; });

function getWorker() {
  if (worker) return worker;

  worker = new Worker(
    new URL('../workers/ortWorker.js', import.meta.url),
    { type: 'module' }
  );

  worker.onmessage = (e) => {
    const msg = e.data;
    if (msg.type === 'ready') {
      modelReady = true;
      activeProvider = msg.provider || 'wasm';
      maxInputSize = activeProvider === 'webgpu' ? MAX_WEBGPU : MAX_WASM;
      console.log(`[RealESRGAN] Provider: ${activeProvider} | Max input: ${maxInputSize}px`);
      if (readyResolve) readyResolve();
    }
    if (msg.type === 'error') {
      console.error('[RealESRGAN Worker]', msg.message);
    }
  };

  worker.onerror = (err) => {
    console.error('[RealESRGAN Worker] error:', err.message);
  };

  return worker;
}

// Preprocess canvas → Float32Array NCHW 0-1 (main thread — cepat)
function preprocessImage(imageSource) {
  const img = imageSource;

  let w = img.width;
  let h = img.height;
  if (w > maxInputSize || h > maxInputSize) {
    const scale = maxInputSize / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }

  w = w % 2 === 0 ? w : w - 1;
  h = h % 2 === 0 ? h : h - 1;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const rgba = imageData.data;

  const chw = new Float32Array(3 * h * w);
  const plane = h * w;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * w + x) * 4;
      const pix = y * w + x;
      chw[pix] = rgba[srcIdx] / 255.0;
      chw[plane + pix] = rgba[srcIdx + 1] / 255.0;
      chw[2 * plane + pix] = rgba[srcIdx + 2] / 255.0;
    }
  }

  return { data: chw, dims: [1, 3, h, w] };
}

// Postprocess Float32Array NCHW → canvas (main thread — cepat)
function postprocess(outputData, outH, outW) {
  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(outW, outH);
  const out = imageData.data;
  const plane = outH * outW;
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const dstIdx = (y * outW + x) * 4;
      const pix = y * outW + x;
      const r = Math.round(outputData[pix] * 255);
      const g = Math.round(outputData[plane + pix] * 255);
      const b = Math.round(outputData[2 * plane + pix] * 255);
      out[dstIdx] = Math.max(0, Math.min(255, r));
      out[dstIdx + 1] = Math.max(0, Math.min(255, g));
      out[dstIdx + 2] = Math.max(0, Math.min(255, b));
      out[dstIdx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function getModelLoaded() {
  return modelReady;
}

export function getActiveProvider() {
  return activeProvider;
}

export function getMaxInputSize() {
  return maxInputSize;
}

export async function loadModel() {
  if (modelReady) return true;

  const w = getWorker();
  const modelUrl = `${BASE}models/RealESRGAN_x4.onnx`;
  console.log('[RealESRGAN] Memuat model via Web Worker:', modelUrl);
  w.postMessage({ type: 'init', modelUrl });

  await readyPromise;
  return true;
}

// Proses satu canvas/image → canvas super-resolved (4x)
export async function superResolve(imageSource) {
  if (!modelReady) await loadModel();

  const { data, dims } = preprocessImage(imageSource);

  return new Promise((resolve, reject) => {
    const handleMessage = (e) => {
      const msg = e.data;
      if (msg.type === 'result') {
        worker.removeEventListener('message', handleMessage);
        const resultData = msg.tensorData instanceof Float32Array
          ? msg.tensorData
          : new Float32Array(msg.tensorData);
        resolve(postprocess(resultData, msg.dims[2], msg.dims[3]));
      }
      if (msg.type === 'error') {
        worker.removeEventListener('message', handleMessage);
        reject(new Error(msg.message));
      }
    };

    worker.addEventListener('message', handleMessage);
    worker.postMessage({
      type: 'inference',
      tensorData: data,
      dims,
    }, [data.buffer]);
  });
}

// Hitung PSNR (dB) antara dua canvas
export function computePSNR(canvasA, canvasB) {
  const ctxA = canvasA.getContext('2d');
  const ctxB = canvasB.getContext('2d');
  const a = ctxA.getImageData(0, 0, canvasA.width, canvasA.height).data;
  const b = ctxB.getImageData(0, 0, canvasB.width, canvasB.height).data;
  let mse = 0;
  const n = a.length / 4;
  for (let i = 0; i < a.length; i += 4) {
    const dr = a[i] - b[i];
    const dg = a[i + 1] - b[i + 1];
    const db = a[i + 2] - b[i + 2];
    mse += dr * dr + dg * dg + db * db;
  }
  mse /= (n * 3);
  if (mse === 0) return 100;
  return 10 * Math.log10(255 * 255 / mse);
}

export default {
  loadModel,
  superResolve,
  computePSNR,
  getModelLoaded,
  getActiveProvider,
  getMaxInputSize,
};
