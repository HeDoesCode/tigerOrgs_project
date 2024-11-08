import{r as s,$ as Je,j as l}from"./app-Cm0bgSGD.js";import{k as be,n as ce,j as K,P as I,f as et,h as F,i as ne,S as tt,D as nt,s as rt,g as at,o as ot,a as M,X as it}from"./IconMenu3-DyyIQKWU.js";var st=Je.useId||(()=>{}),ct=0;function G(e){const[t,n]=s.useState(st());return be(()=>{e||n(r=>r??String(ct++))},[e]),e||(t?`radix-${t}`:"")}var X="focusScope.autoFocusOnMount",Y="focusScope.autoFocusOnUnmount",ue={bubbles:!1,cancelable:!0},ut="FocusScope",Ee=s.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:a,onUnmountAutoFocus:o,...u}=e,[i,v]=s.useState(null),g=ce(a),m=ce(o),f=s.useRef(null),p=K(t,c=>v(c)),y=s.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;s.useEffect(()=>{if(r){let c=function(b){if(y.paused||!i)return;const E=b.target;i.contains(E)?f.current=E:R(f.current,{select:!0})},d=function(b){if(y.paused||!i)return;const E=b.relatedTarget;E!==null&&(i.contains(E)||R(f.current,{select:!0}))},h=function(b){if(document.activeElement===document.body)for(const S of b)S.removedNodes.length>0&&R(i)};document.addEventListener("focusin",c),document.addEventListener("focusout",d);const C=new MutationObserver(h);return i&&C.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",c),document.removeEventListener("focusout",d),C.disconnect()}}},[r,i,y.paused]),s.useEffect(()=>{if(i){de.add(y);const c=document.activeElement;if(!i.contains(c)){const h=new CustomEvent(X,ue);i.addEventListener(X,g),i.dispatchEvent(h),h.defaultPrevented||(lt(ht(Se(i)),{select:!0}),document.activeElement===c&&R(i))}return()=>{i.removeEventListener(X,g),setTimeout(()=>{const h=new CustomEvent(Y,ue);i.addEventListener(Y,m),i.dispatchEvent(h),h.defaultPrevented||R(c??document.body,{select:!0}),i.removeEventListener(Y,m),de.remove(y)},0)}}},[i,g,m,y]);const w=s.useCallback(c=>{if(!n&&!r||y.paused)return;const d=c.key==="Tab"&&!c.altKey&&!c.ctrlKey&&!c.metaKey,h=document.activeElement;if(d&&h){const C=c.currentTarget,[b,E]=dt(C);b&&E?!c.shiftKey&&h===E?(c.preventDefault(),n&&R(b,{select:!0})):c.shiftKey&&h===b&&(c.preventDefault(),n&&R(E,{select:!0})):h===C&&c.preventDefault()}},[n,r,y.paused]);return l.jsx(I.div,{tabIndex:-1,...u,ref:p,onKeyDown:w})});Ee.displayName=ut;function lt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(R(r,{select:t}),document.activeElement!==n)return}function dt(e){const t=Se(e),n=le(t,e),r=le(t.reverse(),e);return[n,r]}function Se(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function le(e,t){for(const n of e)if(!ft(n,{upTo:t}))return n}function ft(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function vt(e){return e instanceof HTMLInputElement&&"select"in e}function R(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&vt(e)&&t&&e.select()}}var de=gt();function gt(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=fe(e,t),e.unshift(t)},remove(t){var n;e=fe(e,t),(n=e[0])==null||n.resume()}}}function fe(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function ht(e){return e.filter(t=>t.tagName!=="A")}var Z=0;function mt(){s.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??ve()),document.body.insertAdjacentElement("beforeend",e[1]??ve()),Z++,()=>{Z===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),Z--}},[])}function ve(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var D=function(){return D=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},D.apply(this,arguments)};function Ce(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function pt(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,o;r<a;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var $="right-scroll-bar-position",H="width-before-scroll-bar",yt="with-scroll-bars-hidden",bt="--removed-body-scroll-bar-size";function q(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Et(e,t){var n=s.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}var St=typeof window<"u"?s.useLayoutEffect:s.useEffect,ge=new WeakMap;function Ct(e,t){var n=Et(null,function(r){return e.forEach(function(a){return q(a,r)})});return St(function(){var r=ge.get(n);if(r){var a=new Set(r),o=new Set(e),u=n.current;a.forEach(function(i){o.has(i)||q(i,null)}),o.forEach(function(i){a.has(i)||q(i,u)})}ge.set(n,e)},[e]),n}function wt(e){return e}function xt(e,t){t===void 0&&(t=wt);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(o){var u=t(o,r);return n.push(u),function(){n=n.filter(function(i){return i!==u})}},assignSyncMedium:function(o){for(r=!0;n.length;){var u=n;n=[],u.forEach(o)}n={push:function(i){return o(i)},filter:function(){return n}}},assignMedium:function(o){r=!0;var u=[];if(n.length){var i=n;n=[],i.forEach(o),u=n}var v=function(){var m=u;u=[],m.forEach(o)},g=function(){return Promise.resolve().then(v)};g(),n={push:function(m){u.push(m),g()},filter:function(m){return u=u.filter(m),n}}}};return a}function Dt(e){e===void 0&&(e={});var t=xt(null);return t.options=D({async:!0,ssr:!1},e),t}var we=function(e){var t=e.sideCar,n=Ce(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return s.createElement(r,D({},n))};we.isSideCarExport=!0;function Rt(e,t){return e.useMedium(t),we}var xe=Dt(),Q=function(){},V=s.forwardRef(function(e,t){var n=s.useRef(null),r=s.useState({onScrollCapture:Q,onWheelCapture:Q,onTouchMoveCapture:Q}),a=r[0],o=r[1],u=e.forwardProps,i=e.children,v=e.className,g=e.removeScrollBar,m=e.enabled,f=e.shards,p=e.sideCar,y=e.noIsolation,w=e.inert,c=e.allowPinchZoom,d=e.as,h=d===void 0?"div":d,C=e.gapMode,b=Ce(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),E=p,S=Ct([n,t]),A=D(D({},b),a);return s.createElement(s.Fragment,null,m&&s.createElement(E,{sideCar:xe,removeScrollBar:g,shards:f,noIsolation:y,inert:w,setCallbacks:o,allowPinchZoom:!!c,lockRef:n,gapMode:C}),u?s.cloneElement(s.Children.only(i),D(D({},A),{ref:S})):s.createElement(h,D({},A,{className:v,ref:S}),i))});V.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};V.classNames={fullWidth:H,zeroRight:$};var Nt=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function At(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Nt();return t&&e.setAttribute("nonce",t),e}function Pt(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Tt(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var Ot=function(){var e=0,t=null;return{add:function(n){e==0&&(t=At())&&(Pt(t,n),Tt(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},kt=function(){var e=Ot();return function(t,n){s.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},De=function(){var e=kt(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},It={left:0,top:0,right:0,gap:0},J=function(e){return parseInt(e||"",10)||0},Mt=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[J(n),J(r),J(a)]},_t=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return It;var t=Mt(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Ft=De(),k="data-scroll-locked",jt=function(e,t,n,r){var a=e.left,o=e.top,u=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(yt,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(k,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat($,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(H,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat($," .").concat($,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(H," .").concat(H,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(k,`] {
    `).concat(bt,": ").concat(i,`px;
  }
`)},he=function(){var e=parseInt(document.body.getAttribute(k)||"0",10);return isFinite(e)?e:0},Lt=function(){s.useEffect(function(){return document.body.setAttribute(k,(he()+1).toString()),function(){var e=he()-1;e<=0?document.body.removeAttribute(k):document.body.setAttribute(k,e.toString())}},[])},Wt=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r;Lt();var o=s.useMemo(function(){return _t(a)},[a]);return s.createElement(Ft,{styles:jt(o,!t,a,n?"":"!important")})},te=!1;if(typeof window<"u")try{var L=Object.defineProperty({},"passive",{get:function(){return te=!0,!0}});window.addEventListener("test",L,L),window.removeEventListener("test",L,L)}catch{te=!1}var P=te?{passive:!1}:!1,Bt=function(e){return e.tagName==="TEXTAREA"},Re=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Bt(e)&&n[t]==="visible")},zt=function(e){return Re(e,"overflowY")},$t=function(e){return Re(e,"overflowX")},me=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var a=Ne(e,r);if(a){var o=Ae(e,r),u=o[1],i=o[2];if(u>i)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},Ht=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Ut=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Ne=function(e,t){return e==="v"?zt(t):$t(t)},Ae=function(e,t){return e==="v"?Ht(t):Ut(t)},Kt=function(e,t){return e==="h"&&t==="rtl"?-1:1},Vt=function(e,t,n,r,a){var o=Kt(e,window.getComputedStyle(t).direction),u=o*r,i=n.target,v=t.contains(i),g=!1,m=u>0,f=0,p=0;do{var y=Ae(e,i),w=y[0],c=y[1],d=y[2],h=c-d-o*w;(w||h)&&Ne(e,i)&&(f+=h,p+=w),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!v&&i!==document.body||v&&(t.contains(i)||t===i));return(m&&(Math.abs(f)<1||!a)||!m&&(Math.abs(p)<1||!a))&&(g=!0),g},W=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},pe=function(e){return[e.deltaX,e.deltaY]},ye=function(e){return e&&"current"in e?e.current:e},Gt=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Xt=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Yt=0,T=[];function Zt(e){var t=s.useRef([]),n=s.useRef([0,0]),r=s.useRef(),a=s.useState(Yt++)[0],o=s.useState(De)[0],u=s.useRef(e);s.useEffect(function(){u.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var c=pt([e.lockRef.current],(e.shards||[]).map(ye),!0).filter(Boolean);return c.forEach(function(d){return d.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),c.forEach(function(d){return d.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var i=s.useCallback(function(c,d){if("touches"in c&&c.touches.length===2||c.type==="wheel"&&c.ctrlKey)return!u.current.allowPinchZoom;var h=W(c),C=n.current,b="deltaX"in c?c.deltaX:C[0]-h[0],E="deltaY"in c?c.deltaY:C[1]-h[1],S,A=c.target,_=Math.abs(b)>Math.abs(E)?"h":"v";if("touches"in c&&_==="h"&&A.type==="range")return!1;var j=me(_,A);if(!j)return!0;if(j?S=_:(S=_==="v"?"h":"v",j=me(_,A)),!j)return!1;if(!r.current&&"changedTouches"in c&&(b||E)&&(r.current=S),!S)return!0;var se=r.current||S;return Vt(se,d,c,se==="h"?b:E,!0)},[]),v=s.useCallback(function(c){var d=c;if(!(!T.length||T[T.length-1]!==o)){var h="deltaY"in d?pe(d):W(d),C=t.current.filter(function(S){return S.name===d.type&&(S.target===d.target||d.target===S.shadowParent)&&Gt(S.delta,h)})[0];if(C&&C.should){d.cancelable&&d.preventDefault();return}if(!C){var b=(u.current.shards||[]).map(ye).filter(Boolean).filter(function(S){return S.contains(d.target)}),E=b.length>0?i(d,b[0]):!u.current.noIsolation;E&&d.cancelable&&d.preventDefault()}}},[]),g=s.useCallback(function(c,d,h,C){var b={name:c,delta:d,target:h,should:C,shadowParent:qt(h)};t.current.push(b),setTimeout(function(){t.current=t.current.filter(function(E){return E!==b})},1)},[]),m=s.useCallback(function(c){n.current=W(c),r.current=void 0},[]),f=s.useCallback(function(c){g(c.type,pe(c),c.target,i(c,e.lockRef.current))},[]),p=s.useCallback(function(c){g(c.type,W(c),c.target,i(c,e.lockRef.current))},[]);s.useEffect(function(){return T.push(o),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:p}),document.addEventListener("wheel",v,P),document.addEventListener("touchmove",v,P),document.addEventListener("touchstart",m,P),function(){T=T.filter(function(c){return c!==o}),document.removeEventListener("wheel",v,P),document.removeEventListener("touchmove",v,P),document.removeEventListener("touchstart",m,P)}},[]);var y=e.removeScrollBar,w=e.inert;return s.createElement(s.Fragment,null,w?s.createElement(o,{styles:Xt(a)}):null,y?s.createElement(Wt,{gapMode:e.gapMode}):null)}function qt(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const Qt=Rt(xe,Zt);var Pe=s.forwardRef(function(e,t){return s.createElement(V,D({},e,{ref:t,sideCar:Qt}))});Pe.classNames=V.classNames;var Jt=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},O=new WeakMap,B=new WeakMap,z={},ee=0,Te=function(e){return e&&(e.host||Te(e.parentNode))},en=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Te(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},tn=function(e,t,n,r){var a=en(t,Array.isArray(e)?e:[e]);z[n]||(z[n]=new WeakMap);var o=z[n],u=[],i=new Set,v=new Set(a),g=function(f){!f||i.has(f)||(i.add(f),g(f.parentNode))};a.forEach(g);var m=function(f){!f||v.has(f)||Array.prototype.forEach.call(f.children,function(p){if(i.has(p))m(p);else try{var y=p.getAttribute(r),w=y!==null&&y!=="false",c=(O.get(p)||0)+1,d=(o.get(p)||0)+1;O.set(p,c),o.set(p,d),u.push(p),c===1&&w&&B.set(p,!0),d===1&&p.setAttribute(n,"true"),w||p.setAttribute(r,"true")}catch(h){console.error("aria-hidden: cannot operate on ",p,h)}})};return m(t),i.clear(),ee++,function(){u.forEach(function(f){var p=O.get(f)-1,y=o.get(f)-1;O.set(f,p),o.set(f,y),p||(B.has(f)||f.removeAttribute(r),B.delete(f)),y||f.removeAttribute(n)}),ee--,ee||(O=new WeakMap,O=new WeakMap,B=new WeakMap,z={})}},nn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=Jt(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),tn(r,a,n,"aria-hidden")):function(){return null}},re="Dialog",[Oe,wn]=et(re),[rn,x]=Oe(re),ke=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:a,onOpenChange:o,modal:u=!0}=e,i=s.useRef(null),v=s.useRef(null),[g=!1,m]=at({prop:r,defaultProp:a,onChange:o});return l.jsx(rn,{scope:t,triggerRef:i,contentRef:v,contentId:G(),titleId:G(),descriptionId:G(),open:g,onOpenChange:m,onOpenToggle:s.useCallback(()=>m(f=>!f),[m]),modal:u,children:n})};ke.displayName=re;var Ie="DialogTrigger",Me=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=x(Ie,n),o=K(t,a.triggerRef);return l.jsx(I.button,{type:"button","aria-haspopup":"dialog","aria-expanded":a.open,"aria-controls":a.contentId,"data-state":ie(a.open),...r,ref:o,onClick:F(e.onClick,a.onOpenToggle)})});Me.displayName=Ie;var ae="DialogPortal",[an,_e]=Oe(ae,{forceMount:void 0}),Fe=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:a}=e,o=x(ae,t);return l.jsx(an,{scope:t,forceMount:n,children:s.Children.map(r,u=>l.jsx(ne,{present:n||o.open,children:l.jsx(ot,{asChild:!0,container:a,children:u})}))})};Fe.displayName=ae;var U="DialogOverlay",je=s.forwardRef((e,t)=>{const n=_e(U,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,o=x(U,e.__scopeDialog);return o.modal?l.jsx(ne,{present:r||o.open,children:l.jsx(on,{...a,ref:t})}):null});je.displayName=U;var on=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=x(U,n);return l.jsx(Pe,{as:tt,allowPinchZoom:!0,shards:[a.contentRef],children:l.jsx(I.div,{"data-state":ie(a.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),N="DialogContent",Le=s.forwardRef((e,t)=>{const n=_e(N,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,o=x(N,e.__scopeDialog);return l.jsx(ne,{present:r||o.open,children:o.modal?l.jsx(sn,{...a,ref:t}):l.jsx(cn,{...a,ref:t})})});Le.displayName=N;var sn=s.forwardRef((e,t)=>{const n=x(N,e.__scopeDialog),r=s.useRef(null),a=K(t,n.contentRef,r);return s.useEffect(()=>{const o=r.current;if(o)return nn(o)},[]),l.jsx(We,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:F(e.onCloseAutoFocus,o=>{var u;o.preventDefault(),(u=n.triggerRef.current)==null||u.focus()}),onPointerDownOutside:F(e.onPointerDownOutside,o=>{const u=o.detail.originalEvent,i=u.button===0&&u.ctrlKey===!0;(u.button===2||i)&&o.preventDefault()}),onFocusOutside:F(e.onFocusOutside,o=>o.preventDefault())})}),cn=s.forwardRef((e,t)=>{const n=x(N,e.__scopeDialog),r=s.useRef(!1),a=s.useRef(!1);return l.jsx(We,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:o=>{var u,i;(u=e.onCloseAutoFocus)==null||u.call(e,o),o.defaultPrevented||(r.current||(i=n.triggerRef.current)==null||i.focus(),o.preventDefault()),r.current=!1,a.current=!1},onInteractOutside:o=>{var v,g;(v=e.onInteractOutside)==null||v.call(e,o),o.defaultPrevented||(r.current=!0,o.detail.originalEvent.type==="pointerdown"&&(a.current=!0));const u=o.target;((g=n.triggerRef.current)==null?void 0:g.contains(u))&&o.preventDefault(),o.detail.originalEvent.type==="focusin"&&a.current&&o.preventDefault()}})}),We=s.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:o,...u}=e,i=x(N,n),v=s.useRef(null),g=K(t,v);return mt(),l.jsxs(l.Fragment,{children:[l.jsx(Ee,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:a,onUnmountAutoFocus:o,children:l.jsx(nt,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":ie(i.open),...u,ref:g,onDismiss:()=>i.onOpenChange(!1)})}),l.jsxs(l.Fragment,{children:[l.jsx(un,{titleId:i.titleId}),l.jsx(dn,{contentRef:v,descriptionId:i.descriptionId})]})]})}),oe="DialogTitle",Be=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=x(oe,n);return l.jsx(I.h2,{id:a.titleId,...r,ref:t})});Be.displayName=oe;var ze="DialogDescription",$e=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=x(ze,n);return l.jsx(I.p,{id:a.descriptionId,...r,ref:t})});$e.displayName=ze;var He="DialogClose",Ue=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=x(He,n);return l.jsx(I.button,{type:"button",...r,ref:t,onClick:F(e.onClick,()=>a.onOpenChange(!1))})});Ue.displayName=He;function ie(e){return e?"open":"closed"}var Ke="DialogTitleWarning",[xn,Ve]=rt(Ke,{contentName:N,titleName:oe,docsSlug:"dialog"}),un=({titleId:e})=>{const t=Ve(Ke),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return s.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},ln="DialogDescriptionWarning",dn=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ve(ln).contentName}}.`;return s.useEffect(()=>{var o;const a=(o=e.current)==null?void 0:o.getAttribute("aria-describedby");t&&a&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},fn=ke,vn=Me,gn=Fe,Ge=je,Xe=Le,Ye=Be,Ze=$e,qe=Ue;const Dn=fn,Rn=vn,hn=gn,Nn=qe,Qe=s.forwardRef(({className:e,...t},n)=>l.jsx(Ge,{ref:n,className:M("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));Qe.displayName=Ge.displayName;const mn=s.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(hn,{children:[l.jsx(Qe,{}),l.jsxs(Xe,{ref:r,className:M("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950",e),...n,children:[t,l.jsxs(qe,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400",children:[l.jsx(it,{className:"h-4 w-4"}),l.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));mn.displayName=Xe.displayName;const pn=({className:e,...t})=>l.jsx("div",{className:M("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});pn.displayName="DialogHeader";const yn=({className:e,...t})=>l.jsx("div",{className:M("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...t});yn.displayName="DialogFooter";const bn=s.forwardRef(({className:e,...t},n)=>l.jsx(Ye,{ref:n,className:M("text-lg font-semibold leading-none tracking-tight",e),...t}));bn.displayName=Ye.displayName;const En=s.forwardRef(({className:e,...t},n)=>l.jsx(Ze,{ref:n,className:M("text-sm text-slate-500 dark:text-slate-400",e),...t}));En.displayName=Ze.displayName;function An(e){const[t,n]=s.useState(void 0);return be(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(a=>{if(!Array.isArray(a)||!a.length)return;const o=a[0];let u,i;if("borderBoxSize"in o){const v=o.borderBoxSize,g=Array.isArray(v)?v[0]:v;u=g.inlineSize,i=g.blockSize}else u=e.offsetWidth,i=e.offsetHeight;n({width:u,height:i})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}export{Xe as C,Dn as D,Ee as F,Ge as O,gn as P,Wt as R,vn as T,xn as W,Ce as _,D as a,pt as b,Dt as c,Rn as d,Rt as e,H as f,mn as g,nn as h,pn as i,bn as j,En as k,yn as l,Nn as m,G as n,mt as o,Pe as p,wn as q,Ye as r,De as s,Ze as t,Ct as u,qe as v,fn as w,An as x,$ as z};