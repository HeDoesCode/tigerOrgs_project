import{j as a,r as o,q as f,c as v}from"./app-Bay8ldN_.js";import{c as r}from"./utils-cq2dKqsA.js";import{b}from"./button-BTQZ6DtG.js";import{c as p}from"./createLucideIcon-SbYL3zAH.js";import{C as y}from"./IconMenu3-B_Wq7_B-.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=p("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=p("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);function q({size:e}){return a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:e||"24",height:e||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-book-2",children:[a.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.jsx("path",{d:"M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"}),a.jsx("path",{d:"M19 16h-12a2 2 0 0 0 -2 2"}),a.jsx("path",{d:"M9 8h6"})]})}const w=({className:e,...s})=>a.jsx("nav",{role:"navigation","aria-label":"pagination",className:r("mx-auto flex w-full justify-center",e),...s});w.displayName="Pagination";const E=o.forwardRef(({className:e,...s},n)=>a.jsx("ul",{ref:n,className:r("flex flex-row items-center gap-1",e),...s}));E.displayName="PaginationContent";const C=o.forwardRef(({className:e,...s},n)=>a.jsx("li",{ref:n,className:r("",e),...s}));C.displayName="PaginationItem";const t=({className:e,isActive:s,size:n="icon",children:l,...c})=>a.jsx("button",{"aria-current":s?"page":void 0,className:r(`${b({size:n})} text-black select-none ${s?"bg-[#FFBC58] hover:bg-[#FFBC58]":"bg-transparent hover:bg-gray-800/20"}`,e),...c,children:l});t.displayName="PaginationLink";const F=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to previous page",size:"default",className:r("gap-1 pl-2.5",e),...s,children:[a.jsx(k,{className:"h-4 w-4"}),a.jsx("span",{children:"Previous"})]});F.displayName="PaginationPrevious";const L=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to next page",size:"default",className:r("gap-1 pr-2.5",e),...s,children:[a.jsx("span",{children:"Next"}),a.jsx(y,{className:"h-4 w-4"})]});L.displayName="PaginationNext";const M=({className:e,...s})=>a.jsxs("span",{"aria-hidden":!0,className:r("flex h-9 w-9 items-center justify-center",e),...s,children:[a.jsx(P,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"More pages"})]});M.displayName="PaginationEllipsis";function H({children:e,navItems:s,title:n,searchbar:l,onSelect:c,filter:x,dialog:g,onInviteAdmin:h,...z}){var d;f();const[B,m]=o.useState((d=s[0])==null?void 0:d.label),j=i=>{m(i)};return a.jsxs("div",{className:"pt-2",children:[a.jsxs("div",{className:"poppins text-xl p-2 font-light grid lg:grid-cols-10 md:grid-cols-2 ",children:[a.jsxs("div",{className:" pb-3 flex col-span-5",children:[n," ",g]}),h?a.jsx("div",{className:"col-span-5",children:l}):a.jsxs(a.Fragment,{children:[l,x]})]}),a.jsxs("div",{className:"bg-[#EEEEEE] mt-2 border border-gray-400 rounded-xl grid grid-cols-1 divide-y divide-gray-400",children:[a.jsx("div",{className:"grid grid-cols-8 gap-4",children:a.jsx("div",{className:"col-start-1 col-end-9 grid grid-cols-4 lg:grid-cols-5",children:s.map((i,u)=>{const N=route(i.link,i.params);return a.jsxs(v,{className:`py-3 rounded-t-xl hover:bg-gray-800 duration-200 hover:text-white text-md flex justify-center cursor-pointer ${route().current()===i.link||i.altlink?"border-b-2 border-[#FF9900] text-[#FF9900]":""}`,onClick:()=>j(i.label),href:N,children:[a.jsx("div",{className:"",children:i.icon}),a.jsx("div",{className:"hidden sm:block pl-2 poppins",children:i.label})]},u)})})}),e]})]})}export{q as I,H as M,w as P,E as a,C as b,F as c,M as d,t as e,L as f};
