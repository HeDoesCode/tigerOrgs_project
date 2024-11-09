import{j as s,r as p,W as _,Y as z}from"./app-DMBvuxJw.js";import{M as O}from"./MainAdminFrame-C9P04MO-.js";import{S as R}from"./SuperAdminLayout-CtMZMiji.js";import{I as b}from"./IconCheckBox--F7XVlPw.js";import{A as w,a as N,b as y}from"./alert-Dq5YCztI.js";import{P as S,c as V}from"./utils-DPngbp4j.js";import{c as I}from"./IconMenu3-VBrNniLE.js";import"./button-Cz8TxfBZ.js";import"./index-DT0MepzL.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=I("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=I("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);function W({size:e}){return s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-file-upload",children:[s.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s.jsx("path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}),s.jsx("path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"}),s.jsx("path",{d:"M12 11v6"}),s.jsx("path",{d:"M9.5 13.5l2.5 -2.5l2.5 2.5"})]})}function P({handleFileChange:e,fileType:t}){const[l,r]=p.useState(""),n=i=>{const a=i.target.files[0];a&&(r(a.name),e(i,t))},c=()=>{switch(t){case"Student File":return".csv";case"Organization File":return".json";default:return""}};return s.jsxs("div",{className:"flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out",children:[s.jsxs("label",{className:"cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md",children:[s.jsxs("span",{children:["Upload New ",t]}),s.jsx(W,{}),s.jsx("input",{type:"file",accept:c(),onChange:n,className:"hidden"})]}),l&&s.jsx("span",{className:"ml-3 text-gray-700",children:l})]})}function G(e,t=[]){let l=[];function r(c,i){const a=p.createContext(i),o=l.length;l=[...l,i];function x(d){const{scope:u,children:m,...h}=d,E=(u==null?void 0:u[e][o])||a,L=p.useMemo(()=>h,Object.values(h));return s.jsx(E.Provider,{value:L,children:m})}function f(d,u){const m=(u==null?void 0:u[e][o])||a,h=p.useContext(m);if(h)return h;if(i!==void 0)return i;throw new Error(`\`${d}\` must be used within \`${c}\``)}return x.displayName=c+"Provider",[x,f]}const n=()=>{const c=l.map(i=>p.createContext(i));return function(a){const o=(a==null?void 0:a[e])||c;return p.useMemo(()=>({[`__scope${e}`]:{...a,[e]:o}}),[a,o])}};return n.scopeName=e,[r,H(n,...t)]}function H(...e){const t=e[0];if(e.length===1)return t;const l=()=>{const r=e.map(n=>({useScope:n(),scopeName:n.scopeName}));return function(c){const i=r.reduce((a,{useScope:o,scopeName:x})=>{const d=o(c)[`__scope${x}`];return{...a,...d}},{});return p.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return l.scopeName=t.scopeName,l}var v="Progress",j=100,[X,de]=G(v),[Y,q]=X(v),F=p.forwardRef((e,t)=>{const{__scopeProgress:l,value:r=null,max:n,getValueLabel:c=J,...i}=e;(n||n===0)&&!C(n)&&console.error(K(`${n}`,"Progress"));const a=C(n)?n:j;r!==null&&!k(r,a)&&console.error(Q(`${r}`,"Progress"));const o=k(r,a)?r:null,x=g(o)?c(o,a):void 0;return s.jsx(Y,{scope:l,value:o,max:a,children:s.jsx(S.div,{"aria-valuemax":a,"aria-valuemin":0,"aria-valuenow":g(o)?o:void 0,"aria-valuetext":x,role:"progressbar","data-state":M(o,a),"data-value":o??void 0,"data-max":a,...i,ref:t})})});F.displayName=v;var A="ProgressIndicator",D=p.forwardRef((e,t)=>{const{__scopeProgress:l,...r}=e,n=q(A,l);return s.jsx(S.div,{"data-state":M(n.value,n.max),"data-value":n.value??void 0,"data-max":n.max,...r,ref:t})});D.displayName=A;function J(e,t){return`${Math.round(e/t*100)}%`}function M(e,t){return e==null?"indeterminate":e===t?"complete":"loading"}function g(e){return typeof e=="number"}function C(e){return g(e)&&!isNaN(e)&&e>0}function k(e,t){return g(e)&&!isNaN(e)&&e<=t&&e>=0}function K(e,t){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${j}\`.`}function Q(e,t){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${j} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var U=F,Z=D;const $=p.forwardRef(({className:e,value:t,...l},r)=>s.jsx(U,{ref:r,className:V("relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",e),...l,children:s.jsx(Z,{className:"h-full w-full flex-1 bg-slate-900 transition-all dark:bg-slate-50",style:{transform:`translateX(-${100-(t||0)}%)`}})}));$.displayName=U.displayName;const ee=({progress:e,isUploading:t})=>t?s.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:s.jsxs("div",{className:"bg-white p-6 rounded-lg max-w-md w-full mx-4 space-y-4",children:[s.jsxs(w,{variant:"warning",className:"mb-4",children:[s.jsx(T,{className:"h-4 w-4"}),s.jsx(N,{children:"Please Don't Close the Window"}),s.jsx(y,{children:"File upload is in progress. Closing the window may corrupt the data."})]}),s.jsxs("div",{className:"space-y-2",children:[s.jsxs("div",{className:"flex justify-between text-sm",children:[s.jsx("span",{className:"font-medium",children:"Upload Progress"}),s.jsxs("span",{children:[e,"%"]})]}),s.jsx($,{value:e,className:"w-full"})]}),e===100&&s.jsxs(w,{variant:"success",className:"mt-4",children:[s.jsx(B,{className:"h-4 w-4"}),s.jsx(N,{children:"Upload Complete"}),s.jsx(y,{children:"Your files have been successfully uploaded."})]})]})}):null;function ue(){const[e,t]=p.useState(!1),[l,r]=p.useState(0),{data:n,setData:c,post:i,reset:a}=_({studentFile:null,organizationFile:null}),o=(d,u)=>{switch(u){case"Student File":c("studentFile",d.target.files[0]);break;case"Organization File":c("organizationFile",d.target.files[0]);break}},x=d=>{d.preventDefault(),t(!0),r(0);const u=setInterval(()=>{r(m=>m>=90?(clearInterval(u),90):m+10)},500);i(route("superadmin.dataupload.file"),{onProgress:m=>{m.percentage&&r(Math.min(90,m.percentage))},onSuccess:()=>{r(100),setTimeout(()=>{a(),t(!1),r(0)},1e3)},onError:()=>{clearInterval(u),t(!1),r(0)},onFinish:()=>{clearInterval(u)}})},f=d=>{e&&(d.preventDefault(),d.returnValue="")};return p.useEffect(()=>(window.addEventListener("beforeunload",f),()=>{window.removeEventListener("beforeunload",f)}),[e]),s.jsxs("div",{className:"w-full",children:[s.jsx(z,{title:"OSA Dashboard"}),s.jsx(R,{children:s.jsxs(O,{navItems:[{icon:s.jsx(b,{}),label:"Upload",link:"superadmin.dataupload"},{icon:s.jsx(b,{}),label:"Download",link:"superadmin.filedownload"}],title:"Data Upload",children:[s.jsxs("div",{className:"grid grid-cols-12 p-5 gap-2",children:[s.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[s.jsx("h1",{className:"font-bold",children:"Student Information"}),s.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),s.jsx(P,{handleFileChange:o,fileType:"Student File",disabled:e})]}),s.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[s.jsx("h1",{className:"font-bold",children:"Organization List"}),s.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),s.jsx(P,{handleFileChange:o,fileType:"Organization File",disabled:e})]})]}),s.jsx("div",{className:"p-5",children:s.jsx("button",{onClick:x,disabled:e,className:"bg-white text-black px-4 py-2 rounded-xl disabled:opacity-50",children:e?"Uploading...":"Upload Files"})}),s.jsx(ee,{progress:l,isUploading:e})]})})]})}export{ue as default};