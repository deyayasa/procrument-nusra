import * as ort from 'onnxruntime-web';

ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/';
ort.env.wasm.numThreads = 1;

let session = null;
let activeProvider = 'wasm';

self.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === 'init') {
    try {
      const resp = await fetch(msg.modelUrl);
      const buf = new Uint8Array(await resp.arrayBuffer());

      // Real-ESRGAN ONNX tidak kompatibel dengan WebGPU (Conv kernel gagal).
      // Paksa WASM yang pasti jalan untuk semua ONNX model.
      try {
        session = await ort.InferenceSession.create(buf, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all',
        });
        activeProvider = 'wasm';
        console.log(`[ortWorker] Session aktif: wasm`);
      } catch (err) {
        console.error(`[ortWorker] Gagal buat session WASM:`, err.message);
        throw err;
      }

      self.postMessage({
        type: 'ready',
        provider: activeProvider,
      });
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }

  if (msg.type === 'inference' && session) {
    try {
      const input = new ort.Tensor('float32', new Float32Array(msg.tensorData), msg.dims);
      const feeds = { [session.inputNames[0]]: input };

      console.log(`[ortWorker] Inference dimulai — input dims: ${msg.dims}`);

      const results = await session.run(feeds);
      const output = results[session.outputNames[0]];

      console.log(`[ortWorker] Inference selesai — output dims: ${output.dims}`);

      self.postMessage({
        type: 'result',
        tensorData: output.data,
        dims: output.dims,
      }, [output.data.buffer]);
    } catch (err) {
      console.error('[ortWorker] Inference error:', err.message);
      self.postMessage({ type: 'error', message: err.message });
    }
  }
};
