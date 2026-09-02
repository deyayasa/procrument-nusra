/**
 * Deteksi kualitas gambar menggunakan Laplacian Variance.
 *
 * Prinsip:
 * - Laplacian edge detection menghasilkan nilai tinggi untuk gambar tajam (banyak tepi)
 * - Variance rendah = gambar blur/rendah resolusi → perlu ESRGAN
 * - Variance tinggi = gambar tajam/bagus → skip ESRGAN
 *
 * Threshold default: 100
 *   score < 100  → "poor" (perlu ESRGAN)
 *   score >= 100 → "good" (skip ESRGAN)
 */

const DEFAULT_THRESHOLD = 100;

// Laplacian kernel 3x3
const LAPLACIAN_KERNEL = [
  0,  1, 0,
  1, -4, 1,
  0,  1, 0,
];

// Konversi RGB grayscale
function toGrayscale(imageData) {
  const { data, width, height } = imageData;
  const gray = new Float32Array(width * height);
  for (let i = 0; i < gray.length; i++) {
    const idx = i * 4;
    // Formula luminance standar
    gray[i] = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
  }
  return gray;
}

// Apply convolution kernel
function convolve(gray, width, height, kernel) {
  const out = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = (y + ky) * width + (x + kx);
          const ki = (ky + 1) * 3 + (kx + 1);
          sum += gray[idx] * kernel[ki];
        }
      }
      out[y * width + x] = sum;
    }
  }
  return out;
}

// Hitung mean
function mean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum / arr.length;
}

// Hitung variance
function variance(arr, avg) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const diff = arr[i] - avg;
    sum += diff * diff;
  }
  return sum / arr.length;
}

/**
 * Deteksi kualitas gambar.
 * @param {HTMLCanvasElement|HTMLImageElement} imageSource
 * @param {number} threshold - batas score untuk kategorisasi (default: 100)
 * @returns {{ score: number, quality: 'good'|'poor' }}
 */
export function detectImageQuality(imageSource, threshold = DEFAULT_THRESHOLD) {
  // Buat canvas untuk baca pixel
  const w = imageSource.width || imageSource.videoWidth;
  const h = imageSource.height || imageSource.videoHeight;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageSource, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const gray = toGrayscale(imageData);
  const laplacian = convolve(gray, w, h, LAPLACIAN_KERNEL);

  const avg = mean(laplacian);
  const score = variance(laplacian, avg);

  return {
    score: Math.round(score),
    quality: score < threshold ? 'poor' : 'good',
    threshold,
  };
}

/**
 * Batch deteksi kualitas untuk array canvas.
 * @param {HTMLCanvasElement[]} canvases
 * @param {number} threshold
 * @returns {{ poor: number, good: number, results: Array<{pageIdx: number, score: number, quality: string}> }}
 */
export function detectBatchQuality(canvases, threshold = DEFAULT_THRESHOLD) {
  const results = canvases.map((canvas, i) => {
    const { score, quality } = detectImageQuality(canvas, threshold);
    return { pageIdx: i, score, quality };
  });

  const poor = results.filter((r) => r.quality === 'poor').length;
  const good = results.filter((r) => r.quality === 'good').length;

  return { poor, good, results };
}

export default {
  detectImageQuality,
  detectBatchQuality,
};
