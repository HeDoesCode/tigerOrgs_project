import{j as e,r as f,q as _,W as O}from"./app-BPM_M96_.js";import{A as z}from"./AdminAlertDialog-DxP9zm4p.js";import{a as B,d as U,u as L,P as F,b as P,c as R}from"./utils-BpEC-At6.js";import{u as T}from"./index-BaV5rOqO.js";import{u as X}from"./index-DnpAi0r9.js";import{P as q}from"./index-CqBjJmTE.js";import{C as H}from"./check-DhiNIp-2.js";function K({item:s,value:t,onChange:r}){switch(y(s.name),s.type){case"text":case"email":case"number":return e.jsx(V,{type:s.type,name:s.name,required:s.required,value:t||"",onChange:r});case"file_upload":return e.jsx(J,{name:s.name,required:s.required,onChange:r,accept:".pdf,.doc,.docx"});case"image_upload":return e.jsx(Z,{name:s.name,required:s.required,onChange:r,allowedTypes:s.allowedTypes||["image/jpeg","image/png"]});case"checkbox":return e.jsx(W,{name:s.name,options:s.options,required:s.required,value:t?typeof t=="string"?JSON.parse(t):t:[],onChange:r});case"select":case"radio":return e.jsx(G,{type:s.type,name:s.name,options:s.options,required:s.required,value:t||"",onChange:r});default:return null}}function y(s){return s.toLowerCase().trim().replaceAll(" ","_")}function V({type:s,name:t,required:r,value:l,onChange:o}){const n=y(t);return e.jsxs("li",{className:"mb-4",children:[e.jsxs("label",{htmlFor:n,className:"block mb-1",children:[t,r&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("input",{type:s,className:"w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",id:n,name:n,required:r,value:l,onChange:c=>o(c.target.value)})]})}function J({name:s,required:t,onChange:r,accept:l}){const o=y(s),n=c=>{const a=c.target.files[0];a&&r(a)};return e.jsxs("li",{className:"mb-4",children:[e.jsxs("label",{htmlFor:o,className:"block font-medium text-gray-700 mb-1",children:[s,t&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("input",{type:"file",className:"w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",id:o,name:o,required:t,accept:l,onChange:n})]})}function Z({name:s,required:t,onChange:r,allowedTypes:l}){const[o,n]=f.useState(null),[c,a]=f.useState(""),d=y(s),b=5,m=b*1024*1024,g=u=>{const p=u.target.files[0];if(a(""),n(null),!p)return;if(!l.includes(p.type)){a(`Invalid file type. Please upload a ${l.map(i=>i.split("/")[1]).join(" or ")} file.`),u.target.value="";return}if(p.size>m){a(`File size must be less than ${b}MB`),u.target.value="";return}const h=new FileReader;h.onloadend=()=>{n(h.result),r(p)},h.readAsDataURL(p)};return e.jsxs("li",{className:"mb-4",children:[e.jsxs("label",{htmlFor:d,className:"block mb-1",children:[s,t&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("input",{type:"file",className:"w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",id:d,name:d,required:t,accept:l.join(","),onChange:g}),c&&e.jsx("p",{className:"text-sm text-red-600",children:c}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Max file size: ",b,"MB. Accepted formats:"," ",l.map(u=>u.split("/")[1].toUpperCase()).join(", ")]}),o&&e.jsx("div",{className:"mt-2",children:e.jsx("img",{src:o,alt:"Preview",className:"max-w-xs h-auto rounded-lg border border-gray-200"})})]})]})}function W({name:s,options:t,required:r,value:l=[],onChange:o}){const n=y(s),[c,a]=f.useState(!1),d=Array.isArray(l)?l.map(m=>y(m)):[],b=m=>{const{value:g,checked:u}=m.target;let p;if(u)p=[...d,g];else{if(d.length===1&&r){a(!0);return}p=d.filter(h=>h!==g)}a(r&&p.length===0),o(p.map(h=>t.find(i=>y(i)===h)||h).map(h=>y(h)))};return e.jsx("li",{className:"mb-4",children:e.jsxs("fieldset",{children:[e.jsxs("legend",{className:"block font-medium text-gray-700 mb-1",children:[s,r&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("div",{className:"space-y-2",children:t.map((m,g)=>{const u=y(m);return e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",name:n,id:`${n}-${g}`,value:u,checked:d.includes(u),onChange:b,className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"}),e.jsx("label",{htmlFor:`${n}-${g}`,className:"ml-2 block text-gray-700",children:m})]},g)})}),c&&e.jsx("p",{className:"text-sm text-red-600",children:"Please select at least one option."})]})})}function G({type:s,name:t,options:r,required:l,value:o,onChange:n}){const c=y(t);return s==="select"?e.jsxs("li",{className:"mb-4",children:[e.jsxs("label",{htmlFor:c,className:"block font-medium text-gray-700 mb-1",children:[t,l&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("select",{className:"w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",name:c,id:c,value:o,onChange:a=>n(a.target.value),required:l,children:[l?e.jsx("option",{value:"",disabled:!0,children:"Please select an option"}):e.jsx("option",{value:"",children:"No option selected"}),r.map((a,d)=>e.jsx("option",{value:y(a),children:a},d))]})]}):s==="radio"?e.jsx("li",{className:"mb-4",children:e.jsxs("fieldset",{children:[e.jsxs("legend",{className:"font-medium text-gray-700 mb-1",children:[t,l&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"space-y-2",children:[!l&&e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"radio",name:c,id:`${t}-none`,value:"",checked:o==="",onChange:a=>n(a.target.value),className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"}),e.jsx("label",{htmlFor:`${t}-none`,className:"ml-2 block text-gray-700",children:"No Option Selected"})]}),r.map((a,d)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"radio",name:c,id:`${t}-${d}`,value:y(a),checked:o===y(a),onChange:b=>n(b.target.value),required:l,className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"}),e.jsx("label",{htmlFor:`${t}-${d}`,className:"ml-2 block text-gray-700",children:a})]},d))]})]})}):null}var E="Checkbox",[Q,ue]=B(E),[Y,ee]=Q(E),D=f.forwardRef((s,t)=>{const{__scopeCheckbox:r,name:l,checked:o,defaultChecked:n,required:c,disabled:a,value:d="on",onCheckedChange:b,form:m,...g}=s,[u,p]=f.useState(null),h=U(t,N=>p(N)),i=f.useRef(!1),x=u?m||!!u.closest("form"):!0,[j=!1,C]=L({prop:o,defaultProp:n,onChange:b}),k=f.useRef(j);return f.useEffect(()=>{const N=u==null?void 0:u.form;if(N){const w=()=>C(k.current);return N.addEventListener("reset",w),()=>N.removeEventListener("reset",w)}},[u,C]),e.jsxs(Y,{scope:r,state:j,disabled:a,children:[e.jsx(F.button,{type:"button",role:"checkbox","aria-checked":v(j)?"mixed":j,"aria-required":c,"data-state":$(j),"data-disabled":a?"":void 0,disabled:a,value:d,...g,ref:h,onKeyDown:P(s.onKeyDown,N=>{N.key==="Enter"&&N.preventDefault()}),onClick:P(s.onClick,N=>{C(w=>v(w)?!0:!w),x&&(i.current=N.isPropagationStopped(),i.current||N.stopPropagation())})}),x&&e.jsx(se,{control:u,bubbles:!i.current,name:l,value:d,checked:j,required:c,disabled:a,form:m,style:{transform:"translateX(-100%)"},defaultChecked:v(n)?!1:n})]})});D.displayName=E;var I="CheckboxIndicator",A=f.forwardRef((s,t)=>{const{__scopeCheckbox:r,forceMount:l,...o}=s,n=ee(I,r);return e.jsx(q,{present:l||v(n.state)||n.state===!0,children:e.jsx(F.span,{"data-state":$(n.state),"data-disabled":n.disabled?"":void 0,...o,ref:t,style:{pointerEvents:"none",...s.style}})})});A.displayName=I;var se=s=>{const{control:t,checked:r,bubbles:l=!0,defaultChecked:o,...n}=s,c=f.useRef(null),a=T(r),d=X(t);f.useEffect(()=>{const m=c.current,g=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(g,"checked").set;if(a!==r&&p){const h=new Event("click",{bubbles:l});m.indeterminate=v(r),p.call(m,v(r)?!1:r),m.dispatchEvent(h)}},[a,r,l]);const b=f.useRef(v(r)?!1:r);return e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:o??b.current,...n,tabIndex:-1,ref:c,style:{...s.style,...d,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function v(s){return s==="indeterminate"}function $(s){return v(s)?"indeterminate":s?"checked":"unchecked"}var M=D,te=A;const re=f.forwardRef(({className:s,...t},r)=>e.jsx(M,{ref:r,className:R("peer h-4 w-4 shrink-0 rounded-sm border border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900",s),...t,children:e.jsx(te,{className:R("flex items-center justify-center text-current"),children:e.jsx(H,{className:"h-4 w-4"})})}));re.displayName=M.displayName;function me({formLayout:s,orgID:t,formID:r}){const{errors:l,flash:o}=_().props,[n,c]=f.useState(!0),[a,d]=f.useState(!1),{data:b,setData:m,post:g,reset:u}=O({userData:{},formLayout:s,orgID:t,formID:r});f.useEffect(()=>{var i;if((i=o==null?void 0:o.old)!=null&&i.userData){const x=o.old.userData,j={};s.layout.forEach(C=>{const k=S(C.name);if(x[k]!==void 0)if(C.type==="checkbox")try{j[k]=typeof x[k]=="string"?JSON.parse(x[k]):x[k]}catch{j[k]=x[k]}else j[k]=x[k]}),m("userData",j)}},[o==null?void 0:o.old,s]);function p(i,x){m("userData",{...b.userData,[i]:x})}function h(i){if(i.preventDefault(),n){d(!0);return}g(route("formSubmission",{orgID:t,formID:r}),{preserveState:!0,preserveScroll:!0,onError:x=>{console.error("Form submission errors:",x)}})}return e.jsx("div",{className:"min-h-screen py-12 px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"max-w-3xl mx-auto",children:e.jsxs("form",{className:"bg-white shadow-md rounded-lg overflow-hidden",onSubmit:h,children:[e.jsxs("div",{className:"px-6 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:s.name}),s.desc&&e.jsx("p",{className:"text-gray-600 mb-8",children:s.desc}),Object.keys(l).length>0&&e.jsx("div",{className:"bg-red-50 border-l-4 border-red-400 p-4 mb-6",children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"h-5 w-5 text-red-400",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),e.jsxs("div",{className:"ml-3",children:[e.jsx("h3",{className:"font-medium text-red-800",children:"There were errors with your submission"}),e.jsx("ul",{className:"mt-2 text-red-700 list-disc list-inside",children:Object.keys(l).map((i,x)=>e.jsx("li",{children:l[i]},x))})]})]})}),e.jsx("ul",{className:"space-y-6",children:s.layout.map((i,x)=>e.jsx(K,{item:i,value:b.userData[S(i.name)],onChange:j=>p(S(i.name),j)},x))}),e.jsxs("div",{className:`flex items-center mt-7 text-sm w-fit ${a&&"outline outline-1 outline-red-500 px-3 bg-red-50 rounded-lg"}`,children:[e.jsx("input",{id:"permit",type:"checkbox",className:a?"border-red-500":"",onChange:i=>{c(!i.target.checked)}}),e.jsx("label",{htmlFor:"permit",className:`cursor-pointer pl-2 h-10 flex items-center select-none ${a&&"text-red-500 font-bold"}`,children:'"I confirm that all information provided above is correct."'})]})]}),e.jsxs("div",{className:"px-6 py-4 bg-gray-50 flex justify-between",children:[e.jsx(z,{trigger:e.jsx("div",{type:"reset",className:"inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Clear Form"}),title:"Are you sure you want to reset all the inputs in the form?",accept:"Confirm",onclick:()=>u()}),e.jsx("button",{type:"submit",className:`inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-[#04aa6dd5] hover:bg-[#04AA6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${n&&"opacity-50 cursor-not-allowed"}`,children:"Submit"})]})]})})})}function S(s){return s.toLowerCase().trim().replaceAll(" ","_")}export{me as F};
