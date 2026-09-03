import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { loadModel, superResolve, computePSNR, getModelLoaded, getActiveProvider, getMaxInputSize } from '../services/superResolution';
import { ocrImage, wordAccuracy, charAccuracy, similarityScore } from '../services/ocr';
import { detectBatchQuality } from '../services/imageQuality';
import { logVerificationResult } from '../services/api';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const STAGE = {
  IDLE: 'idle',
  EXTRACT: 'extract',
  BASELINE_OCR: 'baseline',
  SUPER_RES: 'superres',
  OCR_ENHANCED: 'enhanced',
  DONE: 'done',
};

const RESULTS_KEY = 'verifikasi_hasils';

const VerifikasiBerkas = () => {
  const [files, setFiles] = useState([]);
  const [stage, setStage] = useState(STAGE.IDLE);
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(0);
  const [lang, setLang] = useState('ind');
  const [modelReady, setModelReady] = useState(false);
  const [logStatus, setLogStatus] = useState('');
  const [qualityResults, setQualityResults] = useState(null);
  const [qualityLoading, setQualityLoading] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);
  const [forceEsrgran, setForceEsrgran] = useState(true);
  const [esrganError, setEsrgranError] = useState(null);
  const inputRef = useRef(null);

  const loadModelClick = useCallback(async () => {
    setProgress('Mengunduh & memuat model Real-ESRGAN (ONNX)...');
    try {
      await loadModel();
      setModelReady(true);
      const provider = getActiveProvider();
      const maxIn = getMaxInputSize();
      const mode = provider === 'webgpu' ? 'WebGPU (GPU)' : 'WASM (CPU)';
      setProgress(`Model Real-ESRGAN siap — Mode: ${mode} | Max input: ${maxIn}px ✅`);
    } catch (e) {
      console.error(e);
      setProgress('Gagal memuat model: ' + e.message);
    }
  }, []);

  const handleFiles = async (e) => {
    const arr = Array.from(e.target.files || []);
    if (arr.length === 0) return;
    const newFiles = arr.map((f) => ({ file: f, name: f.name }));
    setFiles((prev) => [...prev, ...newFiles]);
    setResults([]);
    setLogStatus('');
    setQualityResults(null);
    e.target.value = '';

    // Deteksi kualitas untuk semua file
    setQualityLoading(true);
    const allQuality = [];

    for (const f of newFiles) {
      const isPdf = f.name.toLowerCase().endsWith('.pdf') || f.file.type === 'application/pdf';
      try {
        let pages = [];
        if (isPdf) {
          pages = await extractPdfPages(f.file);
        } else {
          pages = [await fileToCanvas(f.file)];
        }
        const batch = detectBatchQuality(pages);
        batch.results.forEach((r) => {
          allQuality.push({
            fileName: f.name,
            pageIdx: r.pageIdx,
            score: r.score,
            quality: r.quality,
          });
        });
      } catch (err) {
        console.error('Gagal deteksi kualitas:', f.name, err);
      }
    }

    setQualityResults(allQuality);
    setQualityLoading(false);
  };

  // Downscale canvas untuk OCR (max 1024px) — OCR tidak butuh resolusi tinggi
  const downscaleForOcr = (canvas, maxPx = 1024) => {
    const w = canvas.width;
    const h = canvas.height;
    if (w <= maxPx && h <= maxPx) return canvas;
    const scale = maxPx / Math.max(w, h);
    const resized = document.createElement('canvas');
    resized.width = Math.round(w * scale);
    resized.height = Math.round(h * scale);
    resized.getContext('2d').drawImage(canvas, 0, 0, resized.width, resized.height);
    return resized;
  };

  // Render PDF ke daftar canvas halaman
  const extractPdfPages = async (file) => {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      pages.push(canvas);
    }
    return pages;
  };

  const fileToCanvas = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });

  const run = async () => {
    if (files.length === 0) return;
    setResults([]);
    setLogStatus('');
    setSelectedFile(0);

    if (!getModelLoaded()) {
      setProgress('Memuat model Real-ESRGAN terlebih dahulu...');
      try {
        await loadModel();
        setModelReady(true);
        const provider = getActiveProvider();
        const mode = provider === 'webgpu' ? 'WebGPU (GPU)' : 'WASM (CPU)';
        setProgress(`Model siap — Mode: ${mode} | Max input: ${getMaxInputSize()}px`);
      } catch {
        setProgress('Model belum siap. Klik "Muat Model" dulu.');
        return;
      }
    }

    const allResults = [];
    let pageIdx = 0;
    let totalPages = 0;

    // Hitung total halaman dulu untuk progres
    for (const f of files) {
      const isPdf = f.name.toLowerCase().endsWith('.pdf') || f.file.type === 'application/pdf';
      if (isPdf) {
        const buf = await f.file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: buf }).promise;
        totalPages += pdf.numPages;
      } else {
        totalPages += 1;
      }
    }

    const overallStart = performance.now();

    for (const f of files) {
      let pages = [];
      const isPdf = f.name.toLowerCase().endsWith('.pdf') || f.file.type === 'application/pdf';
      try {
        if (isPdf) {
          setStage(STAGE.EXTRACT);
          setProgress(`Ekstraksi halaman PDF: ${f.name}...`);
          pages = await extractPdfPages(f.file);
        } else {
          setStage(STAGE.EXTRACT);
          pages = [await fileToCanvas(f.file)];
        }
        await new Promise(r => setTimeout(r, 0));
      } catch (e) {
        console.error(e);
        setProgress(`Gagal membaca ${f.name}: ${e.message}`);
        continue;
      }

      for (const page of pages) {
        pageIdx += 1;
        const progressPage = `[${pageIdx}/${totalPages}]`;
        const t0 = performance.now();
        const timings = {};

        // Cek kualitas dari hasil deteksi saat upload
        const qualityInfo = qualityResults?.find(
          (q) => q.fileName === f.name && q.pageIdx === pageIdx - 1
        );
        const isPoor = forceEsrgran ? true : (qualityInfo ? qualityInfo.quality === 'poor' : true);
        const qualityScore = qualityInfo?.score ?? 0;

        const entry = {
          fileName: f.name,
          pageNo: pageIdx,
          beforeCanvas: page,
          beforeText: '',
          afterCanvas: null,
          afterText: '',
          wordAcc: 0,
          charAcc: 0,
          simScore: 0,
          psnr: 0,
          qualityScore,
          skippedEsrgran: false,
        };

        // OCR baseline (sebelum penajaman) — pakai versi downscale
        setStage(STAGE.BASELINE_OCR);
        setProgress(`${progressPage} ${isPoor ? '🔴' : '🟢'} OCR teks asli (sebelum penajaman)...`);
        const ocrPage = downscaleForOcr(page);
        try {
          entry.beforeText = await ocrImage(ocrPage, lang);
        } catch (e) {
          console.error(e);
          entry.beforeText = '';
        }
        timings.ocrBefore = ((performance.now() - t0) / 1000).toFixed(1);
        await new Promise(r => setTimeout(r, 0));

        // Super resolution — skip jika kualitas sudah bagus
        const t1 = performance.now();
        if (isPoor) {
          setStage(STAGE.SUPER_RES);
          setProgress(`${progressPage} 🔴 Penajaman super-resolution (Real-ESRGAN via WASM)...`);
          try {
            entry.afterCanvas = await superResolve(page);
            setEsrgranError(null);
          } catch (e) {
            console.error('[ESRGAN] Gagal:', e.message);
            setEsrgranError(`Hal ${pageIdx}: ${e.message}`);
            entry.afterCanvas = page;
            entry.skippedEsrgran = true;
          }
          timings.superRes = ((performance.now() - t1) / 1000).toFixed(1);
        } else {
          // Skip ESRGAN — gunakan gambar asli
          entry.afterCanvas = page;
          entry.skippedEsrgran = true;
          timings.superRes = '0.0';
          setProgress(`${progressPage} 🟢 Skip ESRGAN (kualitas baik, score: ${qualityScore})`);
        }
        await new Promise(r => setTimeout(r, 0));

        // OCR enhanced (setelah penajaman/downscale)
        const t2 = performance.now();
        setStage(STAGE.OCR_ENHANCED);
        const afterForOcr = downscaleForOcr(entry.afterCanvas);
        setProgress(`${progressPage} ${isPoor ? '🔴' : '🟢'} OCR teks hasil${isPoor ? ' penajaman' : ' asli'}...`);
        try {
          entry.afterText = await ocrImage(afterForOcr, lang);
        } catch (e) {
          console.error(e);
          entry.afterText = '';
        }
        timings.ocrAfter = ((performance.now() - t2) / 1000).toFixed(1);

        // Hitung metrik
        entry.wordAcc = wordAccuracy(entry.beforeText, entry.afterText);
        entry.charAcc = charAccuracy(entry.beforeText, entry.afterText);
        entry.simScore = similarityScore(entry.beforeText, entry.afterText);
        if (isPoor) {
          try {
            entry.psnr = computePSNR(page, entry.afterCanvas);
          } catch {
            entry.psnr = 0;
          }
        } else {
          entry.psnr = null;
        }

        const pageTotal = ((performance.now() - t0) / 1000).toFixed(1);
        const status = entry.skippedEsrgran ? 'SKIP' : 'ESRGAN';
        console.log(`${progressPage} [${status}] OCR: ${timings.ocrBefore}s + ESRGAN: ${timings.superRes}s + OCR: ${timings.ocrAfter}s = ${pageTotal}s`);

        allResults.push(entry);
        await new Promise(r => setTimeout(r, 0));
      }
    }

    const overallSec = ((performance.now() - overallStart) / 1000).toFixed(1);
    setResults(allResults);
    setStage(STAGE.DONE);
    const esrganCount = allResults.filter((r) => !r.skippedEsrgran).length;
    const skipCount = allResults.filter((r) => r.skippedEsrgran).length;
    setProgress(`${allResults.length} halaman selesai — ${esrganCount} ESRGAN, ${skipCount} skip (${overallSec}s) ✅`);

    // Cache hasil untuk sesi
    try {
      const cache = JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]');
      cache.push(...allResults.map((r) => ({
        fileName: r.fileName,
        pageNo: r.pageNo,
        wordAcc: r.wordAcc,
        charAcc: r.charAcc,
        simScore: r.simScore,
        psnr: r.psnr ?? null,
        qualityScore: r.qualityScore,
        skippedEsrgran: r.skippedEsrgran,
        timestamp: new Date().toISOString(),
      })));
      localStorage.setItem(RESULTS_KEY, JSON.stringify(cache.slice(-500)));
    } catch {
      // ignore cache quota
    }
  };

  const writeLog = async () => {
    setLogStatus('Mengirim data ke Google Sheets...');
    const rows = results.map((r) => ({
      filename: r.fileName,
      page: r.pageNo,
      word_accuracy: r.wordAcc,
      char_accuracy: r.charAcc,
      similarity: r.simScore,
      psnr: r.psnr ?? 'N/A',
      quality_score: r.qualityScore,
      skipped_esrgan: r.skippedEsrgran,
      timestamp: new Date().toISOString(),
    }));
    try {
      await logVerificationResult({ rows });
      setLogStatus('Data berhasil disimpan ke Google Sheets ✅');
    } catch {
      setLogStatus('Gagal menyimpan. Periksa endpoint Apps Script / network.');
    }
  };

  const reselectable = selectedFile >= 0 && selectedFile < results.length ? selectedFile : 0;
  const current = results[reselectable] || null;
  const beforeUrl = current ? current.beforeCanvas.toDataURL('image/jpeg', 0.85) : null;
  const afterUrl = current && current.afterCanvas ? current.afterCanvas.toDataURL('image/jpeg', 0.85) : null;

  return (
    <div className="min-h-screen bg-[#f6efe6] text-[#2b2724] p-4 md:p-8">
      {/* Header */}
      <div className="mx-auto max-w-6xl mb-6 flex items-center justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8aa7c2] hover:text-[#6f8fae] transition-all">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-xl md:text-2xl font-black tracking-tight mt-2">
            Verifikasi Berkas · Deep Learning Super-Resolution (Real-ESRGAN)
          </h1>
          <p className="text-xs text-[#8f8278] font-semibold mt-1">
            Penajaman citra teks dokumen PDF rendah resolusi untuk meningkatkan akurasi verifikasi OCR
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        {/* Panel model */}
        <div className="bg-white border border-[#dccaba] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#8f8278]">Model Super-Resolution</p>
            <p className="text-sm font-bold mt-1">
              {modelReady ? (
                <>Real-ESRGAN siap ✅</>
              ) : (
                'Model belum dimuat'
              )}
            </p>
            {modelReady && (
              <p className="text-[10px] text-green-600 font-bold">
                Mode: {getActiveProvider() === 'webgpu' ? '🚀 WebGPU (GPU)' : '⚡ WASM (CPU)'} — Max input: {getMaxInputSize()}px
              </p>
            )}
            <p className="text-[10px] text-[#8f8278] font-semibold">{progress}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-black uppercase tracking-widest text-[#8f8278]">OCR:</span>
              <div className="flex border border-[#e8d8c8] rounded-xl overflow-hidden">
                {['ind', 'eng'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 font-black uppercase tracking-widest transition-all cursor-pointer ${lang === l ? 'bg-[#8aa7c2] text-white' : 'text-[#8f8278] hover:bg-[#f0e0ce]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={loadModelClick}
              disabled={modelReady}
              className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#8aa7c2] to-[#6f8fae] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#6f8fae] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {modelReady ? 'Terkirim ✓' : '⏬ Muat Model'}
            </button>
          </div>
        </div>

        {/* Panel upload */}
        <div className="bg-white border border-[#dccaba] rounded-2xl p-5">
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#e8d8c8] rounded-2xl p-8 cursor-pointer hover:border-[#8aa7c2] hover:bg-[#fcfaf7] transition-all text-center"
          >
            <span className="text-4xl">📁</span>
            <span className="text-sm font-black text-[#2b2724] uppercase tracking-widest">Klik untuk pilih berkas PDF / Gambar</span>
            <span className="text-[10px] text-[#8f8278] font-semibold">Format: PDF, PNG, JPG, JPEG — diproses di browser (WebGPU / WASM)</span>
            <input ref={inputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={handleFiles} className="hidden" />
          </label>

          {files.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between border border-[#e8d8c8] rounded-xl px-3 py-2 bg-[#fcfaf7] text-xs font-bold">
                  <span className="truncate">📄 {f.name}</span>
                  <button
                    onClick={() => {
                      const next = files.filter((_, idx) => idx !== i);
                      setFiles(next);
                      setResults([]);
                      setQualityResults(null);
                    }}
                    className="text-[#d87c7c] hover:text-[#c56363] cursor-pointer"
                  >
                    🗑
                  </button>
                </div>
              ))}

              {/* Quality Detection Summary */}
              {qualityLoading && (
                <div className="flex items-center gap-2 text-xs font-bold text-[#8aa7c2] mt-2">
                  <span className="inline-block w-3 h-3 border-2 border-[#8aa7c2] border-t-transparent rounded-full animate-spin"></span>
                  Menganalisis kualitas gambar...
                </div>
              )}
              {qualityResults && !qualityLoading && (
                <div className="mt-2 p-3 bg-[#fcfaf7] border border-[#e8d8c8] rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8f8278] mb-2">
                    🔍 Hasil Deteksi Kualitas Gambar
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-[#d87c7c]">
                      🔴 Butuh ESRGAN: {qualityResults.filter((q) => q.quality === 'poor').length} halaman
                    </span>
                    <span className="text-green-600">
                      🟢 Bagus (skip): {qualityResults.filter((q) => q.quality === 'good').length} halaman
                    </span>
                    <span className="text-[#8f8278]">
                      Total: {qualityResults.length} halaman
                    </span>
                  </div>
                  {qualityResults.filter((q) => q.quality === 'poor').length > 0 && (
                    <div className="mt-2 text-[10px] text-[#8f8278]">
                      <span className="font-black">Halaman jelek:</span>{' '}
                      {qualityResults
                        .filter((q) => q.quality === 'poor')
                        .map((q) => `#${q.pageIdx + 1} (${q.score})`)
                        .join(', ')}
                    </div>
                  )}
                </div>
              )}

              {/* Toggle: Force ESRGAN */}
              <div className="flex items-center gap-3 mt-3 p-3 bg-[#fcfaf7] border border-[#e8d8c8] rounded-xl">
                <button
                  type="button"
                  onClick={() => setForceEsrgran(!forceEsrgran)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${forceEsrgran ? 'bg-[#8aa7c2]' : 'bg-[#d1c8bb]'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${forceEsrgran ? 'translate-x-5' : ''}`}></span>
                </button>
                <div className="text-xs">
                  <span className="font-black text-[#2b2724]">Proses semua halaman dengan ESRGAN</span>
                  <p className="text-[10px] text-[#8f8278] font-semibold mt-0.5">
                    {forceEsrgran ? 'Semua halaman diproses ESRGAN (data lengkap untuk skripsi)' : 'Hanya gambar jelek yang diproses ESRGAN (lebih cepat)'}
                  </p>
                </div>
              </div>

              <button
                onClick={run}
                disabled={!modelReady || files.length === 0 || stage === STAGE.SUPER_RES || stage === STAGE.BASELINE_OCR || stage === STAGE.OCR_ENHANCED}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#d87c7c] to-[#c56363] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#c56363] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {stage === STAGE.DONE ? '↻ Proses Ulang' : '▶ Proses: Upload → Penajaman → Verifikasi OCR'}
              </button>
              {!modelReady && (
                <p className="text-[10px] text-[#d87c7c] font-bold">Muat model terlebih dahulu sebelum memproses.</p>
              )}
            </div>
          )}
        </div>

        {/* Progress */}
        {(stage === STAGE.EXTRACT || stage === STAGE.BASELINE_OCR || stage === STAGE.SUPER_RES || stage === STAGE.OCR_ENHANCED) && (
          <div className="bg-white border border-[#dccaba] rounded-2xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[#8f8278] mb-2">Proses Berjalan</p>
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="inline-block w-4 h-4 border-2 border-[#8aa7c2] border-t-transparent rounded-full animate-spin"></span>
              {progress}
            </div>
          </div>
        )}

        {/* ESRGAN Error */}
        {esrganError && (
          <div className="bg-red-50 border border-red-300 rounded-2xl p-4">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">⚠️ ESRGAN Error</p>
            <p className="text-xs text-red-700 font-semibold">{esrganError}</p>
            <p className="text-[10px] text-red-500 mt-1">Gambar menggunakan versi asli (tanpa penajaman).</p>
          </div>
        )}

        {/* Hasil */}
        {results.length > 0 && (
          <div className="flex flex-col gap-6">
            {/* Ringkasan metrik */}
            <div className="bg-white border border-[#dccaba] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-[#8f8278]">Hasil Verifikasi OCR ({results.length} halaman)</p>
                <button
                  onClick={writeLog}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#6f8fae] to-[#8aa7c2] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#6f8fae] cursor-pointer"
                >
                  💾 Simpan ke Data Skripsi
                </button>
              </div>
              {logStatus && <p className="text-xs font-bold mb-3">{logStatus}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Metric label="Kata Cocok" value={avg(results, 'wordAcc')} unit="%" />
                <Metric label="Karakter Cocok" value={avg(results, 'charAcc')} unit="%" />
                <Metric label="Similarity" value={avg(results, 'simScore')} unit="%" />
                <Metric label="PSNR Rata-rata" value={avgPsnr(results)} unit=" dB" />
                <div className="bg-[#f0e0ce] rounded-xl p-3 flex flex-col justify-center items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#8f8278]">Halaman</span>
                  <select
                    value={reselectable}
                    onChange={(e) => setSelectedFile(Number(e.target.value))}
                    className="mt-1 bg-white border border-[#e8d8c8] rounded-lg px-2 py-1 text-xs font-black"
                  >
                    {results.map((r, i) => (
                      <option key={i} value={i}>{r.fileName} · hal {r.pageNo}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {current && (
              <div className="flex flex-col gap-6">
                {/* Preview gambar sebelum/sesudah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PreviewCard
                    title={`Sebelum Penajaman — ${current.fileName} (hal ${current.pageNo})`}
                    url={beforeUrl}
                    psnr={null}
                    onClick={() => setPreviewModal({ url: beforeUrl, title: `Sebelum Penajaman — ${current.fileName} (hal ${current.pageNo})` })}
                  />
                  <PreviewCard
                    title="Sesudah Penajaman (Real-ESRGAN 4x)"
                    url={afterUrl}
                    psnr={current.psnr ?? 'N/A'}
                    onClick={() => setPreviewModal({ url: afterUrl, title: `Sesudah Penajaman — ${current.fileName} (hal ${current.pageNo})` })}
                  />
                </div>

                {/* Teks OCR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <OcrCard title="Teks OCR — Sebelum Penajaman" text={current.beforeText} acc={current.wordAcc} />
                  <OcrCard title="Teks OCR — Sesudah Penajaman" text={current.afterText} acc={current.wordAcc} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <PreviewModal
          url={previewModal.url}
          title={previewModal.title}
          onClose={() => setPreviewModal(null)}
        />
      )}
    </div>
  );
};

const avg = (arr, key) => {
  if (!arr.length) return 0;
  return (arr.reduce((s, r) => s + (Number(r[key]) || 0), 0) / arr.length).toFixed(2);
};

const avgPsnr = (arr) => {
  const withPsnr = arr.filter((r) => r.psnr != null && r.psnr !== 0);
  if (!withPsnr.length) return 'N/A';
  return (withPsnr.reduce((s, r) => s + Number(r.psnr), 0) / withPsnr.length).toFixed(2);
};

const Metric = ({ label, value, unit }) => (
  <div className="bg-[#fcfaf7] border border-[#e8d8c8] rounded-xl p-3">
    <span className="text-[9px] font-black uppercase tracking-widest text-[#8f8278]">{label}</span>
    <div className="text-xl font-black mt-1">{value}<span className="text-xs">{unit}</span></div>
  </div>
);

const PreviewCard = ({ title, url, psnr, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white border border-[#dccaba] rounded-2xl p-4 text-left cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all w-full group"
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#8f8278]">{title}</p>
      {psnr != null && psnr !== 'N/A' && <span className="text-[10px] font-black text-green-600">PSNR {Number(psnr).toFixed(2)} dB</span>}
      {psnr === 'N/A' && <span className="text-[10px] font-black text-[#8aa7c2]">Skip ESRGAN</span>}
    </div>
    {url ? (
      <div className="relative">
        <img src={url} alt={title} className="w-full h-64 object-contain bg-[#f6efe6] rounded-xl border border-[#e8d8c8]" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-all flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            🔍 Klik untuk lihat full-size
          </span>
        </div>
      </div>
    ) : (
      <div className="w-full h-64 flex items-center justify-center text-[#8f8278] text-xs font-bold bg-[#f6efe6] rounded-xl border border-[#e8d8c8]">Tidak tersedia</div>
    )}
  </button>
);

const PreviewModal = ({ url, title, onClose }) => {
  if (!url) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black uppercase tracking-widest text-white">{title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-sm font-bold cursor-pointer transition-all"
          >
            ✕
          </button>
        </div>
        <img src={url} alt={title} className="w-full max-h-[80vh] object-contain rounded-xl" />
      </div>
    </div>
  );
};

const OcrCard = ({ title, text, acc }) => (
  <div className="bg-white border border-[#dccaba] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#8f8278]">{title}</p>
      <span className="text-[10px] font-black text-[#8aa7c2]">Kata cocok {Number(acc || 0).toFixed(1)}%</span>
    </div>
    <pre className="whitespace-pre-wrap text-[11px] leading-relaxed font-mono bg-[#fcfaf7] border border-[#e8d8c8] rounded-xl p-3 max-h-56 overflow-auto">
      {text || '(tidak ada teks terdeteksi)'}
    </pre>
  </div>
);

export default VerifikasiBerkas;
