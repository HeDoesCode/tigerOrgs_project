import{r as o,j as a}from"./app-BeoSPjJ4.js";import{a as _,d as H,u as I,P as S,b as M,c as g}from"./utils-B5Uld75u.js";import{u as B}from"./index-cQuDMxWR.js";import{u as q}from"./index-BuL_1XA8.js";var v="Switch",[z,G]=_(v),[A,O]=z(v),x=o.forwardRef((e,s)=>{const{__scopeSwitch:t,name:r,checked:c,defaultChecked:u,required:i,disabled:n,value:d="on",onCheckedChange:b,form:m,...p}=e,[l,E]=o.useState(null),R=H(s,f=>E(f)),k=o.useRef(!1),w=l?m||!!l.closest("form"):!0,[h=!1,N]=I({prop:c,defaultProp:u,onChange:b});return a.jsxs(A,{scope:t,checked:h,disabled:n,children:[a.jsx(S.button,{type:"button",role:"switch","aria-checked":h,"aria-required":i,"data-state":y(h),"data-disabled":n?"":void 0,disabled:n,value:d,...p,ref:R,onClick:M(e.onClick,f=>{N(T=>!T),w&&(k.current=f.isPropagationStopped(),k.current||f.stopPropagation())})}),w&&a.jsx(D,{control:l,bubbles:!k.current,name:r,value:d,checked:h,required:i,disabled:n,form:m,style:{transform:"translateX(-100%)"}})]})});x.displayName=v;var C="SwitchThumb",P=o.forwardRef((e,s)=>{const{__scopeSwitch:t,...r}=e,c=O(C,t);return a.jsx(S.span,{"data-state":y(c.checked),"data-disabled":c.disabled?"":void 0,...r,ref:s})});P.displayName=C;var D=e=>{const{control:s,checked:t,bubbles:r=!0,...c}=e,u=o.useRef(null),i=B(t),n=q(s);return o.useEffect(()=>{const d=u.current,b=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(b,"checked").set;if(i!==t&&p){const l=new Event("click",{bubbles:r});p.call(d,t),d.dispatchEvent(l)}},[i,t,r]),a.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...c,tabIndex:-1,ref:u,style:{...e.style,...n,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function y(e){return e?"checked":"unchecked"}var j=x,F=P;const L=o.forwardRef(({className:e,...s},t)=>a.jsx(j,{className:g("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800",e),...s,ref:t,children:a.jsx(F,{className:g("pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-slate-950")})}));L.displayName=j.displayName;export{L as S};