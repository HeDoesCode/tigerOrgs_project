import{r as o,j as r,a as Pe}from"./app-B-VwrYDE.js";import{a as mt,d as L,P as j,b as P,e as z,S as ht,D as gt,f as vt,u as Te,g as xt,c as G}from"./utils-BYzceVvt.js";import{c as St,V as wt}from"./index-CtrRCuM8.js";import{c as Re,A as yt,C as Ct,a as bt,u as It,R as Tt}from"./index-NvYEGyFc.js";import{h as Nt,g as Pt,i as Rt,F as Et,d as be}from"./index-DuCJuTJk.js";import{u as _t}from"./index-BiqsrKUF.js";import{c as Ee}from"./createLucideIcon-C5gXA4Px.js";import{C as jt}from"./check-djFF3yP5.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=Ee("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=Ee("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);function Ne(t,[n,e]){return Math.min(e,Math.max(n,t))}var At=[" ","Enter","ArrowUp","ArrowDown"],Ot=[" ","Enter"],se="Select",[ie,de,Dt]=St(se),[te,So]=mt(se,[Dt,Re]),ue=Re(),[kt,q]=te(se),[Lt,Vt]=te(se),je=t=>{const{__scopeSelect:n,children:e,open:a,defaultOpen:c,onOpenChange:p,value:l,defaultValue:i,onValueChange:s,dir:f,name:v,autoComplete:w,disabled:T,required:N,form:I}=t,d=ue(n),[g,y]=o.useState(null),[u,h]=o.useState(null),[M,A]=o.useState(!1),oe=It(f),[R=!1,D]=Te({prop:a,defaultProp:c,onChange:p}),[W,X]=Te({prop:l,defaultProp:i,onChange:s}),V=o.useRef(null),B=g?I||!!g.closest("form"):!0,[K,H]=o.useState(new Set),F=Array.from(K).map(E=>E.props.value).join(";");return r.jsx(Tt,{...d,children:r.jsxs(kt,{required:N,scope:n,trigger:g,onTriggerChange:y,valueNode:u,onValueNodeChange:h,valueNodeHasChildren:M,onValueNodeHasChildrenChange:A,contentId:be(),value:W,onValueChange:X,open:R,onOpenChange:D,dir:oe,triggerPointerDownPosRef:V,disabled:T,children:[r.jsx(ie.Provider,{scope:n,children:r.jsx(Lt,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(E=>{H(k=>new Set(k).add(E))},[]),onNativeOptionRemove:o.useCallback(E=>{H(k=>{const U=new Set(k);return U.delete(E),U})},[]),children:e})}),B?r.jsxs(ot,{"aria-hidden":!0,required:N,tabIndex:-1,name:v,autoComplete:w,value:W,onChange:E=>X(E.target.value),disabled:T,form:I,children:[W===void 0?r.jsx("option",{value:""}):null,Array.from(K)]},F):null]})})};je.displayName=se;var Me="SelectTrigger",Ae=o.forwardRef((t,n)=>{const{__scopeSelect:e,disabled:a=!1,...c}=t,p=ue(e),l=q(Me,e),i=l.disabled||a,s=L(n,l.onTriggerChange),f=de(e),v=o.useRef("touch"),[w,T,N]=nt(d=>{const g=f().filter(h=>!h.disabled),y=g.find(h=>h.value===l.value),u=rt(g,d,y);u!==void 0&&l.onValueChange(u.value)}),I=d=>{i||(l.onOpenChange(!0),N()),d&&(l.triggerPointerDownPosRef.current={x:Math.round(d.pageX),y:Math.round(d.pageY)})};return r.jsx(yt,{asChild:!0,...p,children:r.jsx(j.button,{type:"button",role:"combobox","aria-controls":l.contentId,"aria-expanded":l.open,"aria-required":l.required,"aria-autocomplete":"none",dir:l.dir,"data-state":l.open?"open":"closed",disabled:i,"data-disabled":i?"":void 0,"data-placeholder":tt(l.value)?"":void 0,...c,ref:s,onClick:P(c.onClick,d=>{d.currentTarget.focus(),v.current!=="mouse"&&I(d)}),onPointerDown:P(c.onPointerDown,d=>{v.current=d.pointerType;const g=d.target;g.hasPointerCapture(d.pointerId)&&g.releasePointerCapture(d.pointerId),d.button===0&&d.ctrlKey===!1&&d.pointerType==="mouse"&&(I(d),d.preventDefault())}),onKeyDown:P(c.onKeyDown,d=>{const g=w.current!=="";!(d.ctrlKey||d.altKey||d.metaKey)&&d.key.length===1&&T(d.key),!(g&&d.key===" ")&&At.includes(d.key)&&(I(),d.preventDefault())})})})});Ae.displayName=Me;var Oe="SelectValue",De=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:c,children:p,placeholder:l="",...i}=t,s=q(Oe,e),{onValueNodeHasChildrenChange:f}=s,v=p!==void 0,w=L(n,s.onValueNodeChange);return z(()=>{f(v)},[f,v]),r.jsx(j.span,{...i,ref:w,style:{pointerEvents:"none"},children:tt(s.value)?r.jsx(r.Fragment,{children:l}):p})});De.displayName=Oe;var Bt="SelectIcon",ke=o.forwardRef((t,n)=>{const{__scopeSelect:e,children:a,...c}=t;return r.jsx(j.span,{"aria-hidden":!0,...c,ref:n,children:a||"▼"})});ke.displayName=Bt;var Ht="SelectPortal",Le=t=>r.jsx(xt,{asChild:!0,...t});Le.displayName=Ht;var Q="SelectContent",Ve=o.forwardRef((t,n)=>{const e=q(Q,t.__scopeSelect),[a,c]=o.useState();if(z(()=>{c(new DocumentFragment)},[]),!e.open){const p=a;return p?Pe.createPortal(r.jsx(Be,{scope:t.__scopeSelect,children:r.jsx(ie.Slot,{scope:t.__scopeSelect,children:r.jsx("div",{children:t.children})})}),p):null}return r.jsx(He,{...t,ref:n})});Ve.displayName=Q;var O=10,[Be,Y]=te(Q),Ft="SelectContentImpl",He=o.forwardRef((t,n)=>{const{__scopeSelect:e,position:a="item-aligned",onCloseAutoFocus:c,onEscapeKeyDown:p,onPointerDownOutside:l,side:i,sideOffset:s,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:T,collisionPadding:N,sticky:I,hideWhenDetached:d,avoidCollisions:g,...y}=t,u=q(Q,e),[h,M]=o.useState(null),[A,oe]=o.useState(null),R=L(n,m=>M(m)),[D,W]=o.useState(null),[X,V]=o.useState(null),B=de(e),[K,H]=o.useState(!1),F=o.useRef(!1);o.useEffect(()=>{if(h)return Nt(h)},[h]),Pt();const E=o.useCallback(m=>{const[b,..._]=B().map(S=>S.ref.current),[C]=_.slice(-1),x=document.activeElement;for(const S of m)if(S===x||(S==null||S.scrollIntoView({block:"nearest"}),S===b&&A&&(A.scrollTop=0),S===C&&A&&(A.scrollTop=A.scrollHeight),S==null||S.focus(),document.activeElement!==x))return},[B,A]),k=o.useCallback(()=>E([D,h]),[E,D,h]);o.useEffect(()=>{K&&k()},[K,k]);const{onOpenChange:U,triggerPointerDownPosRef:$}=u;o.useEffect(()=>{if(h){let m={x:0,y:0};const b=C=>{var x,S;m={x:Math.abs(Math.round(C.pageX)-(((x=$.current)==null?void 0:x.x)??0)),y:Math.abs(Math.round(C.pageY)-(((S=$.current)==null?void 0:S.y)??0))}},_=C=>{m.x<=10&&m.y<=10?C.preventDefault():h.contains(C.target)||U(!1),document.removeEventListener("pointermove",b),$.current=null};return $.current!==null&&(document.addEventListener("pointermove",b),document.addEventListener("pointerup",_,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",b),document.removeEventListener("pointerup",_,{capture:!0})}}},[h,U,$]),o.useEffect(()=>{const m=()=>U(!1);return window.addEventListener("blur",m),window.addEventListener("resize",m),()=>{window.removeEventListener("blur",m),window.removeEventListener("resize",m)}},[U]);const[pe,ae]=nt(m=>{const b=B().filter(x=>!x.disabled),_=b.find(x=>x.ref.current===document.activeElement),C=rt(b,m,_);C&&setTimeout(()=>C.ref.current.focus())}),fe=o.useCallback((m,b,_)=>{const C=!F.current&&!_;(u.value!==void 0&&u.value===b||C)&&(W(m),C&&(F.current=!0))},[u.value]),me=o.useCallback(()=>h==null?void 0:h.focus(),[h]),ee=o.useCallback((m,b,_)=>{const C=!F.current&&!_;(u.value!==void 0&&u.value===b||C)&&V(m)},[u.value]),le=a==="popper"?xe:Fe,ne=le===xe?{side:i,sideOffset:s,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:T,collisionPadding:N,sticky:I,hideWhenDetached:d,avoidCollisions:g}:{};return r.jsx(Be,{scope:e,content:h,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:D,onItemLeave:me,itemTextRefCallback:ee,focusSelectedItem:k,selectedItemText:X,position:a,isPositioned:K,searchRef:pe,children:r.jsx(Rt,{as:ht,allowPinchZoom:!0,children:r.jsx(Et,{asChild:!0,trapped:u.open,onMountAutoFocus:m=>{m.preventDefault()},onUnmountAutoFocus:P(c,m=>{var b;(b=u.trigger)==null||b.focus({preventScroll:!0}),m.preventDefault()}),children:r.jsx(gt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:p,onPointerDownOutside:l,onFocusOutside:m=>m.preventDefault(),onDismiss:()=>u.onOpenChange(!1),children:r.jsx(le,{role:"listbox",id:u.contentId,"data-state":u.open?"open":"closed",dir:u.dir,onContextMenu:m=>m.preventDefault(),...y,...ne,onPlaced:()=>H(!0),ref:R,style:{display:"flex",flexDirection:"column",outline:"none",...y.style},onKeyDown:P(y.onKeyDown,m=>{const b=m.ctrlKey||m.altKey||m.metaKey;if(m.key==="Tab"&&m.preventDefault(),!b&&m.key.length===1&&ae(m.key),["ArrowUp","ArrowDown","Home","End"].includes(m.key)){let C=B().filter(x=>!x.disabled).map(x=>x.ref.current);if(["ArrowUp","End"].includes(m.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(m.key)){const x=m.target,S=C.indexOf(x);C=C.slice(S+1)}setTimeout(()=>E(C)),m.preventDefault()}})})})})})})});He.displayName=Ft;var Ut="SelectItemAlignedPosition",Fe=o.forwardRef((t,n)=>{const{__scopeSelect:e,onPlaced:a,...c}=t,p=q(Q,e),l=Y(Q,e),[i,s]=o.useState(null),[f,v]=o.useState(null),w=L(n,R=>v(R)),T=de(e),N=o.useRef(!1),I=o.useRef(!0),{viewport:d,selectedItem:g,selectedItemText:y,focusSelectedItem:u}=l,h=o.useCallback(()=>{if(p.trigger&&p.valueNode&&i&&f&&d&&g&&y){const R=p.trigger.getBoundingClientRect(),D=f.getBoundingClientRect(),W=p.valueNode.getBoundingClientRect(),X=y.getBoundingClientRect();if(p.dir!=="rtl"){const x=X.left-D.left,S=W.left-x,Z=R.left-S,J=R.width+Z,he=Math.max(J,D.width),ge=window.innerWidth-O,ve=Ne(S,[O,Math.max(O,ge-he)]);i.style.minWidth=J+"px",i.style.left=ve+"px"}else{const x=D.right-X.right,S=window.innerWidth-W.right-x,Z=window.innerWidth-R.right-S,J=R.width+Z,he=Math.max(J,D.width),ge=window.innerWidth-O,ve=Ne(S,[O,Math.max(O,ge-he)]);i.style.minWidth=J+"px",i.style.right=ve+"px"}const V=T(),B=window.innerHeight-O*2,K=d.scrollHeight,H=window.getComputedStyle(f),F=parseInt(H.borderTopWidth,10),E=parseInt(H.paddingTop,10),k=parseInt(H.borderBottomWidth,10),U=parseInt(H.paddingBottom,10),$=F+E+K+U+k,pe=Math.min(g.offsetHeight*5,$),ae=window.getComputedStyle(d),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),ee=R.top+R.height/2-O,le=B-ee,ne=g.offsetHeight/2,m=g.offsetTop+ne,b=F+E+m,_=$-b;if(b<=ee){const x=V.length>0&&g===V[V.length-1].ref.current;i.style.bottom="0px";const S=f.clientHeight-d.offsetTop-d.offsetHeight,Z=Math.max(le,ne+(x?me:0)+S+k),J=b+Z;i.style.height=J+"px"}else{const x=V.length>0&&g===V[0].ref.current;i.style.top="0px";const Z=Math.max(ee,F+d.offsetTop+(x?fe:0)+ne)+_;i.style.height=Z+"px",d.scrollTop=b-ee+d.offsetTop}i.style.margin=`${O}px 0`,i.style.minHeight=pe+"px",i.style.maxHeight=B+"px",a==null||a(),requestAnimationFrame(()=>N.current=!0)}},[T,p.trigger,p.valueNode,i,f,d,g,y,p.dir,a]);z(()=>h(),[h]);const[M,A]=o.useState();z(()=>{f&&A(window.getComputedStyle(f).zIndex)},[f]);const oe=o.useCallback(R=>{R&&I.current===!0&&(h(),u==null||u(),I.current=!1)},[h,u]);return r.jsx(Kt,{scope:e,contentWrapper:i,shouldExpandOnScrollRef:N,onScrollButtonChange:oe,children:r.jsx("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:M},children:r.jsx(j.div,{...c,ref:w,style:{boxSizing:"border-box",maxHeight:"100%",...c.style}})})})});Fe.displayName=Ut;var Wt="SelectPopperPosition",xe=o.forwardRef((t,n)=>{const{__scopeSelect:e,align:a="start",collisionPadding:c=O,...p}=t,l=ue(e);return r.jsx(Ct,{...l,...p,ref:n,align:a,collisionPadding:c,style:{boxSizing:"border-box",...p.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});xe.displayName=Wt;var[Kt,Ie]=te(Q,{}),Se="SelectViewport",Ue=o.forwardRef((t,n)=>{const{__scopeSelect:e,nonce:a,...c}=t,p=Y(Se,e),l=Ie(Se,e),i=L(n,p.onViewportChange),s=o.useRef(0);return r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),r.jsx(ie.Slot,{scope:e,children:r.jsx(j.div,{"data-radix-select-viewport":"",role:"presentation",...c,ref:i,style:{position:"relative",flex:1,overflow:"hidden auto",...c.style},onScroll:P(c.onScroll,f=>{const v=f.currentTarget,{contentWrapper:w,shouldExpandOnScrollRef:T}=l;if(T!=null&&T.current&&w){const N=Math.abs(s.current-v.scrollTop);if(N>0){const I=window.innerHeight-O*2,d=parseFloat(w.style.minHeight),g=parseFloat(w.style.height),y=Math.max(d,g);if(y<I){const u=y+N,h=Math.min(I,u),M=u-h;w.style.height=h+"px",w.style.bottom==="0px"&&(v.scrollTop=M>0?M:0,w.style.justifyContent="flex-end")}}}s.current=v.scrollTop})})})]})});Ue.displayName=Se;var We="SelectGroup",[$t,zt]=te(We),Gt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,c=be();return r.jsx($t,{scope:e,id:c,children:r.jsx(j.div,{role:"group","aria-labelledby":c,...a,ref:n})})});Gt.displayName=We;var Ke="SelectLabel",$e=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,c=zt(Ke,e);return r.jsx(j.div,{id:c.id,...a,ref:n})});$e.displayName=Ke;var ce="SelectItem",[qt,ze]=te(ce),Ge=o.forwardRef((t,n)=>{const{__scopeSelect:e,value:a,disabled:c=!1,textValue:p,...l}=t,i=q(ce,e),s=Y(ce,e),f=i.value===a,[v,w]=o.useState(p??""),[T,N]=o.useState(!1),I=L(n,u=>{var h;return(h=s.itemRefCallback)==null?void 0:h.call(s,u,a,c)}),d=be(),g=o.useRef("touch"),y=()=>{c||(i.onValueChange(a),i.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return r.jsx(qt,{scope:e,value:a,disabled:c,textId:d,isSelected:f,onItemTextChange:o.useCallback(u=>{w(h=>h||((u==null?void 0:u.textContent)??"").trim())},[]),children:r.jsx(ie.ItemSlot,{scope:e,value:a,disabled:c,textValue:v,children:r.jsx(j.div,{role:"option","aria-labelledby":d,"data-highlighted":T?"":void 0,"aria-selected":f&&T,"data-state":f?"checked":"unchecked","aria-disabled":c||void 0,"data-disabled":c?"":void 0,tabIndex:c?void 0:-1,...l,ref:I,onFocus:P(l.onFocus,()=>N(!0)),onBlur:P(l.onBlur,()=>N(!1)),onClick:P(l.onClick,()=>{g.current!=="mouse"&&y()}),onPointerUp:P(l.onPointerUp,()=>{g.current==="mouse"&&y()}),onPointerDown:P(l.onPointerDown,u=>{g.current=u.pointerType}),onPointerMove:P(l.onPointerMove,u=>{var h;g.current=u.pointerType,c?(h=s.onItemLeave)==null||h.call(s):g.current==="mouse"&&u.currentTarget.focus({preventScroll:!0})}),onPointerLeave:P(l.onPointerLeave,u=>{var h;u.currentTarget===document.activeElement&&((h=s.onItemLeave)==null||h.call(s))}),onKeyDown:P(l.onKeyDown,u=>{var M;((M=s.searchRef)==null?void 0:M.current)!==""&&u.key===" "||(Ot.includes(u.key)&&y(),u.key===" "&&u.preventDefault())})})})})});Ge.displayName=ce;var re="SelectItemText",qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:c,...p}=t,l=q(re,e),i=Y(re,e),s=ze(re,e),f=Vt(re,e),[v,w]=o.useState(null),T=L(n,y=>w(y),s.onItemTextChange,y=>{var u;return(u=i.itemTextRefCallback)==null?void 0:u.call(i,y,s.value,s.disabled)}),N=v==null?void 0:v.textContent,I=o.useMemo(()=>r.jsx("option",{value:s.value,disabled:s.disabled,children:N},s.value),[s.disabled,s.value,N]),{onNativeOptionAdd:d,onNativeOptionRemove:g}=f;return z(()=>(d(I),()=>g(I)),[d,g,I]),r.jsxs(r.Fragment,{children:[r.jsx(j.span,{id:s.textId,...p,ref:T}),s.isSelected&&l.valueNode&&!l.valueNodeHasChildren?Pe.createPortal(p.children,l.valueNode):null]})});qe.displayName=re;var Ye="SelectItemIndicator",Xe=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return ze(Ye,e).isSelected?r.jsx(j.span,{"aria-hidden":!0,...a,ref:n}):null});Xe.displayName=Ye;var we="SelectScrollUpButton",Ze=o.forwardRef((t,n)=>{const e=Y(we,t.__scopeSelect),a=Ie(we,t.__scopeSelect),[c,p]=o.useState(!1),l=L(n,a.onScrollButtonChange);return z(()=>{if(e.viewport&&e.isPositioned){let i=function(){const f=s.scrollTop>0;p(f)};const s=e.viewport;return i(),s.addEventListener("scroll",i),()=>s.removeEventListener("scroll",i)}},[e.viewport,e.isPositioned]),c?r.jsx(Qe,{...t,ref:l,onAutoScroll:()=>{const{viewport:i,selectedItem:s}=e;i&&s&&(i.scrollTop=i.scrollTop-s.offsetHeight)}}):null});Ze.displayName=we;var ye="SelectScrollDownButton",Je=o.forwardRef((t,n)=>{const e=Y(ye,t.__scopeSelect),a=Ie(ye,t.__scopeSelect),[c,p]=o.useState(!1),l=L(n,a.onScrollButtonChange);return z(()=>{if(e.viewport&&e.isPositioned){let i=function(){const f=s.scrollHeight-s.clientHeight,v=Math.ceil(s.scrollTop)<f;p(v)};const s=e.viewport;return i(),s.addEventListener("scroll",i),()=>s.removeEventListener("scroll",i)}},[e.viewport,e.isPositioned]),c?r.jsx(Qe,{...t,ref:l,onAutoScroll:()=>{const{viewport:i,selectedItem:s}=e;i&&s&&(i.scrollTop=i.scrollTop+s.offsetHeight)}}):null});Je.displayName=ye;var Qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,onAutoScroll:a,...c}=t,p=Y("SelectScrollButton",e),l=o.useRef(null),i=de(e),s=o.useCallback(()=>{l.current!==null&&(window.clearInterval(l.current),l.current=null)},[]);return o.useEffect(()=>()=>s(),[s]),z(()=>{var v;const f=i().find(w=>w.ref.current===document.activeElement);(v=f==null?void 0:f.ref.current)==null||v.scrollIntoView({block:"nearest"})},[i]),r.jsx(j.div,{"aria-hidden":!0,...c,ref:n,style:{flexShrink:0,...c.style},onPointerDown:P(c.onPointerDown,()=>{l.current===null&&(l.current=window.setInterval(a,50))}),onPointerMove:P(c.onPointerMove,()=>{var f;(f=p.onItemLeave)==null||f.call(p),l.current===null&&(l.current=window.setInterval(a,50))}),onPointerLeave:P(c.onPointerLeave,()=>{s()})})}),Yt="SelectSeparator",et=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return r.jsx(j.div,{"aria-hidden":!0,...a,ref:n})});et.displayName=Yt;var Ce="SelectArrow",Xt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,c=ue(e),p=q(Ce,e),l=Y(Ce,e);return p.open&&l.position==="popper"?r.jsx(bt,{...c,...a,ref:n}):null});Xt.displayName=Ce;function tt(t){return t===""||t===void 0}var ot=o.forwardRef((t,n)=>{const{value:e,...a}=t,c=o.useRef(null),p=L(n,c),l=_t(e);return o.useEffect(()=>{const i=c.current,s=window.HTMLSelectElement.prototype,v=Object.getOwnPropertyDescriptor(s,"value").set;if(l!==e&&v){const w=new Event("change",{bubbles:!0});v.call(i,e),i.dispatchEvent(w)}},[l,e]),r.jsx(wt,{asChild:!0,children:r.jsx("select",{...a,ref:p,defaultValue:e})})});ot.displayName="BubbleSelect";function nt(t){const n=vt(t),e=o.useRef(""),a=o.useRef(0),c=o.useCallback(l=>{const i=e.current+l;n(i),function s(f){e.current=f,window.clearTimeout(a.current),f!==""&&(a.current=window.setTimeout(()=>s(""),1e3))}(i)},[n]),p=o.useCallback(()=>{e.current="",window.clearTimeout(a.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(a.current),[]),[e,c,p]}function rt(t,n,e){const c=n.length>1&&Array.from(n).every(f=>f===n[0])?n[0]:n,p=e?t.indexOf(e):-1;let l=Zt(t,Math.max(p,0));c.length===1&&(l=l.filter(f=>f!==e));const s=l.find(f=>f.textValue.toLowerCase().startsWith(c.toLowerCase()));return s!==e?s:void 0}function Zt(t,n){return t.map((e,a)=>t[(n+a)%t.length])}var Jt=je,st=Ae,Qt=De,eo=ke,to=Le,at=Ve,oo=Ue,lt=$e,ct=Ge,no=qe,ro=Xe,it=Ze,dt=Je,ut=et;const wo=Jt,yo=Qt,so=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(st,{ref:a,className:G("flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300",t),...e,children:[n,r.jsx(eo,{asChild:!0,children:r.jsx(_e,{className:"h-4 w-4 opacity-50"})})]}));so.displayName=st.displayName;const pt=o.forwardRef(({className:t,...n},e)=>r.jsx(it,{ref:e,className:G("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(Mt,{className:"h-4 w-4"})}));pt.displayName=it.displayName;const ft=o.forwardRef(({className:t,...n},e)=>r.jsx(dt,{ref:e,className:G("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(_e,{className:"h-4 w-4"})}));ft.displayName=dt.displayName;const ao=o.forwardRef(({className:t,children:n,position:e="popper",...a},c)=>r.jsx(to,{children:r.jsxs(at,{ref:c,className:G("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...a,children:[r.jsx(pt,{}),r.jsx(oo,{className:G("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),r.jsx(ft,{})]})}));ao.displayName=at.displayName;const lo=o.forwardRef(({className:t,...n},e)=>r.jsx(lt,{ref:e,className:G("py-1.5 pl-8 pr-2 text-sm font-semibold",t),...n}));lo.displayName=lt.displayName;const co=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(ct,{ref:a,className:G("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",t),...e,children:[r.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(ro,{children:r.jsx(jt,{className:"h-4 w-4"})})}),r.jsx(no,{children:n})]}));co.displayName=ct.displayName;const io=o.forwardRef(({className:t,...n},e)=>r.jsx(ut,{ref:e,className:G("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800",t),...n}));io.displayName=ut.displayName;export{_e as C,wo as S,so as a,yo as b,ao as c,co as d};