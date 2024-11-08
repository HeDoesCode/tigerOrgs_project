import{r as d,j as a,R as f}from"./app-zFpeRohZ.js";import{a as z,u as D,P as I,b as B,d as fe,e as U,f as me,c as T}from"./utils-lICde5WU.js";import{e as ve}from"./IconMenu3-DXxq794d.js";import{d as q}from"./index-DXk2epaN.js";import{u as Ce}from"./index-25mYpDUC.js";import{C as xe}from"./select-DHn4aMBG.js";var k="Collapsible",[be,Y]=z(k),[ge,M]=be(k),J=d.forwardRef((e,r)=>{const{__scopeCollapsible:o,open:t,defaultOpen:s,disabled:n,onOpenChange:c,...l}=e,[p=!1,u]=D({prop:t,defaultProp:s,onChange:c});return a.jsx(ge,{scope:o,disabled:n,contentId:q(),open:p,onOpenToggle:d.useCallback(()=>u(m=>!m),[u]),children:a.jsx(I.div,{"data-state":V(p),"data-disabled":n?"":void 0,...l,ref:r})})});J.displayName=k;var Q="CollapsibleTrigger",W=d.forwardRef((e,r)=>{const{__scopeCollapsible:o,...t}=e,s=M(Q,o);return a.jsx(I.button,{type:"button","aria-controls":s.contentId,"aria-expanded":s.open||!1,"data-state":V(s.open),"data-disabled":s.disabled?"":void 0,disabled:s.disabled,...t,ref:r,onClick:B(e.onClick,s.onOpenToggle)})});W.displayName=Q;var $="CollapsibleContent",X=d.forwardRef((e,r)=>{const{forceMount:o,...t}=e,s=M($,e.__scopeCollapsible);return a.jsx(fe,{present:o||s.open,children:({present:n})=>a.jsx(Ae,{...t,ref:r,present:n})})});X.displayName=$;var Ae=d.forwardRef((e,r)=>{const{__scopeCollapsible:o,present:t,children:s,...n}=e,c=M($,o),[l,p]=d.useState(t),u=d.useRef(null),m=U(r,u),v=d.useRef(0),h=v.current,x=d.useRef(0),w=x.current,b=c.open||l,g=d.useRef(b),A=d.useRef();return d.useEffect(()=>{const i=requestAnimationFrame(()=>g.current=!1);return()=>cancelAnimationFrame(i)},[]),me(()=>{const i=u.current;if(i){A.current=A.current||{transitionDuration:i.style.transitionDuration,animationName:i.style.animationName},i.style.transitionDuration="0s",i.style.animationName="none";const R=i.getBoundingClientRect();v.current=R.height,x.current=R.width,g.current||(i.style.transitionDuration=A.current.transitionDuration,i.style.animationName=A.current.animationName),p(t)}},[c.open,t]),a.jsx(I.div,{"data-state":V(c.open),"data-disabled":c.disabled?"":void 0,id:c.contentId,hidden:!b,...n,ref:m,style:{"--radix-collapsible-content-height":h?`${h}px`:void 0,"--radix-collapsible-content-width":w?`${w}px`:void 0,...e.style},children:b&&s})});function V(e){return e?"open":"closed"}var he=J,Re=W,Ie=X,C="Accordion",we=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[H,Ne,_e]=ve(C),[_,Be]=z(C,[_e,Y]),L=Y(),Z=f.forwardRef((e,r)=>{const{type:o,...t}=e,s=t,n=t;return a.jsx(H.Provider,{scope:e.__scopeAccordion,children:o==="multiple"?a.jsx(Ee,{...n,ref:r}):a.jsx(je,{...s,ref:r})})});Z.displayName=C;var[ee,ye]=_(C),[oe,Pe]=_(C,{collapsible:!1}),je=f.forwardRef((e,r)=>{const{value:o,defaultValue:t,onValueChange:s=()=>{},collapsible:n=!1,...c}=e,[l,p]=D({prop:o,defaultProp:t,onChange:s});return a.jsx(ee,{scope:e.__scopeAccordion,value:l?[l]:[],onItemOpen:p,onItemClose:f.useCallback(()=>n&&p(""),[n,p]),children:a.jsx(oe,{scope:e.__scopeAccordion,collapsible:n,children:a.jsx(te,{...c,ref:r})})})}),Ee=f.forwardRef((e,r)=>{const{value:o,defaultValue:t,onValueChange:s=()=>{},...n}=e,[c=[],l]=D({prop:o,defaultProp:t,onChange:s}),p=f.useCallback(m=>l((v=[])=>[...v,m]),[l]),u=f.useCallback(m=>l((v=[])=>v.filter(h=>h!==m)),[l]);return a.jsx(ee,{scope:e.__scopeAccordion,value:c,onItemOpen:p,onItemClose:u,children:a.jsx(oe,{scope:e.__scopeAccordion,collapsible:!0,children:a.jsx(te,{...n,ref:r})})})}),[Se,y]=_(C),te=f.forwardRef((e,r)=>{const{__scopeAccordion:o,disabled:t,dir:s,orientation:n="vertical",...c}=e,l=f.useRef(null),p=U(l,r),u=Ne(o),v=Ce(s)==="ltr",h=B(e.onKeyDown,x=>{var K;if(!we.includes(x.key))return;const w=x.target,b=u().filter(S=>{var F;return!((F=S.ref.current)!=null&&F.disabled)}),g=b.findIndex(S=>S.ref.current===w),A=b.length;if(g===-1)return;x.preventDefault();let i=g;const R=0,P=A-1,j=()=>{i=g+1,i>P&&(i=R)},E=()=>{i=g-1,i<R&&(i=P)};switch(x.key){case"Home":i=R;break;case"End":i=P;break;case"ArrowRight":n==="horizontal"&&(v?j():E());break;case"ArrowDown":n==="vertical"&&j();break;case"ArrowLeft":n==="horizontal"&&(v?E():j());break;case"ArrowUp":n==="vertical"&&E();break}const ue=i%A;(K=b[ue].ref.current)==null||K.focus()});return a.jsx(Se,{scope:o,disabled:t,direction:s,orientation:n,children:a.jsx(H.Slot,{scope:o,children:a.jsx(I.div,{...c,"data-orientation":n,ref:p,onKeyDown:t?void 0:h})})})}),N="AccordionItem",[Oe,G]=_(N),ne=f.forwardRef((e,r)=>{const{__scopeAccordion:o,value:t,...s}=e,n=y(N,o),c=ye(N,o),l=L(o),p=q(),u=t&&c.value.includes(t)||!1,m=n.disabled||e.disabled;return a.jsx(Oe,{scope:o,open:u,disabled:m,triggerId:p,children:a.jsx(he,{"data-orientation":n.orientation,"data-state":le(u),...l,...s,ref:r,disabled:m,open:u,onOpenChange:v=>{v?c.onItemOpen(t):c.onItemClose(t)}})})});ne.displayName=N;var re="AccordionHeader",ae=f.forwardRef((e,r)=>{const{__scopeAccordion:o,...t}=e,s=y(C,o),n=G(re,o);return a.jsx(I.h3,{"data-orientation":s.orientation,"data-state":le(n.open),"data-disabled":n.disabled?"":void 0,...t,ref:r})});ae.displayName=re;var O="AccordionTrigger",se=f.forwardRef((e,r)=>{const{__scopeAccordion:o,...t}=e,s=y(C,o),n=G(O,o),c=Pe(O,o),l=L(o);return a.jsx(H.ItemSlot,{scope:o,children:a.jsx(Re,{"aria-disabled":n.open&&!c.collapsible||void 0,"data-orientation":s.orientation,id:n.triggerId,...l,...t,ref:r})})});se.displayName=O;var ce="AccordionContent",ie=f.forwardRef((e,r)=>{const{__scopeAccordion:o,...t}=e,s=y(C,o),n=G(ce,o),c=L(o);return a.jsx(Ie,{role:"region","aria-labelledby":n.triggerId,"data-orientation":s.orientation,...c,...t,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});ie.displayName=ce;function le(e){return e?"open":"closed"}var De=Z,Te=ne,ke=ae,de=se,pe=ie;const Ue=De,Me=d.forwardRef(({className:e,...r},o)=>a.jsx(Te,{ref:o,className:T("border-b",e),...r}));Me.displayName="AccordionItem";const $e=d.forwardRef(({className:e,children:r,...o},t)=>a.jsx(ke,{className:"flex",children:a.jsxs(de,{ref:t,className:T("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",e),...o,children:[r,a.jsx(xe,{className:"h-4 w-4 shrink-0 transition-transform duration-200"})]})}));$e.displayName=de.displayName;const Ve=d.forwardRef(({className:e,children:r,...o},t)=>a.jsx(pe,{ref:t,className:"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...o,children:a.jsx("div",{className:T("pb-4 pt-0",e),children:r})}));Ve.displayName=pe.displayName;export{Ue as A,Me as a,$e as b,Ve as c};
