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

      // Coba WebGPU dulu, fallback ke WASM
      let providers = [];
      if (typeof navigator !== 'undefined' && navigator.gpu) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          if (adapter) {
            providers = ['webgpu', 'wasm'];
          }
        } catch (err) {
          console.log('[ortWorker] WebGPU tidak tersedia:', err.message);
        }
      }

      if (providers.length === 0) {
        providers = ['wasm'];
      }

      // Coba buat session dengan provider yang dipilih
      for (const ep of providers) {
        try {
          session = await ort.InferenceSession.create(buf, {
            executionProviders: [ep],
            graphOptimizationLevel: 'all',
          });
          activeProvider = ep;
          console.log(`[ortWorker] Session aktif: ${ep}`);
          break;
        } catch (err) {
          console.warn(`[ortWorker] Gagal pakai ${ep}:`, err.message);
          session = null;
        }
      }

      // Fallback terakhir: WASM pasti jalan
      if (!session) {
        session = await ort.InferenceSession.create(buf, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all',
        });
        activeProvider = 'wasm';
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
      const results = await session.run(feeds);
      const output = results[session.outputNames[0]];
      self.postMessage({
        type: 'result',
        tensorData: output.data,
        dims: output.dims,
      }, [output.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'error', message: err.message });
    }
  }
};
