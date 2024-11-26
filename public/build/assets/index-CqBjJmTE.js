import{r as m}from"./app-BPM_M96_.js";import{d as P,e as g}from"./utils-BpEC-At6.js";function h(e,n){return m.useReducer((t,r)=>n[t][r]??t,e)}var R=e=>{const{present:n,children:t}=e,r=C(n),o=typeof t=="function"?t({present:r.isPresent}):m.Children.only(t),s=P(r.ref,U(o));return typeof t=="function"||r.isPresent?m.cloneElement(o,{ref:s}):null};R.displayName="Presence";function C(e){const[n,t]=m.useState(),r=m.useRef({}),o=m.useRef(e),s=m.useRef("none"),v=e?"mounted":"unmounted",[f,d]=h(v,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return m.useEffect(()=>{const i=y(r.current);s.current=f==="mounted"?i:"none"},[f]),g(()=>{const i=r.current,a=o.current;if(a!==e){const c=s.current,l=y(i);e?d("MOUNT"):l==="none"||(i==null?void 0:i.display)==="none"?d("UNMOUNT"):d(a&&c!==l?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,d]),g(()=>{if(n){let i;const a=n.ownerDocument.defaultView??window,u=l=>{const A=y(r.current).includes(l.animationName);if(l.target===n&&A&&(d("ANIMATION_END"),!o.current)){const N=n.style.animationFillMode;n.style.animationFillMode="forwards",i=a.setTimeout(()=>{n.style.animationFillMode==="forwards"&&(n.style.animationFillMode=N)})}},c=l=>{l.target===n&&(s.current=y(r.current))};return n.addEventListener("animationstart",c),n.addEventListener("animationcancel",u),n.addEventListener("animationend",u),()=>{a.clearTimeout(i),n.removeEventListener("animationstart",c),n.removeEventListener("animationcancel",u),n.removeEventListener("animationend",u)}}else d("ANIMATION_END")},[n,d]),{isPresent:["mounted","unmountSuspended"].includes(f),ref:m.useCallback(i=>{i&&(r.current=getComputedStyle(i)),t(i)},[])}}function y(e){return(e==null?void 0:e.animationName)||"none"}function U(e){var r,o;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function E(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=E(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function w(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=E(e))&&(r&&(r+=" "),r+=n);return r}const M=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,T=w,b=(e,n)=>t=>{var r;if((n==null?void 0:n.variants)==null)return T(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:o,defaultVariants:s}=n,v=Object.keys(o).map(i=>{const a=t==null?void 0:t[i],u=s==null?void 0:s[i];if(a===null)return null;const c=M(a)||M(u);return o[i][c]}),f=t&&Object.entries(t).reduce((i,a)=>{let[u,c]=a;return c===void 0||(i[u]=c),i},{}),d=n==null||(r=n.compoundVariants)===null||r===void 0?void 0:r.reduce((i,a)=>{let{class:u,className:c,...l}=a;return Object.entries(l).every(O=>{let[A,N]=O;return Array.isArray(N)?N.includes({...s,...f}[A]):{...s,...f}[A]===N})?[...i,u,c]:i},[]);return T(e,v,d,t==null?void 0:t.class,t==null?void 0:t.className)};export{R as P,b as c};
