import{j as t,r as d,W as R,Y as z}from"./app-Kp9HHh1H.js";import{M as O}from"./MainAdminFrame-CFN9gimy.js";import{S as V}from"./SuperAdminLayout-BcIhuvil.js";import{I as P}from"./IconCheckBox-CQ2pNOwB.js";import{A as y,a as C,b as k}from"./alert-ri5CQQcP.js";import{P as M,c as T}from"./utils-DNO_5vj8.js";import{c as A}from"./createLucideIcon-BjRubLH9.js";import"./button-DDbhz7FP.js";import"./index-_-jzJBuK.js";import"./IconMenu3-Dhy6hzSL.js";import"./Logo-Bso1o9Xz.js";import"./index-JuM3licE.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=A("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=A("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);function G({size:e}){return t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-file-upload",children:[t.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t.jsx("path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}),t.jsx("path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"}),t.jsx("path",{d:"M12 11v6"}),t.jsx("path",{d:"M9.5 13.5l2.5 -2.5l2.5 2.5"})]})}function S({handleFileChange:e,fileType:s}){const[o,n]=d.useState(""),r=c=>{const a=c.target.files[0];a&&(n(a.name),e(c,s))},i=()=>{switch(s){case"Student File":return".csv";case"Organization File":return".json";default:return""}};return t.jsxs("div",{className:"flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out",children:[t.jsxs("label",{className:"cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md",children:[t.jsxs("span",{children:["Upload New ",s]}),t.jsx(G,{}),t.jsx("input",{type:"file",accept:i(),onChange:r,className:"hidden"})]}),o&&t.jsx("span",{className:"ml-3 text-gray-700",children:o})]})}function H(e,s=[]){let o=[];function n(i,c){const a=d.createContext(c),l=o.length;o=[...o,c];function f(p){const{scope:x,children:g,...u}=p,m=(x==null?void 0:x[e][l])||a,h=d.useMemo(()=>u,Object.values(u));return t.jsx(m.Provider,{value:h,children:g})}function v(p,x){const g=(x==null?void 0:x[e][l])||a,u=d.useContext(g);if(u)return u;if(c!==void 0)return c;throw new Error(`\`${p}\` must be used within \`${i}\``)}return f.displayName=i+"Provider",[f,v]}const r=()=>{const i=o.map(c=>d.createContext(c));return function(a){const l=(a==null?void 0:a[e])||i;return d.useMemo(()=>({[`__scope${e}`]:{...a,[e]:l}}),[a,l])}};return r.scopeName=e,[n,X(r,...s)]}function X(...e){const s=e[0];if(e.length===1)return s;const o=()=>{const n=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(i){const c=n.reduce((a,{useScope:l,scopeName:f})=>{const p=l(i)[`__scope${f}`];return{...a,...p}},{});return d.useMemo(()=>({[`__scope${s.scopeName}`]:c}),[c])}};return o.scopeName=s.scopeName,o}var w="Progress",N=100,[Y,xe]=H(w),[q,J]=Y(w),D=d.forwardRef((e,s)=>{const{__scopeProgress:o,value:n=null,max:r,getValueLabel:i=K,...c}=e;(r||r===0)&&!F(r)&&console.error(Q(`${r}`,"Progress"));const a=F(r)?r:N;n!==null&&!I(n,a)&&console.error(Z(`${n}`,"Progress"));const l=I(n,a)?n:null,f=j(l)?i(l,a):void 0;return t.jsx(q,{scope:o,value:l,max:a,children:t.jsx(M.div,{"aria-valuemax":a,"aria-valuemin":0,"aria-valuenow":j(l)?l:void 0,"aria-valuetext":f,role:"progressbar","data-state":E(l,a),"data-value":l??void 0,"data-max":a,...c,ref:s})})});D.displayName=w;var U="ProgressIndicator",$=d.forwardRef((e,s)=>{const{__scopeProgress:o,...n}=e,r=J(U,o);return t.jsx(M.div,{"data-state":E(r.value,r.max),"data-value":r.value??void 0,"data-max":r.max,...n,ref:s})});$.displayName=U;function K(e,s){return`${Math.round(e/s*100)}%`}function E(e,s){return e==null?"indeterminate":e===s?"complete":"loading"}function j(e){return typeof e=="number"}function F(e){return j(e)&&!isNaN(e)&&e>0}function I(e,s){return j(e)&&!isNaN(e)&&e<=s&&e>=0}function Q(e,s){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${s}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${N}\`.`}function Z(e,s){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${s}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${N} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var L=D,ee=$;const _=d.forwardRef(({className:e,value:s,...o},n)=>t.jsx(L,{ref:n,className:T("relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",e),...o,children:t.jsx(ee,{className:"h-full w-full flex-1 bg-slate-900 transition-all dark:bg-slate-50",style:{transform:`translateX(-${100-(s||0)}%)`}})}));_.displayName=L.displayName;const te=({progress:e,isUploading:s})=>s?t.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:t.jsxs("div",{className:"bg-white p-6 rounded-lg max-w-md w-full mx-4 space-y-4",children:[t.jsxs(y,{variant:"warning",className:"mb-4",children:[t.jsx(B,{className:"h-4 w-4"}),t.jsx(C,{children:"Please Don't Close the Window"}),t.jsx(k,{children:"File upload is in progress. Closing the window may corrupt the data."})]}),t.jsxs("div",{className:"space-y-2",children:[t.jsxs("div",{className:"flex justify-between text-sm",children:[t.jsx("span",{className:"font-medium",children:"Upload Progress"}),t.jsxs("span",{children:[e,"%"]})]}),t.jsx(_,{value:e,className:"w-full"})]}),e===100&&t.jsxs(y,{variant:"success",className:"mt-4",children:[t.jsx(W,{className:"h-4 w-4"}),t.jsx(C,{children:"Upload Complete"}),t.jsx(k,{children:"Your files have been successfully uploaded."})]})]})}):null;function fe(){const[e,s]=d.useState(!1),[o,n]=d.useState(0),r=d.useRef(null),i=d.useRef(0),{data:c,setData:a,post:l,reset:f}=R({studentFile:null,organizationFile:null}),v=(u,m)=>{switch(m){case"Student File":a("studentFile",u.target.files[0]);break;case"Organization File":a("organizationFile",u.target.files[0]);break}},p=()=>{r.current&&(clearInterval(r.current),r.current=null),i.current=0},x=u=>{u.preventDefault(),s(!0),n(0),i.current=0,r.current=setInterval(()=>{n(m=>{if(m<i.current)return i.current;const h=Math.max(1,10*(1-m/100));return Math.min(85,m+h)})},1e3),l(route("superadmin.dataupload.file"),{onProgress:m=>{if(m.percentage){const h=Math.min(90,m.percentage);i.current=h,n(b=>h>b?h:b)}},onSuccess:()=>{p(),n(100),setTimeout(()=>{f(),s(!1),n(0)},1e3)},onError:()=>{p(),s(!1),n(0)},onFinish:()=>{p()}})},g=u=>{e&&(u.preventDefault(),u.returnValue="")};return d.useEffect(()=>(window.addEventListener("beforeunload",g),()=>{window.removeEventListener("beforeunload",g),p()}),[e]),t.jsxs("div",{className:"w-full",children:[t.jsx(z,{title:"OSA Dashboard"}),t.jsx(V,{children:t.jsxs(O,{navItems:[{icon:t.jsx(P,{}),label:"Upload",link:"superadmin.dataupload"},{icon:t.jsx(P,{}),label:"Download",link:"superadmin.filedownload"}],title:"Data Upload",children:[t.jsxs("div",{className:"grid grid-cols-12 p-5 gap-2",children:[t.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[t.jsx("h1",{className:"font-bold",children:"Student Information"}),t.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),t.jsx(S,{handleFileChange:v,fileType:"Student File",disabled:e})]}),t.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[t.jsx("h1",{className:"font-bold",children:"Organization List"}),t.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),t.jsx(S,{handleFileChange:v,fileType:"Organization File",disabled:e})]})]}),t.jsx("div",{className:"p-5",children:t.jsx("button",{onClick:x,disabled:e,className:"bg-white text-black px-4 py-2 rounded-xl disabled:opacity-50",children:e?"Uploading...":"Upload Files"})}),t.jsx(te,{progress:o,isUploading:e})]})})]})}export{fe as default};
