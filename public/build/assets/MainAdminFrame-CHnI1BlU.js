import{j as e,q as g,r as v,c as j}from"./app-BlurpBxl.js";import"./pagination-BwaBci5i.js";function f({size:r}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:r||"24",height:r||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-book-2",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"}),e.jsx("path",{d:"M19 16h-12a2 2 0 0 0 -2 2"}),e.jsx("path",{d:"M9 8h6"})]})}function E({children:r,navItems:l,title:n,searchbar:o,onSelect:m,filter:d,dialog:a,onInviteAdmin:t,...u}){var i;g();const[b,c]=v.useState((i=l[0])==null?void 0:i.label),h=s=>{c(s)};return e.jsxs("div",{className:"pt-2",children:[e.jsxs("div",{className:"poppins text-xl p-2 font-light grid lg:grid-cols-10 md:grid-cols-2 ",children:[e.jsxs("div",{className:" pb-3 flex col-span-5",children:[n," ",a]}),t?e.jsx("div",{className:"col-span-5",children:o}):e.jsxs(e.Fragment,{children:[o,d]})]}),e.jsxs("div",{className:"bg-[#EEEEEE] mt-2 border border-gray-400 rounded-xl grid grid-cols-1 divide-y divide-gray-400",children:[e.jsx("div",{className:"grid grid-cols-8 gap-4",children:e.jsx("div",{className:"col-start-1 col-end-9 grid grid-cols-4 lg:grid-cols-5",children:l.map((s,x)=>{const p=route(s.link,s.params);return e.jsxs(j,{className:`py-3 rounded-t-xl hover:bg-gray-800 duration-200 hover:text-white text-md flex justify-center cursor-pointer ${route().current()===s.link||s.altlink?"border-b-2 border-[#FF9900] text-[#FF9900]":""}`,onClick:()=>h(s.label),href:p,children:[e.jsx("div",{className:"",children:s.icon}),e.jsx("div",{className:"hidden sm:block pl-2 poppins",children:s.label})]},x)})})}),r]})]})}export{f as I,E as M};