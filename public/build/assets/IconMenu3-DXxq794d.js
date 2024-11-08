import{j as o,c as pe,r as n,R as I,a as Ue,q as Be}from"./app-zFpeRohZ.js";import{e as X,S as le,P as k,a as We,B as He,u as Xe,d as Ye,g as Y,b as R,R as Ge,h as ze,f as Ze,j as qe,c as O,k as Qe}from"./utils-lICde5WU.js";function Vt({size:e}){return o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-logout",children:[o.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),o.jsx("path",{d:"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"}),o.jsx("path",{d:"M9 12h12l-3 -3"}),o.jsx("path",{d:"M18 15l3 -3"})]})}function Je({size:e}){return o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 50 50",fill:"currentColor",children:o.jsx("path",{d:"M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"})})}function et(){return o.jsx("div",{className:"min-h-36 mt-5 -mx-4 pt-10 pb-4 inter font-extralight text-sm bg-[#EEEEEE] flex justify-center",children:o.jsxs("div",{className:"flex space-x-2 mx-10 sm:mx-24 md:mx-52 border-gray-300 border-t-[1px] pt-3 pb-5 w-full max-w-[70rem] h-fit",children:[o.jsx("div",{className:"flex-1",children:o.jsxs("p",{className:"leading-6",children:["No Copyright 2024 © TigerOrgs Project ",o.jsx("br",{}),"Property of the"," ",o.jsx(pe,{children:o.jsx("span",{className:"underline",children:"Office for Student Affairs"})}),". ",o.jsx("br",{}),o.jsx("br",{}),o.jsx("a",{className:"text-xs text-slate-400 underline",href:"https://www.google.com/maps/place/Tan+Yan+Kee+Student+Center/@14.6105927,120.9863906,17z/data=!4m10!1m2!2m1!1sRoom+212+2nd+Floor,+UST+Tan+Yan+Kee+Student+Center,+University+of+Santo+Tomas,+Espa%C3%B1a+Blvd.,+Sampaloc,+Manila+Philippines+1015.!3m6!1s0x3397b60071fcebb3:0xfdfb6b896ebe80db!8m2!3d14.61138!4d120.9883517!15sCoABUm9vbSAyMTIgMm5kIEZsb29yLCBVU1QgVGFuIFlhbiBLZWUgU3R1ZGVudCBDZW50ZXIsIFVuaXZlcnNpdHkgb2YgU2FudG8gVG9tYXMsIEVzcGHDsWEgQmx2ZC4sIFNhbXBhbG9jLCBNYW5pbGEgUGhpbGlwcGluZXMgMTAxNS6SAQ1zdHVkZW50X3VuaW9u4AEA!16s%2Fg%2F1tdyn9mg?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",target:"_blank",rel:"noopener noreferrer",children:"Room 212 2nd Floor, UST Tan Yan Kee Student Center, University of Santo Tomas, España Blvd., Sampaloc, Manila Philippines 1015."})]})}),o.jsx("div",{className:"flex flex-col w-min",children:o.jsxs("ul",{children:[o.jsx("li",{children:o.jsx(e,{icon:o.jsx(Je,{size:"100%"}),text:"USTOSAOfficial",href:"https://www.facebook.com/USTOSAOfficial/"})}),o.jsx("li",{children:o.jsx(e,{icon:o.jsx("img",{src:"/src/ust_logo.png"}),text:"ust.edu.ph",href:"https://www.ust.edu.ph/administrative-offices/office-for-student-affairs/"})})]})})]})});function e({icon:t,text:s,href:r,customSize:a}){return o.jsxs("a",{className:"space-x-2 flex items-center text-[#333333] py-2 px-3 hover:underline hover:bg-gray-300 rounded-xl",href:r,target:"_blank",rel:"noopener noreferrer",children:[o.jsx("div",{className:a||"size-6",children:t}),o.jsx("span",{children:s})]})}}function tt({className:e,leftClass:t,rightClass:s}){return o.jsxs("div",{className:`poetsen-one text-2xl ${e} select-none`,children:[o.jsx("span",{className:`text-[#ffb700] ${t}`,children:"Tiger"}),o.jsx("span",{className:s,children:"Orgs"})]})}const st=7,ot=1e6;let Q=0;function rt(){return Q=(Q+1)%Number.MAX_SAFE_INTEGER,Q.toString()}const J=new Map,de=e=>{if(J.has(e))return;const t=setTimeout(()=>{J.delete(e),V({type:"REMOVE_TOAST",toastId:e})},ot);J.set(e,t)},nt=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,st)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case"DISMISS_TOAST":{const{toastId:s}=t;return s?de(s):e.toasts.forEach(r=>{de(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===s||s===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)}}},W=[];let H={toasts:[]};function V(e){H=nt(H,e),W.forEach(t=>{t(H)})}function at({...e}){const t=rt(),s=a=>V({type:"UPDATE_TOAST",toast:{...a,id:t}}),r=()=>V({type:"DISMISS_TOAST",toastId:t});return V({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:a=>{a||r()}}}),{id:t,dismiss:r,update:s}}function fe(){const[e,t]=n.useState(H);return n.useEffect(()=>(W.push(t),()=>{const s=W.indexOf(t);s>-1&&W.splice(s,1)}),[e]),{...e,toast:at,dismiss:s=>V({type:"DISMISS_TOAST",toastId:s})}}function it(e,t=[]){let s=[];function r(l,d){const u=n.createContext(d),m=s.length;s=[...s,d];function i(h){const{scope:b,children:y,...v}=h,f=(b==null?void 0:b[e][m])||u,c=n.useMemo(()=>v,Object.values(v));return o.jsx(f.Provider,{value:c,children:y})}function E(h,b){const y=(b==null?void 0:b[e][m])||u,v=n.useContext(y);if(v)return v;if(d!==void 0)return d;throw new Error(`\`${h}\` must be used within \`${l}\``)}return i.displayName=l+"Provider",[i,E]}const a=()=>{const l=s.map(d=>n.createContext(d));return function(u){const m=(u==null?void 0:u[e])||l;return n.useMemo(()=>({[`__scope${e}`]:{...u,[e]:m}}),[u,m])}};return a.scopeName=e,[r,ct(a,...t)]}function ct(...e){const t=e[0];if(e.length===1)return t;const s=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(l){const d=r.reduce((u,{useScope:m,scopeName:i})=>{const h=m(l)[`__scope${i}`];return{...u,...h}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:d}),[d])}};return s.scopeName=t.scopeName,s}function lt(e){const t=e+"CollectionProvider",[s,r]=it(t),[a,l]=s(t,{collectionRef:{current:null},itemMap:new Map}),d=y=>{const{scope:v,children:f}=y,c=I.useRef(null),w=I.useRef(new Map).current;return o.jsx(a,{scope:v,itemMap:w,collectionRef:c,children:f})};d.displayName=t;const u=e+"CollectionSlot",m=I.forwardRef((y,v)=>{const{scope:f,children:c}=y,w=l(u,f),x=X(v,w.collectionRef);return o.jsx(le,{ref:x,children:c})});m.displayName=u;const i=e+"CollectionItemSlot",E="data-radix-collection-item",h=I.forwardRef((y,v)=>{const{scope:f,children:c,...w}=y,x=I.useRef(null),T=X(v,x),g=l(i,f);return I.useEffect(()=>(g.itemMap.set(x,{ref:x,...w}),()=>void g.itemMap.delete(x))),o.jsx(le,{[E]:"",ref:T,children:c})});h.displayName=i;function b(y){const v=l(e+"CollectionConsumer",y);return I.useCallback(()=>{const c=v.collectionRef.current;if(!c)return[];const w=Array.from(c.querySelectorAll(`[${E}]`));return Array.from(v.itemMap.values()).sort((g,C)=>w.indexOf(g.ref.current)-w.indexOf(C.ref.current))},[v.collectionRef,v.itemMap])}return[{Provider:d,Slot:m,ItemSlot:h},b,r]}var dt="VisuallyHidden",re=n.forwardRef((e,t)=>o.jsx(k.span,{...e,ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));re.displayName=dt;var ne="ToastProvider",[ae,ut,pt]=lt("Toast"),[me,$t]=We("Toast",[pt]),[ft,G]=me(ne),xe=e=>{const{__scopeToast:t,label:s="Notification",duration:r=5e3,swipeDirection:a="right",swipeThreshold:l=50,children:d}=e,[u,m]=n.useState(null),[i,E]=n.useState(0),h=n.useRef(!1),b=n.useRef(!1);return s.trim()||console.error(`Invalid prop \`label\` supplied to \`${ne}\`. Expected non-empty \`string\`.`),o.jsx(ae.Provider,{scope:t,children:o.jsx(ft,{scope:t,label:s,duration:r,swipeDirection:a,swipeThreshold:l,toastCount:i,viewport:u,onViewportChange:m,onToastAdd:n.useCallback(()=>E(y=>y+1),[]),onToastRemove:n.useCallback(()=>E(y=>y-1),[]),isFocusedToastEscapeKeyDownRef:h,isClosePausedRef:b,children:d})})};xe.displayName=ne;var ve="ToastViewport",mt=["F8"],te="toast.viewportPause",se="toast.viewportResume",he=n.forwardRef((e,t)=>{const{__scopeToast:s,hotkey:r=mt,label:a="Notifications ({hotkey})",...l}=e,d=G(ve,s),u=ut(s),m=n.useRef(null),i=n.useRef(null),E=n.useRef(null),h=n.useRef(null),b=X(t,h,d.onViewportChange),y=r.join("+").replace(/Key/g,"").replace(/Digit/g,""),v=d.toastCount>0;n.useEffect(()=>{const c=w=>{var T;r.length!==0&&r.every(g=>w[g]||w.code===g)&&((T=h.current)==null||T.focus())};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[r]),n.useEffect(()=>{const c=m.current,w=h.current;if(v&&c&&w){const x=()=>{if(!d.isClosePausedRef.current){const S=new CustomEvent(te);w.dispatchEvent(S),d.isClosePausedRef.current=!0}},T=()=>{if(d.isClosePausedRef.current){const S=new CustomEvent(se);w.dispatchEvent(S),d.isClosePausedRef.current=!1}},g=S=>{!c.contains(S.relatedTarget)&&T()},C=()=>{c.contains(document.activeElement)||T()};return c.addEventListener("focusin",x),c.addEventListener("focusout",g),c.addEventListener("pointermove",x),c.addEventListener("pointerleave",C),window.addEventListener("blur",x),window.addEventListener("focus",T),()=>{c.removeEventListener("focusin",x),c.removeEventListener("focusout",g),c.removeEventListener("pointermove",x),c.removeEventListener("pointerleave",C),window.removeEventListener("blur",x),window.removeEventListener("focus",T)}}},[v,d.isClosePausedRef]);const f=n.useCallback(({tabbingDirection:c})=>{const x=u().map(T=>{const g=T.ref.current,C=[g,...Rt(g)];return c==="forwards"?C:C.reverse()});return(c==="forwards"?x.reverse():x).flat()},[u]);return n.useEffect(()=>{const c=h.current;if(c){const w=x=>{var C,S,P;const T=x.altKey||x.ctrlKey||x.metaKey;if(x.key==="Tab"&&!T){const D=document.activeElement,M=x.shiftKey;if(x.target===c&&M){(C=i.current)==null||C.focus();return}const A=f({tabbingDirection:M?"backwards":"forwards"}),$=A.findIndex(p=>p===D);ee(A.slice($+1))?x.preventDefault():M?(S=i.current)==null||S.focus():(P=E.current)==null||P.focus()}};return c.addEventListener("keydown",w),()=>c.removeEventListener("keydown",w)}},[u,f]),o.jsxs(He,{ref:m,role:"region","aria-label":a.replace("{hotkey}",y),tabIndex:-1,style:{pointerEvents:v?void 0:"none"},children:[v&&o.jsx(oe,{ref:i,onFocusFromOutsideViewport:()=>{const c=f({tabbingDirection:"forwards"});ee(c)}}),o.jsx(ae.Slot,{scope:s,children:o.jsx(k.ol,{tabIndex:-1,...l,ref:b})}),v&&o.jsx(oe,{ref:E,onFocusFromOutsideViewport:()=>{const c=f({tabbingDirection:"backwards"});ee(c)}})]})});he.displayName=ve;var we="ToastFocusProxy",oe=n.forwardRef((e,t)=>{const{__scopeToast:s,onFocusFromOutsideViewport:r,...a}=e,l=G(we,s);return o.jsx(re,{"aria-hidden":!0,tabIndex:0,...a,ref:t,style:{position:"fixed"},onFocus:d=>{var i;const u=d.relatedTarget;!((i=l.viewport)!=null&&i.contains(u))&&r()}})});oe.displayName=we;var z="Toast",xt="toast.swipeStart",vt="toast.swipeMove",ht="toast.swipeCancel",wt="toast.swipeEnd",Te=n.forwardRef((e,t)=>{const{forceMount:s,open:r,defaultOpen:a,onOpenChange:l,...d}=e,[u=!0,m]=Xe({prop:r,defaultProp:a,onChange:l});return o.jsx(Ye,{present:s||u,children:o.jsx(Et,{open:u,...d,ref:t,onClose:()=>m(!1),onPause:Y(e.onPause),onResume:Y(e.onResume),onSwipeStart:R(e.onSwipeStart,i=>{i.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:R(e.onSwipeMove,i=>{const{x:E,y:h}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","move"),i.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${E}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${h}px`)}),onSwipeCancel:R(e.onSwipeCancel,i=>{i.currentTarget.setAttribute("data-swipe","cancel"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:R(e.onSwipeEnd,i=>{const{x:E,y:h}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","end"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${E}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${h}px`),m(!1)})})})});Te.displayName=z;var[Tt,gt]=me(z,{onClose(){}}),Et=n.forwardRef((e,t)=>{const{__scopeToast:s,type:r="foreground",duration:a,open:l,onClose:d,onEscapeKeyDown:u,onPause:m,onResume:i,onSwipeStart:E,onSwipeMove:h,onSwipeCancel:b,onSwipeEnd:y,...v}=e,f=G(z,s),[c,w]=n.useState(null),x=X(t,p=>w(p)),T=n.useRef(null),g=n.useRef(null),C=a||f.duration,S=n.useRef(0),P=n.useRef(C),D=n.useRef(0),{onToastAdd:M,onToastRemove:Z}=f,_=Y(()=>{var j;(c==null?void 0:c.contains(document.activeElement))&&((j=f.viewport)==null||j.focus()),d()}),A=n.useCallback(p=>{!p||p===1/0||(window.clearTimeout(D.current),S.current=new Date().getTime(),D.current=window.setTimeout(_,p))},[_]);n.useEffect(()=>{const p=f.viewport;if(p){const j=()=>{A(P.current),i==null||i()},N=()=>{const F=new Date().getTime()-S.current;P.current=P.current-F,window.clearTimeout(D.current),m==null||m()};return p.addEventListener(te,N),p.addEventListener(se,j),()=>{p.removeEventListener(te,N),p.removeEventListener(se,j)}}},[f.viewport,C,m,i,A]),n.useEffect(()=>{l&&!f.isClosePausedRef.current&&A(C)},[l,C,f.isClosePausedRef,A]),n.useEffect(()=>(M(),()=>Z()),[M,Z]);const $=n.useMemo(()=>c?je(c):null,[c]);return f.viewport?o.jsxs(o.Fragment,{children:[$&&o.jsx(yt,{__scopeToast:s,role:"status","aria-live":r==="foreground"?"assertive":"polite","aria-atomic":!0,children:$}),o.jsx(Tt,{scope:s,onClose:_,children:Ue.createPortal(o.jsx(ae.ItemSlot,{scope:s,children:o.jsx(Ge,{asChild:!0,onEscapeKeyDown:R(u,()=>{f.isFocusedToastEscapeKeyDownRef.current||_(),f.isFocusedToastEscapeKeyDownRef.current=!1}),children:o.jsx(k.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":l?"open":"closed","data-swipe-direction":f.swipeDirection,...v,ref:x,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:R(e.onKeyDown,p=>{p.key==="Escape"&&(u==null||u(p.nativeEvent),p.nativeEvent.defaultPrevented||(f.isFocusedToastEscapeKeyDownRef.current=!0,_()))}),onPointerDown:R(e.onPointerDown,p=>{p.button===0&&(T.current={x:p.clientX,y:p.clientY})}),onPointerMove:R(e.onPointerMove,p=>{if(!T.current)return;const j=p.clientX-T.current.x,N=p.clientY-T.current.y,F=!!g.current,L=["left","right"].includes(f.swipeDirection),K=["left","up"].includes(f.swipeDirection)?Math.min:Math.max,$e=L?K(0,j):0,Ke=L?0:K(0,N),q=p.pointerType==="touch"?10:2,U={x:$e,y:Ke},ce={originalEvent:p,delta:U};F?(g.current=U,B(vt,h,ce,{discrete:!1})):ue(U,f.swipeDirection,q)?(g.current=U,B(xt,E,ce,{discrete:!1}),p.target.setPointerCapture(p.pointerId)):(Math.abs(j)>q||Math.abs(N)>q)&&(T.current=null)}),onPointerUp:R(e.onPointerUp,p=>{const j=g.current,N=p.target;if(N.hasPointerCapture(p.pointerId)&&N.releasePointerCapture(p.pointerId),g.current=null,T.current=null,j){const F=p.currentTarget,L={originalEvent:p,delta:j};ue(j,f.swipeDirection,f.swipeThreshold)?B(wt,y,L,{discrete:!0}):B(ht,b,L,{discrete:!0}),F.addEventListener("click",K=>K.preventDefault(),{once:!0})}})})})}),f.viewport)})]}):null}),yt=e=>{const{__scopeToast:t,children:s,...r}=e,a=G(z,t),[l,d]=n.useState(!1),[u,m]=n.useState(!1);return St(()=>d(!0)),n.useEffect(()=>{const i=window.setTimeout(()=>m(!0),1e3);return()=>window.clearTimeout(i)},[]),u?null:o.jsx(ze,{asChild:!0,children:o.jsx(re,{...r,children:l&&o.jsxs(o.Fragment,{children:[a.label," ",s]})})})},bt="ToastTitle",ge=n.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e;return o.jsx(k.div,{...r,ref:t})});ge.displayName=bt;var Ct="ToastDescription",Ee=n.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e;return o.jsx(k.div,{...r,ref:t})});Ee.displayName=Ct;var ye="ToastAction",be=n.forwardRef((e,t)=>{const{altText:s,...r}=e;return s.trim()?o.jsx(Se,{altText:s,asChild:!0,children:o.jsx(ie,{...r,ref:t})}):(console.error(`Invalid prop \`altText\` supplied to \`${ye}\`. Expected non-empty \`string\`.`),null)});be.displayName=ye;var Ce="ToastClose",ie=n.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e,a=gt(Ce,s);return o.jsx(Se,{asChild:!0,children:o.jsx(k.button,{type:"button",...r,ref:t,onClick:R(e.onClick,a.onClose)})})});ie.displayName=Ce;var Se=n.forwardRef((e,t)=>{const{__scopeToast:s,altText:r,...a}=e;return o.jsx(k.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":r||void 0,...a,ref:t})});function je(e){const t=[];return Array.from(e.childNodes).forEach(r=>{if(r.nodeType===r.TEXT_NODE&&r.textContent&&t.push(r.textContent),jt(r)){const a=r.ariaHidden||r.hidden||r.style.display==="none",l=r.dataset.radixToastAnnounceExclude==="";if(!a)if(l){const d=r.dataset.radixToastAnnounceAlt;d&&t.push(d)}else t.push(...je(r))}}),t}function B(e,t,s,{discrete:r}){const a=s.originalEvent.currentTarget,l=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:s});t&&a.addEventListener(e,t,{once:!0}),r?qe(a,l):a.dispatchEvent(l)}var ue=(e,t,s=0)=>{const r=Math.abs(e.x),a=Math.abs(e.y),l=r>a;return t==="left"||t==="right"?l&&r>s:!l&&a>s};function St(e=()=>{}){const t=Y(e);Ze(()=>{let s=0,r=0;return s=window.requestAnimationFrame(()=>r=window.requestAnimationFrame(t)),()=>{window.cancelAnimationFrame(s),window.cancelAnimationFrame(r)}},[t])}function jt(e){return e.nodeType===e.ELEMENT_NODE}function Rt(e){const t=[],s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)t.push(s.currentNode);return t}function ee(e){const t=document.activeElement;return e.some(s=>s===t?!0:(s.focus(),document.activeElement!==t))}var Nt=xe,Re=he,Ne=Te,Pe=ge,Ae=Ee,Ie=be,ke=ie;/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Me=(...e)=>e.filter((t,s,r)=>!!t&&r.indexOf(t)===s).join(" ");/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var At={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=n.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:d,...u},m)=>n.createElement("svg",{ref:m,...At,width:t,height:t,stroke:e,strokeWidth:r?Number(s)*24/Number(t):s,className:Me("lucide",a),...u},[...d.map(([i,E])=>n.createElement(i,E)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=(e,t)=>{const s=n.forwardRef(({className:r,...a},l)=>n.createElement(It,{ref:l,iconNode:t,className:Me(`lucide-${Pt(e)}`,r),...a}));return s.displayName=`${e}`,s};/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=_e("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=_e("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Mt=Nt,Oe=n.forwardRef(({className:e,...t},s)=>o.jsx(Re,{ref:s,className:O("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...t}));Oe.displayName=Re.displayName;const _t=Qe("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-slate-800",{variants:{variant:{default:"border bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",success:"border bg-green-600 text-white dark:bg-slate-950 dark:text-slate-50",destructive:"destructive group border-red-500 bg-red-600 text-slate-50 dark:border-red-900 dark:bg-red-900 dark:text-slate-50"}},defaultVariants:{variant:"default"}}),De=n.forwardRef(({className:e,variant:t,...s},r)=>o.jsx(Ne,{ref:r,className:O(_t({variant:t}),e),...s}));De.displayName=Ne.displayName;const Ot=n.forwardRef(({className:e,...t},s)=>o.jsx(Ie,{ref:s,className:O("inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-slate-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-slate-50 group-[.destructive]:focus:ring-red-500 dark:border-slate-800 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:focus:ring-slate-300 dark:group-[.destructive]:border-slate-800/40 dark:group-[.destructive]:hover:border-red-900/30 dark:group-[.destructive]:hover:bg-red-900 dark:group-[.destructive]:hover:text-slate-50 dark:group-[.destructive]:focus:ring-red-900",e),...t}));Ot.displayName=Ie.displayName;const Fe=n.forwardRef(({className:e,...t},s)=>o.jsx(ke,{ref:s,className:O("absolute right-2 top-2 rounded-md p-1 text-slate-950/50 opacity-0 transition-opacity hover:text-slate-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-slate-50/50 dark:hover:text-slate-50",e),"toast-close":"",...t,children:o.jsx(kt,{className:"h-4 w-4"})}));Fe.displayName=ke.displayName;const Le=n.forwardRef(({className:e,...t},s)=>o.jsx(Pe,{ref:s,className:O(" font-semibold",e),...t}));Le.displayName=Pe.displayName;const Ve=n.forwardRef(({className:e,...t},s)=>o.jsx(Ae,{ref:s,className:O("text-sm opacity-90",e),...t}));Ve.displayName=Ae.displayName;function Dt(){const{toasts:e}=fe();return o.jsxs(Mt,{children:[e.map(function({id:t,title:s,description:r,action:a,...l}){return o.jsxs(De,{...l,children:[o.jsxs("div",{className:"grid gap-1",children:[s&&o.jsx(Le,{children:s}),r&&o.jsx(Ve,{children:r})]}),a,o.jsx(Fe,{})]},t)}),o.jsx(Oe,{})]})}function Ut({children:e,sidebar:t,headerContent:s,bgImage:r,footer:a,noPadding:l}){const{toast:d}=fe(),{flash:u}=Be().props;n.useEffect(()=>{u.toast&&d(u.toast)},[u.toast]);const m={backgroundImage:`url("${r}")`,backgroundSize:"cover",backgroundPosition:"center"};return o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:`${t?"pl-0 sm:pl-16":""} flex mx-auto select-none max-w-[1920px]`,children:[o.jsx(i,{}),o.jsx("div",{className:"z-50",children:t}),o.jsx("main",{className:`w-full overflow-x-hidden h-screen ${l?"pt-16":"pt-[4rem]"} ${l||"pl-4 pr-0"} select-text flex flex-col`,style:r?m:{},children:o.jsxs("div",{className:"flex flex-col h-full w-full overflow-y-auto overflow-x-clip",children:[e,a&&o.jsx(et,{})]})})]}),o.jsx(Dt,{className:"z-[+1]"}),o.jsx("span",{className:"text-xs text-transparent select-none pointer-events-none fixed -bottom-10",children:"Devs: Joseph Paduga, Laurence Arcilla, Arvin Alkuino, Ethan Catacutan"})]});function i(){return o.jsx("div",{className:"relative",children:o.jsxs("div",{className:`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 h-16 ${t&&"pl-16"}
                     bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px] z-40`,children:[o.jsx(pe,{className:"contents",href:"/",children:o.jsx(tt,{className:t&&"ml-2"})}),s]})})}}function Bt({size:e,className:t}){return o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:`icon icon-tabler icons-tabler-outline icon-tabler-menu-2 ${t}`,children:[o.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),o.jsx("path",{d:"M4 6l16 0"}),o.jsx("path",{d:"M4 12l16 0"}),o.jsx("path",{d:"M4 18l16 0"})]})}export{Kt as C,Je as I,Ut as L,re as V,kt as X,Vt as a,Bt as b,_e as c,tt as d,lt as e,fe as u};
