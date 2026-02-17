(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();class Fg{constructor(t){this.dictionary=[],this.topK=t.topK||10}async loadDictFromContent(t,r){if(t.includes("<html")||t.includes("<!DOCTYPE"))throw console.error(`字典内容非法 (HTML): ${r}`,t.substring(0,200)),new Error(`字典加载失败：路径 "${r}" 返回了 HTML 页面而非文本。请检查路径配置是否指向了正确的 .txt 文件。`);this.dictionary=["",...t.split(/\r?\n/)]}getPreprocessingCanvas(t){const r=this.getBoundingBox(t),i=48,a=128,n=document.createElement("canvas");n.width=a,n.height=i;const s=n.getContext("2d");if(s.fillStyle="rgb(128, 128, 128)",s.fillRect(0,0,a,i),r){const f=i-12,g=f/r.h,y=r.w*g,_=f,$=(a-y)/2;s.drawImage(t,r.x,r.y,r.w,r.h,$,6,y,_)}const u=s.getImageData(0,0,a,i),{data:l}=u,p=new Float32Array(3*i*a);for(let h=0;h<i*a;h++){const f=l[h*4]/255,g=l[h*4+1]/255,y=l[h*4+2]/255;p[h]=(y-.5)/.5,p[i*a+h]=(g-.5)/.5,p[2*i*a+h]=(f-.5)/.5}return{data:p,width:a,height:i}}getBoundingBox(t){const a=t.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,t.width,t.height).data;let n=t.width,s=t.height,u=0,l=0,p=!1;for(let h=0;h<t.height;h+=2)for(let f=0;f<t.width;f+=2)a[(h*t.width+f)*4+3]>0&&(f<n&&(n=f),f>u&&(u=f),h<s&&(s=h),h>l&&(l=h),p=!0);return p?{x:n,y:s,w:u-n+1,h:l-s+1}:null}postProcess(t,r){const[i,a,n]=r;let s=-1,u=-1;for(let p=0;p<a;p++){const f=1-t[p*n+0];f>u&&(u=f,s=p)}if(s===-1||u<.001)return{candidates:[]};const l=t.slice(s*n,(s+1)*n);return{candidates:Array.from(l).map((p,h)=>({index:h,prob:p})).filter(p=>p.index!==0).sort((p,h)=>h.prob-p.prob).slice(0,this.topK).map(p=>({character:this.dictionary[p.index]||"?",score:p.prob/u}))}}}var qa=Object.defineProperty,jg=Object.getOwnPropertyDescriptor,Kg=Object.getOwnPropertyNames,Qg=Object.prototype.hasOwnProperty,Zg=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),U=(e,t)=>()=>(e&&(t=e(e=0)),t),Ft=(e,t)=>{for(var r in t)qa(e,r,{get:t[r],enumerable:!0})},Yg=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Kg(t))!Qg.call(e,a)&&a!==r&&qa(e,a,{get:()=>t[a],enumerable:!(i=jg(t,a))||i.enumerable});return e},hr=e=>Yg(qa({},"__esModule",{value:!0}),e),Yt,mt,Lt,po,Hd,Fd=U(()=>{Yt=new Map,mt=[],Lt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Yt.get(e);if(i===void 0)Yt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=mt.indexOf(e);a!==-1&&mt.splice(a,1);for(let n=0;n<mt.length;n++)if(Yt.get(mt[n]).priority<=r){mt.splice(n,0,e);return}mt.push(e)}return}throw new TypeError("not a valid backend")},po=async e=>{let t=Yt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Hd=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?mt:r,a,n=[],s=new Set;for(let l of i){let p=await po(l);typeof p=="string"?n.push({name:l,err:p}):(a||(a=p),a===p&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of n)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),Xg=U(()=>{Fd()}),jd,Jg=U(()=>{jd="1.24.1"}),Ii,Ie,Kd=U(()=>{Jg(),Ii="warning",Ie={wasm:{},webgl:{},webgpu:{},versions:{common:jd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ii=e}},get logLevel(){return Ii}},Object.defineProperty(Ie,"logLevel",{enumerable:!0})}),ge,ey=U(()=>{Kd(),ge=Ie}),Qd,Zd,ty=U(()=>{Qd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let h=n*a,f=0,g=h,y=h*2,_=-1;s==="RGBA"?(f=0,g=h,y=h*2,_=h*3):s==="RGB"?(f=0,g=h,y=h*2):s==="RBG"&&(f=0,y=h,g=h*2);for(let $=0;$<n;$++)for(let T=0;T<a;T++){let x=(e.data[f++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],I=(e.data[y++]-p[2])*l[2],S=_===-1?255:(e.data[_++]-p[3])*l[3];i.fillStyle="rgba("+x+","+w+","+I+","+S+")",i.fillRect(T,$,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Zd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,h;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?h=[0,0,0,0]:typeof l.bias=="number"?h=[l.bias,l.bias,l.bias,l.bias]:(h=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(h[3]=l.bias[3]));let f=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,y=0,_=1,$=2,T=3,x=0,w=f,I=f*2,S=-1;u==="RGBA"?(x=0,w=f,I=f*2,S=f*3):u==="RGB"?(x=0,w=f,I=f*2):u==="RBG"&&(x=0,I=f,w=f*2),i=r.createImageData(a,n);for(let E=0;E<n*a;y+=g,_+=g,$+=g,T+=g,E++)i.data[y]=(e.data[x++]-h[0])*p[0],i.data[_]=(e.data[w++]-h[1])*p[1],i.data[$]=(e.data[I++]-h[2])*p[2],i.data[T]=S===-1?255:(e.data[S++]-h[3])*p[3]}else throw new Error("Can not access image data");return i}}),zr,Yd,Xd,Jd,ep,tp,ry=U(()=>{La(),zr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,h=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),f=4,g=0,y=1,_=2,$=3,T=0,x=p,w=p*2,I=-1;u==="RGB"&&(f=3,g=0,y=1,_=2,$=-1),l==="RGBA"?I=p*3:l==="RBG"?(T=0,w=p,x=p*2):l==="BGR"&&(w=0,x=p,T=p*2);for(let S=0;S<p;S++,g+=f,_+=f,y+=f,$+=f)h[T++]=(e[g]+s[0])/n[0],h[x++]=(e[y]+s[1])/n[1],h[w++]=(e[_]+s[2])/n[2],I!==-1&&$!==-1&&(h[I++]=(e[$]+s[3])/n[3]);return l==="RGBA"?new Ne("float32",h,[1,4,r,i]):new Ne("float32",h,[1,3,r,i])},Yd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=l();h.width=e.width,h.height=e.height;let f=p(h);if(f!=null){let g=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=y}else u.tensorFormat="RGBA",u.height=g,u.width=y;f.drawImage(e,0,0),s=f.getImageData(0,0,y,g).data}else throw new Error("Can not access image data")}else if(i){let h,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,f=t.resizedWidth):(h=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=f,t!==void 0){let g=l();g.width=f,g.height=h;let y=p(g);if(y!=null)y.putImageData(e,0,0),s=y.getImageData(0,0,f,h).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=l();h.width=e.width,h.height=e.height;let f=p(h);if(f!=null){let g=e.height,y=e.width;return f.drawImage(e,0,0,y,g),s=f.getImageData(0,0,y,g).data,u.height=g,u.width=y,zr(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((h,f)=>{let g=l(),y=p(g);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,y.drawImage(_,0,0,g.width,g.height);let $=y.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,h(zr($.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return zr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Xd=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},Jd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},ep=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},tp=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),It,ur,Ei,rp,iy=U(()=>{It=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ur=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ei=!1,rp=()=>{if(!Ei){Ei=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(It.set("int64",BigInt64Array),ur.set(BigInt64Array,"int64")),t&&(It.set("uint64",BigUint64Array),ur.set(BigUint64Array,"uint64")),i?(It.set("float16",r),ur.set(r,"float16")):It.set("float16",Uint16Array)}}}),ip,ap,ay=U(()=>{La(),ip=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},ap=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,La=U(()=>{ty(),ry(),iy(),ay(),Ne=class{constructor(e,t,r){rp();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=It.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=It.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=ur.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=ip(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return Yd(e,t)}static fromTexture(e,t){return Xd(e,t)}static fromGpuBuffer(e,t){return Jd(e,t)}static fromMLTensor(e,t){return ep(e,t)}static fromPinnedBuffer(e,t,r){return tp(e,t,r)}toDataURL(e){return Qd(this,e)}toImageData(e){return Zd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ap(this,e)}}}),Qe,np=U(()=>{La(),Qe=Ne}),Hr,zi,it,Ze,Ct,At,sp=U(()=>{Kd(),Hr=(e,t)=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeStamp(`${e}::ORT::${t}`)},zi=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Hr("CPU",n);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},it=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||zi("BEGIN",e)},Ze=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||zi("END",e)},Ct=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.time(`ORT::${e}`)},At=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeEnd(`ORT::${e}`)}}),op,ny=U(()=>{Fd(),np(),sp(),op=class up{constructor(t){this.handler=t}async run(t,r,i){it(),Ct("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof Qe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Qe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,h=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(h.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof Qe)&&(p=!0,s=!1,a[f]=g)}if(p){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)a[p]=null;let u=await this.handler.run(t,a,n),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let h=u[p];h instanceof Qe?l[p]=h:l[p]=new Qe(h.type,h.data,h.dims)}return At("InferenceSession.run"),Ze(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){it(),Ct("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(g=t.byteLength-f,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-f}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(h,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Hd(s),p=await u.createInferenceSessionHandler(n,l);return At("InferenceSession.create"),Ze(),new up(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Wa,sy=U(()=>{ny(),Wa=op}),oy=U(()=>{}),uy=U(()=>{}),ly=U(()=>{}),dy=U(()=>{}),py={};Ft(py,{InferenceSession:()=>Wa,TRACE:()=>Hr,TRACE_EVENT_BEGIN:()=>Ct,TRACE_EVENT_END:()=>At,TRACE_FUNC_BEGIN:()=>it,TRACE_FUNC_END:()=>Ze,Tensor:()=>Qe,env:()=>ge,registerBackend:()=>Lt});var Le=U(()=>{Xg(),ey(),sy(),np(),oy(),uy(),sp(),ly(),dy()}),Va=U(()=>{}),lp={};Ft(lp,{default:()=>dp});var Ci,Ai,dp,cy=U(()=>{gf(),Nt(),Ga(),Ci="ort-wasm-proxy-worker",Ai=globalThis.self?.name===Ci,Ai&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ha(r.wasm).then(()=>{ln(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;dn(a,i).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:i}=r,a=Xr(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;pn(i,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":cn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:n,outputIndices:s,options:u}=r;hn(i,a,n,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},mn([...n,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":fn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),dp=Ai?null:e=>new Worker(e??Re,{type:"module",name:Ci})}),pp={};Ft(pp,{default:()=>cp});async function co(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Zc||(t.Zc=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let n=o=>async(...d)=>{try{if(t.$c)throw Error("Session already started");let m=t.$c={Nd:d[0],errors:[]},c=await o(...d);if(t.$c!==m)throw Error("Session mismatch");t.gd?.flush();let b=m.errors;if(0<b.length){let k=await Promise.all(b);if(k=k.filter(z=>z),0<k.length)throw Error(k.join(`
`))}return c}finally{t.$c=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=d;let m=t.gd;t.jsepRegisterBuffer=(c,b,k,z)=>m.registerBuffer(c,b,k,z),t.jsepGetBuffer=c=>m.getBuffer(c),t.jsepCreateDownloader=(c,b,k)=>m.createDownloader(c,b,k),t.jsepOnCreateSession=c=>{m.onCreateSession(c)},t.jsepOnReleaseSession=c=>{m.onReleaseSession(c)},t.jsepOnRunStart=c=>m.onRunStart(c),t.Ld=(c,b)=>{m.upload(c,b)}}else if(o==="webnn"){let m=d[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=c=>m.onRunStart(c),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=c=>{m.onReleaseSession(c)},t.webnnCreateMLTensorDownloader=(c,b)=>m.createMLTensorDownloader(c,b),t.webnnRegisterMLTensor=(c,b,k,z)=>m.registerMLTensor(c,b,k,z),t.webnnCreateMLContext=c=>m.createMLContext(c),t.webnnRegisterMLConstant=(c,b,k,z,R,L)=>m.registerMLConstant(c,b,k,z,R,t.Zc,L),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let s=()=>{let o=d=>(...m)=>{let c=Je;return m=d(...m),Je!=c?new Promise((b,k)=>{fi={resolve:b,reject:k}}):m};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[d]=o(t[d])})(),n!==void 0&&(t._OrtRun=n(t._OrtRun),t._OrtRunWithBinding=n(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},h=import.meta.url,f="";if(r||i){try{f=new URL(".",h).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(A(o))return new Promise((m,c)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?m(b.response):c(b.status)},b.onerror=c,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,y,_,$,T,x,w=console.log.bind(console),I=console.error.bind(console),S=w,E=I,C=!1,A=o=>o.startsWith("file://");function v(){pt.buffer!=q.buffer&&W()}if(a){let o=function(d){try{var m=d.data,c=m.Uc;if(c==="load"){let b=[];self.onmessage=k=>b.push(k),x=()=>{postMessage({Uc:"loaded"});for(let k of b)o(k);self.onmessage=o};for(let k of m.Ad)t[k]&&!t[k].proxy||(t[k]=(...z)=>{postMessage({Uc:"callHandler",zd:k,args:z})},k=="print"&&(S=t[k]),k=="printErr"&&(E=t[k]));pt=m.Vd,W(),y=m.Wd,Be(),Er()}else if(c==="run"){(function(b){var k=(v(),D)[b+52>>>2>>>0];b=(v(),D)[b+56>>>2>>>0],ws(k,k-b),ne(k)})(m.Tc),wi(m.Tc,0,0,1,0,0),bn(),pi(m.Tc),P||(hs(),P=!0);try{Df(m.Pd,m.dd)}catch(b){if(b!="unwind")throw b}}else m.target!=="setimmediate"&&(c==="checkMailbox"?P&&$r():c&&(E(`worker: received unknown command ${c}`),E(m)))}catch(b){throw fs(),b}};var P=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var q,Y,H,Q,B,D,G,ee,Z,X,de,M=!1;function W(){var o=pt.buffer;t.HEAP8=q=new Int8Array(o),H=new Int16Array(o),t.HEAPU8=Y=new Uint8Array(o),Q=new Uint16Array(o),t.HEAP32=B=new Int32Array(o),t.HEAPU32=D=new Uint32Array(o),G=new Float32Array(o),ee=new Float64Array(o),Z=new BigInt64Array(o),X=new BigUint64Array(o)}function te(){M=!0,a?x():nt.tb()}function oe(o){throw E(o="Aborted("+o+")"),C=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),T?.(o),o}function Oe(){return{a:{ma:sg,hb:ng,g:Pf,J:Uf,f:qf,o:Lf,h:Wf,ha:Vf,b:Gf,T:Hf,Ia:kn,n:Ff,_:Cn,Ya:An,Ea:On,Ga:Bn,Za:Rn,Wa:Nn,Pa:Mn,Va:Dn,ka:Pn,Fa:Un,Ca:qn,Xa:Ln,Da:Wn,cb:jf,ea:Kf,xa:Qf,va:Yf,da:Jf,O:em,H:tm,wa:rm,Z:lm,ya:dm,Sa:pm,Aa:hm,Ja:fm,ta:mm,fa:gm,Ra:pi,$a:ym,R:$m,s:km,c:li,ib:Im,y:Em,M:zm,D:Cm,m:Am,t:Zn,jb:Om,I:Bm,S:Rm,j:Nm,v:Mm,r:Dm,l:Pm,Ma:Um,Na:qm,Oa:Lm,Ka:es,La:ts,ua:rs,eb:Vm,bb:Hm,u:Fm,aa:jm,ga:Km,ab:Gm,V:Qm,_a:Zm,Ba:Ym,F:Wm,U:Xm,la:kr,za:eg,gb:Jm,fb:tg,Ta:ss,Ua:os,Ha:ai,$:us,ja:ls,Qa:ds,ia:ps,lb:Vg,na:Mg,mb:Wg,oa:Ng,G:kg,d:dg,q:ug,w:og,B:bg,pb:Og,K:xg,x:cg,pa:Bg,X:Dg,ba:Ag,nb:Lg,ob:qg,ra:Ig,qa:Cg,qb:Eg,N:Sg,Y:Rg,e:pg,A:hg,k:lg,kb:Gg,p:mg,z:gg,C:fg,E:yg,L:$g,rb:Tg,Q:Pg,ca:vg,W:Ug,sb:wg,sa:_g,P:zg,i:ig,a:pt,db:ii}}}async function Be(){function o(c,b){var k=nt=c.exports;c={};for(let[z,R]of Object.entries(k))typeof R=="function"?(k=_m(R),c[z]=k):c[z]=R;return nt=c,nt=(function(){var z=nt,R=V=>ae=>V(ae)>>>0,L=V=>()=>V()>>>0;return(z=Object.assign({},z)).ub=R(z.ub),z.Yb=L(z.Yb),z._b=R(z._b),z.mc=R(z.mc),z.nc=L(z.nc),z.rc=R(z.rc),z})(),_n.push(nt.$b),cs=(c=nt).ub,hs=c.vb,t._OrtInit=c.wb,t._OrtGetLastError=c.xb,t._OrtCreateSessionOptions=c.yb,t._OrtAppendExecutionProvider=c.zb,t._OrtAddFreeDimensionOverride=c.Ab,t._OrtAddSessionConfigEntry=c.Bb,t._OrtReleaseSessionOptions=c.Cb,t._OrtCreateSession=c.Db,t._OrtReleaseSession=c.Eb,t._OrtGetInputOutputCount=c.Fb,t._OrtGetInputOutputMetadata=c.Gb,t._OrtFree=c.Hb,t._OrtCreateTensor=c.Ib,t._OrtGetTensorData=c.Jb,t._OrtReleaseTensor=c.Kb,t._OrtCreateRunOptions=c.Lb,t._OrtAddRunConfigEntry=c.Mb,t._OrtReleaseRunOptions=c.Nb,t._OrtCreateBinding=c.Ob,t._OrtBindInput=c.Pb,t._OrtBindOutput=c.Qb,t._OrtClearBoundOutputs=c.Rb,t._OrtReleaseBinding=c.Sb,t._OrtRunWithBinding=c.Tb,t._OrtRun=c.Ub,t._OrtEndProfiling=c.Vb,t._JsepOutput=c.Wb,t._JsepGetNodeName=c.Xb,Ir=c.Yb,et=t._free=c.Zb,Qt=t._malloc=c._b,wi=c.bc,fs=c.cc,ms=c.dc,gs=c.ec,bi=c.fc,ys=c.gc,_s=c.hc,ue=c.ic,Zt=c.jc,ws=c.kc,ne=c.lc,$i=c.mc,se=c.nc,bs=c.oc,vi=c.pc,$s=c.qc,vs=c.rc,xs=c.sc,xi=c.tc,Ss=c.uc,Ts=c.vc,ks=c.wc,Is=c.xc,Es=c.yc,zs=c.zc,Cs=c.Ac,As=c.Bc,Os=c.Cc,Bs=c.Dc,Rs=c.Ec,Ns=c.Fc,Ms=c.Gc,Ds=c.Hc,Ps=c.Ic,Us=c.Jc,qs=c.Kc,Ls=c.Lc,Ws=c.Mc,Vs=c.Nc,Gs=c.Oc,Hs=c.Pc,Fs=c.Rc,js=c.Sc,Ks=c.bd,Qs=c.cd,Zs=c.hd,Ys=c.kd,Xs=c.ld,Js=c.md,eo=c.nd,to=c.od,ro=c.pd,io=c.qd,ao=c.rd,no=c.wd,so=c.Rd,oo=c.Sd,uo=c.Td,lo=c.Ud,y=b,nt}var d,m=Oe();return t.instantiateWasm?new Promise(c=>{t.instantiateWasm(m,(b,k)=>{c(o(b,k))})}):a?o(new WebAssembly.Instance(y,Oe()),y):(de??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href,import.meta.url).href,d=await(async function(c){var b=de;if(!g&&!A(b))try{var k=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(k,c)}catch(z){E(`wasm streaming compile failed: ${z}`),E("falling back to ArrayBuffer instantiation")}return(async function(z,R){try{var L=await(async function(V){if(!g)try{var ae=await u(V);return new Uint8Array(ae)}catch{}if(V==de&&g)V=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";V=l(V)}return V})(z);return await WebAssembly.instantiate(L,R)}catch(V){E(`failed to asynchronously prepare wasm: ${V}`),oe(V)}})(b,c)})(m),o(d.instance,d.module))}class De{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var lt=o=>{o.terminate(),o.onmessage=()=>{}},xe=[],we=0,Ce=null,gr=o=>{dt.length==0&&(vn(),$n(dt[0]));var d=dt.pop();if(!d)return 6;jt.push(d),bt[o.Tc]=d,d.Tc=o.Tc;var m={Uc:"run",Pd:o.Od,dd:o.dd,Tc:o.Tc};return d.postMessage(m,o.ud),0},Ye=0,be=(o,d,...m)=>{var c,b=16*m.length,k=se(),z=$i(b),R=z>>>3;for(c of m)typeof c=="bigint"?((v(),Z)[R++>>>0]=1n,(v(),Z)[R++>>>0]=c):((v(),Z)[R++>>>0]=0n,(v(),ee)[R++>>>0]=c);return o=ms(o,0,b,z,d),ne(k),o};function ii(o){if(a)return be(0,1,o);if(_=o,!(0<Ye)){for(var d of jt)lt(d);for(d of dt)lt(d);dt=[],jt=[],bt={},C=!0}p(0,new De(o))}function yn(o){if(a)return be(1,0,o);ai(o)}var ai=o=>{if(_=o,a)throw yn(o),"unwind";ii(o)},dt=[],jt=[],_n=[],bt={},wn=o=>{var d=o.Tc;delete bt[d],dt.push(o),jt.splice(jt.indexOf(o),1),o.Tc=0,gs(d)};function bn(){_n.forEach(o=>o())}var $n=o=>new Promise(d=>{o.onmessage=b=>{var k=b.data;if(b=k.Uc,k.ad&&k.ad!=Ir()){var z=bt[k.ad];z?z.postMessage(k,k.ud):E(`Internal error! Worker sent a message "${b}" to target pthread ${k.ad}, but that thread no longer exists!`)}else b==="checkMailbox"?$r():b==="spawnThread"?gr(k):b==="cleanupThread"?br(()=>{wn(bt[k.Qd])}):b==="loaded"?(o.loaded=!0,d(o)):k.target==="setimmediate"?o.postMessage(k):b==="uncaughtException"?o.onerror(k.error):b==="callHandler"?t[k.zd](...k.args):b&&E(`worker sent an unknown command ${b}`)},o.onerror=b=>{throw E(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var m,c=[];for(m of[])t.propertyIsEnumerable(m)&&c.push(m);o.postMessage({Uc:"load",Ad:c,Vd:pt,Wd:y})});function vn(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});dt.push(o)}var pt,Df=(o,d)=>{Ye=0,o=xi(o,d),0<Ye?_=o:bi(o)},yr=[],_r=0;function Pf(o){var d=new ni(o>>>=0);return(v(),q)[d.Vc+12>>>0]==0&&(xn(d,!0),_r--),Sn(d,!1),yr.push(d),vs(o)}var Dt=0,Uf=()=>{ue(0,0);var o=yr.pop();bs(o.ed),Dt=0};function xn(o,d){d=d?1:0,(v(),q)[o.Vc+12>>>0]=d}function Sn(o,d){d=d?1:0,(v(),q)[o.Vc+13>>>0]=d}class ni{constructor(d){this.ed=d,this.Vc=d-24}}var si=o=>{var d=Dt;if(!d)return Zt(0),0;var m=new ni(d);(v(),D)[m.Vc+16>>>2>>>0]=d;var c=(v(),D)[m.Vc+4>>>2>>>0];if(!c)return Zt(0),d;for(var b of o){if(b===0||b===c)break;if($s(b,c,m.Vc+16))return Zt(b),d}return Zt(c),d};function qf(){return si([])}function Lf(o){return si([o>>>0])}function Wf(o,d,m,c){return si([o>>>0,d>>>0,m>>>0,c>>>0])}var Vf=()=>{var o=yr.pop();o||oe("no exception to throw");var d=o.ed;throw(v(),q)[o.Vc+13>>>0]==0&&(yr.push(o),Sn(o,!0),xn(o,!1),_r++),vi(d),Dt=d};function Gf(o,d,m){var c=new ni(o>>>=0);throw d>>>=0,m>>>=0,(v(),D)[c.Vc+16>>>2>>>0]=0,(v(),D)[c.Vc+4>>>2>>>0]=d,(v(),D)[c.Vc+8>>>2>>>0]=m,vi(o),_r++,Dt=o}var Hf=()=>_r;function Tn(o,d,m,c){return a?be(2,1,o,d,m,c):kn(o,d,m,c)}function kn(o,d,m,c){if(o>>>=0,d>>>=0,m>>>=0,c>>>=0,!globalThis.SharedArrayBuffer)return 6;var b=[];return a&&b.length===0?Tn(o,d,m,c):(o={Od:m,Tc:o,dd:c,ud:b},a?(o.Uc="spawnThread",postMessage(o,b),0):gr(o))}function Ff(o){throw Dt||=o>>>0,Dt}var In=globalThis.TextDecoder&&new TextDecoder,En=(o,d,m,c)=>{if(m=d+m,c)return m;for(;o[d]&&!(d>=m);)++d;return d},zn=(o,d=0,m,c)=>{if(16<(m=En(o,d>>>=0,m,c))-d&&o.buffer&&In)return In.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,m):o.slice(d,m));for(c="";d<m;){var b=o[d++];if(128&b){var k=63&o[d++];if((224&b)==192)c+=String.fromCharCode((31&b)<<6|k);else{var z=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|k<<6|z:(7&b)<<18|k<<12|z<<6|63&o[d++])?c+=String.fromCharCode(b):(b-=65536,c+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else c+=String.fromCharCode(b)}return c},Se=(o,d,m)=>(o>>>=0)?zn((v(),Y),o,d,m):"";function Cn(o,d,m){return a?be(3,1,o,d,m):0}function An(o,d){if(a)return be(4,1,o,d)}function On(o,d){if(a)return be(5,1,o,d)}function Bn(o,d,m){if(a)return be(6,1,o,d,m)}function Rn(o,d,m){return a?be(7,1,o,d,m):0}function Nn(o,d){if(a)return be(8,1,o,d)}function Mn(o,d,m){if(a)return be(9,1,o,d,m)}function Dn(o,d,m,c){if(a)return be(10,1,o,d,m,c)}function Pn(o,d,m,c){if(a)return be(11,1,o,d,m,c)}function Un(o,d,m,c){if(a)return be(12,1,o,d,m,c)}function qn(o){if(a)return be(13,1,o)}function Ln(o,d){if(a)return be(14,1,o,d)}function Wn(o,d,m){if(a)return be(15,1,o,d,m)}var jf=()=>oe(""),Xe=o=>{o>>>=0;for(var d="";;){var m=(v(),Y)[o++>>>0];if(!m)return d;d+=String.fromCharCode(m)}},oi={},ui={},Pt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function at(o,d,m={}){return(function(c,b,k={}){var z=b.name;if(!c)throw new Pt(`type "${z}" must have a positive integer typeid pointer`);if(ui.hasOwnProperty(c)){if(k.Bd)return;throw new Pt(`Cannot register type '${z}' twice`)}ui[c]=b,oi.hasOwnProperty(c)&&(b=oi[c],delete oi[c],b.forEach(R=>R()))})(o,d,m)}var Vn=(o,d,m)=>{switch(d){case 1:return m?c=>(v(),q)[c>>>0]:c=>(v(),Y)[c>>>0];case 2:return m?c=>(v(),H)[c>>>1>>>0]:c=>(v(),Q)[c>>>1>>>0];case 4:return m?c=>(v(),B)[c>>>2>>>0]:c=>(v(),D)[c>>>2>>>0];case 8:return m?c=>(v(),Z)[c>>>3>>>0]:c=>(v(),X)[c>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function Kf(o,d,m,c,b){o>>>=0,m>>>=0,d=Xe(d>>>0);let k=z=>z;if(c=c===0n){let z=8*m;k=R=>BigInt.asUintN(z,R),b=k(b)}at(o,{name:d,Qc:k,Xc:(z,R)=>(typeof R=="number"&&(R=BigInt(R)),R),Wc:Vn(d,m,!c),Yc:null})}function Qf(o,d,m,c){at(o>>>=0,{name:d=Xe(d>>>0),Qc:function(b){return!!b},Xc:function(b,k){return k?m:c},Wc:function(b){return this.Qc((v(),Y)[b>>>0])},Yc:null})}var Gn=[],$t=[0,1,,1,null,1,!0,1,!1,1];function li(o){9<(o>>>=0)&&--$t[o+1]==0&&($t[o]=void 0,Gn.push(o))}var Pe=o=>{if(!o)throw new Pt(`Cannot use deleted val. handle = ${o}`);return $t[o]},We=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=Gn.pop()||$t.length;return $t[d]=o,$t[d+1]=1,d}};function di(o){return this.Qc((v(),D)[o>>>2>>>0])}var Zf={name:"emscripten::val",Qc:o=>{var d=Pe(o);return li(o),d},Xc:(o,d)=>We(d),Wc:di,Yc:null};function Yf(o){return at(o>>>0,Zf)}var Xf=(o,d)=>{switch(d){case 4:return function(m){return this.Qc((v(),G)[m>>>2>>>0])};case 8:return function(m){return this.Qc((v(),ee)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function Jf(o,d,m){m>>>=0,at(o>>>=0,{name:d=Xe(d>>>0),Qc:c=>c,Xc:(c,b)=>b,Wc:Xf(d,m),Yc:null})}function em(o,d,m,c,b){o>>>=0,m>>>=0,d=Xe(d>>>0);let k=R=>R;if(c===0){var z=32-8*m;k=R=>R<<z>>>z,b=k(b)}at(o,{name:d,Qc:k,Xc:(R,L)=>L,Wc:Vn(d,m,c!==0),Yc:null})}function tm(o,d,m){function c(k){var z=(v(),D)[k>>>2>>>0];return k=(v(),D)[k+4>>>2>>>0],new b((v(),q).buffer,k,z)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];at(o>>>=0,{name:m=Xe(m>>>0),Qc:c,Wc:c},{Bd:!0})}var ct=(o,d,m)=>{var c=(v(),Y);if(d>>>=0,0<m){var b=d;m=d+m-1;for(var k=0;k<o.length;++k){var z=o.codePointAt(k);if(127>=z){if(d>=m)break;c[d++>>>0]=z}else if(2047>=z){if(d+1>=m)break;c[d++>>>0]=192|z>>6,c[d++>>>0]=128|63&z}else if(65535>=z){if(d+2>=m)break;c[d++>>>0]=224|z>>12,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z}else{if(d+3>=m)break;c[d++>>>0]=240|z>>18,c[d++>>>0]=128|z>>12&63,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z,k++}}c[d>>>0]=0,o=d-b}else o=0;return o},wr=o=>{for(var d=0,m=0;m<o.length;++m){var c=o.charCodeAt(m);127>=c?d++:2047>=c?d+=2:55296<=c&&57343>=c?(d+=4,++m):d+=3}return d};function rm(o,d){at(o>>>=0,{name:d=Xe(d>>>0),Qc(m){var c=(v(),D)[m>>>2>>>0];return c=Se(m+4,c,!0),et(m),c},Xc(m,c){c instanceof ArrayBuffer&&(c=new Uint8Array(c));var b=typeof c=="string";if(!(b||ArrayBuffer.isView(c)&&c.BYTES_PER_ELEMENT==1))throw new Pt("Cannot pass non-string to std::string");var k=b?wr(c):c.length,z=Qt(4+k+1),R=z+4;return(v(),D)[z>>>2>>>0]=k,b?ct(c,R,k+1):(v(),Y).set(c,R>>>0),m!==null&&m.push(et,z),z},Wc:di,Yc(m){et(m)}})}var Hn=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,im=(o,d,m)=>{if(o>>>=1,16<(d=En((v(),Q),o,d/2,m))-o&&Hn)return Hn.decode((v(),Q).slice(o,d));for(m="";o<d;++o){var c=(v(),Q)[o>>>0];m+=String.fromCharCode(c)}return m},am=(o,d,m)=>{if(m??=2147483647,2>m)return 0;var c=d;m=(m-=2)<2*o.length?m/2:o.length;for(var b=0;b<m;++b){var k=o.charCodeAt(b);(v(),H)[d>>>1>>>0]=k,d+=2}return(v(),H)[d>>>1>>>0]=0,d-c},nm=o=>2*o.length,sm=(o,d,m)=>{var c="";o>>>=2;for(var b=0;!(b>=d/4);b++){var k=(v(),D)[o+b>>>0];if(!k&&!m)break;c+=String.fromCodePoint(k)}return c},om=(o,d,m)=>{if(d>>>=0,m??=2147483647,4>m)return 0;var c=d;m=c+m-4;for(var b=0;b<o.length;++b){var k=o.codePointAt(b);if(65535<k&&b++,(v(),B)[d>>>2>>>0]=k,(d+=4)+4>m)break}return(v(),B)[d>>>2>>>0]=0,d-c},um=o=>{for(var d=0,m=0;m<o.length;++m)65535<o.codePointAt(m)&&m++,d+=4;return d};function lm(o,d,m){if(o>>>=0,d>>>=0,m=Xe(m>>>=0),d===2)var c=im,b=am,k=nm;else c=sm,b=om,k=um;at(o,{name:m,Qc:z=>{var R=(v(),D)[z>>>2>>>0];return R=c(z+4,R*d,!0),et(z),R},Xc:(z,R)=>{if(typeof R!="string")throw new Pt(`Cannot pass non-string to C++ string type ${m}`);var L=k(R),V=Qt(4+L+d);return(v(),D)[V>>>2>>>0]=L/d,b(R,V+4,L+d),z!==null&&z.push(et,V),V},Wc:di,Yc(z){et(z)}})}function dm(o,d){at(o>>>=0,{Cd:!0,name:d=Xe(d>>>0),Qc:()=>{},Xc:()=>{}})}function pm(o){wi(o>>>0,!i,1,!r,131072,!1),bn()}var br=o=>{if(!C)try{if(o(),!(0<Ye))try{a?Ir()&&bi(_):ai(_)}catch(d){d instanceof De||d=="unwind"||p(0,d)}}catch(d){d instanceof De||d=="unwind"||p(0,d)}},cm=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function pi(o){o>>>=0,cm||(Atomics.waitAsync((v(),B),o>>>2,o).value.then($r),o+=128,Atomics.store((v(),B),o>>>2,1))}var $r=()=>br(()=>{var o=Ir();o&&(pi(o),_s())});function hm(o,d){(o>>>=0)==d>>>0?setTimeout($r):a?postMessage({ad:o,Uc:"checkMailbox"}):(o=bt[o])&&o.postMessage({Uc:"checkMailbox"})}var ci=[];function fm(o,d,m,c,b){for(d>>>=0,b>>>=0,ci.length=0,m=b>>>3,c=b+c>>>3;m<c;){var k;k=(v(),Z)[m++>>>0]?(v(),Z)[m++>>>0]:(v(),ee)[m++>>>0],ci.push(k)}return(d?Si[d]:ag[o])(...ci)}var mm=()=>{Ye=0};function gm(o){o>>>=0,a?postMessage({Uc:"cleanupThread",Qd:o}):wn(bt[o])}function ym(o){}var vr=o=>{try{o()}catch(d){oe(d)}};function _m(o){var d=(...m)=>{xr.push(o);try{return o(...m)}finally{C||(xr.pop(),Je&&ht===1&&xr.length===0&&(ht=0,Ye+=1,vr(oo),typeof Fibers<"u"&&Fibers.ce()))}};return Kn.set(o,d),d}var ht=0,Je=null,Fn=0,xr=[],hi=new Map,jn=new Map,Kn=new Map,wm=0,fi=null,bm=[],Qn=o=>(function(d){if(!C){if(ht===0){var m=!1,c=!1;d((b=0)=>{if(!C&&(Fn=b,m=!0,c)){ht=2,vr(()=>uo(Je)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),b=!1;try{var k=(function(){var L=(v(),B)[Je+8>>>2>>>0];return L=jn.get(L),L=Kn.get(L),--Ye,L()})()}catch(L){k=L,b=!0}var z=!1;if(!Je){var R=fi;R&&(fi=null,(b?R.reject:R.resolve)(k),z=!0)}if(b&&!z)throw k}}),c=!0,m||(ht=1,Je=(function(){var b=Qt(65548),k=b+12;if((v(),D)[b>>>2>>>0]=k,(v(),D)[b+4>>>2>>>0]=k+65536,k=xr[0],!hi.has(k)){var z=wm++;hi.set(k,z),jn.set(z,k)}return k=hi.get(k),(v(),B)[b+8>>>2>>>0]=k,b})(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),vr(()=>so(Je)))}else ht===2?(ht=0,vr(lo),et(Je),Je=null,bm.forEach(br)):oe(`invalid state: ${ht}`);return Fn}})(d=>{o().then(d)});function $m(o){return o>>>=0,Qn(async()=>{var d=await Pe(o);return We(d)})}var mi=[],vm=o=>{var d=mi.length;return mi.push(o),d},xm=(o,d)=>{for(var m=Array(o),c=0;c<o;++c){var b=c,k=(v(),D)[d+4*c>>>2>>>0],z=ui[k];if(z===void 0)throw o=`parameter ${c}`,k=cs(k),d=Xe(k),et(k),new Pt(`${o} has unknown type ${d}`);m[b]=z}return m},Sm=(o,d,m)=>{var c=[];return o=o(c,m),c.length&&((v(),D)[d>>>2>>>0]=We(c)),o},Tm={},Sr=o=>{var d=Tm[o];return d===void 0?Xe(o):d};function km(o,d,m){var[c,...b]=xm(o,d>>>0);d=c.Xc.bind(c);var k=b.map(L=>L.Wc.bind(L));o--;var z={toValue:Pe};switch(o=k.map((L,V)=>{var ae=`argFromPtr${V}`;return z[ae]=L,`${ae}(args${V?"+"+8*V:""})`}),m){case 0:var R="toValue(handle)";break;case 2:R="new (toValue(handle))";break;case 3:R="";break;case 1:z.getStringOrSymbol=Sr,R="toValue(handle)[getStringOrSymbol(methodName)]"}return R+=`(${o})`,c.Cd||(z.toReturnWire=d,z.emval_returnValue=Sm,R=`return emval_returnValue(toReturnWire, destructorsRef, ${R})`),R=`return function (handle, methodName, destructorsRef, args) {
  ${R}
  }`,m=new Function(Object.keys(z),R)(...Object.values(z)),R=`methodCaller<(${b.map(L=>L.name)}) => ${c.name}>`,vm(Object.defineProperty(m,"name",{value:R}))}function Im(o,d){return d>>>=0,(o=Pe(o>>>0))==Pe(d)}function Em(o){return(o>>>=0)?(o=Sr(o),We(globalThis[o])):We(globalThis)}function zm(o){return o=Sr(o>>>0),We(t[o])}function Cm(o,d){return d>>>=0,o=Pe(o>>>0),d=Pe(d),We(o[d])}function Am(o){9<(o>>>=0)&&($t[o+1]+=1)}function Zn(o,d,m,c,b){return mi[o>>>0](d>>>0,m>>>0,c>>>0,b>>>0)}function Om(o,d,m,c,b){return Zn(o>>>0,d>>>0,m>>>0,c>>>0,b>>>0)}function Bm(){return We([])}function Rm(o){o=Pe(o>>>0);for(var d=Array(o.length),m=0;m<o.length;m++)d[m]=o[m];return We(d)}function Nm(o){return We(Sr(o>>>0))}function Mm(){return We({})}function Dm(o){for(var d=Pe(o>>>=0);d.length;){var m=d.pop();d.pop()(m)}li(o)}function Pm(o,d,m){d>>>=0,m>>>=0,o=Pe(o>>>0),d=Pe(d),m=Pe(m),o[d]=m}function Um(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(v(),B)[d>>>2>>>0]=o.getUTCSeconds(),(v(),B)[d+4>>>2>>>0]=o.getUTCMinutes(),(v(),B)[d+8>>>2>>>0]=o.getUTCHours(),(v(),B)[d+12>>>2>>>0]=o.getUTCDate(),(v(),B)[d+16>>>2>>>0]=o.getUTCMonth(),(v(),B)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(v(),B)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(v(),B)[d+28>>>2>>>0]=o}var Yn=o=>o%4==0&&(o%100!=0||o%400==0),Xn=[0,31,60,91,121,152,182,213,244,274,305,335],Jn=[0,31,59,90,120,151,181,212,243,273,304,334];function qm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(v(),B)[d>>>2>>>0]=o.getSeconds(),(v(),B)[d+4>>>2>>>0]=o.getMinutes(),(v(),B)[d+8>>>2>>>0]=o.getHours(),(v(),B)[d+12>>>2>>>0]=o.getDate(),(v(),B)[d+16>>>2>>>0]=o.getMonth(),(v(),B)[d+20>>>2>>>0]=o.getFullYear()-1900,(v(),B)[d+24>>>2>>>0]=o.getDay();var m=(Yn(o.getFullYear())?Xn:Jn)[o.getMonth()]+o.getDate()-1|0;(v(),B)[d+28>>>2>>>0]=m,(v(),B)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var c=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=c&&o.getTimezoneOffset()==Math.min(c,m)),(v(),B)[d+32>>>2>>>0]=o}function Lm(o){o>>>=0;var d=new Date((v(),B)[o+20>>>2>>>0]+1900,(v(),B)[o+16>>>2>>>0],(v(),B)[o+12>>>2>>>0],(v(),B)[o+8>>>2>>>0],(v(),B)[o+4>>>2>>>0],(v(),B)[o>>>2>>>0],0),m=(v(),B)[o+32>>>2>>>0],c=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),k=new Date(d.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(k,b);return 0>m?(v(),B)[o+32>>>2>>>0]=+(b!=k&&z==c):0<m!=(z==c)&&(b=Math.max(k,b),d.setTime(d.getTime()+6e4*((0<m?z:b)-c))),(v(),B)[o+24>>>2>>>0]=d.getDay(),m=(Yn(d.getFullYear())?Xn:Jn)[d.getMonth()]+d.getDate()-1|0,(v(),B)[o+28>>>2>>>0]=m,(v(),B)[o>>>2>>>0]=d.getSeconds(),(v(),B)[o+4>>>2>>>0]=d.getMinutes(),(v(),B)[o+8>>>2>>>0]=d.getHours(),(v(),B)[o+12>>>2>>>0]=d.getDate(),(v(),B)[o+16>>>2>>>0]=d.getMonth(),(v(),B)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function es(o,d,m,c,b,k,z){return a?be(16,1,o,d,m,c,b,k,z):-52}function ts(o,d,m,c,b,k){if(a)return be(17,1,o,d,m,c,b,k)}var Kt={},Wm=()=>performance.timeOrigin+performance.now();function rs(o,d){if(a)return be(18,1,o,d);if(Kt[o]&&(clearTimeout(Kt[o].id),delete Kt[o]),!d)return 0;var m=setTimeout(()=>{delete Kt[o],br(()=>ys(o,performance.timeOrigin+performance.now()))},d);return Kt[o]={id:m,be:d},0}function Vm(o,d,m,c){o>>>=0,d>>>=0,m>>>=0,c>>>=0;var b=new Date().getFullYear(),k=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var z=Math.max(k,b);(v(),D)[o>>>2>>>0]=60*z,(v(),B)[d>>>2>>>0]=+(k!=b),o=(d=R=>{var L=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(L/60)).padStart(2,"0")}${String(L%60).padStart(2,"0")}`})(k),d=d(b),b<k?(ct(o,m,17),ct(d,c,17)):(ct(o,c,17),ct(d,m,17))}var Gm=()=>Date.now();function Hm(o,d,m){return m>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(v(),Z)[m>>>3>>>0]=BigInt(o),0):28}var gi=[],is=(o,d)=>{gi.length=0;for(var m;m=(v(),Y)[o++>>>0];){var c=m!=105;d+=(c&=m!=112)&&d%8?4:0,gi.push(m==112?(v(),D)[d>>>2>>>0]:m==106?(v(),Z)[d>>>3>>>0]:m==105?(v(),B)[d>>>2>>>0]:(v(),ee)[d>>>3>>>0]),d+=c?8:4}return gi};function Fm(o,d,m){return o>>>=0,d=is(d>>>0,m>>>0),Si[o](...d)}function jm(o,d,m){return o>>>=0,d=is(d>>>0,m>>>0),Si[o](...d)}var Km=()=>{};function Qm(o,d){return E(Se(o>>>0,d>>>0))}var Zm=()=>{throw Ye+=1,"unwind"};function Ym(){return 4294901760}var Xm=()=>navigator.hardwareConcurrency,vt={},Tr=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},as=o=>{for(var d of o)(o=Tr(d))&&(vt[o]=d)};function Jm(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),as(o),vt.sd=Tr(o[3]),vt.Md=o,vt.sd}function kr(o){if(!(o=vt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}et(kr.td??0),d=wr(o)+1;var m=Qt(d);return m&&ct(o,m,d),kr.td=m,kr.td}function eg(o){o>>>=0;var d=(v(),Y).length;if(o<=d||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var c=d*(1+.2/m);c=Math.min(c,o+100663296);e:{c=(Math.min(4294901760,65536*Math.ceil(Math.max(o,c)/65536))-pt.buffer.byteLength+65535)/65536|0;try{pt.grow(c),W();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}function tg(o,d,m){if(o>>>=0,d>>>=0,vt.sd==o)var c=vt.Md;else(c=Error().stack.toString().split(`
`))[0]=="Error"&&c.shift(),as(c);for(var b=3;c[b]&&Tr(c[b])!=o;)++b;for(o=0;o<m&&c[o+b];++o)(v(),B)[d+4*o>>>2>>>0]=Tr(c[o+b]);return o}var yi,_i={},ns=()=>{if(!yi){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in _i)_i[o]===void 0?delete d[o]:d[o]=_i[o];var m=[];for(o in d)m.push(`${o}=${d[o]}`);yi=m}return yi};function ss(o,d){if(a)return be(19,1,o,d);o>>>=0,d>>>=0;var m,c=0,b=0;for(m of ns()){var k=d+c;(v(),D)[o+b>>>2>>>0]=k,c+=ct(m,k,1/0)+1,b+=4}return 0}function os(o,d){if(a)return be(20,1,o,d);o>>>=0,d>>>=0;var m=ns();for(var c of((v(),D)[o>>>2>>>0]=m.length,o=0,m))o+=wr(c)+1;return(v(),D)[d>>>2>>>0]=o,0}function us(o){return a?be(21,1,o):52}function ls(o,d,m,c){return a?be(22,1,o,d,m,c):52}function ds(o,d,m,c){return a?be(23,1,o,d,m,c):70}var rg=[null,[],[]];function ps(o,d,m,c){if(a)return be(24,1,o,d,m,c);d>>>=0,m>>>=0,c>>>=0;for(var b=0,k=0;k<m;k++){var z=(v(),D)[d>>>2>>>0],R=(v(),D)[d+4>>>2>>>0];d+=8;for(var L=0;L<R;L++){var V=o,ae=(v(),Y)[z+L>>>0],pe=rg[V];ae===0||ae===10?((V===1?S:E)(zn(pe)),pe.length=0):pe.push(ae)}b+=R}return(v(),D)[c>>>2>>>0]=b,0}function ig(o){return o>>>0}a||(function(){for(var o=t.numThreads-1;o--;)vn();xe.push(async()=>{var d=(async function(){if(!a)return Promise.all(dt.map($n))})();we++,await d,--we==0&&Ce&&(d=Ce,Ce=null,d())})})(),a||(pt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),W()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>se(),t.stackRestore=o=>ne(o),t.stackAlloc=o=>$i(o),t.setValue=function(o,d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(v(),q)[o>>>0]=d;break;case"i16":(v(),H)[o>>>1>>>0]=d;break;case"i32":(v(),B)[o>>>2>>>0]=d;break;case"i64":(v(),Z)[o>>>3>>>0]=BigInt(d);break;case"float":(v(),G)[o>>>2>>>0]=d;break;case"double":(v(),ee)[o>>>3>>>0]=d;break;case"*":(v(),D)[o>>>2>>>0]=d;break;default:oe(`invalid type for setValue: ${m}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(v(),q)[o>>>0];case"i16":return(v(),H)[o>>>1>>>0];case"i32":return(v(),B)[o>>>2>>>0];case"i64":return(v(),Z)[o>>>3>>>0];case"float":return(v(),G)[o>>>2>>>0];case"double":return(v(),ee)[o>>>3>>>0];case"*":return(v(),D)[o>>>2>>>0];default:oe(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Se,t.stringToUTF8=ct,t.lengthBytesUTF8=wr;var cs,hs,Ir,et,Qt,wi,fs,ms,gs,bi,ys,_s,ue,Zt,ws,ne,$i,se,bs,vi,$s,vs,xs,xi,Ss,Ts,ks,Is,Es,zs,Cs,As,Os,Bs,Rs,Ns,Ms,Ds,Ps,Us,qs,Ls,Ws,Vs,Gs,Hs,Fs,js,Ks,Qs,Zs,Ys,Xs,Js,eo,to,ro,io,ao,no,so,oo,uo,lo,nt,ag=[ii,yn,Tn,Cn,An,On,Bn,Rn,Nn,Mn,Dn,Pn,Un,qn,Ln,Wn,es,ts,rs,ss,os,us,ls,ds,ps],Si={927244:(o,d,m,c,b)=>{if(t===void 0||!t.Zc)return 1;if((o=Se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Zc.get(o)))return 2;if(d=Number(d>>>0),m=Number(m>>>0),c=Number(c>>>0),d+m>o.byteLength)return 3;try{let k=o.subarray(d,d+m);switch(b){case 0:(v(),Y).set(k,c>>>0);break;case 1:t.Xd?t.Xd(c,k):t.Ld(c,k);break;default:return 4}return 0}catch{return 4}},928068:(o,d,m)=>{t.xd(o,(v(),Y).subarray(d>>>0,d+m>>>0))},928132:()=>t.Zd(),928174:o=>{t.vd(o)},928211:()=>{t.Ed()},928242:()=>{t.Fd()},928271:()=>{t.Jd()},928296:o=>t.Dd(o),928329:o=>t.Hd(o),928361:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m),!0)},928424:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m))},928481:()=>typeof wasmOffsetConverter<"u",928538:o=>{t.ac("Abs",o,void 0)},928589:o=>{t.ac("Neg",o,void 0)},928640:o=>{t.ac("Floor",o,void 0)},928693:o=>{t.ac("Ceil",o,void 0)},928745:o=>{t.ac("Reciprocal",o,void 0)},928803:o=>{t.ac("Sqrt",o,void 0)},928855:o=>{t.ac("Exp",o,void 0)},928906:o=>{t.ac("Erf",o,void 0)},928957:o=>{t.ac("Sigmoid",o,void 0)},929012:(o,d,m)=>{t.ac("HardSigmoid",o,{alpha:d,beta:m})},929091:o=>{t.ac("Log",o,void 0)},929142:o=>{t.ac("Sin",o,void 0)},929193:o=>{t.ac("Cos",o,void 0)},929244:o=>{t.ac("Tan",o,void 0)},929295:o=>{t.ac("Asin",o,void 0)},929347:o=>{t.ac("Acos",o,void 0)},929399:o=>{t.ac("Atan",o,void 0)},929451:o=>{t.ac("Sinh",o,void 0)},929503:o=>{t.ac("Cosh",o,void 0)},929555:o=>{t.ac("Asinh",o,void 0)},929608:o=>{t.ac("Acosh",o,void 0)},929661:o=>{t.ac("Atanh",o,void 0)},929714:o=>{t.ac("Tanh",o,void 0)},929766:o=>{t.ac("Not",o,void 0)},929817:(o,d,m)=>{t.ac("Clip",o,{min:d,max:m})},929886:o=>{t.ac("Clip",o,void 0)},929938:(o,d)=>{t.ac("Elu",o,{alpha:d})},929996:o=>{t.ac("Gelu",o,void 0)},930048:o=>{t.ac("Relu",o,void 0)},930100:(o,d)=>{t.ac("LeakyRelu",o,{alpha:d})},930164:(o,d)=>{t.ac("ThresholdedRelu",o,{alpha:d})},930234:(o,d)=>{t.ac("Cast",o,{to:d})},930292:o=>{t.ac("Add",o,void 0)},930343:o=>{t.ac("Sub",o,void 0)},930394:o=>{t.ac("Mul",o,void 0)},930445:o=>{t.ac("Div",o,void 0)},930496:o=>{t.ac("Pow",o,void 0)},930547:o=>{t.ac("Equal",o,void 0)},930600:o=>{t.ac("Greater",o,void 0)},930655:o=>{t.ac("GreaterOrEqual",o,void 0)},930717:o=>{t.ac("Less",o,void 0)},930769:o=>{t.ac("LessOrEqual",o,void 0)},930828:(o,d,m,c,b)=>{t.ac("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931003:(o,d,m,c,b)=>{t.ac("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931177:(o,d,m,c,b)=>{t.ac("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931351:(o,d,m,c,b)=>{t.ac("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931526:(o,d,m,c,b)=>{t.ac("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931700:(o,d,m,c,b)=>{t.ac("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931873:(o,d,m,c,b)=>{t.ac("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932046:(o,d,m,c,b)=>{t.ac("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932223:(o,d,m,c,b)=>{t.ac("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932403:(o,d,m,c,b)=>{t.ac("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932583:o=>{t.ac("Where",o,void 0)},932636:(o,d,m)=>{t.ac("Transpose",o,{perm:d?Array.from((v(),B).subarray(Number(d)>>>0,Number(m)>>>0)):[]})},932760:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},932893:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},933026:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e,ft)=>{t.ac("ConvTranspose",o,{format:L?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[b],pads:[k,z],strides:[R],wIsConst:()=>!!(v(),q)[V>>>0],outputPadding:ae?Array.from((v(),B).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((v(),B).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(ft)})},933459:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),B).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((v(),B).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from((v(),B).subarray(Number(k)>>>0,4+(Number(k)>>>0)>>>0)),strides:Array.from((v(),B).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(v(),q)[L>>>0],outputPadding:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},934120:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e,ft)=>{t.ac("ConvTranspose",o,{format:L?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[b],pads:[k,z],strides:[R],wIsConst:()=>!!(v(),q)[V>>>0],outputPadding:ae?Array.from((v(),B).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((v(),B).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(ft)})},934553:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),B).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((v(),B).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from((v(),B).subarray(Number(k)>>>0,4+(Number(k)>>>0)>>>0)),strides:Array.from((v(),B).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(v(),q)[L>>>0],outputPadding:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},935214:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},935305:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),B).subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},935784:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},935875:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),B).subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936354:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},936441:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),B).subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936916:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},937003:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),B).subarray(Number(R)>>>0,Number(L)>>>0)):[],pads:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),B).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},937478:(o,d,m,c,b)=>{t.ac("Gemm",o,{alpha:d,beta:m,transA:c,transB:b})},937582:o=>{t.ac("MatMul",o,void 0)},937636:(o,d,m,c)=>{t.ac("ArgMax",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},937744:(o,d,m,c)=>{t.ac("ArgMin",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},937852:(o,d)=>{t.ac("Softmax",o,{axis:d})},937915:(o,d)=>{t.ac("Concat",o,{axis:d})},937975:(o,d,m,c,b)=>{t.ac("Split",o,{axis:d,numOutputs:m,splitSizes:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},938131:o=>{t.ac("Expand",o,void 0)},938185:(o,d)=>{t.ac("Gather",o,{axis:Number(d)})},938256:(o,d)=>{t.ac("GatherElements",o,{axis:Number(d)})},938335:(o,d)=>{t.ac("GatherND",o,{batch_dims:Number(d)})},938414:(o,d,m,c,b,k,z,R,L,V,ae)=>{t.ac("Resize",o,{antialias:d,axes:m?Array.from((v(),B).subarray(Number(m)>>>0,Number(c)>>>0)):[],coordinateTransformMode:Se(b),cubicCoeffA:k,excludeOutside:z,extrapolationValue:R,keepAspectRatioPolicy:Se(L),mode:Se(V),nearestMode:Se(ae)})},938776:(o,d,m,c,b,k,z)=>{t.ac("Slice",o,{starts:d?Array.from((v(),B).subarray(Number(d)>>>0,Number(m)>>>0)):[],ends:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[],axes:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[]})},939040:o=>{t.ac("Tile",o,void 0)},939092:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939206:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939320:o=>{t.ac("Range",o,void 0)},939373:(o,d)=>{t.ac("Einsum",o,{equation:Se(d)})},939454:(o,d,m,c,b)=>{t.ac("Pad",o,{mode:d,value:m,pads:c?Array.from((v(),B).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},939597:(o,d,m,c,b,k)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!c,format:k?"NHWC":"NCHW"})},939766:(o,d,m,c,b,k)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!c,format:k?"NHWC":"NCHW"})},939935:(o,d,m)=>{t.ac("CumSum",o,{exclusive:Number(d),reverse:Number(m)})},940032:(o,d,m)=>{t.ac("DequantizeLinear",o,{axis:d,blockSize:m})},940122:(o,d,m,c,b)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:b?"NHWC":"NCHW"})},940292:(o,d,m,c,b)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:b?"NHWC":"NCHW"})},940462:(o,d)=>{t.ac("ScatterND",o,{reduction:Se(d)})},940547:(o,d,m,c,b,k,z,R,L)=>{t.ac("Attention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:b,doRotary:k,qkvHiddenSizes:z?Array.from((v(),B).subarray(Number(R)>>>0,Number(R)+z>>>0)):[],pastPresentShareBuffer:!!L})},940819:o=>{t.ac("BiasAdd",o,void 0)},940874:o=>{t.ac("BiasSplitGelu",o,void 0)},940935:o=>{t.ac("FastGelu",o,void 0)},940991:(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e,ft,Ti)=>{t.ac("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:m?Array.from((v(),B).subarray(Number(m)>>>0,Number(c)>>>0)):[],group:b,kernel_shape:k?Array.from((v(),B).subarray(Number(k)>>>0,Number(z)>>>0)):[],pads:R?Array.from((v(),B).subarray(Number(R)>>>0,Number(L)>>>0)):[],strides:V?Array.from((v(),B).subarray(Number(V)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(v(),q)[Number(me)>>>0],activation:Se(_e),activation_params:ft?Array.from((v(),G).subarray(Number(ft)>>>0,Number(Ti)>>>0)):[]})},941575:o=>{t.ac("Gelu",o,void 0)},941627:(o,d,m,c,b,k,z,R,L)=>{t.ac("GroupQueryAttention",o,{numHeads:d,kvNumHeads:m,scale:c,softcap:b,doRotary:k,rotaryInterleaved:z,smoothSoftmax:R,localWindowSize:L})},941844:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},941955:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},942066:(o,d,m,c,b,k)=>{t.ac("MatMulNBits",o,{k:d,n:m,accuracyLevel:c,bits:b,blockSize:k})},942193:(o,d,m,c,b,k)=>{t.ac("MultiHeadAttention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:b,doRotary:k})},942352:(o,d)=>{t.ac("QuickGelu",o,{alpha:d})},942416:(o,d,m,c,b)=>{t.ac("RotaryEmbedding",o,{interleaved:!!d,numHeads:m,rotaryEmbeddingDim:c,scale:b})},942555:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},942657:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},942759:(o,d,m,c)=>{t.ac("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:m,blockSize:c})},942880:o=>{t.Id(o)},942914:(o,d)=>t.Kd(Number(o),Number(d),t.$c.Nd,t.$c.errors)};function ng(o,d,m){return Qn(async()=>{await t.Gd(Number(o),Number(d),Number(m))})}function sg(){return typeof wasmOffsetConverter<"u"}function og(o,d,m,c){var b=se();try{return As(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function ug(o,d,m){var c=se();try{return Is(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;ue(1,0)}}function lg(o,d,m){var c=se();try{xs(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;ue(1,0)}}function dg(o,d){var m=se();try{return xi(o,d)}catch(c){if(ne(m),c!==c+0)throw c;ue(1,0)}}function pg(o){var d=se();try{Ss(o)}catch(m){if(ne(d),m!==m+0)throw m;ue(1,0)}}function cg(o,d,m,c,b,k,z){var R=se();try{return zs(o,d,m,c,b,k,z)}catch(L){if(ne(R),L!==L+0)throw L;ue(1,0)}}function hg(o,d){var m=se();try{Os(o,d)}catch(c){if(ne(m),c!==c+0)throw c;ue(1,0)}}function fg(o,d,m,c,b,k){var z=se();try{Ts(o,d,m,c,b,k)}catch(R){if(ne(z),R!==R+0)throw R;ue(1,0)}}function mg(o,d,m,c){var b=se();try{Cs(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function gg(o,d,m,c,b){var k=se();try{ks(o,d,m,c,b)}catch(z){if(ne(k),z!==z+0)throw z;ue(1,0)}}function yg(o,d,m,c,b,k,z){var R=se();try{Rs(o,d,m,c,b,k,z)}catch(L){if(ne(R),L!==L+0)throw L;ue(1,0)}}function _g(o,d,m,c,b,k,z){var R=se();try{Ns(o,d,m,c,b,k,z)}catch(L){if(ne(R),L!==L+0)throw L;ue(1,0)}}function wg(o,d,m,c,b,k,z,R){var L=se();try{Us(o,d,m,c,b,k,z,R)}catch(V){if(ne(L),V!==V+0)throw V;ue(1,0)}}function bg(o,d,m,c,b){var k=se();try{return Bs(o,d,m,c,b)}catch(z){if(ne(k),z!==z+0)throw z;ue(1,0)}}function $g(o,d,m,c,b,k,z,R){var L=se();try{qs(o,d,m,c,b,k,z,R)}catch(V){if(ne(L),V!==V+0)throw V;ue(1,0)}}function vg(o,d,m,c,b,k,z,R,L,V,ae,pe){var me=se();try{Ms(o,d,m,c,b,k,z,R,L,V,ae,pe)}catch(_e){if(ne(me),_e!==_e+0)throw _e;ue(1,0)}}function xg(o,d,m,c,b,k){var z=se();try{return Ds(o,d,m,c,b,k)}catch(R){if(ne(z),R!==R+0)throw R;ue(1,0)}}function Sg(o,d,m){var c=se();try{return Ls(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;return ue(1,0),0n}}function Tg(o,d,m,c,b,k,z,R,L){var V=se();try{Es(o,d,m,c,b,k,z,R,L)}catch(ae){if(ne(V),ae!==ae+0)throw ae;ue(1,0)}}function kg(o){var d=se();try{return Ws(o)}catch(m){if(ne(d),m!==m+0)throw m;ue(1,0)}}function Ig(o,d,m){var c=se();try{return Vs(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;ue(1,0)}}function Eg(o,d){var m=se();try{return no(o,d)}catch(c){if(ne(m),c!==c+0)throw c;return ue(1,0),0n}}function zg(o,d,m,c,b){var k=se();try{Gs(o,d,m,c,b)}catch(z){if(ne(k),z!==z+0)throw z;ue(1,0)}}function Cg(o){var d=se();try{return Hs(o)}catch(m){if(ne(d),m!==m+0)throw m;return ue(1,0),0n}}function Ag(o,d,m,c,b,k){var z=se();try{return Ys(o,d,m,c,b,k)}catch(R){if(ne(z),R!==R+0)throw R;ue(1,0)}}function Og(o,d,m,c,b,k){var z=se();try{return Xs(o,d,m,c,b,k)}catch(R){if(ne(z),R!==R+0)throw R;ue(1,0)}}function Bg(o,d,m,c,b,k,z,R){var L=se();try{return Ps(o,d,m,c,b,k,z,R)}catch(V){if(ne(L),V!==V+0)throw V;ue(1,0)}}function Rg(o,d,m,c,b){var k=se();try{return Js(o,d,m,c,b)}catch(z){if(ne(k),z!==z+0)throw z;return ue(1,0),0n}}function Ng(o,d,m,c){var b=se();try{return eo(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function Mg(o,d,m,c){var b=se();try{return to(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function Dg(o,d,m,c,b,k,z,R,L,V,ae,pe){var me=se();try{return ro(o,d,m,c,b,k,z,R,L,V,ae,pe)}catch(_e){if(ne(me),_e!==_e+0)throw _e;ue(1,0)}}function Pg(o,d,m,c,b,k,z,R,L,V,ae){var pe=se();try{Qs(o,d,m,c,b,k,z,R,L,V,ae)}catch(me){if(ne(pe),me!==me+0)throw me;ue(1,0)}}function Ug(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e,ft,Ti){var Hg=se();try{Zs(o,d,m,c,b,k,z,R,L,V,ae,pe,me,_e,ft,Ti)}catch(ki){if(ne(Hg),ki!==ki+0)throw ki;ue(1,0)}}function qg(o,d,m,c){var b=se();try{return io(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function Lg(o,d,m,c,b){var k=se();try{return ao(o,d,m,c,b)}catch(z){if(ne(k),z!==z+0)throw z;ue(1,0)}}function Wg(o,d,m){var c=se();try{return Fs(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;ue(1,0)}}function Vg(o,d,m){var c=se();try{return js(o,d,m)}catch(b){if(ne(c),b!==b+0)throw b;ue(1,0)}}function Gg(o,d,m,c){var b=se();try{Ks(o,d,m,c)}catch(k){if(ne(b),k!==k+0)throw k;ue(1,0)}}function Er(){if(0<we)Ce=Er;else if(a)$?.(t),te();else{for(var o=xe;0<o.length;)o.shift()(t);0<we?Ce=Er:(t.calledRun=!0,C||(te(),$?.(t)))}}return a||(nt=await Be(),Er()),t.PTR_SIZE=4,M?t:new Promise((o,d)=>{$=o,T=d})}var cp,ho,hy=U(()=>{cp=co,ho=globalThis.self?.name?.startsWith("em-pthread"),ho&&co()}),Oi,Sa,fo,Re,hp,Cr,mo,go,Bi,yo,Ri,fp,Ni,mp,Ga=U(()=>{Va(),Oi=typeof location>"u"?void 0:location.origin,Sa=import.meta.url>"file:"&&import.meta.url<"file;",fo=()=>{{if(Sa){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Oi).href}return import.meta.url}},Re=fo(),hp=()=>{if(Re&&!Re.startsWith("blob:"))return Re.substring(0,Re.lastIndexOf("/")+1)},Cr=(e,t)=>{try{let r=t??Re;return(r?new URL(e,r):new URL(e)).origin===Oi}catch{return!1}},mo=(e,t)=>{let r=t??Re;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},go=(e,t)=>`${t??"./"}${e}`,Bi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},yo=async e=>(await import(e)).default,Ri=(cy(),hr(lp)).default,fp=async()=>{if(!Re)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Cr(Re))return[void 0,Ri()];let e=await Bi(Re);return[e,Ri(e)]},Ni=(hy(),hr(pp)).default,mp=async(e,t,r,i)=>{let a=Ni&&!(e||t);if(a)if(Re)a=Cr(Re);else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Ni];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??mo(n,t),u=r&&s&&!Cr(s,t),l=u?await Bi(s):s??go(n,t);return[u?l:void 0,await yo(l)]}}}),Mi,Ar,Xt,Di,_o,wo,bo,Ha,ye,Nt=U(()=>{Ga(),Ar=!1,Xt=!1,Di=!1,_o=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},wo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},bo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ha=async e=>{if(Ar)return Promise.resolve();if(Xt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Di)throw new Error("previous call to 'initializeWebAssembly()' failed.");Xt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!bo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!wo())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=_o();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,u=s?.href??s,l=a?.wasm,p=l?.href??l,h=e.wasmBinary,[f,g]=await mp(u,n,r>1,!!h||!!p),y=!1,_=[];if(t>0&&_.push(new Promise($=>{setTimeout(()=>{y=!0,$()},t)})),_.push(new Promise(($,T)=>{let x={numThreads:r};if(h)x.wasmBinary=h;else if(p||n)x.locateFile=w=>p??n+w;else if(u&&u.indexOf("blob:")!==0)x.locateFile=w=>new URL(w,u).href;else if(f){let w=hp();w&&(x.locateFile=I=>w+I)}g(x).then(w=>{Xt=!1,Ar=!0,Mi=w,$(),f&&URL.revokeObjectURL(f)},w=>{Xt=!1,Di=!0,T(w)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Ar&&Mi)return Mi;throw new Error("WebAssembly is not initialized yet.")}}),Ke,Fr,fe,Fa=U(()=>{Nt(),Ke=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Fr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Fr(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},fe=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),gp,fy=U(()=>{Nt(),Fa(),gp=e=>{let t=ye(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=Ke(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&fe("Can't create run options."),e?.extra!==void 0&&Fr(e.extra,"",new WeakSet,(s,u)=>{let l=Ke(s,i),p=Ke(u,i);t._OrtAddRunConfigEntry(r,l,p)!==0&&fe(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),$o,vo,xo,Jt,So,yp,my=U(()=>{Nt(),Fa(),$o=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},vo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},xo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Jt=(e,t,r,i)=>{let a=Ke(t,i),n=Ke(r,i);ye()._OrtAddSessionConfigEntry(e,a,n)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},So=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let n=typeof a=="string"?a:a.name,s=[];switch(n){case"webnn":if(n="WEBNN",typeof a!="string"){let f=a?.deviceType;f&&Jt(e,"deviceType",f,r)}break;case"webgpu":if(n="JS",typeof a!="string"){let f=a;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Jt(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let u=Ke(n,r),l=s.length,p=0,h=0;if(l>0){p=ye()._malloc(l*ye().PTR_SIZE),r.push(p),h=ye()._malloc(l*ye().PTR_SIZE),r.push(h);for(let f=0;f<l;f++)ye().setValue(p+f*ye().PTR_SIZE,s[f][0],"*"),ye().setValue(h+f*ye().PTR_SIZE,s[f][1],"*")}await ye()._OrtAppendExecutionProvider(e,u,p,h,l)!==0&&fe(`Can't append execution provider: ${n}.`)}},yp=async e=>{let t=ye(),r=0,i=[],a=e||{};xo(a);try{let n=$o(a.graphOptimizationLevel??"all"),s=vo(a.executionMode??"sequential"),u=typeof a.logId=="string"?Ke(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=a.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let h=typeof a.optimizedModelFilePath=="string"?Ke(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,p,h),r===0&&fe("Can't create session options."),a.executionProviders&&await So(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Jt(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[f,g]of Object.entries(a.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let y=Ke(f,i);t._OrtAddFreeDimensionOverride(r,y,g)!==0&&fe(`Can't set a free dimension override: ${f} - ${g}.`)}return a.extra!==void 0&&Fr(a.extra,"",new WeakSet,(f,g)=>{Jt(r,f,g,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),Et,ot,zt,ti,jr,ja,Ka,Ta,J=U(()=>{Et=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ot=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},zt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},ti=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},jr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ja=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ka=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ta=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Qa,_p=U(()=>{Va(),Qa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let p=l.byteLength;new Uint8Array(n,s,p).set(l),s+=p}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),To,ko,Io,Eo,Za,zo,le,ut=U(()=>{J(),To=["V","I","W","E","F"],ko=(e,t)=>{console.log(`[${To[e]},${new Date().toISOString()}]${t}`)},Za=(e,t)=>{Io=e,Eo=t},zo=(e,t)=>{let r=jr(e),i=jr(Io);r>=i&&ko(r,typeof t=="function"?t():t)},le=(...e)=>{Eo&&zo(...e)}}),Co,Gt,O,Kr,wp,bp,$p,re=U(()=>{Co=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Gt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let u=Co.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=r?3:1;u<=n;u++){let l=i-u<0?1:e[i-u],p=a-u<0?1:t[a-u];if(l!==p&&l>1&&p>1)return;let h=Math.max(l,p);if(l&&p)s[n-u]=Math.max(l,p);else{if(h>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},O=class Wr{static size(t){return Wr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Wr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Wr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},Kr=class lr{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)lr.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,n,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return lr.computeShapeHelper(t,r,l,i,a,n,s,u),l}static computeConvOutputShape(t,r,i,a,n,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return lr.computeShapeHelper(!1,t,l,i,a,n,s,u),l}static computeShapeHelper(t,r,i,a,n,s,u,l){if(t)for(let p=0;p<r.length-2;p++)i.push(1);else for(let p=0;p<r.length-2;p++)i.push(lr.adjustPadAndReturnShape(r[p+2],a[p],n[p],s[p],u,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,n,s,u,l){let p=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),n[u]=h-n[s],Math.floor((t+h-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[u]-p)/r+1)}},wp=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Gt.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},bp=-34028234663852886e22,$p=34028234663852886e22}),Ya,vp=U(()=>{J(),Ya=(e,t)=>new(ti(t))(e)}),Pi,ka,Ui,Ao,qi,Oo,Li,Wi,Vi,Bo,xp,gy=U(()=>{J(),ut(),Pi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ka=(e,t)=>{if(t==="int32")return e;let r=Pi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(ti(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let l=n[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ui=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Ao=1,qi=()=>Ao++,Oo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Li=(e,t)=>{let r=Pi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Wi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Li(this.dataType,this.tensorShape)}destroy(){le("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ui(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},Vi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e),s;if(!n?.input.dataTypes.includes(t)){if(s=Oo.get(t),!s||n?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);le("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Li(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ka(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else le("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Ui(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Bo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=qi();return this.tensorTrackersById.set(e,new Vi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){le("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){le("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=qi(),s=new Wi({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new Vi(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s){let u=this.getMLContext(e);for(let[p,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){le("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=e,f}le("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new Wi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},xp=(...e)=>new Bo(...e)}),er,Ro,Sp,yy=U(()=>{J(),Nt(),vp(),gy(),ut(),er=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Ro=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Sp=class{constructor(e){this.tensorManager=xp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Za(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){le("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){le("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)le("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Ro(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){le("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=er.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){le("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=er.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");le("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ya(r,t)}}registerMLTensor(e,t,r,i){let a=er.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return le("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=n.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+r).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(p);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":h=new Int32Array(p);break;case"uint32":h=new Uint32Array(p);break;case"int64":if(s){let f=ka(new Uint8Array(p),"int64");h=new Int32Array(f.buffer),a.dataType="int32"}else h=new BigInt64Array(p);break;case"uint64":h=new BigUint64Array(p);break;case"int8":h=new Int8Array(p);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return le("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=er.get(Et(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!a?.input.dataTypes.includes(i):!!a?.output.dataTypes.includes(i)}flush(){}}}),Xa=U(()=>{}),Gi,Or,Br,No,Mo,Hi,Ia,Do,Tp,_y=U(()=>{ut(),Xa(),Gi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Or=[],Br=e=>Math.ceil(Number(e)/16)*16,No=e=>{for(let t=0;t<Or.length;t++){let r=Or[t];if(e<=r)return r}return Math.ceil(e/16)*16},Mo=1,Hi=()=>Mo++,Ia=async(e,t,r,i)=>{let a=Br(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{n.destroy()}},Do=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Gi)Or.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=Br(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,a)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([p.finish()]),u.destroy(),le("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Br(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Hi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),le("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=No(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Hi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),le("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return le("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Ia(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Gi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(le("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Tp=(...e)=>new Do(...e)}),Po,he,ve=U(()=>{Po=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Po(e)}),Ht,Rr,ke,ze,K,$e,Ea,Wt,_t,j,tr,N,F,kp,Ja,Uo,Ip,ie=U(()=>{J(),re(),Ht=64,Rr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ke=(e,t=1)=>{let r=Rr(e,t);return typeof r=="string"?r:r[0]},ze=(e,t=1)=>{let r=Rr(e,t);return typeof r=="string"?r:r[1]},K=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,Ea=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Wt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,_t=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,tr=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Rr(t,a),h=typeof p=="string"?p:p[1],f=typeof p=="string"?p:p[0],g={indices:l,value:h,storage:f,tensor:t},y=M=>typeof M=="string"?M:`${M}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=n?"uniforms.":"",T=`${$}${e}_shape`,x=`${$}${e}_strides`,w="";for(let M=0;M<s-1;M++)w+=`
    let dim${M} = current / ${j(x,M,s)};
    let rest${M} = current % ${j(x,M,s)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;w+=`indices[${s-1}] = current;`;let I=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,S=M=>(_.offsetToIndices=!0,s<2?M:`o2i_${e}(${M})`),E=[];if(s>=2)for(let M=s-1;M>=0;M--)E.push(`${j(x,M,s)} * (indices[${M}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=M=>(_.indicesToOffset=!0,s<2?M:`i2o_${e}(${M})`),v=(...M)=>s===0?"0u":`${g.indices}(${M.map(y).join(",")})`,P=(M,W)=>s<2?`${M}`:`${j(M,W,s)}`,q=(M,W,te)=>s<2?`${M}=${te};`:`${j(M,W,s)}=${te};`,Y={},H=(M,W)=>{_.broadcastedIndicesToOffset=!0;let te=`${W.name}broadcastedIndicesTo${e}Offset`;if(te in Y)return`${te}(${M})`;let oe=[];for(let Oe=s-1;Oe>=0;Oe--){let Be=W.indicesGet("outputIndices",Oe+W.rank-s);oe.push(`${P(x,Oe)} * (${Be} % ${P(T,Oe)})`)}return Y[te]=`fn ${te}(outputIndices: ${W.type.indices}) -> u32 {
             return ${oe.length>0?oe.join("+"):"0u"};
           }`,`${te}(${M})`},Q=(M,W)=>(()=>{if(g.storage===g.value)return`${e}[${M}]=${W};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${M}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${M}]=vec2<u32>(u32(${W}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),B=M=>(()=>{if(g.storage===g.value)return`${e}[${M}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${M}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${M}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),D=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${h} {
    return ${B(`i2o_${e}(indices)`)};
  }`,G=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),W=u.map(te=>`d${te}`).join(", ");return`
  fn get_${e}(${M}) -> ${h} {
    return get_${e}ByIndices(${v(W)});
  }`})(),ee=(...M)=>{if(M.length!==s)throw new Error(`indices length must be ${s}`);let W=M.map(y).join(",");return s===0?B("0u"):s===1?B(W[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${W})`)},Z=M=>s<2?B(M):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${M})`),X=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${h}) {
    ${Q(`i2o_${e}(indices)`,"value")}
  }`,de=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),W=u.map(te=>`d${te}`).join(", ");return`
  fn set_${e}(${M}, value: ${h}) {
    set_${e}ByIndices(${v(W)}, value);
  }`})();return{impl:()=>{let M=[],W=!1;return _.offsetToIndices&&(M.push(I),W=!0),_.indicesToOffset&&(M.push(C),W=!0),_.broadcastedIndicesToOffset&&(Object.values(Y).forEach(te=>M.push(te)),W=!0),_.set&&(M.push(de),W=!0),_.setByIndices&&(M.push(X),W=!0),_.get&&(M.push(G),W=!0),_.getByIndices&&(M.push(D),W=!0),!n&&W&&M.unshift(`const ${T} = ${g.indices}(${r.join(",")});`,`const ${x} = ${g.indices}(${O.computeStrides(r).join(",")});`),M.join(`
`)},type:g,offsetToIndices:S,indicesToOffset:A,broadcastedIndicesToOffset:H,indices:v,indicesGet:P,indicesSet:q,set:(...M)=>{if(M.length!==s+1)throw new Error(`indices length must be ${s}`);let W=M[s];if(typeof W!="string")throw new Error("value must be string");let te=M.slice(0,s).map(y).join(",");return s===0?Q("0u",W):s===1?Q(te[0],W):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${te}, ${W})`)},setByOffset:Q,setByIndices:(M,W)=>s<2?Q(M,W):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${M}, ${W});`),get:ee,getByOffset:B,getByIndices:Z,usage:i,name:e,strides:x,shape:T,rank:s}},N=(e,t,r,i=1)=>tr(e,t,r,"input",i),F=(e,t,r,i=1)=>tr(e,t,r,"output",i),kp=(e,t,r)=>tr(e,t,r,"atomicOutput",1),Ja=(e,t,r,i=1)=>tr(e,t,r,"internal",i),Uo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Ht){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ip=(e,t)=>new Uo(e,t)}),qo,Fi,Lo,Wo,Vo,Go,Me,Ep,zp,wt=U(()=>{J(),re(),ve(),ie(),qo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Fi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Lo=(e,t)=>O.sortBasedOnPerm(e,Fi(e.length,t)),Wo=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},Vo=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},Go=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Me=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Fi(i,t),n=Lo(e.dims,a),s=e.dims,u=n,l=i<2||Go(a,e.dims),p;if(l)return p=_=>{let $=N("input",r,s,4),T=F("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables($,T)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:p};let{newShape:h,newPerm:f}=Vo(e.dims,a),g=O.areEqual(f,[2,3,1]),y=O.areEqual(f,[3,1,2]);if(h.length===2||g||y){s=g?[h[0],h[1]*h[2]]:y?[h[0]*h[1],h[2]]:h,u=[s[1],s[0]];let _=16;return p=$=>{let T=N("a",r,s.length),x=F("output",r,u.length);return`
  ${$.registerUniform("output_size","u32").declareVariables(T,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${$.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let $=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:$},...K(s,u)]}},getShaderSource:p}}return p=_=>{let $=N("a",r,s.length),T=F("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables($,T)}

  ${Wo(a,i,$,T)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",$.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...K(s,u)]}},getShaderSource:p}},Ep=(e,t)=>{qo(e.inputs,t.perm),e.compute(Me(e.inputs[0],t.perm))},zp=e=>he({perm:e.perm})}),Ho,Fo,jo,Ko,Qo,Zo,Yo,Xo,Jo,eu,Ve,Cp,Ap,Op,Bp,Rp,Np,Mp,Dp,Pp,Up,wy=U(()=>{J(),re(),ie(),en(),wt(),Ho={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Fo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},jo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ko={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Qo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Zo=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},Yo=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},Xo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Jo=(e,t)=>{let r=[];if(!Xo(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},eu=(e,t,r,i,a,n,s)=>{let u=r[0].dims,l=O.size(n),p=O.size(s),h=N("_A",r[0].dataType,u),f=F("output",a,n),g=64;l===1&&(g=256);let y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=$=>`
        ${$.registerUniform("reduceSize","u32").declareVariables(h,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${jo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${Ho[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Fo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Ko[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},Ve=(e,t,r,i)=>{let a=e.inputs.length===1?r:za(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((y,_)=>_));let s=O.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=Jo(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Me(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=Qo(u.length,l.dims.length));let[h,f]=Zo(l.dims,u),g=h;a.keepDims&&(g=Yo(h,s)),e.compute(eu(t,a.cacheKey,[l],i,e.inputs[0].dataType,g,f),{inputs:[l]})},Cp=(e,t)=>{Ve(e,"ReduceMeanShared",t,"mean")},Ap=(e,t)=>{Ve(e,"ReduceL1Shared",t,"l1")},Op=(e,t)=>{Ve(e,"ReduceL2Shared",t,"l2")},Bp=(e,t)=>{Ve(e,"ReduceLogSumExpShared",t,"logSumExp")},Rp=(e,t)=>{Ve(e,"ReduceMaxShared",t,"max")},Np=(e,t)=>{Ve(e,"ReduceMinShared",t,"min")},Mp=(e,t)=>{Ve(e,"ReduceProdShared",t,"prod")},Dp=(e,t)=>{Ve(e,"ReduceSumShared",t,"sum")},Pp=(e,t)=>{Ve(e,"ReduceSumSquareShared",t,"sumSquare")},Up=(e,t)=>{Ve(e,"ReduceLogSumShared",t,"logSum")}}),Ge,tu,Qr,za,He,ru,iu,au,nu,su,ou,uu,lu,du,pu,Fe,qp,Lp,Wp,Vp,Gp,Hp,Fp,jp,Kp,Qp,en=U(()=>{J(),re(),ve(),ie(),wy(),Ge=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},tu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,r,i,a,n,s=!1,u=!1)=>{let l=[],p=r[0].dims,h=p.length,f=O.normalizeAxes(a,h),g=!u&&f.length===0;p.forEach(($,T)=>{g||f.indexOf(T)>=0?s&&l.push(1):l.push($)});let y=l.length,_=O.size(l);return{name:e,shaderCache:t,getShaderSource:$=>{let T=[],x=N("_A",r[0].dataType,h),w=F("output",n,y),I=i(x,w,f),S=I[2];for(let E=0,C=0;E<h;E++)g||f.indexOf(E)>=0?(s&&C++,S=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${I[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${x.indicesSet("input_indices",E,`j${E}`)}
                  ${S}
                }`):(T.push(`${x.indicesSet("input_indices",E,w.indicesGet("output_indices",C))};`),C++);return`

        ${$.registerUniform("output_size","u32").declareVariables(x,w)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${S}
          ${I[3]}
          ${I.length===4?w.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...K(p,l)]})}},za=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},He=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:za(a,r);e.compute(Qr(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?tu:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},ru=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},iu=(e,t)=>{Ge(e.inputs),He(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},au=(e,t)=>{Ge(e.inputs),He(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},nu=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},su=(e,t)=>{Ge(e.inputs),He(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},ou=(e,t)=>{Ge(e.inputs),He(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},uu=(e,t)=>{Ge(e.inputs),He(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},lu=(e,t)=>{Ge(e.inputs),He(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},du=(e,t)=>{Ge(e.inputs),He(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},pu=(e,t)=>{Ge(e.inputs),He(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Fe=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},qp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ou(e,t):Cp(e,t)},Lp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?iu(e,t):Ap(e,t)},Wp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?au(e,t):Op(e,t)},Vp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nu(e,t):Bp(e,t)},Gp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?su(e,t):Rp(e,t)},Hp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?uu(e,t):Np(e,t)},Fp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lu(e,t):Mp(e,t)},jp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?du(e,t):Dp(e,t)},Kp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pu(e,t):Pp(e,t)},Qp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ru(e,t):Up(e,t)}}),ji,Zp,Yp,Ca,by=U(()=>{J(),ve(),en(),ji=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Zp=(e,t)=>{ji(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Yp=(e,t)=>{ji(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ca=e=>he(e)}),cu,Nr,hu,fu,mu,fr,gu,Xp,tn=U(()=>{J(),re(),Xa(),ie(),cu=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],h=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=a.dims[0]/3,g=f,y=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=p;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==f+g+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let $=0;if(s){if(g!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||($=s.dims[3])}let T=_+$,x=-1,w=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:$,kvSequenceLength:_,totalSequenceLength:T,maxSequenceLength:x,inputHiddenSize:h,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Nr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,hu=(e,t,r,i,a,n,s,u)=>{let l=$e(s?1:n),p=64,h=n/l;h<p&&(p=32);let f=Math.ceil(n/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:h},{type:12,data:f}],y=ke(e.dataType,l),_=ze(1,l),$=["type"];s&&$.push("type"),u&&$.push("type");let T=x=>{let w=F("x",e.dataType,e.dims,l),I=[w],S=s?N("seq_lens",s.dataType,s.dims):void 0;S&&I.push(S);let E=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;E&&I.push(E);let C=ze(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${x.registerUniforms(A).declareVariables(...I)}
  ${x.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Nr(S,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${y};${l}`,inputDependencies:$},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:g})}},fu=(e,t,r,i,a,n,s,u,l)=>{let p=s+n.kvSequenceLength,h=[n.batchSize,n.numHeads,n.sequenceLength,p],f=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=f?[n.batchSize,g,p,n.headSize]:void 0,_=n.nReps?n.nReps:1,$=n.scale===0?1/Math.sqrt(n.headSize):n.scale,T=$e(n.headSize),x=n.headSize/T,w=12,I={x:Math.ceil(p/w),y:Math.ceil(n.sequenceLength/w),z:n.batchSize*n.numHeads},S=[{type:12,data:n.sequenceLength},{type:12,data:x},{type:12,data:p},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:$},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:_}],E=f&&i&&O.size(i.dims)>0,C=["type","type"];E&&C.push("type"),a&&C.push("type"),u&&C.push("type"),l&&C.push("type");let A=[{dims:h,dataType:t.dataType,gpuDataType:0}];f&&A.push({dims:y,dataType:t.dataType,gpuDataType:0});let v=P=>{let q=N("q",t.dataType,t.dims,T),Y=N("key",r.dataType,r.dims,T),H=[q,Y];if(E){let X=N("past_key",i.dataType,i.dims,T);H.push(X)}a&&H.push(N("attention_bias",a.dataType,a.dims));let Q=u?N("seq_lens",u.dataType,u.dims):void 0;Q&&H.push(Q);let B=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;B&&H.push(B);let D=F("output",t.dataType,h),G=[D];f&&G.push(F("present_key",t.dataType,y,T));let ee=ze(1,T),Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${q.type.storage}, ${w*w}>;
  ${P.registerUniforms(Z).declareVariables(...H,...G)}
  ${P.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Nr(Q,B,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${D.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${a!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:A,dispatchGroup:I,programUniforms:S}),getShaderSource:v}},mu=(e,t,r,i,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,p=a.nReps?a.nReps:1,h=a.vHiddenSize*p,f=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=f?[a.batchSize,g,l,a.headSize]:void 0,_=[a.batchSize,a.sequenceLength,h],$=12,T={x:Math.ceil(a.vHeadSize/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},x=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:p}],w=f&&i&&O.size(i.dims)>0,I=["type","type"];w&&I.push("type"),s&&I.push("type"),u&&I.push("type");let S=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let E=C=>{let A=N("probs",t.dataType,t.dims),v=N("v",r.dataType,r.dims),P=[A,v];w&&P.push(N("past_value",i.dataType,i.dims));let q=s?N("seq_lens",s.dataType,s.dims):void 0;s&&P.push(q);let Y=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(Y);let H=[F("output",t.dataType,_)];f&&H.push(F("present_value",t.dataType,y));let Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${A.type.value}, ${$*$}>;
  var<workgroup> tileV: array<${A.type.value}, ${$*$}>;
  ${C.registerUniforms(Q).declareVariables(...P,...H)}
  ${C.mainStart([$,$,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Nr(q,Y,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:S,dispatchGroup:T,programUniforms:x}),getShaderSource:E}},fr=(e,t,r,i,a,n,s,u,l,p,h=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),y=g>1?p.pastSequenceLength:0,_=y+p.kvSequenceLength,$=l&&O.size(l.dims)>0?l:void 0,T=[t,r];g>1&&s&&O.size(s.dims)>0&&T.push(s),$&&T.push($),h&&T.push(h),f&&T.push(f);let x=e.compute(fu(g,t,r,s,$,p,y,h,f),{inputs:T,outputs:g>1?[-1,1]:[-1]})[0];e.compute(hu(x,p.batchSize,p.numHeads,y,p.sequenceLength,_,h,f),{inputs:h&&f?[x,h,f]:[x],outputs:[]});let w=[x,i];g>1&&u&&O.size(u.dims)>0&&w.push(u),h&&w.push(h),f&&w.push(f),e.compute(mu(g,x,i,u,p,y,h,f),{inputs:w,outputs:g>1?[0,2]:[0]})},gu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=f=>{let g=F("output_q",l[0].dataType,r),y=F("output_k",l[0].dataType,r),_=F("output_v",l[0].dataType,r),$=N("input",l[0].dataType,l[0].dims),T=N("weight",l[1].dataType,l[1].dims),x=N("bias",l[2].dataType,l[2].dims),w=$.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${f.registerUniforms(I).declareVariables($,T,x,g,y,_)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:h},{inputs:l,outputs:[-1,-1,-1]})},Xp=(e,t)=>{let r=cu(e.inputs,t),[i,a,n]=gu(e,r);return fr(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),yu,_u,wu,Jp,$y=U(()=>{Le(),J(),re(),ve(),ie(),yu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},_u=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?$e(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=O.size(n)/s,p=i,h=p?n.length:n,f=N("x",e[0].dataType,e[0].dims,s),g=N("scale",e[1].dataType,e[1].dims,u),y=N("bias",e[2].dataType,e[2].dims,u),_=N("inputMean",e[3].dataType,e[3].dims,u),$=N("inputVar",e[4].dataType,e[4].dims,u),T=F("y",e[0].dataType,h,s),x=()=>{let I="";if(i)I=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let S=1;S<g.rank;S++)I+=`cIndices[${S}] = outputIndices[${S}];`;I+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return I},w=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(f,g,y,_,$,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${x()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...K(n)]:[{type:12,data:l}]})}},wu=e=>he(e),Jp=(e,t)=>{let{inputs:r,outputCount:i}=e,a=wu({...t,outputCount:i});if(ge.webgpu.validateInputContent&&yu(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(_u(r,a))}}),bu,$u,ec,vy=U(()=>{re(),ie(),bu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},$u=e=>{let t=e[0].dims,r=e[0].dims[2],i=O.size(t)/4,a=e[0].dataType,n=N("input",a,t,4),s=N("bias",a,[r],4),u=N("residual",a,t,4),l=F("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(n,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},ec=e=>{bu(e.inputs),e.compute($u(e.inputs))}}),vu,ce,tc,rc,ic,ac,nc,sc,oc,uc,lc,xu,dc,pc,cc,hc,dr,fc,Vr,mc,gc,yc,_c,wc,bc,$c,vc,xc,Sc,Tc,kc,Ic,Ec,zc,Cc,Ki,Ac,Aa,Oa,Oc,Bc,Rc,Su,Tu,Nc,rn=U(()=>{J(),re(),ve(),ie(),vu=(e,t,r,i,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let p=N("inputData",r,[u],4),h=F("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(p,h)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:p=>vu(p,O.size(e.dims),e.dataType,n,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(O.size(p[0].dims)/64/4)},programUniforms:l})}},tc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},rc=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},ic=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},ac=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},nc=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},sc=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},oc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},uc=e=>he(e),lc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},xu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},dc=(e,t)=>{let r=t||xu(e.inputs),i=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},pc=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},cc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},hc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},dr=e=>he(e),fc=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Vr=(e="f32")=>`
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
}`,mc=e=>{let t=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Vr(t)))},gc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},yc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},_c=e=>{let t=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Vr(t)))},wc=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},bc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},$c=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},vc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},xc=e=>{let t=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Sc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Tc=e=>he(e),kc=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Ic=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},Ec=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},zc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Cc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Ki=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Ac=e=>{e.compute(ce(e.inputs[0],"Tanh",Ki))},Aa=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ki("v")};
}
`,Oa=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Oc=e=>{let t=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Oa,Aa(t),void 0,e.inputs[0].dataType))},Bc=(e,t)=>{let r=ze(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Rc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Su=(e,t)=>`
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
`,Tu=e=>`quick_gelu_impl(${e})`,Nc=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Tu,Su(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),ku,Iu,Mc,xy=U(()=>{re(),ie(),rn(),ku=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Iu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),i=N("bias",e[0].dataType,[e[0].dims[2]],4),a=F("output",e[0].dataType,t,4),n=O.size(t)/4,s=ke(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${Vr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Mc=e=>{ku(e.inputs),e.compute(Iu(e.inputs))}}),Eu,zu,je,Dc,Pc,Uc,qc,Lc,Wc,Vc,Gc,Hc,Fc,Sy=U(()=>{J(),re(),ie(),Eu=(e,t,r,i,a,n,s,u,l,p,h,f)=>{let g,y;typeof u=="string"?g=y=(w,I)=>`${u}((${w}),(${I}))`:typeof u=="function"?g=y=u:(g=u.scalar,y=u.vector);let _=F("outputData",h,i.length,4),$=N("aData",l,t.length,4),T=N("bData",p,r.length,4),x;if(a)if(n){let w=O.size(t)===1,I=O.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;w||I?x=_.setByOffset("global_idx",y(w?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):x=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(s||S?$.getByOffset("offsetA / 4u"):`${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=_.setByOffset("global_idx",y($.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(I,S,E="")=>{let C=`aData[indexA${S}][componentA${S}]`,A=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${_.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${$.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let offsetB${S} = ${T.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${I}[${S}] = ${E}(${g(C,A)});
          `};h===9?x=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:x=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables($,T,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},zu=(e,t,r,i,a,n,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!O.areEqual(u,l),h=u,f=O.size(u),g=!1,y=!1,_=[p];if(p){let $=Gt.calcShape(u,l,!1);if(!$)throw new Error("Can't perform binary op on the given tensors");h=$.slice(),f=O.size(h);let T=O.size(u)===1,x=O.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,I=l.length>0&&l[l.length-1]%4===0;_.push(T),_.push(x),_.push(w),_.push(I);let S=1;for(let E=1;E<h.length;E++){let C=u[u.length-E],A=l[l.length-E];if(C===A)S*=C;else break}S%4===0?(y=!0,g=!0):(T||x||w||I)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map($=>$.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:$=>Eu($,u,l,h,g,p,y,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:h,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(h)/4)},...K(u,l,h)]})}},je=(e,t,r,i,a,n)=>{e.compute(zu(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},Dc=e=>{je(e,"Add",(t,r)=>`${t}+${r}`)},Pc=e=>{je(e,"Div",(t,r)=>`${t}/${r}`)},Uc=e=>{je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},qc=e=>{je(e,"Mul",(t,r)=>`${t}*${r}`)},Lc=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Wc=e=>{je(e,"Sub",(t,r)=>`${t}-${r}`)},Vc=e=>{je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Gc=e=>{je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Hc=e=>{je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Fc=e=>{je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Cu,Au,Ou,Bu,jc,Kc,Ty=U(()=>{J(),re(),ve(),ie(),Cu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Au=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ou=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Bu=(e,t,r,i)=>{let a=O.size(r),n=new Array(e.length),s=new Array(e.length),u=0,l=[],p=[],h=[{type:12,data:a}];for(let $=0;$<e.length;++$)u+=e[$].dims[t],n[$]=u,p.push(e[$].dims.length),s[$]=N(`input${$}`,i,p[$]),l.push("rank"),h.push({type:12,data:n[$]});for(let $=0;$<e.length;++$)h.push(...K(e[$].dims));h.push(...K(r));let f=F("output",i,r.length),g=f.indicesGet("indices",t),y=Array.from(Array(n.length).keys()).map($=>`uniforms.sizeInConcatAxis${$}`).join(","),_=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)$.registerUniform(`sizeInConcatAxis${T}`,"u32");return $.declareVariables(...s,f)})()}

  ${Au(n.length,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ou(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:_}},jc=(e,t)=>{let r=e.inputs,i=r[0].dims,a=O.normalizeAxis(t.axis,i.length);Cu(r,a);let n=i.slice();n[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=r.filter(u=>O.size(u.dims)>0);e.compute(Bu(s,a,n,r[0].dataType),{inputs:s})},Kc=e=>he({axis:e.axis})}),Ot,Bt,Rt,an,Mt=U(()=>{J(),re(),Ot=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Bt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Rt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},an=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[bp,$p];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ee,Qc,nn=U(()=>{Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Qc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Zc,ky=U(()=>{Zc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),cr,sn,on=U(()=>{J(),re(),ie(),Mt(),cr=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${j(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,j(a,u+n,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},sn=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],h=s[s.length-1],f=$e(p),g=$e(h),y=$e(l),_=O.size(r)/f/y,$=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),x=[O.size(T),l,p],w=[{type:12,data:_},{type:12,data:l},{type:12,data:p},{type:12,data:h}];Bt(t,w),w.push(...K(T,s,u)),$&&w.push(...K(e[2].dims)),w.push(...K(x));let I=S=>{let E=Ja("batch_dims",e[0].dataType,T.length),C=N("a",e[0].dataType,s.length,g),A=N("b",e[1].dataType,u.length,f),v=F("output",e[0].dataType,x.length,f),P=ke(v.type.tensor),q=Ot(t,v.type.value,P),Y=[C,A],H="";if($){let D=a?f:1;Y.push(N("bias",e[2].dataType,e[2].dims.length,D)),H=`${a?`value += bias[col / ${D}];`:`value += ${v.type.value}(bias[row + i]);`}`}let Q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Rt(t,Q);let B=()=>{let D=`var a_data: ${C.type.value};`;for(let G=0;G<g;G++)D+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${f}];`;for(let G=0;G<y;G++){D+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${g}];`;for(let ee=0;ee<g;ee++)D+=`
            values[${G}] = fma(${A.type.value}(a_data${g===1?"":`[${ee}]`}), b_data${ee}, values[${G}]);
`}return D};return`
  ${S.registerUniforms(Q).registerInternalVariables(E).declareVariables(...Y,v)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${cr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${cr("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${v.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${B()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${H}
      ${q}
      let cur_indices = ${v.type.indices}(batch, row + i, col);
      let offset = ${v.indicesToOffset("cur_indices")};
      ${v.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${y};${a}`,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:I}}}),Ru,Nu,Ba,Qi,Mu,Ra,Du,Zr,un=U(()=>{J(),re(),ie(),Mt(),on(),nn(),Ru=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Nu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ba=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],h=a?l:n,f=a?n:l,g=h/t[0],y=n/t[1];if(!((a&&g===4&&e[1]===4||!a&&(g===3||g===4))&&h%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${h/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Ru(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Nu(a,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Qi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Mu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ra=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],h=e[0]*t[0],f=a?p:n,g=a?n:p;if(!(g%t[1]===0&&f%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let y=g/t[1],_=f/t[0],$=n/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Qi(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Qi(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Mu(a)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Du=(e,t,r,i,a=!1)=>{let[n,s,u,l]=i,p=ke(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${cr("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${cr("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Zr=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),f=O.size(h),g=s[s.length-2],y=s[s.length-1],_=u[u.length-1],$=y%4===0&&_%4===0,T=g<=8?[4,1,1]:[4,4,1],x=[8,8,1],w=[Math.ceil(_/x[0]/T[0]),Math.ceil(g/x[1]/T[1]),Math.ceil(f/x[2]/T[2])],I=$?4:1,S=[...l,g,y/I],E=S.length,C=[...p,y,_/I],A=C.length,v=[f,g,_/I],P=[{type:6,data:g},{type:6,data:_},{type:6,data:y}];Bt(t,P),P.push(...K(h,S,C));let q=["rank","rank"],Y=e.length>2;Y&&(P.push(...K(e[2].dims)),q.push("rank")),P.push(...K(v));let H=Q=>{let B=h.length,D=Ja("batchDims",e[0].dataType,B,1),G=ke(e[0].dataType),ee=N("a",e[0].dataType,E,I),Z=N("b",e[1].dataType,A,I),X=F("result",e[0].dataType,v.length,I),de=[ee,Z];if(Y){let Oe=a?I:1;de.push(N("bias",e[2].dataType,e[2].dims.length,Oe))}let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Rt(t,M);let W=ke(X.type.tensor),te=Ot(t,X.type.value,W),oe=Du(I,Y,te,[D,ee,Z,X],a);return`
  ${Q.registerUniforms(M).registerInternalVariables(D).declareVariables(...de,X)}
  ${oe}
  ${$?Ba(T,x,G,D):Ra(T,x,G,D)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${$};${a}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:H}}}),Pu,Yc,Iy=U(()=>{J(),ut(),ie(),Mt(),nn(),ky(),un(),Pu=(e,t,r,i,a=!1,n,s=4,u=4,l=4,p="f32")=>{let h=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},f=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
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
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",$=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",x=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${Ee(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${$}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(s)}
    }
    return resData;`,I=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ee(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ee(s,p)}(0.0);`,S=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${Ee(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${Ee(u,p)}(0.0);`,E=Ee(l,p),C=Ee(e?s:u,p),A=Ee(e?u:s,p),v=Ot(n,E,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?I:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${Qc(a)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Yc=(e,t,r,i,a,n,s,u,l)=>{let p=t.format==="NHWC",h=p?e[0].dims[3]:e[0].dims[1],f=r[0],g=p?r[2]:r[3],y=p?r[1]:r[2],_=p?r[3]:r[1],$=p&&(h%4===0||h%3===0)&&_%4===0,T=p?_:g*y,x=p?g*y:_,w=[8,8,1],I=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(T/w[0]/I[0]),Math.ceil(x/w[1]/I[1]),Math.ceil(f/w[2]/I[2])];le("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let E=$?p&&h%4!==0?3:4:1,C=w[1]*I[1],A=w[0]*I[0],v=Math.max(w[0]*E,w[1]),P=i%C===0,q=a%A===0,Y=n%v===0,H=$?[E,4,4]:[1,1,1],Q=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Bt(t,Q),Q.push(...K(e[0].dims,e[1].dims));let B=["rank","rank"];s&&(Q.push(...K(e[2].dims)),B.push("rank")),Q.push(...K(r));let D=G=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Rt(t,ee);let Z=$?4:1,X=ke(e[0].dataType),de=`
      fn setOutputAtIndex(flatIndex : i32, value : ${$?`vec4<${X}>`:X}) {
        result[flatIndex] = ${$?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$?"/ 4":""}, value);
      }`,M=N("x",e[0].dataType,e[0].dims.length,E===3?1:E),W=N("w",e[1].dataType,e[1].dims.length,Z),te=[M,W],oe=F("result",e[0].dataType,r.length,Z);if(s){let Oe=N("bias",e[2].dataType,e[2].dims.length,Z);te.push(Oe),de+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$?`vec4<${X}>`:X} {
          return bias[coords.${p?"w":"y"}${$?"/ 4":""}];
        }`}return`
        ${Zc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${G.registerUniforms(ee).declareVariables(...te,oe)}
        ${de}
        ${Pu(p,P,q,Y,s,t,H[0],H[1],H[2],X)}
        ${$?Ba(I,w,X,void 0,!p,v):Ra(I,w,X,void 0,!p,v,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${$};${P};${q};${Y};${C};${A};${v}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:Q}),getShaderSource:D}}}),Uu,Zi,rr,qu,Yi,Lu,Xc,Jc,Ey=U(()=>{J(),ut(),re(),ie(),Mt(),nn(),Uu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Zi=e=>typeof e=="number"?[e,e,e]:e,rr=(e,t)=>t<=1?e:e+(e-1)*(t-1),qu=(e,t,r,i=1)=>{let a=rr(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Yi=(e,t,r,i,a)=>{a==null&&(a=qu(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},Lu=(e,t,r,i,a,n,s,u,l,p)=>{let h,f,g,y;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=Yi([t,r,i,1],[u,l,p],1,[a,n,s],e);f=_[0],g=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every(($,T,x)=>$===x[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=Yi([t,r,i,1],[u,l,p],1,[a,n,s],e[0]);f=_[0],g=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/a),g=Math.ceil(r/n),y=Math.ceil(i/s);let _=(f-1)*a+u-t,$=(g-1)*n+l-r,T=(y-1)*s+p-i,x=Math.floor(_/2),w=_-x,I=Math.floor($/2),S=$-I,E=Math.floor(T/2),C=T-E;h={top:I,bottom:S,left:E,right:C,front:x,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:f,outHeight:g,outWidth:y}},Xc=(e,t,r,i,a,n=!1,s="channelsLast")=>{let u,l,p,h,f;if(s==="channelsLast")[u,l,p,h,f]=e;else if(s==="channelsFirst")[u,f,l,p,h]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,y,_,$]=t,[T,x,w]=Zi(r),[I,S,E]=Zi(i),C=rr(y,I),A=rr(_,S),v=rr($,E),{padInfo:P,outDepth:q,outHeight:Y,outWidth:H}=Lu(a,l,p,h,T,x,w,C,A,v),Q=n?g*f:g,B=[0,0,0,0,0];return s==="channelsFirst"?B=[u,Q,q,Y,H]:s==="channelsLast"&&(B=[u,q,Y,H,Q]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:h,inChannels:f,outDepth:q,outHeight:Y,outWidth:H,outChannels:Q,padInfo:P,strideDepth:T,strideHeight:x,strideWidth:w,filterDepth:y,filterHeight:_,filterWidth:$,effectiveFilterDepth:C,effectiveFilterHeight:A,effectiveFilterWidth:v,dilationDepth:I,dilationHeight:S,dilationWidth:E,inShape:e,outShape:B,filterShape:t}},Jc=(e,t,r,i,a,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],l={x:r.map((T,x)=>x)},p=[Math.ceil(Uu(l.x.map(T=>r[T]))/u[0]),1,1];le("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let h=1,f=O.size(r),g=[{type:12,data:f},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Bt(t,g),g.push(...K(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(g.push(...K(e[2].dims)),y.push("rank")),g.push(...K(r));let $=T=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Rt(t,x);let w=1,I=ke(e[0].dataType),S=N("x",e[0].dataType,e[0].dims.length,h),E=N("W",e[1].dataType,e[1].dims.length,w),C=[S,E],A=F("result",e[0].dataType,r.length,w),v="";if(_){let Y=N("bias",e[2].dataType,e[2].dims.length,w);C.push(Y),v+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${s?j("coords",4,5):j("coords",1,5)}];
        }`}let P=Ee(h,I),q=Ot(t,P,I);return`
            ${v}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${T.registerUniforms(x).declareVariables(...C,A)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,S.rank)};
              let d2 = ${s?j("coords",S.rank-1,S.rank):j("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?j("coords",1,S.rank):j("coords",2,S.rank)},
              ${s?j("coords",2,S.rank):j("coords",3,S.rank)},
              ${s?j("coords",3,S.rank):j("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?j("uniforms.x_shape",1,S.rank):j("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?j("uniforms.x_shape",2,S.rank):j("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?j("uniforms.x_shape",3,S.rank):j("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?j("uniforms.x_shape",4,S.rank):j("uniforms.x_shape",1,S.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${h};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:$}}}),eh,th,zy=U(()=>{J(),re(),ie(),Mt(),eh=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],h=p/t.group,f=l&&h>=4?$e(p):1,g=O.size(r)/f,y=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];Bt(t,y),y.push(...K(s,[u[0],u[1],u[2],u[3]/f]));let _=a?["rank","rank","rank"]:["rank","rank"];y.push(...K([r[0],r[1],r[2],r[3]/f]));let $=T=>{let x=F("output",e[0].dataType,r.length,f),w=ke(x.type.tensor),I=Ot(t,x.type.value,w),S=N("x",e[0].dataType,s.length),E=N("w",e[1].dataType,u.length,f),C=[S,E];a&&C.push(N("b",e[2].dataType,e[2].dims,f));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Rt(t,A);let v=l?`
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
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(A).declareVariables(...C,x)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${v}
    ${n}
    ${I}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:$}},th=(e,t,r,i)=>{let a=e.length>2,n=$e(r[3]),s=$e(r[2]),u=O.size(r)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],h=[r[0],r[1],r[2],r[3]/n],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Bt(t,f),f.push(...K(l,p,h));let g=(s-1)*t.strides[1]+p[1],y=_=>{let $=F("output",e[0].dataType,h.length,n),T=ke($.type.tensor),x=Ot(t,$.type.value,T),w=N("x",e[0].dataType,l.length,n),I=N("w",e[1].dataType,p.length,n),S=[w,I];a&&S.push(N("b",e[2].dataType,e[2].dims,n));let E=a?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Rt(t,C),`
  ${_.registerUniforms(C).declareVariables(...S,$)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${$.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${x}
      ${$.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${g};${p[0]};${p[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:y}}}),Wu,Mr,Vu,Dr,Na,Xi,Gu,Hu,Ma,Cy=U(()=>{re(),Iy(),Ey(),un(),zy(),Mt(),on(),wt(),Wu=(e,t,r,i,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,p=t[0],h=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),f=u.map((g,y)=>g+i[y]+i[y+l]).map((g,y)=>Math.floor((g-h[y]+a[y])/a[y]));return f.splice(0,0,s),f.splice(n?3:1,0,p),f},Mr=[2,3,1,0],Vu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Dr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();Kr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Na=e=>{let t=an(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Xi=(e,t,r,i)=>{let a=r.format==="NHWC",n=Wu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let C=[t[0]];if(a){let A=e.kernelCustomData.wT??e.compute(Me(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),C.push(A)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(th(C,r,n,i),{inputs:C}):e.compute(eh(C,r,n,i),{inputs:C});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],p=t[0].dims[a?3:1],h=t[1].dims[2],f=t[1].dims[3],g=n[a?1:2],y=n[a?2:3],_=n[a?3:1],$=a&&h===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if($||h===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=n[0],A,v,P,q=[];if(a){let Q=e.kernelCustomData.wT??e.compute(Me(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Q),$){let B=u*l*p;A=t[0].reshape([1,C,B]),v=Q.reshape([1,B,_]),P=[1,C,_]}else A=t[0].reshape([C,u*l,p]),v=Q.reshape([1,p,_]),P=[C,g*y,_];q.push(A),q.push(v)}else A=t[0].reshape([C,p,u*l]),v=t[1].reshape([1,_,p]),P=[C,_,g*y],q.push(v),q.push(A);s&&q.push(t[2]);let Y=P[2],H=q[0].dims[q[0].dims.length-1];Y<8&&H<8?e.compute(sn(q,r,n,P,a,i),{inputs:q}):e.compute(Zr(q,r,n,P,a,i),{inputs:q});return}let T=!0,x=e.kernelCustomData.wT??e.compute(Me(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let w=[t[0],x];s&&w.push(t[2]);let I=a?g*y:_,S=a?_:g*y,E=h*f*p;e.compute(Yc(w,r,n,I,S,E,s,T,i),{inputs:w})},Gu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Dr({...t,pads:a,strides:n,dilations:s,kernelShape:u},i);Xi(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Hu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Dr(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Xc(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(Jc(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Ma=(e,t)=>{if(Vu(e.inputs,t),e.inputs[0].dims.length===3)Gu(e,t);else if(e.inputs[0].dims.length===5)Hu(e,e.inputs,t);else{let r=Dr(t,e.inputs);Xi(e,e.inputs,r)}}}),rh,Ay=U(()=>{J(),ut(),re(),ie(),rh=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],h=n?$e(l):1,f=n&&p===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/h)*h,y=l-g,_=n?$e(p):1,$=n?p===1?h:_:1,T=O.size(a)/_,x=[Math.ceil(T/64),1,1];le("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let w=["rank","rank"],I=[t.strides[0],t.strides[1]],S=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],E=[t.dilations[0],t.dilations[1]],C=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],A=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],v=[{type:12,data:T},{type:12,data:I},{type:12,data:S},{type:12,data:E},{type:12,data:C},{type:6,data:A},{type:12,data:g},{type:12,data:l},{type:12,data:p},...K(e[0].dims,e[1].dims)];i&&(v.push(...K(e[2].dims)),w.push("rank")),v.push(...K(a));let P=q=>{let Y=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],H=ke(e[0].dataType),Q=n?1:2,B=n?2:3,D=n?3:1,G=N("W",e[1].dataType,e[1].dims.length,$),ee=N("Dy",e[0].dataType,e[0].dims.length,h),Z=[ee,G];i&&Z.push(N("bias",e[2].dataType,[a[D]].length,_));let X=F("result",e[0].dataType,a.length,_),de=()=>{let te="";if(f)h===4?te+=`
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${G.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?te+=`
          dotProd = dotProd + dot(vec4<${H}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${H}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(te+=`
          dotProd = dotProd + dot(vec4<${H}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${H}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}, ${G.getByOffset("w_offset + 2u")}, ${G.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(te+=`
                  let xValue = ${n?ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):ee.get("batch","inputChannel","idyR","idyC")};
        `,h===1)te+=`
          let w_offset = ${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${G.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let oe=0;oe<h;oe++)te+=`
            let wValue${oe} = ${G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${oe}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${oe}] * wValue${oe};`;return te},M=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let te="";if(h===1){te+="dotProd = dotProd";for(let oe=0;oe<y;oe++)te+=`
            + ${ee.getByOffset(`x_offset + ${oe}`)} * ${G.getByOffset(`w_offset + ${oe}`)}`;te+=";"}else if(h===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);te+=`
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${G.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return te},W=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",D)};
            let r = ${X.indicesGet("outputIndices",Q)};
            let c = ${X.indicesGet("outputIndices",B)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${H}(dyRCorner) + ${H}(wR)) / ${H}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${H}(uniforms.Dy_shape[${Q}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${H}(dyCCorner) + ${H}(wC)) / ${H}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${H}(uniforms.Dy_shape[${B}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${G.indicesToOffset(`${G.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:h}) {
                  ${de()}
                  inputChannel = inputChannel + ${f?4:h};
                }
                ${M()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(Y).declareVariables(...Z,X)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${$}${_}${f}${y}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:v}),getShaderSource:P}}}),Fu,ju,Ku,Ji,ih,Qu,ea,Zu,ah,Oy=U(()=>{Ay(),Mt(),wt(),Fu=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,ju=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},Ku=(e,t,r,i,a,n,s,u,l,p)=>{let h=e.length-2,f=p.length===0;l.length<h&&l.push(...Array(h-l.length).fill(0));let g=e[0],y=t[u?3:1]*a;for(let _=0,$=e.length-h-(u?1:0);_<h;++_,++$){let T=e[$],x=f?T*s[_]:p[_],w=Fu(T,s[_],n[_],t[$],r[_],x);ju(w,i,n,_,_+h),f&&p.push(s[_]*(T-1)+l[_]+(t[$]-1)*r[_]+1-n[_]-n[_+h])}p.splice(0,0,g),p.splice(u?3:1,0,y)},Ji=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let p=e.strides.slice();if(p.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;p=new Array(f).fill(1)}Ku(u,r,l,e.autoPad,e.group,a,p,i,s,n);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:p}),h},ih=e=>{let t=an(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),h=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:h,outputShape:f,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Qu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ea=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Me(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(rh(n,r,i),{inputs:n})},Zu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let p=Ji({...t,pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l},i);ea(e,i,p,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},ah=(e,t)=>{if(Qu(e.inputs,t),e.inputs[0].dims.length===3)Zu(e,t);else{let r=Ji(t,e.inputs);ea(e,e.inputs,r)}}}),Yu,nh,sh,By=U(()=>{J(),re(),ve(),ie(),Yu=(e,t,r,i)=>{let a=O.size(t),n=t.length,s=N("input",e,n),u=F("output",e,n),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=O.normalizeAxis(l,n),h=f=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,y=j("uniforms.input_shape","uniforms.axis",n),_=i.reverse?g+(i.exclusive?" + 1":""):"0",$=i.reverse?y:g+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...K(t,t)]}),getShaderSource:h}},nh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(Yu(i,r,a,t),{inputs:[0]})},sh=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),Xu,Ju,el,oh,uh,Ry=U(()=>{J(),re(),ve(),ie(),Xu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Ju=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},el=(e,t)=>{let r,i,a,n,s,u,l=t.format==="NHWC",p=t.blocksize,h=t.mode==="DCR";l?([r,i,a,n]=e.dims,s=h?[r,i,a,p,p,n/p**2]:[r,i,a,n/p**2,p,p],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=h?[r,p,p,n/p**2,i,a]:[r,n/p**2,p,p,i,a],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),g=f.dims.length,y=e.dataType,_=N("a",y,g),$=F("output",y,g),T=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(_,$)}

  ${Ju(u,g,_,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let w=l?[r,i*p,a*p,n/p**2]:[r,n/p**2,i*p,a*p],I=O.size(w),S=f.dims,E=O.sortBasedOnPerm(S,u);return{outputs:[{dims:w,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...K(S,E)]}},getShaderSource:T}},oh=(e,t)=>{Xu(e.inputs),e.compute(el(e.inputs[0],t))},uh=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Pr,ir,ta,tl,rl,il,al,ra,nl,lh,dh,Ny=U(()=>{J(),re(),ve(),ie(),Pr="[a-zA-Z]|\\.\\.\\.",ir="("+Pr+")+",ta="^"+ir+"$",tl="("+ir+",)*"+ir,rl="^"+tl+"$",il=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},al=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(rl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(ta)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,s,n);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(ir)))throw new Error("Invalid RHS");i.match(RegExp(Pr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],u=0;if(!e.match(RegExp(ta))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Pr,"g")),p=new il(i);return l?.forEach((h,f)=>{if(h==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let g=a-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let _=String.fromCharCode(48+y);p.addSymbol(_,f+y),this.addSymbol(_,r[u++],i)}}else p.addSymbol(h,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],i)}),p}},ra=e=>e+"_max",nl=(e,t,r,i)=>{let a=e.map(p=>p.length).map((p,h)=>N(`input${h}`,t,p)),n=O.size(i),s=F("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let h=[],f="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",_=[],$=[],T=[],x=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,E)=>{if(r.rhs.symbolToIndices.has(E)){let C=r.rhs.symbolToIndices.get(E)?.[0];C!==void 0&&r.lhs.forEach((A,v)=>{if(S.inputIndices.includes(v)){let P=A.symbolToIndices.get(E);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(q=>{h.push(`${a[v].indicesSet(`input${v}Indices`,q,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,A)=>{if(S.inputIndices.includes(A)){let v=C.symbolToIndices.get(E);if(v===void 0)throw new Error("Invalid symbol error");v.forEach(P=>{_.push(`${a[A].indicesSet(`input${A}Indices`,P,`${E}`)}`)}),x.push(`prod *= ${a[A].getByIndices(`input${A}Indices`)};`)}}),$.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ra(E)}; ${E}++) {`),T.push("}")});let I=w?[...h,`let sum = ${a.map((S,E)=>S.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...h,g,...$,..._,f,...x,y,...T];return`
            ${p.registerUniforms(u.map(S=>({name:`${ra(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((S,E)=>`var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:n});let h=e.map((f,g)=>[...K(f)]).reduce((f,g)=>f.concat(g),p);return h.push(...K(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}},getShaderSource:l}},lh=(e,t)=>{let r=new al(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(nl(a,e.inputs[0].dataType,r,i))},dh=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),sl,ia,ol,ul,ph,My=U(()=>{J(),re(),ie(),sl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ia=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},ol=(e,t)=>e.length>t.length?ia(e,t):ia(t,e),ul=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=ol(t,r),a=e[0].dataType,n=a===9||O.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(O.size(i)/u),p=f=>{let g=N("input",a,t.length,s),y=F("output",a,i.length,u),_;if(a===9){let $=(T,x,w="")=>`
          let outputIndices${x} = ${y.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${g.broadcastedIndicesToOffset(`outputIndices${x}`,y)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${T}[${x}] = ${w}(${g.getByOffset(`index${x}`)}[component${x}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data",0,"u32")}
        ${$("data",1,"u32")}
        ${$("data",2,"u32")}
        ${$("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},h=[{type:12,data:l},...K(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},ph=e=>{sl(e.inputs),e.compute(ul(e.inputs),{inputs:[0]})}}),ll,ch,Dy=U(()=>{J(),re(),ie(),rn(),ll=e=>{let t=e[0].dataType,r=O.size(e[0].dims),i=O.size(e[1].dims),a=i%4===0,n=s=>{let u=N("x",t,[1],4),l=N("bias",t,[1],4),p=F("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,g=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(h).declareVariables(u,l,p)}

    ${Aa(ze(t))}

    ${s.mainStart(Ht)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Oa("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Ht/4)}})}},ch=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Oc(e):e.compute(ll(e.inputs))}}),dl,pl,hh,fh,Py=U(()=>{J(),re(),ve(),ie(),dl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},pl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=O.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let u=r[n],l=e[0].dataType===9?4:1,p=Math.ceil(O.size(s)/l),h=[{type:12,data:p},{type:6,data:u},{type:12,data:n},...K(e[0].dims,e[1].dims,s)],f=g=>{let y=N("data",e[0].dataType,e[0].dims.length,l),_=N("inputIndices",e[1].dataType,e[1].dims.length),$=F("output",e[0].dataType,s.length,l),T=w=>{let I=i.length,S=`var indicesIndices${w}  = ${_.type.indices}(0);`;for(let E=0;E<I;E++)S+=`${I>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;S+=`
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let E=0,C=0;E<a;E++)E===n?(S+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,C+=I):(S+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return S},x;if(e[0].dataType===9){let w=(I,S,E="")=>`
          let outputIndices${S} = ${$.offsetToIndices(`outputOffset + ${S}u`)};
          ${T(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${I}[${S}] = ${E}(${y.getByOffset(`index${S}`)}[component${S}]);
        `;x=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${$.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${y.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,$)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},hh=e=>he({axis:e.axis}),fh=(e,t)=>{let r=e.inputs;dl(r),e.compute(pl(e.inputs,t))}}),cl,mh,gh,Uy=U(()=>{J(),re(),ie(),cl=(e,t,r,i,a,n,s,u,l)=>{let p=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],h=[n];p.push(...K(t.dims,h));let f=g=>{let y=N("indices_data",t.dataType,t.dims.length),_=F("input_slice_offsets_data",12,1,1),$=[y,_],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(T).declareVariables(...$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},mh=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],u=O.sizeToDimension(n,n.length-1),l=O.sizeFromDimension(i,t.batchDims+s),p=O.sizeToDimension(i,t.batchDims),h=O.sizeFromDimension(i,t.batchDims),f=u/p,g=new Array(s),y=l;for(let S=0;S<s;++S)g[s-1-S]=y,y*=i[t.batchDims+s-1-S];let _=cl(e,r[1],g,t.batchDims,i,u,f,h,s),$=t.batchDims+s;if($>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=n.slice(0,-1).concat(i.slice($)),x=O.size(T),w=[{type:12,data:x},{type:12,data:l},...K(r[0].dims,_.dims,T)],I=S=>{let E=N("data",r[0].dataType,r[0].dims.length),C=N("slice_offsets",12,_.dims.length),A=F("output",r[0].dataType,T.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,A)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:a}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:w}),getShaderSource:I},{inputs:[r[0],_]})},gh=e=>({batchDims:e.batch_dims,cacheKey:""})}),hl,fl,yh,_h,qy=U(()=>{J(),re(),ve(),ie(),hl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},fl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=O.normalizeAxis(t.gatherAxis,a),s=O.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(n,1,...i);let l=O.size(u),p=e[2].dataType,h=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...K(...e.map((y,_)=>y.dims),u)],g=y=>{let _=N("data",e[0].dataType,e[0].dims.length),$=N("inputIndices",e[1].dataType,e[1].dims.length),T=N("scales",e[2].dataType,e[2].dims.length),x=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=F("output",p,u.length),I=[_,$,T];x&&I.push(x);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...I,w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ze(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},yh=(e,t)=>{let r=e.inputs;hl(r,t),e.compute(fl(e.inputs,t))},_h=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),ml,gl,wh,bh,Ly=U(()=>{J(),re(),ve(),ie(),ml=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},gl=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,u=O.normalizeAxis(t.axis,a),l=r[u],p=n.slice(0),h=O.size(p),f=N("input",i,a),g=N("indicesInput",s,n.length),y=F("output",i,p.length),_=[{type:12,data:h},{type:6,data:l},{type:12,data:u}];return _.push(...K(r,n,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,y)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},wh=e=>he({axis:e.axis}),bh=(e,t)=>{let r=e.inputs;ml(r),e.compute(gl(e.inputs,t))}}),yl,_l,$h,vh,Wy=U(()=>{J(),re(),ie(),yl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},_l=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=wp.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(n/l),h=Math.ceil(a/l),f=!0,g=O.size(u),y=[{type:12,data:f?p:g},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...K(e[2].dims)),_.push("rank")),y.push(...K(u));let $=x=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",S=N("a",e[0].dataType,e[0].dims),E=N("b",e[1].dataType,e[1].dims),C=S.type.value,A=null,v=[S,E];e.length===3&&(A=N("c",e[2].dataType,e[2].dims.length),v.push(A));let P=F("output",e[0].dataType,u.length);v.push(P);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(q).declareVariables(...v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${I}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=x=>{let w=N("a",e[0].dataType,e[0].dims),I=N("b",e[1].dataType,e[1].dims),S=null,E=[w,I];e.length===3&&(S=N("c",e[2].dataType,e[2].dims.length),E.push(S));let C=F("output",e[0].dataType,u.length);E.push(C);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],v="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${l}>, ${l}>;
  ${x.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${v}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*h},programUniforms:y}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:$}},$h=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},vh=(e,t)=>{yl(e.inputs),e.compute(_l(e.inputs,t))}}),tt,st,xt,St,wl,bl,$l,vl,xl,Sl,Tl,kl,xh,Sh,Vy=U(()=>{J(),re(),ve(),ie(),[tt,st,xt,St]=[0,1,2,3],wl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},bl=`
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
`,$l=e=>`
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
`,vl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,xl=e=>`
  ${e.paddingMode==="reflection"?`
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
      }`:""}
`,Sl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${tt}] = batch;
     indices[${st}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${xt}] = u32(r);
            indices[${St}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${xt}] = u32(clamp(r, 0, H - 1));
          indices[${St}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${xt}] = gs_reflect(r, border[1], border[3]);
          indices[${St}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Tl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${tt}], indices[${st}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${tt}], indices[${st}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${tt}], indices[${st}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,kl=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=N("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[tt,st,xt,St]=[0,3,1,2]);let s=F("output",e[0].dataType,n.length),u=r.type.value,l=O.size(n),p=[{type:12,data:l},...K(e[0].dims,i,n)],h=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${bl}
  ${$l(u)}
  ${vl(t)}
  ${xl(t)}
  ${Sl(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${xt}]);
      let W_in = i32(uniforms.x_shape[${St}]);

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${tt}], indices[${xt}], indices[${St}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Tl(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=O.size(n);return{outputs:[{dims:n,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:h}},xh=(e,t)=>{wl(e.inputs),e.compute(kl(e.inputs,t))},Sh=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ae,Il,Th,aa,El,pr,kh,Ih=U(()=>{J(),re(),ve(),Xa(),tn(),ie(),wt(),Ae=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Il=(e,t)=>{let r=e[0],i=Ae(e,1),a=Ae(e,2),n=Ae(e,3),s=Ae(e,4),u=Ae(e,5),l=Ae(e,6),p=Ae(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=f,_=0,$=0,T=Math.floor(g/t.numHeads);if(l&&p&&O.size(l.dims)&&O.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==h||p.dims[1]!==t.numHeads||p.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],$=l.dims[2]}else if(l&&O.size(l.dims)||p&&O.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(i&&O.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(n&&O.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=_+y,I=0;if(s&&O.size(s.dims)>0){I=8;let A=s.dims;throw A.length===1?A[0]===h?I=1:A[0]===3*h+2&&(I=3):A.length===2&&A[0]===h&&A[1]===w&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,E=g;if(a&&O.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=a.dims[1]*a.dims[3],S=!0}}let C=!1;if(s&&O.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&O.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:$,inputHiddenSize:0,hiddenSize:g,vHiddenSize:E,headSize:T,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:C,passPastInKv:S,qkvFormat:x}},Th=e=>he({...e}),aa=he({perm:[0,2,1,3]}),El=(e,t,r,i,a,n,s)=>{let u=[i,a,n],l=O.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],h=f=>{let g=F("qkv_with_bias",t.dataType,u),y=N("qkv",t.dataType,u),_=N("bias",r.dataType,u),$=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms($).declareVariables(y,_,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},pr=(e,t,r,i,a,n,s,u)=>{let l=n;if(s&&O.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=El(e,n,s,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(Me(l,aa.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,i,r,a])),r===1||i===1?l:e.compute(Me(l,aa.perm),{inputs:[l],outputs:[-1]})[0]},kh=(e,t)=>{let r=Il(e.inputs,t),i=e.inputs[0],a=Ae(e.inputs,1),n=Ae(e.inputs,2),s=Ae(e.inputs,3),u=Ae(e.inputs,4),l=Ae(e.inputs,5),p=Ae(e.inputs,6),h=Ae(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let f=a&&n&&a.dims.length===4&&n.dims.length===4,g=pr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(f)return fr(e,g,a,n,u,void 0,p,h,l,r);if(!a||!n)throw new Error("key and value must be provided");let y=pr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),_=pr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);fr(e,g,y,_,u,void 0,p,h,l,r)}}),zl,Cl,Al,Ol,Da,Eh,zh,Ch=U(()=>{J(),re(),ve(),ie(),zl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Cl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},Al=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ol=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Da=(e,t)=>{let r=e[0].dims,i=O.size(r),a=e[0].dataType,n=O.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=N("input",a,r.length),l=new Array(t.numOutputs),p=[],h=[],f=0,g=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],l[_]=f;let $=r.slice();$[n]=t.splitSizes[_],h.push($),s[_]=F(`output${_}`,a,$.length),p.push({dims:h[_],dataType:e[0].dataType})}g.push({type:12,data:l},...K(r,...h));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Al(l.length)}
  ${Ol(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Eh=(e,t)=>{zl(e.inputs);let r=e.inputs.length===1?t:Cl(e.inputs,t);e.compute(Da(e.inputs,r),{inputs:[0]})},zh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Bl,Yr,Ah,Oh=U(()=>{J(),re(),ve(),ie(),Bl=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(i.dims,[])&&!O.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!O.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],h=a.dims[0],f=O.sizeFromDimension(r.dims,1)/p,g=u===0?a.dims[1]*2:f/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(p>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Yr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=O.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,h=e[2].dims[1],f=a===0?h*2:p/i,g=new Array(s,l,p/f,f-h),y=O.computeStrides(g),_=[{type:1,data:n},{type:12,data:g},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,p,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...K(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],$=T=>{let x=N("input",e[0].dataType,e[0].dims.length),w=N("position_ids",e[1].dataType,e[1].dims.length),I=N("cos_cache",e[2].dataType,e[2].dims.length),S=N("sin_cache",e[3].dataType,e[3].dims.length),E=F("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${T.declareVariables(x,w,I,S,E)}

        ${T.mainStart(Ht)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",F("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(g)/Ht)},programUniforms:_})}},Ah=(e,t)=>{Bl(e.inputs,t),e.compute(Yr(e.inputs,t))}}),Rl,Nl,na,Ml,Bh,Gy=U(()=>{ve(),J(),tn(),Ih(),Ch(),wt(),Oh(),ie(),Rl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,g=0,y=!i||i.dims.length===0,_=Math.floor(y?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);y&&(h=_*t.numHeads);let $=n&&n.dims.length!==0,T=s&&s.dims.length!==0;if($&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if($&&T){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=n.dims[2]}else if($||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let w=0,I=!1,S=t.kvNumHeads?_*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=a.dims[1]*a.dims[3],I=!0}}let E=e.length>4?e[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:S,headSize:_,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:x}},Nl=he({perm:[0,2,1,3]}),na=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Me(i,Nl.perm),{inputs:[i],outputs:[-1]})[0]),i},Ml=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=h=>{let f=N("seq_lens",r.dataType,r.dims),g=N("total_seq_lens",i.dataType,i.dims),y=F("pos_ids",a,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(f,g,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Bh=(e,t)=>{let r=Rl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[g,y,_]=!a&&!n?e.compute(Da([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],$,T;if(t.doRotary){let S=e.compute(Ml(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],E=e.inputs[7],C=e.inputs[8],A=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),v=[g,S,E,C],P=[-1];$=e.compute(Yr(v,A),{inputs:v,outputs:P})[0],v.splice(0,1,y);let q=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Yr(v,q),{inputs:v,outputs:P})[0]}let x=pr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?$:g,void 0,0),w=na(e,t.doRotary?T:y,r),I=na(e,_,r);fr(e,x,w,I,void 0,void 0,s,u,void 0,r,l,p)}}),sa,Dl,Pl,Rh,Hy=U(()=>{J(),re(),wt(),ie(),sa=(e,t,r,i,a,n,s,u)=>{let l=$e(n),p=l===1?"f32":`vec${l}f`,h=l===1?"vec2f":`mat2x${l}f`,f=a*s,g=64;f===1&&(g=256);let y=[a,s,n/l],_=[a,s,2],$=["rank","type","type"],T=[];T.push(...K(y,_));let x=w=>{let I=N("x",t.dataType,3,l),S=N("scale",r.dataType,r.dims),E=N("bias",i.dataType,i.dims),C=F("output",1,3,2),A=[I,S,E,C];return`
  var<workgroup> workgroup_shared : array<${h}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${_t("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${_t("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:x},{inputs:[t,r,i],outputs:[-1]})[0]},Dl=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],u=i[1],l=O.sizeFromDimension(i,n),p=$e(l),h=O.size(a)/p,f=sa(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],y=[s,u],_=["type","none"],$=T=>{let x=N("x",t[0].dataType,g.length,p),w=N("scale_shift",1,y.length,2),I=F("output",t[0].dataType,g.length,p),S=[x,w,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...K(g,y,g)]}),getShaderSource:$},{inputs:[t[0],f]})},Pl=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],u=O.sizeFromDimension(i,1)/s,l=$e(s),p=O.size(a)/l,h=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],f=["type","type"],g=!1,y=[0,i.length-1];for(let x=0;x<i.length-2;x++)g=g||i[x+1]!==1,y.push(x+1);g=g&&i[i.length-1]!==1;let _=g?e.compute(Me(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(x,w)=>i[y[w]])),$=sa(e,_,t[1],t[2],n,u,s,r.epsilon),T=x=>{let w=ke(t[0].dataType),I=l===1?"vec2f":`mat${l}x2f`,S=A=>{let v=A===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${P}(scale.${v}))`;case 2:return`vec2<${w}>(${P}(scale[0].${v}, scale[1].${v}))`;case 4:return`vec4<${w}>(${P}(scale[0].${v}, scale[1].${v}, scale[2].${v}, scale[3].${v}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=N("input",t[0].dataType,t[0].dims,l),C=F("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:T},{inputs:[t[0],$]})},Rh=(e,t)=>{t.format==="NHWC"?Pl(e,e.inputs,t):Dl(e,e.inputs,t)}}),Ul,ql,Nh,Fy=U(()=>{J(),re(),ie(),Ul=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},ql=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],u=a,l=O.normalizeAxis(t.axis,a.length),p=O.sizeToDimension(a,l),h=O.sizeFromDimension(a,l),f=O.size(n.dims),g=s?O.size(s.dims):0;if(f!==h||s&&g!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let y=[];for(let E=0;E<a.length;++E)E<l?y.push(a[E]):y.push(1);let _=$e(h),$=["type","type"],T=[{type:12,data:p},{type:1,data:h},{type:12,data:Math.floor(h/_)},{type:1,data:t.epsilon}];s&&$.push("type");let x=r>1,w=r>2,I=E=>{let C=ke(e[0].dataType),A=[N("x",e[0].dataType,e[0].dims,_),N("scale",n.dataType,n.dims,_)];s&&A.push(N("bias",s.dataType,s.dims,_)),A.push(F("output",e[0].dataType,u,_)),x&&A.push(F("mean_data_output",1,y)),w&&A.push(F("inv_std_output",1,y));let v=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(v).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ea("f32",_)};
    var mean_square_vector = ${Ea("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Wt(C,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${_t("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${_t("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Wt(C,_,"x[j + offset]")};
      let f32scale = ${Wt(C,_,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Wt(C,_,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:u,dataType:e[0].dataType}];return x&&S.push({dims:y,dataType:1}),w&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:$},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:T}),getShaderSource:I}},Nh=(e,t)=>{Ul(e.inputs),e.compute(ql(e.inputs,t,e.outputCount))}}),Ll,Mh,jy=U(()=>{re(),on(),un(),Ll=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Mh=e=>{Ll(e.inputs);let t=Gt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(sn(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=O.size(e.inputs[0].dims.slice(0,-2)),s=O.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,n,r],h=[u,l];e.compute(Zr(h,{activation:""},t,p),{inputs:h})}else e.compute(Zr(e.inputs,{activation:""},t))}}}),Wl,Vl,Gl,Dh,Ph,Ky=U(()=>{J(),re(),ve(),ie(),Wl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!O.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(O.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(O.size(l)!==p)throw new Error("zeroPoints input size error.")}},Vl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(p),y=$e(s),_=u.concat([a,s]),$=a>1&&s/y%2===0?2:1,T=O.size(_)/y/$,x=64,w=[],I=[l,a,n/f],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,p/g),w.push(...K(I)),w.push(...K(S)),w.push(...K(e[2].dims)),e.length===4&&w.push(...K(O.convertShape(e[3].dims)));let E=[l,a,s/y];w.push(...K(E));let C=A=>{let v=I.length,P=N("a",e[0].dataType,v,f),q=N("b",12,S.length,g),Y=N("scales",e[2].dataType,e[2].dims.length),H=[P,q,Y],Q=e.length===4?N("zero_points",12,e[3].dims.length):void 0;Q&&H.push(Q);let B=E.length,D=F("output",e[0].dataType,B,y),G=ke(e[0].dataType),ee=(()=>{switch(f){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${f}-component is not supported.`)}})(),Z=()=>{let M=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ee};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let W=0;W<y*$;W++)M+=`
            b_value = ${g===1?`b${W}_data`:`b${W}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ee}(${Array.from({length:4},(te,oe)=>`${G}(b_value_lower[${oe}]), ${G}(b_value_upper[${oe}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ee}(${Array.from({length:8},(te,oe)=>`(b_quantized_values[${oe}] - ${Q?`zero_point${W}`:"zero_point"}) * scale${W}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${Q?`zero_point${W}`:"zero_point"}`).join(",")})) * scale${W};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(W/y)}]${y>1?`[${W%y}]`:""} += ${Array.from({length:8/f},(te,oe)=>`${f===1?`a_data[${oe}] * b_dequantized_values[${oe}]`:`dot(a_data[${oe}], b_dequantized_values[${oe}])`}`).join(" + ")};
          `;return M},X=()=>{let M=`
            var col_index = col * ${y};
            ${Q?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(8);`}
            `;for(let W=0;W<y*$;W++)M+=`
            let scale${W} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${Q?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${G}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return M},de=()=>{let M=`col_index = col * ${y};`;for(let W=0;W<y*$;W++)M+=`
            let b${W}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return M+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,M};return`
        var<workgroup> workgroup_shared: array<${D.type.value}, ${$*x}>;
        ${A.declareVariables(...H,D)}
        ${A.mainStart([x,1,1])}
          let output_indices = ${D.offsetToIndices(`(global_idx / ${x}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${X()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${de()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${Z()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${D.type.value} = ${D.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${D.setByIndices(`${D.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${y};${$};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x:T},programUniforms:w}),getShaderSource:C}},Gl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(p),y=u.concat([a,s]),_=128,$=s%8===0?8:s%4===0?4:1,T=_/$,x=T*g*8,w=x/f,I=x/t.blockSize,S=O.size(y)/$,E=[],C=[l,a,n/f],A=O.convertShape(e[1].dims).slice();A.splice(-1,1,p/g),E.push(...K(C)),E.push(...K(A)),E.push(...K(e[2].dims)),e.length===4&&E.push(...K(O.convertShape(e[3].dims)));let v=[l,a,s];E.push(...K(v));let P=q=>{let Y=C.length,H=N("a",e[0].dataType,Y,f),Q=N("b",12,A.length,g),B=N("scales",e[2].dataType,e[2].dims.length),D=[H,Q,B],G=e.length===4?N("zero_points",12,e[3].dims.length):void 0;G&&D.push(G);let ee=v.length,Z=F("output",e[0].dataType,ee),X=ke(e[0].dataType),de=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${T}>, ${$}>;
        ${q.declareVariables(...D,Z)}
        ${q.mainStart([T,$,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${G?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${X}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            let scale = ${B.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Q.getByIndices(`${Q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${de()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${X}>(${Array.from({length:4},(M,W)=>`${X}(b_value_lower[${W}]), ${X}(b_value_upper[${W}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${X}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(M,W)=>`${`dot(a_data${W}, b_dequantized_values[${W}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${T};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:S},programUniforms:E}),getShaderSource:P}},Dh=(e,t)=>{Wl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Gl(e.inputs,t)):e.compute(Vl(e.inputs,t))},Ph=e=>he(e)}),Hl,Fl,jl,Kl,Ql,Zl,Yl,Xl,Uh,Qy=U(()=>{J(),re(),ie(),Hl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Fl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},jl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Kl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k = i32(${j("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Ql=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k -= i32(${j("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Zl=(e,t,r)=>{switch(r.mode){case 0:return Fl(e,t,r.pads.length);case 1:return jl(e,t,r.pads.length);case 2:return Kl(e,t,r.pads.length);case 3:return Ql(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Yl=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=O.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...K(e[0].dims,r));let u=["rank"],l=p=>{let h=F("output",e[0].dataType,r.length),f=N("x",e[0].dataType,i.length),g=f.type.value,y=Zl(h,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(_).declareVariables(f,h)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:n}),getShaderSource:l}},Xl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(r[l]),n[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},Uh=(e,t)=>{Hl(e.inputs);let r=Xl(e.inputs,t);e.compute(Yl(e.inputs,r),{inputs:[0]})}}),ar,oa,ua,la,da,Jl,ed,pa,ca,qh,Lh,ha,Wh,Vh,fa,Gh,Hh,Fh,jh,Zy=U(()=>{Le(),J(),re(),ie(),ar=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},oa=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],p=t.pads.slice();Kr.adjustPoolAttributes(r,a,s,u,l,p);let h=Kr.computePoolOutputShape(r,a,u,l,s,p,t.autoPad),f=Object.assign({},t);n?Object.assign(f,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=h.slice();return g.push(g.splice(1,1)[0]),[f,i?g:h]},ua=(e,t)=>{let r=t.format==="NHWC",i=O.size(e),a=O.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],f=!!(p+h);n.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:h}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],$=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];g=!!($+T),n.push({type:12,data:y},{type:12,data:_},{type:12,data:$},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=O.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,h)=>p+h);return[n,s,!!l,!1,!1]}},la=(e,t,r,i,a,n,s,u,l,p,h,f)=>{let g=a.format==="NHWC",y=t.type.value,_=F("output",t.type.tensor,i);if(a.kernelShape.length<=2){let $="",T="",x="",w=r-(g?2:1);if(h?$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let I=r-(g?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${T}
              ${$}
              ${x}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let $=a.kernelShape.length,T=a.pads.length,x="";return p?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:x=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$-1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",$)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",$)};
                }
                offsets[${$-1}] = offset;

                isPad = false;
                for (var j = ${r-$}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-$}u`,$)}
                    + offsets[j - ${r-$}u] - ${j("uniforms.pads","j - 2u",T)};
                  ${x}
              }
              ${s}

              output[global_idx] = value;
            }`}},da=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Jl=e=>`${da(e)};${e.countIncludePad}`,ed=e=>`${da(e)};${e.storageOrder};${e.dilations}`,pa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ca=(e,t,r,i)=>{let[a,n]=oa(t,i,r),s=N("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";a.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,f,g,y,_]=ua(n,a);h.push(...K(t.dims,n));let $=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:h}),getShaderSource:T=>la(T,s,t.dims.length,n.length,a,l,p,0,f,g,y,_)}},qh=e=>{let t=e.count_include_pad!==0,r=pa(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Jl(i)}},Lh=(e,t)=>{ar(e.inputs),e.compute(ca("AveragePool",e.inputs[0],!1,t))},ha={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Wh=e=>{let t=e.format;return{format:t,...ha,cacheKey:t}},Vh=(e,t)=>{ar(e.inputs),e.compute(ca("GlobalAveragePool",e.inputs[0],!0,t))},fa=(e,t,r,i)=>{let[a,n]=oa(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=N("x",t.dataType,t.dims.length),p=["rank"],[h,f,g,y,_]=ua(n,a);return h.push(...K(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:h}),getShaderSource:$=>la($,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,f,g,y,_)}},Gh=(e,t)=>{ar(e.inputs),e.compute(fa("MaxPool",e.inputs[0],!1,t))},Hh=e=>{let t=e.storage_order,r=e.dilations,i=pa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:ed(a)}},Fh=e=>{let t=e.format;return{format:t,...ha,cacheKey:t}},jh=(e,t)=>{ar(e.inputs),e.compute(fa("GlobalMaxPool",e.inputs[0],!0,t))}}),td,rd,Kh,Qh,Yy=U(()=>{J(),re(),ve(),ie(),td=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},rd=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,u=O.size(n),l=i===3||i===2,p=l?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(O.size(f.dims)/4)]:f.dims:void 0,y=h.length===0||h.length===1&&h[0]===1,_=y===!1&&h.length===1,$=$e(u),T=y&&(!l||$===4),x=T?$:1,w=T&&!l?$:1,I=N("input",l?12:i,p.length,w),S=N("scale",s,h.length),E=f?N("zero_point",l?12:i,g.length):void 0,C=F("output",s,n.length,x),A=[I,S];E&&A.push(E);let v=[p,h];f&&v.push(g);let P=[{type:12,data:u/x},{type:12,data:r},{type:12,data:t.blockSize},...K(...v,n)],q=Y=>{let H=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Y.registerUniforms(H).declareVariables(...A,C)}
      ${Y.mainStart()}
          ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${S.getByOffset("0")}`:_?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?y?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:_?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/x/64),y:1,z:1},programUniforms:P})}},Kh=(e,t)=>{td(e.inputs,t),e.compute(rd(e.inputs,t))},Qh=e=>he({axis:e.axis,blockSize:e.blockSize})}),id,ad,Zh,Xy=U(()=>{Le(),J(),ie(),id=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},ad=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...K(n)],l=p=>{let h=F("output",i,n.length),f=h.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${p.registerUniforms(g).declareVariables(h)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},Zh=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&id(t,r,i),e.compute(ad(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),nd,sd,Yh,Xh,Jy=U(()=>{J(),re(),ve(),ie(),nd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},sd=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(O.sizeToDimension(i,i.length-1)/n),u=i[i.length-1],l=O.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...K(e[1].dims,e[2].dims,a)],h=f=>{let g=N("indices",e[1].dataType,e[1].dims.length),y=N("updates",e[2].dataType,e[2].dims.length,n),_=t.reduction!=="none"&&t.reduction!==""?kp("output",e[0].dataType,a.length):F("output",e[0].dataType,a.length,n);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,y,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${nd(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:h}},Yh=e=>he({reduction:e.reduction}),Xh=(e,t)=>{e.compute(sd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),od,ud,ld,ma,dd,pd,cd,hd,fd,md,gd,yd,ga,_d,wd,bd,$d,vd,Jh,ef,e0=U(()=>{J(),re(),ve(),ie(),od=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},ud=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},ld=(e,t,r,i,a,n)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(h=>n.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");od(i,t),t.axes.length>0&&ud(i,t.axes,p).forEach((h,f)=>i[f]=h)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},ma=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,dd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ma("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ma("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",pd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",cd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},hd=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},fd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},md=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",i)};
        var roi_low = ${j("uniforms.roi","i",a)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,gd=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",n)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,yd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ga=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",_d=(e,t,r,i,a)=>{let[n,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${ga(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},wd=(e,t,r,i,a,n,s,u,l,p)=>{let h=r.length===2,[f,g]=h?[0,1]:[2,3],y=e.type.value,_=$=>{let T=$===f?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",$)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[$]},
        ${i[$]}, ${r[$]}, ${n[$]}, ${n[$]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[$]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${y} = originalIdx + ${y}(i);
          if (${T} < 0 || ${T} >= ${r[$]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${T} = max(0, min(${T}, ${r[$]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",$,`u32(${T})`)};
          data[i + 1] = ${$===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},bd=(e,t,r,i,a)=>{let[n,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${ga(e,p,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${s}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
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
    }`},$d=(e,t,r,i,a,n)=>{let s=e.dims,u=cd(n,t.axes,s.length),l=hd(s,i,a,t.axes),p=i.slice();i.length===0&&(p=s.map((w,I)=>w===0?1:l[I]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=fd(s,p,t)));let h=F("output",e.dataType,l.length),f=N("input",e.dataType,s.length),g=O.size(l),y=s.length===l.length&&s.every((w,I)=>w===l[I]),_=t.coordinateTransformMode==="tf_crop_and_resize",$=t.extrapolationValue,T=f.type.value,x=w=>`
      ${y?"":`
      ${dd(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${yd(f,s)};
              ${pd(t.nearestMode,r,T)};
              ${gd(f,h,s,l,p.length,u.length,_)};
              `;case"linear":return`
              ${md(h,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${_d(f,h,s,_,$)}`;if(s.length===3||s.length===5)return`${bd(f,h,s,_,$)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${wd(f,h,s,l,p,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(f,h)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...K(s,l)]})}},vd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Jh=(e,t)=>{let r=[],i=[],a=[],n=vd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ld(e.inputs,t,n,r,i,a),e.compute($d(e.inputs[0],t,n,r,i,a),{inputs:[0]})},ef=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),xd,Sd,tf,t0=U(()=>{J(),re(),ie(),xd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Sd=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=O.size(n),u=n,l=s,p=n.slice(-1)[0],h=i?n.slice(0,-1).concat(1):[],f=!a&&e.length>3,g=e.length>4,y=i&&r>1,_=i&&r>2,$=r>3,T=64,x=$e(p),w=[{type:12,data:l},{type:12,data:x},{type:12,data:p},{type:1,data:t.epsilon}],I=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[N("x",e[0].dataType,e[0].dims,x),N("skip",e[1].dataType,e[1].dims,x),N("gamma",e[2].dataType,e[2].dims,x)];f&&A.push(N("beta",e[3].dataType,e[3].dims,x)),g&&A.push(N("bias",e[4].dataType,e[4].dims,x)),A.push(F("output",e[0].dataType,u,x)),y&&A.push(F("mean_output",1,h)),_&&A.push(F("inv_std_output",1,h)),$&&A.push(F("input_skip_bias_sum",e[0].dataType,u,x));let v=ke(e[0].dataType),P=ke(1,x);return`

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${P}, ${T}>;
      var<workgroup> sum_squared_shared : array<${P}, ${T}>;

      ${E.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":v+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Wt(v,x,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
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
        let mean = ${_t("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${_t("square_sum",x)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${v}(mean)`}) *
            ${v}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:u,dataType:e[0].dataType}];return r>1&&S.push({dims:h,dataType:1}),r>2&&S.push({dims:h,dataType:1}),r>3&&S.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${y};${_};${$}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:I,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},tf=(e,t)=>{xd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Sd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Td,nr,kd,ya,Id,Ed,rf,af,r0=U(()=>{J(),re(),ve(),ie(),Td=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},nr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},kd=(e,t)=>{if(e.length>1){let r=nr(e,1),i=nr(e,2),a=nr(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:a})}else return t},ya=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Id=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",r.length)};
            let steps_i = ${j("uniforms.steps","i",r.length)};
            let signs_i = ${j("uniforms.signs","i",r.length)};
            let starts_i = ${j("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Ed=(e,t)=>{let r=e[0].dims,i=O.size(r),a=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=nr(e,4);n.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((x,w)=>ya(x,w,r,a,n)),u=t.ends.map((x,w)=>ya(x,w,r,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let x=0;x<r.length;++x)a.includes(x)||(s.splice(x,0,0),u.splice(x,0,r[x]),n.splice(x,0,1));let l=n.map(x=>Math.sign(x));n.forEach((x,w,I)=>{if(x<0){let S=(u[w]-s[w])/x,E=s[w],C=E+S*n[w];s[w]=C,u[w]=E,I[w]=-x}});let p=r.slice(0);a.forEach((x,w)=>{p[x]=Math.ceil((u[x]-s[x])/n[x])});let h={dims:p,dataType:e[0].dataType},f=F("output",e[0].dataType,p.length),g=N("input",e[0].dataType,e[0].dims.length),y=O.size(p),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],$=[{type:12,data:y},{type:12,data:s},{type:6,data:l},{type:12,data:n},...K(e[0].dims,p)],T=x=>`
      ${x.registerUniforms(_).declareVariables(g,f)}
        ${Id(g,f,r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:$})}},rf=(e,t)=>{Td(e.inputs,t);let r=kd(e.inputs,t);e.compute(Ed(e.inputs,r),{inputs:[0]})},af=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),zd,Cd,nf,sf,i0=U(()=>{J(),re(),ve(),wt(),ie(),zd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Cd=(e,t)=>{let r=e.inputs[0],i=r.dims,a=O.size(i),n=i.length,s=O.normalizeAxis(t.axis,n),u=s<i.length-1,l,p=[];u?(p=Array.from({length:n},(A,v)=>v),p[s]=n-1,p[n-1]=s,l=e.compute(Me(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let h=l.dims,f=h[n-1],g=a/f,y=$e(f),_=f/y,$=64;g===1&&($=256);let T=(A,v)=>v===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:v===2?`max(${A}.x, ${A}.y)`:v===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,x=N("x",l.dataType,l.dims,y),w=F("result",l.dataType,l.dims,y),I=x.type.value,S=ke(l.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,E=A=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(x,w)}
      ${A.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
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
          rowMaxShared = ${I}(${T("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
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
          rowSumShared = ${I}(${_t("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${y};${$}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Me(C,p),{inputs:[C]})},nf=(e,t)=>{zd(e.inputs),Cd(e,t)},sf=e=>he({axis:e.axis})}),_a,Ad,Od,Bd,of,a0=U(()=>{J(),re(),ie(),_a=e=>Array.from(e.getBigInt64Array(),Number),Ad=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(_a(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Od=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Bd=(e,t)=>{let r=e[0].dims,i=t??_a(e[1]),a=Od(r,i),n=O.size(a),s=e[0].dataType,u=N("input",s,r.length),l=F("output",s,a.length),p=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,l)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...K(e[0].dims,a)]}),getShaderSource:p}},of=e=>{Ad(e.inputs),e.compute(Bd(e.inputs),{inputs:[0]})}}),Rd,Nd,uf,n0=U(()=>{J(),re(),ie(),Rd=(e,t,r,i,a)=>{let n=F("output_data",a,r.length,4),s=N("a_data",t[1].dataType,t[1].dims.length,4),u=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),p,h=(f,g,y)=>`select(${g}, ${f}, ${y})`;if(!i)p=n.setByOffset("global_idx",h(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,y,_="")=>{let $=`a_data[index_a${y}][component_a${y}]`,T=`b_data[index_b${y}][component_b${y}]`,x=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${n.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${h($,T,x)});
          `};a===9?p=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Nd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(O.areEqual(t,r)&&O.areEqual(r,i)),s=t,u=O.size(t);if(n){let p=Gt.calcShape(Gt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=O.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Rd(p,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...K(i,t,r,s)]})}},uf=e=>{e.compute(Nd(e.inputs))}}),lf,s0=U(()=>{by(),tn(),$y(),vy(),xy(),Sy(),Ty(),Cy(),Oy(),By(),Ry(),Ny(),My(),Dy(),Py(),Uy(),qy(),Ly(),Wy(),Vy(),Gy(),Hy(),Fy(),jy(),Ky(),Ih(),Qy(),Zy(),Yy(),Xy(),Jy(),en(),e0(),Oh(),t0(),r0(),i0(),Ch(),a0(),wt(),rn(),n0(),lf=new Map([["Abs",[tc]],["Acos",[rc]],["Acosh",[ic]],["Add",[Dc]],["ArgMax",[Yp,Ca]],["ArgMin",[Zp,Ca]],["Asin",[ac]],["Asinh",[nc]],["Atan",[sc]],["Atanh",[oc]],["Attention",[Xp]],["AveragePool",[Lh,qh]],["BatchNormalization",[Jp]],["BiasAdd",[ec]],["BiasSplitGelu",[Mc]],["Cast",[lc,uc]],["Ceil",[pc]],["Clip",[dc]],["Concat",[jc,Kc]],["Conv",[Ma,Na]],["ConvTranspose",[ah,ih]],["Cos",[cc]],["Cosh",[hc]],["CumSum",[nh,sh]],["DepthToSpace",[oh,uh]],["DequantizeLinear",[Kh,Qh]],["Div",[Pc]],["Einsum",[lh,dh]],["Elu",[fc,dr]],["Equal",[Uc]],["Erf",[mc]],["Exp",[gc]],["Expand",[ph]],["FastGelu",[ch]],["Floor",[yc]],["FusedConv",[Ma,Na]],["Gather",[fh,hh]],["GatherElements",[bh,wh]],["GatherBlockQuantized",[yh,_h]],["GatherND",[mh,gh]],["Gelu",[_c]],["Gemm",[vh,$h]],["GlobalAveragePool",[Vh,Wh]],["GlobalMaxPool",[jh,Fh]],["Greater",[Vc]],["GreaterOrEqual",[Hc]],["GridSample",[xh,Sh]],["GroupQueryAttention",[Bh]],["HardSigmoid",[kc,Tc]],["InstanceNormalization",[Rh]],["LayerNormalization",[Nh]],["LeakyRelu",[wc,dr]],["Less",[Gc]],["LessOrEqual",[Fc]],["Log",[Rc]],["MatMul",[Mh]],["MatMulNBits",[Dh,Ph]],["MaxPool",[Gh,Hh]],["Mul",[qc]],["MultiHeadAttention",[kh,Th]],["Neg",[$c]],["Not",[bc]],["Pad",[Uh]],["Pow",[Lc]],["QuickGelu",[Nc,dr]],["Range",[Zh]],["Reciprocal",[vc]],["ReduceMin",[Hp]],["ReduceMean",[qp]],["ReduceMax",[Gp]],["ReduceSum",[jp]],["ReduceProd",[Fp]],["ReduceL1",[Lp]],["ReduceL2",[Wp]],["ReduceLogSum",[Qp]],["ReduceLogSumExp",[Vp]],["ReduceSumSquare",[Kp]],["Relu",[xc]],["Resize",[Jh,ef]],["RotaryEmbedding",[Ah]],["ScatterND",[Xh,Yh]],["Sigmoid",[Sc]],["Sin",[Ic]],["Sinh",[Ec]],["Slice",[rf,af]],["SkipLayerNormalization",[tf]],["Split",[Eh,zh]],["Sqrt",[zc]],["Softmax",[nf,sf]],["Sub",[Wc]],["Tan",[Cc]],["Tanh",[Ac]],["ThresholdedRelu",[Bc,dr]],["Tile",[of]],["Transpose",[Ep,zp]],["Where",[uf]]])}),df,o0=U(()=>{Le(),ut(),ie(),df=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){it(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ze(e.programInfo.name)}dispose(){}build(e,t){it(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let a=Ip(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,u=r.createShaderModule({code:s,label:e.name});le("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ze(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),pf={};Ft(pf,{WebGpuBackend:()=>cf});var Md,Dd,Pd,cf,u0=U(()=>{Le(),J(),ut(),vp(),_y(),s0(),o0(),Md=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Dd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Md(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Pd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},cf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=n=>t.features.has(n)&&r.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Pd(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Tp(this),this.programManager=new df(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Za(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;it(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],n=a.kernelId,s=this.kernels.get(n),u=s.kernelType,l=s.kernelName,p=a.programName,h=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),$=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(T=>({dims:T.dims,dataType:ot(T.dataType)})),outputsMetadata:f.map(T=>({dims:T.dims,dataType:ot(T.dataType)})),kernelId:n,kernelType:u,kernelName:l,programName:p,startTime:_,endTime:$});else{let T="";h.forEach((w,I)=>{T+=`input[${I}]: [${w.dims}] | ${ot(w.dataType)}, `});let x="";f.forEach((w,I)=>{x+=`output[${I}]: [${w.dims}] | ${ot(w.dataType)}, `}),console.log(`[profiling] kernel "${n}|${u}|${l}|${p}" ${T}${x}start time: ${_} ns, execution time: ${$-_} ns`)}Hr("GPU",`${p}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Ze()}run(e,t,r,i,a,n){it(e.name);let s=[];for(let w=0;w<t.length;++w){let I=t[w].data;if(I===0)continue;let S=this.gpuDataManager.get(I);if(!S)throw new Error(`no GPU data for input: ${I}`);s.push(S)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),h=r.length===0?u.map((w,I)=>I):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let f=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(h[w])||h[w]<-3||h[w]>=n)throw new Error(`Invalid output index: ${h[w]}`);if(h[w]===-3)continue;let I=h[w]===-1,S=h[w]===-2,E=I||S?a(u[w].dataType,u[w].dims):i(h[w],u[w].dataType,u[w].dims);if(f.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(I&&this.temporaryData.push(C),S){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(C)}g.push(C)}if(s.length!==t.length||g.length!==f.length){if(g.length===0)return Ze(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(p){let w=0,I=[];p.forEach(A=>{let v=typeof A.data=="number"?[A.data]:A.data;if(v.length===0)return;let P=A.type===10?2:4,q,Y;A.type===10?(Y=v.length>4?16:v.length>2?8:v.length*P,q=v.length>4?16:P*v.length):(Y=v.length<=2?v.length*P:16,q=16),w=Math.ceil(w/Y)*Y,I.push(w);let H=A.type===10?8:4;w+=v.length>4?Math.ceil(v.length/H)*q:v.length*P});let S=16;w=Math.ceil(w/S)*S;let E=new ArrayBuffer(w);p.forEach((A,v)=>{let P=I[v],q=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,P,q.length).set(q);else if(A.type===12)new Uint32Array(E,P,q.length).set(q);else if(A.type===10)new Uint16Array(E,P,q.length).set(q);else if(A.type===1)new Float32Array(E,P,q.length).set(q);else throw new Error(`Unsupported uniform type: ${ot(A.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,w),this.gpuDataManager.release(C.id),y={offset:0,size:w,buffer:C.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),$=_[1]===1&&_[2]===1,T=Dd(e,t,$),x=this.programManager.getArtifact(T);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(T,x),le("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),p&&x.uniformVariablesInfo){if(p.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${p.length} in program "${x.programInfo.name}".`);for(let w=0;w<p.length;w++){let I=p[w],S=I.type,E=typeof I.data=="number"?1:I.data.length,[C,A]=x.uniformVariablesInfo[w];if(S!==C||E!==A)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${A}, got type ${S} with size ${E} in program "${x.programInfo.name}".`)}}if(le("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(x,s,g,_,y),Ze(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=lf.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),le("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${a}] ${n}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Ia(this,e,t);return Ya(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){le("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){le("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){le("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),hf={};Ft(hf,{init:()=>ff});var Ur,Ud,ff,l0=U(()=>{J(),ut(),re(),yy(),Ur=class mf{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new mf(this.module,this.dataType,this.data,t)}},Ud=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*a++,n)),h=Number(e.getValue(i*a++,"*")),f=Number(e.getValue(i*a++,n)),g=[];for(let y=0;y<f;y++)g.push(Number(e.getValue(i*a++,n)));u.push(new Ur(e,p,h,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],a=(s,u,l)=>new Ur(this.module,u,this.output(s,l),l),n=(s,u)=>{let l=zt(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ur(this.module,s,p,u)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},ff=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(u0(),hr(pf)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,h=!1)=>{if(h)le("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{le("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),f)}},async(u,l,p)=>{le("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,h)=>{le("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let f=new Ud(t,s,Number(l));return s.computeKernel(Number(u),f,h)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Sp(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,u,l,p,h)=>n.ensureTensor(s,u,l,p,h),(s,u)=>{n.uploadTensor(s,u)},async(s,u)=>n.downloadTensor(s,u),(s,u)=>n.registerMLContext(s,u),!!r.trace])}}}),qd,ln,dn,gt,Ld,wa,Xr,pn,cn,ba,hn,fn,mn,gf=U(()=>{Le(),fy(),my(),J(),Nt(),Fa(),_p(),qd=(e,t)=>{ye()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},ln=async e=>{qd(e.wasm.numThreads,jr(e.logLevel))},dn=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(l0(),hr(hf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},gt=new Map,Ld=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&fe("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},wa=(e,t)=>{let r=ye(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&fe("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let p=r.HEAPU32[a/4+1],h=[];for(let f=0;f<p;f++){let g=Number(r.getValue(a+8+f*n,"*"));h.push(g!==0?r.UTF8ToString(g):Number(r.getValue(a+8+(f+p)*n,"*")))}return[u,l,h]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Xr=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},pn=async(e,t)=>{let r,i,a=ye();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Xr(e);let n=0,s=0,u=0,l=[],p=[],h=[];try{if([s,l]=await yp(t),t?.externalData&&a.mountExternalData){let S=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path;S.push(Qa(typeof E=="string"?E:E.data).then(A=>{a.mountExternalData(C,A)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof S!="string"){let E=S,C=E?.context,A=E?.gpuDevice,v=E?.deviceType,P=E?.powerPreference;C?a.currentContext=C:A?a.currentContext=await a.webnnCreateMLContext(A):a.currentContext=await a.webnnCreateMLContext({deviceType:v,powerPreference:P})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),a.webgpuOnCreateSession?.(n),n===0&&fe("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[f,g]=Ld(n),y=!!t?.enableGraphCapture,_=[],$=[],T=[],x=[],w=[];for(let S=0;S<f;S++){let[E,C,A]=wa(n,S);E===0&&fe("Can't get an input name."),p.push(E);let v=a.UTF8ToString(E);_.push(v),T.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:ot(C),shape:A})}for(let S=0;S<g;S++){let[E,C,A]=wa(n,S+f);E===0&&fe("Can't get an output name."),h.push(E);let v=a.UTF8ToString(E);$.push(v),x.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:ot(C),shape:A});{if(y&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[v]??"cpu",q=a.webnnIsGraphOutput;if(P==="cpu"&&q&&q(n,v)){w.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(P)}}let I=null;return w.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(n),u===0&&fe("Can't create IO binding."),I={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>Ta(S))}),gt.set(n,[n,p,h,I,y,!1]),[n,_,$,T,x]}catch(f){throw p.forEach(g=>a._OrtFree(g)),h.forEach(g=>a._OrtFree(g)),u!==0&&a._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&fe("Can't release session."),f}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&fe("Can't release session options."),l.forEach(f=>a._free(f)),a.unmountExternalData?.()}},cn=e=>{let t=ye(),r=gt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),n.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&fe("Can't release session."),gt.delete(e)},ba=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let u=ye(),l=u.PTR_SIZE,p=e[0],h=e[1],f=e[3],g=f,y,_;if(p==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let x=e[2].gpuBuffer;_=zt(Et(p),h);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,n,x,_)}}else if(f==="ml-tensor"){let x=e[2].mlTensor;_=zt(Et(p),h);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,x,Et(p),h)}else{let x=e[2];if(Array.isArray(x)){_=l*x.length,y=u._malloc(_),r.push(y);for(let w=0;w<x.length;w++){if(typeof x[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(y+w*l,Ke(x[w],r),"*")}}else{let w=u.webnnIsGraphInput,I=u.webnnIsGraphOutput;if(p!=="string"&&w&&I){let S=u.UTF8ToString(a);if(w(i,S)||I(i,S)){let E=Et(p);_=zt(E,h),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!C||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let v=await C(i,E,h);A(v,new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),y=v}else _=x.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,_),y)}else _=x.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,_),y)}}let $=u.stackSave(),T=u.stackAlloc(4*h.length);try{h.forEach((w,I)=>u.setValue(T+I*l,w,l===4?"i32":"i64"));let x=u._OrtCreateTensor(Et(p),y,_,T,h.length,Ta(g));x===0&&fe(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(x)}finally{u.stackRestore($)}},hn=async(e,t,r,i,a,n)=>{let s=ye(),u=s.PTR_SIZE,l=gt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],h=l[1],f=l[2],g=l[3],y=l[4],_=l[5],$=t.length,T=i.length,x=0,w=[],I=[],S=[],E=[],C=[],A=s.stackSave(),v=s.stackAlloc($*u),P=s.stackAlloc($*u),q=s.stackAlloc(T*u),Y=s.stackAlloc(T*u);try{[x,w]=gp(n),Ct("wasm prepareInputOutputTensor");for(let D=0;D<$;D++)await ba(r[D],I,E,e,h[t[D]],t[D],y);for(let D=0;D<T;D++)await ba(a[D],S,E,e,f[i[D]],$+i[D],y);At("wasm prepareInputOutputTensor");for(let D=0;D<$;D++)s.setValue(v+D*u,I[D],"*"),s.setValue(P+D*u,h[t[D]],"*");for(let D=0;D<T;D++)s.setValue(q+D*u,S[D],"*"),s.setValue(Y+D*u,f[i[D]],"*");if(g&&!_){let{handle:D,outputPreferredLocations:G,outputPreferredLocationsEncoded:ee}=g;if(h.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${h.length}).`);Ct("wasm bindInputsOutputs");for(let Z=0;Z<$;Z++){let X=t[Z];await s._OrtBindInput(D,h[X],I[Z])!==0&&fe(`Can't bind input[${Z}] for session=${e}.`)}for(let Z=0;Z<T;Z++){let X=i[Z];a[Z]?.[3]?(C.push(S[Z]),s._OrtBindOutput(D,f[X],S[Z],0)!==0&&fe(`Can't bind pre-allocated output[${Z}] for session=${e}.`)):s._OrtBindOutput(D,f[X],0,ee[X])!==0&&fe(`Can't bind output[${Z}] to ${G[Z]} for session=${e}.`)}At("wasm bindInputsOutputs"),gt.set(e,[p,h,f,g,y,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let H;g?H=await s._OrtRunWithBinding(p,g.handle,T,q,x):H=await s._OrtRun(p,P,v,$,Y,T,q,x),H!==0&&fe("failed to call OrtRun().");let Q=[],B=[];Ct("wasm ProcessOutputTensor");for(let D=0;D<T;D++){let G=Number(s.getValue(q+D*u,"*"));if(G===S[D]||C.includes(S[D])){Q.push(a[D]),G!==S[D]&&s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.");continue}let ee=s.stackSave(),Z=s.stackAlloc(4*u),X=!1,de,M=0;try{s._OrtGetTensorData(G,Z,Z+u,Z+2*u,Z+3*u)!==0&&fe(`Can't access output tensor data on index ${D}.`);let W=u===4?"i32":"i64",te=Number(s.getValue(Z,W));M=s.getValue(Z+u,"*");let oe=s.getValue(Z+u*2,"*"),Oe=Number(s.getValue(Z+u*3,W)),Be=[];for(let xe=0;xe<Oe;xe++)Be.push(Number(s.getValue(oe+xe*u,W)));s._OrtFree(oe)!==0&&fe("Can't free memory for tensor dims.");let De=Be.reduce((xe,we)=>xe*we,1);de=ot(te);let lt=g?.outputPreferredLocations[i[D]];if(de==="string"){if(lt==="gpu-buffer"||lt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let we=0;we<De;we++){let Ce=s.getValue(M+we*u,"*"),gr=s.getValue(M+(we+1)*u,"*"),Ye=we===De-1?void 0:gr-Ce;xe.push(s.UTF8ToString(Ce,Ye))}Q.push([de,Be,xe,"cpu"])}else if(lt==="gpu-buffer"&&De>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=xe(M),Ce=zt(te,De);if(Ce===void 0||!ja(de))throw new Error(`Unsupported data type: ${de}`);X=!0,Q.push([de,Be,{gpuBuffer:we,download:s.jsepCreateDownloader(we,Ce,de),dispose:()=>{s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(lt==="ml-tensor"&&De>0){let xe=s.webnnEnsureTensor,we=s.webnnIsGraphInputOutputTypeSupported;if(!xe||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(zt(te,De)===void 0||!Ka(de))throw new Error(`Unsupported data type: ${de}`);if(!we(e,de,!1))throw new Error(`preferredLocation "ml-tensor" for ${de} output is not supported by current WebNN Context.`);let Ce=await xe(e,M,te,Be,!1);X=!0,Q.push([de,Be,{mlTensor:Ce,download:s.webnnCreateMLTensorDownloader(M,de),dispose:()=>{s.webnnReleaseTensorId(M),s._OrtReleaseTensor(G)}},"ml-tensor"])}else if(lt==="ml-tensor-cpu-output"&&De>0){let xe=s.webnnCreateMLTensorDownloader(M,de)(),we=Q.length;X=!0,B.push((async()=>{let Ce=[we,await xe];return s.webnnReleaseTensorId(M),s._OrtReleaseTensor(G),Ce})()),Q.push([de,Be,[],"cpu"])}else{let xe=ti(de),we=new xe(De);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(s.HEAPU8.subarray(M,M+we.byteLength)),Q.push([de,Be,we,"cpu"])}}finally{s.stackRestore(ee),de==="string"&&M&&s._free(M),X||s._OrtReleaseTensor(G)}}g&&!y&&(s._OrtClearBoundOutputs(g.handle)!==0&&fe("Can't clear bound outputs."),gt.set(e,[p,h,f,g,y,!1]));for(let[D,G]of await Promise.all(B))Q[D][2]=G;return At("wasm ProcessOutputTensor"),Q}finally{s.webnnOnRunEnd?.(p),s.stackRestore(A),I.forEach(H=>s._OrtReleaseTensor(H)),S.forEach(H=>s._OrtReleaseTensor(H)),E.forEach(H=>s._free(H)),x!==0&&s._OrtReleaseRunOptions(x),w.forEach(H=>s._free(H))}},fn=e=>{let t=ye(),r=gt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&fe("Can't get an profile file name."),t._OrtFree(a)},mn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),yt,Ue,Ut,sr,or,qr,$a,Lr,Tt,kt,Wd,yf,_f,wf,bf,$f,vf,xf,Sf=U(()=>{Le(),gf(),Nt(),Ga(),yt=()=>!!ge.wasm.proxy&&typeof document<"u",Ut=!1,sr=!1,or=!1,Lr=new Map,Tt=(e,t)=>{let r=Lr.get(e);r?r.push(t):Lr.set(e,[t])},kt=()=>{if(Ut||!sr||or||!Ue)throw new Error("worker not ready")},Wd=e=>{switch(e.data.type){case"init-wasm":Ut=!1,e.data.err?(or=!0,$a[1](e.data.err)):(sr=!0,$a[0]()),qr&&(URL.revokeObjectURL(qr),qr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Lr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},yf=async()=>{if(!sr){if(Ut)throw new Error("multiple calls to 'initWasm()' detected.");if(or)throw new Error("previous call to 'initWasm()' failed.");if(Ut=!0,yt())return new Promise((e,t)=>{Ue?.terminate(),fp().then(([r,i])=>{try{Ue=i,Ue.onerror=n=>t(n),Ue.onmessage=Wd,$a=[e,t];let a={type:"init-wasm",in:ge};!a.in.wasm.wasmPaths&&(r||Sa)&&(a.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href,import.meta.url).href}),Ue.postMessage(a),qr=r}catch(a){t(a)}},t)});try{await Ha(ge.wasm),await ln(ge),sr=!0}catch(e){throw or=!0,e}finally{Ut=!1}}},_f=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ge}};Ue.postMessage(i)});await dn(ge,e)},wf=async e=>yt()?(kt(),new Promise((t,r)=>{Tt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Ue.postMessage(i,[e.buffer])})):Xr(e),bf=async(e,t)=>{if(yt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return kt(),new Promise((r,i)=>{Tt("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),Ue.postMessage(a,n)})}else return pn(e,t)},$f=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("release",[t,r]);let i={type:"release",in:e};Ue.postMessage(i)});cn(e)},vf=async(e,t,r,i,a,n)=>{if(yt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return kt(),new Promise((s,u)=>{Tt("run",[s,u]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:n}};Ue.postMessage(p,mn(l))})}else return hn(e,t,r,i,a,n)},xf=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Ue.postMessage(i)});fn(e)}}),va,Vd,Tf,d0=U(()=>{Le(),Sf(),J(),Va(),_p(),va=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Vd=e=>{switch(e[3]){case"cpu":return new Qe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ja(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Qe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Ka(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Qe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Tf=class{async fetchModelAndCopyToWasmMemory(e){return wf(await Qa(e))}async loadModel(e,t){it();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await bf(r,t),Ze()}async dispose(){return $f(this.sessionId)}async run(e,t,r){it();let i=[],a=[];Object.entries(e).forEach(f=>{let g=f[0],y=f[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);i.push(y),a.push(_)});let n=[],s=[];Object.entries(t).forEach(f=>{let g=f[0],y=f[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);n.push(y),s.push(_)});let u=i.map((f,g)=>va(f,()=>`input "${this.inputNames[a[g]]}"`)),l=n.map((f,g)=>f?va(f,()=>`output "${this.outputNames[s[g]]}"`):null),p=await vf(this.sessionId,a,u,s,l,r),h={};for(let f=0;f<p.length;f++)h[this.outputNames[s[f]]]=n[f]??Vd(p[f]);return Ze(),h}startProfiling(){}endProfiling(){xf(this.sessionId)}}}),kf={};Ft(kf,{OnnxruntimeWebAssemblyBackend:()=>Ua,initializeFlags:()=>Pa,wasmBackend:()=>If});var Pa,Ua,If,p0=U(()=>{Le(),Sf(),d0(),Pa=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?Zg("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ua=class{async init(e){Pa(),await yf(),await _f(e)}async createInferenceSessionHandler(e,t){let r=new Tf;return await r.loadModel(e,t),r}},If=new Ua});Le();Le();Le();var c0="1.24.1";{let e=(p0(),hr(kf)).wasmBackend;Lt("webgpu",e,5),Lt("webnn",e,5),Lt("cpu",e,10),Lt("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:c0,enumerable:!0});class h0 extends Fg{constructor(t){super(t),this.session=null,this.dictPath=t.dictPath}async init(t,r={}){console.log(`正在加载汉字词典: ${this.dictPath}`);const i=await fetch(this.dictPath);if(!i.ok)throw new Error(`汉字词典请求失败: ${i.status} ${i.statusText} (路径: ${this.dictPath})`);const a=await i.text();await this.loadDictFromContent(a,this.dictPath),console.log(`正在加载 ONNX 模型: ${t}`);try{this.session=await Wa.create(t,{executionProviders:["webgpu","webgl","wasm"],...r}),console.log("模型加载成功")}catch(n){throw console.error("ONNX 模型加载失败:",n),n}}async recognize(t,r){if(!this.session)throw new Error("Session not initialized");const{data:i,width:a,height:n}=this.getPreprocessingCanvas(t);if(r?.aborted)throw new Error("Aborted");const s=new Qe("float32",i,[1,3,n,a]),u=await this.session.run({[this.session.inputNames[0]]:s});if(r?.aborted)throw new Error("Aborted");const l=u[this.session.outputNames[0]];return this.postProcess(l.data,l.dims)}}class f0{constructor(){this.dict={}}async init(t){console.log(`正在加载拼音词典: ${t}`);const r=await fetch(t);if(!r.ok)throw new Error(`拼音词典请求失败: ${r.status} ${r.statusText} (路径: ${t})`);const i=r.headers.get("content-type");if(i&&i.includes("text/html")){const a=await r.text();throw console.error("收到的 HTML 内容前 100 字符:",a.substring(0,100)),new Error(`拼音词典加载失败：路径 "${t}" 返回了 HTML 页面而非 JSON。这通常是因为文件不存在，且服务器返回了 404 备用页面。`)}this.dict=await r.json(),console.log("拼音词典加载成功")}match(t){const r=this.dict[t.toLowerCase()];return r?r.split("").map(i=>({character:i,score:1})):[]}}const m0="PP-OCRv5_rec_mobile_infer.onnx",g0="ppocrv5_dict.txt",y0="pinyin_dict.json",xa={modelPath:m0,dictPath:g0,pinyinDictPath:y0};class _0{constructor(t={}){this.recognizer=null,this.topK=t.topK||10,this.pinyinMatcher=new f0}async init(t,r,i){const a=t||xa.modelPath,n=r||xa.dictPath,s=i||xa.pinyinDictPath;this.recognizer=new h0({dictPath:n,topK:this.topK}),await Promise.all([this.recognizer.init(a),this.pinyinMatcher.init(s)])}async recognize(t,r){if(!this.recognizer)throw new Error("Call init() first");return this.recognizer.recognize(t,r)}matchPinyin(t){return this.pinyinMatcher.match(t)}}ge.wasm.wasmPaths=e=>`./libs/${e}`;ge.wasm.numThreads=1;const Te=document.getElementById("canvas"),Ef=document.getElementById("canvas-container"),rt=Te.getContext("2d"),zf=document.getElementById("input-display"),Vt=document.getElementById("candidate-bar"),ri=document.getElementById("pinyin-indicator"),w0=document.getElementById("loader"),Gd=document.querySelectorAll(".tab"),b0=document.querySelectorAll(".panel");let Jr,mr="",qe="",ei=!1,qt=null,Cf=null;async function $0(){try{Jr=new _0({topK:15}),await Jr.init("./libs/PP-OCRv5_rec_mobile_infer.onnx","./libs/ppocrv5_dict.txt","./libs/pinyin_dict.json"),w0.style.display="none",gn()}catch(e){document.getElementById("loader-text").innerText="初始化失败: "+e.message,console.error(e)}}Gd.forEach(e=>{e.addEventListener("click",()=>{Gd.forEach(r=>r.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-target");b0.forEach(r=>r.classList.remove("active")),document.getElementById(t).classList.add("active"),t==="handwriting-panel"?gn():ri.innerText=qe||"请点击下方键盘输入拼音"})});document.getElementById("keyboard").addEventListener("click",e=>{const t=e.target;if(!t.classList.contains("key"))return;const r=t.innerText.toLowerCase();r==="space"?Mf(" "):t.id==="kb-back"||r==="退格"?(qe=qe.slice(0,-1),Gr()):t.id==="kb-clear"||r==="清空"?(qe="",Gr()):r.length===1&&(qe+=r,Gr())});function Gr(){if(ri.innerText=qe||"等待输入...",qe){const e=Jr.matchPinyin(qe);Nf(e,!0)}else Vt.innerHTML=""}function v0(){rt.lineWidth=14,rt.lineJoin="round",rt.lineCap="round",rt.strokeStyle="#000"}function gn(){const e=Te.parentElement;(Te.width!==e.clientWidth||Te.height!==e.clientHeight)&&(Te.width=e.clientWidth,Te.height=e.clientHeight,v0())}function Af(e){const t=Te.getBoundingClientRect(),r=e.touches?e.touches[0]:e,i=(r.clientX-t.left)*(Te.width/t.width),a=(r.clientY-t.top)*(Te.height/t.height);return{x:i,y:a}}const Of=e=>{ei=!0,Ef.classList.add("active");const{x:t,y:r}=Af(e);rt.beginPath(),rt.moveTo(t,r),clearTimeout(Cf),qe&&(qe="",ri.innerText="")},Bf=e=>{if(!ei)return;const{x:t,y:r}=Af(e);rt.lineTo(t,r),rt.stroke()},Rf=()=>{ei&&(ei=!1,Ef.classList.remove("active"),Cf=setTimeout(async()=>{qt&&qt.abort(),qt=new AbortController;const e=qt.signal;try{const t=await Jr.recognize(Te,e);Nf(t.candidates)}catch(t){t.message!=="Aborted"&&console.error("识别出错:",t)}finally{qt?.signal===e&&(qt=null)}},500))};Te.addEventListener("mousedown",Of);Te.addEventListener("mousemove",Bf);window.addEventListener("mouseup",Rf);Te.addEventListener("touchstart",e=>{e.preventDefault(),Of(e)});Te.addEventListener("touchmove",e=>{e.preventDefault(),Bf(e)});Te.addEventListener("touchend",Rf);function Nf(e,t=!1){if(Vt.innerHTML="",e.length===0){Vt.innerHTML=`<span style="color:#ccc;margin:auto;font-size:14px">${t?"无匹配字符":"未检测到内容"}</span>`;return}e.forEach(r=>{const i=document.createElement("div");i.className="candidate-item",i.innerText=r.character,t||(i.title=`匹配度: ${(r.score*100).toFixed(1)}%`),i.onclick=()=>{Mf(r.character),t&&(qe="",Gr()),rt.clearRect(0,0,Te.width,Te.height),Vt.innerHTML=""},Vt.appendChild(i)})}function Mf(e){mr+=e,zf.innerText=mr+"|"}document.getElementById("clearAllBtn").onclick=()=>{mr="",qe="",zf.innerText="|",ri.innerText="",rt.clearRect(0,0,Te.width,Te.height),Vt.innerHTML=""};document.getElementById("copyBtn").onclick=()=>{if(!mr)return;navigator.clipboard.writeText(mr);const e=copyBtn.innerText;copyBtn.innerText="已复制!",setTimeout(()=>{copyBtn.innerText=e},1500)};window.addEventListener("resize",gn);$0();
