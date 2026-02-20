(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();function fo(e){const t=Object.create(null);for(const r of e.split(","))t[r]=1;return r=>r in t}const Ve={},ai=[],Zt=()=>{},nh=()=>!1,Xn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ho=e=>e.startsWith("onUpdate:"),nt=Object.assign,mo=(e,t)=>{const r=e.indexOf(t);r>-1&&e.splice(r,1)},Yw=Object.prototype.hasOwnProperty,Ne=(e,t)=>Yw.call(e,t),we=Array.isArray,oi=e=>Ji(e)==="[object Map]",sh=e=>Ji(e)==="[object Set]",jl=e=>Ji(e)==="[object Date]",xe=e=>typeof e=="function",Qe=e=>typeof e=="string",Yt=e=>typeof e=="symbol",We=e=>e!==null&&typeof e=="object",ah=e=>(We(e)||xe(e))&&xe(e.then)&&xe(e.catch),oh=Object.prototype.toString,Ji=e=>oh.call(e),Xw=e=>Ji(e).slice(8,-1),uh=e=>Ji(e)==="[object Object]",go=e=>Qe(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pi=fo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Jn=e=>{const t=Object.create(null);return(r=>t[r]||(t[r]=e(r)))},Jw=/-\w/g,Er=Jn(e=>e.replace(Jw,t=>t.slice(1).toUpperCase())),eb=/\B([A-Z])/g,Yr=Jn(e=>e.replace(eb,"-$1").toLowerCase()),lh=Jn(e=>e.charAt(0).toUpperCase()+e.slice(1)),ks=Jn(e=>e?`on${lh(e)}`:""),Ir=(e,t)=>!Object.is(e,t),Cs=(e,...t)=>{for(let r=0;r<e.length;r++)e[r](...t)},dh=(e,t,r,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:r})},tb=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Kl;const es=()=>Kl||(Kl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function yo(e){if(we(e)){const t={};for(let r=0;r<e.length;r++){const i=e[r],n=Qe(i)?sb(i):yo(i);if(n)for(const s in n)t[s]=n[s]}return t}else if(Qe(e)||We(e))return e}const rb=/;(?![^(]*\))/g,ib=/:([^]+)/,nb=/\/\*[^]*?\*\//g;function sb(e){const t={};return e.replace(nb,"").split(rb).forEach(r=>{if(r){const i=r.split(ib);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function ar(e){let t="";if(Qe(e))t=e;else if(we(e))for(let r=0;r<e.length;r++){const i=ar(e[r]);i&&(t+=i+" ")}else if(We(e))for(const r in e)e[r]&&(t+=r+" ");return t.trim()}const ab="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ob=fo(ab);function ch(e){return!!e||e===""}function ub(e,t){if(e.length!==t.length)return!1;let r=!0;for(let i=0;r&&i<e.length;i++)r=_o(e[i],t[i]);return r}function _o(e,t){if(e===t)return!0;let r=jl(e),i=jl(t);if(r||i)return r&&i?e.getTime()===t.getTime():!1;if(r=Yt(e),i=Yt(t),r||i)return e===t;if(r=we(e),i=we(t),r||i)return r&&i?ub(e,t):!1;if(r=We(e),i=We(t),r||i){if(!r||!i)return!1;const n=Object.keys(e).length,s=Object.keys(t).length;if(n!==s)return!1;for(const a in e){const o=e.hasOwnProperty(a),u=t.hasOwnProperty(a);if(o&&!u||!o&&u||!_o(e[a],t[a]))return!1}}return String(e)===String(t)}const ph=e=>!!(e&&e.__v_isRef===!0),Ur=e=>Qe(e)?e:e==null?"":we(e)||We(e)&&(e.toString===oh||!xe(e.toString))?ph(e)?Ur(e.value):JSON.stringify(e,fh,2):String(e),fh=(e,t)=>ph(t)?fh(e,t.value):oi(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((r,[i,n],s)=>(r[zs(i,s)+" =>"]=n,r),{})}:sh(t)?{[`Set(${t.size})`]:[...t.values()].map(r=>zs(r))}:Yt(t)?zs(t):We(t)&&!we(t)&&!uh(t)?String(t):t,zs=(e,t="")=>{var r;return Yt(e)?`Symbol(${(r=e.description)!=null?r:t})`:e};let yt;class lb{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=yt,!t&&yt&&(this.index=(yt.scopes||(yt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].pause();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].resume();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].resume()}}run(t){if(this._active){const r=yt;try{return yt=this,t()}finally{yt=r}}}on(){++this._on===1&&(this.prevScope=yt,yt=this)}off(){this._on>0&&--this._on===0&&(yt=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let r,i;for(r=0,i=this.effects.length;r<i;r++)this.effects[r].stop();for(this.effects.length=0,r=0,i=this.cleanups.length;r<i;r++)this.cleanups[r]();if(this.cleanups.length=0,this.scopes){for(r=0,i=this.scopes.length;r<i;r++)this.scopes[r].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const n=this.parent.scopes.pop();n&&n!==this&&(this.parent.scopes[this.index]=n,n.index=this.index)}this.parent=void 0}}}function db(){return yt}let He;const As=new WeakSet;class hh{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,yt&&yt.active&&yt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,As.has(this)&&(As.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ql(this),yh(this);const t=He,r=Ut;He=this,Ut=!0;try{return this.fn()}finally{_h(this),He=t,Ut=r,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)vo(t);this.deps=this.depsTail=void 0,Ql(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?As.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Pa(this)&&this.run()}get dirty(){return Pa(this)}}let mh=0,Ui,Li;function gh(e,t=!1){if(e.flags|=8,t){e.next=Li,Li=e;return}e.next=Ui,Ui=e}function wo(){mh++}function bo(){if(--mh>0)return;if(Li){let t=Li;for(Li=void 0;t;){const r=t.next;t.next=void 0,t.flags&=-9,t=r}}let e;for(;Ui;){let t=Ui;for(Ui=void 0;t;){const r=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=r}}if(e)throw e}function yh(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function _h(e){let t,r=e.depsTail,i=r;for(;i;){const n=i.prevDep;i.version===-1?(i===r&&(r=n),vo(i),cb(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=n}e.deps=t,e.depsTail=r}function Pa(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(wh(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function wh(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Fi)||(e.globalVersion=Fi,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Pa(e))))return;e.flags|=2;const t=e.dep,r=He,i=Ut;He=e,Ut=!0;try{yh(e);const n=e.fn(e._value);(t.version===0||Ir(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(n){throw t.version++,n}finally{He=r,Ut=i,_h(e),e.flags&=-3}}function vo(e,t=!1){const{dep:r,prevSub:i,nextSub:n}=e;if(i&&(i.nextSub=n,e.prevSub=void 0),n&&(n.prevSub=i,e.nextSub=void 0),r.subs===e&&(r.subs=i,!i&&r.computed)){r.computed.flags&=-5;for(let s=r.computed.deps;s;s=s.nextDep)vo(s,!0)}!t&&!--r.sc&&r.map&&r.map.delete(r.key)}function cb(e){const{prevDep:t,nextDep:r}=e;t&&(t.nextDep=r,e.prevDep=void 0),r&&(r.prevDep=t,e.nextDep=void 0)}let Ut=!0;const bh=[];function pr(){bh.push(Ut),Ut=!1}function fr(){const e=bh.pop();Ut=e===void 0?!0:e}function Ql(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const r=He;He=void 0;try{t()}finally{He=r}}}let Fi=0;class pb{constructor(t,r){this.sub=t,this.dep=r,this.version=r.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class $o{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!He||!Ut||He===this.computed)return;let r=this.activeLink;if(r===void 0||r.sub!==He)r=this.activeLink=new pb(He,this),He.deps?(r.prevDep=He.depsTail,He.depsTail.nextDep=r,He.depsTail=r):He.deps=He.depsTail=r,vh(r);else if(r.version===-1&&(r.version=this.version,r.nextDep)){const i=r.nextDep;i.prevDep=r.prevDep,r.prevDep&&(r.prevDep.nextDep=i),r.prevDep=He.depsTail,r.nextDep=void 0,He.depsTail.nextDep=r,He.depsTail=r,He.deps===r&&(He.deps=i)}return r}trigger(t){this.version++,Fi++,this.notify(t)}notify(t){wo();try{for(let r=this.subs;r;r=r.prevSub)r.sub.notify()&&r.sub.dep.notify()}finally{bo()}}}function vh(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)vh(i)}const r=e.dep.subs;r!==e&&(e.prevSub=r,r&&(r.nextSub=e)),e.dep.subs=e}}const Ua=new WeakMap,Hr=Symbol(""),La=Symbol(""),ji=Symbol("");function lt(e,t,r){if(Ut&&He){let i=Ua.get(e);i||Ua.set(e,i=new Map);let n=i.get(r);n||(i.set(r,n=new $o),n.map=i,n.key=r),n.track()}}function ur(e,t,r,i,n,s){const a=Ua.get(e);if(!a){Fi++;return}const o=u=>{u&&u.trigger()};if(wo(),t==="clear")a.forEach(o);else{const u=we(e),d=u&&go(r);if(u&&r==="length"){const c=Number(i);a.forEach((f,h)=>{(h==="length"||h===ji||!Yt(h)&&h>=c)&&o(f)})}else switch((r!==void 0||a.has(void 0))&&o(a.get(r)),d&&o(a.get(ji)),t){case"add":u?d&&o(a.get("length")):(o(a.get(Hr)),oi(e)&&o(a.get(La)));break;case"delete":u||(o(a.get(Hr)),oi(e)&&o(a.get(La)));break;case"set":oi(e)&&o(a.get(Hr));break}}bo()}function ti(e){const t=Be(e);return t===e?t:(lt(t,"iterate",ji),kt(e)?t:t.map(Wt))}function ts(e){return lt(e=Be(e),"iterate",ji),e}function Sr(e,t){return hr(e)?di(Gr(e)?Wt(t):t):Wt(t)}const fb={__proto__:null,[Symbol.iterator](){return Os(this,Symbol.iterator,e=>Sr(this,e))},concat(...e){return ti(this).concat(...e.map(t=>we(t)?ti(t):t))},entries(){return Os(this,"entries",e=>(e[1]=Sr(this,e[1]),e))},every(e,t){return rr(this,"every",e,t,void 0,arguments)},filter(e,t){return rr(this,"filter",e,t,r=>r.map(i=>Sr(this,i)),arguments)},find(e,t){return rr(this,"find",e,t,r=>Sr(this,r),arguments)},findIndex(e,t){return rr(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return rr(this,"findLast",e,t,r=>Sr(this,r),arguments)},findLastIndex(e,t){return rr(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return rr(this,"forEach",e,t,void 0,arguments)},includes(...e){return Rs(this,"includes",e)},indexOf(...e){return Rs(this,"indexOf",e)},join(e){return ti(this).join(e)},lastIndexOf(...e){return Rs(this,"lastIndexOf",e)},map(e,t){return rr(this,"map",e,t,void 0,arguments)},pop(){return wi(this,"pop")},push(...e){return wi(this,"push",e)},reduce(e,...t){return Zl(this,"reduce",e,t)},reduceRight(e,...t){return Zl(this,"reduceRight",e,t)},shift(){return wi(this,"shift")},some(e,t){return rr(this,"some",e,t,void 0,arguments)},splice(...e){return wi(this,"splice",e)},toReversed(){return ti(this).toReversed()},toSorted(e){return ti(this).toSorted(e)},toSpliced(...e){return ti(this).toSpliced(...e)},unshift(...e){return wi(this,"unshift",e)},values(){return Os(this,"values",e=>Sr(this,e))}};function Os(e,t,r){const i=ts(e),n=i[t]();return i!==e&&!kt(e)&&(n._next=n.next,n.next=()=>{const s=n._next();return s.done||(s.value=r(s.value)),s}),n}const hb=Array.prototype;function rr(e,t,r,i,n,s){const a=ts(e),o=a!==e&&!kt(e),u=a[t];if(u!==hb[t]){const f=u.apply(e,s);return o?Wt(f):f}let d=r;a!==e&&(o?d=function(f,h){return r.call(this,Sr(e,f),h,e)}:r.length>2&&(d=function(f,h){return r.call(this,f,h,e)}));const c=u.call(a,d,i);return o&&n?n(c):c}function Zl(e,t,r,i){const n=ts(e);let s=r;return n!==e&&(kt(e)?r.length>3&&(s=function(a,o,u){return r.call(this,a,o,u,e)}):s=function(a,o,u){return r.call(this,a,Sr(e,o),u,e)}),n[t](s,...i)}function Rs(e,t,r){const i=Be(e);lt(i,"iterate",ji);const n=i[t](...r);return(n===-1||n===!1)&&Io(r[0])?(r[0]=Be(r[0]),i[t](...r)):n}function wi(e,t,r=[]){pr(),wo();const i=Be(e)[t].apply(e,r);return bo(),fr(),i}const mb=fo("__proto__,__v_isRef,__isVue"),$h=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Yt));function gb(e){Yt(e)||(e=String(e));const t=Be(this);return lt(t,"has",e),t.hasOwnProperty(e)}class xh{constructor(t=!1,r=!1){this._isReadonly=t,this._isShallow=r}get(t,r,i){if(r==="__v_skip")return t.__v_skip;const n=this._isReadonly,s=this._isShallow;if(r==="__v_isReactive")return!n;if(r==="__v_isReadonly")return n;if(r==="__v_isShallow")return s;if(r==="__v_raw")return i===(n?s?Ib:Eh:s?Ih:Th).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const a=we(t);if(!n){let u;if(a&&(u=fb[r]))return u;if(r==="hasOwnProperty")return gb}const o=Reflect.get(t,r,dt(t)?t:i);if((Yt(r)?$h.has(r):mb(r))||(n||lt(t,"get",r),s))return o;if(dt(o)){const u=a&&go(r)?o:o.value;return n&&We(u)?qa(u):u}return We(o)?n?qa(o):So(o):o}}class Sh extends xh{constructor(t=!1){super(!1,t)}set(t,r,i,n){let s=t[r];const a=we(t)&&go(r);if(!this._isShallow){const d=hr(s);if(!kt(i)&&!hr(i)&&(s=Be(s),i=Be(i)),!a&&dt(s)&&!dt(i))return d||(s.value=i),!0}const o=a?Number(r)<t.length:Ne(t,r),u=Reflect.set(t,r,i,dt(t)?t:n);return t===Be(n)&&(o?Ir(i,s)&&ur(t,"set",r,i):ur(t,"add",r,i)),u}deleteProperty(t,r){const i=Ne(t,r);t[r];const n=Reflect.deleteProperty(t,r);return n&&i&&ur(t,"delete",r,void 0),n}has(t,r){const i=Reflect.has(t,r);return(!Yt(r)||!$h.has(r))&&lt(t,"has",r),i}ownKeys(t){return lt(t,"iterate",we(t)?"length":Hr),Reflect.ownKeys(t)}}class yb extends xh{constructor(t=!1){super(!0,t)}set(t,r){return!0}deleteProperty(t,r){return!0}}const _b=new Sh,wb=new yb,bb=new Sh(!0);const Wa=e=>e,mn=e=>Reflect.getPrototypeOf(e);function vb(e,t,r){return function(...i){const n=this.__v_raw,s=Be(n),a=oi(s),o=e==="entries"||e===Symbol.iterator&&a,u=e==="keys"&&a,d=n[e](...i),c=r?Wa:t?di:Wt;return!t&&lt(s,"iterate",u?La:Hr),nt(Object.create(d),{next(){const{value:f,done:h}=d.next();return h?{value:f,done:h}:{value:o?[c(f[0]),c(f[1])]:c(f),done:h}}})}}function gn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function $b(e,t){const r={get(n){const s=this.__v_raw,a=Be(s),o=Be(n);e||(Ir(n,o)&&lt(a,"get",n),lt(a,"get",o));const{has:u}=mn(a),d=t?Wa:e?di:Wt;if(u.call(a,n))return d(s.get(n));if(u.call(a,o))return d(s.get(o));s!==a&&s.get(n)},get size(){const n=this.__v_raw;return!e&&lt(Be(n),"iterate",Hr),n.size},has(n){const s=this.__v_raw,a=Be(s),o=Be(n);return e||(Ir(n,o)&&lt(a,"has",n),lt(a,"has",o)),n===o?s.has(n):s.has(n)||s.has(o)},forEach(n,s){const a=this,o=a.__v_raw,u=Be(o),d=t?Wa:e?di:Wt;return!e&&lt(u,"iterate",Hr),o.forEach((c,f)=>n.call(s,d(c),d(f),a))}};return nt(r,e?{add:gn("add"),set:gn("set"),delete:gn("delete"),clear:gn("clear")}:{add(n){!t&&!kt(n)&&!hr(n)&&(n=Be(n));const s=Be(this);return mn(s).has.call(s,n)||(s.add(n),ur(s,"add",n,n)),this},set(n,s){!t&&!kt(s)&&!hr(s)&&(s=Be(s));const a=Be(this),{has:o,get:u}=mn(a);let d=o.call(a,n);d||(n=Be(n),d=o.call(a,n));const c=u.call(a,n);return a.set(n,s),d?Ir(s,c)&&ur(a,"set",n,s):ur(a,"add",n,s),this},delete(n){const s=Be(this),{has:a,get:o}=mn(s);let u=a.call(s,n);u||(n=Be(n),u=a.call(s,n)),o&&o.call(s,n);const d=s.delete(n);return u&&ur(s,"delete",n,void 0),d},clear(){const n=Be(this),s=n.size!==0,a=n.clear();return s&&ur(n,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(n=>{r[n]=vb(n,e,t)}),r}function xo(e,t){const r=$b(e,t);return(i,n,s)=>n==="__v_isReactive"?!e:n==="__v_isReadonly"?e:n==="__v_raw"?i:Reflect.get(Ne(r,n)&&n in i?r:i,n,s)}const xb={get:xo(!1,!1)},Sb={get:xo(!1,!0)},Tb={get:xo(!0,!1)};const Th=new WeakMap,Ih=new WeakMap,Eh=new WeakMap,Ib=new WeakMap;function Eb(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function kb(e){return e.__v_skip||!Object.isExtensible(e)?0:Eb(Xw(e))}function So(e){return hr(e)?e:To(e,!1,_b,xb,Th)}function Cb(e){return To(e,!1,bb,Sb,Ih)}function qa(e){return To(e,!0,wb,Tb,Eh)}function To(e,t,r,i,n){if(!We(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=kb(e);if(s===0)return e;const a=n.get(e);if(a)return a;const o=new Proxy(e,s===2?i:r);return n.set(e,o),o}function Gr(e){return hr(e)?Gr(e.__v_raw):!!(e&&e.__v_isReactive)}function hr(e){return!!(e&&e.__v_isReadonly)}function kt(e){return!!(e&&e.__v_isShallow)}function Io(e){return e?!!e.__v_raw:!1}function Be(e){const t=e&&e.__v_raw;return t?Be(t):e}function zb(e){return!Ne(e,"__v_skip")&&Object.isExtensible(e)&&dh(e,"__v_skip",!0),e}const Wt=e=>We(e)?So(e):e,di=e=>We(e)?qa(e):e;function dt(e){return e?e.__v_isRef===!0:!1}function At(e){return Ab(e,!1)}function Ab(e,t){return dt(e)?e:new Ob(e,t)}class Ob{constructor(t,r){this.dep=new $o,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=r?t:Be(t),this._value=r?t:Wt(t),this.__v_isShallow=r}get value(){return this.dep.track(),this._value}set value(t){const r=this._rawValue,i=this.__v_isShallow||kt(t)||hr(t);t=i?t:Be(t),Ir(t,r)&&(this._rawValue=t,this._value=i?t:Wt(t),this.dep.trigger())}}function Rb(e){return dt(e)?e.value:e}const Mb={get:(e,t,r)=>t==="__v_raw"?e:Rb(Reflect.get(e,t,r)),set:(e,t,r,i)=>{const n=e[t];return dt(n)&&!dt(r)?(n.value=r,!0):Reflect.set(e,t,r,i)}};function kh(e){return Gr(e)?e:new Proxy(e,Mb)}class Bb{constructor(t,r,i){this.fn=t,this.setter=r,this._value=void 0,this.dep=new $o(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Fi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!r,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&He!==this)return gh(this,!0),!0}get value(){const t=this.dep.track();return wh(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Nb(e,t,r=!1){let i,n;return xe(e)?i=e:(i=e.get,n=e.set),new Bb(i,n,r)}const yn={},Dn=new WeakMap;let Lr;function Db(e,t=!1,r=Lr){if(r){let i=Dn.get(r);i||Dn.set(r,i=[]),i.push(e)}}function Pb(e,t,r=Ve){const{immediate:i,deep:n,once:s,scheduler:a,augmentJob:o,call:u}=r,d=S=>n?S:kt(S)||n===!1||n===0?lr(S,1):lr(S);let c,f,h,y,_=!1,w=!1;if(dt(e)?(f=()=>e.value,_=kt(e)):Gr(e)?(f=()=>d(e),_=!0):we(e)?(w=!0,_=e.some(S=>Gr(S)||kt(S)),f=()=>e.map(S=>{if(dt(S))return S.value;if(Gr(S))return d(S);if(xe(S))return u?u(S,2):S()})):xe(e)?t?f=u?()=>u(e,2):e:f=()=>{if(h){pr();try{h()}finally{fr()}}const S=Lr;Lr=c;try{return u?u(e,3,[y]):e(y)}finally{Lr=S}}:f=Zt,t&&n){const S=f,k=n===!0?1/0:n;f=()=>lr(S(),k)}const T=db(),v=()=>{c.stop(),T&&T.active&&mo(T.effects,c)};if(s&&t){const S=t;t=(...k)=>{S(...k),v()}}let b=w?new Array(e.length).fill(yn):yn;const I=S=>{if(!(!(c.flags&1)||!c.dirty&&!S))if(t){const k=c.run();if(n||_||(w?k.some((R,O)=>Ir(R,b[O])):Ir(k,b))){h&&h();const R=Lr;Lr=c;try{const O=[k,b===yn?void 0:w&&b[0]===yn?[]:b,y];b=k,u?u(t,3,O):t(...O)}finally{Lr=R}}}else c.run()};return o&&o(I),c=new hh(f),c.scheduler=a?()=>a(I,!1):I,y=S=>Db(S,!1,c),h=c.onStop=()=>{const S=Dn.get(c);if(S){if(u)u(S,4);else for(const k of S)k();Dn.delete(c)}},t?i?I(!0):b=c.run():a?a(I.bind(null,!0),!0):c.run(),v.pause=c.pause.bind(c),v.resume=c.resume.bind(c),v.stop=v,v}function lr(e,t=1/0,r){if(t<=0||!We(e)||e.__v_skip||(r=r||new Map,(r.get(e)||0)>=t))return e;if(r.set(e,t),t--,dt(e))lr(e.value,t,r);else if(we(e))for(let i=0;i<e.length;i++)lr(e[i],t,r);else if(sh(e)||oi(e))e.forEach(i=>{lr(i,t,r)});else if(uh(e)){for(const i in e)lr(e[i],t,r);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&lr(e[i],t,r)}return e}function en(e,t,r,i){try{return i?e(...i):e()}catch(n){rs(n,t,r)}}function Xt(e,t,r,i){if(xe(e)){const n=en(e,t,r,i);return n&&ah(n)&&n.catch(s=>{rs(s,t,r)}),n}if(we(e)){const n=[];for(let s=0;s<e.length;s++)n.push(Xt(e[s],t,r,i));return n}}function rs(e,t,r,i=!0){const n=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||Ve;if(t){let o=t.parent;const u=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${r}`;for(;o;){const c=o.ec;if(c){for(let f=0;f<c.length;f++)if(c[f](e,u,d)===!1)return}o=o.parent}if(s){pr(),en(s,null,10,[e,u,d]),fr();return}}Ub(e,r,n,i,a)}function Ub(e,t,r,i=!0,n=!1){if(n)throw e;console.error(e)}const ft=[];let Kt=-1;const ui=[];let Tr=null,ii=0;const Ch=Promise.resolve();let Pn=null;function zh(e){const t=Pn||Ch;return e?t.then(this?e.bind(this):e):t}function Lb(e){let t=Kt+1,r=ft.length;for(;t<r;){const i=t+r>>>1,n=ft[i],s=Ki(n);s<e||s===e&&n.flags&2?t=i+1:r=i}return t}function Eo(e){if(!(e.flags&1)){const t=Ki(e),r=ft[ft.length-1];!r||!(e.flags&2)&&t>=Ki(r)?ft.push(e):ft.splice(Lb(t),0,e),e.flags|=1,Ah()}}function Ah(){Pn||(Pn=Ch.then(Rh))}function Wb(e){we(e)?ui.push(...e):Tr&&e.id===-1?Tr.splice(ii+1,0,e):e.flags&1||(ui.push(e),e.flags|=1),Ah()}function Yl(e,t,r=Kt+1){for(;r<ft.length;r++){const i=ft[r];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;ft.splice(r,1),r--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Oh(e){if(ui.length){const t=[...new Set(ui)].sort((r,i)=>Ki(r)-Ki(i));if(ui.length=0,Tr){Tr.push(...t);return}for(Tr=t,ii=0;ii<Tr.length;ii++){const r=Tr[ii];r.flags&4&&(r.flags&=-2),r.flags&8||r(),r.flags&=-2}Tr=null,ii=0}}const Ki=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Rh(e){try{for(Kt=0;Kt<ft.length;Kt++){const t=ft[Kt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),en(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Kt<ft.length;Kt++){const t=ft[Kt];t&&(t.flags&=-2)}Kt=-1,ft.length=0,Oh(),Pn=null,(ft.length||ui.length)&&Rh()}}let Et=null,Mh=null;function Un(e){const t=Et;return Et=e,Mh=e&&e.type.__scopeId||null,t}function qb(e,t=Et,r){if(!t||e._n)return e;const i=(...n)=>{i._d&&ld(-1);const s=Un(t);let a;try{a=e(...n)}finally{Un(s),i._d&&ld(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Xl(e,t){if(Et===null)return e;const r=as(Et),i=e.dirs||(e.dirs=[]);for(let n=0;n<t.length;n++){let[s,a,o,u=Ve]=t[n];s&&(xe(s)&&(s={mounted:s,updated:s}),s.deep&&lr(a),i.push({dir:s,instance:r,value:a,oldValue:void 0,arg:o,modifiers:u}))}return e}function Rr(e,t,r,i){const n=e.dirs,s=t&&t.dirs;for(let a=0;a<n.length;a++){const o=n[a];s&&(o.oldValue=s[a].value);let u=o.dir[i];u&&(pr(),Xt(u,r,8,[e.el,o,e,t]),fr())}}function Vb(e,t){if(ht){let r=ht.provides;const i=ht.parent&&ht.parent.provides;i===r&&(r=ht.provides=Object.create(i)),r[e]=t}}function An(e,t,r=!1){const i=Hv();if(i||li){let n=li?li._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(n&&e in n)return n[e];if(arguments.length>1)return r&&xe(t)?t.call(i&&i.proxy):t}}const Hb=Symbol.for("v-scx"),Gb=()=>An(Hb);function On(e,t,r){return Bh(e,t,r)}function Bh(e,t,r=Ve){const{immediate:i,deep:n,flush:s,once:a}=r,o=nt({},r),u=t&&i||!t&&s!=="post";let d;if(Zi){if(s==="sync"){const y=Gb();d=y.__watcherHandles||(y.__watcherHandles=[])}else if(!u){const y=()=>{};return y.stop=Zt,y.resume=Zt,y.pause=Zt,y}}const c=ht;o.call=(y,_,w)=>Xt(y,c,_,w);let f=!1;s==="post"?o.scheduler=y=>{gt(y,c&&c.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(y,_)=>{_?y():Eo(y)}),o.augmentJob=y=>{t&&(y.flags|=4),f&&(y.flags|=2,c&&(y.id=c.uid,y.i=c))};const h=Pb(e,t,o);return Zi&&(d?d.push(h):u&&h()),h}function Fb(e,t,r){const i=this.proxy,n=Qe(e)?e.includes(".")?Nh(i,e):()=>i[e]:e.bind(i,i);let s;xe(t)?s=t:(s=t.handler,r=t);const a=tn(this),o=Bh(n,s.bind(i),r);return a(),o}function Nh(e,t){const r=t.split(".");return()=>{let i=e;for(let n=0;n<r.length&&i;n++)i=i[r[n]];return i}}const jb=Symbol("_vte"),Kb=e=>e.__isTeleport,Qb=Symbol("_leaveCb");function ko(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ko(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Zb(e,t){return xe(e)?nt({name:e.name},t,{setup:e}):e}function Dh(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Jl(e,t){let r;return!!((r=Object.getOwnPropertyDescriptor(e,t))&&!r.configurable)}const Ln=new WeakMap;function Wi(e,t,r,i,n=!1){if(we(e)){e.forEach((w,T)=>Wi(w,t&&(we(t)?t[T]:t),r,i,n));return}if(qi(i)&&!n){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Wi(e,t,r,i.component.subTree);return}const s=i.shapeFlag&4?as(i.component):i.el,a=n?null:s,{i:o,r:u}=e,d=t&&t.r,c=o.refs===Ve?o.refs={}:o.refs,f=o.setupState,h=Be(f),y=f===Ve?nh:w=>Jl(c,w)?!1:Ne(h,w),_=(w,T)=>!(T&&Jl(c,T));if(d!=null&&d!==u){if(ed(t),Qe(d))c[d]=null,y(d)&&(f[d]=null);else if(dt(d)){const w=t;_(d,w.k)&&(d.value=null),w.k&&(c[w.k]=null)}}if(xe(u))en(u,o,12,[a,c]);else{const w=Qe(u),T=dt(u);if(w||T){const v=()=>{if(e.f){const b=w?y(u)?f[u]:c[u]:_()||!e.k?u.value:c[e.k];if(n)we(b)&&mo(b,s);else if(we(b))b.includes(s)||b.push(s);else if(w)c[u]=[s],y(u)&&(f[u]=c[u]);else{const I=[s];_(u,e.k)&&(u.value=I),e.k&&(c[e.k]=I)}}else w?(c[u]=a,y(u)&&(f[u]=a)):T&&(_(u,e.k)&&(u.value=a),e.k&&(c[e.k]=a))};if(a){const b=()=>{v(),Ln.delete(e)};b.id=-1,Ln.set(e,b),gt(b,r)}else ed(e),v()}}}function ed(e){const t=Ln.get(e);t&&(t.flags|=8,Ln.delete(e))}es().requestIdleCallback;es().cancelIdleCallback;const qi=e=>!!e.type.__asyncLoader,Ph=e=>e.type.__isKeepAlive;function Yb(e,t){Uh(e,"a",t)}function Xb(e,t){Uh(e,"da",t)}function Uh(e,t,r=ht){const i=e.__wdc||(e.__wdc=()=>{let n=r;for(;n;){if(n.isDeactivated)return;n=n.parent}return e()});if(is(t,i,r),r){let n=r.parent;for(;n&&n.parent;)Ph(n.parent.vnode)&&Jb(i,t,r,n),n=n.parent}}function Jb(e,t,r,i){const n=is(t,e,i,!0);Co(()=>{mo(i[t],n)},r)}function is(e,t,r=ht,i=!1){if(r){const n=r[e]||(r[e]=[]),s=t.__weh||(t.__weh=(...a)=>{pr();const o=tn(r),u=Xt(t,r,e,a);return o(),fr(),u});return i?n.unshift(s):n.push(s),s}}const mr=e=>(t,r=ht)=>{(!Zi||e==="sp")&&is(e,(...i)=>t(...i),r)},ev=mr("bm"),Lh=mr("m"),tv=mr("bu"),rv=mr("u"),iv=mr("bum"),Co=mr("um"),nv=mr("sp"),sv=mr("rtg"),av=mr("rtc");function ov(e,t=ht){is("ec",e,t)}const uv=Symbol.for("v-ndc");function Ms(e,t,r,i){let n;const s=r,a=we(e);if(a||Qe(e)){const o=a&&Gr(e);let u=!1,d=!1;o&&(u=!kt(e),d=hr(e),e=ts(e)),n=new Array(e.length);for(let c=0,f=e.length;c<f;c++)n[c]=t(u?d?di(Wt(e[c])):Wt(e[c]):e[c],c,void 0,s)}else if(typeof e=="number"){n=new Array(e);for(let o=0;o<e;o++)n[o]=t(o+1,o,void 0,s)}else if(We(e))if(e[Symbol.iterator])n=Array.from(e,(o,u)=>t(o,u,void 0,s));else{const o=Object.keys(e);n=new Array(o.length);for(let u=0,d=o.length;u<d;u++){const c=o[u];n[u]=t(e[c],c,u,s)}}else n=[];return n}const Va=e=>e?om(e)?as(e):Va(e.parent):null,Vi=nt(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Va(e.parent),$root:e=>Va(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>qh(e),$forceUpdate:e=>e.f||(e.f=()=>{Eo(e.update)}),$nextTick:e=>e.n||(e.n=zh.bind(e.proxy)),$watch:e=>Fb.bind(e)}),Bs=(e,t)=>e!==Ve&&!e.__isScriptSetup&&Ne(e,t),lv={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:r,setupState:i,data:n,props:s,accessCache:a,type:o,appContext:u}=e;if(t[0]!=="$"){const h=a[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return n[t];case 4:return r[t];case 3:return s[t]}else{if(Bs(i,t))return a[t]=1,i[t];if(n!==Ve&&Ne(n,t))return a[t]=2,n[t];if(Ne(s,t))return a[t]=3,s[t];if(r!==Ve&&Ne(r,t))return a[t]=4,r[t];Ha&&(a[t]=0)}}const d=Vi[t];let c,f;if(d)return t==="$attrs"&&lt(e.attrs,"get",""),d(e);if((c=o.__cssModules)&&(c=c[t]))return c;if(r!==Ve&&Ne(r,t))return a[t]=4,r[t];if(f=u.config.globalProperties,Ne(f,t))return f[t]},set({_:e},t,r){const{data:i,setupState:n,ctx:s}=e;return Bs(n,t)?(n[t]=r,!0):i!==Ve&&Ne(i,t)?(i[t]=r,!0):Ne(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=r,!0)},has({_:{data:e,setupState:t,accessCache:r,ctx:i,appContext:n,props:s,type:a}},o){let u;return!!(r[o]||e!==Ve&&o[0]!=="$"&&Ne(e,o)||Bs(t,o)||Ne(s,o)||Ne(i,o)||Ne(Vi,o)||Ne(n.config.globalProperties,o)||(u=a.__cssModules)&&u[o])},defineProperty(e,t,r){return r.get!=null?e._.accessCache[t]=0:Ne(r,"value")&&this.set(e,t,r.value,null),Reflect.defineProperty(e,t,r)}};function td(e){return we(e)?e.reduce((t,r)=>(t[r]=null,t),{}):e}let Ha=!0;function dv(e){const t=qh(e),r=e.proxy,i=e.ctx;Ha=!1,t.beforeCreate&&rd(t.beforeCreate,e,"bc");const{data:n,computed:s,methods:a,watch:o,provide:u,inject:d,created:c,beforeMount:f,mounted:h,beforeUpdate:y,updated:_,activated:w,deactivated:T,beforeDestroy:v,beforeUnmount:b,destroyed:I,unmounted:S,render:k,renderTracked:R,renderTriggered:O,errorCaptured:x,serverPrefetch:q,expose:G,inheritAttrs:oe,components:W,directives:j,filters:M}=t;if(d&&cv(d,i,null),a)for(const ie in a){const X=a[ie];xe(X)&&(i[ie]=X.bind(r))}if(n){const ie=n.call(r,r);We(ie)&&(e.data=So(ie))}if(Ha=!0,s)for(const ie in s){const X=s[ie],le=xe(X)?X.bind(r,r):xe(X.get)?X.get.bind(r,r):Zt,Se=!xe(X)&&xe(X.set)?X.set.bind(r):Zt,U=Zv({get:le,set:Se});Object.defineProperty(i,ie,{enumerable:!0,configurable:!0,get:()=>U.value,set:Y=>U.value=Y})}if(o)for(const ie in o)Wh(o[ie],i,r,ie);if(u){const ie=xe(u)?u.call(r):u;Reflect.ownKeys(ie).forEach(X=>{Vb(X,ie[X])})}c&&rd(c,e,"c");function Z(ie,X){we(X)?X.forEach(le=>ie(le.bind(r))):X&&ie(X.bind(r))}if(Z(ev,f),Z(Lh,h),Z(tv,y),Z(rv,_),Z(Yb,w),Z(Xb,T),Z(ov,x),Z(av,R),Z(sv,O),Z(iv,b),Z(Co,S),Z(nv,q),we(G))if(G.length){const ie=e.exposed||(e.exposed={});G.forEach(X=>{Object.defineProperty(ie,X,{get:()=>r[X],set:le=>r[X]=le,enumerable:!0})})}else e.exposed||(e.exposed={});k&&e.render===Zt&&(e.render=k),oe!=null&&(e.inheritAttrs=oe),W&&(e.components=W),j&&(e.directives=j),q&&Dh(e)}function cv(e,t,r=Zt){we(e)&&(e=Ga(e));for(const i in e){const n=e[i];let s;We(n)?"default"in n?s=An(n.from||i,n.default,!0):s=An(n.from||i):s=An(n),dt(s)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):t[i]=s}}function rd(e,t,r){Xt(we(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,r)}function Wh(e,t,r,i){let n=i.includes(".")?Nh(r,i):()=>r[i];if(Qe(e)){const s=t[e];xe(s)&&On(n,s)}else if(xe(e))On(n,e.bind(r));else if(We(e))if(we(e))e.forEach(s=>Wh(s,t,r,i));else{const s=xe(e.handler)?e.handler.bind(r):t[e.handler];xe(s)&&On(n,s,e)}}function qh(e){const t=e.type,{mixins:r,extends:i}=t,{mixins:n,optionsCache:s,config:{optionMergeStrategies:a}}=e.appContext,o=s.get(t);let u;return o?u=o:!n.length&&!r&&!i?u=t:(u={},n.length&&n.forEach(d=>Wn(u,d,a,!0)),Wn(u,t,a)),We(t)&&s.set(t,u),u}function Wn(e,t,r,i=!1){const{mixins:n,extends:s}=t;s&&Wn(e,s,r,!0),n&&n.forEach(a=>Wn(e,a,r,!0));for(const a in t)if(!(i&&a==="expose")){const o=pv[a]||r&&r[a];e[a]=o?o(e[a],t[a]):t[a]}return e}const pv={data:id,props:nd,emits:nd,methods:Ri,computed:Ri,beforeCreate:pt,created:pt,beforeMount:pt,mounted:pt,beforeUpdate:pt,updated:pt,beforeDestroy:pt,beforeUnmount:pt,destroyed:pt,unmounted:pt,activated:pt,deactivated:pt,errorCaptured:pt,serverPrefetch:pt,components:Ri,directives:Ri,watch:hv,provide:id,inject:fv};function id(e,t){return t?e?function(){return nt(xe(e)?e.call(this,this):e,xe(t)?t.call(this,this):t)}:t:e}function fv(e,t){return Ri(Ga(e),Ga(t))}function Ga(e){if(we(e)){const t={};for(let r=0;r<e.length;r++)t[e[r]]=e[r];return t}return e}function pt(e,t){return e?[...new Set([].concat(e,t))]:t}function Ri(e,t){return e?nt(Object.create(null),e,t):t}function nd(e,t){return e?we(e)&&we(t)?[...new Set([...e,...t])]:nt(Object.create(null),td(e),td(t??{})):t}function hv(e,t){if(!e)return t;if(!t)return e;const r=nt(Object.create(null),e);for(const i in t)r[i]=pt(e[i],t[i]);return r}function Vh(){return{app:null,config:{isNativeTag:nh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let mv=0;function gv(e,t){return function(i,n=null){xe(i)||(i=nt({},i)),n!=null&&!We(n)&&(n=null);const s=Vh(),a=new WeakSet,o=[];let u=!1;const d=s.app={_uid:mv++,_component:i,_props:n,_container:null,_context:s,_instance:null,version:Yv,get config(){return s.config},set config(c){},use(c,...f){return a.has(c)||(c&&xe(c.install)?(a.add(c),c.install(d,...f)):xe(c)&&(a.add(c),c(d,...f))),d},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),d},component(c,f){return f?(s.components[c]=f,d):s.components[c]},directive(c,f){return f?(s.directives[c]=f,d):s.directives[c]},mount(c,f,h){if(!u){const y=d._ceVNode||cr(i,n);return y.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),e(y,c,h),u=!0,d._container=c,c.__vue_app__=d,as(y.component)}},onUnmount(c){o.push(c)},unmount(){u&&(Xt(o,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(c,f){return s.provides[c]=f,d},runWithContext(c){const f=li;li=d;try{return c()}finally{li=f}}};return d}}let li=null;const yv=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Er(t)}Modifiers`]||e[`${Yr(t)}Modifiers`];function _v(e,t,...r){if(e.isUnmounted)return;const i=e.vnode.props||Ve;let n=r;const s=t.startsWith("update:"),a=s&&yv(i,t.slice(7));a&&(a.trim&&(n=r.map(c=>Qe(c)?c.trim():c)),a.number&&(n=r.map(tb)));let o,u=i[o=ks(t)]||i[o=ks(Er(t))];!u&&s&&(u=i[o=ks(Yr(t))]),u&&Xt(u,e,6,n);const d=i[o+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,Xt(d,e,6,n)}}const wv=new WeakMap;function Hh(e,t,r=!1){const i=r?wv:t.emitsCache,n=i.get(e);if(n!==void 0)return n;const s=e.emits;let a={},o=!1;if(!xe(e)){const u=d=>{const c=Hh(d,t,!0);c&&(o=!0,nt(a,c))};!r&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!s&&!o?(We(e)&&i.set(e,null),null):(we(s)?s.forEach(u=>a[u]=null):nt(a,s),We(e)&&i.set(e,a),a)}function ns(e,t){return!e||!Xn(t)?!1:(t=t.slice(2).replace(/Once$/,""),Ne(e,t[0].toLowerCase()+t.slice(1))||Ne(e,Yr(t))||Ne(e,t))}function sd(e){const{type:t,vnode:r,proxy:i,withProxy:n,propsOptions:[s],slots:a,attrs:o,emit:u,render:d,renderCache:c,props:f,data:h,setupState:y,ctx:_,inheritAttrs:w}=e,T=Un(e);let v,b;try{if(r.shapeFlag&4){const S=n||i,k=S;v=Qt(d.call(k,S,c,f,y,h,_)),b=o}else{const S=t;v=Qt(S.length>1?S(f,{attrs:o,slots:a,emit:u}):S(f,null)),b=t.props?o:bv(o)}}catch(S){Hi.length=0,rs(S,e,1),v=cr(kr)}let I=v;if(b&&w!==!1){const S=Object.keys(b),{shapeFlag:k}=I;S.length&&k&7&&(s&&S.some(ho)&&(b=vv(b,s)),I=ci(I,b,!1,!0))}return r.dirs&&(I=ci(I,null,!1,!0),I.dirs=I.dirs?I.dirs.concat(r.dirs):r.dirs),r.transition&&ko(I,r.transition),v=I,Un(T),v}const bv=e=>{let t;for(const r in e)(r==="class"||r==="style"||Xn(r))&&((t||(t={}))[r]=e[r]);return t},vv=(e,t)=>{const r={};for(const i in e)(!ho(i)||!(i.slice(9)in t))&&(r[i]=e[i]);return r};function $v(e,t,r){const{props:i,children:n,component:s}=e,{props:a,children:o,patchFlag:u}=t,d=s.emitsOptions;if(t.dirs||t.transition)return!0;if(r&&u>=0){if(u&1024)return!0;if(u&16)return i?ad(i,a,d):!!a;if(u&8){const c=t.dynamicProps;for(let f=0;f<c.length;f++){const h=c[f];if(Gh(a,i,h)&&!ns(d,h))return!0}}}else return(n||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?ad(i,a,d):!0:!!a;return!1}function ad(e,t,r){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let n=0;n<i.length;n++){const s=i[n];if(Gh(t,e,s)&&!ns(r,s))return!0}return!1}function Gh(e,t,r){const i=e[r],n=t[r];return r==="style"&&We(i)&&We(n)?!_o(i,n):i!==n}function xv({vnode:e,parent:t},r){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===e&&(i.el=e.el),i===e)(e=t.vnode).el=r,t=t.parent;else break}}const Fh={},jh=()=>Object.create(Fh),Kh=e=>Object.getPrototypeOf(e)===Fh;function Sv(e,t,r,i=!1){const n={},s=jh();e.propsDefaults=Object.create(null),Qh(e,t,n,s);for(const a in e.propsOptions[0])a in n||(n[a]=void 0);r?e.props=i?n:Cb(n):e.type.props?e.props=n:e.props=s,e.attrs=s}function Tv(e,t,r,i){const{props:n,attrs:s,vnode:{patchFlag:a}}=e,o=Be(n),[u]=e.propsOptions;let d=!1;if((i||a>0)&&!(a&16)){if(a&8){const c=e.vnode.dynamicProps;for(let f=0;f<c.length;f++){let h=c[f];if(ns(e.emitsOptions,h))continue;const y=t[h];if(u)if(Ne(s,h))y!==s[h]&&(s[h]=y,d=!0);else{const _=Er(h);n[_]=Fa(u,o,_,y,e,!1)}else y!==s[h]&&(s[h]=y,d=!0)}}}else{Qh(e,t,n,s)&&(d=!0);let c;for(const f in o)(!t||!Ne(t,f)&&((c=Yr(f))===f||!Ne(t,c)))&&(u?r&&(r[f]!==void 0||r[c]!==void 0)&&(n[f]=Fa(u,o,f,void 0,e,!0)):delete n[f]);if(s!==o)for(const f in s)(!t||!Ne(t,f))&&(delete s[f],d=!0)}d&&ur(e.attrs,"set","")}function Qh(e,t,r,i){const[n,s]=e.propsOptions;let a=!1,o;if(t)for(let u in t){if(Pi(u))continue;const d=t[u];let c;n&&Ne(n,c=Er(u))?!s||!s.includes(c)?r[c]=d:(o||(o={}))[c]=d:ns(e.emitsOptions,u)||(!(u in i)||d!==i[u])&&(i[u]=d,a=!0)}if(s){const u=Be(r),d=o||Ve;for(let c=0;c<s.length;c++){const f=s[c];r[f]=Fa(n,u,f,d[f],e,!Ne(d,f))}}return a}function Fa(e,t,r,i,n,s){const a=e[r];if(a!=null){const o=Ne(a,"default");if(o&&i===void 0){const u=a.default;if(a.type!==Function&&!a.skipFactory&&xe(u)){const{propsDefaults:d}=n;if(r in d)i=d[r];else{const c=tn(n);i=d[r]=u.call(null,t),c()}}else i=u;n.ce&&n.ce._setProp(r,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===Yr(r))&&(i=!0))}return i}const Iv=new WeakMap;function Zh(e,t,r=!1){const i=r?Iv:t.propsCache,n=i.get(e);if(n)return n;const s=e.props,a={},o=[];let u=!1;if(!xe(e)){const c=f=>{u=!0;const[h,y]=Zh(f,t,!0);nt(a,h),y&&o.push(...y)};!r&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!s&&!u)return We(e)&&i.set(e,ai),ai;if(we(s))for(let c=0;c<s.length;c++){const f=Er(s[c]);od(f)&&(a[f]=Ve)}else if(s)for(const c in s){const f=Er(c);if(od(f)){const h=s[c],y=a[f]=we(h)||xe(h)?{type:h}:nt({},h),_=y.type;let w=!1,T=!0;if(we(_))for(let v=0;v<_.length;++v){const b=_[v],I=xe(b)&&b.name;if(I==="Boolean"){w=!0;break}else I==="String"&&(T=!1)}else w=xe(_)&&_.name==="Boolean";y[0]=w,y[1]=T,(w||Ne(y,"default"))&&o.push(f)}}const d=[a,o];return We(e)&&i.set(e,d),d}function od(e){return e[0]!=="$"&&!Pi(e)}const zo=e=>e==="_"||e==="_ctx"||e==="$stable",Ao=e=>we(e)?e.map(Qt):[Qt(e)],Ev=(e,t,r)=>{if(t._n)return t;const i=qb((...n)=>Ao(t(...n)),r);return i._c=!1,i},Yh=(e,t,r)=>{const i=e._ctx;for(const n in e){if(zo(n))continue;const s=e[n];if(xe(s))t[n]=Ev(n,s,i);else if(s!=null){const a=Ao(s);t[n]=()=>a}}},Xh=(e,t)=>{const r=Ao(t);e.slots.default=()=>r},Jh=(e,t,r)=>{for(const i in t)(r||!zo(i))&&(e[i]=t[i])},kv=(e,t,r)=>{const i=e.slots=jh();if(e.vnode.shapeFlag&32){const n=t._;n?(Jh(i,t,r),r&&dh(i,"_",n,!0)):Yh(t,i)}else t&&Xh(e,t)},Cv=(e,t,r)=>{const{vnode:i,slots:n}=e;let s=!0,a=Ve;if(i.shapeFlag&32){const o=t._;o?r&&o===1?s=!1:Jh(n,t,r):(s=!t.$stable,Yh(t,n)),a=t}else t&&(Xh(e,t),a={default:1});if(s)for(const o in n)!zo(o)&&a[o]==null&&delete n[o]},gt=Mv;function zv(e){return Av(e)}function Av(e,t){const r=es();r.__VUE__=!0;const{insert:i,remove:n,patchProp:s,createElement:a,createText:o,createComment:u,setText:d,setElementText:c,parentNode:f,nextSibling:h,setScopeId:y=Zt,insertStaticContent:_}=e,w=(C,z,B,K=null,H=null,F=null,re=void 0,te=null,ee=!!z.dynamicChildren)=>{if(C===z)return;C&&!bi(C,z)&&(K=tt(C),Y(C,H,F,!0),C=null),z.patchFlag===-2&&(ee=!1,z.dynamicChildren=null);const{type:V,ref:he,shapeFlag:se}=z;switch(V){case ss:T(C,z,B,K);break;case kr:v(C,z,B,K);break;case Ds:C==null&&b(z,B,K,re);break;case It:W(C,z,B,K,H,F,re,te,ee);break;default:se&1?k(C,z,B,K,H,F,re,te,ee):se&6?j(C,z,B,K,H,F,re,te,ee):(se&64||se&128)&&V.process(C,z,B,K,H,F,re,te,ee,Oe)}he!=null&&H?Wi(he,C&&C.ref,F,z||C,!z):he==null&&C&&C.ref!=null&&Wi(C.ref,null,F,C,!0)},T=(C,z,B,K)=>{if(C==null)i(z.el=o(z.children),B,K);else{const H=z.el=C.el;z.children!==C.children&&d(H,z.children)}},v=(C,z,B,K)=>{C==null?i(z.el=u(z.children||""),B,K):z.el=C.el},b=(C,z,B,K)=>{[C.el,C.anchor]=_(C.children,z,B,K,C.el,C.anchor)},I=({el:C,anchor:z},B,K)=>{let H;for(;C&&C!==z;)H=h(C),i(C,B,K),C=H;i(z,B,K)},S=({el:C,anchor:z})=>{let B;for(;C&&C!==z;)B=h(C),n(C),C=B;n(z)},k=(C,z,B,K,H,F,re,te,ee)=>{if(z.type==="svg"?re="svg":z.type==="math"&&(re="mathml"),C==null)R(z,B,K,H,F,re,te,ee);else{const V=C.el&&C.el._isVueCE?C.el:null;try{V&&V._beginPatch(),q(C,z,H,F,re,te,ee)}finally{V&&V._endPatch()}}},R=(C,z,B,K,H,F,re,te)=>{let ee,V;const{props:he,shapeFlag:se,transition:ce,dirs:me}=C;if(ee=C.el=a(C.type,F,he&&he.is,he),se&8?c(ee,C.children):se&16&&x(C.children,ee,null,K,H,Ns(C,F),re,te),me&&Rr(C,null,K,"created"),O(ee,C,C.scopeId,re,K),he){for(const Pe in he)Pe!=="value"&&!Pi(Pe)&&s(ee,Pe,null,he[Pe],F,K);"value"in he&&s(ee,"value",null,he.value,F),(V=he.onVnodeBeforeMount)&&Gt(V,K,C)}me&&Rr(C,null,K,"beforeMount");const be=Ov(H,ce);be&&ce.beforeEnter(ee),i(ee,z,B),((V=he&&he.onVnodeMounted)||be||me)&&gt(()=>{V&&Gt(V,K,C),be&&ce.enter(ee),me&&Rr(C,null,K,"mounted")},H)},O=(C,z,B,K,H)=>{if(B&&y(C,B),K)for(let F=0;F<K.length;F++)y(C,K[F]);if(H){let F=H.subTree;if(z===F||im(F.type)&&(F.ssContent===z||F.ssFallback===z)){const re=H.vnode;O(C,re,re.scopeId,re.slotScopeIds,H.parent)}}},x=(C,z,B,K,H,F,re,te,ee=0)=>{for(let V=ee;V<C.length;V++){const he=C[V]=te?or(C[V]):Qt(C[V]);w(null,he,z,B,K,H,F,re,te)}},q=(C,z,B,K,H,F,re)=>{const te=z.el=C.el;let{patchFlag:ee,dynamicChildren:V,dirs:he}=z;ee|=C.patchFlag&16;const se=C.props||Ve,ce=z.props||Ve;let me;if(B&&Mr(B,!1),(me=ce.onVnodeBeforeUpdate)&&Gt(me,B,z,C),he&&Rr(z,C,B,"beforeUpdate"),B&&Mr(B,!0),(se.innerHTML&&ce.innerHTML==null||se.textContent&&ce.textContent==null)&&c(te,""),V?G(C.dynamicChildren,V,te,B,K,Ns(z,H),F):re||X(C,z,te,null,B,K,Ns(z,H),F,!1),ee>0){if(ee&16)oe(te,se,ce,B,H);else if(ee&2&&se.class!==ce.class&&s(te,"class",null,ce.class,H),ee&4&&s(te,"style",se.style,ce.style,H),ee&8){const be=z.dynamicProps;for(let Pe=0;Pe<be.length;Pe++){const Ce=be[Pe],Ye=se[Ce],ot=ce[Ce];(ot!==Ye||Ce==="value")&&s(te,Ce,Ye,ot,H,B)}}ee&1&&C.children!==z.children&&c(te,z.children)}else!re&&V==null&&oe(te,se,ce,B,H);((me=ce.onVnodeUpdated)||he)&&gt(()=>{me&&Gt(me,B,z,C),he&&Rr(z,C,B,"updated")},K)},G=(C,z,B,K,H,F,re)=>{for(let te=0;te<z.length;te++){const ee=C[te],V=z[te],he=ee.el&&(ee.type===It||!bi(ee,V)||ee.shapeFlag&198)?f(ee.el):B;w(ee,V,he,null,K,H,F,re,!0)}},oe=(C,z,B,K,H)=>{if(z!==B){if(z!==Ve)for(const F in z)!Pi(F)&&!(F in B)&&s(C,F,z[F],null,H,K);for(const F in B){if(Pi(F))continue;const re=B[F],te=z[F];re!==te&&F!=="value"&&s(C,F,te,re,H,K)}"value"in B&&s(C,"value",z.value,B.value,H)}},W=(C,z,B,K,H,F,re,te,ee)=>{const V=z.el=C?C.el:o(""),he=z.anchor=C?C.anchor:o("");let{patchFlag:se,dynamicChildren:ce,slotScopeIds:me}=z;me&&(te=te?te.concat(me):me),C==null?(i(V,B,K),i(he,B,K),x(z.children||[],B,he,H,F,re,te,ee)):se>0&&se&64&&ce&&C.dynamicChildren&&C.dynamicChildren.length===ce.length?(G(C.dynamicChildren,ce,B,H,F,re,te),(z.key!=null||H&&z===H.subTree)&&em(C,z,!0)):X(C,z,B,he,H,F,re,te,ee)},j=(C,z,B,K,H,F,re,te,ee)=>{z.slotScopeIds=te,C==null?z.shapeFlag&512?H.ctx.activate(z,B,K,re,ee):M(z,B,K,H,F,re,ee):L(C,z,ee)},M=(C,z,B,K,H,F,re)=>{const te=C.component=Vv(C,K,H);if(Ph(C)&&(te.ctx.renderer=Oe),Gv(te,!1,re),te.asyncDep){if(H&&H.registerDep(te,Z,re),!C.el){const ee=te.subTree=cr(kr);v(null,ee,z,B),C.placeholder=ee.el}}else Z(te,C,z,B,H,F,re)},L=(C,z,B)=>{const K=z.component=C.component;if($v(C,z,B))if(K.asyncDep&&!K.asyncResolved){ie(K,z,B);return}else K.next=z,K.update();else z.el=C.el,K.vnode=z},Z=(C,z,B,K,H,F,re)=>{const te=()=>{if(C.isMounted){let{next:se,bu:ce,u:me,parent:be,vnode:Pe}=C;{const xt=tm(C);if(xt){se&&(se.el=Pe.el,ie(C,se,re)),xt.asyncDep.then(()=>{gt(()=>{C.isUnmounted||V()},H)});return}}let Ce=se,Ye;Mr(C,!1),se?(se.el=Pe.el,ie(C,se,re)):se=Pe,ce&&Cs(ce),(Ye=se.props&&se.props.onVnodeBeforeUpdate)&&Gt(Ye,be,se,Pe),Mr(C,!0);const ot=sd(C),rt=C.subTree;C.subTree=ot,w(rt,ot,f(rt.el),tt(rt),C,H,F),se.el=ot.el,Ce===null&&xv(C,ot.el),me&&gt(me,H),(Ye=se.props&&se.props.onVnodeUpdated)&&gt(()=>Gt(Ye,be,se,Pe),H)}else{let se;const{el:ce,props:me}=z,{bm:be,m:Pe,parent:Ce,root:Ye,type:ot}=C,rt=qi(z);Mr(C,!1),be&&Cs(be),!rt&&(se=me&&me.onVnodeBeforeMount)&&Gt(se,Ce,z),Mr(C,!0);{Ye.ce&&Ye.ce._hasShadowRoot()&&Ye.ce._injectChildStyle(ot);const xt=C.subTree=sd(C);w(null,xt,B,K,C,H,F),z.el=xt.el}if(Pe&&gt(Pe,H),!rt&&(se=me&&me.onVnodeMounted)){const xt=z;gt(()=>Gt(se,Ce,xt),H)}(z.shapeFlag&256||Ce&&qi(Ce.vnode)&&Ce.vnode.shapeFlag&256)&&C.a&&gt(C.a,H),C.isMounted=!0,z=B=K=null}};C.scope.on();const ee=C.effect=new hh(te);C.scope.off();const V=C.update=ee.run.bind(ee),he=C.job=ee.runIfDirty.bind(ee);he.i=C,he.id=C.uid,ee.scheduler=()=>Eo(he),Mr(C,!0),V()},ie=(C,z,B)=>{z.component=C;const K=C.vnode.props;C.vnode=z,C.next=null,Tv(C,z.props,K,B),Cv(C,z.children,B),pr(),Yl(C),fr()},X=(C,z,B,K,H,F,re,te,ee=!1)=>{const V=C&&C.children,he=C?C.shapeFlag:0,se=z.children,{patchFlag:ce,shapeFlag:me}=z;if(ce>0){if(ce&128){Se(V,se,B,K,H,F,re,te,ee);return}else if(ce&256){le(V,se,B,K,H,F,re,te,ee);return}}me&8?(he&16&&Ze(V,H,F),se!==V&&c(B,se)):he&16?me&16?Se(V,se,B,K,H,F,re,te,ee):Ze(V,H,F,!0):(he&8&&c(B,""),me&16&&x(se,B,K,H,F,re,te,ee))},le=(C,z,B,K,H,F,re,te,ee)=>{C=C||ai,z=z||ai;const V=C.length,he=z.length,se=Math.min(V,he);let ce;for(ce=0;ce<se;ce++){const me=z[ce]=ee?or(z[ce]):Qt(z[ce]);w(C[ce],me,B,null,H,F,re,te,ee)}V>he?Ze(C,H,F,!0,!1,se):x(z,B,K,H,F,re,te,ee,se)},Se=(C,z,B,K,H,F,re,te,ee)=>{let V=0;const he=z.length;let se=C.length-1,ce=he-1;for(;V<=se&&V<=ce;){const me=C[V],be=z[V]=ee?or(z[V]):Qt(z[V]);if(bi(me,be))w(me,be,B,null,H,F,re,te,ee);else break;V++}for(;V<=se&&V<=ce;){const me=C[se],be=z[ce]=ee?or(z[ce]):Qt(z[ce]);if(bi(me,be))w(me,be,B,null,H,F,re,te,ee);else break;se--,ce--}if(V>se){if(V<=ce){const me=ce+1,be=me<he?z[me].el:K;for(;V<=ce;)w(null,z[V]=ee?or(z[V]):Qt(z[V]),B,be,H,F,re,te,ee),V++}}else if(V>ce)for(;V<=se;)Y(C[V],H,F,!0),V++;else{const me=V,be=V,Pe=new Map;for(V=be;V<=ce;V++){const it=z[V]=ee?or(z[V]):Qt(z[V]);it.key!=null&&Pe.set(it.key,V)}let Ce,Ye=0;const ot=ce-be+1;let rt=!1,xt=0;const yr=new Array(ot);for(V=0;V<ot;V++)yr[V]=0;for(V=me;V<=se;V++){const it=C[V];if(Ye>=ot){Y(it,H,F,!0);continue}let mt;if(it.key!=null)mt=Pe.get(it.key);else for(Ce=be;Ce<=ce;Ce++)if(yr[Ce-be]===0&&bi(it,z[Ce])){mt=Ce;break}mt===void 0?Y(it,H,F,!0):(yr[mt-be]=V+1,mt>=xt?xt=mt:rt=!0,w(it,z[mt],B,null,H,F,re,te,ee),Ye++)}const mi=rt?Rv(yr):ai;for(Ce=mi.length-1,V=ot-1;V>=0;V--){const it=be+V,mt=z[it],rn=z[it+1],nn=it+1<he?rn.el||rm(rn):K;yr[V]===0?w(null,mt,B,nn,H,F,re,te,ee):rt&&(Ce<0||V!==mi[Ce]?U(mt,B,nn,2):Ce--)}}},U=(C,z,B,K,H=null)=>{const{el:F,type:re,transition:te,children:ee,shapeFlag:V}=C;if(V&6){U(C.component.subTree,z,B,K);return}if(V&128){C.suspense.move(z,B,K);return}if(V&64){re.move(C,z,B,Oe);return}if(re===It){i(F,z,B);for(let se=0;se<ee.length;se++)U(ee[se],z,B,K);i(C.anchor,z,B);return}if(re===Ds){I(C,z,B);return}if(K!==2&&V&1&&te)if(K===0)te.beforeEnter(F),i(F,z,B),gt(()=>te.enter(F),H);else{const{leave:se,delayLeave:ce,afterLeave:me}=te,be=()=>{C.ctx.isUnmounted?n(F):i(F,z,B)},Pe=()=>{F._isLeaving&&F[Qb](!0),se(F,()=>{be(),me&&me()})};ce?ce(F,be,Pe):Pe()}else i(F,z,B)},Y=(C,z,B,K=!1,H=!1)=>{const{type:F,props:re,ref:te,children:ee,dynamicChildren:V,shapeFlag:he,patchFlag:se,dirs:ce,cacheIndex:me}=C;if(se===-2&&(H=!1),te!=null&&(pr(),Wi(te,null,B,C,!0),fr()),me!=null&&(z.renderCache[me]=void 0),he&256){z.ctx.deactivate(C);return}const be=he&1&&ce,Pe=!qi(C);let Ce;if(Pe&&(Ce=re&&re.onVnodeBeforeUnmount)&&Gt(Ce,z,C),he&6)st(C.component,B,K);else{if(he&128){C.suspense.unmount(B,K);return}be&&Rr(C,null,z,"beforeUnmount"),he&64?C.type.remove(C,z,B,Oe,K):V&&!V.hasOnce&&(F!==It||se>0&&se&64)?Ze(V,z,B,!1,!0):(F===It&&se&384||!H&&he&16)&&Ze(ee,z,B),K&&pe(C)}(Pe&&(Ce=re&&re.onVnodeUnmounted)||be)&&gt(()=>{Ce&&Gt(Ce,z,C),be&&Rr(C,null,z,"unmounted")},B)},pe=C=>{const{type:z,el:B,anchor:K,transition:H}=C;if(z===It){ve(B,K);return}if(z===Ds){S(C);return}const F=()=>{n(B),H&&!H.persisted&&H.afterLeave&&H.afterLeave()};if(C.shapeFlag&1&&H&&!H.persisted){const{leave:re,delayLeave:te}=H,ee=()=>re(B,F);te?te(C.el,F,ee):ee()}else F()},ve=(C,z)=>{let B;for(;C!==z;)B=h(C),n(C),C=B;n(z)},st=(C,z,B)=>{const{bum:K,scope:H,job:F,subTree:re,um:te,m:ee,a:V}=C;ud(ee),ud(V),K&&Cs(K),H.stop(),F&&(F.flags|=8,Y(re,C,z,B)),te&&gt(te,z),gt(()=>{C.isUnmounted=!0},z)},Ze=(C,z,B,K=!1,H=!1,F=0)=>{for(let re=F;re<C.length;re++)Y(C[re],z,B,K,H)},tt=C=>{if(C.shapeFlag&6)return tt(C.component.subTree);if(C.shapeFlag&128)return C.suspense.next();const z=h(C.anchor||C.el),B=z&&z[jb];return B?h(B):z};let $t=!1;const Ge=(C,z,B)=>{let K;C==null?z._vnode&&(Y(z._vnode,null,null,!0),K=z._vnode.component):w(z._vnode||null,C,z,null,null,null,B),z._vnode=C,$t||($t=!0,Yl(K),Oh(),$t=!1)},Oe={p:w,um:Y,m:U,r:pe,mt:M,mc:x,pc:X,pbc:G,n:tt,o:e};return{render:Ge,hydrate:void 0,createApp:gv(Ge)}}function Ns({type:e,props:t},r){return r==="svg"&&e==="foreignObject"||r==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:r}function Mr({effect:e,job:t},r){r?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Ov(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function em(e,t,r=!1){const i=e.children,n=t.children;if(we(i)&&we(n))for(let s=0;s<i.length;s++){const a=i[s];let o=n[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=n[s]=or(n[s]),o.el=a.el),!r&&o.patchFlag!==-2&&em(a,o)),o.type===ss&&(o.patchFlag===-1&&(o=n[s]=or(o)),o.el=a.el),o.type===kr&&!o.el&&(o.el=a.el)}}function Rv(e){const t=e.slice(),r=[0];let i,n,s,a,o;const u=e.length;for(i=0;i<u;i++){const d=e[i];if(d!==0){if(n=r[r.length-1],e[n]<d){t[i]=n,r.push(i);continue}for(s=0,a=r.length-1;s<a;)o=s+a>>1,e[r[o]]<d?s=o+1:a=o;d<e[r[s]]&&(s>0&&(t[i]=r[s-1]),r[s]=i)}}for(s=r.length,a=r[s-1];s-- >0;)r[s]=a,a=t[a];return r}function tm(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:tm(t)}function ud(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function rm(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?rm(t.subTree):null}const im=e=>e.__isSuspense;function Mv(e,t){t&&t.pendingBranch?we(e)?t.effects.push(...e):t.effects.push(e):Wb(e)}const It=Symbol.for("v-fgt"),ss=Symbol.for("v-txt"),kr=Symbol.for("v-cmt"),Ds=Symbol.for("v-stc"),Hi=[];let bt=null;function jt(e=!1){Hi.push(bt=e?null:[])}function Bv(){Hi.pop(),bt=Hi[Hi.length-1]||null}let Qi=1;function ld(e,t=!1){Qi+=e,e<0&&bt&&t&&(bt.hasOnce=!0)}function nm(e){return e.dynamicChildren=Qi>0?bt||ai:null,Bv(),Qi>0&&bt&&bt.push(e),e}function ir(e,t,r,i,n,s){return nm(Me(e,t,r,i,n,s,!0))}function Nv(e,t,r,i,n){return nm(cr(e,t,r,i,n,!0))}function sm(e){return e?e.__v_isVNode===!0:!1}function bi(e,t){return e.type===t.type&&e.key===t.key}const am=({key:e})=>e??null,Rn=({ref:e,ref_key:t,ref_for:r})=>(typeof e=="number"&&(e=""+e),e!=null?Qe(e)||dt(e)||xe(e)?{i:Et,r:e,k:t,f:!!r}:e:null);function Me(e,t=null,r=null,i=0,n=null,s=e===It?0:1,a=!1,o=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&am(t),ref:t&&Rn(t),scopeId:Mh,slotScopeIds:null,children:r,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:n,dynamicChildren:null,appContext:null,ctx:Et};return o?(Oo(u,r),s&128&&e.normalize(u)):r&&(u.shapeFlag|=Qe(r)?8:16),Qi>0&&!a&&bt&&(u.patchFlag>0||s&6)&&u.patchFlag!==32&&bt.push(u),u}const cr=Dv;function Dv(e,t=null,r=null,i=0,n=null,s=!1){if((!e||e===uv)&&(e=kr),sm(e)){const o=ci(e,t,!0);return r&&Oo(o,r),Qi>0&&!s&&bt&&(o.shapeFlag&6?bt[bt.indexOf(e)]=o:bt.push(o)),o.patchFlag=-2,o}if(Qv(e)&&(e=e.__vccOpts),t){t=Pv(t);let{class:o,style:u}=t;o&&!Qe(o)&&(t.class=ar(o)),We(u)&&(Io(u)&&!we(u)&&(u=nt({},u)),t.style=yo(u))}const a=Qe(e)?1:im(e)?128:Kb(e)?64:We(e)?4:xe(e)?2:0;return Me(e,t,r,i,n,a,s,!0)}function Pv(e){return e?Io(e)||Kh(e)?nt({},e):e:null}function ci(e,t,r=!1,i=!1){const{props:n,ref:s,patchFlag:a,children:o,transition:u}=e,d=t?Lv(n||{},t):n,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&am(d),ref:t&&t.ref?r&&s?we(s)?s.concat(Rn(t)):[s,Rn(t)]:Rn(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==It?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ci(e.ssContent),ssFallback:e.ssFallback&&ci(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&i&&ko(c,u.clone(c)),c}function ja(e=" ",t=0){return cr(ss,null,e,t)}function Uv(e="",t=!1){return t?(jt(),Nv(kr,null,e)):cr(kr,null,e)}function Qt(e){return e==null||typeof e=="boolean"?cr(kr):we(e)?cr(It,null,e.slice()):sm(e)?or(e):cr(ss,null,String(e))}function or(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ci(e)}function Oo(e,t){let r=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(we(t))r=16;else if(typeof t=="object")if(i&65){const n=t.default;n&&(n._c&&(n._d=!1),Oo(e,n()),n._c&&(n._d=!0));return}else{r=32;const n=t._;!n&&!Kh(t)?t._ctx=Et:n===3&&Et&&(Et.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else xe(t)?(t={default:t,_ctx:Et},r=32):(t=String(t),i&64?(r=16,t=[ja(t)]):r=8);e.children=t,e.shapeFlag|=r}function Lv(...e){const t={};for(let r=0;r<e.length;r++){const i=e[r];for(const n in i)if(n==="class")t.class!==i.class&&(t.class=ar([t.class,i.class]));else if(n==="style")t.style=yo([t.style,i.style]);else if(Xn(n)){const s=t[n],a=i[n];a&&s!==a&&!(we(s)&&s.includes(a))&&(t[n]=s?[].concat(s,a):a)}else n!==""&&(t[n]=i[n])}return t}function Gt(e,t,r,i=null){Xt(e,t,7,[r,i])}const Wv=Vh();let qv=0;function Vv(e,t,r){const i=e.type,n=(t?t.appContext:e.appContext)||Wv,s={uid:qv++,vnode:e,type:i,parent:t,appContext:n,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new lb(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(n.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zh(i,n),emitsOptions:Hh(i,n),emit:null,emitted:null,propsDefaults:Ve,inheritAttrs:i.inheritAttrs,ctx:Ve,data:Ve,props:Ve,attrs:Ve,slots:Ve,refs:Ve,setupState:Ve,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=_v.bind(null,s),e.ce&&e.ce(s),s}let ht=null;const Hv=()=>ht||Et;let qn,Ka;{const e=es(),t=(r,i)=>{let n;return(n=e[r])||(n=e[r]=[]),n.push(i),s=>{n.length>1?n.forEach(a=>a(s)):n[0](s)}};qn=t("__VUE_INSTANCE_SETTERS__",r=>ht=r),Ka=t("__VUE_SSR_SETTERS__",r=>Zi=r)}const tn=e=>{const t=ht;return qn(e),e.scope.on(),()=>{e.scope.off(),qn(t)}},dd=()=>{ht&&ht.scope.off(),qn(null)};function om(e){return e.vnode.shapeFlag&4}let Zi=!1;function Gv(e,t=!1,r=!1){t&&Ka(t);const{props:i,children:n}=e.vnode,s=om(e);Sv(e,i,s,t),kv(e,n,r||t);const a=s?Fv(e,t):void 0;return t&&Ka(!1),a}function Fv(e,t){const r=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,lv);const{setup:i}=r;if(i){pr();const n=e.setupContext=i.length>1?Kv(e):null,s=tn(e),a=en(i,e,0,[e.props,n]),o=ah(a);if(fr(),s(),(o||e.sp)&&!qi(e)&&Dh(e),o){if(a.then(dd,dd),t)return a.then(u=>{cd(e,u)}).catch(u=>{rs(u,e,0)});e.asyncDep=a}else cd(e,a)}else um(e)}function cd(e,t,r){xe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:We(t)&&(e.setupState=kh(t)),um(e)}function um(e,t,r){const i=e.type;e.render||(e.render=i.render||Zt);{const n=tn(e);pr();try{dv(e)}finally{fr(),n()}}}const jv={get(e,t){return lt(e,"get",""),e[t]}};function Kv(e){const t=r=>{e.exposed=r||{}};return{attrs:new Proxy(e.attrs,jv),slots:e.slots,emit:e.emit,expose:t}}function as(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(kh(zb(e.exposed)),{get(t,r){if(r in t)return t[r];if(r in Vi)return Vi[r](e)},has(t,r){return r in t||r in Vi}})):e.proxy}function Qv(e){return xe(e)&&"__vccOpts"in e}const Zv=(e,t)=>Nb(e,t,Zi),Yv="3.5.28";let Qa;const pd=typeof window<"u"&&window.trustedTypes;if(pd)try{Qa=pd.createPolicy("vue",{createHTML:e=>e})}catch{}const lm=Qa?e=>Qa.createHTML(e):e=>e,Xv="http://www.w3.org/2000/svg",Jv="http://www.w3.org/1998/Math/MathML",sr=typeof document<"u"?document:null,fd=sr&&sr.createElement("template"),e$={insert:(e,t,r)=>{t.insertBefore(e,r||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,r,i)=>{const n=t==="svg"?sr.createElementNS(Xv,e):t==="mathml"?sr.createElementNS(Jv,e):r?sr.createElement(e,{is:r}):sr.createElement(e);return e==="select"&&i&&i.multiple!=null&&n.setAttribute("multiple",i.multiple),n},createText:e=>sr.createTextNode(e),createComment:e=>sr.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>sr.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,r,i,n,s){const a=r?r.previousSibling:t.lastChild;if(n&&(n===s||n.nextSibling))for(;t.insertBefore(n.cloneNode(!0),r),!(n===s||!(n=n.nextSibling)););else{fd.innerHTML=lm(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const o=fd.content;if(i==="svg"||i==="mathml"){const u=o.firstChild;for(;u.firstChild;)o.appendChild(u.firstChild);o.removeChild(u)}t.insertBefore(o,r)}return[a?a.nextSibling:t.firstChild,r?r.previousSibling:t.lastChild]}},t$=Symbol("_vtc");function r$(e,t,r){const i=e[t$];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):r?e.setAttribute("class",t):e.className=t}const Vn=Symbol("_vod"),dm=Symbol("_vsh"),hd={name:"show",beforeMount(e,{value:t},{transition:r}){e[Vn]=e.style.display==="none"?"":e.style.display,r&&t?r.beforeEnter(e):vi(e,t)},mounted(e,{value:t},{transition:r}){r&&t&&r.enter(e)},updated(e,{value:t,oldValue:r},{transition:i}){!t!=!r&&(i?t?(i.beforeEnter(e),vi(e,!0),i.enter(e)):i.leave(e,()=>{vi(e,!1)}):vi(e,t))},beforeUnmount(e,{value:t}){vi(e,t)}};function vi(e,t){e.style.display=t?e[Vn]:"none",e[dm]=!t}const i$=Symbol(""),n$=/(?:^|;)\s*display\s*:/;function s$(e,t,r){const i=e.style,n=Qe(r);let s=!1;if(r&&!n){if(t)if(Qe(t))for(const a of t.split(";")){const o=a.slice(0,a.indexOf(":")).trim();r[o]==null&&Mn(i,o,"")}else for(const a in t)r[a]==null&&Mn(i,a,"");for(const a in r)a==="display"&&(s=!0),Mn(i,a,r[a])}else if(n){if(t!==r){const a=i[i$];a&&(r+=";"+a),i.cssText=r,s=n$.test(r)}}else t&&e.removeAttribute("style");Vn in e&&(e[Vn]=s?i.display:"",e[dm]&&(i.display="none"))}const md=/\s*!important$/;function Mn(e,t,r){if(we(r))r.forEach(i=>Mn(e,t,i));else if(r==null&&(r=""),t.startsWith("--"))e.setProperty(t,r);else{const i=a$(e,t);md.test(r)?e.setProperty(Yr(i),r.replace(md,""),"important"):e[i]=r}}const gd=["Webkit","Moz","ms"],Ps={};function a$(e,t){const r=Ps[t];if(r)return r;let i=Er(t);if(i!=="filter"&&i in e)return Ps[t]=i;i=lh(i);for(let n=0;n<gd.length;n++){const s=gd[n]+i;if(s in e)return Ps[t]=s}return t}const yd="http://www.w3.org/1999/xlink";function _d(e,t,r,i,n,s=ob(t)){i&&t.startsWith("xlink:")?r==null?e.removeAttributeNS(yd,t.slice(6,t.length)):e.setAttributeNS(yd,t,r):r==null||s&&!ch(r)?e.removeAttribute(t):e.setAttribute(t,s?"":Yt(r)?String(r):r)}function wd(e,t,r,i,n){if(t==="innerHTML"||t==="textContent"){r!=null&&(e[t]=t==="innerHTML"?lm(r):r);return}const s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?e.getAttribute("value")||"":e.value,u=r==null?e.type==="checkbox"?"on":"":String(r);(o!==u||!("_value"in e))&&(e.value=u),r==null&&e.removeAttribute(t),e._value=r;return}let a=!1;if(r===""||r==null){const o=typeof e[t];o==="boolean"?r=ch(r):r==null&&o==="string"?(r="",a=!0):o==="number"&&(r=0,a=!0)}try{e[t]=r}catch{}a&&e.removeAttribute(n||t)}function o$(e,t,r,i){e.addEventListener(t,r,i)}function u$(e,t,r,i){e.removeEventListener(t,r,i)}const bd=Symbol("_vei");function l$(e,t,r,i,n=null){const s=e[bd]||(e[bd]={}),a=s[t];if(i&&a)a.value=i;else{const[o,u]=d$(t);if(i){const d=s[t]=f$(i,n);o$(e,o,d,u)}else a&&(u$(e,o,a,u),s[t]=void 0)}}const vd=/(?:Once|Passive|Capture)$/;function d$(e){let t;if(vd.test(e)){t={};let i;for(;i=e.match(vd);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Yr(e.slice(2)),t]}let Us=0;const c$=Promise.resolve(),p$=()=>Us||(c$.then(()=>Us=0),Us=Date.now());function f$(e,t){const r=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=r.attached)return;Xt(h$(i,r.value),t,5,[i])};return r.value=e,r.attached=p$(),r}function h$(e,t){if(we(t)){const r=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{r.call(e),e._stopped=!0},t.map(i=>n=>!n._stopped&&i&&i(n))}else return t}const $d=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,m$=(e,t,r,i,n,s)=>{const a=n==="svg";t==="class"?r$(e,i,a):t==="style"?s$(e,r,i):Xn(t)?ho(t)||l$(e,t,r,i,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):g$(e,t,i,a))?(wd(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&_d(e,t,i,a,s,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!Qe(i))?wd(e,Er(t),i,s,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),_d(e,t,i,a))};function g$(e,t,r,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&$d(t)&&xe(r));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const n=e.tagName;if(n==="IMG"||n==="VIDEO"||n==="CANVAS"||n==="SOURCE")return!1}return $d(t)&&Qe(r)?!1:t in e}const y$=["ctrl","shift","alt","meta"],_$={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>y$.some(r=>e[`${r}Key`]&&!t.includes(r))},Ls=(e,t)=>{if(!e)return e;const r=e._withMods||(e._withMods={}),i=t.join(".");return r[i]||(r[i]=((n,...s)=>{for(let a=0;a<t.length;a++){const o=_$[t[a]];if(o&&o(n,t))return}return e(n,...s)}))},w$=nt({patchProp:m$},e$);let xd;function b$(){return xd||(xd=zv(w$))}const v$=((...e)=>{const t=b$().createApp(...e),{mount:r}=t;return t.mount=i=>{const n=x$(i);if(!n)return;const s=t._component;!xe(s)&&!s.render&&!s.template&&(s.template=n.innerHTML),n.nodeType===1&&(n.textContent="");const a=r(n,!1,$$(n));return n instanceof Element&&(n.removeAttribute("v-cloak"),n.setAttribute("data-v-app","")),a},t});function $$(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function x$(e){return Qe(e)?document.querySelector(e):e}class S${constructor(t){this.dictionary=[],this.offscreenCanvas=null,this.offscreenCtx=null,this.floatDataBuffer=null,this.topK=t.topK||10}dispose(){this.dictionary=[],this.offscreenCanvas=null,this.offscreenCtx=null,this.floatDataBuffer=null}async loadDictFromContent(t,r){if(t.includes("<html")||t.includes("<!DOCTYPE"))throw console.error(`字典内容非法 (HTML): ${r}`,t.substring(0,200)),new Error(`字典加载失败：路径 "${r}" 返回了 HTML 页面而非文本。请检查路径配置是否指向了正确的 .txt 文件。`);this.dictionary=["",...t.split(/\r?\n/)]}getPreprocessingCanvas(t,r){const i=this.getBoundingBox(t,r),n=48,s=128;if(r?.aborted)throw new Error("Aborted");this.offscreenCanvas||(this.offscreenCanvas=document.createElement("canvas"),this.offscreenCanvas.width=s,this.offscreenCanvas.height=n,this.offscreenCtx=this.offscreenCanvas.getContext("2d"));const a=this.offscreenCtx;if(a.fillStyle="rgb(128, 128, 128)",a.fillRect(0,0,s,n),i){const h=n-12,y=h/i.h,_=i.w*y,w=h,T=(s-_)/2;a.drawImage(t,i.x,i.y,i.w,i.h,T,6,_,w)}if(r?.aborted)throw new Error("Aborted");const o=a.getImageData(0,0,s,n),{data:u}=o,d=3*n*s;(!this.floatDataBuffer||this.floatDataBuffer.length!==d)&&(this.floatDataBuffer=new Float32Array(d));const c=this.floatDataBuffer;for(let f=0;f<n*s;f++){const h=u[f*4]/255,y=u[f*4+1]/255,_=u[f*4+2]/255;c[f]=(_-.5)/.5,c[n*s+f]=(y-.5)/.5,c[2*n*s+f]=(h-.5)/.5}return{data:c,width:s,height:n}}getBoundingBox(t,r){const i=t.getContext("2d",{willReadFrequently:!0}),n=t.width,s=t.height,o=i.getImageData(0,0,n,s).data;let u=n,d=s,c=0,f=0,h=!1;const y=4;for(let _=0;_<s;_+=y){if(_%(y*5)===0&&r?.aborted)throw new Error("Aborted");for(let w=0;w<n;w+=y)o[(_*n+w)*4+3]>0&&(w<u&&(u=w),w>c&&(c=w),_<d&&(d=_),_>f&&(f=_),h=!0)}return h?{x:u,y:d,w:c-u+1,h:f-d+1}:null}postProcess(t,r){const[i,n,s]=r;let a=-1,o=-1;for(let f=0;f<n;f++){const y=1-t[f*s+0];y>o&&(o=y,a=f)}if(a===-1||o<.001)return{candidates:[]};const u=a*s,d=[],c=1e-4*o;for(let f=1;f<s;f++){const h=t[u+f];h>c&&d.push({index:f,prob:h})}return d.sort((f,h)=>h.prob-f.prob),{candidates:d.slice(0,this.topK).map(f=>({character:this.dictionary[f.index]||"?",score:f.prob/o}))}}}var Ro=Object.defineProperty,T$=Object.getOwnPropertyDescriptor,I$=Object.getOwnPropertyNames,E$=Object.prototype.hasOwnProperty,k$=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(e&&(t=e(e=0)),t),hi=(e,t)=>{for(var r in t)Ro(e,r,{get:t[r],enumerable:!0})},C$=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of I$(t))!E$.call(e,n)&&n!==r&&Ro(e,n,{get:()=>t[n],enumerable:!(i=T$(t,n))||i.enumerable});return e},Yi=e=>C$(Ro({},"__esModule",{value:!0}),e),$i,vr,ni,Sd,cm,pm=Q(()=>{$i=new Map,vr=[],ni=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=$i.get(e);if(i===void 0)$i.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=vr.indexOf(e);n!==-1&&vr.splice(n,1);for(let s=0;s<vr.length;s++)if($i.get(vr[s]).priority<=r){vr.splice(s,0,e);return}vr.push(e)}return}throw new TypeError("not a valid backend")},Sd=async e=>{let t=$i.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},cm=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?vr:r,n,s=[],a=new Set;for(let u of i){let d=await Sd(u);typeof d=="string"?s.push({name:u,err:d}):(n||(n=d),n===d&&a.add(u))}if(!n)throw new Error(`no available backend found. ERR: ${s.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of s)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let o=t.filter(u=>a.has(typeof u=="string"?u:u.name));return[n,new Proxy(e,{get:(u,d)=>d==="executionProviders"?o:Reflect.get(u,d)})]}}),z$=Q(()=>{pm()}),fm,A$=Q(()=>{fm="1.24.1"}),Ws,Je,hm=Q(()=>{A$(),Ws="warning",Je={wasm:{},webgl:{},webgpu:{},versions:{common:fm},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ws=e}},get logLevel(){return Ws}},Object.defineProperty(Je,"logLevel",{enumerable:!0})}),Ue,O$=Q(()=>{hm(),Ue=Je}),mm,gm,R$=Q(()=>{mm=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,d;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=s*n,f=0,h=c,y=c*2,_=-1;a==="RGBA"?(f=0,h=c,y=c*2,_=c*3):a==="RGB"?(f=0,h=c,y=c*2):a==="RBG"&&(f=0,y=c,h=c*2);for(let w=0;w<s;w++)for(let T=0;T<n;T++){let v=(e.data[f++]-d[0])*u[0],b=(e.data[h++]-d[1])*u[1],I=(e.data[y++]-d[2])*u[2],S=_===-1?255:(e.data[_++]-d[3])*u[3];i.fillStyle="rgba("+v+","+b+","+I+","+S+")",i.fillRect(T,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gm=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,s,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[1],a=e.dims[3]):(n=e.dims[3],s=e.dims[2],a=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let f=s*n;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,y=0,_=1,w=2,T=3,v=0,b=f,I=f*2,S=-1;o==="RGBA"?(v=0,b=f,I=f*2,S=f*3):o==="RGB"?(v=0,b=f,I=f*2):o==="RBG"&&(v=0,I=f,b=f*2),i=r.createImageData(n,s);for(let k=0;k<s*n;y+=h,_+=h,w+=h,T+=h,k++)i.data[y]=(e.data[v++]-c[0])*d[0],i.data[_]=(e.data[b++]-c[1])*d[1],i.data[w]=(e.data[I++]-c[2])*d[2],i.data[T]=S===-1?255:(e.data[S++]-c[3])*d[3]}else throw new Error("Can not access image data");return i}}),_n,ym,_m,wm,bm,vm,M$=Q(()=>{Mo(),_n=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},s,a;typeof n.mean=="number"?s=[n.mean,n.mean,n.mean,n.mean]:s=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?a=[n.bias,n.bias,n.bias,n.bias]:a=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,c=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,h=0,y=1,_=2,w=3,T=0,v=d,b=d*2,I=-1;o==="RGB"&&(f=3,h=0,y=1,_=2,w=-1),u==="RGBA"?I=d*3:u==="RBG"?(T=0,b=d,v=d*2):u==="BGR"&&(b=0,v=d,T=d*2);for(let S=0;S<d;S++,h+=f,_+=f,y+=f,w+=f)c[T++]=(e[h]+a[0])/s[0],c[v++]=(e[y]+a[1])/s[1],c[b++]=(e[_]+a[2])/s[2],I!==-1&&w!==-1&&(c[I++]=(e[w]+a[3])/s[3]);return u==="RGBA"?new wt("float32",c,[1,4,r,i]):new wt("float32",c,[1,3,r,i])},ym=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",a,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let h=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=y}else o.tensorFormat="RGBA",o.height=h,o.width=y;f.drawImage(e,0,0),a=f.getImageData(0,0,y,h).data}else throw new Error("Can not access image data")}else if(i){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=f,t!==void 0){let h=u();h.width=f,h.height=c;let y=d(h);if(y!=null)y.putImageData(e,0,0),a=y.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else a=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let h=e.height,y=e.width;return f.drawImage(e,0,0,y,h),a=f.getImageData(0,0,y,h).data,o.height=h,o.width=y,_n(a,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((c,f)=>{let h=u(),y=d(h);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{h.width=_.width,h.height=_.height,y.drawImage(_,0,0,h.width,h.height);let w=y.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,c(_n(w.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return _n(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},_m=(e,t)=>{let{width:r,height:i,download:n,dispose:s}=t,a=[1,i,r,4];return new wt({location:"texture",type:"float32",texture:e,dims:a,download:n,dispose:s})},wm=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new wt({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:s})},bm=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new wt({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:s})},vm=(e,t,r)=>new wt({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Wr,Mi,qs,$m,B$=Q(()=>{Wr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Mi=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),qs=!1,$m=()=>{if(!qs){qs=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Wr.set("int64",BigInt64Array),Mi.set(BigInt64Array,"int64")),t&&(Wr.set("uint64",BigUint64Array),Mi.set(BigUint64Array,"uint64")),i?(Wr.set("float16",r),Mi.set(r,"float16")):Wr.set("float16",Uint16Array)}}}),xm,Sm,N$=Q(()=>{Mo(),xm=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Sm=(e,t)=>{switch(e.location){case"cpu":return new wt(e.type,e.data,t);case"cpu-pinned":return new wt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new wt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new wt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new wt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),wt,Mo=Q(()=>{R$(),M$(),B$(),N$(),wt=class{constructor(e,t,r){$m();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let a=Wr.get(i);if(!a)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let u=Wr.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?a=u.from(t,BigInt):a=u.from(t)}else if(t instanceof u)a=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",a=e;else if(u==="boolean")i="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",a=Uint8Array.from(e);else{let u=Mi.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=a,this.dataLocation="cpu"}let s=xm(n);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=s}static async fromImage(e,t){return ym(e,t)}static fromTexture(e,t){return _m(e,t)}static fromGpuBuffer(e,t){return wm(e,t)}static fromMLTensor(e,t){return bm(e,t)}static fromPinnedBuffer(e,t,r){return vm(e,t,r)}toDataURL(e){return mm(this,e)}toImageData(e){return gm(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Sm(this,e)}}}),Pt,Tm=Q(()=>{Mo(),Pt=wt}),Hn,Vs,Jt,Lt,Fr,jr,Im=Q(()=>{hm(),Hn=(e,t)=>{(typeof Je.trace>"u"?!Je.wasm.trace:!Je.trace)||console.timeStamp(`${e}::ORT::${t}`)},Vs=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Hn("CPU",s);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},Jt=e=>{(typeof Je.trace>"u"?!Je.wasm.trace:!Je.trace)||Vs("BEGIN",e)},Lt=e=>{(typeof Je.trace>"u"?!Je.wasm.trace:!Je.trace)||Vs("END",e)},Fr=e=>{(typeof Je.trace>"u"?!Je.wasm.trace:!Je.trace)||console.time(`ORT::${e}`)},jr=e=>{(typeof Je.trace>"u"?!Je.wasm.trace:!Je.trace)||console.timeEnd(`ORT::${e}`)}}),Em,D$=Q(()=>{pm(),Tm(),Im(),Em=class km{constructor(t){this.handler=t}async run(t,r,i){Jt(),Fr("InferenceSession.run");let n={},s={};if(typeof t!="object"||t===null||t instanceof Pt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Pt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let h=r[f];(h===null||h instanceof Pt)&&(d=!0,a=!1,n[f]=h)}if(d){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(a)for(let d of this.outputNames)n[d]=null;let o=await this.handler.run(t,n,s),u={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let c=o[d];c instanceof Pt?u[d]=c:u[d]=new Pt(c.type,c.data,c.dims)}return jr("InferenceSession.run"),Lt(),u}async release(){return this.handler.dispose()}static async create(t,r,i,n){Jt(),Fr("InferenceSession.create");let s,a={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(h=t.byteLength-f,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(c,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await cm(a),d=await o.createInferenceSessionHandler(s,u);return jr("InferenceSession.create"),Lt(),new km(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Bo,P$=Q(()=>{D$(),Bo=Em}),U$=Q(()=>{}),L$=Q(()=>{}),W$=Q(()=>{}),q$=Q(()=>{}),V$={};hi(V$,{InferenceSession:()=>Bo,TRACE:()=>Hn,TRACE_EVENT_BEGIN:()=>Fr,TRACE_EVENT_END:()=>jr,TRACE_FUNC_BEGIN:()=>Jt,TRACE_FUNC_END:()=>Lt,Tensor:()=>Pt,env:()=>Ue,registerBackend:()=>ni});var Ct=Q(()=>{z$(),O$(),P$(),Tm(),U$(),L$(),Im(),W$(),q$()}),No=Q(()=>{}),Cm={};hi(Cm,{default:()=>zm});var Hs,Gs,zm,H$=Q(()=>{B0(),Xr(),Do(),Hs="ort-wasm-proxy-worker",Gs=globalThis.self?.name===Hs,Gs&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Po(r.wasm).then(()=>{tu(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;ru(n,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,n=Yn(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;iu(i,n).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":nu(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:s,outputIndices:a,options:o}=r;su(i,n,s,a,new Array(a.length).fill(null),o).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},ou([...s,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":au(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),zm=Gs?null:e=>new Worker(e??_t,{type:"module",name:Hs})}),Am={};hi(Am,{default:()=>Om});async function Td(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(l,p)=>{l.startsWith("./")&&(l=l.substring(2)),(t.Zc||(t.Zc=new Map)).set(l,p)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let s=l=>async(...p)=>{try{if(t.$c)throw Error("Session already started");let g=t.$c={Nd:p[0],errors:[]},m=await l(...p);if(t.$c!==g)throw Error("Session mismatch");t.gd?.flush();let $=g.errors;if(0<$.length){let E=await Promise.all($);if(E=E.filter(A=>A),0<E.length)throw Error(E.join(`
`))}return m}finally{t.$c=null}};t.jsepInit=(l,p)=>{if(l==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=p;let g=t.gd;t.jsepRegisterBuffer=(m,$,E,A)=>g.registerBuffer(m,$,E,A),t.jsepGetBuffer=m=>g.getBuffer(m),t.jsepCreateDownloader=(m,$,E)=>g.createDownloader(m,$,E),t.jsepOnCreateSession=m=>{g.onCreateSession(m)},t.jsepOnReleaseSession=m=>{g.onReleaseSession(m)},t.jsepOnRunStart=m=>g.onRunStart(m),t.Ld=(m,$)=>{g.upload(m,$)}}else if(l==="webnn"){let g=p[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=m=>g.onRunStart(m),t.webnnOnRunEnd=g.onRunEnd.bind(g),t.webnnOnReleaseSession=m=>{g.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,$)=>g.createMLTensorDownloader(m,$),t.webnnRegisterMLTensor=(m,$,E,A)=>g.registerMLTensor(m,$,E,A),t.webnnCreateMLContext=m=>g.createMLContext(m),t.webnnRegisterMLConstant=(m,$,E,A,D,J)=>g.registerMLConstant(m,$,E,A,D,t.Zc,J),t.webnnRegisterGraphInput=g.registerGraphInput.bind(g),t.webnnIsGraphInput=g.isGraphInput.bind(g),t.webnnRegisterGraphOutput=g.registerGraphOutput.bind(g),t.webnnIsGraphOutput=g.isGraphOutput.bind(g),t.webnnCreateTemporaryTensor=g.createTemporaryTensor.bind(g),t.webnnIsGraphInputOutputTypeSupported=g.isGraphInputOutputTypeSupported.bind(g)}};let a=()=>{let l=p=>(...g)=>{let m=Vt;return g=p(...g),Vt!=m?new Promise(($,E)=>{ms={resolve:$,reject:E}}):g};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=l(t[p])})(),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),a=void 0};t.asyncInit=()=>{a?.()};var o,u,d=(l,p)=>{throw p},c=import.meta.url,f="";if(r||i){try{f=new URL(".",c).href}catch{}i&&(u=l=>{var p=new XMLHttpRequest;return p.open("GET",l,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),o=async l=>{if(O(l))return new Promise((g,m)=>{var $=new XMLHttpRequest;$.open("GET",l,!0),$.responseType="arraybuffer",$.onload=()=>{$.status==200||$.status==0&&$.response?g($.response):m($.status)},$.onerror=m,$.send(null)});var p=await fetch(l,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var h,y,_,w,T,v,b=console.log.bind(console),I=console.error.bind(console),S=b,k=I,R=!1,O=l=>l.startsWith("file://");function x(){be.buffer!=G.buffer&&Y()}if(n){let l=function(p){try{var g=p.data,m=g.Uc;if(m==="load"){let $=[];self.onmessage=E=>$.push(E),v=()=>{postMessage({Uc:"loaded"});for(let E of $)l(E);self.onmessage=l};for(let E of g.Ad)t[E]&&!t[E].proxy||(t[E]=(...A)=>{postMessage({Uc:"callHandler",zd:E,args:A})},E=="print"&&(S=t[E]),E=="printErr"&&(k=t[E]));be=g.Vd,Y(),y=g.Wd,Ze(),hn()}else if(m==="run"){(function($){var E=(x(),L)[$+52>>>2>>>0];$=(x(),L)[$+56>>>2>>>0],rl(E,E-$),$e(E)})(g.Tc),bs(g.Tc,0,0,1,0,0),se(),ps(g.Tc),q||(Zu(),q=!0);try{Pe(g.Pd,g.dd)}catch($){if($!="unwind")throw $}}else g.target!=="setimmediate"&&(m==="checkMailbox"?q&&on():m&&(k(`worker: received unknown command ${m}`),k(g)))}catch($){throw Yu(),$}};var q=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=l}var G,oe,W,j,M,L,Z,ie,X,le,Se,U=!1;function Y(){var l=be.buffer;t.HEAP8=G=new Int8Array(l),W=new Int16Array(l),t.HEAPU8=oe=new Uint8Array(l),j=new Uint16Array(l),t.HEAP32=M=new Int32Array(l),t.HEAPU32=L=new Uint32Array(l),Z=new Float32Array(l),ie=new Float64Array(l),X=new BigInt64Array(l),le=new BigUint64Array(l)}function pe(){U=!0,n?v():tr.tb()}function ve(l){throw k(l="Aborted("+l+")"),R=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),T?.(l),l}function st(){return{a:{ma:cw,hb:dw,g:ot,J:xt,f:rn,o:nn,h:j0,ha:K0,b:Q0,T:Z0,Ia:lu,n:Y0,_:fu,Ya:hu,Ea:mu,Ga:gu,Za:yu,Wa:_u,Pa:wu,Va:bu,ka:vu,Fa:$u,Ca:xu,Xa:Su,Da:Tu,cb:X0,ea:J0,xa:e_,va:r_,da:n_,O:s_,H:a_,wa:o_,Z:h_,ya:m_,Sa:g_,Aa:__,Ja:w_,ta:b_,fa:v_,Ra:ps,$a:$_,R:I_,s:A_,c:ds,ib:O_,y:R_,M:M_,D:B_,m:N_,t:Ru,jb:D_,I:P_,S:U_,j:L_,v:W_,r:q_,l:V_,Ma:H_,Na:G_,Oa:F_,Ka:Du,La:Pu,ua:Uu,eb:K_,bb:Z_,u:Y_,aa:X_,ga:J_,ab:Q_,V:ew,_a:tw,Ba:rw,F:j_,U:iw,la:pn,za:sw,gb:nw,fb:aw,Ta:Vu,Ua:Hu,Ha:F,$:Gu,ja:Fu,Qa:ju,ia:Ku,lb:Kw,na:Ww,mb:jw,oa:Lw,G:Aw,d:mw,q:fw,w:pw,B:Tw,pb:Dw,K:kw,x:yw,pa:Pw,X:qw,ba:Nw,nb:Fw,ob:Gw,ra:Ow,qa:Bw,qb:Rw,N:Cw,Y:Uw,e:gw,A:_w,k:hw,kb:Qw,p:bw,z:vw,C:ww,E:$w,L:Iw,rb:zw,Q:Vw,ca:Ew,W:Hw,sb:Sw,sa:xw,P:Mw,i:uw,a:be,db:K}}}async function Ze(){function l(m,$){var E=tr=m.exports;m={};for(let[A,D]of Object.entries(E))typeof D=="function"?(E=x_(D),m[A]=E):m[A]=D;return tr=m,tr=(function(){var A=tr,D=ne=>_e=>ne(_e)>>>0,J=ne=>()=>ne()>>>0;return(A=Object.assign({},A)).ub=D(A.ub),A.Yb=J(A.Yb),A._b=D(A._b),A.mc=D(A.mc),A.nc=J(A.nc),A.rc=D(A.rc),A})(),ee.push(tr.$b),Qu=(m=tr).ub,Zu=m.vb,t._OrtInit=m.wb,t._OrtGetLastError=m.xb,t._OrtCreateSessionOptions=m.yb,t._OrtAppendExecutionProvider=m.zb,t._OrtAddFreeDimensionOverride=m.Ab,t._OrtAddSessionConfigEntry=m.Bb,t._OrtReleaseSessionOptions=m.Cb,t._OrtCreateSession=m.Db,t._OrtReleaseSession=m.Eb,t._OrtGetInputOutputCount=m.Fb,t._OrtGetInputOutputMetadata=m.Gb,t._OrtFree=m.Hb,t._OrtCreateTensor=m.Ib,t._OrtGetTensorData=m.Jb,t._OrtReleaseTensor=m.Kb,t._OrtCreateRunOptions=m.Lb,t._OrtAddRunConfigEntry=m.Mb,t._OrtReleaseRunOptions=m.Nb,t._OrtCreateBinding=m.Ob,t._OrtBindInput=m.Pb,t._OrtBindOutput=m.Qb,t._OrtClearBoundOutputs=m.Rb,t._OrtReleaseBinding=m.Sb,t._OrtRunWithBinding=m.Tb,t._OrtRun=m.Ub,t._OrtEndProfiling=m.Vb,t._JsepOutput=m.Wb,t._JsepGetNodeName=m.Xb,fn=m.Yb,Ht=t._free=m.Zb,yi=t._malloc=m._b,bs=m.bc,Yu=m.cc,Xu=m.dc,Ju=m.ec,vs=m.fc,el=m.gc,tl=m.hc,Ie=m.ic,_i=m.jc,rl=m.kc,$e=m.lc,$s=m.mc,Te=m.nc,il=m.oc,xs=m.pc,nl=m.qc,sl=m.rc,al=m.sc,Ss=m.tc,ol=m.uc,ul=m.vc,ll=m.wc,dl=m.xc,cl=m.yc,pl=m.zc,fl=m.Ac,hl=m.Bc,ml=m.Cc,gl=m.Dc,yl=m.Ec,_l=m.Fc,wl=m.Gc,bl=m.Hc,vl=m.Ic,$l=m.Jc,xl=m.Kc,Sl=m.Lc,Tl=m.Mc,Il=m.Nc,El=m.Oc,kl=m.Pc,Cl=m.Rc,zl=m.Sc,Al=m.bd,Ol=m.cd,Rl=m.hd,Ml=m.kd,Bl=m.ld,Nl=m.md,Dl=m.nd,Pl=m.od,Ul=m.pd,Ll=m.qd,Wl=m.rd,ql=m.wd,Vl=m.Rd,Hl=m.Sd,Gl=m.Td,Fl=m.Ud,y=$,tr}var p,g=st();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(g,($,E)=>{m(l($,E))})}):n?l(new WebAssembly.Instance(y,st()),y):(Se??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href,import.meta.url).href,p=await(async function(m){var $=Se;if(!h&&!O($))try{var E=fetch($,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,m)}catch(A){k(`wasm streaming compile failed: ${A}`),k("falling back to ArrayBuffer instantiation")}return(async function(A,D){try{var J=await(async function(ne){if(!h)try{var _e=await o(ne);return new Uint8Array(_e)}catch{}if(ne==Se&&h)ne=new Uint8Array(h);else{if(!u)throw"both async and sync fetching of the wasm failed";ne=u(ne)}return ne})(A);return await WebAssembly.instantiate(J,D)}catch(ne){k(`failed to asynchronously prepare wasm: ${ne}`),ve(ne)}})($,m)})(g),l(p.instance,p.module))}class tt{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var $t=l=>{l.terminate(),l.onmessage=()=>{}},Ge=[],Oe=0,at=null,C=l=>{re.length==0&&(me(),ce(re[0]));var p=re.pop();if(!p)return 6;te.push(p),V[l.Tc]=p,p.Tc=l.Tc;var g={Uc:"run",Pd:l.Od,dd:l.dd,Tc:l.Tc};return p.postMessage(g,l.ud),0},z=0,B=(l,p,...g)=>{var m,$=16*g.length,E=Te(),A=$s($),D=A>>>3;for(m of g)typeof m=="bigint"?((x(),X)[D++>>>0]=1n,(x(),X)[D++>>>0]=m):((x(),X)[D++>>>0]=0n,(x(),ie)[D++>>>0]=m);return l=Xu(l,0,$,A,p),$e(E),l};function K(l){if(n)return B(0,1,l);if(_=l,!(0<z)){for(var p of te)$t(p);for(p of re)$t(p);re=[],te=[],V={},R=!0}d(0,new tt(l))}function H(l){if(n)return B(1,0,l);F(l)}var F=l=>{if(_=l,n)throw H(l),"unwind";K(l)},re=[],te=[],ee=[],V={},he=l=>{var p=l.Tc;delete V[p],re.push(l),te.splice(te.indexOf(l),1),l.Tc=0,Ju(p)};function se(){ee.forEach(l=>l())}var ce=l=>new Promise(p=>{l.onmessage=$=>{var E=$.data;if($=E.Uc,E.ad&&E.ad!=fn()){var A=V[E.ad];A?A.postMessage(E,E.ud):k(`Internal error! Worker sent a message "${$}" to target pthread ${E.ad}, but that thread no longer exists!`)}else $==="checkMailbox"?on():$==="spawnThread"?C(E):$==="cleanupThread"?an(()=>{he(V[E.Qd])}):$==="loaded"?(l.loaded=!0,p(l)):E.target==="setimmediate"?l.postMessage(E):$==="uncaughtException"?l.onerror(E.error):$==="callHandler"?t[E.zd](...E.args):$&&k(`worker sent an unknown command ${$}`)},l.onerror=$=>{throw k(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$};var g,m=[];for(g of[])t.propertyIsEnumerable(g)&&m.push(g);l.postMessage({Uc:"load",Ad:m,Vd:be,Wd:y})});function me(){var l=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});re.push(l)}var be,Pe=(l,p)=>{z=0,l=Ss(l,p),0<z?_=l:vs(l)},Ce=[],Ye=0;function ot(l){var p=new it(l>>>=0);return(x(),G)[p.Vc+12>>>0]==0&&(yr(p,!0),Ye--),mi(p,!1),Ce.push(p),sl(l)}var rt=0,xt=()=>{Ie(0,0);var l=Ce.pop();il(l.ed),rt=0};function yr(l,p){p=p?1:0,(x(),G)[l.Vc+12>>>0]=p}function mi(l,p){p=p?1:0,(x(),G)[l.Vc+13>>>0]=p}class it{constructor(p){this.ed=p,this.Vc=p-24}}var mt=l=>{var p=rt;if(!p)return _i(0),0;var g=new it(p);(x(),L)[g.Vc+16>>>2>>>0]=p;var m=(x(),L)[g.Vc+4>>>2>>>0];if(!m)return _i(0),p;for(var $ of l){if($===0||$===m)break;if(nl($,m,g.Vc+16))return _i($),p}return _i(m),p};function rn(){return mt([])}function nn(l){return mt([l>>>0])}function j0(l,p,g,m){return mt([l>>>0,p>>>0,g>>>0,m>>>0])}var K0=()=>{var l=Ce.pop();l||ve("no exception to throw");var p=l.ed;throw(x(),G)[l.Vc+13>>>0]==0&&(Ce.push(l),mi(l,!0),yr(l,!1),Ye++),xs(p),rt=p};function Q0(l,p,g){var m=new it(l>>>=0);throw p>>>=0,g>>>=0,(x(),L)[m.Vc+16>>>2>>>0]=0,(x(),L)[m.Vc+4>>>2>>>0]=p,(x(),L)[m.Vc+8>>>2>>>0]=g,xs(l),Ye++,rt=l}var Z0=()=>Ye;function uu(l,p,g,m){return n?B(2,1,l,p,g,m):lu(l,p,g,m)}function lu(l,p,g,m){if(l>>>=0,p>>>=0,g>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var $=[];return n&&$.length===0?uu(l,p,g,m):(l={Od:g,Tc:l,dd:m,ud:$},n?(l.Uc="spawnThread",postMessage(l,$),0):C(l))}function Y0(l){throw rt||=l>>>0,rt}var du=globalThis.TextDecoder&&new TextDecoder,cu=(l,p,g,m)=>{if(g=p+g,m)return g;for(;l[p]&&!(p>=g);)++p;return p},pu=(l,p=0,g,m)=>{if(16<(g=cu(l,p>>>=0,g,m))-p&&l.buffer&&du)return du.decode(l.buffer instanceof ArrayBuffer?l.subarray(p,g):l.slice(p,g));for(m="";p<g;){var $=l[p++];if(128&$){var E=63&l[p++];if((224&$)==192)m+=String.fromCharCode((31&$)<<6|E);else{var A=63&l[p++];65536>($=(240&$)==224?(15&$)<<12|E<<6|A:(7&$)<<18|E<<12|A<<6|63&l[p++])?m+=String.fromCharCode($):($-=65536,m+=String.fromCharCode(55296|$>>10,56320|1023&$))}}else m+=String.fromCharCode($)}return m},Ke=(l,p,g)=>(l>>>=0)?pu((x(),oe),l,p,g):"";function fu(l,p,g){return n?B(3,1,l,p,g):0}function hu(l,p){if(n)return B(4,1,l,p)}function mu(l,p){if(n)return B(5,1,l,p)}function gu(l,p,g){if(n)return B(6,1,l,p,g)}function yu(l,p,g){return n?B(7,1,l,p,g):0}function _u(l,p){if(n)return B(8,1,l,p)}function wu(l,p,g){if(n)return B(9,1,l,p,g)}function bu(l,p,g,m){if(n)return B(10,1,l,p,g,m)}function vu(l,p,g,m){if(n)return B(11,1,l,p,g,m)}function $u(l,p,g,m){if(n)return B(12,1,l,p,g,m)}function xu(l){if(n)return B(13,1,l)}function Su(l,p){if(n)return B(14,1,l,p)}function Tu(l,p,g){if(n)return B(15,1,l,p,g)}var X0=()=>ve(""),qt=l=>{l>>>=0;for(var p="";;){var g=(x(),oe)[l++>>>0];if(!g)return p;p+=String.fromCharCode(g)}},us={},ls={},ei=class extends Error{constructor(l){super(l),this.name="BindingError"}};function er(l,p,g={}){return(function(m,$,E={}){var A=$.name;if(!m)throw new ei(`type "${A}" must have a positive integer typeid pointer`);if(ls.hasOwnProperty(m)){if(E.Bd)return;throw new ei(`Cannot register type '${A}' twice`)}ls[m]=$,us.hasOwnProperty(m)&&($=us[m],delete us[m],$.forEach(D=>D()))})(l,p,g)}var Iu=(l,p,g)=>{switch(p){case 1:return g?m=>(x(),G)[m>>>0]:m=>(x(),oe)[m>>>0];case 2:return g?m=>(x(),W)[m>>>1>>>0]:m=>(x(),j)[m>>>1>>>0];case 4:return g?m=>(x(),M)[m>>>2>>>0]:m=>(x(),L)[m>>>2>>>0];case 8:return g?m=>(x(),X)[m>>>3>>>0]:m=>(x(),le)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${l}`)}};function J0(l,p,g,m,$){l>>>=0,g>>>=0,p=qt(p>>>0);let E=A=>A;if(m=m===0n){let A=8*g;E=D=>BigInt.asUintN(A,D),$=E($)}er(l,{name:p,Qc:E,Xc:(A,D)=>(typeof D=="number"&&(D=BigInt(D)),D),Wc:Iu(p,g,!m),Yc:null})}function e_(l,p,g,m){er(l>>>=0,{name:p=qt(p>>>0),Qc:function($){return!!$},Xc:function($,E){return E?g:m},Wc:function($){return this.Qc((x(),oe)[$>>>0])},Yc:null})}var Eu=[],Ar=[0,1,,1,null,1,!0,1,!1,1];function ds(l){9<(l>>>=0)&&--Ar[l+1]==0&&(Ar[l]=void 0,Eu.push(l))}var St=l=>{if(!l)throw new ei(`Cannot use deleted val. handle = ${l}`);return Ar[l]},zt=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Eu.pop()||Ar.length;return Ar[p]=l,Ar[p+1]=1,p}};function cs(l){return this.Qc((x(),L)[l>>>2>>>0])}var t_={name:"emscripten::val",Qc:l=>{var p=St(l);return ds(l),p},Xc:(l,p)=>zt(p),Wc:cs,Yc:null};function r_(l){return er(l>>>0,t_)}var i_=(l,p)=>{switch(p){case 4:return function(g){return this.Qc((x(),Z)[g>>>2>>>0])};case 8:return function(g){return this.Qc((x(),ie)[g>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${l}`)}};function n_(l,p,g){g>>>=0,er(l>>>=0,{name:p=qt(p>>>0),Qc:m=>m,Xc:(m,$)=>$,Wc:i_(p,g),Yc:null})}function s_(l,p,g,m,$){l>>>=0,g>>>=0,p=qt(p>>>0);let E=D=>D;if(m===0){var A=32-8*g;E=D=>D<<A>>>A,$=E($)}er(l,{name:p,Qc:E,Xc:(D,J)=>J,Wc:Iu(p,g,m!==0),Yc:null})}function a_(l,p,g){function m(E){var A=(x(),L)[E>>>2>>>0];return E=(x(),L)[E+4>>>2>>>0],new $((x(),G).buffer,E,A)}var $=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];er(l>>>=0,{name:g=qt(g>>>0),Qc:m,Wc:m},{Bd:!0})}var _r=(l,p,g)=>{var m=(x(),oe);if(p>>>=0,0<g){var $=p;g=p+g-1;for(var E=0;E<l.length;++E){var A=l.codePointAt(E);if(127>=A){if(p>=g)break;m[p++>>>0]=A}else if(2047>=A){if(p+1>=g)break;m[p++>>>0]=192|A>>6,m[p++>>>0]=128|63&A}else if(65535>=A){if(p+2>=g)break;m[p++>>>0]=224|A>>12,m[p++>>>0]=128|A>>6&63,m[p++>>>0]=128|63&A}else{if(p+3>=g)break;m[p++>>>0]=240|A>>18,m[p++>>>0]=128|A>>12&63,m[p++>>>0]=128|A>>6&63,m[p++>>>0]=128|63&A,E++}}m[p>>>0]=0,l=p-$}else l=0;return l},sn=l=>{for(var p=0,g=0;g<l.length;++g){var m=l.charCodeAt(g);127>=m?p++:2047>=m?p+=2:55296<=m&&57343>=m?(p+=4,++g):p+=3}return p};function o_(l,p){er(l>>>=0,{name:p=qt(p>>>0),Qc(g){var m=(x(),L)[g>>>2>>>0];return m=Ke(g+4,m,!0),Ht(g),m},Xc(g,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var $=typeof m=="string";if(!($||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new ei("Cannot pass non-string to std::string");var E=$?sn(m):m.length,A=yi(4+E+1),D=A+4;return(x(),L)[A>>>2>>>0]=E,$?_r(m,D,E+1):(x(),oe).set(m,D>>>0),g!==null&&g.push(Ht,A),A},Wc:cs,Yc(g){Ht(g)}})}var ku=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,u_=(l,p,g)=>{if(l>>>=1,16<(p=cu((x(),j),l,p/2,g))-l&&ku)return ku.decode((x(),j).slice(l,p));for(g="";l<p;++l){var m=(x(),j)[l>>>0];g+=String.fromCharCode(m)}return g},l_=(l,p,g)=>{if(g??=2147483647,2>g)return 0;var m=p;g=(g-=2)<2*l.length?g/2:l.length;for(var $=0;$<g;++$){var E=l.charCodeAt($);(x(),W)[p>>>1>>>0]=E,p+=2}return(x(),W)[p>>>1>>>0]=0,p-m},d_=l=>2*l.length,c_=(l,p,g)=>{var m="";l>>>=2;for(var $=0;!($>=p/4);$++){var E=(x(),L)[l+$>>>0];if(!E&&!g)break;m+=String.fromCodePoint(E)}return m},p_=(l,p,g)=>{if(p>>>=0,g??=2147483647,4>g)return 0;var m=p;g=m+g-4;for(var $=0;$<l.length;++$){var E=l.codePointAt($);if(65535<E&&$++,(x(),M)[p>>>2>>>0]=E,(p+=4)+4>g)break}return(x(),M)[p>>>2>>>0]=0,p-m},f_=l=>{for(var p=0,g=0;g<l.length;++g)65535<l.codePointAt(g)&&g++,p+=4;return p};function h_(l,p,g){if(l>>>=0,p>>>=0,g=qt(g>>>=0),p===2)var m=u_,$=l_,E=d_;else m=c_,$=p_,E=f_;er(l,{name:g,Qc:A=>{var D=(x(),L)[A>>>2>>>0];return D=m(A+4,D*p,!0),Ht(A),D},Xc:(A,D)=>{if(typeof D!="string")throw new ei(`Cannot pass non-string to C++ string type ${g}`);var J=E(D),ne=yi(4+J+p);return(x(),L)[ne>>>2>>>0]=J/p,$(D,ne+4,J+p),A!==null&&A.push(Ht,ne),ne},Wc:cs,Yc(A){Ht(A)}})}function m_(l,p){er(l>>>=0,{Cd:!0,name:p=qt(p>>>0),Qc:()=>{},Xc:()=>{}})}function g_(l){bs(l>>>0,!i,1,!r,131072,!1),se()}var an=l=>{if(!R)try{if(l(),!(0<z))try{n?fn()&&vs(_):F(_)}catch(p){p instanceof tt||p=="unwind"||d(0,p)}}catch(p){p instanceof tt||p=="unwind"||d(0,p)}},y_=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ps(l){l>>>=0,y_||(Atomics.waitAsync((x(),M),l>>>2,l).value.then(on),l+=128,Atomics.store((x(),M),l>>>2,1))}var on=()=>an(()=>{var l=fn();l&&(ps(l),tl())});function __(l,p){(l>>>=0)==p>>>0?setTimeout(on):n?postMessage({ad:l,Uc:"checkMailbox"}):(l=V[l])&&l.postMessage({Uc:"checkMailbox"})}var fs=[];function w_(l,p,g,m,$){for(p>>>=0,$>>>=0,fs.length=0,g=$>>>3,m=$+m>>>3;g<m;){var E;E=(x(),X)[g++>>>0]?(x(),X)[g++>>>0]:(x(),ie)[g++>>>0],fs.push(E)}return(p?Ts[p]:lw[l])(...fs)}var b_=()=>{z=0};function v_(l){l>>>=0,n?postMessage({Uc:"cleanupThread",Qd:l}):he(V[l])}function $_(l){}var un=l=>{try{l()}catch(p){ve(p)}};function x_(l){var p=(...g)=>{ln.push(l);try{return l(...g)}finally{R||(ln.pop(),Vt&&wr===1&&ln.length===0&&(wr=0,z+=1,un(Hl),typeof Fibers<"u"&&Fibers.ce()))}};return Au.set(l,p),p}var wr=0,Vt=null,Cu=0,ln=[],hs=new Map,zu=new Map,Au=new Map,S_=0,ms=null,T_=[],Ou=l=>(function(p){if(!R){if(wr===0){var g=!1,m=!1;p(($=0)=>{if(!R&&(Cu=$,g=!0,m)){wr=2,un(()=>Gl(Vt)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),$=!1;try{var E=(function(){var J=(x(),M)[Vt+8>>>2>>>0];return J=zu.get(J),J=Au.get(J),--z,J()})()}catch(J){E=J,$=!0}var A=!1;if(!Vt){var D=ms;D&&(ms=null,($?D.reject:D.resolve)(E),A=!0)}if($&&!A)throw E}}),m=!0,g||(wr=1,Vt=(function(){var $=yi(65548),E=$+12;if((x(),L)[$>>>2>>>0]=E,(x(),L)[$+4>>>2>>>0]=E+65536,E=ln[0],!hs.has(E)){var A=S_++;hs.set(E,A),zu.set(A,E)}return E=hs.get(E),(x(),M)[$+8>>>2>>>0]=E,$})(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),un(()=>Vl(Vt)))}else wr===2?(wr=0,un(Fl),Ht(Vt),Vt=null,T_.forEach(an)):ve(`invalid state: ${wr}`);return Cu}})(p=>{l().then(p)});function I_(l){return l>>>=0,Ou(async()=>{var p=await St(l);return zt(p)})}var gs=[],E_=l=>{var p=gs.length;return gs.push(l),p},k_=(l,p)=>{for(var g=Array(l),m=0;m<l;++m){var $=m,E=(x(),L)[p+4*m>>>2>>>0],A=ls[E];if(A===void 0)throw l=`parameter ${m}`,E=Qu(E),p=qt(E),Ht(E),new ei(`${l} has unknown type ${p}`);g[$]=A}return g},C_=(l,p,g)=>{var m=[];return l=l(m,g),m.length&&((x(),L)[p>>>2>>>0]=zt(m)),l},z_={},dn=l=>{var p=z_[l];return p===void 0?qt(l):p};function A_(l,p,g){var[m,...$]=k_(l,p>>>0);p=m.Xc.bind(m);var E=$.map(J=>J.Wc.bind(J));l--;var A={toValue:St};switch(l=E.map((J,ne)=>{var _e=`argFromPtr${ne}`;return A[_e]=J,`${_e}(args${ne?"+"+8*ne:""})`}),g){case 0:var D="toValue(handle)";break;case 2:D="new (toValue(handle))";break;case 3:D="";break;case 1:A.getStringOrSymbol=dn,D="toValue(handle)[getStringOrSymbol(methodName)]"}return D+=`(${l})`,m.Cd||(A.toReturnWire=p,A.emval_returnValue=C_,D=`return emval_returnValue(toReturnWire, destructorsRef, ${D})`),D=`return function (handle, methodName, destructorsRef, args) {
  ${D}
  }`,g=new Function(Object.keys(A),D)(...Object.values(A)),D=`methodCaller<(${$.map(J=>J.name)}) => ${m.name}>`,E_(Object.defineProperty(g,"name",{value:D}))}function O_(l,p){return p>>>=0,(l=St(l>>>0))==St(p)}function R_(l){return(l>>>=0)?(l=dn(l),zt(globalThis[l])):zt(globalThis)}function M_(l){return l=dn(l>>>0),zt(t[l])}function B_(l,p){return p>>>=0,l=St(l>>>0),p=St(p),zt(l[p])}function N_(l){9<(l>>>=0)&&(Ar[l+1]+=1)}function Ru(l,p,g,m,$){return gs[l>>>0](p>>>0,g>>>0,m>>>0,$>>>0)}function D_(l,p,g,m,$){return Ru(l>>>0,p>>>0,g>>>0,m>>>0,$>>>0)}function P_(){return zt([])}function U_(l){l=St(l>>>0);for(var p=Array(l.length),g=0;g<l.length;g++)p[g]=l[g];return zt(p)}function L_(l){return zt(dn(l>>>0))}function W_(){return zt({})}function q_(l){for(var p=St(l>>>=0);p.length;){var g=p.pop();p.pop()(g)}ds(l)}function V_(l,p,g){p>>>=0,g>>>=0,l=St(l>>>0),p=St(p),g=St(g),l[p]=g}function H_(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(x(),M)[p>>>2>>>0]=l.getUTCSeconds(),(x(),M)[p+4>>>2>>>0]=l.getUTCMinutes(),(x(),M)[p+8>>>2>>>0]=l.getUTCHours(),(x(),M)[p+12>>>2>>>0]=l.getUTCDate(),(x(),M)[p+16>>>2>>>0]=l.getUTCMonth(),(x(),M)[p+20>>>2>>>0]=l.getUTCFullYear()-1900,(x(),M)[p+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),M)[p+28>>>2>>>0]=l}var Mu=l=>l%4==0&&(l%100!=0||l%400==0),Bu=[0,31,60,91,121,152,182,213,244,274,305,335],Nu=[0,31,59,90,120,151,181,212,243,273,304,334];function G_(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(x(),M)[p>>>2>>>0]=l.getSeconds(),(x(),M)[p+4>>>2>>>0]=l.getMinutes(),(x(),M)[p+8>>>2>>>0]=l.getHours(),(x(),M)[p+12>>>2>>>0]=l.getDate(),(x(),M)[p+16>>>2>>>0]=l.getMonth(),(x(),M)[p+20>>>2>>>0]=l.getFullYear()-1900,(x(),M)[p+24>>>2>>>0]=l.getDay();var g=(Mu(l.getFullYear())?Bu:Nu)[l.getMonth()]+l.getDate()-1|0;(x(),M)[p+28>>>2>>>0]=g,(x(),M)[p+36>>>2>>>0]=-60*l.getTimezoneOffset(),g=new Date(l.getFullYear(),6,1).getTimezoneOffset();var m=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(g!=m&&l.getTimezoneOffset()==Math.min(m,g)),(x(),M)[p+32>>>2>>>0]=l}function F_(l){l>>>=0;var p=new Date((x(),M)[l+20>>>2>>>0]+1900,(x(),M)[l+16>>>2>>>0],(x(),M)[l+12>>>2>>>0],(x(),M)[l+8>>>2>>>0],(x(),M)[l+4>>>2>>>0],(x(),M)[l>>>2>>>0],0),g=(x(),M)[l+32>>>2>>>0],m=p.getTimezoneOffset(),$=new Date(p.getFullYear(),6,1).getTimezoneOffset(),E=new Date(p.getFullYear(),0,1).getTimezoneOffset(),A=Math.min(E,$);return 0>g?(x(),M)[l+32>>>2>>>0]=+($!=E&&A==m):0<g!=(A==m)&&($=Math.max(E,$),p.setTime(p.getTime()+6e4*((0<g?A:$)-m))),(x(),M)[l+24>>>2>>>0]=p.getDay(),g=(Mu(p.getFullYear())?Bu:Nu)[p.getMonth()]+p.getDate()-1|0,(x(),M)[l+28>>>2>>>0]=g,(x(),M)[l>>>2>>>0]=p.getSeconds(),(x(),M)[l+4>>>2>>>0]=p.getMinutes(),(x(),M)[l+8>>>2>>>0]=p.getHours(),(x(),M)[l+12>>>2>>>0]=p.getDate(),(x(),M)[l+16>>>2>>>0]=p.getMonth(),(x(),M)[l+20>>>2>>>0]=p.getYear(),l=p.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function Du(l,p,g,m,$,E,A){return n?B(16,1,l,p,g,m,$,E,A):-52}function Pu(l,p,g,m,$,E){if(n)return B(17,1,l,p,g,m,$,E)}var gi={},j_=()=>performance.timeOrigin+performance.now();function Uu(l,p){if(n)return B(18,1,l,p);if(gi[l]&&(clearTimeout(gi[l].id),delete gi[l]),!p)return 0;var g=setTimeout(()=>{delete gi[l],an(()=>el(l,performance.timeOrigin+performance.now()))},p);return gi[l]={id:g,be:p},0}function K_(l,p,g,m){l>>>=0,p>>>=0,g>>>=0,m>>>=0;var $=new Date().getFullYear(),E=new Date($,0,1).getTimezoneOffset();$=new Date($,6,1).getTimezoneOffset();var A=Math.max(E,$);(x(),L)[l>>>2>>>0]=60*A,(x(),M)[p>>>2>>>0]=+(E!=$),l=(p=D=>{var J=Math.abs(D);return`UTC${0<=D?"-":"+"}${String(Math.floor(J/60)).padStart(2,"0")}${String(J%60).padStart(2,"0")}`})(E),p=p($),$<E?(_r(l,g,17),_r(p,m,17)):(_r(l,m,17),_r(p,g,17))}var Q_=()=>Date.now();function Z_(l,p,g){return g>>>=0,0<=l&&3>=l?(l===0?l=Date.now():l=performance.timeOrigin+performance.now(),l=Math.round(1e6*l),(x(),X)[g>>>3>>>0]=BigInt(l),0):28}var ys=[],Lu=(l,p)=>{ys.length=0;for(var g;g=(x(),oe)[l++>>>0];){var m=g!=105;p+=(m&=g!=112)&&p%8?4:0,ys.push(g==112?(x(),L)[p>>>2>>>0]:g==106?(x(),X)[p>>>3>>>0]:g==105?(x(),M)[p>>>2>>>0]:(x(),ie)[p>>>3>>>0]),p+=m?8:4}return ys};function Y_(l,p,g){return l>>>=0,p=Lu(p>>>0,g>>>0),Ts[l](...p)}function X_(l,p,g){return l>>>=0,p=Lu(p>>>0,g>>>0),Ts[l](...p)}var J_=()=>{};function ew(l,p){return k(Ke(l>>>0,p>>>0))}var tw=()=>{throw z+=1,"unwind"};function rw(){return 4294901760}var iw=()=>navigator.hardwareConcurrency,Or={},cn=l=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(l))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(l))?2147483648|+p[1]:0},Wu=l=>{for(var p of l)(l=cn(p))&&(Or[l]=p)};function nw(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),Wu(l),Or.sd=cn(l[3]),Or.Md=l,Or.sd}function pn(l){if(!(l=Or[l>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(l))l=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(l))l=p[1];else{if(!(p=/^(.+?)@/.exec(l)))return 0;l=p[1]}Ht(pn.td??0),p=sn(l)+1;var g=yi(p);return g&&_r(l,g,p),pn.td=g,pn.td}function sw(l){l>>>=0;var p=(x(),oe).length;if(l<=p||4294901760<l)return!1;for(var g=1;4>=g;g*=2){var m=p*(1+.2/g);m=Math.min(m,l+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(l,m)/65536))-be.buffer.byteLength+65535)/65536|0;try{be.grow(m),Y();var $=1;break e}catch{}$=void 0}if($)return!0}return!1}function aw(l,p,g){if(l>>>=0,p>>>=0,Or.sd==l)var m=Or.Md;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Wu(m);for(var $=3;m[$]&&cn(m[$])!=l;)++$;for(l=0;l<g&&m[l+$];++l)(x(),M)[p+4*l>>>2>>>0]=cn(m[l+$]);return l}var _s,ws={},qu=()=>{if(!_s){var l,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in ws)ws[l]===void 0?delete p[l]:p[l]=ws[l];var g=[];for(l in p)g.push(`${l}=${p[l]}`);_s=g}return _s};function Vu(l,p){if(n)return B(19,1,l,p);l>>>=0,p>>>=0;var g,m=0,$=0;for(g of qu()){var E=p+m;(x(),L)[l+$>>>2>>>0]=E,m+=_r(g,E,1/0)+1,$+=4}return 0}function Hu(l,p){if(n)return B(20,1,l,p);l>>>=0,p>>>=0;var g=qu();for(var m of((x(),L)[l>>>2>>>0]=g.length,l=0,g))l+=sn(m)+1;return(x(),L)[p>>>2>>>0]=l,0}function Gu(l){return n?B(21,1,l):52}function Fu(l,p,g,m){return n?B(22,1,l,p,g,m):52}function ju(l,p,g,m){return n?B(23,1,l,p,g,m):70}var ow=[null,[],[]];function Ku(l,p,g,m){if(n)return B(24,1,l,p,g,m);p>>>=0,g>>>=0,m>>>=0;for(var $=0,E=0;E<g;E++){var A=(x(),L)[p>>>2>>>0],D=(x(),L)[p+4>>>2>>>0];p+=8;for(var J=0;J<D;J++){var ne=l,_e=(x(),oe)[A+J>>>0],ke=ow[ne];_e===0||_e===10?((ne===1?S:k)(pu(ke)),ke.length=0):ke.push(_e)}$+=D}return(x(),L)[m>>>2>>>0]=$,0}function uw(l){return l>>>0}n||(function(){for(var l=t.numThreads-1;l--;)me();Ge.push(async()=>{var p=(async function(){if(!n)return Promise.all(re.map(ce))})();Oe++,await p,--Oe==0&&at&&(p=at,at=null,p())})})(),n||(be=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Y()),t.wasmBinary&&(h=t.wasmBinary),t.stackSave=()=>Te(),t.stackRestore=l=>$e(l),t.stackAlloc=l=>$s(l),t.setValue=function(l,p,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":(x(),G)[l>>>0]=p;break;case"i16":(x(),W)[l>>>1>>>0]=p;break;case"i32":(x(),M)[l>>>2>>>0]=p;break;case"i64":(x(),X)[l>>>3>>>0]=BigInt(p);break;case"float":(x(),Z)[l>>>2>>>0]=p;break;case"double":(x(),ie)[l>>>3>>>0]=p;break;case"*":(x(),L)[l>>>2>>>0]=p;break;default:ve(`invalid type for setValue: ${g}`)}},t.getValue=function(l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(x(),G)[l>>>0];case"i16":return(x(),W)[l>>>1>>>0];case"i32":return(x(),M)[l>>>2>>>0];case"i64":return(x(),X)[l>>>3>>>0];case"float":return(x(),Z)[l>>>2>>>0];case"double":return(x(),ie)[l>>>3>>>0];case"*":return(x(),L)[l>>>2>>>0];default:ve(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Ke,t.stringToUTF8=_r,t.lengthBytesUTF8=sn;var Qu,Zu,fn,Ht,yi,bs,Yu,Xu,Ju,vs,el,tl,Ie,_i,rl,$e,$s,Te,il,xs,nl,sl,al,Ss,ol,ul,ll,dl,cl,pl,fl,hl,ml,gl,yl,_l,wl,bl,vl,$l,xl,Sl,Tl,Il,El,kl,Cl,zl,Al,Ol,Rl,Ml,Bl,Nl,Dl,Pl,Ul,Ll,Wl,ql,Vl,Hl,Gl,Fl,tr,lw=[K,H,uu,fu,hu,mu,gu,yu,_u,wu,bu,vu,$u,xu,Su,Tu,Du,Pu,Uu,Vu,Hu,Gu,Fu,ju,Ku],Ts={927244:(l,p,g,m,$)=>{if(t===void 0||!t.Zc)return 1;if((l=Ke(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=t.Zc.get(l)))return 2;if(p=Number(p>>>0),g=Number(g>>>0),m=Number(m>>>0),p+g>l.byteLength)return 3;try{let E=l.subarray(p,p+g);switch($){case 0:(x(),oe).set(E,m>>>0);break;case 1:t.Xd?t.Xd(m,E):t.Ld(m,E);break;default:return 4}return 0}catch{return 4}},928068:(l,p,g)=>{t.xd(l,(x(),oe).subarray(p>>>0,p+g>>>0))},928132:()=>t.Zd(),928174:l=>{t.vd(l)},928211:()=>{t.Ed()},928242:()=>{t.Fd()},928271:()=>{t.Jd()},928296:l=>t.Dd(l),928329:l=>t.Hd(l),928361:(l,p,g)=>{t.jd(Number(l),Number(p),Number(g),!0)},928424:(l,p,g)=>{t.jd(Number(l),Number(p),Number(g))},928481:()=>typeof wasmOffsetConverter<"u",928538:l=>{t.ac("Abs",l,void 0)},928589:l=>{t.ac("Neg",l,void 0)},928640:l=>{t.ac("Floor",l,void 0)},928693:l=>{t.ac("Ceil",l,void 0)},928745:l=>{t.ac("Reciprocal",l,void 0)},928803:l=>{t.ac("Sqrt",l,void 0)},928855:l=>{t.ac("Exp",l,void 0)},928906:l=>{t.ac("Erf",l,void 0)},928957:l=>{t.ac("Sigmoid",l,void 0)},929012:(l,p,g)=>{t.ac("HardSigmoid",l,{alpha:p,beta:g})},929091:l=>{t.ac("Log",l,void 0)},929142:l=>{t.ac("Sin",l,void 0)},929193:l=>{t.ac("Cos",l,void 0)},929244:l=>{t.ac("Tan",l,void 0)},929295:l=>{t.ac("Asin",l,void 0)},929347:l=>{t.ac("Acos",l,void 0)},929399:l=>{t.ac("Atan",l,void 0)},929451:l=>{t.ac("Sinh",l,void 0)},929503:l=>{t.ac("Cosh",l,void 0)},929555:l=>{t.ac("Asinh",l,void 0)},929608:l=>{t.ac("Acosh",l,void 0)},929661:l=>{t.ac("Atanh",l,void 0)},929714:l=>{t.ac("Tanh",l,void 0)},929766:l=>{t.ac("Not",l,void 0)},929817:(l,p,g)=>{t.ac("Clip",l,{min:p,max:g})},929886:l=>{t.ac("Clip",l,void 0)},929938:(l,p)=>{t.ac("Elu",l,{alpha:p})},929996:l=>{t.ac("Gelu",l,void 0)},930048:l=>{t.ac("Relu",l,void 0)},930100:(l,p)=>{t.ac("LeakyRelu",l,{alpha:p})},930164:(l,p)=>{t.ac("ThresholdedRelu",l,{alpha:p})},930234:(l,p)=>{t.ac("Cast",l,{to:p})},930292:l=>{t.ac("Add",l,void 0)},930343:l=>{t.ac("Sub",l,void 0)},930394:l=>{t.ac("Mul",l,void 0)},930445:l=>{t.ac("Div",l,void 0)},930496:l=>{t.ac("Pow",l,void 0)},930547:l=>{t.ac("Equal",l,void 0)},930600:l=>{t.ac("Greater",l,void 0)},930655:l=>{t.ac("GreaterOrEqual",l,void 0)},930717:l=>{t.ac("Less",l,void 0)},930769:l=>{t.ac("LessOrEqual",l,void 0)},930828:(l,p,g,m,$)=>{t.ac("ReduceMean",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931003:(l,p,g,m,$)=>{t.ac("ReduceMax",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931177:(l,p,g,m,$)=>{t.ac("ReduceMin",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931351:(l,p,g,m,$)=>{t.ac("ReduceProd",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931526:(l,p,g,m,$)=>{t.ac("ReduceSum",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931700:(l,p,g,m,$)=>{t.ac("ReduceL1",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},931873:(l,p,g,m,$)=>{t.ac("ReduceL2",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},932046:(l,p,g,m,$)=>{t.ac("ReduceLogSum",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},932223:(l,p,g,m,$)=>{t.ac("ReduceSumSquare",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},932403:(l,p,g,m,$)=>{t.ac("ReduceLogSumExp",l,{keepDims:!!p,noopWithEmptyAxes:!!g,axes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},932583:l=>{t.ac("Where",l,void 0)},932636:(l,p,g)=>{t.ac("Transpose",l,{perm:p?Array.from((x(),M).subarray(Number(p)>>>0,Number(g)>>>0)):[]})},932760:(l,p,g,m)=>{t.ac("DepthToSpace",l,{blocksize:p,mode:Ke(g),format:m?"NHWC":"NCHW"})},932893:(l,p,g,m)=>{t.ac("DepthToSpace",l,{blocksize:p,mode:Ke(g),format:m?"NHWC":"NCHW"})},933026:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe,br)=>{t.ac("ConvTranspose",l,{format:J?"NHWC":"NCHW",autoPad:p,dilations:[g],group:m,kernelShape:[$],pads:[E,A],strides:[D],wIsConst:()=>!!(x(),G)[ne>>>0],outputPadding:_e?Array.from((x(),M).subarray(Number(_e)>>>0,Number(ke)>>>0)):[],outputShape:De?Array.from((x(),M).subarray(Number(De)>>>0,Number(qe)>>>0)):[],activation:Ke(br)})},933459:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("ConvTranspose",l,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from((x(),M).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),group:m,kernelShape:Array.from((x(),M).subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from((x(),M).subarray(Number(E)>>>0,4+(Number(E)>>>0)>>>0)),strides:Array.from((x(),M).subarray(Number(A)>>>0,2+(Number(A)>>>0)>>>0)),wIsConst:()=>!!(x(),G)[J>>>0],outputPadding:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],outputShape:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[],activation:Ke(qe)})},934120:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe,br)=>{t.ac("ConvTranspose",l,{format:J?"NHWC":"NCHW",autoPad:p,dilations:[g],group:m,kernelShape:[$],pads:[E,A],strides:[D],wIsConst:()=>!!(x(),G)[ne>>>0],outputPadding:_e?Array.from((x(),M).subarray(Number(_e)>>>0,Number(ke)>>>0)):[],outputShape:De?Array.from((x(),M).subarray(Number(De)>>>0,Number(qe)>>>0)):[],activation:Ke(br)})},934553:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("ConvTranspose",l,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from((x(),M).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),group:m,kernelShape:Array.from((x(),M).subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from((x(),M).subarray(Number(E)>>>0,4+(Number(E)>>>0)>>>0)),strides:Array.from((x(),M).subarray(Number(A)>>>0,2+(Number(A)>>>0)>>>0)),wIsConst:()=>!!(x(),G)[J>>>0],outputPadding:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],outputShape:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[],activation:Ke(qe)})},935214:(l,p)=>{t.ac("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},935305:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("AveragePool",l,{format:qe?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:m,storage_order:$,dilations:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:D?Array.from((x(),M).subarray(Number(D)>>>0,Number(J)>>>0)):[],pads:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],strides:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[]})},935784:(l,p)=>{t.ac("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},935875:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("AveragePool",l,{format:qe?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:m,storage_order:$,dilations:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:D?Array.from((x(),M).subarray(Number(D)>>>0,Number(J)>>>0)):[],pads:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],strides:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[]})},936354:(l,p)=>{t.ac("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},936441:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("MaxPool",l,{format:qe?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:m,storage_order:$,dilations:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:D?Array.from((x(),M).subarray(Number(D)>>>0,Number(J)>>>0)):[],pads:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],strides:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[]})},936916:(l,p)=>{t.ac("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},937003:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe)=>{t.ac("MaxPool",l,{format:qe?"NHWC":"NCHW",auto_pad:p,ceil_mode:g,count_include_pad:m,storage_order:$,dilations:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[],kernel_shape:D?Array.from((x(),M).subarray(Number(D)>>>0,Number(J)>>>0)):[],pads:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],strides:ke?Array.from((x(),M).subarray(Number(ke)>>>0,Number(De)>>>0)):[]})},937478:(l,p,g,m,$)=>{t.ac("Gemm",l,{alpha:p,beta:g,transA:m,transB:$})},937582:l=>{t.ac("MatMul",l,void 0)},937636:(l,p,g,m)=>{t.ac("ArgMax",l,{keepDims:!!p,selectLastIndex:!!g,axis:m})},937744:(l,p,g,m)=>{t.ac("ArgMin",l,{keepDims:!!p,selectLastIndex:!!g,axis:m})},937852:(l,p)=>{t.ac("Softmax",l,{axis:p})},937915:(l,p)=>{t.ac("Concat",l,{axis:p})},937975:(l,p,g,m,$)=>{t.ac("Split",l,{axis:p,numOutputs:g,splitSizes:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},938131:l=>{t.ac("Expand",l,void 0)},938185:(l,p)=>{t.ac("Gather",l,{axis:Number(p)})},938256:(l,p)=>{t.ac("GatherElements",l,{axis:Number(p)})},938335:(l,p)=>{t.ac("GatherND",l,{batch_dims:Number(p)})},938414:(l,p,g,m,$,E,A,D,J,ne,_e)=>{t.ac("Resize",l,{antialias:p,axes:g?Array.from((x(),M).subarray(Number(g)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ke($),cubicCoeffA:E,excludeOutside:A,extrapolationValue:D,keepAspectRatioPolicy:Ke(J),mode:Ke(ne),nearestMode:Ke(_e)})},938776:(l,p,g,m,$,E,A)=>{t.ac("Slice",l,{starts:p?Array.from((x(),M).subarray(Number(p)>>>0,Number(g)>>>0)):[],ends:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[],axes:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[]})},939040:l=>{t.ac("Tile",l,void 0)},939092:(l,p,g)=>{t.ac("InstanceNormalization",l,{epsilon:p,format:g?"NHWC":"NCHW"})},939206:(l,p,g)=>{t.ac("InstanceNormalization",l,{epsilon:p,format:g?"NHWC":"NCHW"})},939320:l=>{t.ac("Range",l,void 0)},939373:(l,p)=>{t.ac("Einsum",l,{equation:Ke(p)})},939454:(l,p,g,m,$)=>{t.ac("Pad",l,{mode:p,value:g,pads:m?Array.from((x(),M).subarray(Number(m)>>>0,Number($)>>>0)):[]})},939597:(l,p,g,m,$,E)=>{t.ac("BatchNormalization",l,{epsilon:p,momentum:g,spatial:!!$,trainingMode:!!m,format:E?"NHWC":"NCHW"})},939766:(l,p,g,m,$,E)=>{t.ac("BatchNormalization",l,{epsilon:p,momentum:g,spatial:!!$,trainingMode:!!m,format:E?"NHWC":"NCHW"})},939935:(l,p,g)=>{t.ac("CumSum",l,{exclusive:Number(p),reverse:Number(g)})},940032:(l,p,g)=>{t.ac("DequantizeLinear",l,{axis:p,blockSize:g})},940122:(l,p,g,m,$)=>{t.ac("GridSample",l,{align_corners:p,mode:Ke(g),padding_mode:Ke(m),format:$?"NHWC":"NCHW"})},940292:(l,p,g,m,$)=>{t.ac("GridSample",l,{align_corners:p,mode:Ke(g),padding_mode:Ke(m),format:$?"NHWC":"NCHW"})},940462:(l,p)=>{t.ac("ScatterND",l,{reduction:Ke(p)})},940547:(l,p,g,m,$,E,A,D,J)=>{t.ac("Attention",l,{numHeads:p,isUnidirectional:g,maskFilterValue:m,scale:$,doRotary:E,qkvHiddenSizes:A?Array.from((x(),M).subarray(Number(D)>>>0,Number(D)+A>>>0)):[],pastPresentShareBuffer:!!J})},940819:l=>{t.ac("BiasAdd",l,void 0)},940874:l=>{t.ac("BiasSplitGelu",l,void 0)},940935:l=>{t.ac("FastGelu",l,void 0)},940991:(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe,br,Is)=>{t.ac("Conv",l,{format:ke?"NHWC":"NCHW",auto_pad:p,dilations:g?Array.from((x(),M).subarray(Number(g)>>>0,Number(m)>>>0)):[],group:$,kernel_shape:E?Array.from((x(),M).subarray(Number(E)>>>0,Number(A)>>>0)):[],pads:D?Array.from((x(),M).subarray(Number(D)>>>0,Number(J)>>>0)):[],strides:ne?Array.from((x(),M).subarray(Number(ne)>>>0,Number(_e)>>>0)):[],w_is_const:()=>!!(x(),G)[Number(De)>>>0],activation:Ke(qe),activation_params:br?Array.from((x(),Z).subarray(Number(br)>>>0,Number(Is)>>>0)):[]})},941575:l=>{t.ac("Gelu",l,void 0)},941627:(l,p,g,m,$,E,A,D,J)=>{t.ac("GroupQueryAttention",l,{numHeads:p,kvNumHeads:g,scale:m,softcap:$,doRotary:E,rotaryInterleaved:A,smoothSoftmax:D,localWindowSize:J})},941844:(l,p,g,m)=>{t.ac("LayerNormalization",l,{axis:p,epsilon:g,simplified:!!m})},941955:(l,p,g,m)=>{t.ac("LayerNormalization",l,{axis:p,epsilon:g,simplified:!!m})},942066:(l,p,g,m,$,E)=>{t.ac("MatMulNBits",l,{k:p,n:g,accuracyLevel:m,bits:$,blockSize:E})},942193:(l,p,g,m,$,E)=>{t.ac("MultiHeadAttention",l,{numHeads:p,isUnidirectional:g,maskFilterValue:m,scale:$,doRotary:E})},942352:(l,p)=>{t.ac("QuickGelu",l,{alpha:p})},942416:(l,p,g,m,$)=>{t.ac("RotaryEmbedding",l,{interleaved:!!p,numHeads:g,rotaryEmbeddingDim:m,scale:$})},942555:(l,p,g)=>{t.ac("SkipLayerNormalization",l,{epsilon:p,simplified:!!g})},942657:(l,p,g)=>{t.ac("SkipLayerNormalization",l,{epsilon:p,simplified:!!g})},942759:(l,p,g,m)=>{t.ac("GatherBlockQuantized",l,{gatherAxis:p,quantizeAxis:g,blockSize:m})},942880:l=>{t.Id(l)},942914:(l,p)=>t.Kd(Number(l),Number(p),t.$c.Nd,t.$c.errors)};function dw(l,p,g){return Ou(async()=>{await t.Gd(Number(l),Number(p),Number(g))})}function cw(){return typeof wasmOffsetConverter<"u"}function pw(l,p,g,m){var $=Te();try{return hl(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function fw(l,p,g){var m=Te();try{return dl(l,p,g)}catch($){if($e(m),$!==$+0)throw $;Ie(1,0)}}function hw(l,p,g){var m=Te();try{al(l,p,g)}catch($){if($e(m),$!==$+0)throw $;Ie(1,0)}}function mw(l,p){var g=Te();try{return Ss(l,p)}catch(m){if($e(g),m!==m+0)throw m;Ie(1,0)}}function gw(l){var p=Te();try{ol(l)}catch(g){if($e(p),g!==g+0)throw g;Ie(1,0)}}function yw(l,p,g,m,$,E,A){var D=Te();try{return pl(l,p,g,m,$,E,A)}catch(J){if($e(D),J!==J+0)throw J;Ie(1,0)}}function _w(l,p){var g=Te();try{ml(l,p)}catch(m){if($e(g),m!==m+0)throw m;Ie(1,0)}}function ww(l,p,g,m,$,E){var A=Te();try{ul(l,p,g,m,$,E)}catch(D){if($e(A),D!==D+0)throw D;Ie(1,0)}}function bw(l,p,g,m){var $=Te();try{fl(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function vw(l,p,g,m,$){var E=Te();try{ll(l,p,g,m,$)}catch(A){if($e(E),A!==A+0)throw A;Ie(1,0)}}function $w(l,p,g,m,$,E,A){var D=Te();try{yl(l,p,g,m,$,E,A)}catch(J){if($e(D),J!==J+0)throw J;Ie(1,0)}}function xw(l,p,g,m,$,E,A){var D=Te();try{_l(l,p,g,m,$,E,A)}catch(J){if($e(D),J!==J+0)throw J;Ie(1,0)}}function Sw(l,p,g,m,$,E,A,D){var J=Te();try{$l(l,p,g,m,$,E,A,D)}catch(ne){if($e(J),ne!==ne+0)throw ne;Ie(1,0)}}function Tw(l,p,g,m,$){var E=Te();try{return gl(l,p,g,m,$)}catch(A){if($e(E),A!==A+0)throw A;Ie(1,0)}}function Iw(l,p,g,m,$,E,A,D){var J=Te();try{xl(l,p,g,m,$,E,A,D)}catch(ne){if($e(J),ne!==ne+0)throw ne;Ie(1,0)}}function Ew(l,p,g,m,$,E,A,D,J,ne,_e,ke){var De=Te();try{wl(l,p,g,m,$,E,A,D,J,ne,_e,ke)}catch(qe){if($e(De),qe!==qe+0)throw qe;Ie(1,0)}}function kw(l,p,g,m,$,E){var A=Te();try{return bl(l,p,g,m,$,E)}catch(D){if($e(A),D!==D+0)throw D;Ie(1,0)}}function Cw(l,p,g){var m=Te();try{return Sl(l,p,g)}catch($){if($e(m),$!==$+0)throw $;return Ie(1,0),0n}}function zw(l,p,g,m,$,E,A,D,J){var ne=Te();try{cl(l,p,g,m,$,E,A,D,J)}catch(_e){if($e(ne),_e!==_e+0)throw _e;Ie(1,0)}}function Aw(l){var p=Te();try{return Tl(l)}catch(g){if($e(p),g!==g+0)throw g;Ie(1,0)}}function Ow(l,p,g){var m=Te();try{return Il(l,p,g)}catch($){if($e(m),$!==$+0)throw $;Ie(1,0)}}function Rw(l,p){var g=Te();try{return ql(l,p)}catch(m){if($e(g),m!==m+0)throw m;return Ie(1,0),0n}}function Mw(l,p,g,m,$){var E=Te();try{El(l,p,g,m,$)}catch(A){if($e(E),A!==A+0)throw A;Ie(1,0)}}function Bw(l){var p=Te();try{return kl(l)}catch(g){if($e(p),g!==g+0)throw g;return Ie(1,0),0n}}function Nw(l,p,g,m,$,E){var A=Te();try{return Ml(l,p,g,m,$,E)}catch(D){if($e(A),D!==D+0)throw D;Ie(1,0)}}function Dw(l,p,g,m,$,E){var A=Te();try{return Bl(l,p,g,m,$,E)}catch(D){if($e(A),D!==D+0)throw D;Ie(1,0)}}function Pw(l,p,g,m,$,E,A,D){var J=Te();try{return vl(l,p,g,m,$,E,A,D)}catch(ne){if($e(J),ne!==ne+0)throw ne;Ie(1,0)}}function Uw(l,p,g,m,$){var E=Te();try{return Nl(l,p,g,m,$)}catch(A){if($e(E),A!==A+0)throw A;return Ie(1,0),0n}}function Lw(l,p,g,m){var $=Te();try{return Dl(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function Ww(l,p,g,m){var $=Te();try{return Pl(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function qw(l,p,g,m,$,E,A,D,J,ne,_e,ke){var De=Te();try{return Ul(l,p,g,m,$,E,A,D,J,ne,_e,ke)}catch(qe){if($e(De),qe!==qe+0)throw qe;Ie(1,0)}}function Vw(l,p,g,m,$,E,A,D,J,ne,_e){var ke=Te();try{Ol(l,p,g,m,$,E,A,D,J,ne,_e)}catch(De){if($e(ke),De!==De+0)throw De;Ie(1,0)}}function Hw(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe,br,Is){var Zw=Te();try{Rl(l,p,g,m,$,E,A,D,J,ne,_e,ke,De,qe,br,Is)}catch(Es){if($e(Zw),Es!==Es+0)throw Es;Ie(1,0)}}function Gw(l,p,g,m){var $=Te();try{return Ll(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function Fw(l,p,g,m,$){var E=Te();try{return Wl(l,p,g,m,$)}catch(A){if($e(E),A!==A+0)throw A;Ie(1,0)}}function jw(l,p,g){var m=Te();try{return Cl(l,p,g)}catch($){if($e(m),$!==$+0)throw $;Ie(1,0)}}function Kw(l,p,g){var m=Te();try{return zl(l,p,g)}catch($){if($e(m),$!==$+0)throw $;Ie(1,0)}}function Qw(l,p,g,m){var $=Te();try{Al(l,p,g,m)}catch(E){if($e($),E!==E+0)throw E;Ie(1,0)}}function hn(){if(0<Oe)at=hn;else if(n)w?.(t),pe();else{for(var l=Ge;0<l.length;)l.shift()(t);0<Oe?at=hn:(t.calledRun=!0,R||(pe(),w?.(t)))}}return n||(tr=await Ze(),hn()),t.PTR_SIZE=4,U?t:new Promise((l,p)=>{w=l,T=p})}var Om,Id,G$=Q(()=>{Om=Td,Id=globalThis.self?.name?.startsWith("em-pthread"),Id&&Td()}),Fs,Za,Ed,_t,Rm,wn,kd,Cd,js,zd,Ks,Mm,Qs,Bm,Do=Q(()=>{No(),Fs=typeof location>"u"?void 0:location.origin,Za=import.meta.url>"file:"&&import.meta.url<"file;",Ed=()=>{{if(Za){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Fs).href}return import.meta.url}},_t=Ed(),Rm=()=>{if(_t&&!_t.startsWith("blob:"))return _t.substring(0,_t.lastIndexOf("/")+1)},wn=(e,t)=>{try{let r=t??_t;return(r?new URL(e,r):new URL(e)).origin===Fs}catch{return!1}},kd=(e,t)=>{let r=t??_t;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Cd=(e,t)=>`${t??"./"}${e}`,js=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},zd=async e=>(await import(e)).default,Ks=(H$(),Yi(Cm)).default,Mm=async()=>{if(!_t)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(wn(_t))return[void 0,Ks()];let e=await js(_t);return[e,Ks(e)]},Qs=(G$(),Yi(Am)).default,Bm=async(e,t,r,i)=>{let n=Qs&&!(e||t);if(n)if(_t)n=wn(_t);else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Qs];{let s="ort-wasm-simd-threaded.jsep.mjs",a=e??kd(s,t),o=r&&a&&!wn(a,t),u=o?await js(a):a??Cd(s,t);return[o?u:void 0,await zd(u)]}}}),Zs,bn,xi,Ys,Ad,Od,Rd,Po,Le,Xr=Q(()=>{Do(),bn=!1,xi=!1,Ys=!1,Ad=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Od=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Rd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Po=async e=>{if(bn)return Promise.resolve();if(xi)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ys)throw new Error("previous call to 'initializeWebAssembly()' failed.");xi=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Rd())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Od())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Ad();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,s=typeof n=="string"?n:void 0,a=n?.mjs,o=a?.href??a,u=n?.wasm,d=u?.href??u,c=e.wasmBinary,[f,h]=await Bm(o,s,r>1,!!c||!!d),y=!1,_=[];if(t>0&&_.push(new Promise(w=>{setTimeout(()=>{y=!0,w()},t)})),_.push(new Promise((w,T)=>{let v={numThreads:r};if(c)v.wasmBinary=c;else if(d||s)v.locateFile=b=>d??s+b;else if(o&&o.indexOf("blob:")!==0)v.locateFile=b=>new URL(b,o).href;else if(f){let b=Rm();b&&(v.locateFile=I=>b+I)}h(v).then(b=>{xi=!1,bn=!0,Zs=b,w(),f&&URL.revokeObjectURL(f)},b=>{xi=!1,Ys=!0,T(b)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Le=()=>{if(bn&&Zs)return Zs;throw new Error("WebAssembly is not initialized yet.")}}),Dt,Gn,Re,Uo=Q(()=>{Xr(),Dt=(e,t)=>{let r=Le(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Gn=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,s])=>{let a=t?t+n:n;if(typeof s=="object")Gn(s,a+".",r,i);else if(typeof s=="string"||typeof s=="number")i(a,s.toString());else if(typeof s=="boolean")i(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},Re=e=>{let t=Le(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let s=Number(t.getValue(n,i===4?"i32":"i64")),a=t.getValue(n+i,"*"),o=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Nm,F$=Q(()=>{Xr(),Uo(),Nm=e=>{let t=Le(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Dt(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),r===0&&Re("Can't create run options."),e?.extra!==void 0&&Gn(e.extra,"",new WeakSet,(a,o)=>{let u=Dt(a,i),d=Dt(o,i);t._OrtAddRunConfigEntry(r,u,d)!==0&&Re(`Can't set a run config entry: ${a} - ${o}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(a=>t._free(a)),s}}}),Md,Bd,Nd,Si,Dd,Dm,j$=Q(()=>{Xr(),Uo(),Md=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Bd=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Nd=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Si=(e,t,r,i)=>{let n=Dt(t,i),s=Dt(r,i);Le()._OrtAddSessionConfigEntry(e,n,s)!==0&&Re(`Can't set a session config entry: ${t} - ${r}.`)},Dd=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let s=typeof n=="string"?n:n.name,a=[];switch(s){case"webnn":if(s="WEBNN",typeof n!="string"){let f=n?.deviceType;f&&Si(e,"deviceType",f,r)}break;case"webgpu":if(s="JS",typeof n!="string"){let f=n;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Si(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=Dt(s,r),u=a.length,d=0,c=0;if(u>0){d=Le()._malloc(u*Le().PTR_SIZE),r.push(d),c=Le()._malloc(u*Le().PTR_SIZE),r.push(c);for(let f=0;f<u;f++)Le().setValue(d+f*Le().PTR_SIZE,a[f][0],"*"),Le().setValue(c+f*Le().PTR_SIZE,a[f][1],"*")}await Le()._OrtAppendExecutionProvider(e,o,d,c,u)!==0&&Re(`Can't append execution provider: ${s}.`)}},Dm=async e=>{let t=Le(),r=0,i=[],n=e||{};Nd(n);try{let s=Md(n.graphOptimizationLevel??"all"),a=Bd(n.executionMode??"sequential"),o=typeof n.logId=="string"?Dt(n.logId,i):0,u=n.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof n.optimizedModelFilePath=="string"?Dt(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!n.enableCpuMemArena,!!n.enableMemPattern,a,!!n.enableProfiling,0,o,u,d,c),r===0&&Re("Can't create session options."),n.executionProviders&&await Dd(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);Si(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[f,h]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let y=Dt(f,i);t._OrtAddFreeDimensionOverride(r,y,h)!==0&&Re(`Can't set a free dimension override: ${f} - ${h}.`)}return n.extra!==void 0&&Gn(n.extra,"",new WeakSet,(f,h)=>{Si(r,f,h,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Re("Can't release session options."),i.forEach(a=>t._free(a)),s}}}),qr,dr,Vr,os,Fn,Lo,Wo,Ya,fe=Q(()=>{qr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},dr=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Vr=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,s)=>n*s,1);return r>0?Math.ceil(i*r):void 0},os=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Fn=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Lo=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Wo=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ya=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),qo,Pm=Q(()=>{No(),qo=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let a=0;for(;;){let{done:o,value:u}=await n.read();if(o)break;let d=u.byteLength;new Uint8Array(s,a,d).set(u),a+=d}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Pd,Ud,Ld,Wd,Vo,qd,Ee,gr=Q(()=>{fe(),Pd=["V","I","W","E","F"],Ud=(e,t)=>{console.log(`[${Pd[e]},${new Date().toISOString()}]${t}`)},Vo=(e,t)=>{Ld=e,Wd=t},qd=(e,t)=>{let r=Fn(e),i=Fn(Ld);r>=i&&Ud(r,typeof t=="function"?t():t)},Ee=(...e)=>{Wd&&qd(...e)}}),Vd,pi,N,jn,Um,Lm,Wm,ge=Q(()=>{Vd=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},pi=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let s=Math.max(e.length,t.length),a=new Array(s);if(r){if(i<2||n<2)return;let o=Vd.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[a[s-2],a[s-1]]=o}for(let o=r?3:1;o<=s;o++){let u=i-o<0?1:e[i-o],d=n-o<0?1:t[n-o];if(u!==d&&u>1&&d>1)return;let c=Math.max(u,d);if(u&&d)a[s-o]=Math.max(u,d);else{if(c>1)return;a[s-o]=0}}return a}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},N=class Bn{static size(t){return Bn.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){n[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");n[s]=1,r/=t[s],s--}for(s--;s>=0;s--)n[s]=t[s];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Bn.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Bn.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[s])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,s)=>n+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},jn=class Bi{static adjustPoolAttributes(t,r,i,n,s,a){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<i.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=i[o]||a[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,s,a,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)Bi.adjustPadAndReturnShape(t[u+(a?1:2)],r[u],i[u],n[u],s,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,n,s,a,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return Bi.computeShapeHelper(t,r,u,i,n,s,a,o),u}static computeConvOutputShape(t,r,i,n,s,a,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return Bi.computeShapeHelper(!1,t,u,i,n,s,a,o),u}static computeShapeHelper(t,r,i,n,s,a,o,u){if(t)for(let d=0;d<r.length-2;d++)i.push(1);else for(let d=0;d<r.length-2;d++)i.push(Bi.adjustPadAndReturnShape(r[d+2],n[d],s[d],a[d],o,d,d+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,n,s,a,o,u){let d=i*(n-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return s[a]=0,s[o]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+n-t;return s[a]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),s[o]=c-s[a],Math.floor((t+c-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[a]+s[o]-d)/r+1)}},Um=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,o;t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==a)throw new Error("dimension mismatch");if(s<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(n&&!pi.isValidBroadcast(n,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,a]}},Lm=-34028234663852886e22,Wm=34028234663852886e22}),Ho,qm=Q(()=>{fe(),Ho=(e,t)=>new(os(t))(e)}),Xs,Xa,Js,Hd,ea,Gd,ta,ra,ia,Fd,Vm,K$=Q(()=>{fe(),gr(),Xs=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Xa=(e,t)=>{if(t==="int32")return e;let r=Xs.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,s=new(os(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let a=new Int32Array(n);for(let o=0;o<n;o++){let u=s[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[o]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Js=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Hd=1,ea=()=>Hd++,Gd=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ta=(e,t)=>{let r=Xs.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},ra=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ta(this.dataType,this.tensorShape)}destroy(){Ee("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Js(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},ia=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),a;if(!s?.input.dataTypes.includes(t)){if(a=Gd.get(t),!a||s?.input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${t}`);Ee("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ta(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Xa(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ee("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Js(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Fd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ea();return this.tensorTrackersById.set(e,new ia(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){Ee("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Ee("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),s=ea(),a=new ra({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new ia(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,r,i,n,s,a){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,r)){Ee("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}Ee("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let u=await o.createTensor({dataType:a??t,shape:r,dimensions:r,usage:i,writable:n,readable:s});return new ra({sessionId:e,context:o,tensor:u,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Vm=(...e)=>new Fd(...e)}),Ti,jd,Hm,Q$=Q(()=>{fe(),Xr(),qm(),K$(),gr(),Ti=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),jd=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,s)=>n===i[s]&&e[n]===t[n])},Hm=class{constructor(e){this.tensorManager=Vm(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Vo(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ee("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ee("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Ee("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>jd(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ee("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let s=Ti.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,n)}async createTemporaryTensor(e,t,r){Ee("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=Ti.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!Le().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ee("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ho(r,t)}}registerMLTensor(e,t,r,i){let n=Ti.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,n,i);return Ee("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,i,n,s,a=!1){if(!s)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=s.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(t,t+r).buffer,c;switch(n.dataType){case"float32":c=new Float32Array(d);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":c=new Int32Array(d);break;case"uint32":c=new Uint32Array(d);break;case"int64":if(a){let f=Xa(new Uint8Array(d),"int64");c=new Int32Array(f.buffer),n.dataType="int32"}else c=new BigInt64Array(d);break;case"uint64":c=new BigUint64Array(d);break;case"int8":c=new Int8Array(d);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return Ee("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=Ti.get(qr(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),Go=Q(()=>{}),na,vn,$n,Kd,Qd,sa,Ja,Zd,Gm,Z$=Q(()=>{gr(),Go(),na=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),vn=[],$n=e=>Math.ceil(Number(e)/16)*16,Kd=e=>{for(let t=0;t<vn.length;t++){let r=vn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Qd=1,sa=()=>Qd++,Ja=async(e,t,r,i)=>{let n=$n(r),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,r)),u}else return new Uint8Array(o.slice(0,r))}finally{s.destroy()}},Zd=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of na)vn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,s=$n(n),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${n}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,n)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([d.finish()]),o.destroy(),Ee("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=$n(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return Ee("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=sa();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),Ee("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ee("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Kd(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let a={id:sa(),type:0,buffer:i};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),Ee("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ee("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Ja(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=na.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ee("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Gm=(...e)=>new Zd(...e)}),Yd,Ae,je=Q(()=>{Yd=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ae=e=>new Yd(e)}),fi,xn,Xe,ut,de,Fe,eo,si,Cr,ue,Ii,P,ae,Fm,Fo,Xd,jm,ye=Q(()=>{fe(),ge(),fi=64,xn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Xe=(e,t=1)=>{let r=xn(e,t);return typeof r=="string"?r:r[0]},ut=(e,t=1)=>{let r=xn(e,t);return typeof r=="string"?r:r[1]},de=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:N.computeStrides(r)})}),t},Fe=e=>e%4===0?4:e%2===0?2:1,eo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,si=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Cr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ue=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Ii=(e,t,r,i,n)=>{let s=typeof r=="number",a=s?r:r.length,o=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,d=xn(t,n),c=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],h={indices:u,value:c,storage:f,tensor:t},y=U=>typeof U=="string"?U:`${U}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=s?"uniforms.":"",T=`${w}${e}_shape`,v=`${w}${e}_strides`,b="";for(let U=0;U<a-1;U++)b+=`
    let dim${U} = current / ${ue(v,U,a)};
    let rest${U} = current % ${ue(v,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;b+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=U=>(_.offsetToIndices=!0,a<2?U:`o2i_${e}(${U})`),k=[];if(a>=2)for(let U=a-1;U>=0;U--)k.push(`${ue(v,U,a)} * (indices[${U}])`);let R=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${k.join("+")};
  }`,O=U=>(_.indicesToOffset=!0,a<2?U:`i2o_${e}(${U})`),x=(...U)=>a===0?"0u":`${h.indices}(${U.map(y).join(",")})`,q=(U,Y)=>a<2?`${U}`:`${ue(U,Y,a)}`,G=(U,Y,pe)=>a<2?`${U}=${pe};`:`${ue(U,Y,a)}=${pe};`,oe={},W=(U,Y)=>{_.broadcastedIndicesToOffset=!0;let pe=`${Y.name}broadcastedIndicesTo${e}Offset`;if(pe in oe)return`${pe}(${U})`;let ve=[];for(let st=a-1;st>=0;st--){let Ze=Y.indicesGet("outputIndices",st+Y.rank-a);ve.push(`${q(v,st)} * (${Ze} % ${q(T,st)})`)}return oe[pe]=`fn ${pe}(outputIndices: ${Y.type.indices}) -> u32 {
             return ${ve.length>0?ve.join("+"):"0u"};
           }`,`${pe}(${U})`},j=(U,Y)=>(()=>{if(h.storage===h.value)return`${e}[${U}]=${Y};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${Y}), select(0u, 0xFFFFFFFFu, ${Y} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${Y}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Y}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),M=U=>(()=>{if(h.storage===h.value)return`${e}[${U}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${U}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${U}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),L=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${c} {
    return ${M(`i2o_${e}(indices)`)};
  }`,Z=a<2?"":(()=>{let U=o.map(pe=>`d${pe}: u32`).join(", "),Y=o.map(pe=>`d${pe}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${x(Y)});
  }`})(),ie=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let Y=U.map(y).join(",");return a===0?M("0u"):a===1?M(Y[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${Y})`)},X=U=>a<2?M(U):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${U})`),le=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${c}) {
    ${j(`i2o_${e}(indices)`,"value")}
  }`,Se=a<2?"":(()=>{let U=o.map(pe=>`d${pe}: u32`).join(", "),Y=o.map(pe=>`d${pe}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${x(Y)}, value);
  }`})();return{impl:()=>{let U=[],Y=!1;return _.offsetToIndices&&(U.push(I),Y=!0),_.indicesToOffset&&(U.push(R),Y=!0),_.broadcastedIndicesToOffset&&(Object.values(oe).forEach(pe=>U.push(pe)),Y=!0),_.set&&(U.push(Se),Y=!0),_.setByIndices&&(U.push(le),Y=!0),_.get&&(U.push(Z),Y=!0),_.getByIndices&&(U.push(L),Y=!0),!s&&Y&&U.unshift(`const ${T} = ${h.indices}(${r.join(",")});`,`const ${v} = ${h.indices}(${N.computeStrides(r).join(",")});`),U.join(`
`)},type:h,offsetToIndices:S,indicesToOffset:O,broadcastedIndicesToOffset:W,indices:x,indicesGet:q,indicesSet:G,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let Y=U[a];if(typeof Y!="string")throw new Error("value must be string");let pe=U.slice(0,a).map(y).join(",");return a===0?j("0u",Y):a===1?j(pe[0],Y):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${pe}, ${Y})`)},setByOffset:j,setByIndices:(U,Y)=>a<2?j(U,Y):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${Y});`),get:ie,getByOffset:M,getByIndices:X,usage:i,name:e,strides:v,shape:T,rank:a}},P=(e,t,r,i=1)=>Ii(e,t,r,"input",i),ae=(e,t,r,i=1)=>Ii(e,t,r,"output",i),Fm=(e,t,r)=>Ii(e,t,r,"atomicOutput",1),Fo=(e,t,r,i=1)=>Ii(e,t,r,"internal",i),Xd=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=fi){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},jm=(e,t)=>new Xd(e,t)}),Jd,aa,ec,tc,rc,ic,vt,Km,Qm,zr=Q(()=>{fe(),ge(),je(),ye(),Jd=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},aa=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ec=(e,t)=>N.sortBasedOnPerm(e,aa(e.length,t)),tc=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)n+=`a[${e[s]}]=i[${s}];`;return n+="return a;}"},rc=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},ic=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},vt=(e,t)=>{let r=e.dataType,i=e.dims.length,n=aa(i,t),s=ec(e.dims,n),a=e.dims,o=s,u=i<2||ic(n,e.dims),d;if(u)return d=_=>{let w=P("input",r,a,4),T=ae("output",r,o,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,T)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=N.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:d};let{newShape:c,newPerm:f}=rc(e.dims,n),h=N.areEqual(f,[2,3,1]),y=N.areEqual(f,[3,1,2]);if(c.length===2||h||y){a=h?[c[0],c[1]*c[2]]:y?[c[0]*c[1],c[2]]:c,o=[a[1],a[0]];let _=16;return d=w=>{let T=P("a",r,a.length),v=ae("output",r,o.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(T,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${_+1}>, ${_}>;
  ${w.mainStart([_,_,1])}
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
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=N.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/_),y:Math.ceil(o[0]/_)},programUniforms:[{type:12,data:w},...de(a,o)]}},getShaderSource:d}}return d=_=>{let w=P("a",r,a.length),T=ae("output",r,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,T)}

  ${tc(n,i,w,T)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=N.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...de(a,o)]}},getShaderSource:d}},Km=(e,t)=>{Jd(e.inputs,t.perm),e.compute(vt(e.inputs[0],t.perm))},Qm=e=>Ae({perm:e.perm})}),nc,sc,ac,oc,uc,lc,dc,cc,pc,fc,Ot,Zm,Ym,Xm,Jm,eg,tg,rg,ig,ng,sg,Y$=Q(()=>{fe(),ge(),ye(),jo(),zr(),nc={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},sc={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ac={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},oc={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},uc=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},lc=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let n=t.map(s=>e[s]);return[r,n]},dc=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[n++]):i.push(1);return i},cc=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},pc=(e,t)=>{let r=[];if(!cc(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},fc=(e,t,r,i,n,s,a)=>{let o=r[0].dims,u=N.size(s),d=N.size(a),c=P("_A",r[0].dataType,o),f=ae("output",n,s),h=64;u===1&&(h=256);let y=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,_=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ac[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${nc[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${sc[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${oc[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},Ot=(e,t,r,i)=>{let n=e.inputs.length===1?r:to(e.inputs,r),s=n.axes;s.length===0&&!n.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,_)=>_));let a=N.normalizeAxes(s,e.inputs[0].dims.length),o=a,u=e.inputs[0],d=pc(o,e.inputs[0].dims.length);d.length>0&&(u=e.compute(vt(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=uc(o.length,u.dims.length));let[c,f]=lc(u.dims,o),h=c;n.keepDims&&(h=dc(c,a)),e.compute(fc(t,n.cacheKey,[u],i,e.inputs[0].dataType,h,f),{inputs:[u]})},Zm=(e,t)=>{Ot(e,"ReduceMeanShared",t,"mean")},Ym=(e,t)=>{Ot(e,"ReduceL1Shared",t,"l1")},Xm=(e,t)=>{Ot(e,"ReduceL2Shared",t,"l2")},Jm=(e,t)=>{Ot(e,"ReduceLogSumExpShared",t,"logSumExp")},eg=(e,t)=>{Ot(e,"ReduceMaxShared",t,"max")},tg=(e,t)=>{Ot(e,"ReduceMinShared",t,"min")},rg=(e,t)=>{Ot(e,"ReduceProdShared",t,"prod")},ig=(e,t)=>{Ot(e,"ReduceSumShared",t,"sum")},ng=(e,t)=>{Ot(e,"ReduceSumSquareShared",t,"sumSquare")},sg=(e,t)=>{Ot(e,"ReduceLogSumShared",t,"logSum")}}),Rt,hc,Kn,to,Mt,mc,gc,yc,_c,wc,bc,vc,$c,xc,Sc,Bt,ag,og,ug,lg,dg,cg,pg,fg,hg,mg,jo=Q(()=>{fe(),ge(),je(),ye(),Y$(),Rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},hc=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Kn=(e,t,r,i,n,s,a=!1,o=!1)=>{let u=[],d=r[0].dims,c=d.length,f=N.normalizeAxes(n,c),h=!o&&f.length===0;d.forEach((w,T)=>{h||f.indexOf(T)>=0?a&&u.push(1):u.push(w)});let y=u.length,_=N.size(u);return{name:e,shaderCache:t,getShaderSource:w=>{let T=[],v=P("_A",r[0].dataType,c),b=ae("output",s,y),I=i(v,b,f),S=I[2];for(let k=0,R=0;k<c;k++)h||f.indexOf(k)>=0?(a&&R++,S=`for(var j${k}: u32 = 0; j${k} < ${d[k]}; j${k}++) {
                  ${I[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${v.indicesSet("input_indices",k,`j${k}`)}
                  ${S}
                }`):(T.push(`${v.indicesSet("input_indices",k,b.indicesGet("output_indices",R))};`),R++);return`

        ${w.registerUniform("output_size","u32").declareVariables(v,b)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${S}
          ${I[3]}
          ${I.length===4?b.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...de(d,u)]})}},to=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),Ae({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Mt=(e,t,r,i)=>{let n=e.inputs,s=n.length===1?r:to(n,r);e.compute(Kn(t,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&s.axes.length===0?hc:i,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},mc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},gc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},yc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},_c=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},wc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceMax",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},bc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceMean",t,(r,i,n)=>{let s=1;for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},vc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceMin",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},$c=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},xc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Sc=(e,t)=>{Rt(e.inputs),Mt(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Bt=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:n*=e[s];return n<32&&i>1024},ag=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bc(e,t):Zm(e,t)},og=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gc(e,t):Ym(e,t)},ug=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yc(e,t):Xm(e,t)},lg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_c(e,t):Jm(e,t)},dg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wc(e,t):eg(e,t)},cg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vc(e,t):tg(e,t)},pg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$c(e,t):rg(e,t)},fg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xc(e,t):ig(e,t)},hg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sc(e,t):ng(e,t)},mg=(e,t)=>{Bt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mc(e,t):sg(e,t)}}),oa,gg,yg,ro,X$=Q(()=>{fe(),je(),jo(),oa=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},gg=(e,t)=>{oa(e.inputs);let r=(i,n,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Kn("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},yg=(e,t)=>{oa(e.inputs);let r=(i,n,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Kn("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ro=e=>Ae(e)}),Tc,Sn,Ic,Ec,kc,Xi,Cc,_g,Ko=Q(()=>{fe(),ge(),Go(),ye(),Tc=(e,t)=>{let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5];if(a&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],d=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,h=f,y=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=d;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+h+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(a){if(h!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=a.dims[3])}let T=_+w,v=-1,b=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Sn=(e,t,r)=>t&&e?`
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
    `,Ic=(e,t,r,i,n,s,a,o)=>{let u=Fe(a?1:s),d=64,c=s/u;c<d&&(d=32);let f=Math.ceil(s/u/d),h=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:f}],y=Xe(e.dataType,u),_=ut(1,u),w=["type"];a&&w.push("type"),o&&w.push("type");let T=v=>{let b=ae("x",e.dataType,e.dims,u),I=[b],S=a?P("seq_lens",a.dataType,a.dims):void 0;S&&I.push(S);let k=o?P("total_sequence_length_input",o.dataType,o.dims):void 0;k&&I.push(k);let R=ut(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(O).declareVariables(...I)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Sn(S,k,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${R}(1.0) / ${R}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${R}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${u}`,inputDependencies:w},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:h})}},Ec=(e,t,r,i,n,s,a,o,u)=>{let d=a+s.kvSequenceLength,c=[s.batchSize,s.numHeads,s.sequenceLength,d],f=e>1&&i,h=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=f?[s.batchSize,h,d,s.headSize]:void 0,_=s.nReps?s.nReps:1,w=s.scale===0?1/Math.sqrt(s.headSize):s.scale,T=Fe(s.headSize),v=s.headSize/T,b=12,I={x:Math.ceil(d/b),y:Math.ceil(s.sequenceLength/b),z:s.batchSize*s.numHeads},S=[{type:12,data:s.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:w},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:_}],k=f&&i&&N.size(i.dims)>0,R=["type","type"];k&&R.push("type"),n&&R.push("type"),o&&R.push("type"),u&&R.push("type");let O=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&O.push({dims:y,dataType:t.dataType,gpuDataType:0});let x=q=>{let G=P("q",t.dataType,t.dims,T),oe=P("key",r.dataType,r.dims,T),W=[G,oe];if(k){let le=P("past_key",i.dataType,i.dims,T);W.push(le)}n&&W.push(P("attention_bias",n.dataType,n.dims));let j=o?P("seq_lens",o.dataType,o.dims):void 0;j&&W.push(j);let M=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;M&&W.push(M);let L=ae("output",t.dataType,c),Z=[L];f&&Z.push(ae("present_key",t.dataType,y,T));let ie=ut(1,T),X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${G.type.storage}, ${b*b}>;
  ${q.registerUniforms(X).declareVariables(...W,...Z)}
  ${q.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Sn(j,M,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ie}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&f?`
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
          value += ${ie}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${L.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${n!==void 0};${i!==void 0};${e}`,inputDependencies:R},getRunData:()=>({outputs:O,dispatchGroup:I,programUniforms:S}),getShaderSource:x}},kc=(e,t,r,i,n,s,a=void 0,o=void 0)=>{let u=s+n.kvSequenceLength,d=n.nReps?n.nReps:1,c=n.vHiddenSize*d,f=e>1&&i,h=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=f?[n.batchSize,h,u,n.headSize]:void 0,_=[n.batchSize,n.sequenceLength,c],w=12,T={x:Math.ceil(n.vHeadSize/w),y:Math.ceil(n.sequenceLength/w),z:n.batchSize*n.numHeads},v=[{type:12,data:n.sequenceLength},{type:12,data:u},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:d}],b=f&&i&&N.size(i.dims)>0,I=["type","type"];b&&I.push("type"),a&&I.push("type"),o&&I.push("type");let S=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let k=R=>{let O=P("probs",t.dataType,t.dims),x=P("v",r.dataType,r.dims),q=[O,x];b&&q.push(P("past_value",i.dataType,i.dims));let G=a?P("seq_lens",a.dataType,a.dims):void 0;a&&q.push(G);let oe=o?P("total_sequence_length_input",o.dataType,o.dims):void 0;o&&q.push(oe);let W=[ae("output",t.dataType,_)];f&&W.push(ae("present_value",t.dataType,y));let j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${O.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${O.type.value}, ${w*w}>;
  ${R.registerUniforms(j).declareVariables(...q,...W)}
  ${R.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Sn(G,oe,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:S,dispatchGroup:T,programUniforms:v}),getShaderSource:k}},Xi=(e,t,r,i,n,s,a,o,u,d,c=void 0,f=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(o?1:0)),y=h>1?d.pastSequenceLength:0,_=y+d.kvSequenceLength,w=u&&N.size(u.dims)>0?u:void 0,T=[t,r];h>1&&a&&N.size(a.dims)>0&&T.push(a),w&&T.push(w),c&&T.push(c),f&&T.push(f);let v=e.compute(Ec(h,t,r,a,w,d,y,c,f),{inputs:T,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Ic(v,d.batchSize,d.numHeads,y,d.sequenceLength,_,c,f),{inputs:c&&f?[v,c,f]:[v],outputs:[]});let b=[v,i];h>1&&o&&N.size(o.dims)>0&&b.push(o),c&&b.push(c),f&&b.push(f),e.compute(kc(h,v,i,o,d,y,c,f),{inputs:b,outputs:h>1?[0,2]:[0]})},Cc=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,s=t.headSize,a=12,o={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let h=ae("output_q",u[0].dataType,r),y=ae("output_k",u[0].dataType,r),_=ae("output_v",u[0].dataType,r),w=P("input",u[0].dataType,u[0].dims),T=P("weight",u[1].dataType,u[1].dims),v=P("bias",u[2].dataType,u[2].dims),b=w.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${b}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${b}, ${a*a}>;
  var<workgroup> tileWeightK: array<${b}, ${a*a}>;
  var<workgroup> tileWeightV: array<${b}, ${a*a}>;
  ${f.registerUniforms(I).declareVariables(w,T,v,h,y,_)}
  ${f.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},_g=(e,t)=>{let r=Tc(e.inputs,t),[i,n,s]=Cc(e,r);return Xi(e,i,n,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),zc,Ac,Oc,wg,J$=Q(()=>{Ct(),fe(),ge(),je(),ye(),zc=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,s)=>{let a=n.length;if(a!==i.length)throw new Error(`${s}: num dimensions != ${a}`);n.forEach((o,u)=>{if(o!==i[u])throw new Error(`${s}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Ac=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,s=e[0].dims,a=i?Fe(s[s.length-1]):1,o=n==="NHWC"&&s.length>1?a:1,u=N.size(s)/a,d=i,c=d?s.length:s,f=P("x",e[0].dataType,e[0].dims,a),h=P("scale",e[1].dataType,e[1].dims,o),y=P("bias",e[2].dataType,e[2].dims,o),_=P("inputMean",e[3].dataType,e[3].dims,o),w=P("inputVar",e[4].dataType,e[4].dims,o),T=ae("y",e[0].dataType,c,a),v=()=>{let I="";if(i)I=`let cOffset = ${s.length===1?"0u":n==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(n==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let S=1;S<h.rank;S++)I+=`cIndices[${S}] = outputIndices[${S}];`;I+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return I},b=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(f,h,y,_,w,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${v()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${a}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...de(s)]:[{type:12,data:u}]})}},Oc=e=>Ae(e),wg=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Oc({...t,outputCount:i});if(Ue.webgpu.validateInputContent&&zc(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ac(r,n))}}),Rc,Mc,bg,e1=Q(()=>{ge(),ye(),Rc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Mc=e=>{let t=e[0].dims,r=e[0].dims[2],i=N.size(t)/4,n=e[0].dataType,s=P("input",n,t,4),a=P("bias",n,[r],4),o=P("residual",n,t,4),u=ae("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(s,a,o,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},bg=e=>{Rc(e.inputs),e.compute(Mc(e.inputs))}}),Bc,ze,vg,$g,xg,Sg,Tg,Ig,Eg,kg,Cg,Nc,zg,Ag,Og,Rg,Ni,Mg,Nn,Bg,Ng,Dg,Pg,Ug,Lg,Wg,qg,Vg,Hg,Gg,Fg,jg,Kg,Qg,Zg,ua,Yg,io,no,Xg,Jg,ey,Dc,Pc,ty,Qo=Q(()=>{fe(),ge(),je(),ye(),Bc=(e,t,r,i,n,s,a)=>{let o=Math.ceil(t/4),u="";typeof n=="string"?u=`${n}(a)`:u=n("a");let d=P("inputData",r,[o],4),c=ae("outputData",i,[o],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${e.registerUniforms(f).declareVariables(d,c)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},ze=(e,t,r,i,n,s=e.dataType,a,o)=>{let u=[{type:12,data:Math.ceil(N.size(e.dims)/4)}];return a&&u.push(...a),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>Bc(d,N.size(e.dims),e.dataType,s,r,i,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(N.size(d[0].dims)/64/4)},programUniforms:u})}},vg=e=>{e.compute(ze(e.inputs[0],"Abs","abs"))},$g=e=>{e.compute(ze(e.inputs[0],"Acos","acos"))},xg=e=>{e.compute(ze(e.inputs[0],"Acosh","acosh"))},Sg=e=>{e.compute(ze(e.inputs[0],"Asin","asin"))},Tg=e=>{e.compute(ze(e.inputs[0],"Asinh","asinh"))},Ig=e=>{e.compute(ze(e.inputs[0],"Atan","atan"))},Eg=e=>{e.compute(ze(e.inputs[0],"Atanh","atanh"))},kg=e=>Ae(e),Cg=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ze(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Nc=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Ae({min:t,max:r})},zg=(e,t)=>{let r=t||Nc(e.inputs),i=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Ag=e=>{e.compute(ze(e.inputs[0],"Ceil","ceil"))},Og=e=>{e.compute(ze(e.inputs[0],"Cos","cos"))},Rg=e=>{e.compute(ze(e.inputs[0],"Cosh","cosh"))},Ni=e=>Ae(e),Mg=(e,t)=>{let r=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Nn=(e="f32")=>`
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
}`,Bg=e=>{let t=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Nn(t)))},Ng=e=>{e.compute(ze(e.inputs[0],"Exp","exp"))},Dg=e=>{e.compute(ze(e.inputs[0],"Floor","floor"))},Pg=e=>{let t=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Nn(t)))},Ug=(e,t)=>{let r=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Lg=e=>{e.compute(ze(e.inputs[0],"Not",t=>`!${t}`))},Wg=e=>{e.compute(ze(e.inputs[0],"Neg",t=>`-${t}`))},qg=e=>{e.compute(ze(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Vg=e=>{let t=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Hg=e=>{e.compute(ze(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Gg=e=>Ae(e),Fg=(e,t)=>{let r=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},jg=e=>{e.compute(ze(e.inputs[0],"Sin","sin"))},Kg=e=>{e.compute(ze(e.inputs[0],"Sinh","sinh"))},Qg=e=>{e.compute(ze(e.inputs[0],"Sqrt","sqrt"))},Zg=e=>{e.compute(ze(e.inputs[0],"Tan","tan"))},ua=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Yg=e=>{e.compute(ze(e.inputs[0],"Tanh",ua))},io=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ua("v")};
}
`,no=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Xg=e=>{let t=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"FastGelu",no,io(t),void 0,e.inputs[0].dataType))},Jg=(e,t)=>{let r=ut(e.inputs[0].dataType);return e.compute(ze(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ey=e=>{e.compute(ze(e.inputs[0],"Log","log"))},Dc=(e,t)=>`
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
`,Pc=e=>`quick_gelu_impl(${e})`,ty=(e,t)=>{let r=ut(e.inputs[0].dataType);e.compute(ze(e.inputs[0],"QuickGelu",Pc,Dc(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Uc,Lc,ry,t1=Q(()=>{ge(),ye(),Qo(),Uc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Lc=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=P("input",e[0].dataType,e[0].dims,4),i=P("bias",e[0].dataType,[e[0].dims[2]],4),n=ae("output",e[0].dataType,t,4),s=N.size(t)/4,a=Xe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,n)}

  ${Nn(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ry=e=>{Uc(e.inputs),e.compute(Lc(e.inputs))}}),Wc,qc,Nt,iy,ny,sy,ay,oy,uy,ly,dy,cy,py,r1=Q(()=>{fe(),ge(),ye(),Wc=(e,t,r,i,n,s,a,o,u,d,c,f)=>{let h,y;typeof o=="string"?h=y=(b,I)=>`${o}((${b}),(${I}))`:typeof o=="function"?h=y=o:(h=o.scalar,y=o.vector);let _=ae("outputData",c,i.length,4),w=P("aData",u,t.length,4),T=P("bData",d,r.length,4),v;if(n)if(s){let b=N.size(t)===1,I=N.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,k=r.length>0&&r[r.length-1]%4===0;b||I?v=_.setByOffset("global_idx",y(b?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(a||S?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||k?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=_.setByOffset("global_idx",y(w.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(I,S,k="")=>{let R=`aData[indexA${S}][componentA${S}]`,O=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${_.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${w.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let offsetB${S} = ${T.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${I}[${S}] = ${k}(${h(R,O)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,T,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},qc=(e,t,r,i,n,s,a=r.dataType)=>{let o=r.dims.map(Number),u=i.dims.map(Number),d=!N.areEqual(o,u),c=o,f=N.size(o),h=!1,y=!1,_=[d];if(d){let w=pi.calcShape(o,u,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");c=w.slice(),f=N.size(c);let T=N.size(o)===1,v=N.size(u)===1,b=o.length>0&&o[o.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;_.push(T),_.push(v),_.push(b),_.push(I);let S=1;for(let k=1;k<c.length;k++){let R=o[o.length-k],O=u[u.length-k];if(R===O)S*=R;else break}S%4===0?(y=!0,h=!0):(T||v||b||I)&&(h=!0)}else h=!0;return _.push(h),{name:e,shaderCache:{hint:t+_.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Wc(w,o,u,c,h,d,y,n,r.dataType,i.dataType,a,s),getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(N.size(c)/4)},...de(o,u,c)]})}},Nt=(e,t,r,i,n,s)=>{e.compute(qc(t,n??"",e.inputs[0],e.inputs[1],r,i,s))},iy=e=>{Nt(e,"Add",(t,r)=>`${t}+${r}`)},ny=e=>{Nt(e,"Div",(t,r)=>`${t}/${r}`)},sy=e=>{Nt(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ay=e=>{Nt(e,"Mul",(t,r)=>`${t}*${r}`)},oy=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Nt(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},uy=e=>{Nt(e,"Sub",(t,r)=>`${t}-${r}`)},ly=e=>{Nt(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},dy=e=>{Nt(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},cy=e=>{Nt(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},py=e=>{Nt(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Vc,Hc,Gc,Fc,fy,hy,i1=Q(()=>{fe(),ge(),je(),ye(),Vc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,s=i.dims.length;e.forEach((a,o)=>{if(o!==r){if(a.dataType!==n)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((u,d)=>{if(d!==t&&u!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Hc=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Gc=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let s=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(s):n===0?i.push(`if (inputIndex == ${n}u) { ${s} }`):n===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${n}) { ${s} }`)}return i.join(`
`)},Fc=(e,t,r,i)=>{let n=N.size(r),s=new Array(e.length),a=new Array(e.length),o=0,u=[],d=[],c=[{type:12,data:n}];for(let w=0;w<e.length;++w)o+=e[w].dims[t],s[w]=o,d.push(e[w].dims.length),a[w]=P(`input${w}`,i,d[w]),u.push("rank"),c.push({type:12,data:s[w]});for(let w=0;w<e.length;++w)c.push(...de(e[w].dims));c.push(...de(r));let f=ae("output",i,r.length),h=f.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),_=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)w.registerUniform(`sizeInConcatAxis${T}`,"u32");return w.declareVariables(...a,f)})()}

  ${Hc(s.length,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Gc(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:_}},fy=(e,t)=>{let r=e.inputs,i=r[0].dims,n=N.normalizeAxis(t.axis,i.length);Vc(r,n);let s=i.slice();s[n]=r.reduce((o,u)=>o+(u.dims.length>n?u.dims[n]:0),0);let a=r.filter(o=>N.size(o.dims)>0);e.compute(Fc(a,n,s,r[0].dataType),{inputs:a})},hy=e=>Ae({axis:e.axis})}),Kr,Qr,Zr,Zo,Jr=Q(()=>{fe(),ge(),Kr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Qr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Zr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zo=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Lm,Wm];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),et,my,Yo=Q(()=>{et=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},my=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),gy,n1=Q(()=>{gy=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Gi,Xo,Jo=Q(()=>{fe(),ge(),ye(),Jr(),Gi=(e,t,r,i,n)=>{let s=i-r;return`
      ${Array.from({length:r}).map((a,o)=>`
      if (${ue(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,ue(n,o+s,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Xo=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,u=a[a.length-2],d=o[o.length-1],c=a[a.length-1],f=Fe(d),h=Fe(c),y=Fe(u),_=N.size(r)/f/y,w=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),v=[N.size(T),u,d],b=[{type:12,data:_},{type:12,data:u},{type:12,data:d},{type:12,data:c}];Qr(t,b),b.push(...de(T,a,o)),w&&b.push(...de(e[2].dims)),b.push(...de(v));let I=S=>{let k=Fo("batch_dims",e[0].dataType,T.length),R=P("a",e[0].dataType,a.length,h),O=P("b",e[1].dataType,o.length,f),x=ae("output",e[0].dataType,v.length,f),q=Xe(x.type.tensor),G=Kr(t,x.type.value,q),oe=[R,O],W="";if(w){let L=n?f:1;oe.push(P("bias",e[2].dataType,e[2].dims.length,L)),W=`${n?`value += bias[col / ${L}];`:`value += ${x.type.value}(bias[row + i]);`}`}let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Zr(t,j);let M=()=>{let L=`var a_data: ${R.type.value};`;for(let Z=0;Z<h;Z++)L+=`
              let b_data${Z} = b[(b_offset + (k + ${Z}) * uniforms.N + col) / ${f}];`;for(let Z=0;Z<y;Z++){L+=`a_data = a[(a_offset + (row + ${Z}) * uniforms.K + k) / ${h}];`;for(let ie=0;ie<h;ie++)L+=`
            values[${Z}] = fma(${O.type.value}(a_data${h===1?"":`[${ie}]`}), b_data${ie}, values[${Z}]);
`}return L};return`
  ${S.registerUniforms(j).registerInternalVariables(k).declareVariables(...oe,x)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${Gi("a_indices",R,R.rank-2,k.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${Gi("b_indices",O,O.rank-2,k.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${M()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${W}
      ${G}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${h};${y};${n}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:b}),getShaderSource:I}}}),jc,Kc,so,la,Qc,ao,Zc,Qn,eu=Q(()=>{fe(),ge(),ye(),Jr(),Jo(),Yo(),jc=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Kc=(e,t)=>e?`
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
        }`,so=(e,t,r="f32",i,n=!1,s=32,a=!1,o=32)=>{let u=t[1]*e[1],d=t[0]*e[0],c=n?u:s,f=n?s:u,h=c/t[0],y=s/t[1];if(!((n&&h===4&&e[1]===4||!n&&(h===3||h===4))&&c%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${c/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${jc(n,i)}
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
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Kc(n,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},la=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qc=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ao=(e,t,r="f32",i,n=!1,s=32,a=!1,o=32,u=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],f=n?d:s,h=n?s:d;if(!(h%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=h/t[1],_=f/t[0],w=s/t[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${la(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
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
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${la(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
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
      ${Qc(n)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Zc=(e,t,r,i,n=!1)=>{let[s,a,o,u]=i,d=Xe(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${et(e,d)} {
      var value = ${et(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Gi("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${et(e,d)} {
      var value = ${et(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Gi("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${et(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${et(e,d)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Qn=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,u=a.slice(0,-2),d=o.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),f=N.size(c),h=a[a.length-2],y=a[a.length-1],_=o[o.length-1],w=y%4===0&&_%4===0,T=h<=8?[4,1,1]:[4,4,1],v=[8,8,1],b=[Math.ceil(_/v[0]/T[0]),Math.ceil(h/v[1]/T[1]),Math.ceil(f/v[2]/T[2])],I=w?4:1,S=[...u,h,y/I],k=S.length,R=[...d,y,_/I],O=R.length,x=[f,h,_/I],q=[{type:6,data:h},{type:6,data:_},{type:6,data:y}];Qr(t,q),q.push(...de(c,S,R));let G=["rank","rank"],oe=e.length>2;oe&&(q.push(...de(e[2].dims)),G.push("rank")),q.push(...de(x));let W=j=>{let M=c.length,L=Fo("batchDims",e[0].dataType,M,1),Z=Xe(e[0].dataType),ie=P("a",e[0].dataType,k,I),X=P("b",e[1].dataType,O,I),le=ae("result",e[0].dataType,x.length,I),Se=[ie,X];if(oe){let st=n?I:1;Se.push(P("bias",e[2].dataType,e[2].dims.length,st))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Zr(t,U);let Y=Xe(le.type.tensor),pe=Kr(t,le.type.value,Y),ve=Zc(I,oe,pe,[L,ie,X,le],n);return`
  ${j.registerUniforms(U).registerInternalVariables(L).declareVariables(...Se,le)}
  ${ve}
  ${w?so(T,v,Z,L):ao(T,v,Z,L)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${w};${n}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:q}),getShaderSource:W}}}),Yc,yy,s1=Q(()=>{fe(),gr(),ye(),Jr(),Yo(),n1(),eu(),Yc=(e,t,r,i,n=!1,s,a=4,o=4,u=4,d="f32")=>{let c=q=>{switch(q){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},f=q=>{switch(q){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${q} is not supported.`)}},h=e?`
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
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",v=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${et(a,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${w}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(a)}
    }
    return resData;`,I=e?t&&i?`
    let col = colIn * ${a};
    ${b}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${et(a,d)}(0.0);`:i&&r?`
    let col = colIn * ${a};
    ${b}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${et(a,d)}(0.0);`,S=e?i&&r?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${et(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${et(o,d)}(0.0);`,k=et(u,d),R=et(e?a:o,d),O=et(e?o:a,d),x=Kr(s,k,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${e?I:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?S:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${my(n)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},yy=(e,t,r,i,n,s,a,o,u)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],f=r[0],h=d?r[2]:r[3],y=d?r[1]:r[2],_=d?r[3]:r[1],w=d&&(c%4===0||c%3===0)&&_%4===0,T=d?_:h*y,v=d?h*y:_,b=[8,8,1],I=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(T/b[0]/I[0]),Math.ceil(v/b[1]/I[1]),Math.ceil(f/b[2]/I[2])];Ee("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let k=w?d&&c%4!==0?3:4:1,R=b[1]*I[1],O=b[0]*I[0],x=Math.max(b[0]*k,b[1]),q=i%R===0,G=n%O===0,oe=s%x===0,W=w?[k,4,4]:[1,1,1],j=[{type:6,data:i},{type:6,data:n},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Qr(t,j),j.push(...de(e[0].dims,e[1].dims));let M=["rank","rank"];a&&(j.push(...de(e[2].dims)),M.push("rank")),j.push(...de(r));let L=Z=>{let ie=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Zr(t,ie);let X=w?4:1,le=Xe(e[0].dataType),Se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${le}>`:le}) {
        result[flatIndex] = ${w?`vec4<${le}>`:le}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${le}>`:le}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,U=P("x",e[0].dataType,e[0].dims.length,k===3?1:k),Y=P("w",e[1].dataType,e[1].dims.length,X),pe=[U,Y],ve=ae("result",e[0].dataType,r.length,X);if(a){let st=P("bias",e[2].dataType,e[2].dims.length,X);pe.push(st),Se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${le}>`:le} {
          return bias[coords.${d?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${gy("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Z.registerUniforms(ie).declareVariables(...pe,ve)}
        ${Se}
        ${Yc(d,q,G,oe,a,t,W[0],W[1],W[2],le)}
        ${w?so(I,b,le,void 0,!d,x):ao(I,b,le,void 0,!d,x,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${w};${q};${G};${oe};${R};${O};${x}`,inputDependencies:M},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:j}),getShaderSource:L}}}),Xc,da,Ei,Jc,ca,ep,_y,wy,a1=Q(()=>{fe(),gr(),ge(),ye(),Jr(),Yo(),Xc=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},da=e=>typeof e=="number"?[e,e,e]:e,Ei=(e,t)=>t<=1?e:e+(e-1)*(t-1),Jc=(e,t,r,i=1)=>{let n=Ei(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},ca=(e,t,r,i,n)=>{n==null&&(n=Jc(e,t[0],i[0]));let s=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*n>=t[a]&&(s[a]=Math.trunc((e[a]-t[a]+2*n)/i[a]+1));return s},ep=(e,t,r,i,n,s,a,o,u,d)=>{let c,f,h,y;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=ca([t,r,i,1],[o,u,d],1,[n,s,a],e);f=_[0],h=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((w,T,v)=>w===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=ca([t,r,i,1],[o,u,d],1,[n,s,a],e[0]);f=_[0],h=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),h=Math.ceil(r/s),y=Math.ceil(i/a);let _=(f-1)*n+o-t,w=(h-1)*s+u-r,T=(y-1)*a+d-i,v=Math.floor(_/2),b=_-v,I=Math.floor(w/2),S=w-I,k=Math.floor(T/2),R=T-k;c={top:I,bottom:S,left:k,right:R,front:v,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:h,outWidth:y}},_y=(e,t,r,i,n,s=!1,a="channelsLast")=>{let o,u,d,c,f;if(a==="channelsLast")[o,u,d,c,f]=e;else if(a==="channelsFirst")[o,f,u,d,c]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,y,_,w]=t,[T,v,b]=da(r),[I,S,k]=da(i),R=Ei(y,I),O=Ei(_,S),x=Ei(w,k),{padInfo:q,outDepth:G,outHeight:oe,outWidth:W}=ep(n,u,d,c,T,v,b,R,O,x),j=s?h*f:h,M=[0,0,0,0,0];return a==="channelsFirst"?M=[o,j,G,oe,W]:a==="channelsLast"&&(M=[o,G,oe,W,j]),{batchSize:o,dataFormat:a,inDepth:u,inHeight:d,inWidth:c,inChannels:f,outDepth:G,outHeight:oe,outWidth:W,outChannels:j,padInfo:q,strideDepth:T,strideHeight:v,strideWidth:b,filterDepth:y,filterHeight:_,filterWidth:w,effectiveFilterDepth:R,effectiveFilterHeight:O,effectiveFilterWidth:x,dilationDepth:I,dilationHeight:S,dilationWidth:k,inShape:e,outShape:M,filterShape:t}},wy=(e,t,r,i,n,s)=>{let a=s==="channelsLast";a?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],u={x:r.map((T,v)=>v)},d=[Math.ceil(Xc(u.x.map(T=>r[T]))/o[0]),1,1];Ee("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let c=1,f=N.size(r),h=[{type:12,data:f},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Qr(t,h),h.push(...de(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(h.push(...de(e[2].dims)),y.push("rank")),h.push(...de(r));let w=T=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Zr(t,v);let b=1,I=Xe(e[0].dataType),S=P("x",e[0].dataType,e[0].dims.length,c),k=P("W",e[1].dataType,e[1].dims.length,b),R=[S,k],O=ae("result",e[0].dataType,r.length,b),x="";if(_){let oe=P("bias",e[2].dataType,e[2].dims.length,b);R.push(oe),x+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${a?ue("coords",4,5):ue("coords",1,5)}];
        }`}let q=et(c,I),G=Kr(t,q,I);return`
            ${x}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
          ${T.registerUniforms(v).declareVariables(...R,O)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${O.offsetToIndices("global_idx")};
              let batch = ${ue("coords",0,S.rank)};
              let d2 = ${a?ue("coords",S.rank-1,S.rank):ue("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${a?ue("coords",1,S.rank):ue("coords",2,S.rank)},
              ${a?ue("coords",2,S.rank):ue("coords",3,S.rank)},
              ${a?ue("coords",3,S.rank):ue("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?ue("uniforms.x_shape",1,S.rank):ue("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${a?ue("uniforms.x_shape",2,S.rank):ue("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${a?ue("uniforms.x_shape",3,S.rank):ue("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${a?ue("uniforms.x_shape",4,S.rank):ue("uniforms.x_shape",1,S.rank)};
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
                      ${a?`let xValues = vec4<f32>(
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
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
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
                      ${a?`let xValues = vec3<f32>(
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
              ${G}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${c};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:h}),getShaderSource:w}}}),by,vy,o1=Q(()=>{fe(),ge(),ye(),Jr(),by=(e,t,r,i)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",a=e[0].dims,o=e[1].dims,u=t.format==="NHWC",d=u?r[3]:r[1],c=d/t.group,f=u&&c>=4?Fe(d):1,h=N.size(r)/f,y=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Qr(t,y),y.push(...de(a,[o[0],o[1],o[2],o[3]/f]));let _=n?["rank","rank","rank"]:["rank","rank"];y.push(...de([r[0],r[1],r[2],r[3]/f]));let w=T=>{let v=ae("output",e[0].dataType,r.length,f),b=Xe(v.type.tensor),I=Kr(t,v.type.value,b),S=P("x",e[0].dataType,a.length),k=P("w",e[1].dataType,o.length,f),R=[S,k];n&&R.push(P("b",e[2].dataType,e[2].dims,f));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Zr(t,O);let x=u?`
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
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(O).declareVariables(...R,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${x}
    ${s}
    ${I}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:w}},vy=(e,t,r,i)=>{let n=e.length>2,s=Fe(r[3]),a=Fe(r[2]),o=N.size(r)/s/a,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],c=[r[0],r[1],r[2],r[3]/s],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Qr(t,f),f.push(...de(u,d,c));let h=(a-1)*t.strides[1]+d[1],y=_=>{let w=ae("output",e[0].dataType,c.length,s),T=Xe(w.type.tensor),v=Kr(t,w.type.value,T),b=P("x",e[0].dataType,u.length,s),I=P("w",e[1].dataType,d.length,s),S=[b,I];n&&S.push(P("b",e[2].dataType,e[2].dims,s));let k=n?"value += b[output_channel];":"",R=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Zr(t,R),`
  ${_.registerUniforms(R).declareVariables(...S,w)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${h}>;
    var values: array<${w.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${k}
      ${v}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:y}}}),tp,Tn,rp,In,oo,pa,ip,np,uo,u1=Q(()=>{ge(),s1(),a1(),eu(),o1(),Jr(),Jo(),zr(),tp=(e,t,r,i,n,s)=>{let a=e[0],o=e.slice(s?1:2,s?3:4),u=o.length,d=t[0],c=t.slice(2).map((h,y)=>h+(h-1)*(r[y]-1)),f=o.map((h,y)=>h+i[y]+i[y+u]).map((h,y)=>Math.floor((h-c[y]+n[y])/n[y]));return f.splice(0,0,a),f.splice(s?3:1,0,d),f},Tn=[2,3,1,0],rp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},In=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();jn.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},oo=e=>{let t=Zo(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,s=e.group,a=e.kernel_shape,o=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},pa=(e,t,r,i)=>{let n=r.format==="NHWC",s=tp(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let R=[t[0]];if(n){let O=e.kernelCustomData.wT??e.compute(vt(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),R.push(O)}else R.push(t[1]);t.length===3&&R.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(vy(R,r,s,i),{inputs:R}):e.compute(by(R,r,s,i),{inputs:R});return}let a=t.length===3,o=t[0].dims[n?1:2],u=t[0].dims[n?2:3],d=t[0].dims[n?3:1],c=t[1].dims[2],f=t[1].dims[3],h=s[n?1:2],y=s[n?2:3],_=s[n?3:1],w=n&&c===o&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(w||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let R=s[0],O,x,q,G=[];if(n){let j=e.kernelCustomData.wT??e.compute(vt(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=j),w){let M=o*u*d;O=t[0].reshape([1,R,M]),x=j.reshape([1,M,_]),q=[1,R,_]}else O=t[0].reshape([R,o*u,d]),x=j.reshape([1,d,_]),q=[R,h*y,_];G.push(O),G.push(x)}else O=t[0].reshape([R,d,o*u]),x=t[1].reshape([1,_,d]),q=[R,_,h*y],G.push(x),G.push(O);a&&G.push(t[2]);let oe=q[2],W=G[0].dims[G[0].dims.length-1];oe<8&&W<8?e.compute(Xo(G,r,s,q,n,i),{inputs:G}):e.compute(Qn(G,r,s,q,n,i),{inputs:G});return}let T=!0,v=e.kernelCustomData.wT??e.compute(vt(t[1],Tn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let b=[t[0],v];a&&b.push(t[2]);let I=n?h*y:_,S=n?_:h*y,k=c*f*d;e.compute(yy(b,r,s,I,S,k,a,T,i),{inputs:b})},ip=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=In({...t,pads:n,strides:s,dilations:a,kernelShape:o},i);pa(e,i,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},np=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=In(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=_y(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(wy(t,n,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],i))},uo=(e,t)=>{if(rp(e.inputs,t),e.inputs[0].dims.length===3)ip(e,t);else if(e.inputs[0].dims.length===5)np(e,e.inputs,t);else{let r=In(t,e.inputs);pa(e,e.inputs,r)}}}),$y,l1=Q(()=>{fe(),gr(),ge(),ye(),$y=(e,t,r)=>{let i=e.length>2,n=t.outputShape,s=t.format==="NHWC",a=t.group,o=e[1].dims,u=o[2]/a,d=o[3],c=s?Fe(u):1,f=s&&d===1&&u>=4,h=f?Math.floor(u/4)*4:Math.floor(u/c)*c,y=u-h,_=s?Fe(d):1,w=s?d===1?c:_:1,T=N.size(n)/_,v=[Math.ceil(T/64),1,1];Ee("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let b=["rank","rank"],I=[t.strides[0],t.strides[1]],S=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],k=[t.dilations[0],t.dilations[1]],R=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],O=[R[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),R[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:T},{type:12,data:I},{type:12,data:S},{type:12,data:k},{type:12,data:R},{type:6,data:O},{type:12,data:h},{type:12,data:u},{type:12,data:d},...de(e[0].dims,e[1].dims)];i&&(x.push(...de(e[2].dims)),b.push("rank")),x.push(...de(n));let q=G=>{let oe=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:R.length},{name:"pads",type:"i32",length:O.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],W=Xe(e[0].dataType),j=s?1:2,M=s?2:3,L=s?3:1,Z=P("W",e[1].dataType,e[1].dims.length,w),ie=P("Dy",e[0].dataType,e[0].dims.length,c),X=[ie,Z];i&&X.push(P("bias",e[2].dataType,[n[L]].length,_));let le=ae("result",e[0].dataType,n.length,_),Se=()=>{let pe="";if(f)c===4?pe+=`
        let xValue = ${ie.getByOffset("x_offset")};
        let wValue = ${Z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?pe+=`
          dotProd = dotProd + dot(vec4<${W}>(${ie.getByOffset("x_offset")}, ${ie.getByOffset("x_offset + 1u")}), vec4<${W}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(pe+=`
          dotProd = dotProd + dot(vec4<${W}>(${ie.getByOffset("x_offset")}, ${ie.getByOffset("x_offset + 1u")}, ${ie.getByOffset("x_offset + 2u")}, ${ie.getByOffset("x_offset + 3u")}), vec4<${W}>(${Z.getByOffset("w_offset")}, ${Z.getByOffset("w_offset + 1u")}, ${Z.getByOffset("w_offset + 2u")}, ${Z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(pe+=`
                  let xValue = ${s?ie.getByOffset(`${ie.indicesToOffset(`${ie.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):ie.get("batch","inputChannel","idyR","idyC")};
        `,c===1)pe+=`
          let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Z.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let ve=0;ve<c;ve++)pe+=`
            let wValue${ve} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ve}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${ve}] * wValue${ve};`;return pe},U=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let pe="";if(c===1){pe+="dotProd = dotProd";for(let ve=0;ve<y;ve++)pe+=`
            + ${ie.getByOffset(`x_offset + ${ve}`)} * ${Z.getByOffset(`w_offset + ${ve}`)}`;pe+=";"}else if(c===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);pe+=`
          let xValue = ${ie.getByOffset("x_offset")};
          let wValue = ${Z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return pe},Y=`
            let outputIndices = ${le.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${le.indicesGet("outputIndices",0)};
            let d1 = ${le.indicesGet("outputIndices",L)};
            let r = ${le.indicesGet("outputIndices",j)};
            let c = ${le.indicesGet("outputIndices",M)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${le.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${W}(dyRCorner) + ${W}(wR)) / ${W}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${W}(uniforms.Dy_shape[${j}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${W}(dyCCorner) + ${W}(wC)) / ${W}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${W}(uniforms.Dy_shape[${M}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${ie.indicesToOffset(`${ie.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Z.indicesToOffset(`${Z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${Se()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${le.setByOffset("global_idx","value")};
          `;return`
    ${G.registerUniforms(oe).declareVariables(...X,le)}
      ${G.mainStart()}
      ${G.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Y}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${w}${_}${f}${y}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:q}}}),sp,ap,op,fa,xy,up,ha,lp,Sy,d1=Q(()=>{l1(),Jr(),zr(),sp=(e,t,r,i,n,s)=>(e-1)*t+r+(i-1)*n+1-s,ap=(e,t,r,i,n)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[n]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[n]=s)},op=(e,t,r,i,n,s,a,o,u,d)=>{let c=e.length-2,f=d.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let h=e[0],y=t[o?3:1]*n;for(let _=0,w=e.length-c-(o?1:0);_<c;++_,++w){let T=e[w],v=f?T*a[_]:d[_],b=sp(T,a[_],s[_],t[w],r[_],v);ap(b,i,s,_,_+c),f&&d.push(a[_]*(T-1)+u[_]+(t[w]-1)*r[_]+1-s[_]-s[_+c])}d.splice(0,0,h),d.splice(o?3:1,0,y)},fa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,h)=>f*h,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;u=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}op(o,r,u,e.autoPad,e.group,n,d,i,a,s);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:a,outputShape:s,dilations:u,strides:d}),c},xy=e=>{let t=Zo(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group,a=e.kernelShape,o=e.pads,u=e.strides,d=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,outputPadding:c,outputShape:f,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},up=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((a,o)=>a+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((a,o)=>a+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((a,o)=>a+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((a,o)=>a+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ha=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(vt(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[t[0],n];t.length===3&&s.push(t[2]),e.compute($y(s,r,i),{inputs:s})},lp=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),s=[1].concat(s),n=[1].concat(n);let u=t.outputPadding;u=[0].concat(u);let d=fa({...t,pads:o,strides:a,dilations:s,kernelShape:n,outputPadding:u},i);ha(e,i,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Sy=(e,t)=>{if(up(e.inputs,t),e.inputs[0].dims.length===3)lp(e,t);else{let r=fa(t,e.inputs);ha(e,e.inputs,r)}}}),dp,Ty,Iy,c1=Q(()=>{fe(),ge(),je(),ye(),dp=(e,t,r,i)=>{let n=N.size(t),s=t.length,a=P("input",e,s),o=ae("output",e,s),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=N.normalizeAxis(u,s),c=f=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,y=ue("uniforms.input_shape","uniforms.axis",s),_=i.reverse?h+(i.exclusive?" + 1":""):"0",w=i.reverse?y:h+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...de(t,t)]}),getShaderSource:c}},Ty=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(dp(i,r,n,t),{inputs:[0]})},Iy=e=>{let t=e.exclusive===1,r=e.reverse===1;return Ae({exclusive:t,reverse:r})}}),cp,pp,fp,Ey,ky,p1=Q(()=>{fe(),ge(),je(),ye(),cp=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},pp=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)n.push(r.indicesSet("a",e[s],`i[${s}]`));return n.push("return a;}"),n.join(`
`)},fp=(e,t)=>{let r,i,n,s,a,o,u=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";u?([r,i,n,s]=e.dims,a=c?[r,i,n,d,d,s/d**2]:[r,i,n,s/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=c?[r,d,d,s/d**2,i,n]:[r,s/d**2,d,d,i,n],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(a),h=f.dims.length,y=e.dataType,_=P("a",y,h),w=ae("output",y,h),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(_,w)}

  ${pp(o,h,_,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let b=u?[r,i*d,n*d,s/d**2]:[r,s/d**2,i*d,n*d],I=N.size(b),S=f.dims,k=N.sortBasedOnPerm(S,o);return{outputs:[{dims:b,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...de(S,k)]}},getShaderSource:T}},Ey=(e,t)=>{cp(e.inputs),e.compute(fp(e.inputs[0],t))},ky=e=>Ae({blocksize:e.blocksize,mode:e.mode,format:e.format})}),En,ki,ma,hp,mp,gp,yp,ga,_p,Cy,zy,f1=Q(()=>{fe(),ge(),je(),ye(),En="[a-zA-Z]|\\.\\.\\.",ki="("+En+")+",ma="^"+ki+"$",hp="("+ki+",)*"+ki,mp="^"+hp+"$",gp=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},yp=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(mp)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,s)=>{let a=e[s].dims.slice();if(!n.match(RegExp(ma)))throw new Error("Invalid LHS term");let o=this.processTerm(n,!0,a,s);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(ki)))throw new Error("Invalid RHS");i.match(RegExp(En,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,s=!1,a=[],o=0;if(!e.match(RegExp(ma))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(En,"g")),d=new gp(i);return u?.forEach((c,f)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=n-u.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<a.length;y++){let _=String.fromCharCode(48+y);d.addSymbol(_,f+y),this.addSymbol(_,r[o++],i)}}else d.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[o++],i)}),d}},ga=e=>e+"_max",_p=(e,t,r,i)=>{let n=e.map(d=>d.length).map((d,c)=>P(`input${c}`,t,d)),s=N.size(i),a=ae("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),u=d=>{let c=[],f="var prod = 1.0;",h="var sum = 0.0;",y="sum += prod;",_=[],w=[],T=[],v=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,k)=>{if(r.rhs.symbolToIndices.has(k)){let R=r.rhs.symbolToIndices.get(k)?.[0];R!==void 0&&r.lhs.forEach((O,x)=>{if(S.inputIndices.includes(x)){let q=O.symbolToIndices.get(k);if(q===void 0)throw new Error("Invalid symbol error");q.forEach(G=>{c.push(`${n[x].indicesSet(`input${x}Indices`,G,a.indicesGet("outputIndices",R))}`)})}})}else r.lhs.forEach((R,O)=>{if(S.inputIndices.includes(O)){let x=R.symbolToIndices.get(k);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(q=>{_.push(`${n[O].indicesSet(`input${O}Indices`,q,`${k}`)}`)}),v.push(`prod *= ${n[O].getByIndices(`input${O}Indices`)};`)}}),w.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${ga(k)}; ${k}++) {`),T.push("}")});let I=b?[...c,`let sum = ${n.map((S,k)=>S.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...c,h,...w,..._,f,...v,y,...T];return`
            ${d.registerUniforms(o.map(S=>({name:`${ga(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${n.map((S,k)=>`var input${k}Indices: ${n[k].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:s});let c=e.map((f,h)=>[...de(f)]).reduce((f,h)=>f.concat(h),d);return c.push(...de(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:u}},Cy=(e,t)=>{let r=new yp(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((s,a)=>s.dims);e.compute(_p(n,e.inputs[0].dataType,r,i))},zy=e=>{let t=e.equation.replace(/\s+/g,"");return Ae({equation:t})}}),wp,ya,bp,vp,Ay,h1=Q(()=>{fe(),ge(),ye(),wp=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ya=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},bp=(e,t)=>e.length>t.length?ya(e,t):ya(t,e),vp=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=bp(t,r),n=e[0].dataType,s=n===9||N.size(t)===1,a=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(N.size(i)/o),d=f=>{let h=P("input",n,t.length,a),y=ae("output",n,i.length,o),_;if(n===9){let w=(T,v,b="")=>`
          let outputIndices${v} = ${y.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,y)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${b}(${h.getByOffset(`index${v}`)}[component${v}]);
        `;_=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},c=[{type:12,data:u},...de(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${a}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},Ay=e=>{wp(e.inputs),e.compute(vp(e.inputs),{inputs:[0]})}}),$p,Oy,m1=Q(()=>{fe(),ge(),ye(),Qo(),$p=e=>{let t=e[0].dataType,r=N.size(e[0].dims),i=N.size(e[1].dims),n=i%4===0,s=a=>{let o=P("x",t,[1],4),u=P("bias",t,[1],4),d=ae("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${u.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,h=n?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(c).declareVariables(o,u,d)}

    ${io(ut(t))}

    ${a.mainStart(fi)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",no("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/fi/4)}})}},Oy=e=>{e.inputs.length<2||N.size(e.inputs[1].dims)===0?Xg(e):e.compute($p(e.inputs))}}),xp,Sp,Ry,My,g1=Q(()=>{fe(),ge(),je(),ye(),xp=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Sp=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=N.normalizeAxis(t.axis,n),a=r.slice(0);a.splice(s,1,...i);let o=r[s],u=e[0].dataType===9?4:1,d=Math.ceil(N.size(a)/u),c=[{type:12,data:d},{type:6,data:o},{type:12,data:s},...de(e[0].dims,e[1].dims,a)],f=h=>{let y=P("data",e[0].dataType,e[0].dims.length,u),_=P("inputIndices",e[1].dataType,e[1].dims.length),w=ae("output",e[0].dataType,a.length,u),T=b=>{let I=i.length,S=`var indicesIndices${b}  = ${_.type.indices}(0);`;for(let k=0;k<I;k++)S+=`${I>1?`indicesIndices${b}[${k}]`:`indicesIndices${b}`} = ${a.length>1?`outputIndices${b}[uniforms.axis + ${k}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${_.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${y.type.indices};
        `;for(let k=0,R=0;k<n;k++)k===s?(S+=`${n>1?`dataIndices${b}[${k}]`:`dataIndices${b}`} = u32(idx${b});`,R+=I):(S+=`${n>1?`dataIndices${b}[${k}]`:`dataIndices${b}`} = ${a.length>1?`outputIndices${b}[${R}]`:`outputIndices${b}`};`,R++);return S},v;if(e[0].dataType===9){let b=(I,S,k="")=>`
          let outputIndices${S} = ${w.offsetToIndices(`outputOffset + ${S}u`)};
          ${T(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${I}[${S}] = ${k}(${y.getByOffset(`index${S}`)}[component${S}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${y.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,w)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:f}},Ry=e=>Ae({axis:e.axis}),My=(e,t)=>{let r=e.inputs;xp(r),e.compute(Sp(e.inputs,t))}}),Tp,By,Ny,y1=Q(()=>{fe(),ge(),ye(),Tp=(e,t,r,i,n,s,a,o,u)=>{let d=[{type:12,data:s},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:o},{type:12,data:u}],c=[s];d.push(...de(t.dims,c));let f=h=>{let y=P("indices_data",t.dataType,t.dims.length),_=ae("input_slice_offsets_data",12,1,1),w=[y,_],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(...w)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},By=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,s=r[1].dims,a=s[s.length-1],o=N.sizeToDimension(s,s.length-1),u=N.sizeFromDimension(i,t.batchDims+a),d=N.sizeToDimension(i,t.batchDims),c=N.sizeFromDimension(i,t.batchDims),f=o/d,h=new Array(a),y=u;for(let S=0;S<a;++S)h[a-1-S]=y,y*=i[t.batchDims+a-1-S];let _=Tp(e,r[1],h,t.batchDims,i,o,f,c,a),w=t.batchDims+a;if(w>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=s.slice(0,-1).concat(i.slice(w)),v=N.size(T),b=[{type:12,data:v},{type:12,data:u},...de(r[0].dims,_.dims,T)],I=S=>{let k=P("data",r[0].dataType,r[0].dims.length),R=P("slice_offsets",12,_.dims.length),O=ae("output",r[0].dataType,T.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,R,O)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:n}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:b}),getShaderSource:I},{inputs:[r[0],_]})},Ny=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ip,Ep,Dy,Py,_1=Q(()=>{fe(),ge(),je(),ye(),Ip=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=N.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],s=e[2],a=e.length===4?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((o,u)=>u===r?Math.ceil(o/i)===s.dims[u]:o===s.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((o,u)=>o===s.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ep=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=N.normalizeAxis(t.gatherAxis,n),a=N.normalizeAxis(t.quantizeAxis,n),o=r.slice(0);o.splice(s,1,...i);let u=N.size(o),d=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:u},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...de(...e.map((y,_)=>y.dims),o)],h=y=>{let _=P("data",e[0].dataType,e[0].dims.length),w=P("inputIndices",e[1].dataType,e[1].dims.length),T=P("scales",e[2].dataType,e[2].dims.length),v=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=ae("output",d,o.length),I=[_,w,T];v&&I.push(v);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...I,b)}
        ${y.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ut(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:h}},Dy=(e,t)=>{let r=e.inputs;Ip(r,t),e.compute(Ep(e.inputs,t))},Py=e=>Ae({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),kp,Cp,Uy,Ly,w1=Q(()=>{fe(),ge(),je(),ye(),kp=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Cp=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,s=e[1].dims,a=e[1].dataType,o=N.normalizeAxis(t.axis,n),u=r[o],d=s.slice(0),c=N.size(d),f=P("input",i,n),h=P("indicesInput",a,s.length),y=ae("output",i,d.length),_=[{type:12,data:c},{type:6,data:u},{type:12,data:o}];return _.push(...de(r,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:_}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,y)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Uy=e=>Ae({axis:e.axis}),Ly=(e,t)=>{let r=e.inputs;kp(r),e.compute(Cp(e.inputs,t))}}),zp,Ap,Wy,qy,b1=Q(()=>{fe(),ge(),ye(),zp=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ap=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,s,a]=Um.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[n,s];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(s/u),c=Math.ceil(n/u),f=!0,h=N.size(o),y=[{type:12,data:f?d:h},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...de(e[2].dims)),_.push("rank")),y.push(...de(o));let w=v=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",S=P("a",e[0].dataType,e[0].dims),k=P("b",e[1].dataType,e[1].dims),R=S.type.value,O=null,x=[S,k];e.length===3&&(O=P("c",e[2].dataType,e[2].dims.length),x.push(O));let q=ae("output",e[0].dataType,o.length);x.push(q);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(G).declareVariables(...x)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${R}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${I}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",q)}; value += ${R}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let b=P("a",e[0].dataType,e[0].dims),I=P("b",e[1].dataType,e[1].dims),S=null,k=[b,I];e.length===3&&(S=P("c",e[2].dataType,e[2].dims.length),k.push(S));let R=ae("output",e[0].dataType,o.length);k.push(R);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",q="";t.transA&&t.transB?(q=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(q=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(q=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(q=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(O).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${v.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${R.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${q}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${R.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:y}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:w}},Wy=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},qy=(e,t)=>{zp(e.inputs),e.compute(Ap(e.inputs,t))}}),Ft,nr,Br,Nr,Op,Rp,Mp,Bp,Np,Dp,Pp,Up,Vy,Hy,v1=Q(()=>{fe(),ge(),je(),ye(),[Ft,nr,Br,Nr]=[0,1,2,3],Op=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Rp=`
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
`,Mp=e=>`
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
`,Bp=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Np=e=>`
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
`,Dp=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Ft}] = batch;
     indices[${nr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Br}] = u32(r);
            indices[${Nr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Br}] = u32(clamp(r, 0, H - 1));
          indices[${Nr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Br}] = gs_reflect(r, border[1], border[3]);
          indices[${Nr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Pp=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Ft}], indices[${nr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Ft}], indices[${nr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Ft}], indices[${nr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Ft}], indices[${nr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Ft}], indices[${nr}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Ft}], indices[${nr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Up=(e,t)=>{let r=P("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=P("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Ft,nr,Br,Nr]=[0,3,1,2]);let a=ae("output",e[0].dataType,s.length),o=r.type.value,u=N.size(s),d=[{type:12,data:u},...de(e[0].dims,i,s)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,n,a)}
  ${Rp}
  ${Mp(o)}
  ${Bp(t)}
  ${Np(t)}
  ${Dp(r,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Br}]);
      let W_in = i32(uniforms.x_shape[${Nr}]);

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

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Ft}], indices[${Br}], indices[${Nr}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Pp(a,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=N.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:d}},getShaderSource:c}},Vy=(e,t)=>{Op(e.inputs),e.compute(Up(e.inputs,t))},Hy=e=>Ae({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),ct,Lp,Gy,_a,Wp,Di,Fy,jy=Q(()=>{fe(),ge(),je(),Go(),Ko(),ye(),zr(),ct=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Lp=(e,t)=>{let r=e[0],i=ct(e,1),n=ct(e,2),s=ct(e,3),a=ct(e,4),o=ct(e,5),u=ct(e,6),d=ct(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=f,_=0,w=0,T=Math.floor(h/t.numHeads);if(u&&d&&N.size(u.dims)&&N.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=u.dims[2],w=u.dims[2]}else if(u&&N.size(u.dims)||d&&N.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&N.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(s&&N.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=_+y,I=0;if(a&&N.size(a.dims)>0){I=8;let O=a.dims;throw O.length===1?O[0]===c?I=1:O[0]===3*c+2&&(I=3):O.length===2&&O[0]===c&&O[1]===b&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,k=h;if(n&&N.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(y!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(y!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],S=!0}}let R=!1;if(a&&N.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(o&&N.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:b,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:h,vHiddenSize:k,headSize:T,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:R,passPastInKv:S,qkvFormat:v}},Gy=e=>Ae({...e}),_a=Ae({perm:[0,2,1,3]}),Wp=(e,t,r,i,n,s,a)=>{let o=[i,n,s],u=N.size(o),d=[{type:12,data:u},{type:12,data:a},{type:12,data:s}],c=f=>{let h=ae("qkv_with_bias",t.dataType,o),y=P("qkv",t.dataType,o),_=P("bias",r.dataType,o),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(y,_,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},Di=(e,t,r,i,n,s,a,o)=>{let u=s;if(a&&N.size(a.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Wp(e,s,a,t,i,r*n,o),u=u.reshape([t,i,r,n]),r===1||i===1?u:e.compute(vt(u,_a.perm),{inputs:[u],outputs:[-1]})[0]}else return s.dims.length===3&&(u=s.reshape([t,i,r,n])),r===1||i===1?u:e.compute(vt(u,_a.perm),{inputs:[u],outputs:[-1]})[0]},Fy=(e,t)=>{let r=Lp(e.inputs,t),i=e.inputs[0],n=ct(e.inputs,1),s=ct(e.inputs,2),a=ct(e.inputs,3),o=ct(e.inputs,4),u=ct(e.inputs,5),d=ct(e.inputs,6),c=ct(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&s&&n.dims.length===4&&s.dims.length===4,h=Di(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,a,0);if(f)return Xi(e,h,n,s,o,void 0,d,c,u,r);if(!n||!s)throw new Error("key and value must be provided");let y=Di(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,a,r.hiddenSize),_=Di(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,a,2*r.hiddenSize);Xi(e,h,y,_,o,void 0,d,c,u,r)}}),qp,Vp,Hp,Gp,lo,Ky,Qy,Zy=Q(()=>{fe(),ge(),je(),ye(),qp=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Vp=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),Ae({numOutputs:i,axis:t.axis,splitSizes:r})},Hp=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ue("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Gp=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},lo=(e,t)=>{let r=e[0].dims,i=N.size(r),n=e[0].dataType,s=N.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),o=P("input",n,r.length),u=new Array(t.numOutputs),d=[],c=[],f=0,h=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],u[_]=f;let w=r.slice();w[s]=t.splitSizes[_],c.push(w),a[_]=ae(`output${_}`,n,w.length),d.push({dims:c[_],dataType:e[0].dataType})}h.push({type:12,data:u},...de(r,...c));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...a)}
  ${Hp(u.length)}
  ${Gp(a)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ue("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},Ky=(e,t)=>{qp(e.inputs);let r=e.inputs.length===1?t:Vp(e.inputs,t);e.compute(lo(e.inputs,r),{inputs:[0]})},Qy=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return Ae({axis:t,numOutputs:i,splitSizes:r})}}),Fp,Zn,Yy,Xy=Q(()=>{fe(),ge(),je(),ye(),Fp=(e,t)=>{let[r,i,n,s]=e,{numHeads:a,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!N.areEqual(i.dims,[])&&!N.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!N.areEqual(n.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],d=r.dims[r.dims.length-2],c=n.dims[0],f=N.sizeFromDimension(r.dims,1)/d,h=o===0?n.dims[1]*2:f/a;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Zn=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:s}=t,a=e[0].dims[0],o=N.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=o/u,c=e[2].dims[1],f=n===0?c*2:d/i,h=new Array(a,u,d/f,f-c),y=N.computeStrides(h),_=[{type:1,data:s},{type:12,data:h},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,u*f,1]}):[],...de(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=T=>{let v=P("input",e[0].dataType,e[0].dims.length),b=P("position_ids",e[1].dataType,e[1].dims.length),I=P("cos_cache",e[2].dataType,e[2].dims.length),S=P("sin_cache",e[3].dataType,e[3].dims.length),k=ae("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${T.declareVariables(v,b,I,S,k)}

        ${T.mainStart(fi)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",ae("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Ae({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(N.size(h)/fi)},programUniforms:_})}},Yy=(e,t)=>{Fp(e.inputs,t),e.compute(Zn(e.inputs,t))}}),jp,Kp,wa,Qp,Jy,$1=Q(()=>{je(),fe(),Ko(),jy(),Zy(),zr(),Xy(),ye(),jp=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=r.dims[0],d=r.dims[1],c=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=d,h=0,y=!i||i.dims.length===0,_=Math.floor(y?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);y&&(c=_*t.numHeads);let w=s&&s.dims.length!==0,T=a&&a.dims.length!==0;if(w&&s.dims.length===4&&s.dims[0]===u&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&T){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=s.dims[2]}else if(w||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let b=0,I=!1,S=t.kvNumHeads?_*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=n.dims[1]*n.dims[3],I=!0}}let k=e.length>4?e[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:S,headSize:_,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},Kp=Ae({perm:[0,2,1,3]}),wa=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(vt(i,Kp.perm),{inputs:[i],outputs:[-1]})[0]),i},Qp=(e,t,r,i)=>{let n=7,s=["type","type"],a=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let f=P("seq_lens",r.dataType,r.dims),h=P("total_seq_lens",i.dataType,i.dims),y=ae("pos_ids",n,a),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(_).declareVariables(f,h,y)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},Jy=(e,t)=>{let r=jp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=Ae({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[h,y,_]=!n&&!s?e.compute(lo([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,s],w,T;if(t.doRotary){let S=e.compute(Qp(r.batchSize,r.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],k=e.inputs[7],R=e.inputs[8],O=Ae({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[h,S,k,R],q=[-1];w=e.compute(Zn(x,O),{inputs:x,outputs:q})[0],x.splice(0,1,y);let G=Ae({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Zn(x,G),{inputs:x,outputs:q})[0]}let v=Di(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:h,void 0,0),b=wa(e,t.doRotary?T:y,r),I=wa(e,_,r);Xi(e,v,b,I,void 0,void 0,a,o,void 0,r,u,d)}}),ba,Zp,Yp,e0,x1=Q(()=>{fe(),ge(),zr(),ye(),ba=(e,t,r,i,n,s,a,o)=>{let u=Fe(s),d=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,f=n*a,h=64;f===1&&(h=256);let y=[n,a,s/u],_=[n,a,2],w=["rank","type","type"],T=[];T.push(...de(y,_));let v=b=>{let I=P("x",t.dataType,3,u),S=P("scale",r.dataType,r.dims),k=P("bias",i.dataType,i.dims),R=ae("output",1,3,2),O=[I,S,k,R];return`
  var<workgroup> workgroup_shared : array<${c}, ${h}>;
  const workgroup_size = ${h}u;
  ${b.declareVariables(...O)}
  ${b.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Cr("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Cr("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},Zp=(e,t,r)=>{let i=t[0].dims,n=i,s=2,a=i[0],o=i[1],u=N.sizeFromDimension(i,s),d=Fe(u),c=N.size(n)/d,f=ba(e,t[0],t[1],t[2],a,u,o,r.epsilon),h=[a,o,u/d],y=[a,o],_=["type","none"],w=T=>{let v=P("x",t[0].dataType,h.length,d),b=P("scale_shift",1,y.length,2),I=ae("output",t[0].dataType,h.length,d),S=[v,b,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...de(h,y,h)]}),getShaderSource:w},{inputs:[t[0],f]})},Yp=(e,t,r)=>{let i=t[0].dims,n=i,s=i[0],a=i[i.length-1],o=N.sizeFromDimension(i,1)/a,u=Fe(a),d=N.size(n)/u,c=[{type:12,data:o},{type:12,data:Math.floor(a/u)}],f=["type","type"],h=!1,y=[0,i.length-1];for(let v=0;v<i.length-2;v++)h=h||i[v+1]!==1,y.push(v+1);h=h&&i[i.length-1]!==1;let _=h?e.compute(vt(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,b)=>i[y[b]])),w=ba(e,_,t[1],t[2],s,o,a,r.epsilon),T=v=>{let b=Xe(t[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,S=O=>{let x=O===0?"x":"y",q=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${b}(${q}(scale.${x}))`;case 2:return`vec2<${b}>(${q}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${b}>(${q}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${u}`)}},k=P("input",t[0].dataType,t[0].dims,u),R=ae("output",t[0].dataType,n,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${R.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],w]})},e0=(e,t)=>{t.format==="NHWC"?Yp(e,e.inputs,t):Zp(e,e.inputs,t)}}),Xp,Jp,t0,S1=Q(()=>{fe(),ge(),ye(),Xp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Jp=(e,t,r)=>{let i=t.simplified,n=e[0].dims,s=e[1],a=!i&&e[2],o=n,u=N.normalizeAxis(t.axis,n.length),d=N.sizeToDimension(n,u),c=N.sizeFromDimension(n,u),f=N.size(s.dims),h=a?N.size(a.dims):0;if(f!==c||a&&h!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let y=[];for(let k=0;k<n.length;++k)k<u?y.push(n[k]):y.push(1);let _=Fe(c),w=["type","type"],T=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/_)},{type:1,data:t.epsilon}];a&&w.push("type");let v=r>1,b=r>2,I=k=>{let R=Xe(e[0].dataType),O=[P("x",e[0].dataType,e[0].dims,_),P("scale",s.dataType,s.dims,_)];a&&O.push(P("bias",a.dataType,a.dims,_)),O.push(ae("output",e[0].dataType,o,_)),v&&O.push(ae("mean_data_output",1,y)),b&&O.push(ae("inv_std_output",1,y));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(x).declareVariables(...O)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${eo("f32",_)};
    var mean_square_vector = ${eo("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${si(R,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Cr("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Cr("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${si(R,_,"x[j + offset]")};
      let f32scale = ${si(R,_,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${si(R,_,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:o,dataType:e[0].dataType}];return v&&S.push({dims:y,dataType:1}),b&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:w},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:T}),getShaderSource:I}},t0=(e,t)=>{Xp(e.inputs),e.compute(Jp(e.inputs,t,e.outputCount))}}),ef,r0,T1=Q(()=>{ge(),Jo(),eu(),ef=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},r0=e=>{ef(e.inputs);let t=pi.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Xo(e.inputs,{activation:""},t));else{let n=t[t.length-2],s=N.size(e.inputs[0].dims.slice(0,-2)),a=N.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&n===1&&a===1){let o=e.inputs[0].reshape([1,s,i]),u=e.inputs[1].reshape([1,i,r]),d=[1,s,r],c=[o,u];e.compute(Qn(c,{activation:""},t,d),{inputs:c})}else e.compute(Qn(e.inputs,{activation:""},t))}}}),tf,rf,nf,i0,n0,I1=Q(()=>{fe(),ge(),je(),ye(),tf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!N.areEqual(a.dims,[t.n,n,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(N.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(N.size(u)!==d)throw new Error("zeroPoints input size error.")}},rf=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,o=r.slice(0,i-2),u=N.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=Fe(t.k),h=Fe(d),y=Fe(a),_=o.concat([n,a]),w=n>1&&a/y%2===0?2:1,T=N.size(_)/y/w,v=64,b=[],I=[u,n,s/f],S=N.convertShape(e[1].dims).slice();S.splice(-1,1,d/h),b.push(...de(I)),b.push(...de(S)),b.push(...de(e[2].dims)),e.length===4&&b.push(...de(N.convertShape(e[3].dims)));let k=[u,n,a/y];b.push(...de(k));let R=O=>{let x=I.length,q=P("a",e[0].dataType,x,f),G=P("b",12,S.length,h),oe=P("scales",e[2].dataType,e[2].dims.length),W=[q,G,oe],j=e.length===4?P("zero_points",12,e[3].dims.length):void 0;j&&W.push(j);let M=k.length,L=ae("output",e[0].dataType,M,y),Z=Xe(e[0].dataType),ie=(()=>{switch(f){case 1:return`array<${Z}, 8>`;case 2:return`mat4x2<${Z}>`;case 4:return`mat2x4<${Z}>`;default:throw new Error(`${f}-component is not supported.`)}})(),X=()=>{let U=`
          // reuse a data
            var input_offset = ${q.indicesToOffset(`${q.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${q.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let Y=0;Y<y*w;Y++)U+=`
            b_value = ${h===1?`b${Y}_data`:`b${Y}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({length:4},(pe,ve)=>`${Z}(b_value_lower[${ve}]), ${Z}(b_value_upper[${ve}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ie}(${Array.from({length:8},(pe,ve)=>`(b_quantized_values[${ve}] - ${j?`zero_point${Y}`:"zero_point"}) * scale${Y}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${j?`zero_point${Y}`:"zero_point"}`).join(",")})) * scale${Y};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(Y/y)}]${y>1?`[${Y%y}]`:""} += ${Array.from({length:8/f},(pe,ve)=>`${f===1?`a_data[${ve}] * b_dequantized_values[${ve}]`:`dot(a_data[${ve}], b_dequantized_values[${ve}])`}`).join(" + ")};
          `;return U},le=()=>{let U=`
            var col_index = col * ${y};
            ${j?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Z}(8);`}
            `;for(let Y=0;Y<y*w;Y++)U+=`
            let scale${Y} = ${oe.getByOffset("col_index * nBlocksPerCol + block")};
            ${j?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${Y} = ${Z}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},Se=()=>{let U=`col_index = col * ${y};`;for(let Y=0;Y<y*w;Y++)U+=`
            let b${Y}_data = ${G.getByIndices(`${G.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,U};return`
        var<workgroup> workgroup_shared: array<${L.type.value}, ${w*v}>;
        ${O.declareVariables(...W,L)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${L.offsetToIndices(`(global_idx / ${v}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${le()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${Se()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${X()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${L.type.value} = ${L.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${L.setByIndices(`${L.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${h};${y};${w};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:T},programUniforms:b}),getShaderSource:R}},nf=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,o=r.slice(0,i-2),u=N.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=Fe(t.k),h=Fe(d),y=o.concat([n,a]),_=128,w=a%8===0?8:a%4===0?4:1,T=_/w,v=T*h*8,b=v/f,I=v/t.blockSize,S=N.size(y)/w,k=[],R=[u,n,s/f],O=N.convertShape(e[1].dims).slice();O.splice(-1,1,d/h),k.push(...de(R)),k.push(...de(O)),k.push(...de(e[2].dims)),e.length===4&&k.push(...de(N.convertShape(e[3].dims)));let x=[u,n,a];k.push(...de(x));let q=G=>{let oe=R.length,W=P("a",e[0].dataType,oe,f),j=P("b",12,O.length,h),M=P("scales",e[2].dataType,e[2].dims.length),L=[W,j,M],Z=e.length===4?P("zero_points",12,e[3].dims.length):void 0;Z&&L.push(Z);let ie=x.length,X=ae("output",e[0].dataType,ie),le=Xe(e[0].dataType),Se=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${T}>, ${w}>;
        ${G.declareVariables(...L,X)}
        ${G.mainStart([T,w,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${Z?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${le}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${le}(8);`}
            let scale = ${M.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${j.getByIndices(`${j.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${Se()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${le}>(${Array.from({length:4},(U,Y)=>`${le}(b_value_lower[${Y}]), ${le}(b_value_upper[${Y}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${le}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,Y)=>`${`dot(a_data${Y}, b_dequantized_values[${Y}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${h};${T};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:S},programUniforms:k}),getShaderSource:q}},i0=(e,t)=>{tf(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(nf(e.inputs,t)):e.compute(rf(e.inputs,t))},n0=e=>Ae(e)}),sf,af,of,uf,lf,df,cf,pf,s0,E1=Q(()=>{fe(),ge(),ye(),sf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},af=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${ue("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ue("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${ue("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},of=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${ue("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ue("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ue("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ue("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},uf=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${ue("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ue("uniforms.x_shape",n,t)})) {
                  k = i32(${ue("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${ue("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},lf=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${ue("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${ue("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${ue("uniforms.x_shape",n,t)})) {
                  k -= i32(${ue("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${ue("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},df=(e,t,r)=>{switch(r.mode){case 0:return af(e,t,r.pads.length);case 1:return of(e,t,r.pads.length);case 2:return uf(e,t,r.pads.length);case 3:return lf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},cf=(e,t)=>{let r=N.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=N.size(r),s=[{type:12,data:n},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&s.push({type:a?e[2].dataType:1,data:t.value}),s.push(...de(e[0].dims,r));let o=["rank"],u=d=>{let c=ae("output",e[0].dataType,r.length),f=P("x",e[0].dataType,i.length),h=f.type.value,y=df(c,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:a?h:"f32"}),`
            ${d.registerUniforms(_).declareVariables(f,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(N.size(r)/64)},programUniforms:s}),getShaderSource:u}},pf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)s[Number(o[u])]=Number(r[u]),s[Number(o[u])+n]=Number(r[u+o.length])}else r.forEach((o,u)=>s[Number(u)]=Number(o));let a=[];return s.forEach(o=>a.push(o)),{mode:t.mode,value:i,pads:a}}else return t},s0=(e,t)=>{sf(e.inputs);let r=pf(e.inputs,t);e.compute(cf(e.inputs,r),{inputs:[0]})}}),Ci,va,$a,xa,Sa,ff,hf,Ta,Ia,a0,o0,Ea,u0,l0,ka,d0,c0,p0,f0,k1=Q(()=>{Ct(),fe(),ge(),ye(),Ci=e=>{if(Ue.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},va=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),o=t.strides.slice(),u=s?t.dilations.slice():[],d=t.pads.slice();jn.adjustPoolAttributes(r,n,a,o,u,d);let c=jn.computePoolOutputShape(r,n,o,u,a,d,t.autoPad),f=Object.assign({},t);s?Object.assign(f,{kernelShape:a,strides:o,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:a,strides:o,pads:d,cacheKey:t.cacheKey});let h=c.slice();return h.push(h.splice(1,1)[0]),[f,i?h:c]},$a=(e,t)=>{let r=t.format==="NHWC",i=N.size(e),n=N.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:n}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(d+c);s.push({type:12,data:o},{type:12,data:u},{type:12,data:d},{type:12,data:c}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];h=!!(w+T),s.push({type:12,data:y},{type:12,data:_},{type:12,data:w},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,f,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=N.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,c)=>d+c);return[s,a,!!u,!1,!1]}},xa=(e,t,r,i,n,s,a,o,u,d,c,f)=>{let h=n.format==="NHWC",y=t.type.value,_=ae("output",t.type.tensor,i);if(n.kernelShape.length<=2){let w="",T="",v="",b=r-(h?2:1);if(c?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,n.kernelShape.length===2){let I=r-(h?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${o});
              var pad = 0;
              ${T}
              ${w}
              ${v}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=n.kernelShape.length,T=n.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${y}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${ue("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${ue("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${ue("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${ue("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${a}

              output[global_idx] = value;
            }`}},Sa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ff=e=>`${Sa(e)};${e.countIncludePad}`,hf=e=>`${Sa(e)};${e.storageOrder};${e.dilations}`,Ta=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ia=(e,t,r,i)=>{let[n,s]=va(t,i,r),a=P("x",t.dataType,t.dims.length),o=a.type.value,u="value += x_val;",d="";n.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,f,h,y,_]=$a(s,n);c.push(...de(t.dims,s));let w=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${y};${_}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(N.size(s)/64)},programUniforms:c}),getShaderSource:T=>xa(T,a,t.dims.length,s.length,n,u,d,0,f,h,y,_)}},a0=e=>{let t=e.count_include_pad!==0,r=Ta(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:ff(i)}},o0=(e,t)=>{Ci(e.inputs),e.compute(Ia("AveragePool",e.inputs[0],!1,t))},Ea={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},u0=e=>{let t=e.format;return{format:t,...Ea,cacheKey:t}},l0=(e,t)=>{Ci(e.inputs),e.compute(Ia("GlobalAveragePool",e.inputs[0],!0,t))},ka=(e,t,r,i)=>{let[n,s]=va(t,i,r),a=`
      value = max(x_val, value);
    `,o="",u=P("x",t.dataType,t.dims.length),d=["rank"],[c,f,h,y,_]=$a(s,n);return c.push(...de(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${y};${_}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(N.size(s)/64)},programUniforms:c}),getShaderSource:w=>xa(w,u,t.dims.length,s.length,n,a,o,t.dataType===10?-65504:-1e5,f,h,y,_)}},d0=(e,t)=>{Ci(e.inputs),e.compute(ka("MaxPool",e.inputs[0],!1,t))},c0=e=>{let t=e.storage_order,r=e.dilations,i=Ta(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:hf(n)}},p0=e=>{let t=e.format;return{format:t,...Ea,cacheKey:t}},f0=(e,t)=>{Ci(e.inputs),e.compute(ka("GlobalMaxPool",e.inputs[0],!0,t))}}),mf,gf,h0,m0,C1=Q(()=>{fe(),ge(),je(),ye(),mf=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,s)=>s===t.axis||n===e[0].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gf=(e,t)=>{let r=N.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,s=e[0].dims,a=e[1].dataType,o=N.size(s),u=i===3||i===2,d=u?[Math.ceil(N.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,h=f?u?[Math.ceil(N.size(f.dims)/4)]:f.dims:void 0,y=c.length===0||c.length===1&&c[0]===1,_=y===!1&&c.length===1,w=Fe(o),T=y&&(!u||w===4),v=T?w:1,b=T&&!u?w:1,I=P("input",u?12:i,d.length,b),S=P("scale",a,c.length),k=f?P("zero_point",u?12:i,h.length):void 0,R=ae("output",a,s.length,v),O=[I,S];k&&O.push(k);let x=[d,c];f&&x.push(h);let q=[{type:12,data:o/v},{type:12,data:r},{type:12,data:t.blockSize},...de(...x,s)],G=oe=>{let W=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${oe.registerUniforms(W).declareVariables(...O,R)}
      ${oe.mainStart()}
          ${oe.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${R.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${S.getByOffset("0")}`:_?`
            let scale_index = ${R.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?y?u?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:_?u?`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${u?n?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${R.setByOffset("global_idx",`${R.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/v/64),y:1,z:1},programUniforms:q})}},h0=(e,t)=>{mf(e.inputs,t),e.compute(gf(e.inputs,t))},m0=e=>Ae({axis:e.axis,blockSize:e.blockSize})}),yf,_f,g0,z1=Q(()=>{Ct(),fe(),ye(),yf=(e,t,r)=>{let i=e===t,n=e<t&&r<0,s=e>t&&r>0;if(i||n||s)throw new Error("Range these inputs' contents are invalid.")},_f=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),s=[n],a=n,o=[{type:12,data:a},{type:i,data:e},{type:i,data:r},...de(s)],u=d=>{let c=ae("output",i,s.length),f=c.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(h).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},g0=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),Ue.webgpu.validateInputContent&&yf(t,r,i),e.compute(_f(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),wf,bf,y0,_0,A1=Q(()=>{fe(),ge(),je(),ye(),wf=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},bf=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,s=1,a=Math.ceil(N.sizeToDimension(i,i.length-1)/s),o=i[i.length-1],u=N.sizeFromDimension(r,o),d=[{type:12,data:a},{type:12,data:o},{type:12,data:u},...de(e[1].dims,e[2].dims,n)],c=f=>{let h=P("indices",e[1].dataType,e[1].dims.length),y=P("updates",e[2].dataType,e[2].dims.length,s),_=t.reduction!=="none"&&t.reduction!==""?Fm("output",e[0].dataType,n.length):ae("output",e[0].dataType,n.length,s);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,y,_)}
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
    ${wf(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:c}},y0=e=>Ae({reduction:e.reduction}),_0=(e,t)=>{e.compute(bf(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),vf,$f,xf,Ca,Sf,Tf,If,Ef,kf,Cf,zf,Af,za,Of,Rf,Mf,Bf,Nf,w0,b0,O1=Q(()=>{fe(),ge(),je(),ye(),vf=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},$f=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,s)=>i[n]=e[s]),i},xf=(e,t,r,i,n,s)=>{let[a,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(c=>s.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");vf(i,t),t.axes.length>0&&$f(i,t.axes,d).forEach((c,f)=>i[f]=c)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Ca=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Sf=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ca("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ca("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Tf=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",If=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,a)=>{i[s]=n[a],i[a+r]=n[t.length+a]}),i):n},Ef=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>n.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,a)=>n[s]=r[a])}else r.forEach(s=>n.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((s,a)=>Math.round(s*t[a]))}return n},kf=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>n[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),n.forEach((s,a)=>n[a]=Math.round(s*t[a]))),n},Cf=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${ue("uniforms.scales","i",i)};
        var roi_low = ${ue("uniforms.roi","i",n)};
        var roi_hi = ${ue("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${ue("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${ue("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,zf=(e,t,r,i,n,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ue("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ue("uniforms.roi","i",s)};
          var roi_hi = ${ue("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${ue("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${ue("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,Af=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ue("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,za=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Of=(e,t,r,i,n)=>{let[s,a,o,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${za(e,u,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Rf=(e,t,r,i,n,s,a,o,u,d)=>{let c=r.length===2,[f,h]=c?[0,1]:[2,3],y=e.type.value,_=w=>{let T=w===f?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[w]},
        ${i[w]}, ${r[w]}, ${s[w]}, ${s[w]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${y} = originalIdx + ${y}(i);
          if (${T} < 0 || ${T} >= ${r[w]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${T} = max(0, min(${T}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${T})`)};
          data[i + 1] = ${w===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(h)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
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
    `},Mf=(e,t,r,i,n)=>{let[s,a,o,u,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${za(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
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
    }`},Bf=(e,t,r,i,n,s)=>{let a=e.dims,o=If(s,t.axes,a.length),u=Ef(a,i,n,t.axes),d=i.slice();i.length===0&&(d=a.map((b,I)=>b===0?1:u[I]/b),t.keepAspectRatioPolicy!=="stretch"&&(u=kf(a,d,t)));let c=ae("output",e.dataType,u.length),f=P("input",e.dataType,a.length),h=N.size(u),y=a.length===u.length&&a.every((b,I)=>b===u[I]),_=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,T=f.type.value,v=b=>`
      ${y?"":`
      ${Sf(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Af(f,a)};
              ${Tf(t.nearestMode,r,T)};
              ${zf(f,c,a,u,d.length,o.length,_)};
              `;case"linear":return`
              ${Cf(c,a,u,d.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Of(f,c,a,_,w)}`;if(a.length===3||a.length===5)return`${Mf(f,c,a,_,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Rf(f,c,a,u,d,o,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,c)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${y}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:o},...de(a,u)]})}},Nf=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},w0=(e,t)=>{let r=[],i=[],n=[],s=Nf(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xf(e.inputs,t,s,r,i,n),e.compute(Bf(e.inputs[0],t,s,r,i,n),{inputs:[0]})},b0=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,s=e.excludeOutside!==0,a=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return Ae({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:o,mode:u,nearestMode:d})}}),Df,Pf,v0,R1=Q(()=>{fe(),ge(),ye(),Df=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Pf=(e,t,r,i)=>{let n=t.simplified,s=e[0].dims,a=N.size(s),o=s,u=a,d=s.slice(-1)[0],c=i?s.slice(0,-1).concat(1):[],f=!n&&e.length>3,h=e.length>4,y=i&&r>1,_=i&&r>2,w=r>3,T=64,v=Fe(d),b=[{type:12,data:u},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],I=k=>{let R=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",e[0].dataType,e[0].dims,v),P("skip",e[1].dataType,e[1].dims,v),P("gamma",e[2].dataType,e[2].dims,v)];f&&O.push(P("beta",e[3].dataType,e[3].dims,v)),h&&O.push(P("bias",e[4].dataType,e[4].dims,v)),O.push(ae("output",e[0].dataType,o,v)),y&&O.push(ae("mean_output",1,c)),_&&O.push(ae("inv_std_output",1,c)),w&&O.push(ae("input_skip_bias_sum",e[0].dataType,o,v));let x=Xe(e[0].dataType),q=Xe(1,v);return`

      ${k.registerUniforms(R).declareVariables(...O)}
      var<workgroup> sum_shared : array<${q}, ${T}>;
      var<workgroup> sum_squared_shared : array<${q}, ${T}>;

      ${k.mainStart([T,1,1])}
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
          let bias_value = ${h?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${si(x,v,"value")};
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
        let mean = ${Cr("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Cr("square_sum",v)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:o,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${y};${_};${w}`,inputDependencies:e.map((k,R)=>"type")},getShaderSource:I,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:b})}},v0=(e,t)=>{Df(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Pf(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Uf,zi,Lf,Aa,Wf,qf,$0,x0,M1=Q(()=>{fe(),ge(),je(),ye(),Uf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},zi=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Lf=(e,t)=>{if(e.length>1){let r=zi(e,1),i=zi(e,2),n=zi(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),Ae({starts:r,ends:i,axes:n})}else return t},Aa=(e,t,r,i,n)=>{let s=e;return e<0&&(s+=r[i[t]]),n[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},Wf=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${ue("uniforms.input_shape","i",r.length)};
            let steps_i = ${ue("uniforms.steps","i",r.length)};
            let signs_i = ${ue("uniforms.signs","i",r.length)};
            let starts_i = ${ue("uniforms.starts","i",r.length)};
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
      }`,qf=(e,t)=>{let r=e[0].dims,i=N.size(r),n=t.axes.length>0?N.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=zi(e,4);s.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(n.length).fill(1));let a=t.starts.map((v,b)=>Aa(v,b,r,n,s)),o=t.ends.map((v,b)=>Aa(v,b,r,n,s));if(n.length!==a.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let v=0;v<r.length;++v)n.includes(v)||(a.splice(v,0,0),o.splice(v,0,r[v]),s.splice(v,0,1));let u=s.map(v=>Math.sign(v));s.forEach((v,b,I)=>{if(v<0){let S=(o[b]-a[b])/v,k=a[b],R=k+S*s[b];a[b]=R,o[b]=k,I[b]=-v}});let d=r.slice(0);n.forEach((v,b)=>{d[v]=Math.ceil((o[v]-a[v])/s[v])});let c={dims:d,dataType:e[0].dataType},f=ae("output",e[0].dataType,d.length),h=P("input",e[0].dataType,e[0].dims.length),y=N.size(d),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],w=[{type:12,data:y},{type:12,data:a},{type:6,data:u},{type:12,data:s},...de(e[0].dims,d)],T=v=>`
      ${v.registerUniforms(_).declareVariables(h,f)}
        ${Wf(h,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:w})}},$0=(e,t)=>{Uf(e.inputs,t);let r=Lf(e.inputs,t);e.compute(qf(e.inputs,r),{inputs:[0]})},x0=e=>{let t=e.starts,r=e.ends,i=e.axes;return Ae({starts:t,ends:r,axes:i})}}),Vf,Hf,S0,T0,B1=Q(()=>{fe(),ge(),je(),zr(),ye(),Vf=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Hf=(e,t)=>{let r=e.inputs[0],i=r.dims,n=N.size(i),s=i.length,a=N.normalizeAxis(t.axis,s),o=a<i.length-1,u,d=[];o?(d=Array.from({length:s},(O,x)=>x),d[a]=s-1,d[s-1]=a,u=e.compute(vt(r,d),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,f=c[s-1],h=n/f,y=Fe(f),_=f/y,w=64;h===1&&(w=256);let T=(O,x)=>x===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:x===2?`max(${O}.x, ${O}.y)`:x===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,v=P("x",u.dataType,u.dims,y),b=ae("result",u.dataType,u.dims,y),I=v.type.value,S=Xe(u.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,k=O=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables(v,b)}
      ${O.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
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
          rowSumShared = ${I}(${Cr("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,R=e.compute({name:"Softmax",shaderCache:{hint:`${y};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:_}]}),getShaderSource:k},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(vt(R,d),{inputs:[R]})},S0=(e,t)=>{Vf(e.inputs),Hf(e,t)},T0=e=>Ae({axis:e.axis})}),Oa,Gf,Ff,jf,I0,N1=Q(()=>{fe(),ge(),ye(),Oa=e=>Array.from(e.getBigInt64Array(),Number),Gf=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Oa(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Ff=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},jf=(e,t)=>{let r=e[0].dims,i=t??Oa(e[1]),n=Ff(r,i),s=N.size(n),a=e[0].dataType,o=P("input",a,r.length),u=ae("output",a,n.length),d=c=>`
      const inputShape = ${o.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(o,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...de(e[0].dims,n)]}),getShaderSource:d}},I0=e=>{Gf(e.inputs),e.compute(jf(e.inputs),{inputs:[0]})}}),Kf,Qf,E0,D1=Q(()=>{fe(),ge(),ye(),Kf=(e,t,r,i,n)=>{let s=ae("output_data",n,r.length,4),a=P("a_data",t[1].dataType,t[1].dims.length,4),o=P("b_data",t[2].dataType,t[2].dims.length,4),u=P("c_data",t[0].dataType,t[0].dims.length,4),d,c=(f,h,y)=>`select(${h}, ${f}, ${y})`;if(!i)d=s.setByOffset("global_idx",c(a.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(h,y,_="")=>{let w=`a_data[index_a${y}][component_a${y}]`,T=`b_data[index_b${y}][component_b${y}]`,v=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${a.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${h}[${y}] = ${_}(${c(w,T,v)});
          `};n===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,a,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Qf=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,s=!(N.areEqual(t,r)&&N.areEqual(r,i)),a=t,o=N.size(t);if(s){let d=pi.calcShape(pi.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");a=d,o=N.size(a)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Kf(d,e,a,s,n),getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...de(i,t,r,a)]})}},E0=e=>{e.compute(Qf(e.inputs))}}),k0,P1=Q(()=>{X$(),Ko(),J$(),e1(),t1(),r1(),i1(),u1(),d1(),c1(),p1(),f1(),h1(),m1(),g1(),y1(),_1(),w1(),b1(),v1(),$1(),x1(),S1(),T1(),I1(),jy(),E1(),k1(),C1(),z1(),A1(),jo(),O1(),Xy(),R1(),M1(),B1(),Zy(),N1(),zr(),Qo(),D1(),k0=new Map([["Abs",[vg]],["Acos",[$g]],["Acosh",[xg]],["Add",[iy]],["ArgMax",[yg,ro]],["ArgMin",[gg,ro]],["Asin",[Sg]],["Asinh",[Tg]],["Atan",[Ig]],["Atanh",[Eg]],["Attention",[_g]],["AveragePool",[o0,a0]],["BatchNormalization",[wg]],["BiasAdd",[bg]],["BiasSplitGelu",[ry]],["Cast",[Cg,kg]],["Ceil",[Ag]],["Clip",[zg]],["Concat",[fy,hy]],["Conv",[uo,oo]],["ConvTranspose",[Sy,xy]],["Cos",[Og]],["Cosh",[Rg]],["CumSum",[Ty,Iy]],["DepthToSpace",[Ey,ky]],["DequantizeLinear",[h0,m0]],["Div",[ny]],["Einsum",[Cy,zy]],["Elu",[Mg,Ni]],["Equal",[sy]],["Erf",[Bg]],["Exp",[Ng]],["Expand",[Ay]],["FastGelu",[Oy]],["Floor",[Dg]],["FusedConv",[uo,oo]],["Gather",[My,Ry]],["GatherElements",[Ly,Uy]],["GatherBlockQuantized",[Dy,Py]],["GatherND",[By,Ny]],["Gelu",[Pg]],["Gemm",[qy,Wy]],["GlobalAveragePool",[l0,u0]],["GlobalMaxPool",[f0,p0]],["Greater",[ly]],["GreaterOrEqual",[cy]],["GridSample",[Vy,Hy]],["GroupQueryAttention",[Jy]],["HardSigmoid",[Fg,Gg]],["InstanceNormalization",[e0]],["LayerNormalization",[t0]],["LeakyRelu",[Ug,Ni]],["Less",[dy]],["LessOrEqual",[py]],["Log",[ey]],["MatMul",[r0]],["MatMulNBits",[i0,n0]],["MaxPool",[d0,c0]],["Mul",[ay]],["MultiHeadAttention",[Fy,Gy]],["Neg",[Wg]],["Not",[Lg]],["Pad",[s0]],["Pow",[oy]],["QuickGelu",[ty,Ni]],["Range",[g0]],["Reciprocal",[qg]],["ReduceMin",[cg]],["ReduceMean",[ag]],["ReduceMax",[dg]],["ReduceSum",[fg]],["ReduceProd",[pg]],["ReduceL1",[og]],["ReduceL2",[ug]],["ReduceLogSum",[mg]],["ReduceLogSumExp",[lg]],["ReduceSumSquare",[hg]],["Relu",[Vg]],["Resize",[w0,b0]],["RotaryEmbedding",[Yy]],["ScatterND",[_0,y0]],["Sigmoid",[Hg]],["Sin",[jg]],["Sinh",[Kg]],["Slice",[$0,x0]],["SkipLayerNormalization",[v0]],["Split",[Ky,Qy]],["Sqrt",[Qg]],["Softmax",[S0,T0]],["Sub",[uy]],["Tan",[Zg]],["Tanh",[Yg]],["ThresholdedRelu",[Jg,Ni]],["Tile",[I0]],["Transpose",[Km,Qm]],["Where",[E0]]])}),C0,U1=Q(()=>{Ct(),gr(),ye(),C0=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){Jt(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of r)o.push({binding:o.length,resource:{buffer:d.buffer}});n&&o.push({binding:o.length,resource:n});let u=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(e.computePipeline),a.setBindGroup(0,u),a.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Lt(e.programInfo.name)}dispose(){}build(e,t){Jt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let n=jm(t,this.backend.device.limits),s=e.getShaderSource(n),a=`${i.join(`
`)}
${n.additionalImplementations}
${s}`,o=r.createShaderModule({code:a,label:e.name});Ee("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Lt(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let s=t*r*i,a=Math.ceil(Math.sqrt(s));if(a>n){if(a=Math.ceil(Math.cbrt(s)),a>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),z0={};hi(z0,{WebGpuBackend:()=>A0});var Zf,Yf,Xf,A0,L1=Q(()=>{Ct(),fe(),gr(),qm(),Z$(),P1(),U1(),Zf=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let s=e[i].dims.length;r.push(`${n};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${n};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Yf=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Zf(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Xf=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},A0=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=s=>t.features.has(s)&&r.push(s)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Xf(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Gm(this),this.programManager=new C0(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vo(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Jt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],s=n.kernelId,a=this.kernels.get(s),o=a.kernelType,u=a.kernelName,d=n.programName,c=n.inputTensorViews,f=n.outputTensorViews,h=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let _=Number(h-this.queryTimeBase),w=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:dr(T.dataType)})),outputsMetadata:f.map(T=>({dims:T.dims,dataType:dr(T.dataType)})),kernelId:s,kernelType:o,kernelName:u,programName:d,startTime:_,endTime:w});else{let T="";c.forEach((b,I)=>{T+=`input[${I}]: [${b.dims}] | ${dr(b.dataType)}, `});let v="";f.forEach((b,I)=>{v+=`output[${I}]: [${b.dims}] | ${dr(b.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${u}|${d}" ${T}${v}start time: ${_} ns, execution time: ${w-_} ns`)}Hn("GPU",`${d}::${h}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Lt()}run(e,t,r,i,n,s){Jt(e.name);let a=[];for(let b=0;b<t.length;++b){let I=t[b].data;if(I===0)continue;let S=this.gpuDataManager.get(I);if(!S)throw new Error(`no GPU data for input: ${I}`);a.push(S)}let{outputs:o,dispatchGroup:u,programUniforms:d}=e.getRunData(t),c=r.length===0?o.map((b,I)=>I):r;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let f=[],h=[];for(let b=0;b<o.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=s)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let I=c[b]===-1,S=c[b]===-2,k=I||S?n(o[b].dataType,o[b].dims):i(c[b],o[b].dataType,o[b].dims);if(f.push(k),k.data===0)continue;let R=this.gpuDataManager.get(k.data);if(!R)throw new Error(`no GPU data for output: ${k.data}`);if(I&&this.temporaryData.push(R),S){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(R)}h.push(R)}if(a.length!==t.length||h.length!==f.length){if(h.length===0)return Lt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let b=0,I=[];d.forEach(O=>{let x=typeof O.data=="number"?[O.data]:O.data;if(x.length===0)return;let q=O.type===10?2:4,G,oe;O.type===10?(oe=x.length>4?16:x.length>2?8:x.length*q,G=x.length>4?16:q*x.length):(oe=x.length<=2?x.length*q:16,G=16),b=Math.ceil(b/oe)*oe,I.push(b);let W=O.type===10?8:4;b+=x.length>4?Math.ceil(x.length/W)*G:x.length*q});let S=16;b=Math.ceil(b/S)*S;let k=new ArrayBuffer(b);d.forEach((O,x)=>{let q=I[x],G=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(k,q,G.length).set(G);else if(O.type===12)new Uint32Array(k,q,G.length).set(G);else if(O.type===10)new Uint16Array(k,q,G.length).set(G);else if(O.type===1)new Float32Array(k,q,G.length).set(G);else throw new Error(`Unsupported uniform type: ${dr(O.type)}`)});let R=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,k,0,b),this.gpuDataManager.release(R.id),y={offset:0,size:b,buffer:R.buffer}}let _=this.programManager.normalizeDispatchGroupSize(u),w=_[1]===1&&_[2]===1,T=Yf(e,t,w),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,_),this.programManager.setArtifact(T,v),Ee("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let b=0;b<d.length;b++){let I=d[b],S=I.type,k=typeof I.data=="number"?1:I.data.length,[R,O]=v.uniformVariablesInfo[b];if(S!==R||k!==O)throw new Error(`Uniform variable ${b} mismatch: expect type ${R} with size ${O}, got type ${S} with size ${k} in program "${v.programInfo.name}".`)}}if(Ee("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(v,a,h,_,y),Lt(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=k0.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,s=i.kernelName,a=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),Ee("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),a(t,o[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${d}`)),1}finally{u&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(t),a=this.gpuDataManager.registerExternalBuffer(r,i,s);return n.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Ja(this,e,t);return Ho(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ee("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ee("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ee("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(s.computePipeline),n.setBindGroup(0,s.bindGroup),n.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),O0={};hi(O0,{init:()=>R0});var kn,Jf,R0,W1=Q(()=>{fe(),gr(),ge(),Q$(),kn=class M0{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=N.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=N.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=N.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=N.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(N.size(t)!==N.size(this.dims))throw new Error("Invalid new shape");return new M0(this.module,this.dataType,this.data,t)}},Jf=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,s));let a=Number(e.getValue(i*n++,s));this.outputCount=Number(e.getValue(i*n++,s)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,s));let o=[];for(let u=0;u<a;u++){let d=Number(e.getValue(i*n++,s)),c=Number(e.getValue(i*n++,"*")),f=Number(e.getValue(i*n++,s)),h=[];for(let y=0;y<f;y++)h.push(Number(e.getValue(i*n++,s)));o.push(new kn(e,d,c,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,i=t?.outputs??[],n=(a,o,u)=>new kn(this.module,o,this.output(a,u),u),s=(a,o)=>{let u=Vr(a,o);if(!u)throw new Error(`Unsupported data type: ${a}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new kn(this.module,a,d,o)};return this.backend.run(e,r,i,n,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,n);for(let a=0;a<t.length;a++)this.module.setValue(s+i*(a+1),t[a],n);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},R0=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(L1(),Yi(z0)).WebGpuBackend,a=new s;await a.initialize(r,i),n("webgpu",[a,o=>a.alloc(Number(o)),o=>a.free(o),(o,u,d,c=!1)=>{if(c)Ee("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(d)}`),a.memcpy(Number(o),Number(u));else{Ee("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));a.upload(Number(u),f)}},async(o,u,d)=>{Ee("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${d}`),await a.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(o,u,d)=>a.createKernel(o,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>a.releaseKernel(o),(o,u,d,c)=>{Ee("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${u}`);let f=new Jf(t,a,Number(u));return a.computeKernel(Number(o),f,c)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new Hm(r);n("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,o,u,d,c)=>s.ensureTensor(a,o,u,d,c),(a,o)=>{s.uploadTensor(a,o)},async(a,o)=>s.downloadTensor(a,o),(a,o)=>s.registerMLContext(a,o),!!r.trace])}}}),eh,tu,ru,$r,th,Ra,Yn,iu,nu,Ma,su,au,ou,B0=Q(()=>{Ct(),F$(),j$(),fe(),Xr(),Uo(),Pm(),eh=(e,t)=>{Le()._OrtInit(e,t)!==0&&Re("Can't initialize onnxruntime.")},tu=async e=>{eh(e.wasm.numThreads,Fn(e.logLevel))},ru=async(e,t)=>{Le().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(W1(),Yi(O0)).init;t==="webgpu"&&await i("webgpu",Le(),e,r),t==="webnn"&&await i("webnn",Le(),e)}},$r=new Map,th=e=>{let t=Le(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&Re("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(n,s)),Number(t.getValue(n+i,s))]}finally{t.stackRestore(r)}},Ra=(e,t)=>{let r=Le(),i=r.stackSave(),n=0;try{let s=r.PTR_SIZE,a=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,a,a+s)!==0&&Re("Can't get session input/output metadata.");let o=Number(r.getValue(a,"*"));n=Number(r.getValue(a+s,"*"));let u=r.HEAP32[n/4];if(u===0)return[o,0];let d=r.HEAPU32[n/4+1],c=[];for(let f=0;f<d;f++){let h=Number(r.getValue(n+8+f*s,"*"));c.push(h!==0?r.UTF8ToString(h):Number(r.getValue(n+8+(f+d)*s,"*")))}return[o,u,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},Yn=e=>{let t=Le(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},iu=async(e,t)=>{let r,i,n=Le();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Yn(e);let s=0,a=0,o=0,u=[],d=[],c=[];try{if([a,u]=await Dm(t),t?.externalData&&n.mountExternalData){let S=[];for(let k of t.externalData){let R=typeof k=="string"?k:k.path;S.push(qo(typeof k=="string"?k:k.data).then(O=>{n.mountExternalData(R,O)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof S!="string"){let k=S,R=k?.context,O=k?.gpuDevice,x=k?.deviceType,q=k?.powerPreference;R?n.currentContext=R:O?n.currentContext=await n.webnnCreateMLContext(O):n.currentContext=await n.webnnCreateMLContext({deviceType:x,powerPreference:q})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(r,i,a),n.webgpuOnCreateSession?.(s),s===0&&Re("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,h]=th(s),y=!!t?.enableGraphCapture,_=[],w=[],T=[],v=[],b=[];for(let S=0;S<f;S++){let[k,R,O]=Ra(s,S);k===0&&Re("Can't get an input name."),d.push(k);let x=n.UTF8ToString(k);_.push(x),T.push(R===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:dr(R),shape:O})}for(let S=0;S<h;S++){let[k,R,O]=Ra(s,S+f);k===0&&Re("Can't get an output name."),c.push(k);let x=n.UTF8ToString(k);w.push(x),v.push(R===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:dr(R),shape:O});{if(y&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let q=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",G=n.webnnIsGraphOutput;if(q==="cpu"&&G&&G(s,x)){b.push("ml-tensor-cpu-output");continue}if(q!=="cpu"&&q!=="cpu-pinned"&&q!=="gpu-buffer"&&q!=="ml-tensor")throw new Error(`Not supported preferred output location: ${q}.`);if(y&&q!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${q}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(q)}}let I=null;return b.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(s),o===0&&Re("Can't create IO binding."),I={handle:o,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>Ya(S))}),$r.set(s,[s,d,c,I,y,!1]),[s,_,w,T,v]}catch(f){throw d.forEach(h=>n._OrtFree(h)),c.forEach(h=>n._OrtFree(h)),o!==0&&n._OrtReleaseBinding(o)!==0&&Re("Can't release IO binding."),s!==0&&n._OrtReleaseSession(s)!==0&&Re("Can't release session."),f}finally{n._free(r),a!==0&&n._OrtReleaseSessionOptions(a)!==0&&Re("Can't release session options."),u.forEach(f=>n._free(f)),n.unmountExternalData?.()}},nu=e=>{let t=Le(),r=$r.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,s,a,o]=r;a&&(o&&t._OrtClearBoundOutputs(a.handle)!==0&&Re("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&Re("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(u=>t._OrtFree(u)),s.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(i)!==0&&Re("Can't release session."),$r.delete(e)},Ma=async(e,t,r,i,n,s,a=!1)=>{if(!e){t.push(0);return}let o=Le(),u=o.PTR_SIZE,d=e[0],c=e[1],f=e[3],h=f,y,_;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;_=Vr(qr(d),c);{let b=o.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=b(i,s,v,_)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;_=Vr(qr(d),c);let b=o.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=b(i,v,qr(d),c)}else{let v=e[2];if(Array.isArray(v)){_=u*v.length,y=o._malloc(_),r.push(y);for(let b=0;b<v.length;b++){if(typeof v[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);o.setValue(y+b*u,Dt(v[b],r),"*")}}else{let b=o.webnnIsGraphInput,I=o.webnnIsGraphOutput;if(d!=="string"&&b&&I){let S=o.UTF8ToString(n);if(b(i,S)||I(i,S)){let k=qr(d);_=Vr(k,c),h="ml-tensor";let R=o.webnnCreateTemporaryTensor,O=o.webnnUploadTensor;if(!R||!O)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await R(i,k,c);O(x,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),y=x}else _=v.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,_),y)}else _=v.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,_),y)}}let w=o.stackSave(),T=o.stackAlloc(4*c.length);try{c.forEach((b,I)=>o.setValue(T+I*u,b,u===4?"i32":"i64"));let v=o._OrtCreateTensor(qr(d),y,_,T,c.length,Ya(h));v===0&&Re(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push(v)}finally{o.stackRestore(w)}},su=async(e,t,r,i,n,s)=>{let a=Le(),o=a.PTR_SIZE,u=$r.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],c=u[1],f=u[2],h=u[3],y=u[4],_=u[5],w=t.length,T=i.length,v=0,b=[],I=[],S=[],k=[],R=[],O=a.stackSave(),x=a.stackAlloc(w*o),q=a.stackAlloc(w*o),G=a.stackAlloc(T*o),oe=a.stackAlloc(T*o);try{[v,b]=Nm(s),Fr("wasm prepareInputOutputTensor");for(let L=0;L<w;L++)await Ma(r[L],I,k,e,c[t[L]],t[L],y);for(let L=0;L<T;L++)await Ma(n[L],S,k,e,f[i[L]],w+i[L],y);jr("wasm prepareInputOutputTensor");for(let L=0;L<w;L++)a.setValue(x+L*o,I[L],"*"),a.setValue(q+L*o,c[t[L]],"*");for(let L=0;L<T;L++)a.setValue(G+L*o,S[L],"*"),a.setValue(oe+L*o,f[i[L]],"*");if(h&&!_){let{handle:L,outputPreferredLocations:Z,outputPreferredLocationsEncoded:ie}=h;if(c.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${c.length}).`);Fr("wasm bindInputsOutputs");for(let X=0;X<w;X++){let le=t[X];await a._OrtBindInput(L,c[le],I[X])!==0&&Re(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<T;X++){let le=i[X];n[X]?.[3]?(R.push(S[X]),a._OrtBindOutput(L,f[le],S[X],0)!==0&&Re(`Can't bind pre-allocated output[${X}] for session=${e}.`)):a._OrtBindOutput(L,f[le],0,ie[le])!==0&&Re(`Can't bind output[${X}] to ${Z[X]} for session=${e}.`)}jr("wasm bindInputsOutputs"),$r.set(e,[d,c,f,h,y,!0])}a.jsepOnRunStart?.(d),a.webnnOnRunStart?.(d);let W;h?W=await a._OrtRunWithBinding(d,h.handle,T,G,v):W=await a._OrtRun(d,q,x,w,oe,T,G,v),W!==0&&Re("failed to call OrtRun().");let j=[],M=[];Fr("wasm ProcessOutputTensor");for(let L=0;L<T;L++){let Z=Number(a.getValue(G+L*o,"*"));if(Z===S[L]||R.includes(S[L])){j.push(n[L]),Z!==S[L]&&a._OrtReleaseTensor(Z)!==0&&Re("Can't release tensor.");continue}let ie=a.stackSave(),X=a.stackAlloc(4*o),le=!1,Se,U=0;try{a._OrtGetTensorData(Z,X,X+o,X+2*o,X+3*o)!==0&&Re(`Can't access output tensor data on index ${L}.`);let Y=o===4?"i32":"i64",pe=Number(a.getValue(X,Y));U=a.getValue(X+o,"*");let ve=a.getValue(X+o*2,"*"),st=Number(a.getValue(X+o*3,Y)),Ze=[];for(let Ge=0;Ge<st;Ge++)Ze.push(Number(a.getValue(ve+Ge*o,Y)));a._OrtFree(ve)!==0&&Re("Can't free memory for tensor dims.");let tt=Ze.reduce((Ge,Oe)=>Ge*Oe,1);Se=dr(pe);let $t=h?.outputPreferredLocations[i[L]];if(Se==="string"){if($t==="gpu-buffer"||$t==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ge=[];for(let Oe=0;Oe<tt;Oe++){let at=a.getValue(U+Oe*o,"*"),C=a.getValue(U+(Oe+1)*o,"*"),z=Oe===tt-1?void 0:C-at;Ge.push(a.UTF8ToString(at,z))}j.push([Se,Ze,Ge,"cpu"])}else if($t==="gpu-buffer"&&tt>0){let Ge=a.jsepGetBuffer;if(!Ge)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Oe=Ge(U),at=Vr(pe,tt);if(at===void 0||!Lo(Se))throw new Error(`Unsupported data type: ${Se}`);le=!0,j.push([Se,Ze,{gpuBuffer:Oe,download:a.jsepCreateDownloader(Oe,at,Se),dispose:()=>{a._OrtReleaseTensor(Z)!==0&&Re("Can't release tensor.")}},"gpu-buffer"])}else if($t==="ml-tensor"&&tt>0){let Ge=a.webnnEnsureTensor,Oe=a.webnnIsGraphInputOutputTypeSupported;if(!Ge||!Oe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Vr(pe,tt)===void 0||!Wo(Se))throw new Error(`Unsupported data type: ${Se}`);if(!Oe(e,Se,!1))throw new Error(`preferredLocation "ml-tensor" for ${Se} output is not supported by current WebNN Context.`);let at=await Ge(e,U,pe,Ze,!1);le=!0,j.push([Se,Ze,{mlTensor:at,download:a.webnnCreateMLTensorDownloader(U,Se),dispose:()=>{a.webnnReleaseTensorId(U),a._OrtReleaseTensor(Z)}},"ml-tensor"])}else if($t==="ml-tensor-cpu-output"&&tt>0){let Ge=a.webnnCreateMLTensorDownloader(U,Se)(),Oe=j.length;le=!0,M.push((async()=>{let at=[Oe,await Ge];return a.webnnReleaseTensorId(U),a._OrtReleaseTensor(Z),at})()),j.push([Se,Ze,[],"cpu"])}else{let Ge=os(Se),Oe=new Ge(tt);new Uint8Array(Oe.buffer,Oe.byteOffset,Oe.byteLength).set(a.HEAPU8.subarray(U,U+Oe.byteLength)),j.push([Se,Ze,Oe,"cpu"])}}finally{a.stackRestore(ie),Se==="string"&&U&&a._free(U),le||a._OrtReleaseTensor(Z)}}h&&!y&&(a._OrtClearBoundOutputs(h.handle)!==0&&Re("Can't clear bound outputs."),$r.set(e,[d,c,f,h,y,!1]));for(let[L,Z]of await Promise.all(M))j[L][2]=Z;return jr("wasm ProcessOutputTensor"),j}finally{a.webnnOnRunEnd?.(d),a.stackRestore(O),I.forEach(W=>a._OrtReleaseTensor(W)),S.forEach(W=>a._OrtReleaseTensor(W)),k.forEach(W=>a._free(W)),v!==0&&a._OrtReleaseRunOptions(v),b.forEach(W=>a._free(W))}},au=e=>{let t=Le(),r=$r.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&Re("Can't get an profile file name."),t._OrtFree(n)},ou=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),xr,Tt,ri,Ai,Oi,Cn,Ba,zn,Dr,Pr,rh,N0,D0,P0,U0,L0,W0,q0,V0=Q(()=>{Ct(),B0(),Xr(),Do(),xr=()=>!!Ue.wasm.proxy&&typeof document<"u",ri=!1,Ai=!1,Oi=!1,zn=new Map,Dr=(e,t)=>{let r=zn.get(e);r?r.push(t):zn.set(e,[t])},Pr=()=>{if(ri||!Ai||Oi||!Tt)throw new Error("worker not ready")},rh=e=>{switch(e.data.type){case"init-wasm":ri=!1,e.data.err?(Oi=!0,Ba[1](e.data.err)):(Ai=!0,Ba[0]()),Cn&&(URL.revokeObjectURL(Cn),Cn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=zn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},N0=async()=>{if(!Ai){if(ri)throw new Error("multiple calls to 'initWasm()' detected.");if(Oi)throw new Error("previous call to 'initWasm()' failed.");if(ri=!0,xr())return new Promise((e,t)=>{Tt?.terminate(),Mm().then(([r,i])=>{try{Tt=i,Tt.onerror=s=>t(s),Tt.onmessage=rh,Ba=[e,t];let n={type:"init-wasm",in:Ue};!n.in.wasm.wasmPaths&&(r||Za)&&(n.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href,import.meta.url).href}),Tt.postMessage(n),Cn=r}catch(n){t(n)}},t)});try{await Po(Ue.wasm),await tu(Ue),Ai=!0}catch(e){throw Oi=!0,e}finally{ri=!1}}},D0=async e=>{if(xr())return Pr(),new Promise((t,r)=>{Dr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:Ue}};Tt.postMessage(i)});await ru(Ue,e)},P0=async e=>xr()?(Pr(),new Promise((t,r)=>{Dr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Tt.postMessage(i,[e.buffer])})):Yn(e),U0=async(e,t)=>{if(xr()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Pr(),new Promise((r,i)=>{Dr("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Tt.postMessage(n,s)})}else return iu(e,t)},L0=async e=>{if(xr())return Pr(),new Promise((t,r)=>{Dr("release",[t,r]);let i={type:"release",in:e};Tt.postMessage(i)});nu(e)},W0=async(e,t,r,i,n,s)=>{if(xr()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Pr(),new Promise((a,o)=>{Dr("run",[a,o]);let u=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:s}};Tt.postMessage(d,ou(u))})}else return su(e,t,r,i,n,s)},q0=async e=>{if(xr())return Pr(),new Promise((t,r)=>{Dr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Tt.postMessage(i)});au(e)}}),Na,ih,H0,q1=Q(()=>{Ct(),V0(),fe(),No(),Pm(),Na=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ih=e=>{switch(e[3]){case"cpu":return new Pt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Lo(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Pt.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!Wo(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Pt.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},H0=class{async fetchModelAndCopyToWasmMemory(e){return P0(await qo(e))}async loadModel(e,t){Jt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await U0(r,t),Lt()}async dispose(){return L0(this.sessionId)}async run(e,t,r){Jt();let i=[],n=[];Object.entries(e).forEach(f=>{let h=f[0],y=f[1],_=this.inputNames.indexOf(h);if(_===-1)throw new Error(`invalid input '${h}'`);i.push(y),n.push(_)});let s=[],a=[];Object.entries(t).forEach(f=>{let h=f[0],y=f[1],_=this.outputNames.indexOf(h);if(_===-1)throw new Error(`invalid output '${h}'`);s.push(y),a.push(_)});let o=i.map((f,h)=>Na(f,()=>`input "${this.inputNames[n[h]]}"`)),u=s.map((f,h)=>f?Na(f,()=>`output "${this.outputNames[a[h]]}"`):null),d=await W0(this.sessionId,n,o,a,u,r),c={};for(let f=0;f<d.length;f++)c[this.outputNames[a[f]]]=s[f]??ih(d[f]);return Lt(),c}startProfiling(){}endProfiling(){q0(this.sessionId)}}}),G0={};hi(G0,{OnnxruntimeWebAssemblyBackend:()=>po,initializeFlags:()=>co,wasmBackend:()=>F0});var co,po,F0,V1=Q(()=>{Ct(),V0(),q1(),co=()=>{(typeof Ue.wasm.initTimeout!="number"||Ue.wasm.initTimeout<0)&&(Ue.wasm.initTimeout=0);let e=Ue.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Ue.wasm.simd=!1),typeof Ue.wasm.proxy!="boolean"&&(Ue.wasm.proxy=!1),typeof Ue.wasm.trace!="boolean"&&(Ue.wasm.trace=!1),typeof Ue.wasm.numThreads!="number"||!Number.isInteger(Ue.wasm.numThreads)||Ue.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Ue.wasm.numThreads=1;else{let t=typeof navigator>"u"?k$("node:os").cpus().length:navigator.hardwareConcurrency;Ue.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},po=class{async init(e){co(),await N0(),await D0(e)}async createInferenceSessionHandler(e,t){let r=new H0;return await r.loadModel(e,t),r}},F0=new po});Ct();Ct();Ct();var H1="1.24.1";{let e=(V1(),Yi(G0)).wasmBackend;ni("webgpu",e,5),ni("webnn",e,5),ni("cpu",e,10),ni("wasm",e,10)}Object.defineProperty(Ue.versions,"web",{value:H1,enumerable:!0});class G1 extends S${constructor(t){super(t),this.session=null,this.dictPath=t.dictPath}async init(t,r={}){console.log(`正在加载汉字词典: ${this.dictPath}`);const i=await fetch(this.dictPath);if(!i.ok)throw new Error(`汉字词典请求失败: ${i.status} ${i.statusText} (路径: ${this.dictPath})`);const n=await i.text();await this.loadDictFromContent(n,this.dictPath),console.log(`正在加载 ONNX 模型: ${t}`);try{this.session=await Bo.create(t,{executionProviders:["webgpu","webgl","wasm"],...r}),console.log("模型加载成功")}catch(s){throw console.error("ONNX 模型加载失败:",s),s}}async recognize(t,r){if(!this.session)throw new Error("Session not initialized");const{data:i,width:n,height:s}=this.getPreprocessingCanvas(t,r);if(r?.aborted)throw new Error("Aborted");const a=new Pt("float32",i,[1,3,s,n]);try{const o=await this.session.run({[this.session.inputNames[0]]:a});if(r?.aborted)throw new Error("Aborted");const u=o[this.session.outputNames[0]],d=this.postProcess(u.data,u.dims);for(const c in o)o[c]?.dispose();return d}finally{a.dispose()}}async dispose(){if(super.dispose(),this.session){try{await this.session.release()}catch(t){console.error("释放 ONNX 会话失败:",t)}this.session=null}}}class F1{constructor(){this.dict={}}async init(t){console.log(`正在加载拼音词典: ${t}`);const r=await fetch(t);if(!r.ok)throw new Error(`拼音词典请求失败: ${r.status} ${r.statusText} (路径: ${t})`);const i=r.headers.get("content-type");if(i&&i.includes("text/html")){const n=await r.text();throw console.error("收到的 HTML 内容前 100 字符:",n.substring(0,100)),new Error(`拼音词典加载失败：路径 "${t}" 返回了 HTML 页面而非 JSON。这通常是因为文件不存在，且服务器返回了 404 备用页面。`)}this.dict=await r.json(),console.log("拼音词典加载成功")}match(t){const r=this.dict[t.toLowerCase()];return r?r.split("").map(i=>({character:i,score:1})):[]}}const j1="PP-OCRv5_rec_mobile_infer.onnx",K1="ppocrv5_dict.txt",Q1="pinyin_dict.json",Da={modelPath:j1,dictPath:K1,pinyinDictPath:Q1};class Z1{constructor(t={}){this.recognizer=null,this.topK=t.topK||10,this.pinyinMatcher=new F1}async init(t,r,i){const n=t||Da.modelPath,s=r||Da.dictPath,a=i||Da.pinyinDictPath;this.recognizer&&await this.recognizer.dispose(),this.recognizer=new G1({dictPath:s,topK:this.topK}),await Promise.all([this.recognizer.init(n),this.pinyinMatcher.init(a)])}async dispose(){this.recognizer&&(await this.recognizer.dispose(),this.recognizer=null)}async recognize(t,r){if(!this.recognizer)throw new Error("Call init() first");return this.recognizer.recognize(t,r)}matchPinyin(t){return this.pinyinMatcher.match(t)}}const Y1={class:"app-container"},X1={key:0,class:"loading-overlay"},J1={class:"loader-text"},e2={class:"main-card"},t2={class:"display-area"},r2={class:"input-display"},i2={key:0,class:"empty-hint recognizer-hint"},n2=["onClick","title"],s2={key:2,class:"empty-hint"},a2={class:"input-tabs"},o2={class:"panel-container"},u2={class:"panel handwriting-panel"},l2={class:"panel keyboard-panel"},d2={class:"keyboard"},c2=["onClick"],p2={class:"kb-row"},f2=Zb({__name:"App",setup(e){Ue.wasm.wasmPaths=W=>`./libs/${W}`,Ue.wasm.numThreads=1;const t=At("handwriting"),r=At(!0),i=At("正在初始化离线引擎..."),n=At(""),s=At(""),a=At([]),o=At(!1),u=At(!1),d=At(!1),c=At(null),f=At(null);let h,y=null,_=null,w=null;Lh(async()=>{try{h=new Z1({topK:15}),await h.init("./libs/PP-OCRv5_rec_mobile_infer.onnx","./libs/ppocrv5_dict.txt","./libs/pinyin_dict.json"),r.value=!1,zh(()=>{T()})}catch(W){i.value="初始化失败: "+W.message,console.error(W)}window.addEventListener("resize",b)}),Co(async()=>{window.removeEventListener("resize",b),h&&await h.dispose()});const T=()=>{c.value&&(y=c.value.getContext("2d"),b())},v=()=>{y&&(y.lineWidth=12,y.lineJoin="round",y.lineCap="round",y.strokeStyle="#1c1c1e")},b=()=>{if(!c.value||!f.value)return;const W=f.value;c.value.width=W.clientWidth,c.value.height=W.clientHeight,v()},I=W=>{if(!c.value)return{x:0,y:0};const j=c.value.getBoundingClientRect(),M="touches"in W?W.touches[0].clientX:W.clientX,L="touches"in W?W.touches[0].clientY:W.clientY;return{x:(M-j.left)*(c.value.width/j.width),y:(L-j.top)*(c.value.height/j.height)}},S=W=>{if(t.value!=="handwriting"||!y)return;_&&(_.abort(),_=null),d.value=!1,u.value=!0;const{x:j,y:M}=I(W);y.beginPath(),y.moveTo(j,M),clearTimeout(w),s.value&&(s.value="",a.value=[])},k=W=>{if(!u.value||!y)return;const{x:j,y:M}=I(W);y.lineTo(j,M),y.stroke()},R=()=>{u.value&&(u.value=!1,w=setTimeout(async()=>{_&&_.abort(),_=new AbortController;const W=_.signal;try{if(!c.value)return;d.value=!0;const j=await h.recognize(c.value,W);a.value=j.candidates,o.value=!1}catch(j){j.message!=="Aborted"&&console.error("识别出错:",j)}finally{W.aborted||(d.value=!1)}},300))},O=W=>{W==="space"?x(" "):W==="backspace"||W==="退格"?s.value=s.value.slice(0,-1):W==="clear"||W==="清空"?s.value="":s.value+=W};On(s,W=>{W?(o.value=!0,a.value=h.matchPinyin(W)):o.value&&(a.value=[])});const x=W=>{n.value+=W,o.value&&(s.value=""),y&&c.value&&y.clearRect(0,0,c.value.width,c.value.height),a.value=[]},q=()=>{n.value="",s.value="",a.value=[],y&&c.value&&y.clearRect(0,0,c.value.width,c.value.height)},G=async()=>{if(!n.value)return;await navigator.clipboard.writeText(n.value);const W="复制结果",j=document.getElementById("copyBtn");j&&(j.innerText="已复制!",setTimeout(()=>{j.innerText=W},1500))},oe=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["清空","z","x","c","v","b","n","m","退格"]];return(W,j)=>(jt(),ir("div",Y1,[r.value?(jt(),ir("div",X1,[j[3]||(j[3]=Me("div",{class:"spinner"},null,-1)),Me("div",J1,Ur(i.value),1)])):Uv("",!0),Me("div",e2,[j[6]||(j[6]=Me("header",{class:"header"},[Me("div",{class:"logo"},[Me("span",{class:"logo-icon"},"✎"),Me("h1",null,"ibus-qikai")]),Me("a",{href:"https://github.com/kekxv/ibus-qikai",target:"_blank",class:"github-link"}," GitHub ")],-1)),Me("div",t2,[Me("div",{class:ar(["pinyin-indicator",{visible:s.value||o.value}])},Ur(s.value||"拼音输入"),3),Me("div",r2,[ja(Ur(n.value),1),j[4]||(j[4]=Me("span",{class:"cursor"},"|",-1))])]),Me("div",{class:ar(["candidate-bar",{empty:a.value.length===0}])},[d.value?(jt(),ir("div",i2,[...j[5]||(j[5]=[Me("span",{class:"mini-spinner"},null,-1),ja(" 正在识别... ",-1)])])):a.value.length>0?(jt(!0),ir(It,{key:1},Ms(a.value,M=>(jt(),ir("div",{key:M.character,class:"candidate-item",onClick:L=>x(M.character),title:o.value?"":`置信度: ${(M.score*100).toFixed(1)}%`},Ur(M.character),9,n2))),128)):(jt(),ir("div",s2,Ur(t.value==="handwriting"?"请在下方区域书写":"请点击键盘输入"),1))],2),Me("div",a2,[Me("button",{class:ar(["tab-btn",{active:t.value==="handwriting"}]),onClick:j[0]||(j[0]=M=>t.value="handwriting")}," 手写输入 ",2),Me("button",{class:ar(["tab-btn",{active:t.value==="keyboard"}]),onClick:j[1]||(j[1]=M=>t.value="keyboard")}," 拼音键盘 ",2)]),Me("div",o2,[Xl(Me("div",u2,[Me("div",{ref_key:"containerRef",ref:f,class:ar(["canvas-container",{drawing:u.value}]),onMousedown:S,onMousemove:k,onMouseup:R,onMouseleave:R,onTouchstart:Ls(S,["prevent"]),onTouchmove:Ls(k,["prevent"]),onTouchend:Ls(R,["prevent"])},[Me("canvas",{ref_key:"canvasRef",ref:c},null,512)],34)],512),[[hd,t.value==="handwriting"]]),Xl(Me("div",l2,[Me("div",d2,[(jt(),ir(It,null,Ms(oe,(M,L)=>Me("div",{key:L,class:"kb-row"},[(jt(!0),ir(It,null,Ms(M,Z=>(jt(),ir("div",{key:Z,class:ar(["key",{wide:Z==="退格"||Z==="清空",danger:Z==="清空"}]),onClick:ie=>O(Z)},Ur(Z),11,c2))),128))])),64)),Me("div",p2,[Me("div",{class:"key space",onClick:j[2]||(j[2]=M=>O("space"))},"Space")])])],512),[[hd,t.value==="keyboard"]])]),Me("div",{class:"actions"},[Me("button",{class:"btn btn-secondary",onClick:q},"重置"),Me("button",{id:"copyBtn",class:"btn btn-primary",onClick:G},"复制结果")])])]))}});v$(f2).mount("#app");
