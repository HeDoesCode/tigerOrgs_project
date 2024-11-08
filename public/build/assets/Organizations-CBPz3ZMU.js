import{j as e,r as h,y as E,c as W,Y as _}from"./app-zFpeRohZ.js";import{I as $}from"./IconSearch-DFLFlevT.js";import{U as T}from"./UserLayout-t26lGWkK.js";import{S as B,a as F,b as R,c as M,d as L}from"./select-DHn4aMBG.js";import{A as H,a as U,b as V,c as J}from"./accordion-BH1z0DtS.js";import{D as Q,a as Y,b as G,c as X,d as Z,e as q}from"./index-DknsvJ1F.js";import"./button-D0DYQ6w9.js";import"./IconMenu3-DXxq794d.js";import"./utils-lICde5WU.js";import"./IconProfile-CrkiI7mL.js";import"./dropdown-menu-SjfxDCqE.js";import"./index-25mYpDUC.js";import"./index-DXk2epaN.js";import"./index-CzTa1SX8.js";function k({name:u,children:g,className:r}){return e.jsxs("div",{className:`flex flex-col space-y-1 w-full ${r}`,children:[e.jsx("span",{className:"text-sm",children:u}),g]})}function P({keywords:u,className:g,queryParameters:r}){x(u);function x(l){return l.sort((o,m)=>o.keyword.localeCompare(m.keyword))}const[i,n]=h.useState([]),[a,d]=h.useState([]);h.useEffect(()=>{f()},[]),h.useEffect(()=>{i.length!==0?r.keyword_filter=i:delete r.keyword_filter,E.get(route("organizations"),r,{preserveState:!0,preserveScroll:!0})},[a]);const[w,b]=h.useState(""),j=l=>{if(b(l.target.value),l.target.value===""||l.target.value===null){d(x(a));return}const o=a.filter(p=>p.keyword.toLowerCase().includes(l.target.value.toLowerCase())).sort((p,S)=>{const N=l.target.value.toLowerCase(),z=p.keyword.toLowerCase(),C=S.keyword.toLowerCase(),O=z.startsWith(N)?0:1,D=C.startsWith(N)?0:1;return O!==D?O-D:z.indexOf(N)-C.indexOf(N)||z.localeCompare(C)}),m=a.filter(p=>!p.keyword.toLowerCase().includes(l.target.value.toLowerCase())).sort((p,S)=>p.keyword.localeCompare(S.keyword));d([...o,...m])};h.useEffect(()=>{i.length!==0?v():delete r.keyword_filter},[i]);function v(){r.keyword_filter=null,r.keyword_filter=i,E.get(route("organizations"),r,{preserveState:!0,preserveScroll:!0})}const t=l=>{n(o=>[l,...o]),v(),d(o=>o.filter(m=>m.keyID!==l.keyID))},s=l=>{const o=[l,...a];d(x(o)),n(m=>m.filter(p=>p.keyID!==l.keyID)),v()},f=()=>{n([]),d(x(u)),b(""),delete r.keyword_filter,E.get(route("organizations"),r,{preserveState:!0,preserveScroll:!0})};return e.jsxs("div",{className:`w-full flex flex-wrap gap-2 max-h-20 min-h-12 border-[1px] rounded-md border-gray-500 p-2 relative text-xs overflow-clip group ${g} shadow-md`,children:[e.jsxs(Q,{children:[e.jsx(Y,{className:"absolute size-full inset-0",children:e.jsxs("div",{className:"size-full flex items-center justify-center invisible group-hover:visible group-hover:!bg-gray-800/70 text-black/0 group-hover:!text-white transition-all duration-200 ease-in-out",children:[i&&"Edit"||"Add"," Keyword Filters"]})}),e.jsxs(G,{className:"sm:max-w-[32rem] !h-fit max-h-[90%] w-[90%] sm:h-auto overflow-y-auto",children:[e.jsxs(X,{children:[e.jsx(Z,{children:"Add/Remove Keyword Filters"}),e.jsx(q,{children:"Filter organizations by adding or removing keywords. Save changes when you're done."})]}),e.jsxs("div",{className:"flex gap-x-3",children:[e.jsx("input",{className:"w-full rounded-md",type:"text",autoComplete:"off",placeholder:"Find Keywords...",name:"keyword_filter",onChange:j,value:w}),e.jsx("button",{onClick:f,className:"h-full px-3 border border-black rounded-md hover:bg-gray-800 hover:text-white transition-all",children:"Reset"})]}),e.jsxs("div",{className:"w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-800 p-2 relative text-xs overflow-clip",children:[i.length!==0&&i.map((l,o)=>e.jsx(y,{name:l.keyword,remove:!0,onClick:()=>s(l)},o)),i.length===0&&e.jsx("div",{className:"pl-1 h-8 flex items-center",children:"(No Keywords Selected)"})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-arrow-up",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M18 11l-6 -6"}),e.jsx("path",{d:"M6 11l6 -6"})]})}),e.jsxs("div",{className:"w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-300 p-2 relative text-xs",children:[a.map((l,o)=>e.jsx(y,{name:l.keyword,add:!0,onClick:()=>t(l)},o)),a.length===0&&e.jsx("span",{className:"italic text-slate-400",children:"No organization has set any keywords currently."})]})]})]}),i.length!==0?i.map((l,o)=>e.jsx(c,{name:l.keyword},o)):e.jsx("div",{className:"text-gray-500 h-full flex items-center",children:"Filter by Keywords"})]});function c({name:l}){return e.jsx("div",{className:"w-min px-2 py-1 bg-[#ffb700] border border-gray-300 h-fit rounded-md cursor-pointer",children:l})}function y({name:l,remove:o,add:m,...p}){return e.jsxs("button",{...p,className:`select-none w-min px-2 py-1 ${m&&"bg-gray-200"} ${o&&"bg-[#ffb700]"} border border-gray-300 h-8 rounded-md space-x-2 flex items-center ${m&&"hover:bg-gray-300"} ${o&&"hover:bg-[#e6a70b]"} group`,children:[e.jsx("span",{className:"whitespace-nowrap",children:l}),e.jsxs("div",{className:"h-5 aspect-square text-gray-400",children:[o&&e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-circle-x text-black/70",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"})]}),m&&e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-circle-plus",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z"})]})]})]})}}function K({icon:u,title:g,isAdmin:r,isSuperAdmin:x,link:i,visibility:n}){return e.jsx(W,{href:i,className:"bg-transparent text-black transition-all duration-100 ease-in-out hover:bg-gray-800 hover:text-white p-2 rounded-xl",children:e.jsxs("li",{className:"flex items-center space-x-3 poppins",children:[e.jsx("img",{src:u,className:"size-10 object-cover rounded-full"}),e.jsx("label",{className:"cursor-pointer flex-1 text-sm font-bold line-clamp-2 leading-4",children:g}),e.jsxs("div",{className:"flex flex-col gap-y-1 items-center",children:[(r||x)&&e.jsx(a,{className:"bg-red-600",children:r&&"Admin"||x&&"S.Admin"}),!n&&e.jsx(a,{className:"bg-slate-600",children:"Hidden"})]})]})});function a({children:d,className:w}){return e.jsx("label",{className:`cursor-pointer text-white text-[0.6rem] w-fit px-[0.35rem] rounded-full ${w}`,children:d})}}function A({children:u,title:g,className:r,index:x,collegeLength:i}){const[n,a]=h.useState(!1),[d,w]=h.useState(!1),[b,j]=h.useState(!1),[v,t]=h.useState(!1),s=h.useRef(null),f=()=>{if(s.current){const l=s.current.scrollWidth>s.current.clientWidth;w(l);const o=s.current.scrollLeft,m=s.current.offsetWidth,p=s.current.scrollWidth,S=Math.abs(o+m-p)<1;j(S);const N=o>0;t(!N)}};h.useEffect(()=>{const l=s.current;return f(),window.addEventListener("resize",f),l.addEventListener("scroll",f),()=>{window.removeEventListener("resize",f),l.removeEventListener("scroll",f)}},[]);const c=()=>{a(!n)};function y(l){return l===0?"pb-10":l===i?"pb-0":"pt-10 pb-10"}return e.jsxs("div",{className:`flex flex-col gap-y-3 w-full relative ${r} ${n&&y(x)}`,children:[e.jsxs("div",{className:"flex flex-row justify-between -mb-3",children:[e.jsx("div",{className:"questrial font-bold tracking-wider",children:g}),e.jsx("div",{className:"w-20 min-w-20 relative overflow-visible",children:(d||n)&&e.jsx("button",{onClick:c,className:`absolute right-0 min-w-max underline text-sm py-1 px-2 hover:bg-gray-800 hover:text-white rounded-lg ${n?"text-blue-500 font-bold":"text-gray-500"} z-30`,children:n?"hide all":"show all"})})]}),e.jsx("div",{ref:s,className:n?"w-full select-none max-h-full overflow-y-hidden overflow-x-hidden grid grid-cols-[repeat(auto-fill,_minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-4 justify-items-center rounded-lg border border-gray-300":"flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden",children:u}),!n&&d&&e.jsx("div",{className:`absolute right-0 top-6 bottom-0 w-20 bg-gradient-to-r from-transparent to-[#EEEEEE]/70 pointer-events-none transition-all ease-in ${b&&"!w-0"}`}),!n&&d&&e.jsx("div",{className:`absolute left-0 top-6 bottom-0 w-20 bg-gradient-to-l from-transparent to-[#EEEEEE]/70 pointer-events-none transition-all ease-in ${v&&"!w-0"}`}),d&&n&&e.jsx("div",{className:"w-full flex justify-end",children:e.jsx("button",{onClick:c,className:"underline text-sm py-1 px-2 hover:bg-gray-800 hover:text-white rounded-lg text-blue-500 font-bold",children:"hide all"})})]})}function I({orgBg:u,orgIcon:g,title:r,desc:x,count:i,recruiting:n,href:a,className:d}){const w=h.useRef(null);return e.jsxs(W,{href:a,className:`w-min space-y-2 hover:cursor-pointer group p-3 hover:scale-[1.06] flex flex-col justify-center items-center transition-all duration-300 ease-in-out transOptimize h-max select-none ${d}`,children:[e.jsxs("div",{className:"h-52 md:h-72 aspect-[5/8] relative",children:[e.jsx("img",{src:u,className:"object-cover h-full rounded-lg shadow-sm aspect-[5/8]",ref:w}),n&&e.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 top-3 text-[0.6rem] px-2 py-[0.15rem] rounded-[0.25rem] bg-[#EF9B1E]/90 inter font-extrabold text-white shadow-sm shadow-black/50",children:"Now Recruiting"}),e.jsx("img",{src:g,className:"absolute right-2 bottom-2 bg-[#EEEEEE] size-14 rounded-full object-cover",ref:w}),e.jsxs("div",{className:"transition-all hidden md:flex flex-col justify-center duration-200 ease-in-out absolute inset-0 bg-black/0 overflow-y-auto group-hover:bg-black/70 invisible group-hover:visible group-hover:delay-100 rounded-lg text-white/0 group-hover:text-white/100 p-3 tracking-wide transOptimize",children:[e.jsx("p",{className:"poppins tracking-normal md:tracking-wide text-sm md:text-lg",children:r}),e.jsx("p",{className:"quicksand font-extralight text-sm overflow-hidden overflow-ellipsis",children:x})]})]}),e.jsxs("div",{className:"space-y-1 w-full",children:[e.jsx("div",{className:"w-full line-clamp-2 poppins text-sm font-bold tracking-wide",children:r}),e.jsx("div",{className:"w-full text-xs line-clamp-2",children:x}),e.jsxs("div",{className:"w-full text-xs line-clamp-1 text-gray-600 truncate",children:[i," Members"]})]})]})}function fe({organizations:u,recommendedOrganizations:g,queryParameters:r=null,departments:x,keywords:i,myMemberOrganizations:n}){r=r||{};const[a,d]=h.useState({});h.useEffect(()=>{const t=u.reduce((s,f)=>{const c=f.department;return s[c]||(s[c]=[]),s[c].push(f),s},{});if(t["University-Wide"]){const s=t["University-Wide"];delete t["University-Wide"],d({"University-Wide":s,...t})}else d(t)},[u]);const w=t=>{const s=setTimeout(()=>{t.target.value!==""?r.search=t.target.value:delete r.search,E.get(route("organizations"),r,{preserveState:!0,preserveScroll:!0})},500);return()=>clearTimeout(s)},b=t=>{const s=setTimeout(()=>{t!=="All"?r.category=t:delete r.category,E.get(route("organizations"),r,{preserveState:!0,preserveScroll:!0})},500);return()=>clearTimeout(s)},j=(t,s)=>{switch(t){case"student":return route("organizations.home",s);case"admin":return route("admin.editpage",s)}},v=()=>{E.get(route("organizations"))};return e.jsxs("div",{className:"w-full",children:[e.jsx(_,{title:"Browse Organizations"}),e.jsxs(T,{children:[e.jsxs("div",{className:"w-full poppins text-lg md:text-xl font-bold mt-3 mb-5",children:["Browse ",e.jsx("span",{className:"text-[#ffb700]",children:"Organizations"})]}),e.jsxs("div",{className:"flex flex-col md:flex-row gap-6",children:[e.jsxs("div",{className:"flex flex-col w-full md:w-64 space-y-2",children:[e.jsxs(k,{className:"relative",name:"Search",children:[e.jsx("input",{type:"text",className:"peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-11 pl-10 focus:pl-3 transition-all duration-200 shadow-md",defaultValue:r.search||"",onChange:w,placeholder:"Dept./Organization"}),e.jsx("div",{className:"absolute text-gray-500 left-0 bottom-0 h-11 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0",children:e.jsx($,{size:"22"})})]}),e.jsx(k,{name:"Keywords",children:e.jsx(P,{keywords:i,queryParameters:r})}),e.jsx(k,{name:"Department",children:e.jsxs(B,{defaultValue:"All",onValueChange:b,children:[e.jsx(F,{className:"w-full h-12 border-gray-500 bg-transparent shadow-md",children:e.jsx(R,{placeholder:"All"})}),e.jsxs(M,{className:"border-gray-500 bg-[#EEEEEE] quicksand",ref:t=>{t&&(t.ontouchstart=s=>s.preventDefault())},children:[e.jsx(L,{value:"All",className:"hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10",children:"All"}),x.map((t,s)=>e.jsx(L,{value:t,className:"hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10",children:t},s))]})]})}),e.jsx(k,{className:` items-center !mt-3 ${Object.keys(r).length!==0?"flex":"hidden"}`,children:e.jsx("button",{className:"w-fit px-3 py-1 bg-[#ffb700] hover:bg-[#f1ad00] rounded-lg text-sm",onClick:v,children:"Clear All"})}),n.length!==0&&e.jsx(k,{name:"Organizations you've joined:",className:"!hidden md:!flex",children:e.jsx("ul",{className:"bg-transparent flex flex-col pt-2 rounded-md space-y-1",children:Object.values(n).map((t,s)=>e.jsx(K,{visibility:t.visibility,icon:t.logo,title:t.name,isAdmin:t.role_description==="admin",link:j(t.role_description,t.orgID)},s))})}),e.jsx(H,{type:"single",collapsible:!0,children:e.jsxs(U,{value:"item-1",children:[e.jsx(V,{className:"text-left flex md:hidden",children:e.jsx(k,{name:"Organizations you've joined:"})}),e.jsx(J,{children:e.jsx("ul",{className:"bg-transparent flex flex-col pt-2 rounded-md space-y-1",children:Object.values(n).map((t,s)=>e.jsx(K,{visibility:t.visibility,icon:t.logo,title:t.name,isAdmin:t.role_description==="admin",link:j(t.role_description,t.orgID)},s))})})]})})]}),e.jsxs("div",{className:"md:flex-1 space-y-3 overflow-x-hidden",children:[r&&u.length===0&&e.jsx("div",{className:"w-full flex justify-center font-bold text-gray-400",children:"No Organizations Found"}),g.length!==0&&e.jsx(A,{title:"Recommended based on your interests",collegeLength:Object.keys(a).length,children:g.map((t,s)=>e.jsx(I,{orgBg:t.photos&&t.photos.length>0?t.photos[0].filename:"https://placehold.co/500x800",orgIcon:t.logo,title:t.name,recruiting:t.recruiting,desc:t.description,count:t.members_count,href:route("organizations.home",{orgID:t.orgID})},s))}),Object.entries(a).map(([t,s],f)=>e.jsx(A,{title:t,index:f,collegeLength:Object.keys(a).length,children:s.map((c,y)=>e.jsx(I,{orgBg:c.photos&&c.photos.length>0?c.photos[0].filename:"https://placehold.co/500x800",orgIcon:c.logo,title:c.name,recruiting:c.recruiting,desc:c.description,count:c.members_count,href:route("organizations.home",{orgID:c.orgID})},y))},t))]})]})]})]})}export{fe as default};
