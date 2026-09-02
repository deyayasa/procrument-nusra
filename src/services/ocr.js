import { createWorker } from 'tesseract.js';

let worker = null;
let workerLang = null;

async function getWorker(lang) {
  if (worker && workerLang === lang) return worker;
  if (worker) {
    await worker.terminate();
    worker = null;
  }
  worker = await createWorker(lang);
  workerLang = lang;
  return worker;
}

// Jalankan OCR pada canvas/image, kembalikan teks
export async function ocrImage(imageSource, lang = 'ind') {
  const w = await getWorker(lang);
  const result = await w.recognize(imageSource);
  return result?.data?.text || '';
}

// Bersihkan teks untuk perbandingan akurasi
function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Akurasi berbasis kecocokan kata (word match rate)
export function wordAccuracy(referenceText, testText) {
  const refWords = normalizeText(referenceText).split(' ').filter(Boolean);
  const testWords = normalizeText(testText).split(' ').filter(Boolean);
  if (refWords.length === 0) return testWords.length === 0 ? 100 : 0;
  const testSet = new Set(testWords);
  const matched = refWords.filter((w) => testSet.has(w)).length;
  return (matched / refWords.length) * 100;
}

// Akurasi berbasis kecocokan karakter (character match rate)
export function charAccuracy(referenceText, testText) {
  const ref = normalizeText(referenceText).replace(/\s/g, '');
  const test = normalizeText(testText).replace(/\s/g, '');
  if (ref.length === 0) return test.length === 0 ? 100 : 0;
  const testSet = new Set(test.split(''));
  const matched = ref.split('').filter((c) => testSet.has(c)).length;
  return (matched / ref.length) * 100;
}

// Levenshtein-based similarity (0-100)
export function similarityScore(referenceText, testText) {
  const a = normalizeText(referenceText);
  const b = normalizeText(testText);
  if (a.length === 0 && b.length === 0) return 100;
  if (a.length === 0 || b.length === 0) return 0;

  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  const maxLen = Math.max(a.length, b.length);
  return ((1 - dp[a.length][b.length] / maxLen) * 100).toFixed(2);
}

export function terminateOcr() {
  if (worker) {
    worker.terminate();
    worker = null;
    workerLang = null;
  }
}

export default {
  ocrImage,
  wordAccuracy,
  charAccuracy,
  similarityScore,
  terminateOcr,
};
