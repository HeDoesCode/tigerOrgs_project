import{r as l,j as S,a as xe,b as we}from"./app-HKnQip39.js";function X(e,t,{checkForDefaultPrevented:r=!0}={}){return function(n){if(e==null||e(n),r===!1||!n.defaultPrevented)return t==null?void 0:t(n)}}function Ce(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function ae(...e){return t=>e.forEach(r=>Ce(r,t))}function le(...e){return l.useCallback(ae(...e),e)}var ce=l.forwardRef((e,t)=>{const{children:r,...o}=e,n=l.Children.toArray(r),s=n.find(Pe);if(s){const a=s.props.children,i=n.map(u=>u===s?l.Children.count(a)>1?l.Children.only(null):l.isValidElement(a)?a.props.children:null:u);return S.jsx(K,{...o,ref:t,children:l.isValidElement(a)?l.cloneElement(a,void 0,i):null})}return S.jsx(K,{...o,ref:t,children:r})});ce.displayName="Slot";var K=l.forwardRef((e,t)=>{const{children:r,...o}=e;if(l.isValidElement(r)){const n=ke(r);return l.cloneElement(r,{...Se(o,r.props),ref:t?ae(t,n):n})}return l.Children.count(r)>1?l.Children.only(null):null});K.displayName="SlotClone";var Ee=({children:e})=>S.jsx(S.Fragment,{children:e});function Pe(e){return l.isValidElement(e)&&e.type===Ee}function Se(e,t){const r={...t};for(const o in t){const n=e[o],s=t[o];/^on[A-Z]/.test(o)?n&&s?r[o]=(...i)=>{s(...i),n(...i)}:n&&(r[o]=n):o==="style"?r[o]={...n,...s}:o==="className"&&(r[o]=[n,s].filter(Boolean).join(" "))}return{...e,...r}}function ke(e){var o,n;let t=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=(n=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:n.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}function wt(e,t){const r=l.createContext(t),o=s=>{const{children:a,...i}=s,u=l.useMemo(()=>i,Object.values(i));return S.jsx(r.Provider,{value:u,children:a})};o.displayName=e+"Provider";function n(s){const a=l.useContext(r);if(a)return a;if(t!==void 0)return t;throw new Error(`\`${s}\` must be used within \`${e}\``)}return[o,n]}function Ct(e,t=[]){let r=[];function o(s,a){const i=l.createContext(a),u=r.length;r=[...r,a];const c=y=>{var v;const{scope:f,children:C,...w}=y,b=((v=f==null?void 0:f[e])==null?void 0:v[u])||i,g=l.useMemo(()=>w,Object.values(w));return S.jsx(b.Provider,{value:g,children:C})};c.displayName=s+"Provider";function p(y,f){var b;const C=((b=f==null?void 0:f[e])==null?void 0:b[u])||i,w=l.useContext(C);if(w)return w;if(a!==void 0)return a;throw new Error(`\`${y}\` must be used within \`${s}\``)}return[c,p]}const n=()=>{const s=r.map(a=>l.createContext(a));return function(i){const u=(i==null?void 0:i[e])||s;return l.useMemo(()=>({[`__scope${e}`]:{...i,[e]:u}}),[i,u])}};return n.scopeName=e,[o,Re(n,...t)]}function Re(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const o=e.map(n=>({useScope:n(),scopeName:n.scopeName}));return function(s){const a=o.reduce((i,{useScope:u,scopeName:c})=>{const y=u(s)[`__scope${c}`];return{...i,...y}},{});return l.useMemo(()=>({[`__scope${t.scopeName}`]:a}),[a])}};return r.scopeName=t.scopeName,r}var ze=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],Y=ze.reduce((e,t)=>{const r=l.forwardRef((o,n)=>{const{asChild:s,...a}=o,i=s?ce:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),S.jsx(i,{...a,ref:n})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function Ae(e,t){e&&xe.flushSync(()=>e.dispatchEvent(t))}function _(e){const t=l.useRef(e);return l.useEffect(()=>{t.current=e}),l.useMemo(()=>(...r)=>{var o;return(o=t.current)==null?void 0:o.call(t,...r)},[])}function Le(e,t=globalThis==null?void 0:globalThis.document){const r=_(e);l.useEffect(()=>{const o=n=>{n.key==="Escape"&&r(n)};return t.addEventListener("keydown",o,{capture:!0}),()=>t.removeEventListener("keydown",o,{capture:!0})},[r,t])}var Me="DismissableLayer",Z="dismissableLayer.update",Oe="dismissableLayer.pointerDownOutside",je="dismissableLayer.focusOutside",oe,de=l.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),ue=l.forwardRef((e,t)=>{const{disableOutsidePointerEvents:r=!1,onEscapeKeyDown:o,onPointerDownOutside:n,onFocusOutside:s,onInteractOutside:a,onDismiss:i,...u}=e,c=l.useContext(de),[p,y]=l.useState(null),f=(p==null?void 0:p.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,C]=l.useState({}),w=le(t,x=>y(x)),b=Array.from(c.layers),[g]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),v=b.indexOf(g),E=p?b.indexOf(p):-1,L=c.layersWithOutsidePointerEventsDisabled.size>0,P=E>=v,j=Te(x=>{const M=x.target,N=[...c.branches].some(O=>O.contains(M));!P||N||(n==null||n(x),a==null||a(x),x.defaultPrevented||i==null||i())},f),G=Ie(x=>{const M=x.target;[...c.branches].some(O=>O.contains(M))||(s==null||s(x),a==null||a(x),x.defaultPrevented||i==null||i())},f);return Le(x=>{E===c.layers.size-1&&(o==null||o(x),!x.defaultPrevented&&i&&(x.preventDefault(),i()))},f),l.useEffect(()=>{if(p)return r&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(oe=f.body.style.pointerEvents,f.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(p)),c.layers.add(p),ne(),()=>{r&&c.layersWithOutsidePointerEventsDisabled.size===1&&(f.body.style.pointerEvents=oe)}},[p,f,r,c]),l.useEffect(()=>()=>{p&&(c.layers.delete(p),c.layersWithOutsidePointerEventsDisabled.delete(p),ne())},[p,c]),l.useEffect(()=>{const x=()=>C({});return document.addEventListener(Z,x),()=>document.removeEventListener(Z,x)},[]),S.jsx(Y.div,{...u,ref:w,style:{pointerEvents:L?P?"auto":"none":void 0,...e.style},onFocusCapture:X(e.onFocusCapture,G.onFocusCapture),onBlurCapture:X(e.onBlurCapture,G.onBlurCapture),onPointerDownCapture:X(e.onPointerDownCapture,j.onPointerDownCapture)})});ue.displayName=Me;var Ne="DismissableLayerBranch",pe=l.forwardRef((e,t)=>{const r=l.useContext(de),o=l.useRef(null),n=le(t,o);return l.useEffect(()=>{const s=o.current;if(s)return r.branches.add(s),()=>{r.branches.delete(s)}},[r.branches]),S.jsx(Y.div,{...e,ref:n})});pe.displayName=Ne;function Te(e,t=globalThis==null?void 0:globalThis.document){const r=_(e),o=l.useRef(!1),n=l.useRef(()=>{});return l.useEffect(()=>{const s=i=>{if(i.target&&!o.current){let u=function(){fe(Oe,r,c,{discrete:!0})};const c={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",n.current),n.current=u,t.addEventListener("click",n.current,{once:!0})):u()}else t.removeEventListener("click",n.current);o.current=!1},a=window.setTimeout(()=>{t.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(a),t.removeEventListener("pointerdown",s),t.removeEventListener("click",n.current)}},[t,r]),{onPointerDownCapture:()=>o.current=!0}}function Ie(e,t=globalThis==null?void 0:globalThis.document){const r=_(e),o=l.useRef(!1);return l.useEffect(()=>{const n=s=>{s.target&&!o.current&&fe(je,r,{originalEvent:s},{discrete:!1})};return t.addEventListener("focusin",n),()=>t.removeEventListener("focusin",n)},[t,r]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function ne(){const e=new CustomEvent(Z);document.dispatchEvent(e)}function fe(e,t,r,{discrete:o}){const n=r.originalEvent.target,s=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:r});t&&n.addEventListener(e,t,{once:!0}),o?Ae(n,s):n.dispatchEvent(s)}var Et=ue,Pt=pe,Ge=globalThis!=null&&globalThis.document?l.useLayoutEffect:()=>{},We="Portal",De=l.forwardRef((e,t)=>{var i;const{container:r,...o}=e,[n,s]=l.useState(!1);Ge(()=>s(!0),[]);const a=r||n&&((i=globalThis==null?void 0:globalThis.document)==null?void 0:i.body);return a?we.createPortal(S.jsx(Y.div,{...o,ref:t}),a):null});De.displayName=We;function St({prop:e,defaultProp:t,onChange:r=()=>{}}){const[o,n]=Be({defaultProp:t,onChange:r}),s=e!==void 0,a=s?e:o,i=_(r),u=l.useCallback(c=>{if(s){const y=typeof c=="function"?c(e):c;y!==e&&i(y)}else n(c)},[s,e,n,i]);return[a,u]}function Be({defaultProp:e,onChange:t}){const r=l.useState(e),[o]=r,n=l.useRef(o),s=_(t);return l.useEffect(()=>{n.current!==o&&(s(o),n.current=o)},[o,n,s]),r}function be(e){var t,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(r=be(e[t]))&&(o&&(o+=" "),o+=r)}else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function _e(){for(var e,t,r=0,o="",n=arguments.length;r<n;r++)(e=arguments[r])&&(t=be(e))&&(o&&(o+=" "),o+=t);return o}const Q="-",$e=e=>{const t=Ue(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:a=>{const i=a.split(Q);return i[0]===""&&i.length!==1&&i.shift(),ge(i,t)||Fe(a)},getConflictingClassGroupIds:(a,i)=>{const u=r[a]||[];return i&&o[a]?[...u,...o[a]]:u}}},ge=(e,t)=>{var a;if(e.length===0)return t.classGroupId;const r=e[0],o=t.nextPart.get(r),n=o?ge(e.slice(1),o):void 0;if(n)return n;if(t.validators.length===0)return;const s=e.join(Q);return(a=t.validators.find(({validator:i})=>i(s)))==null?void 0:a.classGroupId},se=/^\[(.+)\]$/,Fe=e=>{if(se.test(e)){const t=se.exec(e)[1],r=t==null?void 0:t.substring(0,t.indexOf(":"));if(r)return"arbitrary.."+r}},Ue=e=>{const{theme:t,prefix:r}=e,o={nextPart:new Map,validators:[]};return Xe(Object.entries(e.classGroups),r).forEach(([s,a])=>{J(a,o,s,t)}),o},J=(e,t,r,o)=>{e.forEach(n=>{if(typeof n=="string"){const s=n===""?t:ie(t,n);s.classGroupId=r;return}if(typeof n=="function"){if(Ve(n)){J(n(o),t,r,o);return}t.validators.push({validator:n,classGroupId:r});return}Object.entries(n).forEach(([s,a])=>{J(a,ie(t,s),r,o)})})},ie=(e,t)=>{let r=e;return t.split(Q).forEach(o=>{r.nextPart.has(o)||r.nextPart.set(o,{nextPart:new Map,validators:[]}),r=r.nextPart.get(o)}),r},Ve=e=>e.isThemeGetter,Xe=(e,t)=>t?e.map(([r,o])=>{const n=o.map(s=>typeof s=="string"?t+s:typeof s=="object"?Object.fromEntries(Object.entries(s).map(([a,i])=>[t+a,i])):s);return[r,n]}):e,qe=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,r=new Map,o=new Map;const n=(s,a)=>{r.set(s,a),t++,t>e&&(t=0,o=r,r=new Map)};return{get(s){let a=r.get(s);if(a!==void 0)return a;if((a=o.get(s))!==void 0)return n(s,a),a},set(s,a){r.has(s)?r.set(s,a):n(s,a)}}},me="!",Ke=e=>{const{separator:t,experimentalParseClassName:r}=e,o=t.length===1,n=t[0],s=t.length,a=i=>{const u=[];let c=0,p=0,y;for(let g=0;g<i.length;g++){let v=i[g];if(c===0){if(v===n&&(o||i.slice(g,g+s)===t)){u.push(i.slice(p,g)),p=g+s;continue}if(v==="/"){y=g;continue}}v==="["?c++:v==="]"&&c--}const f=u.length===0?i:i.substring(p),C=f.startsWith(me),w=C?f.substring(1):f,b=y&&y>p?y-p:void 0;return{modifiers:u,hasImportantModifier:C,baseClassName:w,maybePostfixModifierPosition:b}};return r?i=>r({className:i,parseClassName:a}):a},Ze=e=>{if(e.length<=1)return e;const t=[];let r=[];return e.forEach(o=>{o[0]==="["?(t.push(...r.sort(),o),r=[]):r.push(o)}),t.push(...r.sort()),t},Je=e=>({cache:qe(e.cacheSize),parseClassName:Ke(e),...$e(e)}),Ye=/\s+/,Qe=(e,t)=>{const{parseClassName:r,getClassGroupId:o,getConflictingClassGroupIds:n}=t,s=[],a=e.trim().split(Ye);let i="";for(let u=a.length-1;u>=0;u-=1){const c=a[u],{modifiers:p,hasImportantModifier:y,baseClassName:f,maybePostfixModifierPosition:C}=r(c);let w=!!C,b=o(w?f.substring(0,C):f);if(!b){if(!w){i=c+(i.length>0?" "+i:i);continue}if(b=o(f),!b){i=c+(i.length>0?" "+i:i);continue}w=!1}const g=Ze(p).join(":"),v=y?g+me:g,E=v+b;if(s.includes(E))continue;s.push(E);const L=n(b,w);for(let P=0;P<L.length;++P){const j=L[P];s.push(v+j)}i=c+(i.length>0?" "+i:i)}return i};function He(){let e=0,t,r,o="";for(;e<arguments.length;)(t=arguments[e++])&&(r=he(t))&&(o&&(o+=" "),o+=r);return o}const he=e=>{if(typeof e=="string")return e;let t,r="";for(let o=0;o<e.length;o++)e[o]&&(t=he(e[o]))&&(r&&(r+=" "),r+=t);return r};function et(e,...t){let r,o,n,s=a;function a(u){const c=t.reduce((p,y)=>y(p),e());return r=Je(c),o=r.cache.get,n=r.cache.set,s=i,i(u)}function i(u){const c=o(u);if(c)return c;const p=Qe(u,r);return n(u,p),p}return function(){return s(He.apply(null,arguments))}}const m=e=>{const t=r=>r[e]||[];return t.isThemeGetter=!0,t},ye=/^\[(?:([a-z-]+):)?(.+)\]$/i,tt=/^\d+\/\d+$/,rt=new Set(["px","full","screen"]),ot=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,nt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,st=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,it=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,at=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,R=e=>T(e)||rt.has(e)||tt.test(e),z=e=>I(e,"length",gt),T=e=>!!e&&!Number.isNaN(Number(e)),q=e=>I(e,"number",T),D=e=>!!e&&Number.isInteger(Number(e)),lt=e=>e.endsWith("%")&&T(e.slice(0,-1)),d=e=>ye.test(e),A=e=>ot.test(e),ct=new Set(["length","size","percentage"]),dt=e=>I(e,ct,ve),ut=e=>I(e,"position",ve),pt=new Set(["image","url"]),ft=e=>I(e,pt,ht),bt=e=>I(e,"",mt),B=()=>!0,I=(e,t,r)=>{const o=ye.exec(e);return o?o[1]?typeof t=="string"?o[1]===t:t.has(o[1]):r(o[2]):!1},gt=e=>nt.test(e)&&!st.test(e),ve=()=>!1,mt=e=>it.test(e),ht=e=>at.test(e),yt=()=>{const e=m("colors"),t=m("spacing"),r=m("blur"),o=m("brightness"),n=m("borderColor"),s=m("borderRadius"),a=m("borderSpacing"),i=m("borderWidth"),u=m("contrast"),c=m("grayscale"),p=m("hueRotate"),y=m("invert"),f=m("gap"),C=m("gradientColorStops"),w=m("gradientColorStopPositions"),b=m("inset"),g=m("margin"),v=m("opacity"),E=m("padding"),L=m("saturate"),P=m("scale"),j=m("sepia"),G=m("skew"),x=m("space"),M=m("translate"),N=()=>["auto","contain","none"],O=()=>["auto","hidden","clip","visible","scroll"],U=()=>["auto",d,t],h=()=>[d,t],H=()=>["",R,z],$=()=>["auto",T,d],ee=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],F=()=>["solid","dashed","dotted","double","none"],te=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],V=()=>["start","end","center","between","around","evenly","stretch"],W=()=>["","0",d],re=()=>["auto","avoid","all","avoid-page","page","left","right","column"],k=()=>[T,d];return{cacheSize:500,separator:":",theme:{colors:[B],spacing:[R,z],blur:["none","",A,d],brightness:k(),borderColor:[e],borderRadius:["none","","full",A,d],borderSpacing:h(),borderWidth:H(),contrast:k(),grayscale:W(),hueRotate:k(),invert:W(),gap:h(),gradientColorStops:[e],gradientColorStopPositions:[lt,z],inset:U(),margin:U(),opacity:k(),padding:h(),saturate:k(),scale:k(),sepia:W(),skew:k(),space:h(),translate:h()},classGroups:{aspect:[{aspect:["auto","square","video",d]}],container:["container"],columns:[{columns:[A]}],"break-after":[{"break-after":re()}],"break-before":[{"break-before":re()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...ee(),d]}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:N()}],"overscroll-x":[{"overscroll-x":N()}],"overscroll-y":[{"overscroll-y":N()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",D,d]}],basis:[{basis:U()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",d]}],grow:[{grow:W()}],shrink:[{shrink:W()}],order:[{order:["first","last","none",D,d]}],"grid-cols":[{"grid-cols":[B]}],"col-start-end":[{col:["auto",{span:["full",D,d]},d]}],"col-start":[{"col-start":$()}],"col-end":[{"col-end":$()}],"grid-rows":[{"grid-rows":[B]}],"row-start-end":[{row:["auto",{span:[D,d]},d]}],"row-start":[{"row-start":$()}],"row-end":[{"row-end":$()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",d]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",d]}],gap:[{gap:[f]}],"gap-x":[{"gap-x":[f]}],"gap-y":[{"gap-y":[f]}],"justify-content":[{justify:["normal",...V()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...V(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...V(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[E]}],px:[{px:[E]}],py:[{py:[E]}],ps:[{ps:[E]}],pe:[{pe:[E]}],pt:[{pt:[E]}],pr:[{pr:[E]}],pb:[{pb:[E]}],pl:[{pl:[E]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[x]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[x]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",d,t]}],"min-w":[{"min-w":[d,t,"min","max","fit"]}],"max-w":[{"max-w":[d,t,"none","full","min","max","fit","prose",{screen:[A]},A]}],h:[{h:[d,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[d,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[d,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[d,t,"auto","min","max","fit"]}],"font-size":[{text:["base",A,z]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",q]}],"font-family":[{font:[B]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",d]}],"line-clamp":[{"line-clamp":["none",T,q]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",R,d]}],"list-image":[{"list-image":["none",d]}],"list-style-type":[{list:["none","disc","decimal",d]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[v]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[v]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...F(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",R,z]}],"underline-offset":[{"underline-offset":["auto",R,d]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:h()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",d]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",d]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[v]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...ee(),ut]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",dt]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},ft]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[w]}],"gradient-via-pos":[{via:[w]}],"gradient-to-pos":[{to:[w]}],"gradient-from":[{from:[C]}],"gradient-via":[{via:[C]}],"gradient-to":[{to:[C]}],rounded:[{rounded:[s]}],"rounded-s":[{"rounded-s":[s]}],"rounded-e":[{"rounded-e":[s]}],"rounded-t":[{"rounded-t":[s]}],"rounded-r":[{"rounded-r":[s]}],"rounded-b":[{"rounded-b":[s]}],"rounded-l":[{"rounded-l":[s]}],"rounded-ss":[{"rounded-ss":[s]}],"rounded-se":[{"rounded-se":[s]}],"rounded-ee":[{"rounded-ee":[s]}],"rounded-es":[{"rounded-es":[s]}],"rounded-tl":[{"rounded-tl":[s]}],"rounded-tr":[{"rounded-tr":[s]}],"rounded-br":[{"rounded-br":[s]}],"rounded-bl":[{"rounded-bl":[s]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[v]}],"border-style":[{border:[...F(),"hidden"]}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[v]}],"divide-style":[{divide:F()}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-s":[{"border-s":[n]}],"border-color-e":[{"border-e":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:["",...F()]}],"outline-offset":[{"outline-offset":[R,d]}],"outline-w":[{outline:[R,z]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:H()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[v]}],"ring-offset-w":[{"ring-offset":[R,z]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",A,bt]}],"shadow-color":[{shadow:[B]}],opacity:[{opacity:[v]}],"mix-blend":[{"mix-blend":[...te(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":te()}],filter:[{filter:["","none"]}],blur:[{blur:[r]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",A,d]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[p]}],invert:[{invert:[y]}],saturate:[{saturate:[L]}],sepia:[{sepia:[j]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[r]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[p]}],"backdrop-invert":[{"backdrop-invert":[y]}],"backdrop-opacity":[{"backdrop-opacity":[v]}],"backdrop-saturate":[{"backdrop-saturate":[L]}],"backdrop-sepia":[{"backdrop-sepia":[j]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[a]}],"border-spacing-x":[{"border-spacing-x":[a]}],"border-spacing-y":[{"border-spacing-y":[a]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",d]}],duration:[{duration:k()}],ease:[{ease:["linear","in","out","in-out",d]}],delay:[{delay:k()}],animate:[{animate:["none","spin","ping","pulse","bounce",d]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[P]}],"scale-x":[{"scale-x":[P]}],"scale-y":[{"scale-y":[P]}],rotate:[{rotate:[D,d]}],"translate-x":[{"translate-x":[M]}],"translate-y":[{"translate-y":[M]}],"skew-x":[{"skew-x":[G]}],"skew-y":[{"skew-y":[G]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",d]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",d]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":h()}],"scroll-mx":[{"scroll-mx":h()}],"scroll-my":[{"scroll-my":h()}],"scroll-ms":[{"scroll-ms":h()}],"scroll-me":[{"scroll-me":h()}],"scroll-mt":[{"scroll-mt":h()}],"scroll-mr":[{"scroll-mr":h()}],"scroll-mb":[{"scroll-mb":h()}],"scroll-ml":[{"scroll-ml":h()}],"scroll-p":[{"scroll-p":h()}],"scroll-px":[{"scroll-px":h()}],"scroll-py":[{"scroll-py":h()}],"scroll-ps":[{"scroll-ps":h()}],"scroll-pe":[{"scroll-pe":h()}],"scroll-pt":[{"scroll-pt":h()}],"scroll-pr":[{"scroll-pr":h()}],"scroll-pb":[{"scroll-pb":h()}],"scroll-pl":[{"scroll-pl":h()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",d]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[R,z,q]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},vt=et(yt);function kt(...e){return vt(_e(e))}export{Pt as B,ue as D,Y as P,Et as R,ce as S,Ct as a,X as b,kt as c,le as d,Ge as e,_ as f,De as g,ae as h,Ae as i,Ee as j,wt as k,St as u};