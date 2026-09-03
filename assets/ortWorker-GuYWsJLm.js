(function(){
/*!
* ONNX Runtime Web v1.29.0
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT License.
*/
var e=Object.defineProperty,t=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,r=Object.prototype.hasOwnProperty,i=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error(`Dynamic require of "`+e+`" is not supported`)}),a=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},o=(t,n)=>{for(var r in n)e(t,r,{get:n[r],enumerable:!0})},s=(i,a,o,s)=>{if(a&&typeof a==`object`||typeof a==`function`)for(let c of n(a))!r.call(i,c)&&c!==o&&e(i,c,{get:()=>a[c],enumerable:!(s=t(a,c))||s.enumerable});return i},c=t=>s(e({},`__esModule`,{value:!0}),t),l,u,d,f,p,m=a(()=>{"use strict";l=new Map,u=[],d=(e,t,n)=>{if(t&&typeof t.init==`function`&&typeof t.createInferenceSessionHandler==`function`){let r=l.get(e);if(r===void 0)l.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let t=u.indexOf(e);t!==-1&&u.splice(t,1);for(let t=0;t<u.length;t++)if(l.get(u[t]).priority<=n){u.splice(t,0,e);return}u.push(e)}return}throw TypeError(`not a valid backend`)},f=async e=>{let t=l.get(e);if(!t)return`backend not found.`;if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return n||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},p=async e=>{let t=e.executionProviders||[],n=t.map(e=>typeof e==`string`?e:e.name),r=n.length===0?u:n,i,a=[],o=new Set;for(let e of r){let t=await f(e);typeof t==`string`?a.push({name:e,err:t}):(i||=t,i===t&&o.add(e))}if(!i)throw Error(`no available backend found. ERR: ${a.map(e=>`[${e.name}] ${e.err}`).join(`, `)}`);for(let{name:e,err:t}of a)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let s=t.filter(e=>o.has(typeof e==`string`?e:e.name));return[i,new Proxy(e,{get:(e,t)=>t===`executionProviders`?s:Reflect.get(e,t)})]}}),h=a(()=>{"use strict";m()}),g,_=a(()=>{"use strict";g=`1.29.0`}),v,y,b=a(()=>{"use strict";_(),v=`warning`,y={wasm:{},webgl:{},webgpu:{},versions:{common:g},set logLevel(e){if(e!==void 0){if(typeof e!=`string`||[`verbose`,`info`,`warning`,`error`,`fatal`].indexOf(e)===-1)throw Error(`Unsupported logging level: ${e}`);v=e}},get logLevel(){return v}},Object.defineProperty(y,"logLevel",{enumerable:!0})}),x,S=a(()=>{"use strict";b(),x=y}),C,w,ee=a(()=>{"use strict";C=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext(`2d`);if(r!=null){let i,a;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=t?.format===void 0?`RGB`:t.format,s=t?.norm,c,l;s===void 0||s.mean===void 0?c=[255,255,255,255]:typeof s.mean==`number`?c=[s.mean,s.mean,s.mean,s.mean]:(c=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(c[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias==`number`?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let u=a*i,d=0,f=u,p=u*2,m=-1;o===`RGBA`?(d=0,f=u,p=u*2,m=u*3):o===`RGB`?(d=0,f=u,p=u*2):o===`RBG`&&(d=0,p=u,f=u*2);for(let t=0;t<a;t++)for(let n=0;n<i;n++){let i=(e.data[d++]-l[0])*c[0],a=(e.data[f++]-l[1])*c[1],o=(e.data[p++]-l[2])*c[2],s=m===-1?255:(e.data[m++]-l[3])*c[3];r.fillStyle=`rgba(`+i+`,`+a+`,`+o+`,`+s+`)`,r.fillRect(n,t,1,1)}if(`toDataURL`in n)return n.toDataURL();throw Error(`toDataURL is not supported`)}throw Error(`Can not access image data`)},w=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`).getContext(`2d`):new OffscreenCanvas(1,1).getContext(`2d`),r;if(n!=null){let i,a,o;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:`RGB`,c=t?.norm,l,u;c===void 0||c.mean===void 0?l=[255,255,255,255]:typeof c.mean==`number`?l=[c.mean,c.mean,c.mean,c.mean]:(l=[c.mean[0],c.mean[1],c.mean[2],255],c.mean[3]!==void 0&&(l[3]=c.mean[3])),c===void 0||c.bias===void 0?u=[0,0,0,0]:typeof c.bias==`number`?u=[c.bias,c.bias,c.bias,c.bias]:(u=[c.bias[0],c.bias[1],c.bias[2],0],c.bias[3]!==void 0&&(u[3]=c.bias[3]));let d=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!==`RGBA`||o===3&&t.format!==`RGB`&&t.format!==`BGR`))throw Error(`Tensor format doesn't match input tensor dims`);let f=0,p=1,m=2,h=3,g=0,_=d,v=d*2,y=-1;s===`RGBA`?(g=0,_=d,v=d*2,y=d*3):s===`RGB`?(g=0,_=d,v=d*2):s===`RBG`&&(g=0,v=d,_=d*2),r=n.createImageData(i,a);for(let t=0;t<a*i;f+=4,p+=4,m+=4,h+=4,t++)r.data[f]=(e.data[g++]-u[0])*l[0],r.data[p]=(e.data[_++]-u[1])*l[1],r.data[m]=(e.data[v++]-u[2])*l[2],r.data[h]=y===-1?255:(e.data[y++]-u[3])*l[3]}else throw Error(`Can not access image data`);return r}}),T,E,D,O,k,A,te=a(()=>{"use strict";de(),T=(e,t)=>{if(e===void 0)throw Error(`Image buffer must be defined`);if(t.height===void 0||t.width===void 0)throw Error(`Image height and width must be defined`);if(t.tensorLayout===`NHWC`)throw Error(`NHWC Tensor layout is not supported yet`);let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;a=typeof i.mean==`number`?[i.mean,i.mean,i.mean,i.mean]:[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],o=typeof i.bias==`number`?[i.bias,i.bias,i.bias,i.bias]:[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format===void 0?`RGBA`:t.format,c=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:`RGB`,l=n*r,u=c===`RGBA`?new Float32Array(l*4):new Float32Array(l*3),d=4,f=0,p=1,m=2,h=3,g=0,_=l,v=l*2,y=-1;s===`RGB`&&(d=3,f=0,p=1,m=2,h=-1),c===`RGBA`?y=l*3:c===`RBG`?(g=0,v=l,_=l*2):c===`BGR`&&(v=0,_=l,g=l*2);for(let t=0;t<l;t++,f+=d,m+=d,p+=d,h+=d)u[g++]=(e[f]+o[0])/a[0],u[_++]=(e[p]+o[1])/a[1],u[v++]=(e[m]+o[2])/a[2],y!==-1&&h!==-1&&(u[y++]=(e[h]+o[3])/a[3]);return c===`RGBA`?new ue(`float32`,u,[1,4,n,r]):new ue(`float32`,u,[1,3,n,r])},E=async(e,t)=>{let n=typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement,r=typeof ImageData<`u`&&e instanceof ImageData,i=typeof ImageBitmap<`u`&&e instanceof ImageBitmap,a=typeof e==`string`,o,s=t??{},c=()=>{if(typeof document<`u`)return document.createElement(`canvas`);if(typeof OffscreenCanvas<`u`)return new OffscreenCanvas(1,1);throw Error(`Canvas is not supported`)},l=e=>typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext(`2d`):null;if(n){let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let n=e.height,i=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(n=t.resizedHeight,i=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw Error(`Image input config format must be RGBA for HTMLImageElement`);s.tensorFormat=`RGBA`,s.height=n,s.width=i}else s.tensorFormat=`RGBA`,s.height=n,s.width=i;r.drawImage(e,0,0),o=r.getImageData(0,0,i,n).data}else throw Error(`Can not access image data`)}else if(r){let n,r;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(n=t.resizedHeight,r=t.resizedWidth):(n=e.height,r=e.width),t!==void 0&&(s=t),s.format=`RGBA`,s.height=n,s.width=r,t!==void 0){let t=c();t.width=r,t.height=n;let i=l(t);if(i!=null)i.putImageData(e,0,0),o=i.getImageData(0,0,r,n).data;else throw Error(`Can not access image data`)}else o=e.data}else if(i){if(t===void 0)throw Error(`Please provide image config with format for Imagebitmap`);let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let t=e.height,n=e.width;return r.drawImage(e,0,0,n,t),o=r.getImageData(0,0,n,t).data,s.height=t,s.width=n,T(o,s)}throw Error(`Can not access image data`)}else{if(a)return new Promise((t,n)=>{let r=c(),i=l(r);if(!e||!i)return n();let a=new Image;a.crossOrigin=`Anonymous`,a.src=e,a.onload=()=>{r.width=a.width,r.height=a.height,i.drawImage(a,0,0,r.width,r.height);let e=i.getImageData(0,0,r.width,r.height);s.height=r.height,s.width=r.width,t(T(e.data,s))}});throw Error(`Input data provided is not supported - aborted tensor creation`)}if(o!==void 0)return T(o,s);throw Error(`Input data provided is not supported - aborted tensor creation`)},D=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t;return new ue({location:`texture`,type:`float32`,texture:e,dims:[1,r,n,4],download:i,dispose:a})},O=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new ue({location:`gpu-buffer`,type:n??`float32`,gpuBuffer:e,dims:r,download:i,dispose:a})},k=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new ue({location:`ml-tensor`,type:n??`float32`,mlTensor:e,dims:r,download:i,dispose:a})},A=(e,t,n)=>new ue({location:`cpu-pinned`,type:e,data:t,dims:n??[t.length]})}),ne,re,ie,ae,oe=a(()=>{"use strict";ne=new Map([[`float32`,Float32Array],[`uint8`,Uint8Array],[`int8`,Int8Array],[`uint16`,Uint16Array],[`int16`,Int16Array],[`int32`,Int32Array],[`bool`,Uint8Array],[`float64`,Float64Array],[`uint32`,Uint32Array],[`int4`,Uint8Array],[`uint4`,Uint8Array]]),re=new Map([[Float32Array,`float32`],[Uint8Array,`uint8`],[Int8Array,`int8`],[Uint16Array,`uint16`],[Int16Array,`int16`],[Int32Array,`int32`],[Float64Array,`float64`],[Uint32Array,`uint32`]]),ie=!1,ae=()=>{if(!ie){ie=!0;let e=typeof BigInt64Array<`u`&&BigInt64Array.from,t=typeof BigUint64Array<`u`&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<`u`&&n.from;e&&(ne.set(`int64`,BigInt64Array),re.set(BigInt64Array,`int64`)),t&&(ne.set(`uint64`,BigUint64Array),re.set(BigUint64Array,`uint64`)),r?(ne.set(`float16`,n),re.set(n,`float16`)):ne.set(`float16`,Uint16Array)}}}),se,ce,le=a(()=>{"use strict";de(),se=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!=`number`||!Number.isSafeInteger(r))throw TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},ce=(e,t)=>{switch(e.location){case`cpu`:return new ue(e.type,e.data,t);case`cpu-pinned`:return new ue({location:`cpu-pinned`,data:e.data,type:e.type,dims:t});case`texture`:return new ue({location:`texture`,texture:e.texture,type:e.type,dims:t});case`gpu-buffer`:return new ue({location:`gpu-buffer`,gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case`ml-tensor`:return new ue({location:`ml-tensor`,mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),ue,de=a(()=>{"use strict";ee(),te(),oe(),le(),ue=class{constructor(e,t,n){ae();let r,i;if(typeof e==`object`&&`location`in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case`cpu-pinned`:{let t=ne.get(r);if(!t)throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case`texture`:if(r!==`float32`)throw TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case`gpu-buffer`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case`ml-tensor`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint64`&&r!==`int8`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e==`string`)if(r=e,o=n,e===`string`){if(!Array.isArray(t))throw TypeError(`A string tensor's data must be a string array.`);a=t}else{let n=ne.get(e);if(n===void 0)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e===`float16`&&n===Uint16Array||e===`uint4`||e===`int4`)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);a=e===`uint64`||e===`int64`?n.from(t,BigInt):n.from(t)}else if(t instanceof n)a=t;else if(t instanceof Uint8ClampedArray)if(e===`uint8`)a=Uint8Array.from(t);else throw TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);else if(e===`float16`&&t instanceof Uint16Array&&n!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${r} tensor's data must be type of ${n}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw TypeError(`Tensor type cannot be inferred from an empty array.`);let t=typeof e[0];if(t===`string`)r=`string`,a=e;else if(t===`boolean`)r=`bool`,a=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)r=`uint8`,a=Uint8Array.from(e);else{let t=re.get(e.constructor);if(t===void 0)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=t,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw TypeError(`A tensor's dims must be a number array`);i=o,this.cpuData=a,this.dataLocation=`cpu`}let a=se(i);if(this.cpuData&&a!==this.cpuData.length&&(r!==`uint4`&&r!==`int4`||Math.ceil(a/2)!==this.cpuData.length))throw Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return E(e,t)}static fromTexture(e,t){return D(e,t)}static fromGpuBuffer(e,t){return O(e,t)}static fromMLTensor(e,t){return k(e,t)}static fromPinnedBuffer(e,t,n){return A(e,t,n)}toDataURL(e){return C(this,e)}toImageData(e){return w(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error(`The data is not stored as a WebGL texture.`);return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error(`The data is not stored as a WebGPU buffer.`);return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error(`The data is not stored as a WebNN MLTensor.`);return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case`cpu`:case`cpu-pinned`:return this.data;case`texture`:case`gpu-buffer`:case`ml-tensor`:if(!this.downloader)throw Error(`The current tensor is not created with a specified data downloader.`);if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation=`cpu`,this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);this.disposer&&=(this.disposer(),void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation=`none`}ensureValid(){if(this.dataLocation===`none`)throw Error(`The tensor is disposed.`)}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error(`Cannot reshape a tensor that owns GPU resource.`);return ce(this,e)}}}),fe,pe=a(()=>{"use strict";de(),fe=ue}),me,he,ge,_e,ve,j,ye=a(()=>{"use strict";b(),me=(e,t)=>{(typeof y.trace>`u`?!y.wasm.trace:!y.trace)||console.timeStamp(`${e}::ORT::${t}`)},he=(e,t)=>{let n=Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let i=0;i<n.length;i++){if(r&&!n[i].includes(`TRACE_FUNC`)){let r=`FUNC_${e}::${n[i].trim().split(` `)[1]}`;t&&(r+=`::${t}`),me(`CPU`,r);return}n[i].includes(`TRACE_FUNC`)&&(r=!0)}},ge=e=>{(typeof y.trace>`u`?!y.wasm.trace:!y.trace)||he(`BEGIN`,e)},_e=e=>{(typeof y.trace>`u`?!y.wasm.trace:!y.trace)||he(`END`,e)},ve=e=>{(typeof y.trace>`u`?!y.wasm.trace:!y.trace)||console.time(`ORT::${e}`)},j=e=>{(typeof y.trace>`u`?!y.wasm.trace:!y.trace)||console.timeEnd(`ORT::${e}`)}}),be,xe=a(()=>{"use strict";m(),pe(),ye(),be=class e{constructor(e){this.handler=e}async run(e,t,n){ge(),ve(`InferenceSession.run`);let r={},i={};if(typeof e!=`object`||!e||e instanceof fe||Array.isArray(e))throw TypeError(`'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.`);let a=!0;if(typeof t==`object`){if(t===null)throw TypeError(`Unexpected argument[1]: cannot be null.`);if(t instanceof fe)throw TypeError(`'fetches' cannot be a Tensor`);if(Array.isArray(t)){if(t.length===0)throw TypeError(`'fetches' cannot be an empty array.`);a=!1;for(let e of t){if(typeof e!=`string`)throw TypeError(`'fetches' must be a string array or an object.`);if(this.outputNames.indexOf(e)===-1)throw RangeError(`'fetches' contains invalid output name: ${e}.`);r[e]=null}if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else{let e=!1,o=Object.getOwnPropertyNames(t);for(let n of this.outputNames)if(o.indexOf(n)!==-1){let i=t[n];(i===null||i instanceof fe)&&(e=!0,a=!1,r[n]=i)}if(e){if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else i=t}}else if(typeof t<`u`)throw TypeError(`Unexpected argument[1]: must be 'fetches' or 'options'.`);for(let t of this.inputNames)if(typeof e[t]>`u`)throw Error(`input '${t}' is missing in 'feeds'.`);if(a)for(let e of this.outputNames)r[e]=null;let o=await this.handler.run(e,r,i),s={};for(let e in o)if(Object.hasOwnProperty.call(o,e)){let t=o[e];s[e]=t instanceof fe?t:new fe(t.type,t.data,t.dims)}return j(`InferenceSession.run`),_e(),s}async release(){return this.handler.dispose()}static async create(t,n,r,i){ge(),ve(`InferenceSession.create`);let a,o={};if(typeof t==`string`){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof Uint8Array){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer){let e=t,s=0,c=t.byteLength;if(typeof n==`object`&&n)o=n;else if(typeof n==`number`){if(s=n,!Number.isSafeInteger(s))throw RangeError(`'byteOffset' must be an integer.`);if(s<0||s>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(c=t.byteLength-s,typeof r==`number`){if(c=r,!Number.isSafeInteger(c))throw RangeError(`'byteLength' must be an integer.`);if(c<=0||s+c>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-s}].`);if(typeof i==`object`&&i)o=i;else if(typeof i<`u`)throw TypeError(`'options' must be an object.`)}else if(typeof r<`u`)throw TypeError(`'byteLength' must be a number.`)}else if(typeof n<`u`)throw TypeError(`'options' must be an object.`);a=new Uint8Array(e,s,c)}else throw TypeError(`Unexpected argument[0]: must be 'path' or 'buffer'.`);let[s,c]=await p(o),l=await s.createInferenceSessionHandler(a,c);return j(`InferenceSession.create`),_e(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Se,Ce=a(()=>{"use strict";xe(),Se=be}),we=a(()=>{"use strict";}),Te=a(()=>{"use strict";}),Ee=a(()=>{"use strict";}),De=a(()=>{"use strict";});o({},{InferenceSession:()=>Se,TRACE:()=>me,TRACE_EVENT_BEGIN:()=>ve,TRACE_EVENT_END:()=>j,TRACE_FUNC_BEGIN:()=>ge,TRACE_FUNC_END:()=>_e,Tensor:()=>fe,env:()=>x,registerBackend:()=>d});var Oe=a(()=>{"use strict";h(),S(),Ce(),pe(),we(),Te(),ye(),Ee(),De()}),ke=a(()=>{"use strict";}),Ae={};o(Ae,{default:()=>Ne});var je,Me,Ne,Pe=a(()=>{"use strict";sd(),ct(),$e(),je=`ort-wasm-proxy-worker`,Me=globalThis.self?.name===je,Me&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case`init-wasm`:st(n.wasm).then(()=>{Yu(n).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case`init-ep`:{let{epName:e,env:r}=n;Xu(r,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case`copy-from`:{let{buffer:e}=n,r=ed(e);postMessage({type:t,out:r});break}case`create`:{let{model:e,options:r}=n;td(e,r).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case`release`:nd(n),postMessage({type:t});break;case`run`:{let{sessionId:e,inputIndices:r,inputs:i,outputIndices:a,options:o}=n;id(e,r,i,a,Array(a.length).fill(null),o).then(e=>{e.some(e=>e[3]!==`cpu`)?postMessage({type:t,err:`Proxy does not support non-cpu tensor location.`}):postMessage({type:t,out:e},od([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case`end-profiling`:ad(n),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),Ne=Me?null:e=>new Worker(e??Ue,{type:`module`,name:je})}),Fe={};o(Fe,{default:()=>Le});async function Ie(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&self.name?.startsWith(`em-pthread`);t.mountExternalData=(e,n)=>{e.startsWith(`./`)&&(e=e.substring(2)),(t.Yc||=new Map).set(e,n)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=e=>async(...n)=>{try{if(t.Xc)throw Error(`Session already started`);let r=t.Xc={Kd:n[0],errors:[]},i=await e(...n);if(t.Xc!==r)throw Error(`Session mismatch`);t.dd?.flush();let a=r.errors;if(0<a.length){let e=await Promise.all(a);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return i}finally{t.Xc=null}};t.jsepInit=(e,n)=>{if(e===`webgpu`){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=n;let e=t.dd;t.jsepRegisterBuffer=(t,n,r,i)=>e.registerBuffer(t,n,r,i),t.jsepGetBuffer=t=>e.getBuffer(t),t.jsepCreateDownloader=(t,n,r)=>e.createDownloader(t,n,r),t.jsepOnCreateSession=t=>{e.onCreateSession(t)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepOnRunStart=t=>e.onRunStart(t),t.Id=(t,n)=>{e.upload(t,n)}}else if(e===`webnn`){let e=n[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=n.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=t=>e.onRunStart(t),t.webnnOnRunEnd=e.onRunEnd.bind(e),t.webnnOnReleaseSession=t=>{e.onReleaseSession(t)},t.webnnCreateMLTensorDownloader=(t,n)=>e.createMLTensorDownloader(t,n),t.webnnRegisterMLTensor=(t,n,r,i)=>e.registerMLTensor(t,n,r,i),t.webnnCreateMLContext=t=>e.createMLContext(t),t.webnnRegisterGraphInput=e.registerGraphInput.bind(e),t.webnnIsGraphInput=e.isGraphInput.bind(e),t.webnnRegisterGraphOutput=e.registerGraphOutput.bind(e),t.webnnIsGraphOutput=e.isGraphOutput.bind(e),t.webnnCreateTemporaryTensor=e.createTemporaryTensor.bind(e),t.webnnIsGraphInputOutputTypeSupported=e.isGraphInputOutputTypeSupported.bind(e)}};let o=()=>{let e=e=>(...t)=>{let n=en;return t=e(...t),en==n?t:new Promise((e,t)=>{cn={resolve:e,reject:t}})};(()=>{for(let n of[`_OrtAppendExecutionProvider`,`_OrtCreateSession`,`_OrtRun`,`_OrtRunWithBinding`,`_OrtBindInput`])t[n]=e(t[n])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o?.()};var s,c,l=(e,t)=>{throw t},u=self.location.href,d=``;if(n||r){try{d=new URL(`.`,u).href}catch{}r&&(c=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),s=async e=>{if(C(e))return new Promise((t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{r.status==200||r.status==0&&r.response?t(r.response):n(r.status)},r.onerror=n,r.send(null)});var t=await fetch(e,{credentials:`same-origin`});if(t.ok)return t.arrayBuffer();throw Error(t.status+` : `+t.url)}}var f,p,m,h,g,_,v=console.log.bind(console),y=console.error.bind(console),b=v,x=y,S=!1,C=e=>e.startsWith(`file://`);function w(){Ae.buffer!=T.buffer&&se()}if(i){let e=function(n){try{var r=n.data,i=r.Sc;if(i===`load`){let n=[];self.onmessage=e=>n.push(e),_=()=>{postMessage({Sc:`loaded`});for(let t of n)e(t);self.onmessage=e};for(let e of r.xd)t[e]&&!t[e].proxy||(t[e]=(...t)=>{postMessage({Sc:`callHandler`,vd:e,args:t})},e==`print`&&(b=t[e]),e==`printErr`&&(x=t[e]));Ae=r.Od,se(),p=r.Pd,de(),na()}else if(i===`run`){(function(e){var t=(w(),A)[e+52>>>2>>>0];e=(w(),A)[e+56>>>2>>>0],Sr(t,t-e),Z(t)})(r.Rc),mr(r.Rc,0,0,1,0,0),De(),R(r.Rc),ee||=(dr(),!0);try{je(r.Md,r.bd)}catch(e){if(e!=`unwind`)throw e}}else r.target!==`setimmediate`&&(i===`checkMailbox`?ee&&Wt():i&&(x(`worker: received unknown command ${i}`),x(r)))}catch(e){throw hr(),e}};var ee=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}var T,E,D,O,k,A,te,ne,re,ie,ae,oe=!1;function se(){var e=Ae.buffer;t.HEAP8=T=new Int8Array(e),D=new Int16Array(e),t.HEAPU8=E=new Uint8Array(e),O=new Uint16Array(e),t.HEAP32=k=new Int32Array(e),t.HEAPU32=A=new Uint32Array(e),te=new Float32Array(e),ne=new Float64Array(e),re=new BigInt64Array(e),ie=new BigUint64Array(e)}function ce(){oe=!0,i?_():mi.sb()}function le(e){throw x(e=`Aborted(`+e+`)`),S=!0,e=new WebAssembly.RuntimeError(e+`. Build with -sASSERTIONS for more info.`),g?.(e),e}function ue(){return{a:{ma:vi,hb:_i,g:Pe,J:Ie,f:Ve,o:He,i:Ue,$:We,b:Ge,S:Ke,Ia:Je,n:Ye,aa:$e,Ya:et,Ea:tt,Ga:nt,Za:rt,Wa:it,Pa:at,Va:ot,ka:st,Fa:N,Ca:ct,Xa:lt,Da:ut,cb:P,fa:vt,xa:yt,va:Dt,ea:F,N:kt,H:At,wa:Nt,_:L,ya:Bt,Sa:Vt,Aa:Gt,Ja:qt,ta:Jt,ga:Yt,Ra:R,$a:Xt,Q:dn,r:vn,c:St,ib:yn,y:bn,M:z,D:B,l:xn,s:Sn,jb:V,I:H,R:U,j:W,u:Cn,q:wn,k:Tn,Ma:G,Na:Dn,Oa:On,Ka:kn,La:An,ua:Mn,eb:Nn,bb:In,v:zn,ba:Bn,ha:Vn,ab:Pn,V:Hn,_a:Un,Ba:Wn,F:jn,T:Gn,la:Xn,za:Zn,gb:Yn,fb:Qn,Ta:nr,Ua:rr,Ha:xe,U:ir,ja:ar,Qa:or,ia:cr,lb:ea,na:Yi,mb:$i,oa:Ji,G:Ri,e:Si,t:bi,w:yi,B:Mi,nb:Gi,Z:Wi,x:Ti,pa:Ki,X:Xi,ca:Ui,ob:Hi,pb:Vi,O:Ni,qa:Bi,qb:zi,L:Ii,Y:qi,d:xi,A:wi,m:Ci,kb:ta,p:Di,z:Oi,C:Ei,E:ki,K:Pi,ra:Li,P:Zi,da:Fi,W:Qi,rb:ji,sa:Ai,h:lr,a:Ae,db:ye}}}async function de(){function e(e,n){var r=mi=e.exports;e={};for(let[t,n]of Object.entries(r))typeof n==`function`?(r=Qt(n),e[t]=r):e[t]=n;return mi=e,mi=(function(){var e=mi,t=e=>t=>e(t)>>>0,n=e=>()=>e()>>>0;return(e=Object.assign({},e)).tb=t(e.tb),e.Xb=n(e.Xb),e.Zb=t(e.Zb),e.lc=t(e.lc),e.mc=n(e.mc),e.qc=t(e.qc),e})(),we.push(mi._b),ur=(e=mi).tb,dr=e.ub,t._OrtInit=e.vb,t._OrtGetLastError=e.wb,t._OrtCreateSessionOptions=e.xb,t._OrtAppendExecutionProvider=e.yb,t._OrtAddFreeDimensionOverride=e.zb,t._OrtAddSessionConfigEntry=e.Ab,t._OrtReleaseSessionOptions=e.Bb,t._OrtCreateSession=e.Cb,t._OrtReleaseSession=e.Db,t._OrtGetInputOutputCount=e.Eb,t._OrtGetInputOutputMetadata=e.Fb,t._OrtFree=e.Gb,t._OrtCreateTensor=e.Hb,t._OrtGetTensorData=e.Ib,t._OrtReleaseTensor=e.Jb,t._OrtCreateRunOptions=e.Kb,t._OrtAddRunConfigEntry=e.Lb,t._OrtReleaseRunOptions=e.Mb,t._OrtCreateBinding=e.Nb,t._OrtBindInput=e.Ob,t._OrtBindOutput=e.Pb,t._OrtClearBoundOutputs=e.Qb,t._OrtReleaseBinding=e.Rb,t._OrtRunWithBinding=e.Sb,t._OrtRun=e.Tb,t._OrtEndProfiling=e.Ub,t._JsepOutput=e.Vb,t._JsepGetNodeName=e.Wb,fr=e.Xb,Y=t._free=e.Yb,pr=t._malloc=e.Zb,mr=e.ac,hr=e.bc,gr=e.cc,_r=e.dc,vr=e.ec,yr=e.fc,br=e.gc,X=e.hc,xr=e.ic,Sr=e.jc,Z=e.kc,Cr=e.lc,Q=e.mc,wr=e.nc,Tr=e.oc,Er=e.pc,Dr=e.qc,Or=e.rc,kr=e.sc,Ar=e.tc,jr=e.uc,Mr=e.vc,Nr=e.wc,Pr=e.xc,Fr=e.yc,Ir=e.zc,Lr=e.Ac,Rr=e.Bc,zr=e.Cc,Br=e.Dc,Vr=e.Ec,Hr=e.Fc,Ur=e.Gc,Wr=e.Hc,Gr=e.Ic,Kr=e.Jc,qr=e.Kc,Jr=e.Lc,Yr=e.Mc,Xr=e.Nc,Zr=e.Pc,Qr=e.Qc,$r=e.$c,ei=e.ad,ti=e.fd,$=e.kd,ni=e.ld,ri=e.md,ii=e.nd,ai=e.od,oi=e.pd,si=e.qd,ci=e.rd,li=e.wd,ui=e.Ud,di=e.Vd,fi=e.Wd,pi=e.Xd,p=n,mi}var n,r=ue();return t.instantiateWasm?new Promise(n=>{t.instantiateWasm(r,(t,r)=>{n(e(t,r))})}):i?e(new WebAssembly.Instance(p,ue()),p):(ae??=t.locateFile?t.locateFile?t.locateFile(`ort-wasm-simd-threaded.jsep.wasm`,d):d+`ort-wasm-simd-threaded.jsep.wasm`:new URL(`/procrument-nusa/assets/ort-wasm-simd-threaded.jsep-D-icqfN-.wasm`,``+self.location.href).href,n=await(async function(e){var t=ae;if(!f&&!C(t))try{var n=fetch(t,{credentials:`same-origin`});return await WebAssembly.instantiateStreaming(n,e)}catch(e){x(`wasm streaming compile failed: ${e}`),x(`falling back to ArrayBuffer instantiation`)}return(async function(e,t){try{var n=await(async function(e){if(!f)try{var t=await s(e);return new Uint8Array(t)}catch{}if(e==ae&&f)e=new Uint8Array(f);else{if(!c)throw`both async and sync fetching of the wasm failed`;e=c(e)}return e})(e);return await WebAssembly.instantiate(n,t)}catch(e){x(`failed to asynchronously prepare wasm: ${e}`),le(e)}})(t,e)})(r),e(n.instance,n.module))}class fe{name=`ExitStatus`;constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var pe=e=>{e.terminate(),e.onmessage=()=>{}},me=[],he=0,ge=null,_e=e=>{Se.length==0&&(ke(),Oe(Se[0]));var t=Se.pop();if(!t)return 6;Ce.push(t),Te[e.Rc]=t,t.Rc=e.Rc;var n={Sc:`run`,Md:e.Ld,bd:e.bd,Rc:e.Rc};return t.postMessage(n,e.jd),0},ve=0,j=(e,t,...n)=>{var r,i=16*n.length,a=Q(),o=Cr(i),s=o>>>3;for(r of n)typeof r==`bigint`?((w(),re)[s++>>>0]=1n,(w(),re)[s++>>>0]=r):((w(),re)[s++>>>0]=0n,(w(),ne)[s++>>>0]=r);return e=gr(e,0,i,o,t),Z(a),e};function ye(e){if(i)return j(0,1,e);if(m=e,!(0<ve)){for(var t of Ce)pe(t);for(t of Se)pe(t);Se=[],Ce=[],Te={},S=!0}l(0,new fe(e))}function be(e){if(i)return j(1,0,e);xe(e)}var xe=e=>{if(m=e,i)throw be(e),`unwind`;ye(e)},Se=[],Ce=[],we=[],Te={},Ee=e=>{var t=e.Rc;delete Te[t],Se.push(e),Ce.splice(Ce.indexOf(e),1),e.Rc=0,_r(t)};function De(){we.forEach(e=>e())}var Oe=e=>new Promise(n=>{e.onmessage=r=>{var i=r.data;if(r=i.Sc,i.Zc&&i.Zc!=fr()){var a=Te[i.Zc];a?a.postMessage(i,i.jd):x(`Internal error! Worker sent a message "${r}" to target pthread ${i.Zc}, but that thread no longer exists!`)}else r===`checkMailbox`?Wt():r===`spawnThread`?_e(i):r===`cleanupThread`?Ht(()=>{Ee(Te[i.Nd])}):r===`loaded`?(e.loaded=!0,n(e)):i.target===`setimmediate`?e.postMessage(i):r===`uncaughtException`?e.onerror(i.error):r===`callHandler`?t[i.vd](...i.args):r&&x(`worker sent an unknown command ${r}`)},e.onerror=e=>{throw x(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var r,i=[];for(r of[])t.propertyIsEnumerable(r)&&i.push(r);e.postMessage({Sc:`load`,xd:i,Od:Ae,Pd:p})});function ke(){var e=new Worker((()=>{let e=URL;return self.location.href>`file:`&&self.location.href<`file;`?new e(`ort.bundle.min.mjs`,self.location.href):new URL(self.location.href)})(),{type:`module`,workerData:`em-pthread`,name:`em-pthread`});Se.push(e)}var Ae,je=(e,t)=>{ve=0,e=kr(e,t),0<ve?m=e:vr(e)},Me=[],Ne=0;function Pe(e){var t=new ze(e>>>=0);return(w(),T)[t.Tc+12>>>0]==0&&(Le(t,!0),Ne--),Re(t,!1),Me.push(t),Dr(e)}var Fe=0,Ie=()=>{X(0,0);var e=Me.pop();wr(e.cd),Fe=0};function Le(e,t){t=+!!t,(w(),T)[e.Tc+12>>>0]=t}function Re(e,t){t=+!!t,(w(),T)[e.Tc+13>>>0]=t}class ze{constructor(e){this.cd=e,this.Tc=e-24}}var Be=e=>{var t=Fe;if(!t)return xr(0),0;var n=new ze(t);(w(),A)[n.Tc+16>>>2>>>0]=t;var r=(w(),A)[n.Tc+4>>>2>>>0];if(!r)return xr(0),t;for(var i of e){if(i===0||i===r)break;if(Er(i,r,n.Tc+16))return xr(i),t}return xr(r),t};function Ve(){return Be([])}function He(e){return Be([e>>>0])}function Ue(e,t,n,r){return Be([e>>>0,t>>>0,n>>>0,r>>>0])}var We=()=>{var e=Me.pop();e||le(`no exception to throw`);var t=e.cd;throw(w(),T)[e.Tc+13>>>0]==0&&(Me.push(e),Re(e,!0),Le(e,!1),Ne++),Tr(t),Fe=t};function Ge(e,t,n){var r=new ze(e>>>=0);throw t>>>=0,n>>>=0,(w(),A)[r.Tc+16>>>2>>>0]=0,(w(),A)[r.Tc+4>>>2>>>0]=t,(w(),A)[r.Tc+8>>>2>>>0]=n,Tr(e),Ne++,Fe=e}var Ke=()=>Ne;function qe(e,t,n,r){return i?j(2,1,e,t,n,r):Je(e,t,n,r)}function Je(e,t,n,r){if(e>>>=0,t>>>=0,n>>>=0,r>>>=0,!globalThis.SharedArrayBuffer)return 6;var a=[];return i&&a.length===0?qe(e,t,n,r):(e={Ld:n,Rc:e,bd:r,jd:a},i?(e.Sc=`spawnThread`,postMessage(e,a),0):_e(e))}function Ye(e){throw Fe||=e>>>0,Fe}var Xe=globalThis.TextDecoder&&new TextDecoder,Ze=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},Qe=(e,t=0,n,r)=>{if(16<(n=Ze(e,t>>>=0,n,r))-t&&e.buffer&&Xe)return Xe.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,n):e.slice(t,n));for(r=``;t<n;){var i=e[t++];if(128&i){var a=63&e[t++];if((224&i)==192)r+=String.fromCharCode((31&i)<<6|a);else{var o=63&e[t++];65536>(i=(240&i)==224?(15&i)<<12|a<<6|o:(7&i)<<18|a<<12|o<<6|63&e[t++])?r+=String.fromCharCode(i):(i-=65536,r+=String.fromCharCode(55296|i>>10,56320|1023&i))}}else r+=String.fromCharCode(i)}return r},M=(e,t,n)=>(e>>>=0)?Qe((w(),E),e,t,n):``;function $e(e,t,n){return i?j(3,1,e,t,n):0}function et(e,t){if(i)return j(4,1,e,t)}function tt(e,t){if(i)return j(5,1,e,t)}function nt(e,t,n){if(i)return j(6,1,e,t,n)}function rt(e,t,n){return i?j(7,1,e,t,n):0}function it(e,t){if(i)return j(8,1,e,t)}function at(e,t,n){if(i)return j(9,1,e,t,n)}function ot(e,t,n,r){if(i)return j(10,1,e,t,n,r)}function st(e,t,n,r){if(i)return j(11,1,e,t,n,r)}function N(e,t,n,r){if(i)return j(12,1,e,t,n,r)}function ct(e){if(i)return j(13,1,e)}function lt(e,t){if(i)return j(14,1,e,t)}function ut(e,t,n){if(i)return j(15,1,e,t,n)}var P=()=>le(``),dt=e=>{e>>>=0;for(var t=``;;){var n=(w(),E)[e++>>>0];if(!n)return t;t+=String.fromCharCode(n)}},ft={},pt={},mt={},ht=class extends Error{constructor(e){super(e),this.name=`BindingError`}};function gt(e,t,n={}){return(function(e,t,n={}){var r=t.name;if(!e)throw new ht(`type "${r}" must have a positive integer typeid pointer`);if(pt.hasOwnProperty(e)){if(n.yd)return;throw new ht(`Cannot register type '${r}' twice`)}pt[e]=t,delete mt[e],ft.hasOwnProperty(e)&&(t=ft[e],delete ft[e],t.forEach(e=>e()))})(e,t,n)}var _t=(e,t,n)=>{switch(t){case 1:return n?e=>(w(),T)[e>>>0]:e=>(w(),E)[e>>>0];case 2:return n?e=>(w(),D)[e>>>1>>>0]:e=>(w(),O)[e>>>1>>>0];case 4:return n?e=>(w(),k)[e>>>2>>>0]:e=>(w(),A)[e>>>2>>>0];case 8:return n?e=>(w(),re)[e>>>3>>>0]:e=>(w(),ie)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function vt(e,t,n,r,i){e>>>=0,n>>>=0,t=dt(t>>>0);let a=e=>e;if(r=r===0n){let e=8*n;a=t=>BigInt.asUintN(e,t),i=a(i)}gt(e,{name:t,Oc:a,Vc:(e,t)=>(typeof t==`number`&&(t=BigInt(t)),t),Uc:_t(t,n,!r),Wc:null})}function yt(e,t,n,r){gt(e>>>=0,{name:t=dt(t>>>0),Oc:function(e){return!!e},Vc:function(e,t){return t?n:r},Uc:function(e){return this.Oc((w(),E)[e>>>0])},Wc:null})}var bt=[],xt=[0,1,,1,null,1,!0,1,!1,1];function St(e){9<(e>>>=0)&&--xt[e+1]===0&&(xt[e]=void 0,bt.push(e))}var Ct=e=>{if(!e)throw new ht(`Cannot use deleted val. handle = ${e}`);return xt[e]},wt=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=bt.pop()||xt.length;return xt[t]=e,xt[t+1]=1,t}};function Tt(e){return this.Oc((w(),A)[e>>>2>>>0])}var Et={name:`emscripten::val`,Oc:e=>{var t=Ct(e);return St(e),t},Vc:(e,t)=>wt(t),Uc:Tt,Wc:null};function Dt(e){return gt(e>>>0,Et)}var Ot=(e,t)=>{switch(t){case 4:return function(e){return this.Oc((w(),te)[e>>>2>>>0])};case 8:return function(e){return this.Oc((w(),ne)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}};function F(e,t,n){n>>>=0,gt(e>>>=0,{name:t=dt(t>>>0),Oc:e=>e,Vc:(e,t)=>t,Uc:Ot(t,n),Wc:null})}function kt(e,t,n,r,i){e>>>=0,n>>>=0,t=dt(t>>>0);let a=e=>e;if(r===0){var o=32-8*n;a=e=>e<<o>>>o,i=a(i)}gt(e,{name:t,Oc:a,Vc:(e,t)=>t,Uc:_t(t,n,r!==0),Wc:null})}function At(e,t,n){function r(e){var t=(w(),A)[e>>>2>>>0];return e=(w(),A)[e+4>>>2>>>0],new i((w(),T).buffer,e,t)}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];gt(e>>>=0,{name:n=dt(n>>>0),Oc:r,Uc:r},{yd:!0})}var jt=(e,t,n)=>{var r=(w(),E);if(t>>>=0,0<n){var i=t;n=t+n-1;for(var a=0;a<e.length;++a){var o=e.codePointAt(a);if(127>=o){if(t>=n)break;r[t++>>>0]=o}else if(2047>=o){if(t+1>=n)break;r[t++>>>0]=192|o>>6,r[t++>>>0]=128|63&o}else if(65535>=o){if(t+2>=n)break;r[t++>>>0]=224|o>>12,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o}else{if(t+3>=n)break;r[t++>>>0]=240|o>>18,r[t++>>>0]=128|o>>12&63,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o,a++}}r[t>>>0]=0,e=t-i}else e=0;return e},Mt=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t};function Nt(e,t){gt(e>>>=0,{name:t=dt(t>>>0),Oc(e){var t=(w(),A)[e>>>2>>>0];return t=M(e+4,t,!0),Y(e),t},Vc(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var n=typeof t==`string`;if(!(n||ArrayBuffer.isView(t)&&t.BYTES_PER_ELEMENT==1))throw new ht(`Cannot pass non-string to std::string`);var r=n?Mt(t):t.length,i=pr(4+r+1),a=i+4;return(w(),A)[i>>>2>>>0]=r,n?jt(t,a,r+1):(w(),E).set(t,a>>>0),e!==null&&e.push(Y,i),i},Uc:Tt,Wc(e){Y(e)}})}var Pt=globalThis.TextDecoder?new TextDecoder(`utf-16le`):void 0,Ft=(e,t,n)=>{if(e>>>=1,16<(t=Ze((w(),O),e,t/2,n))-e&&Pt)return Pt.decode((w(),O).slice(e,t));for(n=``;e<t;++e){var r=(w(),O)[e>>>0];n+=String.fromCharCode(r)}return n},It=(e,t,n)=>{if(n??=2147483647,2>n)return 0;var r=t;n=(n-=2)<2*e.length?n/2:e.length;for(var i=0;i<n;++i){var a=e.charCodeAt(i);(w(),D)[t>>>1>>>0]=a,t+=2}return(w(),D)[t>>>1>>>0]=0,t-r},I=e=>2*e.length,Lt=(e,t,n)=>{var r=``;e>>>=2;for(var i=0;!(i>=t/4);i++){var a=(w(),A)[e+i>>>0];if(!a&&!n)break;r+=String.fromCodePoint(a)}return r},Rt=(e,t,n)=>{if(t>>>=0,n??=2147483647,4>n)return 0;var r=t;n=r+n-4;for(var i=0;i<e.length;++i){var a=e.codePointAt(i);if(65535<a&&i++,(w(),k)[t>>>2>>>0]=a,(t+=4)+4>n)break}return(w(),k)[t>>>2>>>0]=0,t-r},zt=e=>{for(var t=0,n=0;n<e.length;++n)65535<e.codePointAt(n)&&n++,t+=4;return t};function L(e,t,n){if(e>>>=0,t>>>=0,n=dt(n>>>=0),t===2)var r=Ft,i=It,a=I;else r=Lt,i=Rt,a=zt;gt(e,{name:n,Oc:e=>{var n=(w(),A)[e>>>2>>>0];return n=r(e+4,n*t,!0),Y(e),n},Vc:(e,r)=>{if(typeof r!=`string`)throw new ht(`Cannot pass non-string to C++ string type ${n}`);var o=a(r),s=pr(4+o+t);return(w(),A)[s>>>2>>>0]=o/t,i(r,s+4,o+t),e!==null&&e.push(Y,s),s},Uc:Tt,Wc(e){Y(e)}})}function Bt(e,t){gt(e>>>=0,{zd:!0,name:t=dt(t>>>0),Oc:()=>{},Vc:()=>{}})}function Vt(e){mr(e>>>0,!r,1,!n,131072,!1),De()}var Ht=e=>{if(!S)try{if(e(),!(0<ve))try{i?fr()&&vr(m):xe(m)}catch(e){e instanceof fe||e==`unwind`||l(0,e)}}catch(e){e instanceof fe||e==`unwind`||l(0,e)}},Ut=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function R(e){e>>>=0,Ut||(Atomics.waitAsync((w(),k),e>>>2,e).value.then(Wt),e+=128,Atomics.store((w(),k),e>>>2,1))}var Wt=()=>Ht(()=>{var e=fr();e&&(R(e),br())});function Gt(e,t){(e>>>=0)==t>>>0?setTimeout(Wt):i?postMessage({Zc:e,Sc:`checkMailbox`}):(e=Te[e])&&e.postMessage({Sc:`checkMailbox`})}var Kt=[];function qt(e,t,n,r,i){for(t>>>=0,i>>>=0,Kt.length=0,n=i>>>3,r=i+r>>>3;n<r;){var a=(w(),re)[n++>>>0]?(w(),re)[n++>>>0]:(w(),ne)[n++>>>0];Kt.push(a)}return(t?gi[t]:hi[e])(...Kt)}var Jt=()=>{ve=0};function Yt(e){e>>>=0,i?postMessage({Sc:`cleanupThread`,Nd:e}):Ee(Te[e])}function Xt(e){}var Zt=e=>{try{e()}catch(e){le(e)}};function Qt(e){var t=(...t)=>{nn.push(e);try{return e(...t)}finally{S||(nn.pop(),en&&$t===1&&nn.length===0&&($t=0,ve+=1,Zt(di),typeof Fibers<`u`&&Fibers.be()))}};return on.set(e,t),t}var $t=0,en=null,tn=0,nn=[],rn=new Map,an=new Map,on=new Map,sn=0,cn=null,ln=[],un=e=>(function(e){if(!S){if($t===0){var t=!1,n=!1;e((e=0)=>{if(!S&&(tn=e,t=!0,n)){$t=2,Zt(()=>fi(en)),typeof MainLoop<`u`&&MainLoop.ud&&MainLoop.resume(),e=!1;try{var r=(function(){var e=(w(),k)[en+8>>>2>>>0];return e=an.get(e),e=on.get(e),--ve,e()})()}catch(t){r=t,e=!0}var i=!1;if(!en){var a=cn;a&&(cn=null,(e?a.reject:a.resolve)(r),i=!0)}if(e&&!i)throw r}}),n=!0,t||($t=1,en=(function(){var e=pr(65548),t=e+12;if((w(),A)[e>>>2>>>0]=t,(w(),A)[e+4>>>2>>>0]=t+65536,t=nn[0],!rn.has(t)){var n=sn++;rn.set(t,n),an.set(n,t)}return t=rn.get(t),(w(),k)[e+8>>>2>>>0]=t,e})(),typeof MainLoop<`u`&&MainLoop.ud&&MainLoop.pause(),Zt(()=>ui(en)))}else $t===2?($t=0,Zt(pi),Y(en),en=null,ln.forEach(Ht)):le(`invalid state: ${$t}`);return tn}})(t=>{e().then(t)});function dn(e){return e>>>=0,un(async()=>wt(await Ct(e)))}var fn=[],pn=e=>{var t=fn.length;return fn.push(e),t},mn=(e,t)=>{for(var n=Array(e),r=0;r<e;++r){var i=r,a=(w(),A)[t+4*r>>>2>>>0],o=pt[a];if(o===void 0)throw e=`parameter ${r}`,a=ur(a),t=dt(a),Y(a),new ht(`${e} has unknown type ${t}`);n[i]=o}return n},hn=(e,t,n)=>{var r=[];return e=e(r,n),r.length&&((w(),A)[t>>>2>>>0]=wt(r)),e},gn={},_n=e=>{var t=gn[e];return t===void 0?dt(e):t};function vn(e,t,n){var[r,...i]=mn(e,t>>>0);t=r.Vc.bind(r);var a=i.map(e=>e.Uc.bind(e));e--;var o={toValue:Ct};switch(e=a.map((e,t)=>{var n=`argFromPtr${t}`;return o[n]=e,`${n}(args${t?`+`+8*t:``})`}),n){case 0:var s=`toValue(handle)`;break;case 2:s=`new (toValue(handle))`;break;case 3:s=``;break;case 1:o.getStringOrSymbol=_n,s=`toValue(handle)[getStringOrSymbol(methodName)]`}return s+=`(${e})`,r.zd||(o.toReturnWire=t,o.emval_returnValue=hn,s=`return emval_returnValue(toReturnWire, destructorsRef, ${s})`),s=`return function (handle, methodName, destructorsRef, args) {
  ${s}
  }`,n=Function(Object.keys(o),s)(...Object.values(o)),s=`methodCaller<(${i.map(e=>e.name)}) => ${r.name}>`,pn(Object.defineProperty(n,"name",{value:s}))}function yn(e,t){return t>>>=0,(e=Ct(e>>>0))==Ct(t)}function bn(e){return(e>>>=0)?(e=_n(e),wt(globalThis[e])):wt(globalThis)}function z(e){return e=_n(e>>>0),wt(t[e])}function B(e,t){return t>>>=0,e=Ct(e>>>0),t=Ct(t),wt(e[t])}function xn(e){9<(e>>>=0)&&(xt[e+1]+=1)}function Sn(e,t,n,r,i){return fn[e>>>0](t>>>0,n>>>0,r>>>0,i>>>0)}function V(e,t,n,r,i){return Sn(e>>>0,t>>>0,n>>>0,r>>>0,i>>>0)}function H(){return wt([])}function U(e){e=Ct(e>>>0);for(var t=Array(e.length),n=0;n<e.length;n++)t[n]=e[n];return wt(t)}function W(e){return wt(_n(e>>>0))}function Cn(){return wt({})}function wn(e){for(var t=Ct(e>>>=0);t.length;){var n=t.pop();t.pop()(n)}St(e)}function Tn(e,t,n){t>>>=0,n>>>=0,e=Ct(e>>>0),t=Ct(t),n=Ct(n),e[t]=n}function G(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),k)[t>>>2>>>0]=e.getUTCSeconds(),(w(),k)[t+4>>>2>>>0]=e.getUTCMinutes(),(w(),k)[t+8>>>2>>>0]=e.getUTCHours(),(w(),k)[t+12>>>2>>>0]=e.getUTCDate(),(w(),k)[t+16>>>2>>>0]=e.getUTCMonth(),(w(),k)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,(w(),k)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(w(),k)[t+28>>>2>>>0]=e}var En=e=>e%4==0&&(e%100!=0||e%400==0),K=[0,31,60,91,121,152,182,213,244,274,305,335],q=[0,31,59,90,120,151,181,212,243,273,304,334];function Dn(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),k)[t>>>2>>>0]=e.getSeconds(),(w(),k)[t+4>>>2>>>0]=e.getMinutes(),(w(),k)[t+8>>>2>>>0]=e.getHours(),(w(),k)[t+12>>>2>>>0]=e.getDate(),(w(),k)[t+16>>>2>>>0]=e.getMonth(),(w(),k)[t+20>>>2>>>0]=e.getFullYear()-1900,(w(),k)[t+24>>>2>>>0]=e.getDay();var n=(En(e.getFullYear())?K:q)[e.getMonth()]+e.getDate()-1|0;(w(),k)[t+28>>>2>>>0]=n,(w(),k)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(n!=r&&e.getTimezoneOffset()==Math.min(r,n)),(w(),k)[t+32>>>2>>>0]=e}function On(e){e>>>=0;var t=new Date((w(),k)[e+20>>>2>>>0]+1900,(w(),k)[e+16>>>2>>>0],(w(),k)[e+12>>>2>>>0],(w(),k)[e+8>>>2>>>0],(w(),k)[e+4>>>2>>>0],(w(),k)[e>>>2>>>0],0),n=(w(),k)[e+32>>>2>>>0],r=t.getTimezoneOffset(),i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),a=new Date(t.getFullYear(),0,1).getTimezoneOffset(),o=Math.min(a,i);return 0>n?(w(),k)[e+32>>>2>>>0]=+(i!=a&&o==r):0<n!=(o==r)&&(i=Math.max(a,i),t.setTime(t.getTime()+6e4*((0<n?o:i)-r))),(w(),k)[e+24>>>2>>>0]=t.getDay(),n=(En(t.getFullYear())?K:q)[t.getMonth()]+t.getDate()-1|0,(w(),k)[e+28>>>2>>>0]=n,(w(),k)[e>>>2>>>0]=t.getSeconds(),(w(),k)[e+4>>>2>>>0]=t.getMinutes(),(w(),k)[e+8>>>2>>>0]=t.getHours(),(w(),k)[e+12>>>2>>>0]=t.getDate(),(w(),k)[e+16>>>2>>>0]=t.getMonth(),(w(),k)[e+20>>>2>>>0]=t.getYear(),e=t.getTime(),BigInt(isNaN(e)?-1:e/1e3)}function kn(e,t,n,r,a,o,s){return i?j(16,1,e,t,n,r,a,o,s):-52}function An(e,t,n,r,a,o){if(i)return j(17,1,e,t,n,r,a,o)}var J={},jn=()=>performance.timeOrigin+performance.now();function Mn(e,t){return i?j(18,1,e,t):(J[e]&&(clearTimeout(J[e].id),delete J[e]),t&&(J[e]={id:setTimeout(()=>{delete J[e],Ht(()=>yr(e,performance.timeOrigin+performance.now()))},t),ae:t}),0)}function Nn(e,t,n,r){e>>>=0,t>>>=0,n>>>=0,r>>>=0;var i=new Date().getFullYear(),a=new Date(i,0,1).getTimezoneOffset();i=new Date(i,6,1).getTimezoneOffset();var o=Math.max(a,i);(w(),A)[e>>>2>>>0]=60*o,(w(),k)[t>>>2>>>0]=+(a!=i),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?`-`:`+`}${String(Math.floor(t/60)).padStart(2,`0`)}${String(t%60).padStart(2,`0`)}`})(a),t=t(i),i<a?(jt(e,n,17),jt(t,r,17)):(jt(e,r,17),jt(t,n,17))}var Pn=()=>Date.now(),Fn=1;function In(e,t,n){if(n>>>=0,!(0<=e&&3>=e))return 28;if(e===0)e=Date.now();else{if(!Fn)return 52;e=performance.timeOrigin+performance.now()}return e=Math.round(1e6*e),(w(),re)[n>>>3>>>0]=BigInt(e),0}var Ln=[],Rn=(e,t)=>{Ln.length=0;for(var n;n=(w(),E)[e++>>>0];){var r=n!=105;t+=(r&=n!=112)&&t%8?4:0,Ln.push(n==112?(w(),A)[t>>>2>>>0]:n==106?(w(),re)[t>>>3>>>0]:n==105?(w(),k)[t>>>2>>>0]:(w(),ne)[t>>>3>>>0]),t+=r?8:4}return Ln};function zn(e,t,n){return e>>>=0,t=Rn(t>>>0,n>>>0),gi[e](...t)}function Bn(e,t,n){return e>>>=0,t=Rn(t>>>0,n>>>0),gi[e](...t)}var Vn=()=>{};function Hn(e,t){return x(M(e>>>0,t>>>0))}var Un=()=>{throw ve+=1,`unwind`};function Wn(){return 4294901760}var Gn=()=>navigator.hardwareConcurrency,Kn={},qn=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?2147483648|t[1]:0},Jn=e=>{for(var t of e)(e=qn(t))&&(Kn[e]=t)};function Yn(){var e=Error().stack.toString().split(`
`);return e[0]==`Error`&&e.shift(),Jn(e),Kn.gd=qn(e[3]),Kn.Jd=e,Kn.gd}function Xn(e){if(!(e=Kn[e>>>0]))return 0;var t;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}Y(Xn.hd??0),t=Mt(e)+1;var n=pr(t);return n&&jt(e,n,t),Xn.hd=n,Xn.hd}function Zn(e){e>>>=0;var t=(w(),E).length;if(e<=t||4294901760<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(4294901760,65536*Math.ceil(Math.max(e,r)/65536))-Ae.buffer.byteLength+65535)/65536|0;try{Ae.grow(r),se();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1}function Qn(e,t,n){if(e>>>=0,t>>>=0,Kn.gd==e)var r=Kn.Jd;else(r=Error().stack.toString().split(`
`))[0]==`Error`&&r.shift(),Jn(r);for(var i=3;r[i]&&qn(r[i])!=e;)++i;for(e=0;e<n&&r[e+i];++e)(w(),k)[t+4*e>>>2>>>0]=qn(r[e+i]);return e}var $n,er={},tr=()=>{if(!$n){var e,t={USER:`web_user`,LOGNAME:`web_user`,PATH:`/`,PWD:`/`,HOME:`/home/web_user`,LANG:(globalThis.navigator?.language??`C`).replace(`-`,`_`)+`.UTF-8`,_:`./this.program`};for(e in er)er[e]===void 0?delete t[e]:t[e]=er[e];var n=[];for(e in t)n.push(`${e}=${t[e]}`);$n=n}return $n};function nr(e,t){if(i)return j(19,1,e,t);e>>>=0,t>>>=0;var n,r=0,a=0;for(n of tr()){var o=t+r;(w(),A)[e+a>>>2>>>0]=o,r+=jt(n,o,1/0)+1,a+=4}return 0}function rr(e,t){if(i)return j(20,1,e,t);e>>>=0,t>>>=0;var n=tr();for(var r of((w(),A)[e>>>2>>>0]=n.length,e=0,n))e+=Mt(r)+1;return(w(),A)[t>>>2>>>0]=e,0}function ir(e){return i?j(21,1,e):52}function ar(e,t,n,r){return i?j(22,1,e,t,n,r):52}function or(e,t,n,r){return i?j(23,1,e,t,n,r):70}var sr=[null,[],[]];function cr(e,t,n,r){if(i)return j(24,1,e,t,n,r);t>>>=0,n>>>=0,r>>>=0;for(var a=0,o=0;o<n;o++){var s=(w(),A)[t>>>2>>>0],c=(w(),A)[t+4>>>2>>>0];t+=8;for(var l=0;l<c;l++){var u=e,d=(w(),E)[s+l>>>0],f=sr[u];d===0||d===10?((u===1?b:x)(Qe(f)),f.length=0):f.push(d)}a+=c}return(w(),A)[r>>>2>>>0]=a,0}function lr(e){return e>>>0}i||(function(){for(var e=t.numThreads-1;e--;)ke();me.push(async()=>{var e=(async function(){if(!i)return Promise.all(Se.map(Oe))})();he++,await e,--he==0&&ge&&(e=ge,ge=null,e())})})(),i||(Ae=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),se()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>Q(),t.stackRestore=e=>Z(e),t.stackAlloc=e=>Cr(e),t.setValue=function(e,t,n=`i8`){switch(n.endsWith(`*`)&&(n=`*`),n){case`i1`:case`i8`:(w(),T)[e>>>0]=t;break;case`i16`:(w(),D)[e>>>1>>>0]=t;break;case`i32`:(w(),k)[e>>>2>>>0]=t;break;case`i64`:(w(),re)[e>>>3>>>0]=BigInt(t);break;case`float`:(w(),te)[e>>>2>>>0]=t;break;case`double`:(w(),ne)[e>>>3>>>0]=t;break;case`*`:(w(),A)[e>>>2>>>0]=t;break;default:le(`invalid type for setValue: ${n}`)}},t.getValue=function(e,t=`i8`){switch(t.endsWith(`*`)&&(t=`*`),t){case`i1`:case`i8`:return(w(),T)[e>>>0];case`i16`:return(w(),D)[e>>>1>>>0];case`i32`:return(w(),k)[e>>>2>>>0];case`i64`:return(w(),re)[e>>>3>>>0];case`float`:return(w(),te)[e>>>2>>>0];case`double`:return(w(),ne)[e>>>3>>>0];case`*`:return(w(),A)[e>>>2>>>0];default:le(`invalid type for getValue: ${t}`)}},t.UTF8ToString=M,t.stringToUTF8=jt,t.lengthBytesUTF8=Mt;var ur,dr,fr,Y,pr,mr,hr,gr,_r,vr,yr,br,X,xr,Sr,Z,Cr,Q,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,$,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi=[ye,be,qe,$e,et,tt,nt,rt,it,at,ot,st,N,ct,lt,ut,kn,An,Mn,nr,rr,ir,ar,or,cr],gi={1055492:(e,n,r,i,a)=>{if(t===void 0||!t.Yc)return 1;if((e=M(Number(e>>>0))).startsWith(`./`)&&(e=e.substring(2)),!(e=t.Yc.get(e)))return 2;if(n=Number(n>>>0),r=Number(r>>>0),i=Number(i>>>0),n+r>e.byteLength)return 3;try{let o=e.subarray(n,n+r);switch(a){case 0:(w(),E).set(o,i>>>0);break;case 1:t.Qd?t.Qd(i,o):t.Id(i,o);break;default:return 4}return 0}catch{return 4}},1056316:(e,n,r)=>{t.td(e,(w(),E).subarray(n>>>0,n+r>>>0))},1056380:()=>t.Sd(),1056422:e=>{t.sd(e)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:e=>t.Ad(e),1056577:e=>t.Ed(e),1056609:(e,n,r)=>{t.ed(Number(e),Number(n),Number(r),!0)},1056672:(e,n,r)=>{t.ed(Number(e),Number(n),Number(r))},1056729:()=>typeof wasmOffsetConverter<`u`,1056786:e=>{t.$b(`Abs`,e,void 0)},1056837:e=>{t.$b(`Neg`,e,void 0)},1056888:e=>{t.$b(`Floor`,e,void 0)},1056941:e=>{t.$b(`Ceil`,e,void 0)},1056993:e=>{t.$b(`Reciprocal`,e,void 0)},1057051:e=>{t.$b(`Sqrt`,e,void 0)},1057103:e=>{t.$b(`Exp`,e,void 0)},1057154:e=>{t.$b(`Erf`,e,void 0)},1057205:e=>{t.$b(`Sigmoid`,e,void 0)},1057260:(e,n,r)=>{t.$b(`HardSigmoid`,e,{alpha:n,beta:r})},1057339:e=>{t.$b(`HardSwish`,e,void 0)},1057396:e=>{t.$b(`Log`,e,void 0)},1057447:e=>{t.$b(`Sin`,e,void 0)},1057498:e=>{t.$b(`Cos`,e,void 0)},1057549:e=>{t.$b(`Tan`,e,void 0)},1057600:e=>{t.$b(`Asin`,e,void 0)},1057652:e=>{t.$b(`Acos`,e,void 0)},1057704:e=>{t.$b(`Atan`,e,void 0)},1057756:e=>{t.$b(`Sinh`,e,void 0)},1057808:e=>{t.$b(`Cosh`,e,void 0)},1057860:e=>{t.$b(`Asinh`,e,void 0)},1057913:e=>{t.$b(`Acosh`,e,void 0)},1057966:e=>{t.$b(`Atanh`,e,void 0)},1058019:e=>{t.$b(`Tanh`,e,void 0)},1058071:e=>{t.$b(`Not`,e,void 0)},1058122:(e,n,r)=>{t.$b(`Clip`,e,{min:n,max:r})},1058191:e=>{t.$b(`Clip`,e,void 0)},1058243:(e,n)=>{t.$b(`Elu`,e,{alpha:n})},1058301:e=>{t.$b(`Gelu`,e,void 0)},1058353:e=>{t.$b(`Relu`,e,void 0)},1058405:(e,n)=>{t.$b(`LeakyRelu`,e,{alpha:n})},1058469:(e,n)=>{t.$b(`ThresholdedRelu`,e,{alpha:n})},1058539:(e,n)=>{t.$b(`Cast`,e,{to:n})},1058597:e=>{t.$b(`Add`,e,void 0)},1058648:e=>{t.$b(`Sub`,e,void 0)},1058699:e=>{t.$b(`Mul`,e,void 0)},1058750:e=>{t.$b(`Div`,e,void 0)},1058801:e=>{t.$b(`Pow`,e,void 0)},1058852:e=>{t.$b(`Equal`,e,void 0)},1058905:e=>{t.$b(`Greater`,e,void 0)},1058960:e=>{t.$b(`GreaterOrEqual`,e,void 0)},1059022:e=>{t.$b(`Less`,e,void 0)},1059074:e=>{t.$b(`LessOrEqual`,e,void 0)},1059133:(e,n,r,i,a)=>{t.$b(`ReduceMean`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1059308:(e,n,r,i,a)=>{t.$b(`ReduceMax`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1059482:(e,n,r,i,a)=>{t.$b(`ReduceMin`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1059656:(e,n,r,i,a)=>{t.$b(`ReduceProd`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1059831:(e,n,r,i,a)=>{t.$b(`ReduceSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060005:(e,n,r,i,a)=>{t.$b(`ReduceL1`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060178:(e,n,r,i,a)=>{t.$b(`ReduceL2`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060351:(e,n,r,i,a)=>{t.$b(`ReduceLogSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060528:(e,n,r,i,a)=>{t.$b(`ReduceSumSquare`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060708:(e,n,r,i,a)=>{t.$b(`ReduceLogSumExp`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1060888:e=>{t.$b(`Where`,e,void 0)},1060941:(e,n,r)=>{t.$b(`Transpose`,e,{perm:n?Array.from((w(),k).subarray(Number(n)>>>0,Number(r)>>>0)):[]})},1061065:(e,n,r,i)=>{t.$b(`DepthToSpace`,e,{blocksize:n,mode:M(r),format:i?`NHWC`:`NCHW`})},1061198:(e,n,r,i)=>{t.$b(`DepthToSpace`,e,{blocksize:n,mode:M(r),format:i?`NHWC`:`NCHW`})},1061331:(e,n,r,i)=>{t.$b(`DFT`,e,{axis:n,inverse:r,onesided:i})},1061423:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.$b(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),T)[u>>>0],outputPadding:d?Array.from((w(),k).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),k).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:M(h)})},1061856:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),k).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),k).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),k).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),k).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),T)[l>>>0],outputPadding:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:M(m)})},1062517:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.$b(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),T)[u>>>0],outputPadding:d?Array.from((w(),k).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),k).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:M(h)})},1062950:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),k).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),k).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),k).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),k).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),T)[l>>>0],outputPadding:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:M(m)})},1063611:(e,n)=>{t.$b(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1063702:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),k).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1064181:(e,n)=>{t.$b(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1064272:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),k).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1064751:(e,n)=>{t.$b(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1064838:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),k).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1065313:(e,n)=>{t.$b(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1065400:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),k).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),k).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1065875:(e,n,r,i,a)=>{t.$b(`Gemm`,e,{alpha:n,beta:r,transA:i,transB:a})},1065979:e=>{t.$b(`MatMul`,e,void 0)},1066033:(e,n,r,i)=>{t.$b(`ArgMax`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1066141:(e,n,r,i)=>{t.$b(`ArgMin`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1066249:(e,n)=>{t.$b(`Softmax`,e,{axis:n})},1066312:(e,n)=>{t.$b(`Concat`,e,{axis:n})},1066372:(e,n,r,i,a)=>{t.$b(`Split`,e,{axis:n,numOutputs:r,splitSizes:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1066528:e=>{t.$b(`Expand`,e,void 0)},1066582:(e,n)=>{t.$b(`Gather`,e,{axis:Number(n)})},1066653:(e,n)=>{t.$b(`GatherElements`,e,{axis:Number(n)})},1066732:(e,n)=>{t.$b(`GatherND`,e,{batch_dims:Number(n)})},1066811:(e,n,r,i,a,o,s,c,l,u,d)=>{t.$b(`Resize`,e,{antialias:n,axes:r?Array.from((w(),k).subarray(Number(r)>>>0,Number(i)>>>0)):[],coordinateTransformMode:M(a),cubicCoeffA:o,excludeOutside:s,extrapolationValue:c,keepAspectRatioPolicy:M(l),mode:M(u),nearestMode:M(d)})},1067173:(e,n,r,i,a,o,s)=>{t.$b(`Slice`,e,{starts:n?Array.from((w(),k).subarray(Number(n)>>>0,Number(r)>>>0)):[],ends:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[],axes:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[]})},1067437:e=>{t.$b(`Tile`,e,void 0)},1067489:(e,n,r)=>{t.$b(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1067603:(e,n,r)=>{t.$b(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1067717:e=>{t.$b(`Range`,e,void 0)},1067770:(e,n)=>{t.$b(`Einsum`,e,{equation:M(n)})},1067851:(e,n,r,i,a)=>{t.$b(`Pad`,e,{mode:n,value:r,pads:i?Array.from((w(),k).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1067994:(e,n,r,i,a,o)=>{t.$b(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1068163:(e,n,r,i,a,o)=>{t.$b(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1068332:(e,n,r)=>{t.$b(`CumSum`,e,{exclusive:Number(n),reverse:Number(r)})},1068429:(e,n,r)=>{t.$b(`DequantizeLinear`,e,{axis:n,blockSize:r})},1068519:(e,n,r,i,a)=>{t.$b(`GridSample`,e,{align_corners:n,mode:M(r),padding_mode:M(i),format:a?`NHWC`:`NCHW`})},1068689:(e,n,r,i,a)=>{t.$b(`GridSample`,e,{align_corners:n,mode:M(r),padding_mode:M(i),format:a?`NHWC`:`NCHW`})},1068859:(e,n)=>{t.$b(`ScatterND`,e,{reduction:M(n)})},1068944:(e,n,r,i,a,o,s,c,l)=>{t.$b(`Attention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o,qkvHiddenSizes:s?Array.from((w(),k).subarray(Number(c)>>>0,Number(c)+s>>>0)):[],pastPresentShareBuffer:!!l})},1069216:e=>{t.$b(`BiasAdd`,e,void 0)},1069271:e=>{t.$b(`BiasSplitGelu`,e,void 0)},1069332:e=>{t.$b(`FastGelu`,e,void 0)},1069388:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)=>{t.$b(`Conv`,e,{format:f?`NHWC`:`NCHW`,auto_pad:n,dilations:r?Array.from((w(),k).subarray(Number(r)>>>0,Number(i)>>>0)):[],group:a,kernel_shape:o?Array.from((w(),k).subarray(Number(o)>>>0,Number(s)>>>0)):[],pads:c?Array.from((w(),k).subarray(Number(c)>>>0,Number(l)>>>0)):[],strides:u?Array.from((w(),k).subarray(Number(u)>>>0,Number(d)>>>0)):[],w_is_const:()=>!!(w(),T)[Number(p)>>>0],activation:M(m),activation_params:h?Array.from((w(),te).subarray(Number(h)>>>0,Number(g)>>>0)):[]})},1069972:e=>{t.$b(`Gelu`,e,void 0)},1070024:(e,n,r,i,a,o,s,c,l)=>{t.$b(`GroupQueryAttention`,e,{numHeads:n,kvNumHeads:r,scale:i,softcap:a,doRotary:o,rotaryInterleaved:s,smoothSoftmax:c,localWindowSize:l})},1070241:(e,n,r,i)=>{t.$b(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1070352:(e,n,r,i)=>{t.$b(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1070463:(e,n,r,i,a,o)=>{t.$b(`MatMulNBits`,e,{k:n,n:r,accuracyLevel:i,bits:a,blockSize:o})},1070590:(e,n,r,i,a,o)=>{t.$b(`MultiHeadAttention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o})},1070749:(e,n)=>{t.$b(`QuickGelu`,e,{alpha:n})},1070813:(e,n,r,i,a)=>{t.$b(`RotaryEmbedding`,e,{interleaved:!!n,numHeads:r,rotaryEmbeddingDim:i,scale:a})},1070952:(e,n,r)=>{t.$b(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1071054:(e,n,r)=>{t.$b(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1071156:(e,n,r,i)=>{t.$b(`GatherBlockQuantized`,e,{gatherAxis:n,quantizeAxis:r,blockSize:i})},1071277:e=>{t.Fd(e)},1071311:(e,n)=>t.Hd(Number(e),Number(n),t.Xc.Kd,t.Xc.errors)};function _i(e,n,r){return un(async()=>{await t.Dd(Number(e),Number(n),Number(r))})}function vi(){return typeof wasmOffsetConverter<`u`}function yi(e,t,n,r){var i=Q();try{return Lr(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function bi(e,t,n){var r=Q();try{return Nr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function xi(e){var t=Q();try{Ar(e)}catch(e){if(Z(t),e!==e+0)throw e;X(1,0)}}function Si(e,t){var n=Q();try{return kr(e,t)}catch(e){if(Z(n),e!==e+0)throw e;X(1,0)}}function Ci(e,t,n){var r=Q();try{Or(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function wi(e,t){var n=Q();try{Rr(e,t)}catch(e){if(Z(n),e!==e+0)throw e;X(1,0)}}function Ti(e,t,n,r,i,a,o){var s=Q();try{return Fr(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Ei(e,t,n,r,i,a){var o=Q();try{jr(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Di(e,t,n,r){var i=Q();try{Ir(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Oi(e,t,n,r,i){var a=Q();try{Mr(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function ki(e,t,n,r,i,a,o){var s=Q();try{Br(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function Ai(e,t,n,r,i,a,o){var s=Q();try{Vr(e,t,n,r,i,a,o)}catch(e){if(Z(s),e!==e+0)throw e;X(1,0)}}function ji(e,t,n,r,i,a,o,s){var c=Q();try{Gr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function Mi(e,t,n,r,i){var a=Q();try{return zr(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function Ni(e,t,n){var r=Q();try{return Kr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function Pi(e,t,n,r,i,a,o,s){var c=Q();try{qr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function Fi(e,t,n,r,i,a,o,s,c,l,u,d){var f=Q();try{Hr(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(Z(f),e!==e+0)throw e;X(1,0)}}function Ii(e,t,n){var r=Q();try{return Jr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;return X(1,0),0n}}function Li(e,t,n,r,i,a,o,s,c){var l=Q();try{Pr(e,t,n,r,i,a,o,s,c)}catch(e){if(Z(l),e!==e+0)throw e;X(1,0)}}function Ri(e){var t=Q();try{return Yr(e)}catch(e){if(Z(t),e!==e+0)throw e;X(1,0)}}function zi(e,t){var n=Q();try{return li(e,t)}catch(e){if(Z(n),e!==e+0)throw e;return X(1,0),0n}}function Bi(e){var t=Q();try{return Xr(e)}catch(e){if(Z(t),e!==e+0)throw e;return X(1,0),0n}}function Vi(e,t,n,r){var i=Q();try{return $(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Hi(e,t,n,r,i){var a=Q();try{return ni(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;X(1,0)}}function Ui(e,t,n,r,i,a){var o=Q();try{return ri(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Wi(e,t,n,r,i,a){var o=Q();try{return Ur(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Gi(e,t,n,r,i,a){var o=Q();try{return ii(e,t,n,r,i,a)}catch(e){if(Z(o),e!==e+0)throw e;X(1,0)}}function Ki(e,t,n,r,i,a,o,s){var c=Q();try{return Wr(e,t,n,r,i,a,o,s)}catch(e){if(Z(c),e!==e+0)throw e;X(1,0)}}function qi(e,t,n,r,i){var a=Q();try{return ai(e,t,n,r,i)}catch(e){if(Z(a),e!==e+0)throw e;return X(1,0),0n}}function Ji(e,t,n,r){var i=Q();try{return oi(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Yi(e,t,n,r){var i=Q();try{return si(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function Xi(e,t,n,r,i,a,o,s,c,l,u,d){var f=Q();try{return ci(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(Z(f),e!==e+0)throw e;X(1,0)}}function Zi(e,t,n,r,i,a,o,s,c,l,u){var d=Q();try{ei(e,t,n,r,i,a,o,s,c,l,u)}catch(e){if(Z(d),e!==e+0)throw e;X(1,0)}}function Qi(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=Q();try{ti(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}catch(e){if(Z(g),e!==e+0)throw e;X(1,0)}}function $i(e,t,n){var r=Q();try{return Zr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function ea(e,t,n){var r=Q();try{return Qr(e,t,n)}catch(e){if(Z(r),e!==e+0)throw e;X(1,0)}}function ta(e,t,n,r){var i=Q();try{$r(e,t,n,r)}catch(e){if(Z(i),e!==e+0)throw e;X(1,0)}}function na(){if(0<he)ge=na;else if(i)h?.(t),ce();else{for(var e=me;0<e.length;)e.shift()(t);0<he?ge=na:(t.calledRun=!0,S||(ce(),h?.(t)))}}return i||(mi=await de(),na()),t.PTR_SIZE=4,oe?t:new Promise((e,t)=>{h=e,g=t})}var Le,Re,ze=a(()=>{"use strict";Le=Ie,Re=globalThis.self?.name?.startsWith(`em-pthread`),Re&&Ie()}),Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,M,$e=a(()=>{"use strict";ke(),Be=typeof location>`u`?void 0:location.origin,Ve=self.location.href>`file:`&&self.location.href<`file;`,He=()=>Ve?new URL(new URL(`ort.bundle.min.mjs`,self.location.href).href,Be).href:self.location.href,Ue=He(),We=()=>{if(Ue&&!Ue.startsWith(`blob:`))return Ue.substring(0,Ue.lastIndexOf(`/`)+1)},Ge=(e,t)=>{try{let n=t??Ue;return(n?new URL(e,n):new URL(e)).origin===Be}catch{return!1}},Ke=(e,t)=>{let n=t??Ue;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},qe=(e,t)=>`${t??`./`}${e}`,Je=async e=>{let t=await(await fetch(e,{credentials:`same-origin`})).blob();return URL.createObjectURL(t)},Ye=async e=>(await import(e)).default,Xe=(Pe(),c(Ae)).default,Ze=async()=>{if(!Ue)throw Error(`Failed to load proxy worker: cannot determine the script source URL.`);if(Ge(Ue))return[void 0,Xe()];let e=await Je(Ue);return[e,Xe(e)]},Qe=(ze(),c(Fe)).default,M=async(e,t,n,r)=>{let i=Qe&&!(e||t);if(i)if(Ue)i=Ge(Ue)||r&&!n;else if(r&&!n)i=!0;else throw Error(`cannot determine the script source URL.`);if(i)return[void 0,Qe];{let r=`ort-wasm-simd-threaded.jsep.mjs`,i=e??Ke(r,t),a=n&&i&&!Ge(i,t),o=a?await Je(i):i??qe(r,t);return[a?o:void 0,await Ye(o)]}}}),et,tt,nt,rt,it,at,ot,st,N,ct=a(()=>{"use strict";$e(),tt=!1,nt=!1,rt=!1,it=()=>{if(typeof SharedArrayBuffer>`u`)return!1;try{return typeof MessageChannel<`u`&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},at=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ot=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},st=async e=>{if(tt)return Promise.resolve();if(nt)throw Error(`multiple calls to 'initializeWebAssembly()' detected.`);if(rt)throw Error(`previous call to 'initializeWebAssembly()' failed.`);nt=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd===`relaxed`){if(!ot())throw Error(`Relaxed WebAssembly SIMD is not supported in the current environment.`)}else if(!at())throw Error(`WebAssembly SIMD is not supported in the current environment.`)}let r=it();n>1&&!r&&(typeof self<`u`&&!self.crossOriginIsolated&&console.warn(`env.wasm.numThreads is set to `+n+`, but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info.`),console.warn(`WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading.`),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i==`string`?i:void 0,o=i?.mjs,s=o?.href??o,c=i?.wasm,l=c?.href??c,u=e.wasmBinary,[d,f]=await M(s,a,n>1,!!u||!!l),p=!1,m=[];if(t>0&&m.push(new Promise(e=>{setTimeout(()=>{p=!0,e()},t)})),m.push(new Promise((e,t)=>{let r={numThreads:n};if(u)r.wasmBinary=u,r.locateFile=e=>e;else if(l||a)r.locateFile=e=>l??a+e;else if(s&&s.indexOf(`blob:`)!==0)r.locateFile=e=>new URL(e,s).href;else if(d){let e=We();e&&(r.locateFile=t=>e+t)}f(r).then(t=>{nt=!1,tt=!0,et=t,e(),d&&URL.revokeObjectURL(d)},e=>{nt=!1,rt=!0,t(e)})})),await Promise.race(m),p)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},N=()=>{if(tt&&et)return et;throw Error(`WebAssembly is not initialized yet.`)}}),lt,ut,P,dt=a(()=>{"use strict";ct(),lt=(e,t)=>{let n=N(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},ut=(e,t,n,r)=>{if(typeof e==`object`&&e){if(n.has(e))throw Error(`Circular reference in options`);n.add(e)}Object.entries(e).forEach(([e,i])=>{let a=t?t+e:e;if(typeof i==`object`)ut(i,a+`.`,n,r);else if(typeof i==`string`||typeof i==`number`)r(a,i.toString());else if(typeof i==`boolean`)r(a,i?`1`:`0`);else throw Error(`Can't handle extra config type: ${typeof i}`)})},P=e=>{let t=N(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetLastError(r,r+n);let i=Number(t.getValue(r,n===4?`i32`:`i64`)),a=t.getValue(r+n,`*`),o=a?t.UTF8ToString(a):``;throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),ft,pt=a(()=>{"use strict";ct(),dt(),ft=e=>{let t=N(),n=0,r=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!=`number`||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!=`number`||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let a=0;return e?.tag!==void 0&&(a=lt(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&P(`Can't create run options.`),e?.extra!==void 0&&ut(e.extra,``,new WeakSet,(e,i)=>{let a=lt(e,r),o=lt(i,r);t._OrtAddRunConfigEntry(n,a,o)!==0&&P(`Can't set a run config entry: ${e} - ${i}.`)}),[n,r]}catch(e){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(e=>t._free(e)),e}}}),mt,ht,gt,_t,vt,yt,bt=a(()=>{"use strict";ct(),dt(),mt=e=>{switch(e){case`disabled`:return 0;case`basic`:return 1;case`extended`:return 2;case`layout`:return 3;case`all`:return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},ht=e=>{switch(e){case`sequential`:return 0;case`parallel`:return 1;default:throw Error(`unsupported execution mode: ${e}`)}},gt=e=>{e.extra||={},e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||=`1`,e.executionProviders&&e.executionProviders.some(e=>(typeof e==`string`?e:e.name)===`webgpu`)&&(e.enableMemPattern=!1)},_t=(e,t,n,r)=>{let i=lt(t,r),a=lt(n,r);N()._OrtAddSessionConfigEntry(e,i,a)!==0&&P(`Can't set a session config entry: ${t} - ${n}.`)},vt=async(e,t,n)=>{let r=t.executionProviders;for(let t of r){let r=typeof t==`string`?t:t.name,i=[];switch(r){case`webnn`:if(r=`WEBNN`,_t(e,`session.disable_quant_qdq`,`1`,n),_t(e,`session.disable_qdq_constant_folding`,`1`,n),typeof t!=`string`){let r=t?.deviceType;r&&_t(e,`deviceType`,r,n)}break;case`webgpu`:if(r=`JS`,typeof t!=`string`){let r=t;if(r?.preferredLayout){if(r.preferredLayout!==`NCHW`&&r.preferredLayout!==`NHWC`)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);_t(e,`preferredLayout`,r.preferredLayout,n)}}break;case`wasm`:case`cpu`:continue;default:throw Error(`not supported execution provider: ${r}`)}let a=lt(r,n),o=i.length,s=0,c=0;if(o>0){s=N()._malloc(o*N().PTR_SIZE),n.push(s),c=N()._malloc(o*N().PTR_SIZE),n.push(c);for(let e=0;e<o;e++)N().setValue(s+e*N().PTR_SIZE,i[e][0],`*`),N().setValue(c+e*N().PTR_SIZE,i[e][1],`*`)}await N()._OrtAppendExecutionProvider(e,a,s,c,o)!==0&&P(`Can't append execution provider: ${r}.`)}},yt=async e=>{let t=N(),n=0,r=[],i=e||{};gt(i);try{let e=mt(i.graphOptimizationLevel??`all`),a=ht(i.executionMode??`sequential`),o=typeof i.logId==`string`?lt(i.logId,r):0,s=i.logSeverityLevel??2;if(!Number.isInteger(s)||s<0||s>4)throw Error(`log severity level is not valid: ${s}`);let c=i.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw Error(`log verbosity level is not valid: ${c}`);let l=typeof i.optimizedModelFilePath==`string`?lt(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(e,!!i.enableCpuMemArena,!!i.enableMemPattern,a,!!i.enableProfiling,0,o,s,c,l),n===0&&P(`Can't create session options.`),i.executionProviders&&await vt(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!=`boolean`)throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);_t(n,`enableGraphCapture`,i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[e,a]of Object.entries(i.freeDimensionOverrides)){if(typeof e!=`string`)throw Error(`free dimension override name must be a string: ${e}`);if(typeof a!=`number`||!Number.isInteger(a)||a<0)throw Error(`free dimension override value must be a non-negative integer: ${a}`);let i=lt(e,r);t._OrtAddFreeDimensionOverride(n,i,a)!==0&&P(`Can't set a free dimension override: ${e} - ${a}.`)}return i.extra!==void 0&&ut(i.extra,``,new WeakSet,(e,t)=>{_t(n,e,t,r)}),[n,r]}catch(e){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&P(`Can't release session options.`),r.forEach(e=>t._free(e)),e}}}),xt,St,Ct,wt,Tt,Et,Dt,Ot,F=a(()=>{"use strict";xt=e=>{switch(e){case`int8`:return 3;case`uint8`:return 2;case`bool`:return 9;case`int16`:return 5;case`uint16`:return 4;case`int32`:return 6;case`uint32`:return 12;case`float16`:return 10;case`float32`:return 1;case`float64`:return 11;case`string`:return 8;case`int64`:return 7;case`uint64`:return 13;case`int4`:return 22;case`uint4`:return 21;default:throw Error(`unsupported data type: ${e}`)}},St=e=>{switch(e){case 3:return`int8`;case 2:return`uint8`;case 9:return`bool`;case 5:return`int16`;case 4:return`uint16`;case 6:return`int32`;case 12:return`uint32`;case 10:return`float16`;case 1:return`float32`;case 11:return`float64`;case 8:return`string`;case 7:return`int64`;case 13:return`uint64`;case 22:return`int4`;case 21:return`uint4`;default:throw Error(`unsupported data type: ${e}`)}},Ct=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t==`number`?t:t.reduce((e,t)=>e*t,1);return n>0?Math.ceil(r*n):void 0},wt=e=>{switch(e){case`float16`:return typeof Float16Array<`u`?Float16Array:Uint16Array;case`float32`:return Float32Array;case`uint8`:return Uint8Array;case`int8`:return Int8Array;case`uint16`:return Uint16Array;case`int16`:return Int16Array;case`int32`:return Int32Array;case`bool`:return Uint8Array;case`float64`:return Float64Array;case`uint32`:return Uint32Array;case`int64`:return BigInt64Array;case`uint64`:return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Tt=e=>{switch(e){case`verbose`:return 0;case`info`:return 1;case`warning`:return 2;case`error`:return 3;case`fatal`:return 4;default:throw Error(`unsupported logging level: ${e}`)}},Et=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,Dt=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint64`||e===`int8`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,Ot=e=>{switch(e){case`none`:return 0;case`cpu`:return 1;case`cpu-pinned`:return 2;case`texture`:return 3;case`gpu-buffer`:return 4;case`ml-tensor`:return 5;default:throw Error(`unsupported data location: ${e}`)}}}),kt,At=a(()=>{"use strict";ke(),kt=async e=>{if(typeof e==`string`){let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let n=t.headers.get(`Content-Length`),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(e){if(e instanceof RangeError){let e=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let a=0;for(;;){let{done:e,value:t}=await n.read();if(e)break;let r=t.byteLength;new Uint8Array(i,a,r).set(t),a+=r}return new Uint8Array(i,0,r)}}return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),jt,Mt,Nt,Pt,Ft,It,I,Lt=a(()=>{"use strict";F(),jt=[`V`,`I`,`W`,`E`,`F`],Mt=(e,t)=>{console.log(`[${jt[e]},${new Date().toISOString()}]${t}`)},Ft=(e,t)=>{Nt=e,Pt=t},It=(e,t)=>{let n=Tt(e);n>=Tt(Nt)&&Mt(n,typeof t==`function`?t():t)},I=(...e)=>{Pt&&It(...e)}}),Rt,zt,L,Bt,Vt,Ht,Ut,R=a(()=>{"use strict";Rt=class{static calcMatMulShape(e,t){return e[1]===t[0]?[e[0],t[1]]:void 0}},zt=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=Array(a);if(n){if(r<2||i<2)return;let n=Rt.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(n===void 0)return;[o[a-2],o[a-1]]=n}for(let s=n?3:1;s<=a;s++){let n=r-s<0?1:e[r-s],c=i-s<0?1:t[i-s];if(n!==c&&n>1&&c>1)return;let l=Math.max(n,c);if(n&&c)o[a-s]=Math.max(n,c);else{if(l>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},L=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let n=e.length;if(n===0)return[];let r=Array(n),i=n-1;for(;i>=0;){if(e[i]%t===0){r[i]=e[i]/t;break}if(t%e[i]!==0)throw Error(`cannot convert shape`);r[i]=1,t/=e[i],i--}for(i--;i>=0;i--)r[i]=e[i];return r}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let r=1;for(let i=t;i<n;i++){if(e[i]<0)throw Error(`cannot get valid size from specified dimension range. Most likely the range contains negative values in them.`);r*=Number(e[i])}return r}static computeStrides(e){let t=e.length;if(t===0)return[];if(t===1)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error(`unsupported axis for this operation.`);return e<0?e+t:e}static normalizeAxes(e,t){return e.map(n=>this.normalizeAxis(n,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,r)=>e+t[r]+t[r+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}},Bt=class e{static adjustPoolAttributes(e,t,n,r,i,a){if(!e&&n.length!==t.length-2)throw Error(`length of specified kernel shapes should be 2 less than length of input dimensions`);if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<r.length){if(r[e]<0)throw Error(`strides should be greater than or equal to 1`)}else r.push(1);for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error(`dilations should be greater than or equal to 1`)}else i.push(1);for(let e=0;e<n.length*2;e++)if(e<a.length){if(a[e]<0)throw Error(`pad should be greater than or equal to 1`)}else a.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error(`kernel shapes need to be greater than 0`);if(a[e]>=n[e]||a[e+n.length]>=n[e])throw Error(`pads should be smaller than kernel`)}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw Error(`length of pads should be twice the length of data dimensions`);if(n.length!==t.length-2)throw Error(`length of strides should be the length of data dimensions`);if(i.length!==t.length-2)throw Error(`length of kernel shapes should be the length of data dimensions`);for(let c=0;c<t.length-2;c++)e.adjustPadAndReturnShape(t[c+(o?1:2)],n[c],r[c],i[c],a,c,c+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s,c=0){if(n.length<=0)throw Error(`input shape must be of size greater than 0`);let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,r,i,a,o,s,c),l}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw Error(`invalid input tensor dims or invalid filter tensor dims`);let c=[t[0],n[0]];return e.computeShapeHelper(!1,t,c,r,i,a,o,s),c}static computeShapeHelper(t,n,r,i,a,o,s,c,l=0){if(t)for(let e=0;e<n.length-2;e++)r.push(1);else for(let t=0;t<n.length-2;t++)r.push(e.adjustPadAndReturnShape(n[t+2],i[t],a[t],o[t],s,t,t+n.length-2,c,l))}static computeOutputSize(e,t,n,r,i){let a=Math.floor(e/t)+1;return i===1&&(a=Math.ceil(e/t)+1,(a-1)*t>=n+r&&--a),a}static adjustPadAndReturnShape(t,n,r,i,a,o,s,c,l=0){let u=r*(i-1)+1;if(c&&c!==`NOTSET`)switch(c){case`VALID`:return a[o]=0,a[s]=0,e.computeOutputSize(t-u,n,t,0,l);case`SAME_LOWER`:case`SAME_UPPER`:if(r!==1)throw Error(`Dilation not supported for SAME_UPPER or SAME_LOWER`);{let r=(Math.floor((t+n-1)/n)-1)*n+i-t;return a[o]=Math.floor(c===`SAME_LOWER`?(r+1)/2:r/2),a[s]=r-a[o],e.computeOutputSize(t+a[o]+a[s]-u,n,t,a[o],l)}default:throw Error(`Unsupported AutoPad type`)}else return e.computeOutputSize(t+a[o]+a[s]-u,n,t,a[o],l)}},Vt=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw Error(`shape need to be of size 2`);let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let c=-1;if(r?(s=n[0],c=1):(s=n[1],c=0),n[c]!==o)throw Error(`dimension mismatch`);if(a<=0||s<=0||o<=0)throw Error(`invalid shape specified`);if(i&&!zt.isValidBroadcast(i,[a,s]))throw Error(`gemm: invalid bias shape for broadcast`);return[a,s,o]}},Ht=-34028234663852886e22,Ut=34028234663852886e22}),Wt,Gt=a(()=>{"use strict";F(),Wt=(e,t)=>new(wt(t))(e)}),Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn=a(()=>{"use strict";F(),Lt(),Kt=new Map([[`float32`,32],[`float16`,16],[`int32`,32],[`uint32`,32],[`int64`,64],[`uint64`,64],[`int8`,8],[`uint8`,8],[`int4`,4],[`uint4`,4]]),qt=(e,t)=>{if(t===`int32`)return e;let n=Kt.get(t);if(!n)throw Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(wt(t))(e.buffer,e.byteOffset,i);switch(t){case`int64`:case`uint64`:{let e=new Int32Array(i);for(let t=0;t<i;t++){let n=a[t];if(n>2147483647n||n<-2147483648n)throw Error(`Can not convert int64 data to int32 - value out of range.`);e[t]=Number(n)}return new Uint8Array(e.buffer)}case`int8`:case`uint8`:case`uint32`:{if(t===`uint32`&&a.some(e=>e>2147483647))throw Error(`Can not convert uint32 data to int32 - value out of range.`);let e=Int32Array.from(a,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},Jt=(e,t)=>{if(t===`int32`)return e;if(e.byteLength%4!=0)throw Error(`Invalid Uint8Array length - must be a multiple of 4 (int32).`);let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case`int64`:{let e=BigInt64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`uint64`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uin64 - negative value found.`);let e=BigUint64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`int8`:{if(r.some(e=>e<-128||e>127))throw Error(`Can not convert int32 data to int8 - value out of range.`);let e=Int8Array.from(r,Number);return new Uint8Array(e.buffer)}case`uint8`:if(r.some(e=>e<0||e>255))throw Error(`Can not convert int32 data to uint8 - value out of range.`);return Uint8Array.from(r,Number);case`uint32`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uint32 - negative value found.`);let e=Uint32Array.from(r,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},Yt=1,Xt=()=>Yt++,Zt=new Map([[`int8`,`int32`],[`uint8`,`int32`],[`uint32`,`int32`],[`int64`,`int32`]]),Qt=(e,t)=>{let n=Kt.get(e);if(!n)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*n/8):0},$t=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Qt(this.dataType,this.tensorShape)}destroy(){I(`verbose`,()=>`[WebNN] TensorWrapper.destroy`),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=Jt(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}return new Uint8Array(n).buffer}return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((e,t)=>e===n[t])}setIsDataConverted(e){this.isDataConverted=e}},en=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!a?.input.dataTypes.includes(t)){if(o=Zt.get(t),!o||a?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${t}`);I(`verbose`,()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Qt(t,n))throw Error(`Unable to copy data to tensor with different size.`);this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>`u`?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType===`int32`)t=qt(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}I(`verbose`,()=>`Data size does not match tensor size. Releasing tensor.`),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Jt(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}return t.buffer}if(!this.wrapper)throw Error(`Tensor has not been created.`);return e?this.wrapper.read(e):this.wrapper.read()}},tn=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error(`MLContext not found for session.`);return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Xt();return this.tensorTrackersById.set(e,new en(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){I(`verbose`,()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw Error(`Tensor not found.`);return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);n.upload(t)}async download(e,t){I(`verbose`,()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=Xt(),o=new $t({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new en(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[r,i]of this.freeTensors.entries())if(i.canReuseTensor(s,t,n)){I(`verbose`,()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}`);let i=this.freeTensors.splice(r,1)[0];return i.sessionId=e,i}I(`verbose`,()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}}`);let c=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new $t({sessionId:e,context:s,tensor:c,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},nn=(...e)=>new tn(...e)}),an,on,sn,cn=a(()=>{"use strict";F(),ct(),Gt(),rn(),Lt(),an=new Map([[1,`float32`],[10,`float16`],[6,`int32`],[12,`uint32`],[7,`int64`],[13,`uint64`],[22,`int4`],[21,`uint4`],[3,`int8`],[2,`uint8`],[9,`uint8`]]),on=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((n,i)=>n===r[i]&&e[n]===t[n])},sn=class{constructor(e){this.tensorManager=nn(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Ft(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw Error(`No active session`);return this.activeSessionId}onRunStart(e){I(`verbose`,()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){I(`verbose`,()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)I(`verbose`,()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(e===void 0){let e=this.mlContextCache.findIndex(e=>e.options===void 0&&e.gpuDevice===void 0);if(e!==-1)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>on(t.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);e!==-1&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){I(`verbose`,()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=an.get(n);if(!a)throw Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){I(`verbose`,()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=an.get(t);if(!r)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!N().shouldTransferToMLTensor)throw Error(`Trying to upload to a MLTensor while shouldTransferToMLTensor is false`);I(`verbose`,()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Wt(n,t)}}registerMLTensor(e,t,n,r){let i=an.get(n);if(!i)throw Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return I(`verbose`,()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=an.get(xt(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>`u`?!1:n?!!i?.input.dataTypes.includes(r):!!i?.output.dataTypes.includes(r)}flush(){}}}),ln=a(()=>{"use strict";}),un,dn,fn,pn,mn,hn,gn,_n,vn,yn=a(()=>{"use strict";Lt(),ln(),un=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),dn=[],fn=e=>Math.ceil(Number(e)/16)*16,pn=e=>{for(let t=0;t<dn.length;t++){let n=dn[t];if(e<=n)return n}return Math.ceil(e/16)*16},mn=1,hn=()=>mn++,gn=async(e,t,n,r)=>{let i=fn(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let e=r();return e.set(new Uint8Array(s,0,n)),e}return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},_n=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[e]of un)dn.push(e),this.freeBuffers.set(e,[]),this.freeUniformBuffers.set(e,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=fn(i),o=this.storageCache.get(e);if(!o)throw Error(`gpu data for uploading does not exist`);if(Number(o.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);if(a===i&&r%4==0)this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,n,r,i);else{let e=new Uint8Array(a);e.set(t),this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,e,0,a)}I(`verbose`,()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw Error(`source gpu data for memcpy does not exist`);let r=this.storageCache.get(t);if(!r)throw Error(`destination gpu data for memcpy does not exist`);if(n.originalSize!==r.originalSize)throw Error(`inconsistent source and destination gpu data size`);let i=fn(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return I(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=hn();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),I(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),I(`verbose`,()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=pn(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(n);r=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:hn(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),I(`verbose`,()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e==`bigint`?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw Error(`releasing data does not exist`)}return I(`verbose`,()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw Error(`data does not exist`);await gn(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=un.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),--this.sessionCount,this.sessionCount===0&&(I(`warning`,()=>`[WebGPU] Clearing webgpu buffer cache`),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},vn=(...e)=>new _n(...e)}),bn,z,B=a(()=>{"use strict";bn=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(`;`),this.key}},z=e=>new bn(e)}),xn,Sn,V,H,U,W,Cn,wn,Tn,G,En,K,q,Dn,On,kn,An,J=a(()=>{"use strict";F(),R(),xn=64,Sn=(e,t)=>{if(t===3)throw Error(`vec3 has same alignment as vec4, use vec4 instead`);switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:`f16`;case 1:return t>1?`vec${t}<f32>`:`f32`;case 6:return t>1?`vec${t}<i32>`:`i32`;case 12:return t>1?`vec${t}<u32>`:`u32`;case 7:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`i32`];case 13:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`u32`];case 9:if(t!==4)throw Error(`bool must be vec4`);return[`u32`,`vec4<bool>`];case 22:return`i32`;case 21:return`u32`;default:throw Error(`Unknown data type: ${e}`)}},V=(e,t=1)=>{let n=Sn(e,t);return typeof n==`string`?n:n[0]},H=(e,t=1)=>{let n=Sn(e,t);return typeof n==`string`?n:n[1]},U=(...e)=>{let t=[];return e.forEach(e=>{e.length!==0&&t.push({type:12,data:e},{type:12,data:L.computeStrides(e)})}),t},W=e=>e%4==0?4:e%2==0?2:1,Cn=(e=`f32`,t,n=`0`)=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,wn=(e,t,n)=>e===`f32`?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Tn=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,G=(e,t,n,r)=>e.startsWith(`uniforms.`)&&n>4?typeof t==`string`?r===`f16`?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r===`f16`?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,En=(e,t,n,r,i)=>{let a=typeof n==`number`,o=a?n:n.length,s=[...Array(o).keys()],c=o<2?`u32`:o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,l=Sn(t,i),u=typeof l==`string`?l:l[1],d={indices:c,value:u,storage:typeof l==`string`?l:l[0],tensor:t},f=e=>typeof e==`string`?e:`${e}u`,p={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=a?`uniforms.`:``,h=`${m}${e}_shape`,g=`${m}${e}_strides`,_=``;for(let e=0;e<o-1;e++)_+=`
    let dim${e} = current / ${G(g,e,o)};
    let rest${e} = current % ${G(g,e,o)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;_+=`indices[${o-1}] = current;`;let v=o<2?``:`
  fn o2i_${e}(offset: u32) -> ${d.indices} {
    var indices: ${d.indices};
    var current = offset;
    ${_}
    return indices;
  }`,y=t=>(p.offsetToIndices=!0,o<2?t:`o2i_${e}(${t})`),b=[];if(o>=2)for(let e=o-1;e>=0;e--)b.push(`${G(g,e,o)} * (indices[${e}])`);let x=o<2?``:`
  fn i2o_${e}(indices: ${d.indices}) -> u32 {
    return ${b.join(`+`)};
  }`,S=t=>(p.indicesToOffset=!0,o<2?t:`i2o_${e}(${t})`),C=(...e)=>o===0?`0u`:`${d.indices}(${e.map(f).join(`,`)})`,w=(e,t)=>o<2?`${e}`:`${G(e,t,o)}`,ee=(e,t,n)=>o<2?`${e}=${n};`:`${G(e,t,o)}=${n};`,T={},E=(t,n)=>{p.broadcastedIndicesToOffset=!0;let r=`${n.name}broadcastedIndicesTo${e}Offset`;if(r in T)return`${r}(${t})`;let i=[];for(let e=o-1;e>=0;e--){let t=n.indicesGet(`outputIndices`,e+n.rank-o);i.push(`${w(g,e)} * (${t} % ${w(h,e)})`)}return T[r]=`fn ${r}(outputIndices: ${n.type.indices}) -> u32 {
             return ${i.length>0?i.join(`+`):`0u`};
           }`,`${r}(${t})`},D=(t,n)=>(()=>{if(d.storage===d.value)return`${e}[${t}]=${n};`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`${e}[${t}]=vec2<u32>(u32(${n}), select(0u, 0xFFFFFFFFu, ${n} < 0));`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`${e}[${t}]=vec2<u32>(u32(${n}), 0u);`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${n}));`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),O=t=>(()=>{if(d.storage===d.value)return`${e}[${t}]`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`i32(${e}[${t}].x)`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`u32(${e}[${t}].x)`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),k=o<2?``:`
  fn get_${e}ByIndices(indices: ${d.indices}) -> ${u} {
    return ${O(`i2o_${e}(indices)`)};
  }`,A=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn get_${e}(${t}) -> ${u} {
    return get_${e}ByIndices(${C(n)});
  }`})(),te=(...t)=>{if(t.length!==o)throw Error(`indices length must be ${o}`);let n=t.map(f).join(`,`);return o===0?O(`0u`):o===1?O(n[0]):(p.get=!0,p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}(${n})`)},ne=t=>o<2?O(t):(p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}ByIndices(${t})`),re=o<2?``:`
  fn set_${e}ByIndices(indices: ${d.indices}, value: ${u}) {
    ${D(`i2o_${e}(indices)`,`value`)}
  }`,ie=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn set_${e}(${t}, value: ${u}) {
    set_${e}ByIndices(${C(n)}, value);
  }`})();return{impl:()=>{let e=[],t=!1;return p.offsetToIndices&&(e.push(v),t=!0),p.indicesToOffset&&(e.push(x),t=!0),p.broadcastedIndicesToOffset&&(Object.values(T).forEach(t=>e.push(t)),t=!0),p.set&&(e.push(ie),t=!0),p.setByIndices&&(e.push(re),t=!0),p.get&&(e.push(A),t=!0),p.getByIndices&&(e.push(k),t=!0),!a&&t&&e.unshift(`const ${h} = ${d.indices}(${n.join(`,`)});`,`const ${g} = ${d.indices}(${L.computeStrides(n).join(`,`)});`),e.join(`
`)},type:d,offsetToIndices:y,indicesToOffset:S,broadcastedIndicesToOffset:E,indices:C,indicesGet:w,indicesSet:ee,set:(...t)=>{if(t.length!==o+1)throw Error(`indices length must be ${o}`);let n=t[o];if(typeof n!=`string`)throw Error(`value must be string`);let r=t.slice(0,o).map(f).join(`,`);return o===0?D(`0u`,n):o===1?D(r[0],n):(p.set=!0,p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}(${r}, ${n})`)},setByOffset:D,setByIndices:(t,n)=>o<2?D(t,n):(p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${n});`),get:te,getByOffset:O,getByIndices:ne,usage:r,name:e,strides:g,shape:h,rank:o}},K=(e,t,n,r=1)=>En(e,t,n,`input`,r),q=(e,t,n,r=1)=>En(e,t,n,`output`,r),Dn=(e,t,n)=>En(e,t,n,`atomicOutput`,1),On=(e,t,n,r=1)=>En(e,t,n,`internal`,r),kn=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e==`number`?`${e}u`:e}) { return; }`}mainStart(e=xn){let t=typeof e==`number`?e:e[0],n=typeof e==`number`?1:e[1],r=typeof e==`number`?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`}) {
    ${i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith(`uniforms.`)&&this.uniforms.push({name:e.shape.replace(`uniforms.`,``),type:`u32`,length:e.rank}),e.strides.startsWith(`uniforms.`)&&this.uniforms.push({name:e.strides.replace(`uniforms.`,``),type:`u32`,length:e.rank}))}declareVariable(e,t){if(e.usage===`internal`)throw Error(`cannot use internal variable with declareVariable(). use registerInternalVariables() instead.`);this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage===`input`?`read`:`read_write`,r=e.usage===`atomicOutput`?`atomic<i32>`:e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!==`internal`)throw Error(`cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.`);this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return``;let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n===`f16`?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(`, `)} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=e=>[12,10,1,6][[`u32`,`f16`,`f32`,`i32`].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},An=(e,t)=>new kn(e,t)}),jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn=a(()=>{"use strict";F(),R(),B(),J(),jn=(e,t)=>{if(!e||e.length!==1)throw Error(`Transpose requires 1 input.`);if(t.length!==0&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Mn=(e,t)=>t.length===0?[...Array(e).keys()].reverse():t,Nn=(e,t)=>L.sortBasedOnPerm(e,Mn(e.length,t)),Pn=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let n=0;n<t;++n)i+=`a[${e[n]}]=i[${n}];`;return i+=`return a;}`},Fn=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},In=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},Ln=(e,t)=>{let n=e.dataType,r=e.dims.length,i=Mn(r,t),a=Nn(e.dims,i),o=e.dims,s=a,c=r<2||In(i,e.dims),l;if(c)return l=e=>{let t=K(`input`,n,o,4),r=q(`output`,n,s,4);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    output[global_idx] = input[global_idx];
  }`},{name:`TransposeCopy`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:l};let{newShape:u,newPerm:d}=Fn(e.dims,i),f=L.areEqual(d,[2,3,1]),p=L.areEqual(d,[3,1,2]);return u.length===2||f||p?(o=f?[u[0],u[1]*u[2]]:p?[u[0]*u[1],u[2]]:u,s=[o[1],o[0]],l=e=>{let t=K(`a`,n,o.length),r=q(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${t.getByIndices(`${t.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,`tile[local_id.x][local_id.y]`)}
    }
  }`},{name:`TransposeShared`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/16),y:Math.ceil(s[0]/16)},programUniforms:[{type:12,data:t},...U(o,s)]}},getShaderSource:l}):(l=e=>{let t=K(`a`,n,o.length),a=q(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,a)}

  ${Pn(i,r,t,a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${a.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${a.setByOffset(`global_idx`,t.getByIndices(`aIndices`))}
  }`},{name:`Transpose`,shaderCache:{hint:`${t}`,inputDependencies:[`rank`]},getRunData:()=>{let t=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...U(o,s)]}},getShaderSource:l})},Rn=(e,t)=>{jn(e.inputs,t.perm),e.compute(Ln(e.inputs[0],t.perm))},zn=e=>z({perm:e.perm})}),Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr=a(()=>{"use strict";F(),R(),J(),jr(),Bn(),Vn={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate * candidate`,logSumExp:`bestValue + exp(candidate)`,l1:`bestValue + abs(candidate)`,l2:`bestValue + candidate * candidate`,logSum:`bestValue + candidate`},Hn={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate`,logSumExp:`bestValue + candidate`,l1:`bestValue + candidate`,l2:`bestValue + candidate`,logSum:`bestValue + candidate`},Un={max:`_A[offset]`,min:`_A[offset]`,mean:`0`,sum:`0`,prod:`1`,sumSquare:`0`,logSumExp:`0`,l1:`0`,l2:`0`,logSum:`0`},Wn={max:`bestValue`,min:`bestValue`,sum:`bestValue`,prod:`bestValue`,sumSquare:`bestValue`,logSumExp:`log(bestValue)`,l1:`bestValue`,l2:`sqrt(bestValue)`,logSum:`log(bestValue)`},Gn=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Kn=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]},qn=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},Jn=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Yn=(e,t)=>{let n=[];if(!Jn(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(e=>n.push(e))}return n},Xn=(e,t,n,r,i,a,o)=>{let s=n[0].dims,c=L.size(a),l=L.size(o),u=K(`_A`,n[0].dataType,s),d=q(`output`,i,a),f=64;c===1&&(f=256);let p=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:[`type`]},getShaderSource:e=>`
        ${e.registerUniform(`reduceSize`,`u32`).declareVariables(u,d)}
        ${p}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Un[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${u.getByOffset(`offset + k`)});
           bestValue = ${Vn[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Hn[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset(`outputIndex`,`${r===`mean`?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${Wn[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:c},programUniforms:[{type:12,data:l}]})}},Zn=(e,t,n,r)=>{let i=e.inputs.length===1?n:fr(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((e,t)=>t));let o=L.normalizeAxes(a,e.inputs[0].dims.length),s=o,c=e.inputs[0],l=Yn(s,e.inputs[0].dims.length);l.length>0&&(c=e.compute(Ln(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=Gn(s.length,c.dims.length));let[u,d]=Kn(c.dims,s),f=u;i.keepDims&&(f=qn(u,o)),e.compute(Xn(t,i.cacheKey,[c],r,e.inputs[0].dataType,f,d),{inputs:[c]})},Qn=(e,t)=>{Zn(e,`ReduceMeanShared`,t,`mean`)},$n=(e,t)=>{Zn(e,`ReduceL1Shared`,t,`l1`)},er=(e,t)=>{Zn(e,`ReduceL2Shared`,t,`l2`)},tr=(e,t)=>{Zn(e,`ReduceLogSumExpShared`,t,`logSumExp`)},nr=(e,t)=>{Zn(e,`ReduceMaxShared`,t,`max`)},rr=(e,t)=>{Zn(e,`ReduceMinShared`,t,`min`)},ir=(e,t)=>{Zn(e,`ReduceProdShared`,t,`prod`)},ar=(e,t)=>{Zn(e,`ReduceSumShared`,t,`sum`)},or=(e,t)=>{Zn(e,`ReduceSumSquareShared`,t,`sumSquare`)},sr=(e,t)=>{Zn(e,`ReduceLogSumShared`,t,`logSum`)}}),lr,ur,dr,fr,Y,pr,mr,hr,gr,_r,vr,yr,br,X,xr,Sr,Z,Cr,Q,wr,Tr,Er,Dr,Or,kr,Ar,jr=a(()=>{"use strict";F(),R(),B(),J(),cr(),lr=e=>{if(!e||e.length===0||e.length>2)throw Error(`Reduce op requires 1 or 2 inputs.`);if(e.length===2&&e[1].dims.length!==1)throw Error(`Invalid axes input dims.`)},ur=e=>[``,``,`var value = ${e.getByIndices(`input_indices`)};`,``],dr=(e,t,n,r,i,a,o=!1,s=!1)=>{let c=[],l=n[0].dims,u=l.length,d=L.normalizeAxes(i,u),f=!s&&d.length===0;l.forEach((e,t)=>{f||d.indexOf(t)>=0?o&&c.push(1):c.push(e)});let p=c.length,m=L.size(c);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=K(`_A`,n[0].dataType,u),s=q(`output`,a,p),c=r(i,s,d),m=c[2];for(let e=0,n=0;e<u;e++)f||d.indexOf(e)>=0?(o&&n++,m=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${c[2].includes(`last_index`)?`let last_index = j${e};`:``}
                  ${i.indicesSet(`input_indices`,e,`j${e}`)}
                  ${m}
                }`):(t.push(`${i.indicesSet(`input_indices`,e,s.indicesGet(`output_indices`,n))};`),n++);return`

        ${e.registerUniform(`output_size`,`u32`).declareVariables(i,s)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          var input_indices: ${i.type.indices};
          let output_indices = ${s.offsetToIndices(`global_idx`)};

          ${t.join(`
`)}
          ${c[0]}       // init ops for reduce max/min
          ${c[1]}
          ${m}
          ${c[3]}
          ${c.length===4?s.setByOffset(`global_idx`,`value`):c.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...U(l,c)]})}},fr=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),z({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Y=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:fr(i,n);e.compute(dr(t,{hint:a.cacheKey,inputDependencies:[`rank`]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?ur:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},pr=(e,t)=>{lr(e.inputs),Y(e,`ReduceLogSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,`value = log(value);`])},mr=(e,t)=>{lr(e.inputs),Y(e,`ReduceL1`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += abs(${e.getByIndices(`input_indices`)});`,``])},hr=(e,t)=>{lr(e.inputs),Y(e,`ReduceL2`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += (t * t);`,`value = sqrt(value);`])},gr=(e,t)=>{lr(e.inputs),Y(e,`ReduceLogSumExp`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += exp(${e.getByIndices(`input_indices`)});`,`value = log(value);`])},_r=(e,t)=>{lr(e.inputs),Y(e,`ReduceMax`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(e.indicesSet(`input_indices`,t,0));return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = max(value, ${e.getByIndices(`input_indices`)});`,``]})},vr=(e,t)=>{lr(e.inputs),Y(e,`ReduceMean`,t,(t,n,r)=>{let i=1;for(let n=0;n<t.rank;n++)(r.indexOf(n)>=0||r.length===0)&&(i*=e.inputs[0].dims[n]);return[`var sum = f32(0);`,``,`sum += f32(${t.getByIndices(`input_indices`)});`,`let value = ${n.type.value}(sum / ${i});`]})},yr=(e,t)=>{lr(e.inputs),Y(e,`ReduceMin`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(`input_indices[${t}] = 0;`);return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = min(value, ${e.getByIndices(`input_indices`)});`,``]})},br=(e,t)=>{lr(e.inputs),Y(e,`ReduceProd`,t,(e,t)=>[`var value = ${t.type.storage}(1);`,``,`value *= ${e.getByIndices(`input_indices`)};`,``])},X=(e,t)=>{lr(e.inputs),Y(e,`ReduceSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,``])},xr=(e,t)=>{lr(e.inputs),Y(e,`ReduceSumSquare`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += t * t;`,``])},Sr=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?r*=e[n]:i*=e[n];return i<32&&r>1024},Z=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vr(e,t):Qn(e,t)},Cr=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mr(e,t):$n(e,t)},Q=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hr(e,t):er(e,t)},wr=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gr(e,t):tr(e,t)},Tr=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_r(e,t):nr(e,t)},Er=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yr(e,t):rr(e,t)},Dr=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?br(e,t):ir(e,t)},Or=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?X(e,t):ar(e,t)},kr=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xr(e,t):or(e,t)},Ar=(e,t)=>{Sr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pr(e,t):sr(e,t)}}),Mr,Nr,Pr,Fr,Ir=a(()=>{"use strict";F(),B(),jr(),Mr=e=>{if(!e||e.length===0||e.length>2)throw Error(`ArgMinMaxOp op requires 1 or 2 inputs.`);if(e[0].dataType!==1)throw Error(`Invalid input type.`)},Nr=(e,t)=>{Mr(e.inputs),e.compute(dr(`ArgMin`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`<=`:`<`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},Pr=(e,t)=>{Mr(e.inputs),e.compute(dr(`argMax`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`>=`:`>`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},Fr=e=>z(e)}),Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr=a(()=>{"use strict";F(),R(),ln(),J(),Lr=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw Error(`Attention cannot have both past and attention_bias`);if(n.dims.length!==3)throw Error(`Input "input" must have 3 dimensions`);let c=n.dims[0],l=n.dims[1],u=n.dims[2];if(i.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimensions`);if(r.dims.length!==2)throw Error(`Input "weights" is expected to have 2 dimensions`);if(r.dims[0]!==u)throw Error(`Input 1 dimension 0 should have same length as dimension 2 of input 0`);if(i.dims[0]!==r.dims[1])throw Error(`Input "bias" dimension 0 should have same length as dimension 1 of input "weights"`);let d=i.dims[0]/3,f=d,p=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw Error(`qkv_hidden_sizes attribute should have 3 elements`);for(let e of t.qkvHiddenSizes)if(e%t.numHeads!==0)throw Error(`qkv_hidden_sizes should be divisible by num_heads`);d=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],p=t.qkvHiddenSizes[2]}let m=l;if(d!==f)throw Error(`qkv_hidden_sizes first element should be same as the second`);if(i.dims[0]!==d+f+p)throw Error(`Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes`);let h=0;if(o){if(f!==p)throw Error(`Input "past" expect k_hidden_size == v_hidden_size`);if(o.dims.length!==5)throw Error(`Input "past" must have 5 dimensions`);if(o.dims[0]!==2)throw Error(`Input "past" first dimension must be 2`);if(o.dims[1]!==c)throw Error(`Input "past" second dimension must be batch_size`);if(o.dims[2]!==t.numHeads)throw Error(`Input "past" third dimension must be num_heads`);if(o.dims[4]!==f/t.numHeads)throw Error(`Input "past" fifth dimension must be k_hidden_size / num_heads`);t.pastPresentShareBuffer||(h=o.dims[3])}let g=m+h;if(a)throw Error(`Mask not supported`);if(o)throw Error(`past is not supported`);if(s){if(s.dims.length!==4)throw Error(`Input "attention_bias" must have 4 dimensions`);if(s.dims[0]!==c||s.dims[1]!==t.numHeads||s.dims[2]!==l||s.dims[3]!==g)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:c,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:u,hiddenSize:d,vHiddenSize:p,headSize:Math.floor(d/t.numHeads),vHeadSize:Math.floor(p/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Rr=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset(`0`)});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset(`batchIdx`)}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?`let past_sequence_length = uniforms.past_sequence_length`:``};
    let present_sequence_length = total_sequence_length;
    `,zr=(e,t,n,r,i,a,o,s)=>{let c=W(o?1:a),l=64,u=a/c;u<l&&(l=32);let d=Math.ceil(a/c/l),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:u},{type:12,data:d}],p=V(e.dataType,c),m=H(1,c),h=[`type`];return o&&h.push(`type`),s&&h.push(`type`),{name:`AttentionProbsSoftmax`,shaderCache:{hint:`${l};${p};${c}`,inputDependencies:h},getShaderSource:t=>{let n=q(`x`,e.dataType,e.dims,c),r=[n],i=o?K(`seq_lens`,o.dataType,o.dims):void 0;i&&r.push(i);let a=s?K(`total_sequence_length_input`,s.dataType,s.dims):void 0;a&&r.push(a);let u=H(e.dataType);return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${t.registerUniforms([{name:`batch_size`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`total_sequence_length`,type:`u32`},{name:`elements_per_thread`,type:`u32`}]).declareVariables(...r)}
  ${t.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Rr(i,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?`u32(past_sequence_length + workgroup_id.y + 1)`:`total_sequence_length`};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(c){case 1:return`thread_max_vector`;case 2:return`max(thread_max_vector.x, thread_max_vector.y)`;case 4:return`max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(c){case 1:return`sum_vector`;case 2:return`sum_vector.x + sum_vector.y`;case 4:return`sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${n.type.value}(${u}(1.0) / ${u}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${n.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${n.type.value}(${u}(0));
        }`:``};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},Br=(e,t,n,r,i,a,o,s,c)=>{let l=o+a.kvSequenceLength,u=[a.batchSize,a.numHeads,a.sequenceLength,l],d=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,p=d?[a.batchSize,f,l,a.headSize]:void 0,m=a.nReps?a.nReps:1,h=a.scale===0?1/Math.sqrt(a.headSize):a.scale,g=W(a.headSize),_=a.headSize/g,v={x:Math.ceil(l/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},y=[{type:12,data:a.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:h},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:m}],b=d&&r&&L.size(r.dims)>0,x=[`type`,`type`];b&&x.push(`type`),i&&x.push(`type`),s&&x.push(`type`),c&&x.push(`type`);let S=[{dims:u,dataType:t.dataType,gpuDataType:0}];return d&&S.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionProbs`,shaderCache:{hint:`${g};${i!==void 0};${r!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:S,dispatchGroup:v,programUniforms:y}),getShaderSource:e=>{let a=K(`q`,t.dataType,t.dims,g),o=[a,K(`key`,n.dataType,n.dims,g)];if(b){let e=K(`past_key`,r.dataType,r.dims,g);o.push(e)}i&&o.push(K(`attention_bias`,i.dataType,i.dims));let l=s?K(`seq_lens`,s.dataType,s.dims):void 0;l&&o.push(l);let f=c?K(`total_sequence_length_input`,c.dataType,c.dims):void 0;f&&o.push(f);let h=q(`output`,t.dataType,u),_=[h];d&&_.push(q(`present_key`,t.dataType,p,g));let v=H(1,g);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${a.type.storage}, 144>;
  var<workgroup> tileK: array<${a.type.storage}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`alpha`,type:`f32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...o,..._)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?`headIdx`:`headIdx / uniforms.n_reps`};
    let kv_num_heads = ${m===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Rr(l,f,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${b&&d?`let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;`:``};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?`let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;`:``}
    var value = ${v}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${b&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:``}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${v}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return`value`;case 2:return`value.x + value.y`;case 4:return`value.x + value.y + value.z + value.w`;default:throw Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${h.type.value} (sum * uniforms.alpha) + ${i?`attention_bias[outputIdx]`:`0.0`};
    }
  }`}}},Vr=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let c=a+i.kvSequenceLength,l=i.nReps?i.nReps:1,u=i.vHiddenSize*l,d=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,p=d?[i.batchSize,f,c,i.headSize]:void 0,m=[i.batchSize,i.sequenceLength,u],h={x:Math.ceil(i.vHeadSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},g=[{type:12,data:i.sequenceLength},{type:12,data:c},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:u},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:l}],_=d&&r&&L.size(r.dims)>0,v=[`type`,`type`];_&&v.push(`type`),o&&v.push(`type`),s&&v.push(`type`);let y=[{dims:m,dataType:t.dataType,gpuDataType:0}];return d&&y.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionScore`,shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:y,dispatchGroup:h,programUniforms:g}),getShaderSource:e=>{let i=K(`probs`,t.dataType,t.dims),a=[i,K(`v`,n.dataType,n.dims)];_&&a.push(K(`past_value`,r.dataType,r.dims));let c=o?K(`seq_lens`,o.dataType,o.dims):void 0;o&&a.push(c);let u=s?K(`total_sequence_length_input`,s.dataType,s.dims):void 0;s&&a.push(u);let f=[q(`output`,t.dataType,m)];return d&&f.push(q(`present_value`,t.dataType,p)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${i.type.value}, 144>;
  var<workgroup> tileV: array<${i.type.value}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`v_hidden_size`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...a,...f)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?`headIdx`:`headIdx / uniforms.n_reps`};
   let kv_num_heads = ${l===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Rr(c,u,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&d?`let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;`:``};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?`let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;`:``}
   var value = ${i.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${d?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:``}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}},Hr=(e,t,n,r,i,a,o,s,c,l,u=void 0,d=void 0)=>{let f=Math.min(e.outputCount,1+ +!!o+ +!!s),p=f>1?o:void 0,m=f>1?s:void 0,h=f>1?l.pastSequenceLength:0,g=h+l.kvSequenceLength,_=c&&L.size(c.dims)>0?c:void 0,v=[t,n];p&&L.size(p.dims)>0&&v.push(p),_&&v.push(_),u&&v.push(u),d&&v.push(d);let y=e.compute(Br(f,t,n,p,_,l,h,u,d),{inputs:v,outputs:f>1?[-1,1]:[-1]})[0];e.compute(zr(y,l.batchSize,l.numHeads,h,l.sequenceLength,g,u,d),{inputs:u&&d?[y,u,d]:[y],outputs:[]});let b=[y,r];m&&L.size(m.dims)>0&&b.push(m),u&&b.push(u),d&&b.push(d),e.compute(Vr(f,y,r,m,l,h,u,d),{inputs:b,outputs:f>1?[0,2]:[0]})},Ur=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o={x:Math.ceil(t.headSize/12),y:Math.ceil(t.sequenceLength/12),z:t.batchSize*t.numHeads},s=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}];return e.compute({name:`AttentionPrepare`,shaderCache:{inputDependencies:[`type`,`type`,`type`]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:c}),getShaderSource:e=>{let t=q(`output_q`,s[0].dataType,n),r=q(`output_k`,s[0].dataType,n),i=q(`output_v`,s[0].dataType,n),a=K(`input`,s[0].dataType,s[0].dims),o=K(`weight`,s[1].dataType,s[1].dims),c=K(`bias`,s[2].dataType,s[2].dims),l=a.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`ldb`,type:`u32`}]).declareVariables(a,o,c,t,r,i)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:s,outputs:[-1,-1,-1]})},Wr=(e,t)=>{let n=Lr(e.inputs,t),[r,i,a]=Ur(e,n);return Hr(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),Kr,qr,Jr,Yr,Xr=a(()=>{"use strict";Oe(),F(),R(),B(),J(),Kr=(e,t)=>{if(!e||e.length!==5)throw Error(`BatchNormalization requires 5 inputs`);let n=(e,t,n)=>{let r=t.length;if(r!==e.length)throw Error(`${n}: num dimensions != ${r}`);t.forEach((t,r)=>{if(t!==e[r])throw Error(`${n}: dim[${r}] do not match`)})};if(e[0].dims.length>1){let r=t.format===`NHWC`?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,`Invalid input scale`),n(e[2].dims,r,`Invalid input B`),n(e[3].dims,r,`Invalid input mean`),n(e[4].dims,r,`Invalid input var`)}else n(e[1].dims,[1],`Invalid input scale`),n(e[2].dims,[1],`Invalid input B`),n(e[3].dims,[1],`Invalid input mean`),n(e[4].dims,[1],`Invalid input var`)},qr=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?W(a[a.length-1]):1,s=i===`NHWC`&&a.length>1?o:1,c=L.size(a)/o,l=r,u=l?a.length:a,d=K(`x`,e[0].dataType,e[0].dims,o),f=K(`scale`,e[1].dataType,e[1].dims,s),p=K(`bias`,e[2].dataType,e[2].dims,s),m=K(`inputMean`,e[3].dataType,e[3].dims,s),h=K(`inputVar`,e[4].dataType,e[4].dims,s),g=q(`y`,e[0].dataType,u,o),_=()=>{let e=``;if(r)e=`let cOffset = ${a.length===1?`0u`:i===`NHWC`?`outputIndices[${a.length-1}] / ${o}`:`outputIndices[1]`};`;else if(i===`NCHW`)e=`
            ${g.indicesSet(`outputIndices`,`0`,`0`)}
            let cOffset = ${g.indicesToOffset(`outputIndices`)};`;else{e=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let t=1;t<f.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${f.indicesToOffset(`cIndices`)};`}return e};return{name:`BatchNormalization`,shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:l?[`rank`,`type`,`type`,`type`,`type`]:void 0},getShaderSource:e=>`
  const epsilon = ${n};
  ${e.registerUniform(`outputSize`,`u32`).declareVariables(d,f,p,m,h,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${_()}
    let scale = ${f.getByOffset(`cOffset`)};
    let bias = ${p.getByOffset(`cOffset`)};
    let inputMean = ${m.getByOffset(`cOffset`)};
    let inputVar = ${h.getByOffset(`cOffset`)};
    let x = ${d.getByOffset(`global_idx`)};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset(`global_idx`,`value`)}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l?[{type:12,data:c},...U(a)]:[{type:12,data:c}]})}},Jr=e=>z(e),Yr=(e,t)=>{let{inputs:n,outputCount:r}=e,i=Jr({...t,outputCount:r});if(x.webgpu.validateInputContent&&Kr(n,i),t.trainingMode)throw Error(`BatchNormalization trainingMode is not supported yet.`);e.compute(qr(n,i))}}),Zr,Qr,$r,ei=a(()=>{"use strict";R(),J(),Zr=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![320,640,1280].includes(e[0].dims[2]))throw Error(`number of channels should be 320, 640 or 1280`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},Qr=e=>{let t=e[0].dims,n=e[0].dims[2],r=L.size(t)/4,i=e[0].dataType,a=K(`input`,i,t,4),o=K(`bias`,i,[n],4),s=K(`residual`,i,t,4),c=q(`output`,i,t,4);return{name:`BiasAdd`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(a,o,s,c)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset(`global_idx`)}
      + ${o.getByOffset(`global_idx % channels`)} + ${s.getByOffset(`global_idx`)};
    ${c.setByOffset(`global_idx`,`value`)}
  }`}},$r=e=>{Zr(e.inputs),e.compute(Qr(e.inputs))}}),ti,$,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki=a(()=>{"use strict";F(),R(),B(),J(),ti=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),c=``;c=typeof i==`string`?`${i}(a)`:i(`a`);let l=K(`inputData`,n,[s],4),u=q(`outputData`,r,[s],4),d=[{name:`vec_size`,type:`u32`}];return o&&d.push(...o),`
      ${e.registerUniforms(d).declareVariables(l,u)}

  ${a??``}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}

    let a = ${l.getByOffset(`global_idx`)};
    ${u.setByOffset(`global_idx`,c)}
  }`},$=(e,t,n,r,i,a=e.dataType,o,s)=>{let c=[{type:12,data:Math.ceil(L.size(e.dims)/4)}];return o&&c.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:[`type`]},getShaderSource:t=>ti(t,L.size(e.dims),e.dataType,a,n,r,s),getRunData:t=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(L.size(t[0].dims)/64/4)},programUniforms:c})}},ni=e=>{e.compute($(e.inputs[0],`Abs`,`abs`))},ri=e=>{e.compute($(e.inputs[0],`Acos`,`acos`))},ii=e=>{e.compute($(e.inputs[0],`Acosh`,`acosh`))},ai=e=>{e.compute($(e.inputs[0],`Asin`,`asin`))},oi=e=>{e.compute($(e.inputs[0],`Asinh`,`asinh`))},si=e=>{e.compute($(e.inputs[0],`Atan`,`atan`))},ci=e=>{e.compute($(e.inputs[0],`Atanh`,`atanh`))},li=e=>z(e),ui=(e,t)=>{let n;switch(t.to){case 10:n=`vec4<f16>`;break;case 1:n=`vec4<f32>`;break;case 12:n=`vec4<u32>`;break;case 6:n=`vec4<i32>`;break;case 9:n=`vec4<bool>`;break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute($(e.inputs[0],`Cast`,n,void 0,t.cacheKey,t.to))},di=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw Error(`Unsupport data type`)}return z({min:t,max:n})},fi=(e,t)=>{let n=t||di(e.inputs),r=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`Clip`,e=>`clamp(${e}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:`min`,type:r},{name:`max`,type:r}]),{inputs:[0]})},pi=e=>{e.compute($(e.inputs[0],`Ceil`,`ceil`))},mi=e=>{e.compute($(e.inputs[0],`Cos`,`cos`))},hi=e=>{e.compute($(e.inputs[0],`Cosh`,`cosh`))},gi=e=>z(e),_i=(e,t)=>{let n=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`Elu`,e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},vi=(e=`f32`)=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,yi=e=>{let t=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`Erf`,e=>`erf_vf32(${e})`,vi(t)))},bi=e=>{e.compute($(e.inputs[0],`Exp`,`exp`))},xi=e=>{e.compute($(e.inputs[0],`Floor`,`floor`))},Si=e=>{let t=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`Gelu`,e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,vi(t)))},Ci=(e,t)=>{let n=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`LeakyRelu`,e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},wi=e=>{e.compute($(e.inputs[0],`Not`,e=>`!${e}`))},Ti=e=>{e.compute($(e.inputs[0],`Neg`,e=>`-${e}`))},Ei=e=>{e.compute($(e.inputs[0],`Reciprocal`,e=>`1.0/${e}`))},Di=e=>{let t=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`Relu`,e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},Oi=e=>{e.compute($(e.inputs[0],`Sigmoid`,e=>`(1.0 / (1.0 + exp(-${e})))`))},ki=e=>z(e),Ai=(e,t)=>{let n=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`HardSigmoid`,e=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${e} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},ji=e=>{let t=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`HardSwish`,e=>`${e} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${e} + vec4<${t}>(0.5)))`))},Mi=e=>{e.compute($(e.inputs[0],`Sin`,`sin`))},Ni=e=>{e.compute($(e.inputs[0],`Sinh`,`sinh`))},Pi=e=>{e.compute($(e.inputs[0],`Sqrt`,`sqrt`))},Fi=e=>{e.compute($(e.inputs[0],`Tan`,`tan`))},Ii=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Li=e=>{e.compute($(e.inputs[0],`Tanh`,Ii))},Ri=(e=`f32`)=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ii(`v`)};
}
`,zi=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Bi=e=>{let t=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`FastGelu`,zi,Ri(t),void 0,e.inputs[0].dataType))},Vi=(e,t)=>{let n=H(e.inputs[0].dataType);return e.compute($(e.inputs[0],`ThresholdedRelu`,e=>`select(vec4<${n}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},Hi=e=>{e.compute($(e.inputs[0],`Log`,`log`))},Ui=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Wi=e=>`quick_gelu_impl(${e})`,Gi=(e,t)=>{let n=H(e.inputs[0].dataType);e.compute($(e.inputs[0],`QuickGelu`,Wi,Ui(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),qi,Ji,Yi,Xi=a(()=>{"use strict";R(),J(),Ki(),qi=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![2560,5120,10240].includes(e[0].dims[2]))throw Error(`hidden state should be 2560, 5120 or 10240`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},Ji=e=>{let t=e[0].dims.slice();t[2]/=2;let n=K(`input`,e[0].dataType,e[0].dims,4),r=K(`bias`,e[0].dataType,[e[0].dims[2]],4),i=q(`output`,e[0].dataType,t,4),a=L.size(t)/4,o=V(e[0].dataType);return{name:`BiasSplitGelu`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(n,r,i)}

  ${vi(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset(`global_idx`,`valueLeft * geluRight`)}
  }`}},Yi=e=>{qi(e.inputs),e.compute(Ji(e.inputs))}}),Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua=a(()=>{"use strict";F(),R(),J(),Zi=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f,p;typeof s==`string`?f=p=(e,t)=>`${s}((${e}),(${t}))`:typeof s==`function`?f=p=s:(f=s.scalar,p=s.vector);let m=q(`outputData`,u,r.length,4),h=K(`aData`,c,t.length,4),g=K(`bData`,l,n.length,4),_;if(i)if(a){let e=L.size(t)===1,r=L.size(n)===1,i=t.length>0&&t[t.length-1]%4==0,a=n.length>0&&n[n.length-1]%4==0;_=e||r?m.setByOffset(`global_idx`,p(e?`${h.type.value}(${h.getByOffset(`0`)}.x)`:h.getByOffset(`global_idx`),r?`${g.type.value}(${g.getByOffset(`0`)}.x)`:g.getByOffset(`global_idx`))):`
            let outputIndices = ${m.offsetToIndices(`global_idx * 4u`)};
            let offsetA = ${h.broadcastedIndicesToOffset(`outputIndices`,m)};
            let offsetB = ${g.broadcastedIndicesToOffset(`outputIndices`,m)};
            ${m.setByOffset(`global_idx`,p(o||i?h.getByOffset(`offsetA / 4u`):`${h.type.value}(${h.getByOffset(`offsetA / 4u`)}[offsetA % 4u])`,o||a?g.getByOffset(`offsetB / 4u`):`${g.type.value}(${g.getByOffset(`offsetB / 4u`)}[offsetB % 4u])`))}
          `}else _=m.setByOffset(`global_idx`,p(h.getByOffset(`global_idx`),g.getByOffset(`global_idx`)));else{if(!a)throw Error(`no necessary to use scalar implementation for element-wise binary op implementation.`);let e=(e,t,n=``)=>{let r=`aData[indexA${t}][componentA${t}]`,i=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${h.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${n}(${f(r,i)});
          `};_=u===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`outputData[global_idx]`,0)}
            ${e(`outputData[global_idx]`,1)}
            ${e(`outputData[global_idx]`,2)}
            ${e(`outputData[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(h,g,m)}

        ${d??``}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${_}
      }`},Qi=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),c=r.dims.map(Number),l=!L.areEqual(s,c),u=s,d=L.size(s),f=!1,p=!1,m=[l];if(l){let e=zt.calcShape(s,c,!1);if(!e)throw Error(`Can't perform binary op on the given tensors`);u=e.slice(),d=L.size(u);let t=L.size(s)===1,n=L.size(c)===1,r=s.length>0&&s[s.length-1]%4==0,i=c.length>0&&c[c.length-1]%4==0;m.push(t),m.push(n),m.push(r),m.push(i);let a=1;for(let e=1;e<u.length;e++){let t=s[s.length-e];if(t===c[c.length-e])a*=t;else break}a%4==0?(p=!0,f=!0):(t||n||r||i)&&(f=!0)}else f=!0;return m.push(f),{name:e,shaderCache:{hint:t+m.map(e=>e.toString()).join(`_`),inputDependencies:[`rank`,`rank`]},getShaderSource:e=>Zi(e,s,c,u,f,l,p,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(L.size(u)/4)},...U(s,c,u)]})}},$i=(e,t,n,r,i,a)=>{e.compute(Qi(t,i??``,e.inputs[0],e.inputs[1],n,r,a))},ea=e=>{$i(e,`Add`,(e,t)=>`${e}+${t}`)},ta=e=>{$i(e,`Div`,(e,t)=>`${e}/${t}`)},na=e=>{$i(e,`Equal`,{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},ra=e=>{$i(e,`Mul`,(e,t)=>`${e}*${t}`)},ia=e=>{let t=K(`input`,e.inputs[0].dataType,e.inputs[0].dims).type.value;$i(e,`Pow`,{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t===`i32`?`round`:``}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},aa=e=>{$i(e,`Sub`,(e,t)=>`${e}-${t}`)},oa=e=>{$i(e,`Greater`,{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},sa=e=>{$i(e,`Less`,{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},ca=e=>{$i(e,`GreaterOrEqual`,{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},la=e=>{$i(e,`LessOrEqual`,{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),da,fa,pa,ma,ha,ga,_a=a(()=>{"use strict";F(),R(),B(),J(),da=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);let n=e[0],r=n.dataType,i=n.dims.length;e.forEach((e,a)=>{if(a!==0){if(e.dataType!==r)throw Error(`input tensors should be one type`);if(e.dims.length!==i)throw Error(`input tensors should have the same shape`);e.dims.forEach((e,r)=>{if(r!==t&&e!==n.dims[r])throw Error(`non concat dimensions must match`)})}})},fa=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,pa=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset(`global_idx`,e[i].getByIndices(`indices`));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},ma=(e,t,n,r)=>{let i=L.size(n),a=Array(e.length),o=Array(e.length),s=0,c=[],l=[],u=[{type:12,data:i}];for(let n=0;n<e.length;++n)s+=e[n].dims[t],a[n]=s,l.push(e[n].dims.length),o[n]=K(`input${n}`,r,l[n]),c.push(`rank`),u.push({type:12,data:a[n]});for(let t=0;t<e.length;++t)u.push(...U(e[t].dims));u.push(...U(n));let d=q(`output`,r,n.length),f=d.indicesGet(`indices`,t),p=Array.from(Array(a.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(`,`);return{name:`Concat`,shaderCache:{hint:`${t}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:u}),getShaderSource:t=>`

  ${(()=>{t.registerUniform(`outputSize`,`u32`);for(let n=0;n<e.length;n++)t.registerUniform(`sizeInConcatAxis${n}`,`u32`);return t.declareVariables(...o,d)})()}

  ${fa(a.length,p)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

    var indices = ${d.offsetToIndices(`global_idx`)};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${p});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${pa(o,d)}
  }`}},ha=(e,t)=>{let n=e.inputs,r=n[0].dims,i=L.normalizeAxis(t.axis,r.length);da(n,i);let a=r.slice();a[i]=n.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let o=n.filter(e=>L.size(e.dims)>0);e.compute(ma(o,i,a,n[0].dataType),{inputs:o})},ga=e=>z({axis:e.axis})}),va,ya,ba,xa,Sa=a(()=>{"use strict";F(),R(),va=(e,t,n=`f32`)=>{switch(e.activation){case`Relu`:return`value = max(value, ${t}(0.0));`;case`Sigmoid`:return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case`Clip`:return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case`HardSigmoid`:return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case`LeakyRelu`:return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case`Tanh`:return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case``:return``;default:throw Error(`Unsupported activation ${e.activation}`)}},ya=(e,t)=>{e.activation===`Clip`?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation===`HardSigmoid`?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation===`LeakyRelu`&&t.push({type:1,data:e.alpha})},ba=(e,t)=>{e.activation===`Clip`?t.push({name:`clip_max`,type:`f32`},{name:`clip_min`,type:`f32`}):e.activation===`HardSigmoid`?t.push({name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}):e.activation===`LeakyRelu`&&t.push({name:`alpha`,type:`f32`})},xa=e=>{let t=e?.activation||``;if(t===`HardSigmoid`){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}if(t===`Clip`){let[n,r]=e?.activation_params||[Ht,Ut];return{activation:t,clipMax:r,clipMin:n}}if(t===`LeakyRelu`){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ca,wa,Ta=a(()=>{"use strict";Ca=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},wa=e=>`
      ${e?`value = value + getBiasByOutputCoords(coords);`:``}
      `}),Ea,Da=a(()=>{"use strict";Ea=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Oa,ka,Aa=a(()=>{"use strict";F(),R(),J(),Sa(),Oa=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((n,o)=>`
      if (${G(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,G(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join(``)}
`},ka=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o[o.length-2],l=s[s.length-1],u=o[o.length-1],d=W(l),f=W(u),p=W(c),m=L.size(n)/d/p,h=e.length>2,g=r?r.slice(0,-2):n.slice(0,-2),_=[L.size(g),c,l],v=[{type:12,data:m},{type:12,data:c},{type:12,data:l},{type:12,data:u}];return ya(t,v),v.push(...U(g,o,s)),h&&v.push(...U(e[2].dims)),v.push(...U(_)),{name:`MatMulNaive`,shaderCache:{hint:`${t.activation};${d};${f};${p};${i}`,inputDependencies:h?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:v}),getShaderSource:r=>{let a=On(`batch_dims`,e[0].dataType,g.length),c=K(`a`,e[0].dataType,o.length,f),l=K(`b`,e[1].dataType,s.length,d),u=q(`output`,e[0].dataType,_.length,d),m=V(u.type.tensor),v=va(t,u.type.value,m),y=[c,l],b=``;if(h){let t=i?d:1;y.push(K(`bias`,e[2].dataType,e[2].dims.length,t)),b=`${i?`value += bias[col / ${t}];`:`value += ${u.type.value}(bias[row + i]);`}`}let x=[{name:`output_size`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`}];ba(t,x);let S=()=>{let e=`var a_data: ${c.type.value};`;for(let t=0;t<f;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${d}];`;for(let t=0;t<p;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${f}];`;for(let n=0;n<f;n++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${f===1?``:`[${n}]`}), b_data${n}, values[${t}]);
`}return e};return`
  ${r.registerUniforms(x).registerInternalVariables(a).declareVariables(...y,u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${n.length===2?``:`let batch_indices = ${a.offsetToIndices(`batch`)};`}

    var a_indices: ${c.type.indices};
    ${Oa(`a_indices`,c,c.rank-2,a.rank,`batch_indices`)}
    ${c.indicesSet(`a_indices`,c.rank-2,0)}
    ${c.indicesSet(`a_indices`,c.rank-1,0)}
    let a_offset = ${c.indicesToOffset(`a_indices`)};

    var b_indices: ${l.type.indices};
    ${Oa(`b_indices`,l,l.rank-2,a.rank,`batch_indices`)}
    ${l.indicesSet(`b_indices`,l.rank-2,0)}
    ${l.indicesSet(`b_indices`,l.rank-1,0)}
    let b_offset = ${l.indicesToOffset(`b_indices`)};
    var values: array<${u.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${S()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${b}
      ${v}
      let cur_indices = ${u.type.indices}(batch, row + i, col);
      let offset = ${u.indicesToOffset(`cur_indices`)};
      ${u.setByOffset(`offset / ${d}`,`value`)};
    }
  }
  `}}}}),ja,Ma,Na,Pa,Fa,Ia,La,Ra,za=a(()=>{"use strict";F(),R(),J(),Sa(),Aa(),Ta(),ja=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `,Ma=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?``:`let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];`}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached3[i] + acc[i];`}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached.w + acc[i];`}
        }`,Na=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32)=>{let c=t[1]*e[1],l=t[0]*e[0],u=i?c:a,d=i?a:c,f=u/t[0],p=a/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&u%t[0]===0&&a%t[1]===0&&e[0]===4))throw Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${u/f}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?`0`:`i32(globalId.z)`};
  ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
  var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${p};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ja(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?`, batchIndices`:``});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?``:`let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];`}

          ${Ma(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Pa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?`, batchIndices`:``});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?`, batchIndices`:``});
            `,Fa=e=>e?`let ACached = mm_Asub[k][tileRow + innerRow];`:`let ACached = mm_Asub[tileRow + innerRow][k];`,Ia=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32,c=!1)=>{let l=e[1]*t[1],u=e[0]*t[0],d=i?l:a,f=i?a:l;if(f%t[1]!==0||d%t[0]!==0||a%t[1]!==0)throw Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let p=f/t[1],m=d/t[0],h=a/t[1],g=c?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${u};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          ${Pa(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?`, batchIndices`:``});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${p};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Pa(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?`, batchIndices`:``});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Fa(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${d}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${u}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?`0`:`i32(globalId.z)`};
    ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
    let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
    var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${g}
  }
`},La=(e,t,n,r,i=!1)=>{let[a,o,s,c]=r,l=V(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ca(e,l)} {
      var value = ${Ca(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${Oa(`aIndices`,o,o.rank-2,a.rank,`batchIndices`)}
        ${o.indicesSet(`aIndices`,o.rank-2,`u32(row)`)}
        ${o.indicesSet(`aIndices`,o.rank-1,`u32(colIn)`)}
        value = ${o.getByIndices(`aIndices`)};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ca(e,l)} {
      var value = ${Ca(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Oa(`bIndices`,s,s.rank-2,a.rank,`batchIndices`)}
        ${s.indicesSet(`bIndices`,s.rank-2,`u32(row)`)}
        ${s.indicesSet(`bIndices`,s.rank-1,`u32(colIn)`)}
        value = ${s.getByIndices(`bIndices`)};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ca(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?`bias[colIn]`:`${Ca(e,l)}(bias[row])`};`:``}
        ${n}
        ${c.setByIndices(`vec3<u32>(coords)`,`value`)}
      }
    }
    `},Ra=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o.slice(0,-2),l=s.slice(0,-2),u=r?r.slice(0,-2):n.slice(0,-2),d=L.size(u),f=o[o.length-2],p=o[o.length-1],m=s[s.length-1],h=p%4==0&&m%4==0,g=f<=8?[4,1,1]:[4,4,1],_=[8,8,1],v=[Math.ceil(m/_[0]/g[0]),Math.ceil(f/_[1]/g[1]),Math.ceil(d/_[2]/g[2])],y=h?4:1,b=[...c,f,p/y],x=b.length,S=[...l,p,m/y],C=S.length,w=[d,f,m/y],ee=[{type:6,data:f},{type:6,data:m},{type:6,data:p}];ya(t,ee),ee.push(...U(u,b,S));let T=[`rank`,`rank`],E=e.length>2;return E&&(ee.push(...U(e[2].dims)),T.push(`rank`)),ee.push(...U(w)),{name:`MatMul`,shaderCache:{hint:`${g};${t.activation};${h};${i}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:ee}),getShaderSource:n=>{let r=u.length,a=On(`batchDims`,e[0].dataType,r,1),o=V(e[0].dataType),s=K(`a`,e[0].dataType,x,y),c=K(`b`,e[1].dataType,C,y),l=q(`result`,e[0].dataType,w.length,y),d=[s,c];if(E){let t=i?y:1;d.push(K(`bias`,e[2].dataType,e[2].dims.length,t))}let f=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`}];ba(t,f);let p=V(l.type.tensor),m=va(t,l.type.value,p),v=La(y,E,m,[a,s,c,l],i);return`
  ${n.registerUniforms(f).registerInternalVariables(a).declareVariables(...d,l)}
  ${v}
  ${h?Na(g,_,o,a):Ia(g,_,o,a)}
                   `}}}}),Ba,Va,Ha=a(()=>{"use strict";F(),Lt(),J(),Sa(),Ta(),Da(),za(),Ba=(e,t,n,r,i=!1,a,o=4,s=4,c=4,l=`f32`)=>{let u=e=>{switch(e){case 1:return`resData = x[xIndex];`;case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return`resData = x[xIndex / 4];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},d=e=>{switch(e){case 1:return`return w[row * i32(uniforms.w_shape[3]) + colIn];`;case 4:return`return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,p=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?`i32(uniforms.x_shape[1])`:`i32(uniforms.x_shape[2])`,h=e?`i32(uniforms.x_shape[2])`:`i32(uniforms.x_shape[3])`,g=e?`row`:`col`,_=e?`col`:`row`,v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
    let outRow = ${g} / outWidth;
    let outCol = ${g} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${Ca(o,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${u(o)}
    }
    return resData;`,y=e?t&&r?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ca(o,l)}(0.0);`:r&&n?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ca(o,l)}(0.0);`,b=e?r&&n?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${Ca(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${Ca(s,l)}(0.0);`,x=Ca(c,l),S=Ca(e?o:s,l),C=Ca(e?s:o,l),w=va(a,x,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?y:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?b:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${x}) {
      let col = colIn * ${c};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
      ${p}
      ${wa(i)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Va=(e,t,n,r,i,a,o,s,c)=>{let l=t.format===`NHWC`,u=l?e[0].dims[3]:e[0].dims[1],d=n[0],f=l?n[2]:n[3],p=l?n[1]:n[2],m=l?n[3]:n[1],h=l&&(u%4==0||u%3==0)&&m%4==0,g=l?m:f*p,_=l?f*p:m,v=[8,8,1],y=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/v[0]/y[0]),Math.ceil(_/v[1]/y[1]),Math.ceil(d/v[2]/y[2])];I(`verbose`,()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let x=h?l&&u%4!=0?3:4:1,S=v[1]*y[1],C=v[0]*y[0],w=Math.max(v[0]*x,v[1]),ee=r%S===0,T=i%C===0,E=a%w===0,D=h?[x,4,4]:[1,1,1],O=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ya(t,O),O.push(...U(e[0].dims,e[1].dims));let k=[`rank`,`rank`];return o&&(O.push(...U(e[2].dims)),k.push(`rank`)),O.push(...U(n)),{name:`Conv2DMatMul`,shaderCache:{hint:`${t.cacheKey};${x};${h};${ee};${T};${E};${S};${C};${w}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:c?c(n):n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:O}),getShaderSource:r=>{let i=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`},{name:`pad`,type:`i32`,length:2},{name:`stride`,type:`i32`,length:2},{name:`dilation`,type:`i32`,length:2}];ba(t,i);let a=h?4:1,c=V(e[0].dataType),u=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${c}>`:c}) {
        result[flatIndex] = ${h?`vec4<${c}>`:c}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${c}>`:c}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?`/ 4`:``}, value);
      }`,d=[K(`x`,e[0].dataType,e[0].dims.length,x===3?1:x),K(`w`,e[1].dataType,e[1].dims.length,a)],f=q(`result`,e[0].dataType,n.length,a);if(o){let t=K(`bias`,e[2].dataType,e[2].dims.length,a);d.push(t),u+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${c}>`:c} {
          return bias[coords.${l?`w`:`y`}${h?`/ 4`:``}];
        }`}return`
        ${Ea(`uniforms.result_strides`)}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${r.registerUniforms(i).declareVariables(...d,f)}
        ${u}
        ${Ba(l,ee,T,E,o,t,D[0],D[1],D[2],c)}
        ${h?Na(y,v,c,void 0,!l,w):Ia(y,v,c,void 0,!l,w,!1,void 0,s)}`}}}}),Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa,Za=a(()=>{"use strict";F(),Lt(),R(),J(),Sa(),Ta(),Ua=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Wa=e=>typeof e==`number`?[e,e,e]:e,Ga=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ka=(e,t,n,r=1)=>{let i=Ga(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},qa=(e,t,n,r,i)=>{i??=Ka(e,t[0],r[0]);let a=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(a[n]=Math.trunc((e[n]-t[n]+2*i)/r[n]+1));return a},Ja=(e,t,n,r,i,a,o,s,c,l)=>{let u,d,f,p;if(e===`VALID`&&(e=0),typeof e==`number`){u={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=qa([t,n,r,1],[s,c,l],1,[i,a,o],e);d=m[0],f=m[1],p=m[2]}else if(Array.isArray(e)){if(!e.every((e,t,n)=>e===n[0]))throw Error(`Unsupported padding parameter: ${e}`);u={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=qa([t,n,r,1],[s,c,l],1,[i,a,o],e[0]);d=m[0],f=m[1],p=m[2]}else if(e===`SAME_UPPER`){d=Math.ceil(t/i),f=Math.ceil(n/a),p=Math.ceil(r/o);let e=(d-1)*i+s-t,m=(f-1)*a+c-n,h=(p-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(m/2),y=m-v,b=Math.floor(h/2);u={top:v,bottom:y,left:b,right:h-b,front:g,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:u,outDepth:d,outHeight:f,outWidth:p}},Ya=(e,t,n,r,i,a=!1,o=`channelsLast`)=>{let s,c,l,u,d;if(o===`channelsLast`)[s,c,l,u,d]=e;else if(o===`channelsFirst`)[s,d,c,l,u]=e;else throw Error(`Unknown dataFormat ${o}`);let[f,,p,m,h]=t,[g,_,v]=Wa(n),[y,b,x]=Wa(r),S=Ga(p,y),C=Ga(m,b),w=Ga(h,x),{padInfo:ee,outDepth:T,outHeight:E,outWidth:D}=Ja(i,c,l,u,g,_,v,S,C,w),O=a?f*d:f,k=[0,0,0,0,0];return o===`channelsFirst`?k=[s,O,T,E,D]:o===`channelsLast`&&(k=[s,T,E,D,O]),{batchSize:s,dataFormat:o,inDepth:c,inHeight:l,inWidth:u,inChannels:d,outDepth:T,outHeight:E,outWidth:D,outChannels:O,padInfo:ee,strideDepth:g,strideHeight:_,strideWidth:v,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:S,effectiveFilterHeight:C,effectiveFilterWidth:w,dilationDepth:y,dilationHeight:b,dilationWidth:x,inShape:e,outShape:k,filterShape:t}},Xa=(e,t,n,r,i,a)=>{let o=a===`channelsLast`;o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],c={x:n.map((e,t)=>t)},l=[Math.ceil(Ua(c.x.map(e=>n[e]))/s[0]),1,1];I(`verbose`,()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let u=[{type:12,data:L.size(n)},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];ya(t,u),u.push(...U(e[0].dims,e[1].dims));let d=[`rank`,`rank`],f=e.length===3;return f&&(u.push(...U(e[2].dims)),d.push(`rank`)),u.push(...U(n)),{name:`Conv3DNaive`,shaderCache:{hint:`${t.cacheKey};${o};1;${f}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:u}),getShaderSource:a=>{let s=[{name:`output_size`,type:`u32`},{name:`filter_dims`,type:`u32`,length:r.length},{name:`pads`,type:`u32`,length:i.length},{name:`strides`,type:`u32`,length:t.strides.length},{name:`dilations`,type:`u32`,length:t.dilations.length}];ba(t,s);let c=V(e[0].dataType),l=K(`x`,e[0].dataType,e[0].dims.length,1),u=K(`W`,e[1].dataType,e[1].dims.length,1),d=[l,u],p=q(`result`,e[0].dataType,n.length,1),m=``;if(f){let t=K(`bias`,e[2].dataType,e[2].dims.length,1);d.push(t),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${c} {
          return bias[${o?G(`coords`,4,5):G(`coords`,1,5)}];
        }`}let h=Ca(1,c),g=va(t,h,c);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices(`aIndices`)};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${u.getByIndices(`aIndices`)};
            }
          ${a.registerUniforms(s).declareVariables(...d,p)}
          ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
              let coords = ${p.offsetToIndices(`global_idx`)};
              let batch = ${G(`coords`,0,l.rank)};
              let d2 = ${o?G(`coords`,l.rank-1,l.rank):G(`coords`,1,l.rank)};
              let xFRCCorner = vec3<u32>(${o?G(`coords`,1,l.rank):G(`coords`,2,l.rank)},
              ${o?G(`coords`,2,l.rank):G(`coords`,3,l.rank)},
              ${o?G(`coords`,3,l.rank):G(`coords`,4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?G(`uniforms.x_shape`,1,l.rank):G(`uniforms.x_shape`,2,l.rank)};
              let xShapeZ = ${o?G(`uniforms.x_shape`,2,l.rank):G(`uniforms.x_shape`,3,l.rank)};
              let xShapeW = ${o?G(`uniforms.x_shape`,3,l.rank):G(`uniforms.x_shape`,4,l.rank)};
              let xShapeU = ${o?G(`uniforms.x_shape`,4,l.rank):G(`uniforms.x_shape`,1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${f?`value = value + getBiasByOutputCoords(coords)`:``};
              ${g}
              result[global_idx] = f32(value);
          }`}}}}),Qa,$a,eo=a(()=>{"use strict";F(),R(),J(),Sa(),Qa=(e,t,n,r)=>{let i=e.length>2,a=i?`value += b[output_channel];`:``,o=e[0].dims,s=e[1].dims,c=t.format===`NHWC`,l=c?n[3]:n[1],u=l/t.group,d=c&&u>=4?W(l):1,f=L.size(n)/d,p=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:u}];ya(t,p),p.push(...U(o,[s[0],s[1],s[2],s[3]/d]));let m=i?[`rank`,`rank`,`rank`]:[`rank`,`rank`];return p.push(...U([n[0],n[1],n[2],n[3]/d])),{name:`GroupedConv`,shaderCache:{hint:`${t.cacheKey}_${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:p}),getShaderSource:r=>{let l=q(`output`,e[0].dataType,n.length,d),u=V(l.type.tensor),f=va(t,l.type.value,u),p=K(`x`,e[0].dataType,o.length),m=K(`w`,e[1].dataType,s.length,d),h=[p,m];i&&h.push(K(`b`,e[2].dataType,e[2].dims,d));let g=[{name:`output_size`,type:`u32`},{name:`dilations`,type:`u32`,length:t.dilations.length},{name:`strides`,type:`u32`,length:2},{name:`pads`,type:`u32`,length:2},{name:`output_channels_per_group`,type:`u32`}];ba(t,g);let _=c?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${p.get(`batch`,`xHeight`,`xWidth`,`input_channel`)};
            let wVal = ${m.get(`wHeight`,`wWidth`,`wInChannel`,`output_channel`)};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${p.get(`batch`,`input_channel`,`xHeight`,`xWidth`)};
            let wVal = ${m.get(`output_channel`,`wInChannel`,`wHeight`,`wWidth`)};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${r.registerUniforms(g).declareVariables(...h,l)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let outputIndices = ${l.offsetToIndices(`global_idx`)};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${c?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${c?1:2}], outputIndices[${c?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${c?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${_}
    ${a}
    ${f}
    ${l.setByOffset(`global_idx`,`value`)}
  }`}}},$a=(e,t,n,r)=>{let i=e.length>2,a=W(n[3]),o=W(n[2]),s=L.size(n)/a/o,c=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],u=[n[0],n[1],n[2],n[3]/a],d=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ya(t,d),d.push(...U(c,l,u));let f=(o-1)*t.strides[1]+l[1];return{name:`GroupedConv-Vectorize`,shaderCache:{hint:`${t.cacheKey};${a};${o};${f};${l[0]};${l[1]}`,inputDependencies:i?[`rank`,`rank`,`type`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:n=>{let r=q(`output`,e[0].dataType,u.length,a),s=V(r.type.tensor),d=va(t,r.type.value,s),p=K(`x`,e[0].dataType,c.length,a),m=K(`w`,e[1].dataType,l.length,a),h=[p,m];i&&h.push(K(`b`,e[2].dataType,e[2].dims,a));let g=i?`value += b[output_channel];`:``,_=[{name:`output_size`,type:`u32`},{name:`strides`,type:`i32`,length:2},{name:`pads`,type:`i32`,length:2}];return ba(t,_),`
  ${n.registerUniforms(_).declareVariables(...h,r)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${p.type.value}, ${f}>;
    var values: array<${r.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${p.get(`batch`,`u32(x_height)`,`u32(x_width)`,`input_channel`)};
          } else {
            x_vals[i] = ${p.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${m.get(`w_height`,`w_width`,`0`,`output_channel`)};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${g}
      ${d}
      ${r.set(`batch`,`row`,`col + i`,`output_channel`,`value`)};
    }
  }`}}}}),to,no,ro,io,ao,oo,so,co,lo,uo=a(()=>{"use strict";R(),Ha(),Za(),za(),eo(),Sa(),Aa(),Bn(),to=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),c=s.length,l=t[0],u=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),d=s.map((e,t)=>e+r[t]+r[t+c]).map((e,t)=>Math.floor((e-u[t]+i[t])/i[t]));return d.splice(0,0,o),d.splice(a?3:1,0,l),d},no=[2,3,1,0],ro=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length>5)throw Error(`greater than 5D is not supported`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw Error(`invalid bias`);let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`)},io=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let e=2;e<t[1].dims.length;++e)n[e-2]===0&&(n[e-2]=t[1].dims[e]);let r=e.pads.slice();Bt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format===`NHWC`,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},ao=e=>{let t=xa(e),n=e.format;return{autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],format:n,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},oo=(e,t,n,r)=>{let i=n.format===`NHWC`,a=to(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let o=[t[0]];if(i){let r=e.kernelCustomData.wT??e.compute(Ln(t[1],no),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),o.push(r)}else o.push(t[1]);t.length===3&&o.push(t[2]),!e.adapterInfo.isArchitecture(`ampere`)&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute($a(o,n,a,r),{inputs:o}):e.compute(Qa(o,n,a,r),{inputs:o});return}let o=t.length===3,s=t[0].dims[i?1:2],c=t[0].dims[i?2:3],l=t[0].dims[i?3:1],u=t[1].dims[2],d=t[1].dims[3],f=a[i?1:2],p=a[i?2:3],m=a[i?3:1],h=i&&u===s&&d===c&&n.pads[0]===0&&n.pads[1]===0;if(h||u===1&&d===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let u=a[0],d,g,_,v=[];if(i){let r=e.kernelCustomData.wT??e.compute(Ln(t[1],no),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),h){let e=s*c*l;d=t[0].reshape([1,u,e]),g=r.reshape([1,e,m]),_=[1,u,m]}else d=t[0].reshape([u,s*c,l]),g=r.reshape([1,l,m]),_=[u,f*p,m];v.push(d),v.push(g)}else d=t[0].reshape([u,l,s*c]),g=t[1].reshape([1,m,l]),_=[u,m,f*p],v.push(g),v.push(d);o&&v.push(t[2]);let y=_[2],b=v[0].dims[v[0].dims.length-1];y<8&&b<8?e.compute(ka(v,n,a,_,i,r),{inputs:v}):e.compute(Ra(v,n,a,_,i,r),{inputs:v});return}let g=e.kernelCustomData.wT??e.compute(Ln(t[1],no),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=g);let _=[t[0],g];o&&_.push(t[2]);let v=i?f*p:m,y=i?m:f*p,b=u*d*l;e.compute(Va(_,n,a,v,y,b,o,!0,r),{inputs:_})},so=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),c=io({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);oo(e,r,c,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},co=(e,t,n)=>{let r=n.format===`NHWC`?`channelsLast`:`channelsFirst`,i=io(n,t),a=n.autoPad===`NOTSET`?n.pads:n.autoPad,o=Ya(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Xa(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},lo=(e,t)=>{if(ro(e.inputs,t),e.inputs[0].dims.length===3)so(e,t);else if(e.inputs[0].dims.length===5)co(e,e.inputs,t);else{let n=io(t,e.inputs);oo(e,e.inputs,n)}}}),fo,po=a(()=>{"use strict";F(),Lt(),R(),J(),fo=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format===`NHWC`,o=t.group,s=e[1].dims,c=s[2]/o,l=s[3],u=a?W(c):1,d=a&&l===1&&c>=4,f=d?Math.floor(c/4)*4:Math.floor(c/u)*u,p=c-f,m=a?W(l):1,h=a?l===1?u:m:1,g=L.size(i)/m,_=[Math.ceil(g/64),1,1];I(`verbose`,()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let v=[`rank`,`rank`],y=[t.strides[0],t.strides[1]],b=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],x=[t.dilations[0],t.dilations[1]],S=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],C=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],w=[{type:12,data:g},{type:12,data:y},{type:12,data:b},{type:12,data:x},{type:12,data:S},{type:6,data:C},{type:12,data:f},{type:12,data:c},{type:12,data:l},...U(e[0].dims,e[1].dims)];return r&&(w.push(...U(e[2].dims)),v.push(`rank`)),w.push(...U(i)),{name:`ConvTranspose2D`,shaderCache:{hint:`${t.cacheKey};${u}${h}${m}${d}${p}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:t=>{let n=[{name:`output_size`,type:`u32`},{name:`strides`,type:`u32`,length:y.length},{name:`filter_dims`,type:`u32`,length:b.length},{name:`dilations`,type:`u32`,length:b.length},{name:`effective_filter_dims`,type:`u32`,length:S.length},{name:`pads`,type:`i32`,length:C.length},{name:`input_channels_per_group_int`,type:`u32`},{name:`input_channels_per_group`,type:`u32`},{name:`output_channels_per_group`,type:`u32`}],o=V(e[0].dataType),s=a?1:2,c=a?2:3,l=a?3:1,f=K(`W`,e[1].dataType,e[1].dims.length,h),g=K(`Dy`,e[0].dataType,e[0].dims.length,u),_=[g,f];r&&_.push(K(`bias`,e[2].dataType,[i[l]].length,m));let v=q(`result`,e[0].dataType,i.length,m),x=`
            let outputIndices = ${v.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${v.indicesGet(`outputIndices`,0)};
            let d1 = ${v.indicesGet(`outputIndices`,l)};
            let r = ${v.indicesGet(`outputIndices`,s)};
            let c = ${v.indicesGet(`outputIndices`,c)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${v.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${s}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${c}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${d?`
                var x_offset = ${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u};
                var w_offset = ${f.indicesToOffset(`${f.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:``}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${d?4:u}) {
                  ${(()=>{let e=``;if(d)u===4?e+=`
        let xValue = ${g.getByOffset(`x_offset`)};
        let wValue = ${f.getByOffset(`w_offset`)};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:u===2?e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}));
          x_offset += 2u;
          w_offset += 2u;`:u===1&&(e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}, ${g.getByOffset(`x_offset + 2u`)}, ${g.getByOffset(`x_offset + 3u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}, ${f.getByOffset(`w_offset + 2u`)}, ${f.getByOffset(`w_offset + 3u`)}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${a?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u}`):g.get(`batch`,`inputChannel`,`idyR`,`idyC`)};
        `,u===1)e+=`
          let w_offset = ${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${f.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<u;t++)e+=`
            let wValue${t} = ${f.getByOffset(`${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${d?4:u};
                }
                ${(()=>{if(p===0)return``;if(!d)throw Error(`packInputAs4 ${d} is not true.`);let e=``;if(u===1){e+=`dotProd = dotProd`;for(let t=0;t<p;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${f.getByOffset(`w_offset + ${t}`)}`;e+=`;`}else if(u===2){if(p!==2)throw Error(`Invalid inputChannelsRemainder ${p}.`);e+=`
          let xValue = ${g.getByOffset(`x_offset`)};
          let wValue = ${f.getByOffset(`w_offset`)};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${m}]`:``};
            ${v.setByOffset(`global_idx`,`value`)};
          `;return`
    ${t.registerUniforms(n).declareVariables(..._,v)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)};
    ${x}}`}}}}),mo,ho,go,_o,vo,yo,bo,xo,So,Co=a(()=>{"use strict";po(),Sa(),Bn(),mo=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,ho=(e,t,n,r,i)=>{let a=Math.floor(e/2);t===`SAME_UPPER`?(n[r]=a,n[i]=e-a):t===`SAME_LOWER`&&(n[r]=e-a,n[i]=a)},go=(e,t,n,r,i,a,o,s,c,l)=>{let u=e.length-2,d=l.length===0;c.length<u&&c.push(...Array(u-c.length).fill(0));let f=e[0],p=t[s?3:1]*i;for(let i=0,f=e.length-u-+!!s;i<u;++i,++f){let s=e[f],p=d?s*o[i]:l[i],m=mo(s,o[i],a[i],t[f],n[i],p);ho(m,r,a,i,i+u),d&&l.push(o[i]*(s-1)+c[i]+(t[f]-1)*n[i]+1-a[i]-a[i+u])}l.splice(0,0,f),l.splice(s?3:1,0,p)},_o=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((e,t)=>e*t,1)===0){n.length=0;for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e])}let r=e.format===`NHWC`;n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,c=e.dilations.slice();if(c.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;c=Array(e).fill(1)}let l=e.strides.slice();if(l.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;l=Array(e).fill(1)}go(s,n,c,e.autoPad,e.group,i,l,r,o,a);let u=Object.assign({},e);return Object.assign(u,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:c,strides:l}),u},vo=e=>{let t=xa(e),n=e.format,r=[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][typeof e.autoPad>`u`?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,c=e.strides,l=e.wIsConst();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:s,strides:c,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},yo=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length!==4&&e[0].dims.length!==3)throw Error(`currently only support 2-dimensional conv`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[0])throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw Error(`invalid bias`);let r=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==r*2)throw Error(`pads should be ${r*2}D`);if(t.outputPadding.length!==r&&t.outputPadding.length!==0)throw Error(`output_padding should be ${r}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`);if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw Error(`invalid output shape`)},bo=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(Ln(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(fo(a,n,r),{inputs:a})},xo=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let c=t.outputPadding;c=[0].concat(c);let l=_o({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:c},r);bo(e,r,l,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},So=(e,t)=>{if(yo(e.inputs,t),e.inputs[0].dims.length===3)xo(e,t);else{let n=_o(t,e.inputs);bo(e,e.inputs,n)}}}),wo,To,Eo,Do=a(()=>{"use strict";F(),R(),B(),J(),wo=(e,t,n,r)=>{let i=L.size(t),a=t.length,o=K(`input`,e,a),s=q(`output`,e,a),c=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=L.normalizeAxis(c,a);return{name:`CumSum`,shaderCache:{hint:r.cacheKey,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:l},...U(t,t)]}),getShaderSource:e=>{let t=` i32(${o.indicesGet(`inputIndices`,`uniforms.axis`)}) `,n=G(`uniforms.input_shape`,`uniforms.axis`,a),i=r.reverse?t+(r.exclusive?` + 1`:``):`0`,c=r.reverse?n:t+(r.exclusive?``:` + 1`);return`
                ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axis`,`u32`).declareVariables(o,s)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
                  var inputIndices = ${s.offsetToIndices(`global_idx`)};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${c};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet(`inputIndices`,`uniforms.axis`,`u32(i)`)};
                    sum = sum + ${o.getByIndices(`inputIndices`)};
                  }
                  ${s.setByOffset(`global_idx`,`sum`)};
                }`}}},To=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(wo(r,n,i,t),{inputs:[0]})},Eo=e=>{let t=e.exclusive===1,n=e.reverse===1;return z({exclusive:t,reverse:n})}}),Oo,ko,Ao,jo,Mo,No=a(()=>{"use strict";F(),R(),B(),J(),Oo=e=>{if(!e||e.length!==1)throw Error(`DepthToSpace requires 1 input.`);if(e[0].dims.length!==4)throw Error(`DepthToSpace requires 4D input.`)},ko=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let r=0;r<t;++r)i.push(n.indicesSet(`a`,e[r],`i[${r}]`));return i.push(`return a;}`),i.join(`
`)},Ao=(e,t)=>{let n,r,i,a,o,s,c=t.format===`NHWC`,l=t.blocksize,u=t.mode===`DCR`;c?([n,r,i,a]=e.dims,o=u?[n,r,i,l,l,a/l**2]:[n,r,i,a/l**2,l,l],s=u?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=u?[n,l,l,a/l**2,r,i]:[n,a/l**2,l,l,r,i],s=u?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=e.reshape(o),f=d.dims.length,p=e.dataType,m=K(`a`,p,f),h=q(`output`,p,f);return{name:`DepthToSpace`,shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:[`rank`]},getRunData:e=>{let t=c?[n,r*l,i*l,a/l**2]:[n,a/l**2,r*l,i*l],o=L.size(t),u=d.dims,f=L.sortBasedOnPerm(u,s);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...U(u,f)]}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(m,h)}

  ${ko(s,f,m,h)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${h.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${h.setByOffset(`global_idx`,m.getByIndices(`aIndices`))}
  }`}},jo=(e,t)=>{Oo(e.inputs),e.compute(Ao(e.inputs[0],t))},Mo=e=>z({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Po,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo=a(()=>{"use strict";F(),R(),B(),J(),Po=256,Fo=512,Io=2*Math.PI,Lo=e=>{let t=[],n=e;for(let e of[4,2,3,5])for(;n%e===0;)t.push(e),n/=e;return n===1?t:void 0},Ro=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},zo=(e,t,n,r,i)=>{let a=n/e,o=Fo-r,s=e=>`smem[${o}u + base + ${e*t}u]`,c=`  for (var t = local_idx; t < ${a}u; t += ${Po}u) {
`;c+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,c+=`    var leg: array<vec2<f32>, 5>;
`;for(let n=0;n<e;n++){let o=`${r}u + t + ${n*a}u`;if(n===0)c+=`    leg[0] = smem[${o}];
`;else{let r=i*Io*n/(e*t);c+=`    { let a = ${Ro(r)} * angleUnit; leg[${n}] = cmul(smem[${o}], vec2<f32>(cos(a), sin(a))); }
`}}if(c+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)c+=`    ${s(0)} = leg[0] + leg[1];
    ${s(1)} = leg[0] - leg[1];
`;else if(e===4){let e=i<0?`vec2<f32>(oddDiff.y, -oddDiff.x)`:`vec2<f32>(-oddDiff.y, oddDiff.x)`;c+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,c+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,c+=`    let oddRot = ${e};
`,c+=`    ${s(0)} = evenSum + oddSum;
    ${s(1)} = evenDiff + oddRot;
`,c+=`    ${s(2)} = evenSum - oddSum;
    ${s(3)} = evenDiff - oddRot;
`}else for(let t=0;t<e;t++){let n=[`leg[0]`];for(let r=1;r<e;r++){let a=i*Io*(r*t)/e,o=Ro(Math.cos(a)),s=Ro(Math.sin(a));n.push(`vec2<f32>(leg[${r}].x*${o} - leg[${r}].y*${s}, leg[${r}].x*${s} + leg[${r}].y*${o})`)}c+=`    ${s(t)} = ${n.join(` + `)};
`}return`${c}  }
  workgroupBarrier();
`},Bo=(e,t,n)=>{let r=``,i=1,a=0;for(let o of e)r+=zo(o,i,t,a,n),i*=o,a=Fo-a;return{code:r,resultOffset:a}},Vo=(e,t,n,r,i)=>{let a=e.dims,o=a.length,s=a[o-1],c=a[t],l=n&&r?(c-1)*2:c;i!==void 0&&(l=i);let u=n&&r?1:2,d=r&&!n?Math.floor(l/2)+1:l,f=a.slice();f[t]=d,f[o-1]=u;let p=1;for(let e=t+1;e<o-1;e++)p*=a[e];let m=L.size(a)/s/c;return{dataType:e.dataType,outputDims:f,length:l,signalLength:c,inner:p,batch:m,inputComponents:s,outputComponents:u,outputLength:d,inverse:n,onesided:r}},Ho=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(`;`),Uo=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],Wo=(e,t,n)=>e.registerUniform(`batch`,`u32`).registerUniform(`signalLength`,`u32`).registerUniform(`inner`,`u32`).registerUniform(`outputLength`,`u32`).declareVariables(t,n),Go=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:o}=e,s=H(t),c=a?1:-1,l=a?1/n:1,u=Lo(n);return{name:`DFT`,shaderCache:{hint:Ho(e,`fft`),inputDependencies:[`type`]},getShaderSource:e=>{let d=K(`x`,t,[1]),f=q(`y`,t,[1]),p=e=>{let t=`inBase + (${e}) * uniforms.inner * ${r}u`;return`vec2<f32>(${`f32(${d.getByOffset(t)})`}, ${r===2?`f32(${d.getByOffset(`${t} + 1u`)})`:`0.0`})`},m;if(a&&o){let e=Math.floor(n/2)+1,t=n%2==0?`select(provided, provided - 1u, provided == ${e}u)`:`provided`;m=`
    let provided = min(uniforms.signalLength, ${e}u);
    for (var i = local_idx; i < ${n}u; i += ${Po}u) {
      if (i < provided) { smem[i] = ${p(`i`)}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${t}; k += ${Po}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else m=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${Po}u) {
      if (i < loadCount) { smem[i] = ${p(`i`)}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:h,resultOffset:g}=Bo(u,n,c),_=l===1?`smem[${g}u + i]`:`smem[${g}u + i] * ${Ro(l)}`,v=i===2?f.setByOffset(`off + 1u`,`${s}(v.y)`):``;return`
  ${Wo(e,d,f)}
  var<workgroup> smem: array<vec2<f32>, ${2*Fo}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${e.mainStart(Po)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    ${m}
${h}    for (var i = local_idx; i < uniforms.outputLength; i += ${Po}u) {
      let v = ${_};
      let off = outBase + i * uniforms.inner * ${i}u;
      ${f.setByOffset(`off`,`${s}(v.x)`)}
      ${v}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Uo(e),dispatchGroup:{x:e.batch}})}},Ko=e=>{let{dataType:t,length:n,inputComponents:r,outputComponents:i,inverse:a,onesided:o}=e,s=H(t),c=a?1:-1,l=a?1/n:1;return{name:`DFT`,shaderCache:{hint:Ho(e,`direct`),inputDependencies:[`type`]},getShaderSource:e=>{let u=K(`x`,t,[1]),d=q(`y`,t,[1]),f=e=>{let t=`inBase + (${e}) * uniforms.inner * ${r}u`;return`vec2<f32>(${`f32(${u.getByOffset(t)})`}, ${r===2?`f32(${u.getByOffset(`${t} + 1u`)})`:`0.0`})`},p=a&&o?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${f(`k`)}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${f(`m`)};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${f(`n`)}; }
    return vec2<f32>(0.0, 0.0);
  }`,m=`
      let angle = ${Ro(c*Io)} * f32(knMod) / ${Ro(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,h=i===2?d.setByOffset(`off + 1u`,`${s}(v.y)`):``,g=l===1?`acc`:`acc * ${Ro(l)}`;return`
  ${Wo(e,u,d)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${p}
  ${e.mainStart(Po)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${r}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${Po}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${m}
      }
      let v = ${g};
      let off = outBase + k * uniforms.inner * ${i}u;
      ${d.setByOffset(`off`,`${s}(v.x)`)}
      ${h}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Uo(e),dispatchGroup:{x:e.batch}})}},qo=e=>{if(!e||e.dataType===0)return;if(L.size(e.dims)!==1)throw Error(`DFT optional scalar inputs must have exactly 1 element.`);if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw Error(`DFT optional scalar inputs are out of JavaScript safe integer range.`);return t},Jo=e=>{if(!e||e.length<1)throw Error(`DFT requires at least 1 input.`);let t=e[0].dims;if(t.length<2)throw Error(`DFT input must have at least 2 dimensions.`);let n=t[t.length-1];if(n!==1&&n!==2)throw Error(`DFT input's innermost dimension must be 1 (real) or 2 (complex).`)},Yo=(e,t)=>{Jo(e.inputs);let n=e.inputs[0],r=n.dims.length,i=t.inverse!==0,a=t.onesided!==0,o=qo(e.inputs[1]);if(o!==void 0&&o<=0)throw Error(`dft_length must be greater than zero.`);let s=L.normalizeAxis(qo(e.inputs[2])??t.axis,r);if(s===r-1)throw Error(`DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.`);if(i&&a&&n.dims[r-1]!==2)throw Error(`Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).`);let c=Vo(n,s,i,a,o);if(c.length<=0)throw Error(`Invalid DFT length: ${c.length}`);let l=c.length<=Fo&&Lo(c.length)!==void 0?Go(c):Ko(c);e.compute(l,{inputs:[0]})},Xo=e=>z({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Qo,$o,es,ts,ns,rs,is,as,os,ss,cs,ls=a(()=>{"use strict";F(),R(),B(),J(),Qo=`[a-zA-Z]|\\.\\.\\.`,$o=`(`+Qo+`)+`,es=`^`+$o+`$`,ts=`(`+$o+`,)*`+$o,ns=`^`+ts+`$`,rs=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},is=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[n,r]=t.includes(`->`)?t.split(`->`,2):[t,``];if(!n.match(RegExp(ns)))throw Error(`Invalid LHS term`);if(n.split(`,`).forEach((t,n)=>{let r=e[n].dims.slice();if(!t.match(RegExp(es)))throw Error(`Invalid LHS term`);let i=this.processTerm(t,!0,r,n);this.lhs.push(i)}),r===``)r+=[...this.symbolToInfo.entries()].filter(([e,t])=>t.count===1||e===`...`).map(([e])=>e).join(``);else if(!r.match(RegExp($o)))throw Error(`Invalid RHS`);r.match(RegExp(Qo,`g`))?.forEach(e=>{if(e===`...`)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(t===void 0)throw Error(`Invalid RHS symbol`);this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw Error(`Dimension mismatch`);r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(es))&&!t&&e!==``)throw Error(`Invalid LHS term`);let c=e.match(RegExp(Qo,`g`)),l=new rs(r);return c?.forEach((e,u)=>{if(e===`...`){if(a)throw Error(`Only one ellipsis is allowed per input term`);a=!0;let e=i-c.length+1;if(e<0)throw Error(`Ellipsis out of bounds`);if(o=n.slice(s,s+e),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error(`Ellipsis dimensions mismatch`)}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error(`Ellipsis must be specified in the LHS`);for(let e=0;e<o.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,u+e),this.addSymbol(t,n[s++],r)}}else l.addSymbol(e,u+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,n[s++],r)}),l}},as=e=>e+`_max`,os=(e,t,n,r)=>{let i=e.map(e=>e.length).map((e,n)=>K(`input${n}`,t,e)),a=L.size(r),o=q(`output`,t,r.length),s=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e));return{name:`Einsum`,shaderCache:{hint:n.equation,inputDependencies:e.map(()=>`rank`)},getRunData:()=>{let i=s.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));i.push({type:12,data:a});let o=e.map((e,t)=>[...U(e)]).reduce((e,t)=>e.concat(t),i);return o.push(...U(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o}},getShaderSource:e=>{let t=[],r=[],a=[],c=[],l=[],u=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,s)=>{if(n.rhs.symbolToIndices.has(s)){let r=n.rhs.symbolToIndices.get(s)?.[0];r!==void 0&&n.lhs.forEach((n,a)=>{if(e.inputIndices.includes(a)){let e=n.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{t.push(`${i[a].indicesSet(`input${a}Indices`,e,o.indicesGet(`outputIndices`,r))}`)})}})}else n.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{r.push(`${i[n].indicesSet(`input${n}Indices`,e,`${s}`)}`)}),l.push(`prod *= ${i[n].getByIndices(`input${n}Indices`)};`)}}),a.push(`for(var ${s}: u32 = 0; ${s} < uniforms.${as(s)}; ${s}++) {`),c.push(`}`)});let d=u?[...t,`let sum = ${i.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(` * `)};`]:[...t,`var sum = 0.0;`,...a,...r,`var prod = 1.0;`,...l,`sum += prod;`,...c];return`
            ${e.registerUniforms(s.map(e=>({name:`${as(e)}`,type:`u32`}))).registerUniform(`outputSize`,`u32`).declareVariables(...i,o)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
            var outputIndices = ${o.offsetToIndices(`global_idx`)};
            ${i.map((e,t)=>`var input${t}Indices: ${i[t].type.indices};`).join(`
`)}
            ${d.join(`
`)};
            ${o.setByOffset(`global_idx`,`sum`)};
          }`}}},ss=(e,t)=>{let n=new is(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((e,t)=>e.dims);e.compute(os(i,e.inputs[0].dataType,n,r))},cs=e=>{let t=e.equation.replace(/\s+/g,``);return z({equation:t})}}),us,ds,fs,ps,ms,hs=a(()=>{"use strict";F(),R(),J(),us=e=>{if(!e||e.length!==2)throw Error(`Expand requires 2 input.`);let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw Error(`Expand requires shape to be broadcastable to input`)},ds=(e,t)=>{let n=e.length-t.length,r=[];for(let t=0;t<n;++t)r.push(e[t]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},fs=(e,t)=>e.length>t.length?ds(e,t):ds(t,e),ps=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=fs(t,n),i=e[0].dataType,a=i===9||L.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4==0?4:1,s=a||r.length>0&&r[r.length-1]%4==0?4:1,c=Math.ceil(L.size(r)/s),l=e=>{let n=K(`input`,i,t.length,o),a=q(`output`,i,r.length,s),c;if(i===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${a.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${n.broadcastedIndicesToOffset(`outputIndices${t}`,a)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;c=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${e(`data`,0,`u32`)}
        ${e(`data`,1,`u32`)}
        ${e(`data`,2,`u32`)}
        ${e(`data`,3,`u32`)}
        ${a.setByOffset(`global_idx`,`data`)}
      }`}else c=`
        let outputIndices = ${a.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${n.broadcastedIndicesToOffset(`outputIndices`,a)};
        let data = ${a.type.value}(${n.getByOffset(`inputOffset / ${o}`)});
        ${a.setByOffset(`global_idx`,`data`)}
      }`;return`
    ${e.registerUniform(`vec_size`,`u32`).declareVariables(n,a)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
    ${c}`},u=[{type:12,data:c},...U(t,r)];return{name:`Expand`,shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:[`rank`]},getShaderSource:l,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:u})}},ms=e=>{us(e.inputs),e.compute(ps(e.inputs),{inputs:[0]})}}),gs,_s,vs=a(()=>{"use strict";F(),R(),J(),Ki(),gs=e=>{let t=e[0].dataType,n=L.size(e[0].dims),r=L.size(e[1].dims),i=r%4==0;return{name:`FastGeluWithBias`,shaderCache:{hint:`${i}`,inputDependencies:[`type`,`type`]},getShaderSource:e=>{let n=K(`x`,t,[1],4),r=K(`bias`,t,[1],4),a=q(`y`,t,[1],4),o=[{name:`output_vec_size`,type:`u32`},{name:`bias_size`,type:`u32`}],s=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${r.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,c=i?`
      let bias = ${r.getByOffset(`global_idx % (uniforms.bias_size / 4)`)};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${n.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(o).declareVariables(n,r,a)}

    ${Ri(H(t))}

    ${e.mainStart(xn)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_vec_size`)}

      let x = ${n.getByOffset(`global_idx`)};
      ${c}
      let x_in = x + bias;
      ${a.setByOffset(`global_idx`,zi(`x_in`))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/xn/4)}})}},_s=e=>{e.inputs.length<2||L.size(e.inputs[1].dims)===0?Bi(e):e.compute(gs(e.inputs))}}),ys,bs,xs,Ss,Cs=a(()=>{"use strict";F(),R(),B(),J(),ys=e=>{if(!e||e.length!==2)throw Error(`Gather requires 2 inputs.`)},bs=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=L.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],c=e[0].dataType===9?4:1,l=Math.ceil(L.size(o)/c),u=[{type:12,data:l},{type:6,data:s},{type:12,data:a},...U(e[0].dims,e[1].dims,o)];return{name:`Gather`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:t=>{let n=K(`data`,e[0].dataType,e[0].dims.length,c),s=K(`inputIndices`,e[1].dataType,e[1].dims.length),l=q(`output`,e[0].dataType,o.length,c),u=e=>{let t=r.length,c=`var indicesIndices${e}  = ${s.type.indices}(0);`;for(let n=0;n<t;n++)c+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${o.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;c+=`
          var idx${e} = ${s.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${n.type.indices};
        `;for(let n=0,r=0;n<i;n++)n===a?(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,r+=t):(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${o.length>1?`outputIndices${e}[${r}]`:`outputIndices${e}`};`,r++);return c},d;if(e[0].dataType===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${l.offsetToIndices(`outputOffset + ${t}u`)};
          ${u(t)};
          let offset${t} = ${n.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;d=`
        let outputOffset = global_idx * ${c};
        var value = vec4<u32>(0);
        ${e(`value`,0,`u32`)}
        ${e(`value`,1,`u32`)}
        ${e(`value`,2,`u32`)}
        ${e(`value`,3,`u32`)}
        ${l.setByOffset(`global_idx`,`value`)}
      `}else d=`
      let outputIndices = ${l.offsetToIndices(`global_idx`)};
      ${u(``)};
      let value = ${n.getByIndices(`dataIndices`)};
      ${l.setByOffset(`global_idx`,`value`)};
      `;return`
      ${t.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(n,s,l)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        ${d}
      }`}}},xs=e=>z({axis:e.axis}),Ss=(e,t)=>{let n=e.inputs;ys(n),e.compute(bs(e.inputs,t))}}),ws,Ts,Es,Ds=a(()=>{"use strict";F(),R(),J(),ws=(e,t,n,r,i,a,o,s,c)=>{let l=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:c}],u=[a];return l.push(...U(t.dims,u)),e.compute({name:`computeSliceOffsets`,shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:u,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:e=>{let r=[K(`indices_data`,t.dataType,t.dims.length),q(`input_slice_offsets_data`,12,1,1)],a=[{name:`output_size`,type:`u32`},{name:`batch_dims`,type:`u32`},{name:`input_dims`,type:`u32`,length:i.length},{name:`sizes_from_slice_dims_data`,type:`u32`,length:n.length},{name:`num_slices_per_batch`,type:`u32`},{name:`input_batch_stride`,type:`u32`},{name:`num_slice_dims`,type:`u32`}];return`
  ${e.registerUniforms(a).declareVariables(...r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?`index += i32(uniforms.input_dims);`:`index += i32(uniforms.input_dims[input_dim_idx]);`}
      }
      ${n.length===1?`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);`:`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);`}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[t],outputs:[-1]})[0]},Ts=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=L.sizeToDimension(a,a.length-1),c=L.sizeFromDimension(r,t.batchDims+o),l=L.sizeToDimension(r,t.batchDims),u=L.sizeFromDimension(r,t.batchDims),d=s/l,f=Array(o),p=c;for(let e=0;e<o;++e)f[o-1-e]=p,p*=r[t.batchDims+o-1-e];let m=ws(e,n[1],f,t.batchDims,r,s,d,u,o),h=t.batchDims+o;if(h>r.length)throw Error(`last dimension of indices must not be larger than rank of input tensor`);let g=a.slice(0,-1).concat(r.slice(h)),_=L.size(g),v=[{type:12,data:_},{type:12,data:c},...U(n[0].dims,m.dims,g)];e.compute({name:`GatherND`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:g,dataType:i}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:e=>{let t=K(`data`,n[0].dataType,n[0].dims.length),r=K(`slice_offsets`,12,m.dims.length),i=q(`output`,n[0].dataType,g.length);return`
          ${e.registerUniform(`output_size`,`u32`).registerUniform(`slice_size`,`u32`).declareVariables(t,r,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[n[0],m]})},Es=e=>({batchDims:e.batch_dims,cacheKey:``})}),Os,ks,As,js,Ms=a(()=>{"use strict";F(),R(),B(),J(),Os=(e,t)=>{if(e.length<3||e.length>4)throw Error(`GatherBlockQuantized requires 3 or 4 inputs.`);let n=L.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===n?Math.ceil(e/r)===a.dims[t]:e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.`);if(o){if(o.dataType!==i.dataType)throw Error(`Zero point must have the same data type as the input tensor.`);if(o.dims.length!==a.dims.length||!o.dims.map((e,t)=>e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.`)}},ks=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=L.normalizeAxis(t.gatherAxis,i),o=L.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let c=L.size(s),l=e[2].dataType,u=e[0].dataType===22,d=[{type:12,data:c},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...U(...e.map((e,t)=>e.dims),s)];return{name:`GatherBlockQuantized`,shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>t!==1).map(e=>e.dims.join(`_`)).join(`;`)}`,inputDependencies:Array.from({length:e.length},(e,t)=>`rank`)},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d}),getShaderSource:t=>{let i=K(`data`,e[0].dataType,e[0].dims.length),o=K(`inputIndices`,e[1].dataType,e[1].dims.length),c=K(`scales`,e[2].dataType,e[2].dims.length),d=e.length>3?K(`zeroPoint`,e[3].dataType,e[3].dims.length):void 0,f=q(`output`,l,s.length),p=[i,o,c];return d&&p.push(d),`
        ${t.registerUniforms([{name:`output_size`,type:`u32`},{name:`quantize_axis`,type:`u32`},{name:`gather_axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...p,f)}
        ${t.mainStart()}
        let output_indices = ${f.offsetToIndices(`global_idx`)};
        var indices_indices = ${o.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${f.indicesGet(`output_indices`,`uniforms.gather_axis + i`)};
            ${o.indicesSet(`indices_indices`,`i`,`index`)};
          }`:`indices_indices = ${f.indicesGet(`output_indices`,`uniforms.gather_axis`)};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${f.indicesGet(`output_indices`,`i`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        var index_from_indices = ${o.getByIndices(`indices_indices`)};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${i.indicesSet(`data_indices`,`uniforms.gather_axis`,`u32(index_from_indices)`)};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${f.indicesGet(`output_indices`,`i + ${r.length} - 1`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        let data_offset = ${i.indicesToOffset(`data_indices`)};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${i.getByOffset(`data_offset / 8`)};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${c.indicesGet(`data_indices`,`uniforms.quantize_axis`)} / uniforms.block_size;
        ${c.indicesSet(`scale_indices`,`uniforms.quantize_axis`,`quantize_axis_index`)};
        var scale = ${c.getByIndices(`scale_indices`)};
        ${d?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${d.indicesToOffset(`zero_point_indices`)};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${d.getByOffset(`zero_point_offset / 8`)};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:`var zero_point = 0`};
        let dequantized_data = ${H(l)}(quantized_data - zero_point) * scale;
        ${f.setByOffset(`global_idx`,`dequantized_data`)};
    }`}}},As=(e,t)=>{let n=e.inputs;Os(n,t),e.compute(ks(e.inputs,t))},js=e=>z({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Ns,Ps,Fs,Is,Ls=a(()=>{"use strict";F(),R(),B(),J(),Ns=e=>{if(!e||e.length!==2)throw Error(`GatherElements requires 2 inputs.`);if(e[0].dims.length<1)throw Error(`GatherElements requires that the data input be rank >= 1.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ps=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=L.normalizeAxis(t.axis,i),c=n[s],l=a.slice(0),u=L.size(l),d=K(`input`,r,i),f=K(`indicesInput`,o,a.length),p=q(`output`,r,l.length),m=[{type:12,data:u},{type:6,data:c},{type:12,data:s}];return m.push(...U(n,a,l)),{name:`GatherElements`,shaderCache:{inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:e=>`
      ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(d,f,p)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

      let outputIndices = ${p.offsetToIndices(`global_idx`)};

      var idx = ${f.getByOffset(`global_idx`)};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet(`inputIndices`,`uniforms.axis`,`u32(idx)`)};
      let value = ${d.getByIndices(`inputIndices`)};

      ${p.setByOffset(`global_idx`,`value`)};
  }`}},Fs=e=>z({axis:e.axis}),Is=(e,t)=>{let n=e.inputs;Ns(n),e.compute(Ps(e.inputs,t))}}),Rs,zs,Bs,Vs,Hs=a(()=>{"use strict";F(),R(),J(),Rs=e=>{if(!e)throw Error(`Input is missing`);if(e.length<2||e.length>3)throw Error(`Invaid input number.`);if(e.length===3&&e[2].dims.length>2)throw Error(`Invalid input shape of C`);if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`Input types are mismatched`)},zs=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=Vt.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw Error(`Can't use gemm on the given tensors`);let c=Math.ceil(a/16),l=Math.ceil(i/16);L.size(s);let u=[{type:12,data:c},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],d=[`type`,`type`];return e.length===3&&(u.push(...U(e[2].dims)),d.push(`rank`)),u.push(...U(s)),{name:`GemmShared`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:c*l},programUniforms:u}),getShaderSource:n=>{let r=K(`a`,e[0].dataType,e[0].dims),i=K(`b`,e[1].dataType,e[1].dims),a=null,o=[r,i];e.length===3&&(a=K(`c`,e[2].dataType,e[2].dims.length),o.push(a));let c=q(`output`,e[0].dataType,s.length);o.push(c);let l=[{name:`num_tile_n`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`},{name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}],u=``,d=``;t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[local_id.x][k];`):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[k][local_id.x];`):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[local_id.x][k];`):!t.transA&&!t.transB&&(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[k][local_id.x];`);let f=t.alpha===1?``:`value *= uniforms.alpha;`;return`
  ${n.registerUniforms(l).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${r.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${i.type.storage}, 16>, 16>;
  ${n.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${c.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${d}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${u}
      }
      workgroupBarrier();
    }

    ${f}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${a==null?``:`let cOffset = ${a.broadcastedIndicesToOffset(`vec2(m, n)`,c)}; value += ${c.type.value}(uniforms.beta) * ${a.getByOffset(`cOffset`)};`}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}},Bs=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}),Vs=(e,t)=>{Rs(e.inputs),e.compute(zs(e.inputs,t))}}),Us,Ws,Gs,Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc,nc,rc=a(()=>{"use strict";F(),R(),B(),J(),[Us,Ws,Gs,Ks]=[0,1,2,3],qs=e=>{if(e[0].dims.length!==4)throw Error(`only 4-D tensor is supported.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`input dimensions must be equal to grid dimensions`);if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error(`grid batch size must match input batch size`)},Js=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Ys=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Xs=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Zs=e=>`
  ${e.paddingMode===`reflection`?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:``}
`,Qs=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Us}] = batch;
     indices[${Ws}] = channel;`+(()=>{switch(n.paddingMode){case`zeros`:return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Gs}] = u32(r);
            indices[${Ks}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case`border`:return`
          indices[${Gs}] = u32(clamp(r, 0, H - 1));
          indices[${Ks}] = u32(clamp(c, 0, W - 1));
        `;case`reflection`:return`
          indices[${Gs}] = gs_reflect(r, border[1], border[3]);
          indices[${Ks}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices(`indices`)};
  }
`,$s=(e,t,n)=>(()=>{switch(n.mode){case`nearest`:return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Us}], indices[${Ws}], border);
        `;case`bilinear`:return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Us}], indices[${Ws}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Us}], indices[${Ws}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Us}], indices[${Ws}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Us}], indices[${Ws}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case`bicubic`:return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Us}], indices[${Ws}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset(`global_idx`,`result`)}`,ec=(e,t)=>{let n=K(`x`,e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=K(`grid`,e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format===`NHWC`&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Us,Ws,Gs,Ks]=[0,3,1,2]);let o=q(`output`,e[0].dataType,a.length),s=n.type.value,c=[{type:12,data:L.size(a)},...U(e[0].dims,r,a)];return{name:`GridSample`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:[`type`,`type`]},getRunData:e=>{let t=L.size(a);return{outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:c}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(n,i,o)}
  ${Js}
  ${Ys(s)}
  ${Xs(t)}
  ${Zs(t)}
  ${Qs(n,s,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let H_in = i32(uniforms.x_shape[${Gs}]);
      let W_in = i32(uniforms.x_shape[${Ks}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices(`global_idx`)};
      var grid_indices = vec3<u32>(indices[${Us}], indices[${Gs}], indices[${Ks}]);
      let nxy = ${i.getByIndices(`grid_indices`)};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${$s(o,s,t)}
  }`}},tc=(e,t)=>{qs(e.inputs),e.compute(ec(e.inputs,t))},nc=e=>z({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),ic,ac,oc,sc,cc,lc,uc,dc=a(()=>{"use strict";F(),R(),B(),ln(),Gr(),J(),Bn(),ic=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,ac=(e,t)=>{let n=e[0],r=ic(e,1),i=ic(e,2),a=ic(e,3),o=ic(e,4),s=ic(e,5),c=ic(e,6),l=ic(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let u=n.dims[0],d=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],p=d,m=0,h=0,g=Math.floor(f/t.numHeads);if(c&&l&&L.size(c.dims)&&L.size(l.dims)){if(c.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(c.dims[0]!==u||c.dims[1]!==t.numHeads||c.dims[3]!==g)throw Error(`Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(l.dims[0]!==u||l.dims[1]!==t.numHeads||l.dims[3]!==g)throw Error(`Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(c.dims[2]!==l.dims[2])throw Error(`Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)`);if(l.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);m=c.dims[2],h=c.dims[2]}else if(c&&L.size(c.dims)||l&&L.size(l.dims))throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let _;if(r&&L.size(r.dims)>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw Error(`Input "query" and "key" shall have same dim 2 (hidden_size)`);_=2,p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==g)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);_=5,p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==g)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);_=0,p=r.dims[2]}}else{if(n.dims.length!==5)throw Error(`Input "query" is expected to have 5 dimensions when key is empty`);if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);_=3}if(a&&L.size(a.dims)>0){if(a.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimension`);if(r&&r.dims.length===5&&r.dims[3]===2)throw Error(`bias is not allowed for packed kv.`)}let v=m+p,y=0;if(o&&L.size(o.dims)>0){y=8;let e=o.dims;throw e.length===1?e[0]===u?y=1:e[0]===3*u+2&&(y=3):e.length===2&&e[0]===u&&e[1]===v&&(y=5),Error(y===8?`Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)`:`Mask not supported`)}let b=!1,x=f;if(i&&L.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(p!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);x=i.dims[2]}else{if(p!==i.dims[2])throw Error(`Input "key" and "value" shall have the same dim 2 (kv_sequence_length)`);x=i.dims[1]*i.dims[3],b=!0}}if(o&&L.size(o.dims)>0)throw Error(`Key padding mask is not supported`);if(s&&L.size(s.dims)>0){if(s.dims.length!==4)throw Error(`Input "attention_bias" is expected to have 4 dimensions`);if(s.dims[0]!==u||s.dims[1]!==t.numHeads||s.dims[2]!==d||s.dims[3]!==v)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:v,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:f,vHiddenSize:x,headSize:g,vHeadSize:Math.floor(x/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:_}},oc=e=>z({...e}),sc=z({perm:[0,2,1,3]}),cc=(e,t,n,r,i,a,o)=>{let s=[r,i,a],c=L.size(s),l=[{type:12,data:c},{type:12,data:o},{type:12,data:a}];return e.compute({name:`MultiHeadAttentionAddBias`,shaderCache:{inputDependencies:[`type`,`type`]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l}),getShaderSource:e=>{let r=q(`qkv_with_bias`,t.dataType,s),i=K(`qkv`,t.dataType,s),a=K(`bias`,n.dataType,s);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`bias_offset`,type:`u32`},{name:`hidden_size`,type:`u32`}]).declareVariables(i,a,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[t,n],outputs:[-1]})[0]},lc=(e,t,n,r,i,a,o,s)=>{let c=a;if(o&&L.size(o.dims)>0){if(r===1)throw Error(`AddBiasReshape is not implemented. Please export your model with packed QKV or KV`);return c=cc(e,a,o,t,r,n*i,s),c=c.reshape([t,r,n,i]),n===1||r===1?c:e.compute(Ln(c,sc.perm),{inputs:[c],outputs:[-1]})[0]}return a.dims.length===3&&(c=a.reshape([t,r,n,i])),n===1||r===1?c:e.compute(Ln(c,sc.perm),{inputs:[c],outputs:[-1]})[0]},uc=(e,t)=>{let n=ac(e.inputs,t),r=e.inputs[0],i=ic(e.inputs,1),a=ic(e.inputs,2),o=ic(e.inputs,3),s=ic(e.inputs,4),c=ic(e.inputs,5),l=ic(e.inputs,6),u=ic(e.inputs,7);if(r.dims.length===5)throw Error(`Packed QKV is not implemented`);if(i?.dims.length===5)throw Error(`Packed KV is not implemented`);let d=i&&a&&i.dims.length===4&&a.dims.length===4,f=lc(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(d)return Hr(e,f,i,a,s,void 0,l,u,c,n);if(!i||!a)throw Error(`key and value must be provided`);let p=lc(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),m=lc(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);Hr(e,f,p,m,s,void 0,l,u,c,n)}}),fc,pc,mc,hc,gc,_c,vc,yc=a(()=>{"use strict";F(),R(),B(),J(),fc=e=>{if(!e||e.length<1)throw Error(`too few inputs`)},pc=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),r=n.length),z({numOutputs:r,axis:t.axis,splitSizes:n})},mc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${G(`uniforms.size_in_split_axis`,`i`,e)}) {
        return i;
    }
    }
    return ${e}u;
}`,hc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices(`indices`,`input[global_idx]`);t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},gc=(e,t)=>{let n=e[0].dims,r=L.size(n),i=e[0].dataType,a=L.normalizeAxis(t.axis,n.length),o=Array(t.numOutputs),s=K(`input`,i,n.length),c=Array(t.numOutputs),l=[],u=[],d=0,f=[{type:12,data:r}];for(let r=0;r<t.numOutputs;r++){d+=t.splitSizes[r],c[r]=d;let s=n.slice();s[a]=t.splitSizes[r],u.push(s),o[r]=q(`output${r}`,i,s.length),l.push({dims:u[r],dataType:e[0].dataType})}return f.push({type:12,data:c},...U(n,...u)),{name:`Split`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`]},getShaderSource:e=>`
  ${e.registerUniform(`input_size`,`u32`).registerUniform(`size_in_split_axis`,`u32`,c.length).declareVariables(s,...o)}
  ${mc(c.length)}
  ${hc(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.input_size`)}

    var indices = ${s.offsetToIndices(`global_idx`)};
    var index = ${s.indicesGet(`indices`,a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${G(`uniforms.size_in_split_axis`,`output_number - 1u`,c.length)};
      ${s.indicesSet(`indices`,a,`index`)};
    }
    writeBufferData(output_number, indices, global_idx);
  }`,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},_c=(e,t)=>{fc(e.inputs);let n=e.inputs.length===1?t:pc(e.inputs,t);e.compute(gc(e.inputs,n),{inputs:[0]})},vc=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw Error(`numOutputs and splitSizes length must be equal`);return z({axis:t,numOutputs:r,splitSizes:n})}}),bc,xc,Sc,Cc=a(()=>{"use strict";F(),R(),B(),J(),bc=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!L.areEqual(r.dims,[])&&!L.areEqual(r.dims,[1])&&r.dims.length!==2)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!L.areEqual(i.dims,a.dims))throw Error(`Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape`);if(s>0&&o===0)throw Error(`num_heads must be provided if rotary_embedding_dim is specified`);let c=n.dims[0],l=n.dims[n.dims.length-2],u=i.dims[0],d=L.sizeFromDimension(n.dims,1)/l,f=s===0?i.dims[1]*2:d/o;if(s>f)throw Error(`rotary_embedding_dim must be less than or equal to head_size`);if(r.dims.length===2){if(c!==r.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(l>u)throw Error(`Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported`);if(f/2!==i.dims[1]&&s/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},xc=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=L.sizeFromDimension(e[0].dims,1),c=e[0].dims[e[0].dims.length-2],l=s/c,u=e[2].dims[1],d=i===0?u*2:l/r,f=[o,c,l/d,d-u],p=L.computeStrides(f),m=[{type:1,data:a},{type:12,data:f},{type:12,data:p},...e[0].dims.length===3?Array({type:12,data:[s,l,d,1]}):[],...e[0].dims.length===4?Array({type:12,data:[s,d,c*d,1]}):[],...U(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:`RotaryEmbedding`,shaderCache:{hint:z({interleaved:n}).cacheKey,inputDependencies:[`rank`,`rank`,`rank`,`rank`]},getShaderSource:t=>{let r=K(`input`,e[0].dataType,e[0].dims.length),i=K(`position_ids`,e[1].dataType,e[1].dims.length),a=K(`cos_cache`,e[2].dataType,e[2].dims.length),o=K(`sin_cache`,e[3].dataType,e[3].dims.length),s=q(`output`,e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:`scale`,type:`f32`},{name:`global_shape`,type:`u32`,length:f.length},{name:`global_strides`,type:`u32`,length:p.length},{name:`input_output_strides`,type:`u32`,length:p.length}]),`
        ${t.declareVariables(r,i,a,o,s)}

        ${t.mainStart(xn)}
          let half_rotary_emb_dim = uniforms.${a.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes(`size`)}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset(`bsnh.xy`,q(``,i.type.tensor,2))};
            let position_id =
                u32(${i.getByOffset(`position_ids_idx`)}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${r.getByOffset(`i`)} * ${a.get(`position_id`,`bsnh[3]`)} -
                ${r.getByOffset(`j`)} * ${o.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`i`,`re`)}
            let im = ${r.getByOffset(`i`)} * ${o.get(`position_id`,`bsnh[3]`)} +
                ${r.getByOffset(`j`)} * ${a.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`j`,`im`)}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${s.setByOffset(`k`,r.getByOffset(`k`))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(L.size(f)/xn)},programUniforms:m})}},Sc=(e,t)=>{bc(e.inputs,t),e.compute(xc(e.inputs,t))}}),wc,Tc,Ec,Dc,Oc,kc=a(()=>{"use strict";B(),F(),Gr(),dc(),yc(),Bn(),Cc(),J(),wc=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error(`cos_cache and sin_cache inputs are required if do_rotary is specified`);let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw Error(`cos_cast and sin_cache are expected if do_rotary attribute is non-zero`);if(t.localWindowSize!==-1)throw Error(`Local attention is not supported`);if(t.softcap!==0)throw Error(`Softcap is not supported`);if(t.rotaryInterleaved!==0)throw Error(`Rotary interleaved is not supported`);if(t.smoothSoftmax)throw Error(`Smooth softmax is not supported`);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let s=n.dims[0],c=n.dims[1],l=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],u=c,d=0,f=!r||r.dims.length===0,p=Math.floor(f?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);f&&(l=p*t.numHeads);let m=a&&a.dims.length!==0,h=o&&o.dims.length!==0;if(m&&a.dims.length===4&&a.dims[0]===s&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===p)throw Error(`BSNH pastKey/pastValue is not supported`);if(m&&h){if(a.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(o.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);d=a.dims[2]}else if(m||h)throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let g=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw Error(`Dimension 2 of "query" should be a multiple of "key"`);u=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==p)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);u=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==p)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);u=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input "query" is expected to have 3 or 5 dimensions when key is empty`);if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);g=3}let _=!1,v=t.kvNumHeads?p*t.kvNumHeads:l;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(u!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);v=i.dims[2]}else{if(u!==i.dims[2])throw Error(`Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)`);v=i.dims[1]*i.dims[3],_=!0}}let y=e.length>4?e[5]:void 0;if(y){if(y.dims.length===0)throw Error(`seqlens_k must be at least 1D, got scalar.`);let e=y.dims.reduce((e,t)=>e*t,1);if(e!==s)throw Error(`seqlens_k must have batch_size (${s}) elements, got ${e}.`);for(let e=0;e<y.dims.length;e++)if(y.dims[e]!==1&&y.dims[e]!==s)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${s}), got dims[${e}] = ${y.dims[e]}.`)}return{batchSize:s,sequenceLength:c,pastSequenceLength:d,kvSequenceLength:u,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:v,headSize:p,vHeadSize:Math.floor(v/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:g}},Tc=z({perm:[0,2,1,3]}),Ec=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(Ln(r,Tc.perm),{inputs:[r],outputs:[-1]})[0]),r},Dc=(e,t,n,r)=>{let i=[`type`,`type`],a=[e*t],o=e*t,s=[{type:12,data:o},{type:12,data:t},{type:12,data:e}];return{name:`GeneratePositionIds`,shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}),getShaderSource:e=>{let t=K(`seq_lens`,n.dataType,n.dims),i=K(`total_seq_lens`,r.dataType,r.dims),o=q(`pos_ids`,7,a);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`batch_size`,type:`u32`}]).declareVariables(t,i,o)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let total_sequence_length = u32(${i.getByOffset(`0`)});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${t.getByOffset(`batch_idx`)};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (global_idx < uniforms.batch_size) {
      ${o.setByOffset(`global_idx`,`seqlen`)}
    };
  }
  `}}},Oc=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw Error(`GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.`);let n=wc(e.inputs,t);if(e.inputs[0].dims.length===5)throw Error(`Packed QKV is not implemented`);if(e.inputs[1]?.dims.length===5)throw Error(`Packed KV is not implemented`);let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,c=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,u=n.kvNumHeads?n.kvNumHeads:n.numHeads,d=z({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,u*n.headSize,u*n.headSize]}),[f,p,m]=!i&&!a?e.compute(gc([r],d),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],h,g;if(t.doRotary){let r=e.compute(Dc(n.batchSize,n.sequenceLength,c,l),{inputs:[c,l],outputs:[-1]})[0],i=e.inputs[7],a=e.inputs[8],o=z({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),s=[f,r,i,a],u=[-1];h=e.compute(xc(s,o),{inputs:s,outputs:u})[0],s.splice(0,1,p);let d=z({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(xc(s,d),{inputs:s,outputs:u})[0]}let _=lc(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?h:f,void 0,0),v=Ec(e,t.doRotary?g:p,n),y=Ec(e,m,n);Hr(e,_,v,y,void 0,void 0,o,s,void 0,n,c,l)}}),Ac,jc,Mc,Nc,Pc=a(()=>{"use strict";F(),R(),Bn(),J(),Ac=(e,t,n,r,i,a,o,s)=>{let c=W(a),l=c===1?`f32`:`vec${c}f`,u=c===1?`vec2f`:`mat2x${c}f`,d=i*o,f=64;d===1&&(f=256);let p=[i,o,a/c],m=[i,o,2],h=[`rank`,`type`,`type`],g=[];return g.push(...U(p,m)),e.compute({name:`InstanceNormComputeChannelScaleShift`,shaderCache:{hint:`${c};${s};${f}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:d},programUniforms:g}),getShaderSource:e=>{let i=K(`x`,t.dataType,3,c),a=[i,K(`scale`,n.dataType,n.dims),K(`bias`,r.dataType,r.dims),q(`output`,1,3,2)];return`
  var<workgroup> workgroup_shared : array<${u}, ${f}>;
  const workgroup_size = ${f}u;
  ${e.declareVariables(...a)}
  ${e.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${i.get(`batch`,`channel`,`h`)});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${u}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Tn(`workgroup_shared[0][0]`,c)} / f32(hight * ${c});
      let squared_sum_final = ${Tn(`workgroup_shared[0][1]`,c)} / f32(hight * ${c});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,n,r],outputs:[-1]})[0]},jc=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[1],s=L.sizeFromDimension(r,2),c=W(s),l=L.size(i)/c,u=Ac(e,t[0],t[1],t[2],a,s,o,n.epsilon),d=[a,o,s/c],f=[a,o];e.compute({name:`InstanceNormalization`,shaderCache:{hint:`${c}`,inputDependencies:[`type`,`none`]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...U(d,f,d)]}),getShaderSource:e=>{let n=K(`x`,t[0].dataType,d.length,c),r=K(`scale_shift`,1,f.length,2),i=q(`output`,t[0].dataType,d.length,c),a=[n,r,i];return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(...a)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let outputIndices = ${i.offsetToIndices(`global_idx`)};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices(`vec2<u32>(batch, channel)`)};
      let value = ${n.getByOffset(`global_idx`)} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset(`global_idx`,`value`)};
  }`}},{inputs:[t[0],u]})},Mc=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=L.sizeFromDimension(r,1)/o,c=W(o),l=L.size(i)/c,u=[{type:12,data:s},{type:12,data:Math.floor(o/c)}],d=[`type`,`type`],f=!1,p=[0,r.length-1];for(let e=0;e<r.length-2;e++)f||=r[e+1]!==1,p.push(e+1);f&&=r[r.length-1]!==1;let m=f?e.compute(Ln(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(e,t)=>r[p[t]])),h=Ac(e,m,t[1],t[2],a,s,o,n.epsilon);e.compute({name:`InstanceNormalizationNHWC`,shaderCache:{hint:`${c}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:e=>{let n=V(t[0].dataType),r=c===1?`vec2f`:`mat${c}x2f`,a=e=>{let t=e===0?`x`:`y`,r=c===1?`f32`:`vec${c}f`;switch(c){case 1:return`${n}(${r}(scale.${t}))`;case 2:return`vec2<${n}>(${r}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${n}>(${r}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${c}`)}},o=K(`input`,t[0].dataType,t[0].dims,c),s=q(`output`,t[0].dataType,i,c);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${r}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${s.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${a(0)}, ${a(1)});
  }`}},{inputs:[t[0],h]})},Nc=(e,t)=>{t.format===`NHWC`?Mc(e,e.inputs,t):jc(e,e.inputs,t)}}),Fc,Ic,Lc,Rc=a(()=>{"use strict";F(),R(),J(),Fc=e=>{if(!e||e.length<2)throw Error(`layerNorm requires at least 2 inputs.`)},Ic=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,c=L.normalizeAxis(t.axis,i.length),l=L.sizeToDimension(i,c),u=L.sizeFromDimension(i,c),d=L.size(a.dims),f=o?L.size(o.dims):0;if(d!==u||o&&f!==u)throw Error(`Size of X.shape()[axis:] == ${u}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${f}`);let p=[];for(let e=0;e<i.length;++e)e<c?p.push(i[e]):p.push(1);let m=W(u),h=[`type`,`type`],g=[{type:12,data:l},{type:1,data:u},{type:12,data:Math.floor(u/m)},{type:1,data:t.epsilon}];o&&h.push(`type`);let _=n>1,v=n>2,y=t=>{let n=V(e[0].dataType),i=[K(`x`,e[0].dataType,e[0].dims,m),K(`scale`,a.dataType,a.dims,m)];return o&&i.push(K(`bias`,o.dataType,o.dims,m)),i.push(q(`output`,e[0].dataType,s,m)),_&&i.push(q(`mean_data_output`,1,p)),v&&i.push(q(`inv_std_output`,1,p)),`
  ${t.registerUniforms([{name:`norm_count`,type:`u32`},{name:`norm_size`,type:`f32`},{name:`norm_size_vectorized`,type:`u32`},{name:`epsilon`,type:`f32`}]).declareVariables(...i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.norm_count`)}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Cn(`f32`,m)};
    var mean_square_vector = ${Cn(`f32`,m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${wn(n,m,`x[h + offset]`)};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Tn(`mean_vector`,m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Tn(`mean_square_vector`,m)} / uniforms.norm_size ${r?``:`- mean * mean`} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${wn(n,m,`x[j + offset]`)};
      let f32scale = ${wn(n,m,`scale[j]`)};
      output[j + offset] = ${i[0].type.value}((f32input ${r?``:`- mean`}) * inv_std_dev * f32scale
        ${o?`+ ${wn(n,m,`bias[j]`)}`:``}
      );
    }

    ${_?`mean_data_output[global_idx] = mean`:``};
    ${v?`inv_std_output[global_idx] = inv_std_dev`:``};
  }`},b=[{dims:s,dataType:e[0].dataType}];return _&&b.push({dims:p,dataType:1}),v&&b.push({dims:p,dataType:1}),{name:`LayerNormalization`,shaderCache:{hint:`${m};${n};${r}`,inputDependencies:h},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:y}},Lc=(e,t)=>{Fc(e.inputs),e.compute(Ic(e.inputs,t,e.outputCount))}}),zc,Bc,Vc=a(()=>{"use strict";R(),Aa(),za(),zc=e=>{if(!e||e.length!==2)throw Error(`MatMul requires 2 inputs.`);if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error(`shared dimension does not match.`)},Bc=e=>{zc(e.inputs);let t=zt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error(`Can't use matmul on the given tensors`);let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(ka(e.inputs,{activation:``},t));else{let i=t[t.length-2],a=L.size(e.inputs[0].dims.slice(0,-2)),o=L.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let i=e.inputs[0].reshape([1,a,r]),o=e.inputs[1].reshape([1,r,n]),s=[1,a,n],c=[i,o];e.compute(Ra(c,{activation:``},t,s),{inputs:c})}else e.compute(Ra(e.inputs,{activation:``},t))}}}),Hc,Uc,Wc,Gc,Kc,qc=a(()=>{"use strict";F(),R(),B(),J(),Hc=(e,t)=>{if(e.length<3||e.length>4)throw Error(`MatMulNBits requires 3 or 4 inputs`);let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw Error(`The last dim of input shape does not match the k value`);let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!L.areEqual(o.dims,[t.n,i,a]))throw Error(`The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize`);let s=e[2].dims;if(L.size(s)!==t.n*i)throw Error(`scales input size error.`);if(e.length===4){let n=e[3].dims,r=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(L.size(n)!==r)throw Error(`zeroPoints input size error.`)}},Uc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=L.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=W(t.k),f=W(l),p=W(o),m=s.concat([i,o]),h=i>1&&o/p%2==0?2:1,g=L.size(m)/p/h,_=[],v=[c,i,a/d],y=L.convertShape(e[1].dims).slice();y.splice(-1,1,l/f),_.push(...U(v)),_.push(...U(y)),_.push(...U(e[2].dims)),e.length===4&&_.push(...U(L.convertShape(e[3].dims)));let b=[c,i,o/p];return _.push(...U(b)),{name:`MatMulNBits`,shaderCache:{hint:`${t.blockSize};${t.bits};${d};${f};${p};${h};64`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:m,dataType:u}],dispatchGroup:{x:g},programUniforms:_}),getShaderSource:n=>{let r=v.length,i=K(`a`,e[0].dataType,r,d),a=K(`b`,12,y.length,f),o=K(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?K(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let u=b.length,m=q(`output`,e[0].dataType,u,p),g=V(e[0].dataType),_=(()=>{switch(d){case 1:return`array<${g}, 8>`;case 2:return`mat4x2<${g}>`;case 4:return`mat2x4<${g}>`;default:throw Error(`${d}-component is not supported.`)}})(),x=Math.floor(32/t.bits),S=Math.floor(x/8),C=()=>{let e=``;for(let n=0;n<S;n++){let r=n*t.bits*4,a=r+t.bits;e+=`
          // reuse a data (pass ${n})
            var input_offset${n>0?n:``} = ${n===0?i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`):`input_offset`};
            var a_data${n>0?n:``}: ${_};
            for (var j${n>0?n:``}: u32 = 0; j${n>0?n:``} < ${8/d}; j${n>0?n:``}++) {
              a_data${n>0?n:``}[j${n>0?n:``}] = ${i.getByOffset(`input_offset${n>0?n:``}`)};
              input_offset${n>0?n:``}++;
            }
          `;for(let i=0;i<p*h;i++)e+=`
            b_value = ${f===1?`b${i}_data`:`b${i}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${n*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${r}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${a}u) & b_mask);`}
            b_quantized_values = ${_}(${Array.from({length:4},(e,t)=>`${g}(b_value_lower[${t}]), ${g}(b_value_upper[${t}])`).join(`, `)});
            b_dequantized_values = ${d===1?`${_}(${Array.from({length:8},(e,t)=>`(b_quantized_values[${t}] - ${c?`zero_point${i}`:`zero_point`}) * scale${i}`).join(`, `)});`:`(b_quantized_values - ${_}(${Array(8).fill(`${c?`zero_point${i}`:`zero_point`}`).join(`,`)})) * scale${i};`};
            workgroup_shared[local_id.x * ${h} + ${Math.floor(i/p)}]${p>1?`[${i%p}]`:``} += ${Array.from({length:8/d},(e,t)=>`${d===1?`a_data${n>0?n:``}[${t}] * b_dequantized_values[${t}]`:`dot(a_data${n>0?n:``}[${t}], b_dequantized_values[${t}])`}`).join(` + `)};
          `}return e},w=()=>{let e=`
            var col_index = col * ${p};
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${g}(${(2**(t.bits-1)).toFixed(1)});`}
            `;for(let n=0;n<p*h;n++)e+=`
            let scale${n} = ${o.getByOffset(`col_index * nBlocksPerCol + block`)};
            ${c?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point${n} = ${g}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:``}
            col_index += 1;`;return e},ee=()=>{let e=`col_index = col * ${p};`;for(let t=0;t<p*h;t++)e+=`
            let b${t}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?`0x03030303u`:`0x0F0F0F0Fu`};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${_};
            var b_dequantized_values: ${_};`,e};return`
        var<workgroup> workgroup_shared: array<${m.type.value}, ${h*64}>;
        ${n.declareVariables(...s,m)}
        ${n.mainStart([64,1,1])}
          let output_indices = ${m.offsetToIndices(`(global_idx / 64) * ${h}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/d};
            ${w()}
            for (var word: u32 = 0; word < ${l}; word += ${f}) {
              ${ee()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${C()}
                word_offset += ${x/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${h}) {
            var output_value: ${m.type.value} = ${m.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${h};
            }
            ${m.setByIndices(`${m.type.indices}(batch, row, col + local_id.x)`,`output_value`)};
          }
        }`}}},Wc=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=L.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=W(t.k),f=W(l),p=s.concat([i,o]),m=o%8==0?8:o%4==0?4:1,h=128/m,g=Math.floor(32/t.bits),_=h*f*g,v=_/d,y=_/t.blockSize,b=L.size(p)/m,x=[],S=[c,i,a/d],C=L.convertShape(e[1].dims).slice();C.splice(-1,1,l/f),x.push(...U(S)),x.push(...U(C)),x.push(...U(e[2].dims)),e.length===4&&x.push(...U(L.convertShape(e[3].dims)));let w=[c,i,o];return x.push(...U(w)),{name:`BlockwiseMatMulNBits32`,shaderCache:{hint:`${t.blockSize};${d};${f};${h};${m}`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:p,dataType:u}],dispatchGroup:{x:b},programUniforms:x}),getShaderSource:n=>{let r=S.length,i=K(`a`,e[0].dataType,r,d),a=K(`b`,12,C.length,f),o=K(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?K(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let l=w.length,u=q(`output`,e[0].dataType,l),p=V(e[0].dataType),_=()=>{switch(d){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${d}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${i.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${u.type.value}, ${h}>, ${m}>;
        ${n.declareVariables(...s,u)}
        ${n.mainStart([h,m,1])}
          let output_indices = ${u.offsetToIndices(`workgroup_index * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${y} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${i.getByIndices(`${i.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${i.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${y} + local_id.x;
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${p}(${(2**(t.bits-1)).toFixed(1)});`}
            let scale = ${o.getByOffset(`b_row * n_blocks_per_col + block`)};
            let b_data = ${a.getByIndices(`${a.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/d};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?`b_data`:`b_data[i]`};
              ${(()=>{let e=Math.floor(g/8),n=``;for(let r=0;r<e;r++){let e=r*t.bits*4,i=e+t.bits;n+=`
              ${_()}
              {${t.bits===2?`
                let half_word = b_value >> ${r*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${i}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(`, `)});
                let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill(`zero_point`).join(`,`)})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`${`dot(a_data${t}, b_dequantized_values[${t}])`}`).join(` + `)};
              }
              word_offset += ${8/d};`}return n})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${m}) {
            var output_value: ${u.type.value} = ${u.type.value}(0);
            for (var b = 0u; b < ${h}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${u.setByIndices(`${u.type.indices}(batch, row, col + local_idx)`,`output_value`)}
            }
          }
        }`}}},Gc=(e,t)=>{Hc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor(`intel`)&&e.adapterInfo.isArchitecture(`gen-12lp`)?e.compute(Wc(e.inputs,t)):e.compute(Uc(e.inputs,t))},Kc=e=>z(e)}),Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl=a(()=>{"use strict";F(),R(),J(),Jc=e=>{if(!e||e.length<1)throw Error(`Too few inputs`);if(e[0].dataType!==1&&e[0].dataType!==10)throw Error(`Input type must be float or float16.`);if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw Error(`The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].`)}},Yc=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet(`indices`,i)}) - ${G(`uniforms.pads`,i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${G(`uniforms.x_shape`,i,t)})) {
              break;
            }
            offset += k * i32(${G(`uniforms.x_strides`,i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Xc=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${G(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${G(`uniforms.x_shape`,i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${G(`uniforms.x_shape`,i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${G(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Zc=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${G(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${G(`uniforms.x_shape`,i,t)})) {
                  k = i32(${G(`uniforms.x_shape`,i,t)}) - 1;
                }
                offset += k * i32(${G(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Qc=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${G(`uniforms.pads`,i,n)};
                if (k < 0)  {
                  k += i32(${G(`uniforms.x_shape`,i,t)}]);
                }
                if (k >= i32(${G(`uniforms.x_shape`,i,t)})) {
                  k -= i32(${G(`uniforms.x_shape`,i,t)});
                }
                offset += k * i32(${G(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},$c=(e,t,n)=>{switch(n.mode){case 0:return Yc(e,t,n.pads.length);case 1:return Xc(e,t,n.pads.length);case 2:return Zc(e,t,n.pads.length);case 3:return Qc(e,t,n.pads.length);default:throw Error(`Invalid mode`)}},el=(e,t)=>{let n=L.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=[{type:12,data:L.size(n)},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;return t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...U(e[0].dims,n)),{name:`Pad`,shaderCache:{hint:`${t.mode}${a}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(L.size(n)/64)},programUniforms:i}),getShaderSource:i=>{let o=q(`output`,e[0].dataType,n.length),s=K(`x`,e[0].dataType,r.length),c=s.type.value,l=$c(o,r.length,t),u=[{name:`output_size`,type:`u32`},{name:`pads`,type:`i32`,length:t.pads.length}];return t.mode===0&&u.push({name:`constant_value`,type:a?c:`f32`}),`
            ${i.registerUniforms(u).declareVariables(s,o)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

            let indices = ${o.offsetToIndices(`global_idx`)};

            var value = ${c}(0);
            ${l}
            output[global_idx] = value;
        }`}}},tl=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)a[Number(t[e])]=Number(n[e]),a[Number(t[e])+i]=Number(n[e+t.length])}else n.forEach((e,t)=>a[Number(t)]=Number(e));let o=[];return a.forEach(e=>o.push(e)),{mode:t.mode,value:r,pads:o}}return t},nl=(e,t)=>{Jc(e.inputs);let n=tl(e.inputs,t);e.compute(el(e.inputs,n),{inputs:[0]})}}),il,al,ol,sl,cl,ll,ul,dl,fl,pl,ml,hl,gl,_l,vl,yl,bl,xl,Sl,Cl=a(()=>{"use strict";Oe(),F(),R(),J(),il=e=>{if(x.webgpu.validateInputContent&&(!e||e.length!==1))throw Error(`Pool ops requires 1 input.`)},al=(e,t,n)=>{let r=t.format===`NHWC`,i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,`dilations`),o=t.kernelShape.slice(),s=t.strides.slice(),c=a?t.dilations.slice():[],l=t.pads.slice();Bt.adjustPoolAttributes(n,i,o,s,c,l);let u=Bt.computePoolOutputShape(n,i,s,c,o,l,t.autoPad,t.ceilMode),d=Object.assign({},t);a?Object.assign(d,{kernelShape:o,strides:s,pads:l,dilations:c,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:s,pads:l,cacheKey:t.cacheKey});let f=u.slice();return f.push(f.splice(1,1)[0]),[d,r?f:u]},ol=(e,t)=>{let n=t.format===`NHWC`,r=L.size(e),i=L.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:`outputSize`,type:`u32`},{name:`kernelSize`,type:`u32`}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],n=t.strides[t.strides.length-1],r=t.pads[t.pads.length/2-1],i=t.pads[t.pads.length-1],s=!!(r+i);a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kw`,type:`u32`},{name:`sw`,type:`u32`},{name:`pwStart`,type:`u32`},{name:`pwEnd`,type:`u32`});let c=!1;if(t.kernelShape.length===2){let e=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],r=t.pads[t.pads.length/2-2],i=t.pads[t.pads.length-2];c=!!(r+i),a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kh`,type:`u32`},{name:`sh`,type:`u32`},{name:`phStart`,type:`u32`},{name:`phEnd`,type:`u32`})}return[a,o,!0,s,c]}{if(n)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let e=L.computeStrides(t.kernelShape);return a.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:`kernelStrides`,type:`u32`,length:e.length},{name:`pads`,type:`u32`,length:t.pads.length},{name:`strides`,type:`u32`,length:t.strides.length}),[a,o,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},sl=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f=i.format===`NHWC`,p=t.type.value,m=q(`output`,t.type.tensor,r);if(i.kernelShape.length<=2){let r=``,l=``,h=``,g=n-(f?2:1);if(r=u?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`,i.kernelShape.length===2){let e=n-(f?3:2);l=d?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,h=`
              }
            `}return`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var value = ${p}(${s});
              var pad = 0;
              ${l}
              ${r}
              ${h}
              ${o}

              output[global_idx] = value;
            }`}{if(f)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let r=i.kernelShape.length,u=i.pads.length,d=``;return d=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset(`xIndices`)}];
                ${a}
              }`:`
              }
              let x_val = x[${t.indicesToOffset(`xIndices`)}];
              ${a}
            `,`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var offsets: array<u32, ${r}>;

              var value = ${p}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${r-1}u; j++) {
                  offsets[j] = offset / ${G(`uniforms.kernelStrides`,`j`,r)};
                  offset -= offsets[j] * ${G(`uniforms.kernelStrides`,`j`,r)};
                }
                offsets[${r-1}] = offset;

                isPad = false;
                for (var j = ${n-r}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${G(`uniforms.strides`,`j - ${n-r}u`,r)}
                    + offsets[j - ${n-r}u] - ${G(`uniforms.pads`,`j - 2u`,u)};
                  ${d}
              }
              ${o}

              output[global_idx] = value;
            }`}},cl=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ll=e=>`${cl(e)};${e.countIncludePad}`,ul=e=>`${cl(e)};${e.storageOrder};${e.dilations}`,dl=e=>({format:e.format,autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),fl=(e,t,n,r)=>{let[i,a]=al(t,r,n),o=K(`x`,t.dataType,t.dims.length),s=o.type.value,c=``;i.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[l,u,d,f,p]=ol(a,i);return l.push(...U(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${d};${f};${p}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(L.size(a)/64)},programUniforms:l}),getShaderSource:e=>sl(e,o,t.dims.length,a.length,i,`value += x_val;`,c,0,u,d,f,p)}},pl=e=>{let t=e.count_include_pad!==0,n=dl(e);if(n.ceilMode!==0)throw Error(`ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel`);let r={countIncludePad:t,...n,cacheKey:``};return{...r,cacheKey:ll(r)}},ml=(e,t)=>{il(e.inputs),e.compute(fl(`AveragePool`,e.inputs[0],!1,t))},hl={autoPad:``,ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},gl=e=>{let t=e.format;return{format:t,...hl,cacheKey:t}},_l=(e,t)=>{il(e.inputs),e.compute(fl(`GlobalAveragePool`,e.inputs[0],!0,t))},vl=(e,t,n,r)=>{let[i,a]=al(t,r,n),o=K(`x`,t.dataType,t.dims.length),s=[`rank`],[c,l,u,d,f]=ol(a,i);return c.push(...U(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${u};${d};${f}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(L.size(a)/64)},programUniforms:c}),getShaderSource:e=>sl(e,o,t.dims.length,a.length,i,`
      value = max(x_val, value);
    `,``,t.dataType===10?-65504:-1e5,l,u,d,f)}},yl=(e,t)=>{il(e.inputs),e.compute(vl(`MaxPool`,e.inputs[0],!1,t))},bl=e=>{let t=e.storage_order,n=e.dilations,r=dl(e);if(t!==0)throw Error(`column major storage order is not yet supported for MaxPool`);if(r.ceilMode!==0)throw Error(`ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel`);let i={storageOrder:t,dilations:n,...r,cacheKey:``};return{...i,cacheKey:ul(i)}},xl=e=>{let t=e.format;return{format:t,...hl,cacheKey:t}},Sl=(e,t)=>{il(e.inputs),e.compute(vl(`GlobalMaxPool`,e.inputs[0],!0,t))}}),wl,Tl,El,Dl,Ol=a(()=>{"use strict";F(),R(),B(),J(),wl=(e,t)=>{if(e.length<2||e.length>3)throw Error(`DequantizeLinear requires 2 or 3 inputs.`);if(e.length===3&&e[1].dims===e[2].dims)throw Error(`x-scale and x-zero-point must have the same shape.`);if(e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw Error(`scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.`);if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==e[2].dims.length)throw Error(`scale and zero-point inputs must have the same rank.`);if(!e[1].dims.map((t,n)=>t===e[2].dims[n]).reduce((e,t)=>e&&t,!0))throw Error(`scale and zero-point inputs must have the same shape.`)}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw Error(`blockSize must be set only for block quantization.`);if(!e[1].dims.map((n,r)=>r===t.axis||n===e[0].dims[r]).reduce((e,t)=>e&&t,!0))throw Error(`For block qunatization, scale input shape to match the input shape except for the axis`);if(e[1].dims.length!==e[0].dims.length)throw Error(`For block qunatization the scale input rank must be the same as the x rank.`);let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw Error(`blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].`)}},Tl=(e,t)=>{let n=L.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=L.size(a),c=r===3||r===2,l=c?[Math.ceil(L.size(e[0].dims)/4)]:e[0].dims,u=e[1].dims,d=e.length>2?e[2]:void 0,f=d?c?[Math.ceil(L.size(d.dims)/4)]:d.dims:void 0,p=u.length===0||u.length===1&&u[0]===1,m=p===!1&&u.length===1,h=W(s),g=p&&(!c||h===4),_=g?h:1,v=g&&!c?h:1,y=K(`input`,c?12:r,l.length,v),b=K(`scale`,o,u.length),x=d?K(`zero_point`,c?12:r,f.length):void 0,S=q(`output`,o,a.length,_),C=[y,b];x&&C.push(x);let w=[l,u];d&&w.push(f);let ee=[{type:12,data:s/_},{type:12,data:n},{type:12,data:t.blockSize},...U(...w,a)];return{name:`DequantizeLinear`,shaderCache:{hint:t.cacheKey,inputDependencies:x?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getShaderSource:e=>`
      ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...C,S)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let output_indices = ${S.offsetToIndices(`global_idx`)};

          // Set input x
          ${c?`
            let input = ${y.getByOffset(`global_idx / 4`)};
            let x_vec = ${i?`unpack4xI8(input)`:`unpack4xU8(input)`};
            let x_value = ${_===1?`x_vec[global_idx % 4]`:`x_vec`};`:`let x_value = ${y.getByOffset(`global_idx`)};`};

          // Set scale input
          ${p?`let scale_value= ${b.getByOffset(`0`)}`:m?`
            let scale_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
            let scale_value= ${b.getByOffset(`scale_index`)};`:`
            var scale_indices: ${b.type.indices} = output_indices;
            let index = ${b.indicesGet(`scale_indices`,`uniforms.axis`)} / uniforms.block_size;
            ${b.indicesSet(`scale_indices`,`uniforms.axis`,`index`)};
            let scale_value= ${b.getByIndices(`scale_indices`)};`};

          // Set zero-point input
          ${x?p?c?`
                let zero_point_input = ${x.getByOffset(`0`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset(`0`)}`:m?c?`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_input = ${x.getByOffset(`zero_point_index / 4`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_value = ${x.getByOffset(`zero_point_index`)};`:c?`
                let zero_point_offset = ${b.indicesToOffset(`scale_indices`)};
                let zero_point_input = ${x.getByOffset(`zero_point_offset / 4`)};
                let zero_point_vec = ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices(`scale_indices`)};`:`let zero_point_value = ${c?i?`i32`:`u32`:y.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset(`global_idx`,`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/_/64),y:1,z:1},programUniforms:ee})}},El=(e,t)=>{wl(e.inputs,t),e.compute(Tl(e.inputs,t))},Dl=e=>z({axis:e.axis,blockSize:e.blockSize})}),kl,Al,jl,Ml=a(()=>{"use strict";Oe(),F(),J(),kl=(e,t,n)=>{if(e===t||e<t&&n<0||e>t&&n>0)throw Error(`Range these inputs' contents are invalid.`)},Al=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...U(a)];return{name:`Range`,shaderCache:{hint:`${r}`},getShaderSource:e=>{let t=q(`output`,r,a.length),n=t.type.value,i=[{name:`outputSize`,type:`u32`},{name:`start`,type:n},{name:`delta`,type:n}];return`
        ${e.registerUniforms(i).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        output[global_idx] = uniforms.start + ${n}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},jl=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),x.webgpu.validateInputContent&&kl(t,n,r),e.compute(Al(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Nl,Pl,Fl,Il,Ll=a(()=>{"use strict";F(),R(),B(),J(),Nl=(e,t,n,r)=>{if(e!==`none`&&r!==`i32`&&r!==`u32`&&r!==`f32`)throw Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case`none`:return`${t}=${n};`;case`add`:return r===`i32`||r===`u32`?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${i}bitcast<${r}>(oldValue) + (${n})${a}`;case`max`:return r===`i32`||r===`u32`?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case`min`:return r===`i32`||r===`u32`?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case`mul`:return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw Error(`Reduction ${e} is not supported.`)}},Pl=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=Math.ceil(L.sizeToDimension(r,r.length-1)/1),o=r[r.length-1],s=L.sizeFromDimension(n,o),c=[{type:12,data:a},{type:12,data:o},{type:12,data:s},...U(e[1].dims,e[2].dims,i)];return{name:`ScatterND`,shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:n=>{let r=K(`indices`,e[1].dataType,e[1].dims.length),a=K(`updates`,e[2].dataType,e[2].dims.length,1),o=t.reduction!==`none`&&t.reduction!==``?Dn(`output`,e[0].dataType,i.length):q(`output`,e[0].dataType,i.length,1);return`
      ${n.registerUniform(`output_size`,`u32`).registerUniform(`last_index_dimension`,`u32`).registerUniform(`num_updates_elements`,`u32`).declareVariables(r,a,o)}
      ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Nl(t.reduction,`output[data_offset + i]`,`value`,o.type.value)}
  }

      }`}}},Fl=e=>z({reduction:e.reduction}),Il=(e,t)=>{e.compute(Pl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl,Ql,$l,eu,tu,nu,ru,iu=a(()=>{"use strict";F(),R(),B(),J(),Rl=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error(`Resize requires scales input values to be positive`)})),e.length>0){if(t.mode===`linear`){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode===`cubic`&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw Error(`Resize requires scales input size to be 2 or 4 for cubic mode`)}},zl=(e,t,n)=>{t.every(e=>e>=0&&e<n||(()=>{throw Error(`Resize requires axes input values to be positive and less than rank`)}));let r=Array(n).fill(1);return t.forEach((t,n)=>r[t]=e[n]),r},Bl=(e,t,n,r,i,a)=>{let[o,s,c]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(e=>a.push(e));else if(t.coordinateTransformMode===`tf_crop_and_resize`)throw Error(`Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize`);if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(e=>r.push(e)),r.length!==0&&r.length!==l&&n>=18&&r.length!==t.axes.length)throw Error(`Resize requires scales input size to be same as input rank or axes size for opset 18 and up`);Rl(r,t),t.axes.length>0&&zl(r,t.axes,l).forEach((e,t)=>r[t]=e)}if(c>0&&e.length>c&&e[c].dims.length===1&&e[c].dims[0]>0&&(e[c].getBigInt64Array().forEach(e=>i.push(Number(e))),i.length!==0&&i.length!==l&&n>=18&&i.length!==t.axes.length))throw Error(`Resize requires sizes input size to be same as input rank or axes size for opset 18 and up`);if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw Error(`Resize requires "scales" input size to be of axes rank when axes attributes is specified`);if(i.length!==0&&i.length!==t.axes.length)throw Error(`Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified`)}if(typeof r<`u`&&typeof i<`u`&&r.length>0&&i.length>l)throw Error(`Resize requires only of scales or sizes to be specified`)},Vl=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Hl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case`asymmetric`:return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Vl(`xResized`,`lengthOriginal`,`lengthResized`,t)}
          }
        `;case`pytorch_half_pixel`:return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case`tf_half_pixel_for_nn`:return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case`align_corners`:return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Vl(`xResized`,`lengthOriginal - 1`,`lengthResized - 1`,t)}
                  }`;case`tf_crop_and_resize`:return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case`half_pixel_symmetric`:return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case`half_pixel`:return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+`}`,Ul=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case`round_prefer_ceil`:return`if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }`;case`floor`:return`return floor(xOriginal);`;case`ceil`:return`return ceil(xOriginal);`;case`round_prefer_floor`:return`if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }`;default:if(t<11)return`if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }`;throw Error(`Nearest mode ${e} is not supported`)}})()+`}`,Wl=(e,t,n)=>{let r=Array(n).fill(0).concat(Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((e,a)=>{r[e]=i[a],r[a+n]=i[t.length+a]}),r):i},Gl=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(e=>i.push(e)),Math.max(...r)>e.length)throw Error(`axes is out of bound`);r.forEach((e,t)=>i[e]=n[t])}else n.forEach(e=>i.push(e));else{if(t.length===0)throw Error(`Resize requires either scales or sizes.`);i=e.map((e,n)=>Math.round(e*t[n]))}return i},Kl=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case`not_larger`:return n.axes.length>0?Math.min(...n.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case`not_smaller`:return n.axes.length>0?Math.max(...n.axes.map(e=>t[e]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(e=>t[e]=r),n.axes.forEach(n=>i[n]=Math.round(e[n]*t[n]))):(t.fill(r,0,t.length),i.forEach((e,n)=>i[n]=Math.round(e*t[n]))),i},ql=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet(`output_indices`,`i`)};
        var scale = ${G(`uniforms.scales`,`i`,r)};
        var roi_low = ${G(`uniforms.roi`,`i`,i)};
        var roi_hi = ${G(`uniforms.roi`,`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${G(`uniforms.input_shape`,`i`,t.length)};
          var output_shape_i = ${G(`uniforms.output_shape`,`i`,n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Jl=(e,t,n,r,i,a,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet(`output_indices`,`i`)};
        var input_index: u32;
        var scale = ${G(`uniforms.scales`,`i`,i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${G(`uniforms.roi`,`i`,a)};
          var roi_hi = ${G(`uniforms.roi`,`i + ${n.length}`,a)};
          var input_shape_i = ${G(`uniforms.input_shape`,`i`,n.length)};
          var output_shape_i = ${G(`uniforms.output_shape`,`i`,r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet(`input_indices`,`i`,`input_index`)}
      }
      return input_indices;
    }`,Yl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet(`input_indices`,`i`)};
        if (input_index < 0 || input_index >= ${G(`uniforms.input_shape`,`i`,t.length)}) {
          return false;
        }
      }
      return true;
    }`,Xl=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet(`input_indices`,t,`channel`)};
    ${e.indicesSet(`input_indices`,n,`batch`)};
`:``,Zl=(e,t,n,r,i)=>{let[a,o,s,c]=n.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(col, ${n[s]} - 1))`)};
      ${Xl(e,c,a,2)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${o}];
      var col:${l} = originalIndices[${s}];
      ${r?`if (row < 0 || row > (${n[o]} - 1) || col < 0 || col > (${n[s]} - 1)) {
        return ${i};
      }`:``};
      row = max(0, min(row, ${n[o]} - 1));
      col = max(0, min(col, ${n[s]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${c}])`:`0`};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:`0`};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ql=(e,t,n,r,i,a,o,s,c,l)=>{let[u,d]=n.length===2?[0,1]:[2,3],f=e.type.value,p=o=>{let d=o===u?`row`:`col`;return`
      fn ${d}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet(`output_indices`,o)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[o]},
        ${r[o]}, ${n[o]}, ${a[o]}, ${a[o]} + ${n.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[o]} - 1))) {
          return ${c};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${d}: ${f} = originalIdx + ${f}(i);
          if (${d} < 0 || ${d} >= ${n[o]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${c};`:`${d} = max(0, min(${d}, ${n[o]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet(`input_indices_copy`,o,`u32(${d})`)};
          data[i + 1] = ${o===u?e.getByIndices(`input_indices_copy`):`rowCubicInterpolation(input_indices_copy, output_indices)`};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${p(u)};
    ${p(d)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},$l=(e,t,n,r,i)=>{let[a,o,s,c,l]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet(`input_indices`,c,`max(0, min(width, ${n[c]} - 1))`)};
      ${Xl(e,l,a,3)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${o}];
      var height:${u} = originalIndices[${s}];
      var width:${u} = originalIndices[${c}];
      ${r?`if (depth < 0 || depth > (${n[o]} - 1) || height < 0 || height > (${n[s]} - 1) || width < 0 || (width > ${n[c]} - 1)) {
      return ${i};
        }`:``};

    depth = max(0, min(depth, ${n[o]} - 1));
      height = max(0, min(height, ${n[s]} - 1));
      width = max(0, min(width, ${n[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${l}])`:`0`};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:`0`};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},eu=(e,t,n,r,i,a)=>{let o=e.dims,s=Wl(a,t.axes,o.length),c=Gl(o,r,i,t.axes),l=r.slice();r.length===0&&(l=o.map((e,t)=>e===0?1:c[t]/e),t.keepAspectRatioPolicy!==`stretch`&&(c=Kl(o,l,t)));let u=q(`output`,e.dataType,c.length),d=K(`input`,e.dataType,o.length),f=L.size(c),p=o.length===c.length&&o.every((e,t)=>e===c[t]),m=t.coordinateTransformMode===`tf_crop_and_resize`,h=t.extrapolationValue,g=d.type.value;return{name:`Resize`,shaderCache:{hint:`${t.cacheKey}|${n}|${l.length>0?t.mode===`cubic`?l:l.length:``}|${i.length>0?i:``}|${s.length>0?s:``}|${p}|${t.mode===`nearest`?o.length:o}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${p?``:`
      ${Hl(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case`nearest`:return`
              ${Yl(d,o)};
              ${Ul(t.nearestMode,n,g)};
              ${Jl(d,u,o,c,l.length,s.length,m)};
              `;case`linear`:return`
              ${ql(u,o,c,l.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Zl(d,u,o,m,h)}`;if(o.length===3||o.length===5)return`${$l(d,u,o,m,h)}`;throw Error(`Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.`)})()};
            `;case`cubic`:return`
            ${(()=>{if(o.length===2||o.length===4)return`${Ql(d,u,o,c,l,s,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error(`Cubic mode only supports input dims 2 and 4 are supported in linear mode.`)})()};
            `;default:throw Error(`Invalid resize mode`)}})()};
      `}
      ${e.registerUniform(`output_size`,`u32`).registerUniform(`scales`,`f32`,l.length).registerUniform(`roi`,`f32`,s.length).declareVariables(d,u)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
        ${p?`output[global_idx] = input[global_idx];`:`
        let output_indices = ${u.offsetToIndices(`global_idx`)};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(t.mode){case`nearest`:return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices(`input_indices`)};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case`linear`:return`output[global_idx] = ${o.length===2||o.length===4?`bilinearInterpolation`:`trilinearInterpolation`}(output_indices);`;case`cubic`:return`output[global_idx] = bicubicInterpolation(output_indices);`;default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`,getRunData:()=>({outputs:[{dims:c,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:s},...U(o,c)]})}},tu=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},nu=(e,t)=>{let n=[],r=[],i=[],a=tu(e);if(t.antialias!==0)throw Error(`Only default value (0) for Antialias attribute is supported`);Bl(e.inputs,t,a,n,r,i),e.compute(eu(e.inputs[0],t,a,n,r,i),{inputs:[0]})},ru=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,c=e.mode,l=e.nearestMode===``?`simple`:e.nearestMode;return z({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:c,nearestMode:l})}}),au,ou,su,cu=a(()=>{"use strict";F(),R(),J(),au=e=>{if(!e||e.length<3)throw Error(`layerNorm requires at least 3 inputs.`);let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw Error(`All inputs must have the same data type`);if(t.dims.length!==3&&t.dims.length!==2)throw Error(`Input must be 2D or 3D`);if(n.dims.length!==3&&n.dims.length!==2)throw Error(`Skip must be 2D or 3D`);let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw Error(`Skip must have the same hidden size as input`);if(n.dims[n.dims.length-2]!==a)throw Error(`Skip must have the same sequence length as input`);if(r.dims.length!==1)throw Error(`Gamma must be 1D`);if(r.dims[r.dims.length-1]!==i)throw Error(`Gamma must have the same hidden size as input`);if(e.length>3){let t=e[3];if(t.dims.length!==1)throw Error(`Beta must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Beta must have the same hidden size as input`)}if(e.length>4){let t=e[4];if(t.dims.length!==1)throw Error(`Bias must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Bias must have the same hidden size as input`)}},ou=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=L.size(a),s=a,c=o,l=a.slice(-1)[0],u=r?a.slice(0,-1).concat(1):[],d=!i&&e.length>3,f=e.length>4,p=r&&n>1,m=r&&n>2,h=n>3,g=W(l),_=[{type:12,data:c},{type:12,data:g},{type:12,data:l},{type:1,data:t.epsilon}],v=t=>{let n=[{name:`output_size`,type:`u32`},{name:`components`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`epsilon`,type:`f32`}],r=[K(`x`,e[0].dataType,e[0].dims,g),K(`skip`,e[1].dataType,e[1].dims,g),K(`gamma`,e[2].dataType,e[2].dims,g)];d&&r.push(K(`beta`,e[3].dataType,e[3].dims,g)),f&&r.push(K(`bias`,e[4].dataType,e[4].dims,g)),r.push(q(`output`,e[0].dataType,s,g)),p&&r.push(q(`mean_output`,1,u)),m&&r.push(q(`inv_std_output`,1,u)),h&&r.push(q(`input_skip_bias_sum`,e[0].dataType,s,g));let a=V(e[0].dataType),o=V(1,g);return`

      ${t.registerUniforms(n).declareVariables(...r)}
      var<workgroup> sum_shared : array<${o}, 64>;
      var<workgroup> sum_squared_shared : array<${o}, 64>;

      ${t.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?`bias[offset1d + i]`:a+`(0.0)`};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?`input_skip_bias_sum[offset + i] = value;`:``}
          output[offset + i] = value;
          let f32_value = ${wn(a,g,`value`)};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Tn(`sum`,g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Tn(`square_sum`,g)} / f32(uniforms.hidden_size) ${i?``:`- mean * mean`} + uniforms.epsilon);
        ${p?`mean_output[global_idx] = mean;`:``}
        ${m?`inv_std_output[global_idx] = inv_std_dev;`:``}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?``:`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${d?`+ beta[offset1d + i]`:``};
        }
      }`},y=[{dims:s,dataType:e[0].dataType}];return n>1&&y.push({dims:u,dataType:1}),n>2&&y.push({dims:u,dataType:1}),n>3&&y.push({dims:a,dataType:e[0].dataType}),{name:`SkipLayerNormalization`,shaderCache:{hint:`${g};${p};${m};${h}`,inputDependencies:e.map((e,t)=>`type`)},getShaderSource:v,getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(c/l)},programUniforms:_})}},su=(e,t)=>{au(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(ou(e.inputs,t,e.outputCount,!1),{outputs:n})}}),lu,uu,du,fu,pu,mu,hu,gu,_u=a(()=>{"use strict";F(),R(),B(),J(),lu=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error(`axes, starts and ends must have the same length`)}else if(t.starts.length!==t.ends.length)throw Error(`starts and ends must have the same length`);e.slice(1).forEach((t,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw Error(`Input ${n} must be an array of int32 or int64`)})},uu=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(e=>n.push(Number(e)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(e=>n.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return n},du=(e,t)=>{if(e.length>1){let t=uu(e,1),n=uu(e,2),r=uu(e,3);return r.length===0&&(r=[...Array(e[0].dims.length).keys()]),z({starts:t,ends:n,axes:r})}return t},fu=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},pu=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${G(`uniforms.input_shape`,`i`,n.length)};
            let steps_i = ${G(`uniforms.steps`,`i`,n.length)};
            let signs_i = ${G(`uniforms.signs`,`i`,n.length)};
            let starts_i = ${G(`uniforms.starts`,`i`,n.length)};
            var output_index = ${t.indicesGet(`output_indices`,`i`)};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet(`input_indices`,`i`,`input_index`)};
          }
          return input_indices;
      }`,mu=(e,t)=>{let n=e[0].dims,r=L.size(n),i=t.axes.length>0?L.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=uu(e,4);a.forEach(e=>e!==0||(()=>{throw Error(`step cannot be 0`)})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((e,t)=>fu(e,t,n,i,a)),s=t.ends.map((e,t)=>fu(e,t,n,i,a));if(i.length!==o.length||i.length!==s.length)throw Error(`start, ends and axes should have the same number of elements`);if(i.length!==n.length)for(let e=0;e<n.length;++e)i.includes(e)||(o.splice(e,0,0),s.splice(e,0,n[e]),a.splice(e,0,1));let c=a.map(e=>Math.sign(e));a.forEach((e,t,n)=>{if(e<0){let r=(s[t]-o[t])/e,i=o[t],c=i+r*a[t];o[t]=c,s[t]=i,n[t]=-e}});let l=n.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((s[e]-o[e])/a[e])});let u={dims:l,dataType:e[0].dataType},d=q(`output`,e[0].dataType,l.length),f=K(`input`,e[0].dataType,e[0].dims.length),p=L.size(l),m=[{name:`outputSize`,type:`u32`},{name:`starts`,type:`u32`,length:o.length},{name:`signs`,type:`i32`,length:c.length},{name:`steps`,type:`u32`,length:a.length}],h=[{type:12,data:p},{type:12,data:o},{type:6,data:c},{type:12,data:a},...U(e[0].dims,l)];return{name:`Slice`,shaderCache:{hint:`${c.length}_${o.length}_${a.length}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${e.registerUniforms(m).declareVariables(f,d)}
        ${pu(f,d,n)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
          let output_indices = ${d.offsetToIndices(`global_idx`)};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset(`global_idx`,f.getByIndices(`input_indices`))}
      }`,getRunData:()=>({outputs:[u],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},hu=(e,t)=>{lu(e.inputs,t);let n=du(e.inputs,t);e.compute(mu(e.inputs,n),{inputs:[0]})},gu=e=>{let t=e.starts,n=e.ends,r=e.axes;return z({starts:t,ends:n,axes:r})}}),vu,yu,bu,xu,Su=a(()=>{"use strict";F(),R(),B(),Bn(),J(),vu=e=>{if(!e||e.length!==1)throw Error(`Softmax op requires 1 input.`)},yu=(e,t)=>{let n=e.inputs[0],r=n.dims,i=L.size(r),a=r.length,o=L.normalizeAxis(t.axis,a),s=o<r.length-1,c,l=[];s?(l=Array.from({length:a},(e,t)=>t),l[o]=a-1,l[a-1]=o,c=e.compute(Ln(n,l),{inputs:[n],outputs:[-1]})[0]):c=n;let u=c.dims,d=u[a-1],f=i/d,p=W(d),m=d/p,h=64;f===1&&(h=256);let g=(e,t)=>t===4?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:t===2?`max(${e}.x, ${e}.y)`:t===3?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,_=K(`x`,c.dataType,c.dims,p),v=q(`result`,c.dataType,c.dims,p),y=_.type.value,b=V(c.dataType)===`f32`?`var threadMax = ${y}(-3.4028234663852886e+38f);`:`var threadMax = ${y}(-65504.0h);`,x=e.compute({name:`Softmax`,shaderCache:{hint:`${p};${h}`,inputDependencies:[`type`]},getRunData:()=>({outputs:[{dims:u,dataType:c.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:m}]}),getShaderSource:e=>`
      var<workgroup> rowMaxShared : ${y};
      var<workgroup> rowSumShared : ${y};
      var<workgroup> threadShared : array<${y}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${y} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${y}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform(`packedCols`,`i32`).declareVariables(_,v)}
      ${e.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${b}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${y}(${g(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${y}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${y}(${Tn(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${y}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`},{inputs:[c],outputs:[s?-1:0]})[0];s&&e.compute(Ln(x,l),{inputs:[x]})},bu=(e,t)=>{vu(e.inputs),yu(e,t)},xu=e=>z({axis:e.axis})}),Cu,wu,Tu,Eu,Du,Ou=a(()=>{"use strict";F(),R(),J(),Cu=e=>Array.from(e.getBigInt64Array(),Number),wu=e=>{if(!e||e.length!==2)throw Error(`Tile requires 2 inputs.`);if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw Error(`Tile only support float, float16, int32, and uint32 data types`);if(e[1].dataType!==7)throw Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw Error("Tile `repeats` input should be 1-D");if(Cu(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Tu=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Eu=(e,t)=>{let n=e[0].dims,r=t??Cu(e[1]),i=Tu(n,r),a=L.size(i),o=e[0].dataType,s=K(`input`,o,n.length),c=q(`output`,o,i.length);return{name:`Tile`,shaderCache:{hint:`${r}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...U(e[0].dims,i)]}),getShaderSource:e=>`
      const inputShape = ${s.indices(...n)};
      ${e.registerUniform(`output_size`,`u32`).declareVariables(s,c)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let output_indices = ${c.offsetToIndices(`global_idx`)};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet(`uniforms.input_shape`,`i`)};
        let input_dim_value = ${c.indicesGet(`output_indices`,`i`)}  % input_dim_i;

        ${s.indicesSet(`input_indices`,`i`,`input_dim_value`)}
      }
      ${c.setByOffset(`global_idx`,s.getByIndices(`input_indices`))}
    }`}},Du=e=>{wu(e.inputs),e.compute(Eu(e.inputs),{inputs:[0]})}}),ku,Au,ju,Mu=a(()=>{"use strict";F(),R(),J(),ku=(e,t,n,r,i)=>{let a=q(`output_data`,i,n.length,4),o=K(`a_data`,t[1].dataType,t[1].dims.length,4),s=K(`b_data`,t[2].dataType,t[2].dims.length,4),c=K(`c_data`,t[0].dataType,t[0].dims.length,4),l,u=(e,t,n)=>`select(${t}, ${e}, ${n})`;if(!r)l=a.setByOffset(`global_idx`,u(o.getByOffset(`global_idx`),s.getByOffset(`global_idx`),c.getByOffset(`global_idx`)));else{let e=(e,t,n=``)=>{let r=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${a.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_b${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_c${t} = ${c.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${n}(${u(r,i,l)});
          `};l=i===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`output_data[global_idx]`,0)}
            ${e(`output_data[global_idx]`,1)}
            ${e(`output_data[global_idx]`,2)}
            ${e(`output_data[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(c,o,s,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${l}
      }`},Au=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(L.areEqual(t,n)&&L.areEqual(n,r)),o=t,s=L.size(t);if(a){let e=zt.calcShape(zt.calcShape(t,n,!1),r,!1);if(!e)throw Error(`Can't perform where op on the given tensors`);o=e,s=L.size(o)}let c=Math.ceil(s/4);return{name:`Where`,shaderCache:{inputDependencies:[`rank`,`rank`,`rank`]},getShaderSource:t=>ku(t,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:c},...U(r,t,n,o)]})}},ju=e=>{e.compute(Au(e.inputs))}}),Nu,Pu=a(()=>{"use strict";Ir(),Gr(),Xr(),ei(),Xi(),ua(),_a(),uo(),Co(),Do(),No(),Zo(),ls(),hs(),vs(),Cs(),Ds(),Ms(),Ls(),Hs(),rc(),kc(),Pc(),Rc(),Vc(),qc(),dc(),rl(),Cl(),Ol(),Ml(),Ll(),jr(),iu(),Cc(),cu(),_u(),Su(),yc(),Ou(),Bn(),Ki(),Mu(),Nu=new Map([[`Abs`,[ni]],[`Acos`,[ri]],[`Acosh`,[ii]],[`Add`,[ea]],[`ArgMax`,[Pr,Fr]],[`ArgMin`,[Nr,Fr]],[`Asin`,[ai]],[`Asinh`,[oi]],[`Atan`,[si]],[`Atanh`,[ci]],[`Attention`,[Wr]],[`AveragePool`,[ml,pl]],[`BatchNormalization`,[Yr]],[`BiasAdd`,[$r]],[`BiasSplitGelu`,[Yi]],[`Cast`,[ui,li]],[`Ceil`,[pi]],[`Clip`,[fi]],[`Concat`,[ha,ga]],[`Conv`,[lo,ao]],[`ConvTranspose`,[So,vo]],[`Cos`,[mi]],[`Cosh`,[hi]],[`CumSum`,[To,Eo]],[`DepthToSpace`,[jo,Mo]],[`DequantizeLinear`,[El,Dl]],[`DFT`,[Yo,Xo]],[`Div`,[ta]],[`Einsum`,[ss,cs]],[`Elu`,[_i,gi]],[`Equal`,[na]],[`Erf`,[yi]],[`Exp`,[bi]],[`Expand`,[ms]],[`FastGelu`,[_s]],[`Floor`,[xi]],[`FusedConv`,[lo,ao]],[`Gather`,[Ss,xs]],[`GatherElements`,[Is,Fs]],[`GatherBlockQuantized`,[As,js]],[`GatherND`,[Ts,Es]],[`Gelu`,[Si]],[`Gemm`,[Vs,Bs]],[`GlobalAveragePool`,[_l,gl]],[`GlobalMaxPool`,[Sl,xl]],[`Greater`,[oa]],[`GreaterOrEqual`,[ca]],[`GridSample`,[tc,nc]],[`GroupQueryAttention`,[Oc]],[`HardSigmoid`,[Ai,ki]],[`HardSwish`,[ji]],[`InstanceNormalization`,[Nc]],[`LayerNormalization`,[Lc]],[`LeakyRelu`,[Ci,gi]],[`Less`,[sa]],[`LessOrEqual`,[la]],[`Log`,[Hi]],[`MatMul`,[Bc]],[`MatMulNBits`,[Gc,Kc]],[`MaxPool`,[yl,bl]],[`Mul`,[ra]],[`MultiHeadAttention`,[uc,oc]],[`Neg`,[Ti]],[`Not`,[wi]],[`Pad`,[nl]],[`Pow`,[ia]],[`QuickGelu`,[Gi,gi]],[`Range`,[jl]],[`Reciprocal`,[Ei]],[`ReduceMin`,[Er]],[`ReduceMean`,[Z]],[`ReduceMax`,[Tr]],[`ReduceSum`,[Or]],[`ReduceProd`,[Dr]],[`ReduceL1`,[Cr]],[`ReduceL2`,[Q]],[`ReduceLogSum`,[Ar]],[`ReduceLogSumExp`,[wr]],[`ReduceSumSquare`,[kr]],[`Relu`,[Di]],[`Resize`,[nu,ru]],[`RotaryEmbedding`,[Sc]],[`ScatterND`,[Il,Fl]],[`Sigmoid`,[Oi]],[`Sin`,[Mi]],[`Sinh`,[Ni]],[`Slice`,[hu,gu]],[`SkipLayerNormalization`,[su]],[`Split`,[_c,vc]],[`Sqrt`,[Pi]],[`Softmax`,[bu,xu]],[`Sub`,[aa]],[`Tan`,[Fi]],[`Tanh`,[Li]],[`ThresholdedRelu`,[Vi,gi]],[`Tile`,[Du]],[`Transpose`,[Rn,zn]],[`Where`,[ju]]])}),Fu,Iu=a(()=>{"use strict";Oe(),Lt(),J(),Fu=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){ge(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let e of t)s.push({binding:s.length,resource:{buffer:e.buffer}});for(let e of n)s.push({binding:s.length,resource:{buffer:e.buffer}});i&&s.push({binding:s.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus===`capturing`){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}o.setPipeline(e.computePipeline),o.setBindGroup(0,c),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType===`at-passes`)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),_e(e.programInfo.name)}dispose(){}build(e,t){ge(e.name);let n=this.backend.device,r=[];[{feature:`shader-f16`,extension:`f16`},{feature:`subgroups`,extension:`subgroups`}].forEach(e=>{n.features.has(e.feature)&&r.push(`enable ${e.extension};`)});let i=An(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});I(`verbose`,()=>`[WebGPU] ${e.name} shader code: ${o}`);let c=n.createComputePipeline({compute:{module:s,entryPoint:`main`},layout:`auto`,label:e.name});return _e(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e==`number`?e:e.x,n=typeof e==`number`?1:e.y||1,r=typeof e==`number`?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw Error(`Total dispatch size exceeds WebGPU maximum.`);return[o,o,o]}return[o,o,1]}}}),Lu={};o(Lu,{WebGpuBackend:()=>Vu});var Ru,zu,Bu,Vu,Hu=a(()=>{"use strict";Oe(),F(),Lt(),Gt(),yn(),Pu(),Iu(),Ru=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case`none`:n.push(``);break;case`type`:n.push(`${i}`);break;case`rank`:{let t=e[r].dims.length;n.push(`${i};${t}`);break}case`dims`:{let t=e[r].dims.join(`,`);n.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[r]}`)}}return n.join(`|`)},zu=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+=`[`+e.shaderCache.hint+`]`),r+=`:`+n+`:${Ru(t,e.shaderCache?.inputDependencies??Array(t.length).fill(`dims`))}`,r},Bu=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Vu=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus=`default`,this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw Error(`currentKernelCustomData(): currentKernelId is null. (should not happen)`);let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=e=>t.features.has(e)&&n.push(e)&&!0;i(`chromium-experimental-timestamp-query-inside-passes`)||i(`timestamp-query`),i(`shader-f16`),i(`subgroups`),this.device=await t.requestDevice(r);let a=t,o=t.info??(typeof a.requestAdapterInfo==`function`?await a.requestAdapterInfo():void 0);this.adapterInfo=new Bu(o),this.gpuDataManager=vn(this),this.programManager=new Fu(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ft(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<`u`&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||=this.device.createCommandEncoder(),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType===`at-passes`&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&=(this.computePassEncoder.end(),null)}flush(){if(!this.commandEncoder)return;ge(),this.endComputePass();let e;this.queryType!==`none`&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!==`none`&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let r=n[e],i=r.kernelId,a=this.kernels.get(i),o=a.kernelType,s=a.kernelName,c=r.programName,l=r.inputTensorViews,u=r.outputTensorViews,d=t[e*2],f=t[e*2+1];typeof this.queryTimeBase>`u`&&(this.queryTimeBase=d);let p=Number(d-this.queryTimeBase),m=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(p)||!Number.isSafeInteger(m))throw RangeError(`incorrect timestamp range`);if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:St(e.dataType)})),outputsMetadata:u.map(e=>({dims:e.dims,dataType:St(e.dataType)})),kernelId:i,kernelType:o,kernelName:s,programName:c,startTime:p,endTime:m});else{let e=``;l.forEach((t,n)=>{e+=`input[${n}]: [${t.dims}] | ${St(t.dataType)}, `});let t=``;u.forEach((e,n)=>{t+=`output[${n}]: [${e.dims}] | ${St(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${o}|${s}|${c}" ${e}${t}start time: ${p} ns, execution time: ${m-p} ns`)}me(`GPU`,`${c}::${d}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),_e()}run(e,t,n,r,i,a){ge(e.name);let o=[];for(let e=0;e<t.length;++e){let n=t[e].data;if(n===0)continue;let r=this.gpuDataManager.get(n);if(!r)throw Error(`no GPU data for input: ${n}`);o.push(r)}let{outputs:s,dispatchGroup:c,programUniforms:l}=e.getRunData(t),u=n.length===0?s.map((e,t)=>t):n;if(u.length!==s.length)throw Error(`Output size ${u.length} must be equal to ${s.length}.`);let d=[],f=[];for(let e=0;e<s.length;++e){if(!Number.isInteger(u[e])||u[e]<-3||u[e]>=a)throw Error(`Invalid output index: ${u[e]}`);if(u[e]===-3)continue;let t=u[e]===-1,n=u[e]===-2,o=t||n?i(s[e].dataType,s[e].dims):r(u[e],s[e].dataType,s[e].dims);if(d.push(o),o.data===0)continue;let c=this.gpuDataManager.get(o.data);if(!c)throw Error(`no GPU data for output: ${o.data}`);if(t&&this.temporaryData.push(c),n){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(c)}f.push(c)}if(o.length!==t.length||f.length!==d.length){if(f.length===0)return _e(e.name),d;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let p;if(l){let e=0,t=[];l.forEach(n=>{let r=typeof n.data==`number`?[n.data]:n.data;if(r.length===0)return;let i=n.type===10?2:4,a,o;n.type===10?(o=r.length>4?16:r.length>2?8:r.length*i,a=r.length>4?16:i*r.length):(o=r.length<=2?r.length*i:16,a=16),e=Math.ceil(e/o)*o,t.push(e);let s=n.type===10?8:4;e+=r.length>4?Math.ceil(r.length/s)*a:r.length*i}),e=Math.ceil(e/16)*16;let n=new ArrayBuffer(e);l.forEach((e,r)=>{let i=t[r],a=typeof e.data==`number`?[e.data]:e.data;if(e.type===6)new Int32Array(n,i,a.length).set(a);else if(e.type===12)new Uint32Array(n,i,a.length).set(a);else if(e.type===10)new Uint16Array(n,i,a.length).set(a);else if(e.type===1)new Float32Array(n,i,a.length).set(a);else throw Error(`Unsupported uniform type: ${St(e.type)}`)});let r=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(r.buffer,0,n,0,e),this.gpuDataManager.release(r.id),p={offset:0,size:e,buffer:r.buffer}}let m=this.programManager.normalizeDispatchGroupSize(c),h=m[1]===1&&m[2]===1,g=zu(e,t,h),_=this.programManager.getArtifact(g);if(_||(_=this.programManager.build(e,m),this.programManager.setArtifact(g,_),I(`info`,()=>`[artifact] key: ${g}, programName: ${e.name}`)),l&&_.uniformVariablesInfo){if(l.length!==_.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${l.length} in program "${_.programInfo.name}".`);for(let e=0;e<l.length;e++){let t=l[e],n=t.type,r=typeof t.data==`number`?1:t.data.length,[i,a]=_.uniformVariablesInfo[e];if(n!==i||r!==a)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${a}, got type ${n} with size ${r} in program "${_.programInfo.name}".`)}}if(I(`info`,()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!==`none`||this.sessionStatus===`capturing`){let e={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:d};this.pendingKernels.push(e),this.sessionStatus===`capturing`&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(_,o,f,m,p),_e(e.name),d}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=Nu.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&=(s[1]=s[0](s[1]),void 0),I(`info`,()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope(`validation`),o(t,s[1]),0}catch(e){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${e}`)),1}finally{c&&n.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${a}": ${e.message}`:null));for(let e of this.temporaryData)this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await gn(this,e,t);return Wt(r.buffer,n)}}writeTimestamp(e){this.queryType===`inside-passes`&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType=`none`,(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>`u`?this.env.wasm.trace:this.env.trace))&&(this.device.features.has(`chromium-experimental-timestamp-query-inside-passes`)?this.queryType=`inside-passes`:this.device.features.has(`timestamp-query`)&&(this.queryType=`at-passes`),this.queryType!==`none`&&typeof this.querySet>`u`&&(this.querySet=this.device.createQuerySet({type:`timestamp`,count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){I(`info`,`captureBegin`),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus=`capturing`}captureEnd(){I(`info`,`captureEnd`),this.flush(),this.sessionStatus=`default`}replay(){I(`info`,`replay`),this.sessionStatus=`replaying`;let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let n=this.getComputePassEncoder(),i=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(i.computePipeline),n.setBindGroup(0,i.bindGroup),n.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!==`none`&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType===`at-passes`)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus=`default`}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Uu={};o(Uu,{init:()=>Ku});var Wu,Gu,Ku,qu=a(()=>{"use strict";F(),Lt(),R(),cn(),Wu=class e{constructor(e,t,n,r){this.module=e,this.dataType=t,this.data=n,this.dims=r}getFloat32Array(){if(this.dataType!==1)throw Error(`Invalid data type`);let e=L.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw Error(`Invalid data type`);let e=L.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw Error(`Invalid data type`);let e=L.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw Error(`Invalid data type`);let e=L.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(L.size(t)!==L.size(this.dims))throw Error(`Invalid new shape`);return new e(this.module,this.dataType,this.data,t)}},Gu=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?`i32`:`i64`;this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,`*`)),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let t=0;t<o;t++){let t=Number(e.getValue(r*i++,a)),n=Number(e.getValue(r*i++,`*`)),o=Number(e.getValue(r*i++,a)),c=[];for(let t=0;t<o;t++)c.push(Number(e.getValue(r*i++,a)));s.push(new Wu(e,t,n,c))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(e=>typeof e==`number`?this.inputs[e]:e)??this.inputs,r=t?.outputs??[];return this.backend.run(e,n,r,(e,t,n)=>new Wu(this.module,t,this.output(e,n),n),(e,t)=>{let n=Ct(e,t);if(!n)throw Error(`Unsupported data type: ${e}`);let r=n>0?this.backend.gpuDataManager.create(n).id:0;return new Wu(this.module,e,r,t)},this.outputCount)}output(e,t){let n=this.module.stackSave();try{let n=this.module.PTR_SIZE,r=n===4?`i32`:`i64`,i=this.module.stackAlloc((1+t.length)*n);this.module.setValue(i,t.length,r);for(let e=0;e<t.length;e++)this.module.setValue(i+n*(e+1),t[e],r);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(n){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(n)}}},Ku=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw Error(`Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.`);if(e===`webgpu`){let e=(Hu(),c(Lu)).WebGpuBackend,a=new e;await a.initialize(n,r),i(`webgpu`,[a,e=>a.alloc(Number(e)),e=>a.free(e),(e,n,r,i=!1)=>{if(i)I(`verbose`,()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(e)}, dst=${Number(n)}, size=${Number(r)}`),a.memcpy(Number(e),Number(n));else{I(`verbose`,()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(e)}, gpuDataId=${Number(n)}, size=${Number(r)}`);let i=t.HEAPU8.subarray(Number(e>>>0),Number(e>>>0)+Number(r));a.upload(Number(n),i)}},async(e,n,r)=>{I(`verbose`,()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${e}, dataOffset=${n}, size=${r}`),await a.download(Number(e),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+r)>>>0))},(e,n,r)=>a.createKernel(e,Number(n),r,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),e=>a.releaseKernel(e),(e,n,r,i)=>{I(`verbose`,()=>`[WebGPU] jsepRun: sessionHandle=${r}, kernel=${e}, contextDataOffset=${n}`);let o=new Gu(t,a,Number(n));return a.computeKernel(Number(e),o,i)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let e=new sn(n);i(`webnn`,[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,n,r,i,a)=>e.ensureTensor(t,n,r,i,a),(t,n)=>{e.uploadTensor(t,n)},async(t,n)=>e.downloadTensor(t,n),(t,n)=>e.registerMLContext(t,n),!!n.trace])}}}),Ju,Yu,Xu,Zu,Qu,$u,ed,td,nd,rd,id,ad,od,sd=a(()=>{"use strict";Oe(),pt(),bt(),F(),ct(),dt(),At(),Ju=(e,t)=>{N()._OrtInit(e,t)!==0&&P(`Can't initialize onnxruntime.`)},Yu=async e=>{Ju(e.wasm.numThreads,Tt(e.logLevel))},Xu=async(e,t)=>{N().asyncInit?.();let n=e.webgpu.adapter;if(t===`webgpu`){if(typeof navigator>`u`||!navigator.gpu)throw Error(`WebGPU is not supported in current environment`);if(n){if(typeof n.limits!=`object`||typeof n.features!=`object`||typeof n.requestDevice!=`function`)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(t!==void 0&&t!==`low-power`&&t!==`high-performance`)throw Error(`Invalid powerPreference setting: "${t}"`);let r=e.webgpu.forceFallbackAdapter;if(r!==void 0&&typeof r!=`boolean`)throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:r}),!n)throw Error(`Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.`)}}if(t===`webnn`&&(typeof navigator>`u`||!navigator.ml))throw Error(`WebNN is not supported in current environment`);{let r=(qu(),c(Uu)).init;t===`webgpu`&&await r(`webgpu`,N(),e,n),t===`webnn`&&await r(`webnn`,N(),e)}},Zu=new Map,Qu=e=>{let t=N(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,r,r+n)!==0&&P(`Can't get session input/output count.`);let i=n===4?`i32`:`i64`;return[Number(t.getValue(r,i)),Number(t.getValue(r+n,i))]}finally{t.stackRestore(n)}},$u=(e,t)=>{let n=N(),r=n.stackSave(),i=0;try{let r=n.PTR_SIZE,a=n.stackAlloc(2*r);n._OrtGetInputOutputMetadata(e,t,a,a+r)!==0&&P(`Can't get session input/output metadata.`);let o=Number(n.getValue(a,`*`));i=Number(n.getValue(a+r,`*`));let s=n.HEAP32[i/4];if(s===0)return[o,0];let c=n.HEAPU32[i/4+1],l=[];for(let e=0;e<c;e++){let t=Number(n.getValue(i+8+e*r,`*`));l.push(t===0?Number(n.getValue(i+8+(e+c)*r,`*`)):n.UTF8ToString(t))}return[o,s,l]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},ed=e=>{let t=N(),n=t._malloc(e.byteLength);if(n===0)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},td=async(e,t)=>{let n,r,i=N();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=ed(e);let a=0,o=0,s=0,c=[],l=[],u=[];try{if([o,c]=await yt(t),t?.externalData&&i.mountExternalData){let e=[];for(let n of t.externalData){let t=typeof n==`string`?n:n.path,r=typeof n==`string`?n:n.data;e.push(kt(r).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if((typeof e==`string`?e:e.name)===`webnn`){if(i.shouldTransferToMLTensor=!1,typeof e!=`string`){let t=e,n=t?.context,r=t?.gpuDevice,a=t?.deviceType,o=t?.powerPreference;i.currentContext=n||(r?await i.webnnCreateMLContext(r):await i.webnnCreateMLContext({deviceType:a,powerPreference:o}))}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),i.webgpuOnCreateSession?.(a),a===0&&P(`Can't create a session.`),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,d]=Qu(a),f=!!t?.enableGraphCapture,p=[],m=[],h=[],g=[],_=[];for(let t=0;t<e;t++){let[e,n,r]=$u(a,t);e===0&&P(`Can't get an input name.`),l.push(e);let o=i.UTF8ToString(e);p.push(o),h.push(n===0?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:St(n),shape:r})}for(let n=0;n<d;n++){let[r,o,s]=$u(a,n+e);r===0&&P(`Can't get an output name.`),u.push(r);let c=i.UTF8ToString(r);m.push(c),g.push(o===0?{name:c,isTensor:!1}:{name:c,isTensor:!0,type:St(o),shape:s});{if(f&&t?.preferredOutputLocation===void 0){_.push(`gpu-buffer`);continue}let e=typeof t?.preferredOutputLocation==`string`?t.preferredOutputLocation:t?.preferredOutputLocation?.[c]??`cpu`,n=i.webnnIsGraphOutput;if(e===`cpu`&&n&&n(a,c)){_.push(`ml-tensor-cpu-output`);continue}if(e!==`cpu`&&e!==`cpu-pinned`&&e!==`gpu-buffer`&&e!==`ml-tensor`)throw Error(`Not supported preferred output location: ${e}.`);if(f&&e!==`gpu-buffer`)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let v=null;return _.some(e=>e===`gpu-buffer`||e===`ml-tensor`||e===`ml-tensor-cpu-output`)&&(s=i._OrtCreateBinding(a),s===0&&P(`Can't create IO binding.`),v={handle:s,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>e===`ml-tensor-cpu-output`?`ml-tensor`:e).map(e=>Ot(e))}),Zu.set(a,[a,l,u,v,f,!1]),[a,p,m,h,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),u.forEach(e=>i._OrtFree(e)),s!==0&&i._OrtReleaseBinding(s)!==0&&P(`Can't release IO binding.`),a!==0&&i._OrtReleaseSession(a)!==0&&P(`Can't release session.`),e}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&P(`Can't release session options.`),c.forEach(e=>i._free(e)),i.unmountExternalData?.()}},nd=e=>{let t=N(),n=Zu.get(e);if(!n)throw Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&P(`Can't clear bound outputs.`),t._OrtReleaseBinding(o.handle)!==0&&P(`Can't release IO binding.`)),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),a.forEach(e=>t._OrtFree(e)),t._OrtReleaseSession(r)!==0&&P(`Can't release session.`),Zu.delete(e)},rd=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=N(),c=s.PTR_SIZE,l=e[0],u=e[1],d=e[3],f=d,p,m;if(l===`string`&&(d===`gpu-buffer`||d===`ml-tensor`))throw Error(`String tensor is not supported on GPU.`);if(o&&d!==`gpu-buffer`)throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(d===`gpu-buffer`){let t=e[2].gpuBuffer;m=Ct(xt(l),u);{let e=s.jsepRegisterBuffer;if(!e)throw Error(`Tensor location "gpu-buffer" is not supported without using WebGPU.`);p=e(r,a,t,m)}}else if(d===`ml-tensor`){let t=e[2].mlTensor;m=Ct(xt(l),u);let n=s.webnnRegisterMLTensor;if(!n)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);p=n(r,t,xt(l),u)}else{let t=e[2];if(Array.isArray(t)){m=c*t.length,p=s._malloc(m),n.push(p);for(let e=0;e<t.length;e++){if(typeof t[e]!=`string`)throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(p+e*c,lt(t[e],n),`*`)}}else{let e=s.webnnIsGraphInput,a=s.webnnIsGraphOutput;if(l!==`string`&&e&&a){let o=s.UTF8ToString(i);if(e(r,o)||a(r,o)){let e=xt(l);m=Ct(e,u),f=`ml-tensor`;let n=s.webnnCreateTemporaryTensor,i=s.webnnUploadTensor;if(!n||!i)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);let a=await n(r,e,u);i(a,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),p=a}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}}let h=s.stackSave(),g=s.stackAlloc(4*u.length);try{u.forEach((e,t)=>s.setValue(g+t*c,e,c===4?`i32`:`i64`));let e=s._OrtCreateTensor(xt(l),p,m,g,u.length,Ot(f));e===0&&P(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(e)}finally{s.stackRestore(h)}},id=async(e,t,n,r,i,a)=>{let o=N(),s=o.PTR_SIZE,c=Zu.get(e);if(!c)throw Error(`cannot run inference. invalid session id: ${e}`);let l=c[0],u=c[1],d=c[2],f=c[3],p=c[4],m=c[5],h=t.length,g=r.length,_=0,v=[],y=[],b=[],x=[],S=[],C=o.stackSave(),w=o.stackAlloc(h*s),ee=o.stackAlloc(h*s),T=o.stackAlloc(g*s),E=o.stackAlloc(g*s);try{[_,v]=ft(a),ve(`wasm prepareInputOutputTensor`);for(let r=0;r<h;r++)await rd(n[r],y,x,e,u[t[r]],t[r],p);for(let t=0;t<g;t++)await rd(i[t],b,x,e,d[r[t]],h+r[t],p);j(`wasm prepareInputOutputTensor`);for(let e=0;e<h;e++)o.setValue(w+e*s,y[e],`*`),o.setValue(ee+e*s,u[t[e]],`*`);for(let e=0;e<g;e++)o.setValue(T+e*s,b[e],`*`),o.setValue(E+e*s,d[r[e]],`*`);if(f&&!m){let{handle:n,outputPreferredLocations:a,outputPreferredLocationsEncoded:s}=f;if(u.length!==h)throw Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${u.length}).`);ve(`wasm bindInputsOutputs`);for(let r=0;r<h;r++){let i=t[r];await o._OrtBindInput(n,u[i],y[r])!==0&&P(`Can't bind input[${r}] for session=${e}.`)}for(let t=0;t<g;t++){let c=r[t];i[t]?.[3]?(S.push(b[t]),o._OrtBindOutput(n,d[c],b[t],0)!==0&&P(`Can't bind pre-allocated output[${t}] for session=${e}.`)):o._OrtBindOutput(n,d[c],0,s[c])!==0&&P(`Can't bind output[${t}] to ${a[t]} for session=${e}.`)}j(`wasm bindInputsOutputs`),Zu.set(e,[l,u,d,f,p,!0])}o.jsepOnRunStart?.(l),o.webnnOnRunStart?.(l);let c;c=f?await o._OrtRunWithBinding(l,f.handle,g,T,_):await o._OrtRun(l,ee,w,h,E,g,T,_),c!==0&&P(`failed to call OrtRun().`);let C=[],D=[];ve(`wasm ProcessOutputTensor`);for(let t=0;t<g;t++){let n=Number(o.getValue(T+t*s,`*`));if(n===b[t]||S.includes(b[t])){C.push(i[t]),n!==b[t]&&o._OrtReleaseTensor(n)!==0&&P(`Can't release tensor.`);continue}let a=o.stackSave(),c=o.stackAlloc(4*s),l=!1,u,d=0;try{o._OrtGetTensorData(n,c,c+s,c+2*s,c+3*s)!==0&&P(`Can't access output tensor data on index ${t}.`);let i=s===4?`i32`:`i64`,a=Number(o.getValue(c,i));d=o.getValue(c+s,`*`);let p=o.getValue(c+s*2,`*`),m=Number(o.getValue(c+s*3,i)),h=[];for(let e=0;e<m;e++)h.push(Number(o.getValue(p+e*s,i)));o._OrtFree(p)!==0&&P(`Can't free memory for tensor dims.`);let g=h.reduce((e,t)=>e*t,1);u=St(a);let _=f?.outputPreferredLocations[r[t]];if(u===`string`){if(_===`gpu-buffer`||_===`ml-tensor`)throw Error(`String tensor is not supported on GPU.`);let e=[];for(let t=0;t<g;t++){let n=o.getValue(d+t*s,`*`),r=o.getValue(d+(t+1)*s,`*`),i=t===g-1?void 0:r-n;e.push(o.UTF8ToString(n,i))}C.push([u,h,e,`cpu`])}else if(_===`gpu-buffer`&&g>0){let e=o.jsepGetBuffer;if(!e)throw Error(`preferredLocation "gpu-buffer" is not supported without using WebGPU.`);let t=e(d),r=Ct(a,g);if(r===void 0||!Et(u))throw Error(`Unsupported data type: ${u}`);l=!0,C.push([u,h,{gpuBuffer:t,download:o.jsepCreateDownloader(t,r,u),dispose:()=>{o._OrtReleaseTensor(n)!==0&&P(`Can't release tensor.`)}},`gpu-buffer`])}else if(_===`ml-tensor`&&g>0){let t=o.webnnEnsureTensor,r=o.webnnIsGraphInputOutputTypeSupported;if(!t||!r)throw Error(`preferredLocation "ml-tensor" is not supported without using WebNN.`);if(Ct(a,g)===void 0||!Dt(u))throw Error(`Unsupported data type: ${u}`);if(!r(e,u,!1))throw Error(`preferredLocation "ml-tensor" for ${u} output is not supported by current WebNN Context.`);let i=await t(e,d,a,h,!1);l=!0,C.push([u,h,{mlTensor:i,download:o.webnnCreateMLTensorDownloader(d,u),dispose:()=>{o.webnnReleaseTensorId(d),o._OrtReleaseTensor(n)}},`ml-tensor`])}else if(_===`ml-tensor-cpu-output`&&g>0){let e=o.webnnCreateMLTensorDownloader(d,u)(),t=C.length;l=!0,D.push((async()=>{let r=[t,await e];return o.webnnReleaseTensorId(d),o._OrtReleaseTensor(n),r})()),C.push([u,h,[],`cpu`])}else{let e=new(wt(u))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(o.HEAPU8.subarray(d,d+e.byteLength)),C.push([u,h,e,`cpu`])}}finally{o.stackRestore(a),u===`string`&&d&&o._free(d),l||o._OrtReleaseTensor(n)}}f&&!p&&(o._OrtClearBoundOutputs(f.handle)!==0&&P(`Can't clear bound outputs.`),Zu.set(e,[l,u,d,f,p,!1]));for(let[e,t]of await Promise.all(D))C[e][2]=t;return j(`wasm ProcessOutputTensor`),C}finally{o.webnnOnRunEnd?.(l),o.stackRestore(C),y.forEach(e=>o._OrtReleaseTensor(e)),b.forEach(e=>o._OrtReleaseTensor(e)),x.forEach(e=>o._free(e)),_!==0&&o._OrtReleaseRunOptions(_),v.forEach(e=>o._free(e))}},ad=e=>{let t=N(),n=Zu.get(e);if(!n)throw Error(`invalid session id`);let r=n[0],i=t._OrtEndProfiling(r);i===0&&P(`Can't get an profile file name.`),t._OrtFree(i)},od=e=>{let t=[];for(let n of e){let e=n[2];!Array.isArray(e)&&`buffer`in e&&t.push(e.buffer)}return t}}),cd,ld,ud,dd,fd,pd,md,hd,gd,_d,vd,yd,bd,xd,Sd,Cd,wd,Td,Ed=a(()=>{"use strict";Oe(),sd(),ct(),$e(),cd=()=>!!x.wasm.proxy&&typeof document<`u`,ud=!1,dd=!1,fd=!1,hd=new Map,gd=(e,t)=>{let n=hd.get(e);n?n.push(t):hd.set(e,[t])},_d=()=>{if(ud||!dd||fd||!ld)throw Error(`worker not ready`)},vd=e=>{switch(e.data.type){case`init-wasm`:ud=!1,e.data.err?(fd=!0,md[1](e.data.err)):(dd=!0,md[0]()),pd&&=(URL.revokeObjectURL(pd),void 0);break;case`init-ep`:case`copy-from`:case`create`:case`release`:case`run`:case`end-profiling`:{let t=hd.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},yd=async()=>{if(!dd){if(ud)throw Error(`multiple calls to 'initWasm()' detected.`);if(fd)throw Error(`previous call to 'initWasm()' failed.`);if(ud=!0,cd())return new Promise((e,t)=>{ld?.terminate(),Ze().then(([n,r])=>{try{ld=r,ld.onerror=e=>t(e),ld.onmessage=vd,md=[e,t];let i={type:`init-wasm`,in:x};!i.in.wasm.wasmPaths&&(n||Ve)&&(i.in.wasm.wasmPaths={wasm:new URL(`/procrument-nusa/assets/ort-wasm-simd-threaded.jsep-D-icqfN-.wasm`,``+self.location.href).href}),ld.postMessage(i),pd=n}catch(e){t(e)}},t)});try{await st(x.wasm),await Yu(x),dd=!0}catch(e){throw fd=!0,e}finally{ud=!1}}},bd=async e=>{if(cd())return _d(),new Promise((t,n)=>{gd(`init-ep`,[t,n]);let r={type:`init-ep`,in:{epName:e,env:x}};ld.postMessage(r)});await Xu(x,e)},xd=async e=>cd()?(_d(),new Promise((t,n)=>{gd(`copy-from`,[t,n]);let r={type:`copy-from`,in:{buffer:e}};ld.postMessage(r,[e.buffer])})):ed(e),Sd=async(e,t)=>{if(cd()){if(t?.preferredOutputLocation)throw Error(`session option "preferredOutputLocation" is not supported for proxy.`);return _d(),new Promise((n,r)=>{gd(`create`,[n,r]);let i={type:`create`,in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),ld.postMessage(i,a)})}return td(e,t)},Cd=async e=>{if(cd())return _d(),new Promise((t,n)=>{gd(`release`,[t,n]);let r={type:`release`,in:e};ld.postMessage(r)});nd(e)},wd=async(e,t,n,r,i,a)=>{if(cd()){if(n.some(e=>e[3]!==`cpu`))throw Error(`input tensor on GPU is not supported for proxy.`);if(i.some(e=>e))throw Error(`pre-allocated output tensor is not supported for proxy.`);return _d(),new Promise((i,o)=>{gd(`run`,[i,o]);let s=n,c={type:`run`,in:{sessionId:e,inputIndices:t,inputs:s,outputIndices:r,options:a}};ld.postMessage(c,od(s))})}return id(e,t,n,r,i,a)},Td=async e=>{if(cd())return _d(),new Promise((t,n)=>{gd(`end-profiling`,[t,n]);let r={type:`end-profiling`,in:e};ld.postMessage(r)});ad(e)}}),Dd,Od,kd,Ad=a(()=>{"use strict";Oe(),Ed(),F(),ke(),At(),Dd=(e,t)=>{switch(e.location){case`cpu`:return[e.type,e.dims,e.data,`cpu`];case`gpu-buffer`:return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},`gpu-buffer`];case`ml-tensor`:return[e.type,e.dims,{mlTensor:e.mlTensor},`ml-tensor`];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},Od=e=>{switch(e[3]){case`cpu`:return new fe(e[0],e[2],e[1]);case`gpu-buffer`:{let t=e[0];if(!Et(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return fe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case`ml-tensor`:{let t=e[0];if(!Dt(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return fe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},kd=class{async fetchModelAndCopyToWasmMemory(e){return xd(await kt(e))}async loadModel(e,t){ge();let n;n=typeof e==`string`?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Sd(n,t),_e()}async dispose(){return Cd(this.sessionId)}async run(e,t,n){ge();let r=[],i=[];Object.entries(e).forEach(e=>{let t=e[0],n=e[1],a=this.inputNames.indexOf(t);if(a===-1)throw Error(`invalid input '${t}'`);r.push(n),i.push(a)});let a=[],o=[];Object.entries(t).forEach(e=>{let t=e[0],n=e[1],r=this.outputNames.indexOf(t);if(r===-1)throw Error(`invalid output '${t}'`);a.push(n),o.push(r)});let s=r.map((e,t)=>Dd(e,()=>`input "${this.inputNames[i[t]]}"`)),c=a.map((e,t)=>e?Dd(e,()=>`output "${this.outputNames[o[t]]}"`):null),l=await wd(this.sessionId,i,s,o,c,n),u={};for(let e=0;e<l.length;e++)u[this.outputNames[o[e]]]=a[e]??Od(l[e]);return _e(),u}startProfiling(){}endProfiling(){Td(this.sessionId)}}}),jd={};o(jd,{OnnxruntimeWebAssemblyBackend:()=>Nd,initializeFlags:()=>Md,wasmBackend:()=>Pd});var Md,Nd,Pd,Fd=a(()=>{"use strict";Oe(),Ed(),Ad(),Md=()=>{(typeof x.wasm.initTimeout!=`number`||x.wasm.initTimeout<0)&&(x.wasm.initTimeout=0);let e=x.wasm.simd;if(typeof e!=`boolean`&&e!==void 0&&e!==`fixed`&&e!==`relaxed`&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),x.wasm.simd=!1),typeof x.wasm.proxy!=`boolean`&&(x.wasm.proxy=!1),typeof x.wasm.trace!=`boolean`&&(x.wasm.trace=!1),typeof x.wasm.numThreads!=`number`||!Number.isInteger(x.wasm.numThreads)||x.wasm.numThreads<=0)if(typeof self<`u`&&!self.crossOriginIsolated)x.wasm.numThreads=1;else{let e=typeof navigator>`u`?i(`node:os`).cpus().length:navigator.hardwareConcurrency;x.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},Nd=class{async init(e){Md(),await yd(),await bd(e)}async createInferenceSessionHandler(e,t){let n=new kd;return await n.loadModel(e,t),n}},Pd=new Nd});Oe(),Oe(),Oe();var Id=`1.29.0`;{let e=(Fd(),c(jd)).wasmBackend;d(`webgpu`,e,5),d(`webnn`,e,5),d(`cpu`,e,10),d(`wasm`,e,10)}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
Object.defineProperty(x.versions,"web",{value:Id,enumerable:!0}),x.wasm.wasmPaths=`https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/`,x.wasm.numThreads=1;let Ld=null,Rd=`wasm`;self.onmessage=async e=>{let t=e.data;if(t.type===`init`)try{let e=await fetch(t.modelUrl),n=new Uint8Array(await e.arrayBuffer());try{Ld=await Se.create(n,{executionProviders:[`wasm`],graphOptimizationLevel:`all`}),Rd=`wasm`,console.log(`[ortWorker] SwinIR session aktif: wasm`),console.log(`[ortWorker] Input: ${Ld.inputNames} | Output: ${Ld.outputNames}`)}catch(e){throw console.error(`[ortWorker] Gagal buat session WASM:`,e.message),e}self.postMessage({type:`ready`,provider:Rd})}catch(e){self.postMessage({type:`error`,message:e.message})}if(t.type===`inference`&&Ld)try{let e=new fe(`float32`,new Float32Array(t.tensorData),t.dims),n=Ld.inputNames[0],r={[n]:e};console.log(`[ortWorker] SwinIR inference — input: ${n}, dims: ${t.dims}`);let i=(await Ld.run(r))[Ld.outputNames[0]];console.log(`[ortWorker] SwinIR output — dims: ${i.dims}`),self.postMessage({type:`result`,tensorData:i.data,dims:i.dims},[i.data.buffer])}catch(e){console.error(`[ortWorker] SwinIR inference error:`,e.message),self.postMessage({type:`error`,message:e.message})}}})();