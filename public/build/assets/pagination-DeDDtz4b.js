import{r as o,j as e}from"./app-O-uBuzwU.js";import{c as i}from"./utils-CLHbCXUj.js";import{b as p}from"./button-DVH9MYrQ.js";import{c as r}from"./createLucideIcon-DERJfJp6.js";import{C as m}from"./IconMenu3-WbUb1pqv.js";/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=r("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.424.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=r("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]),d=({className:s,...a})=>e.jsx("nav",{role:"navigation","aria-label":"pagination",className:i("mx-auto flex w-full justify-center",s),...a});d.displayName="Pagination";const f=o.forwardRef(({className:s,...a},n)=>e.jsx("ul",{ref:n,className:i("flex flex-row items-center gap-1",s),...a}));f.displayName="PaginationContent";const N=o.forwardRef(({className:s,...a},n)=>e.jsx("li",{ref:n,className:i("",s),...a}));N.displayName="PaginationItem";const t=({className:s,isActive:a,size:n="icon",children:l,...c})=>e.jsx("button",{"aria-current":a?"page":void 0,className:i(`${p({size:n})} text-black select-none ${a?"bg-[#FFBC58] hover:bg-[#FFBC58]":"bg-transparent hover:bg-gray-800/20"}`,s),...c,children:l});t.displayName="PaginationLink";const h=({className:s,...a})=>e.jsxs(t,{"aria-label":"Go to previous page",size:"default",className:i("gap-1 pl-2.5",s),...a,children:[e.jsx(g,{className:"h-4 w-4"}),e.jsx("span",{children:"Previous"})]});h.displayName="PaginationPrevious";const j=({className:s,...a})=>e.jsxs(t,{"aria-label":"Go to next page",size:"default",className:i("gap-1 pr-2.5",s),...a,children:[e.jsx("span",{children:"Next"}),e.jsx(m,{className:"h-4 w-4"})]});j.displayName="PaginationNext";const u=({className:s,...a})=>e.jsxs("span",{"aria-hidden":!0,className:i("flex h-9 w-9 items-center justify-center",s),...a,children:[e.jsx(x,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"More pages"})]});u.displayName="PaginationEllipsis";export{d as P,f as a,N as b,h as c,u as d,t as e,j as f};
