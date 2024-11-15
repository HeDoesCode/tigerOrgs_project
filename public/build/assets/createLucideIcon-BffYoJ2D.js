import{r as a,j as h,R as v}from"./app-DAiht2ME.js";import{d as E,S as N,P as I}from"./utils-CERSI23P.js";function _(e,t=[]){let o=[];function u(r,c){const s=a.createContext(c),l=o.length;o=[...o,c];function m(C){const{scope:p,children:d,...n}=C,x=(p==null?void 0:p[e][l])||s,f=a.useMemo(()=>n,Object.values(n));return h.jsx(x.Provider,{value:f,children:d})}function R(C,p){const d=(p==null?void 0:p[e][l])||s,n=a.useContext(d);if(n)return n;if(c!==void 0)return c;throw new Error(`\`${C}\` must be used within \`${r}\``)}return m.displayName=r+"Provider",[m,R]}const i=()=>{const r=o.map(c=>a.createContext(c));return function(s){const l=(s==null?void 0:s[e])||r;return a.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return i.scopeName=e,[u,P(i,...t)]}function P(...e){const t=e[0];if(e.length===1)return t;const o=()=>{const u=e.map(i=>({useScope:i(),scopeName:i.scopeName}));return function(r){const c=u.reduce((s,{useScope:l,scopeName:m})=>{const C=l(r)[`__scope${m}`];return{...s,...C}},{});return a.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return o.scopeName=t.scopeName,o}function V(e){const t=e+"CollectionProvider",[o,u]=_(t),[i,r]=o(t,{collectionRef:{current:null},itemMap:new Map}),c=d=>{const{scope:n,children:x}=d,f=v.useRef(null),w=v.useRef(new Map).current;return h.jsx(i,{scope:n,itemMap:w,collectionRef:f,children:x})};c.displayName=t;const s=e+"CollectionSlot",l=v.forwardRef((d,n)=>{const{scope:x,children:f}=d,w=r(s,x),S=E(n,w.collectionRef);return h.jsx(N,{ref:S,children:f})});l.displayName=s;const m=e+"CollectionItemSlot",R="data-radix-collection-item",C=v.forwardRef((d,n)=>{const{scope:x,children:f,...w}=d,S=v.useRef(null),y=E(n,S),M=r(m,x);return v.useEffect(()=>(M.itemMap.set(S,{ref:S,...w}),()=>void M.itemMap.delete(S))),h.jsx(N,{[R]:"",ref:y,children:f})});C.displayName=m;function p(d){const n=r(e+"CollectionConsumer",d);return v.useCallback(()=>{const f=n.collectionRef.current;if(!f)return[];const w=Array.from(f.querySelectorAll(`[${R}]`));return Array.from(n.itemMap.values()).sort((M,A)=>w.indexOf(M.ref.current)-w.indexOf(A.ref.current))},[n.collectionRef,n.itemMap])}return[{Provider:c,Slot:l,ItemSlot:C},p,u]}var b="VisuallyHidden",j=a.forwardRef((e,t)=>h.jsx(I.span,{...e,ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));j.displayName=b;/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=(...e)=>e.filter((t,o,u)=>!!t&&u.indexOf(t)===o).join(" ");/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:u,className:i="",children:r,iconNode:c,...s},l)=>a.createElement("svg",{ref:l,...O,width:t,height:t,stroke:e,strokeWidth:u?Number(o)*24/Number(t):o,className:g("lucide",i),...s},[...c.map(([m,R])=>a.createElement(m,R)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(e,t)=>{const o=a.forwardRef(({className:u,...i},r)=>a.createElement(L,{ref:r,iconNode:t,className:g(`lucide-${$(e)}`,u),...i}));return o.displayName=`${e}`,o};export{j as V,V as a,B as c};
