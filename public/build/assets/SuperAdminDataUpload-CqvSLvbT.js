import{j as t,r as d,W as R,Y as z}from"./app-wTbvq_QV.js";import{M as O}from"./MainAdminFrame-CZzgPJkk.js";import{S as V}from"./SuperAdminLayout-C22QNgtH.js";import{I as k}from"./IconCheckBox-ClYu8ZT4.js";import{c as I,a as v,n as T,P as A}from"./IconMenu3-CRQ8g1bN.js";import"./button-UyB_9sy1.js";import"./index-oeJazVoZ.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=I("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=I("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);function G({size:e}){return t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-file-upload",children:[t.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t.jsx("path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}),t.jsx("path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"}),t.jsx("path",{d:"M12 11v6"}),t.jsx("path",{d:"M9.5 13.5l2.5 -2.5l2.5 2.5"})]})}function P({handleFileChange:e,fileType:a}){const[r,s]=d.useState(""),l=i=>{const n=i.target.files[0];n&&(s(n.name),e(i,a))},c=()=>{switch(a){case"Student File":return".csv";case"Organization File":return".json";default:return""}};return t.jsxs("div",{className:"flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out",children:[t.jsxs("label",{className:"cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md",children:[t.jsxs("span",{children:["Upload New ",a]}),t.jsx(G,{}),t.jsx("input",{type:"file",accept:c(),onChange:l,className:"hidden"})]}),r&&t.jsx("span",{className:"ml-3 text-gray-700",children:r})]})}const H=T("relative w-full rounded-lg border border-slate-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 dark:border-slate-800 dark:[&>svg]:text-slate-50",{variants:{variant:{default:"bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",destructive:"border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900"}},defaultVariants:{variant:"default"}}),j=d.forwardRef(({className:e,variant:a,...r},s)=>t.jsx("div",{ref:s,role:"alert",className:v(H({variant:a}),e),...r}));j.displayName="Alert";const b=d.forwardRef(({className:e,...a},r)=>t.jsx("h5",{ref:r,className:v("mb-1 font-medium leading-none tracking-tight",e),...a}));b.displayName="AlertTitle";const N=d.forwardRef(({className:e,...a},r)=>t.jsx("div",{ref:r,className:v("text-sm [&_p]:leading-relaxed",e),...a}));N.displayName="AlertDescription";function X(e,a=[]){let r=[];function s(c,i){const n=d.createContext(i),o=r.length;r=[...r,i];function m(u){const{scope:p,children:x,...g}=u,E=(p==null?void 0:p[e][o])||n,L=d.useMemo(()=>g,Object.values(g));return t.jsx(E.Provider,{value:L,children:x})}function f(u,p){const x=(p==null?void 0:p[e][o])||n,g=d.useContext(x);if(g)return g;if(i!==void 0)return i;throw new Error(`\`${u}\` must be used within \`${c}\``)}return m.displayName=c+"Provider",[m,f]}const l=()=>{const c=r.map(i=>d.createContext(i));return function(n){const o=(n==null?void 0:n[e])||c;return d.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return l.scopeName=e,[s,Y(l,...a)]}function Y(...e){const a=e[0];if(e.length===1)return a;const r=()=>{const s=e.map(l=>({useScope:l(),scopeName:l.scopeName}));return function(c){const i=s.reduce((n,{useScope:o,scopeName:m})=>{const u=o(c)[`__scope${m}`];return{...n,...u}},{});return d.useMemo(()=>({[`__scope${a.scopeName}`]:i}),[i])}};return r.scopeName=a.scopeName,r}var w="Progress",y=100,[q,ce]=X(w),[J,K]=q(w),F=d.forwardRef((e,a)=>{const{__scopeProgress:r,value:s=null,max:l,getValueLabel:c=Q,...i}=e;(l||l===0)&&!C(l)&&console.error(Z(`${l}`,"Progress"));const n=C(l)?l:y;s!==null&&!S(s,n)&&console.error(ee(`${s}`,"Progress"));const o=S(s,n)?s:null,m=h(o)?c(o,n):void 0;return t.jsx(J,{scope:r,value:o,max:n,children:t.jsx(A.div,{"aria-valuemax":n,"aria-valuemin":0,"aria-valuenow":h(o)?o:void 0,"aria-valuetext":m,role:"progressbar","data-state":U(o,n),"data-value":o??void 0,"data-max":n,...i,ref:a})})});F.displayName=w;var D="ProgressIndicator",M=d.forwardRef((e,a)=>{const{__scopeProgress:r,...s}=e,l=K(D,r);return t.jsx(A.div,{"data-state":U(l.value,l.max),"data-value":l.value??void 0,"data-max":l.max,...s,ref:a})});M.displayName=D;function Q(e,a){return`${Math.round(e/a*100)}%`}function U(e,a){return e==null?"indeterminate":e===a?"complete":"loading"}function h(e){return typeof e=="number"}function C(e){return h(e)&&!isNaN(e)&&e>0}function S(e,a){return h(e)&&!isNaN(e)&&e<=a&&e>=0}function Z(e,a){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${y}\`.`}function ee(e,a){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${y} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var $=F,te=M;const _=d.forwardRef(({className:e,value:a,...r},s)=>t.jsx($,{ref:s,className:v("relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",e),...r,children:t.jsx(te,{className:"h-full w-full flex-1 bg-slate-900 transition-all dark:bg-slate-50",style:{transform:`translateX(-${100-(a||0)}%)`}})}));_.displayName=$.displayName;const ae=({progress:e,isUploading:a})=>a?t.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:t.jsxs("div",{className:"bg-white p-6 rounded-lg max-w-md w-full mx-4 space-y-4",children:[t.jsxs(j,{variant:"warning",className:"mb-4",children:[t.jsx(B,{className:"h-4 w-4"}),t.jsx(b,{children:"Please Don't Close the Window"}),t.jsx(N,{children:"File upload is in progress. Closing the window may corrupt the data."})]}),t.jsxs("div",{className:"space-y-2",children:[t.jsxs("div",{className:"flex justify-between text-sm",children:[t.jsx("span",{className:"font-medium",children:"Upload Progress"}),t.jsxs("span",{children:[e,"%"]})]}),t.jsx(_,{value:e,className:"w-full"})]}),e===100&&t.jsxs(j,{variant:"success",className:"mt-4",children:[t.jsx(W,{className:"h-4 w-4"}),t.jsx(b,{children:"Upload Complete"}),t.jsx(N,{children:"Your files have been successfully uploaded."})]})]})}):null;function ue(){const[e,a]=d.useState(!1),[r,s]=d.useState(0),{data:l,setData:c,post:i,reset:n}=R({studentFile:null,organizationFile:null}),o=(u,p)=>{switch(p){case"Student File":c("studentFile",u.target.files[0]);break;case"Organization File":c("organizationFile",u.target.files[0]);break}},m=u=>{u.preventDefault(),a(!0),s(0);const p=setInterval(()=>{s(x=>x>=90?(clearInterval(p),90):x+10)},500);i(route("superadmin.dataupload.file"),{onProgress:x=>{x.percentage&&s(Math.min(90,x.percentage))},onSuccess:()=>{s(100),setTimeout(()=>{n(),a(!1),s(0)},1e3)},onError:()=>{clearInterval(p),a(!1),s(0)},onFinish:()=>{clearInterval(p)}})},f=u=>{e&&(u.preventDefault(),u.returnValue="")};return d.useEffect(()=>(window.addEventListener("beforeunload",f),()=>{window.removeEventListener("beforeunload",f)}),[e]),t.jsxs("div",{className:"w-full",children:[t.jsx(z,{title:"OSA Dashboard"}),t.jsx(V,{children:t.jsxs(O,{navItems:[{icon:t.jsx(k,{}),label:"Upload",link:"superadmin.dataupload"},{icon:t.jsx(k,{}),label:"Download",link:"superadmin.filedownload"}],title:"Data Upload",children:[t.jsxs("div",{className:"grid grid-cols-12 p-5 gap-2",children:[t.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[t.jsx("h1",{className:"font-bold",children:"Student Information"}),t.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),t.jsx(P,{handleFileChange:o,fileType:"Student File",disabled:e})]}),t.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[t.jsx("h1",{className:"font-bold",children:"Organization List"}),t.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),t.jsx(P,{handleFileChange:o,fileType:"Organization File",disabled:e})]})]}),t.jsx("div",{className:"p-5",children:t.jsx("button",{onClick:m,disabled:e,className:"bg-white text-black px-4 py-2 rounded-xl disabled:opacity-50",children:e?"Uploading...":"Upload Files"})}),t.jsx(ae,{progress:r,isUploading:e})]})})]})}export{ue as default};
