import{j as e,Y as g}from"./app-Kp9HHh1H.js";import{I as k}from"./IconMailFilled-D-l8ok7g.js";import{u as C,I as y}from"./IconMenu3-Dhy6hzSL.js";import{D as M,a as I,b as L,c as _,d as z,e as T}from"./dialog-Ckx2LDf9.js";import{O as U}from"./OrganizationLayout-Dh8nhMrD.js";function H({size:s}){return e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:s||"24",height:s||"24",fill:"currentColor",viewBox:"0 0 50 50",children:e.jsx("path",{d:"M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"})})}function O({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-brand-x",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M4 4l11.733 16h4.267l-11.733 -16z"}),e.jsx("path",{d:"M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"})]})}function S({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"}),e.jsx("path",{d:"M8 11l0 5"}),e.jsx("path",{d:"M8 8l0 .01"}),e.jsx("path",{d:"M12 16l0 -5"}),e.jsx("path",{d:"M16 16v-3a2 2 0 0 0 -4 0"})]})}function $(){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-point",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"})]})}function F({className:s,link:n=""}){const t=encodeURIComponent(n);return e.jsx("div",{className:"flex",children:n?e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsxs("a",{className:"text-left hover:outline hover:outline-1 rounded-md my-2 hover:outline-gray-500 hover:px-2 transition-all max-w-full p-2 w-full",href:n,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{className:"leading-3 text-xs italic text-black/30",children:"Click link to visit:"}),e.jsx("br",{}),e.jsx("span",{className:"underline line-clamp-1",children:n})]}),e.jsx("div",{className:`h-full ${s} w-full facebook-feed flex justify-center scale-100 max-[468px]:scale-75 lg:scale-100`,children:e.jsx("iframe",{src:`https://www.facebook.com/plugins/page.php?href=${t}&tabs=timeline&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`,height:"500",className:"border-none overflow-hidden",allowFullScreen:!0,allow:"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"})})]}):e.jsx("span",{className:"font-bold text-sm italic text-black/30",children:"No link provided"})})}function B({editing:s=!1,recruiting:n=!0,pageData:t,pageLayoutData:h,withFollow:u,preview:p}){const{toast:x}=C(),j=a=>{navigator.clipboard.writeText(a).then(()=>{x({title:"Text copied to cliboard",description:a,duration:2e3,variant:"success"})}).catch(l=>{x({title:"Text copy failed",description:a,duration:2e3,variant:"desctructive"})})};return e.jsxs(U,{pageLayoutData:h,recruiting:n,editing:s,withFollow:u,preview:p,children:[e.jsx(f,{}),e.jsx(g,{title:t.metadata.organizationName}),e.jsxs("div",{className:"w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8",children:[e.jsxs("div",{className:"flex flex-col space-y-3 md:space-y-8 wfull md:w-1/2",children:[e.jsx(v,{}),e.jsx(w,{})]}),e.jsx("div",{className:"w-full md:w-1/2 overflow-hidden",children:e.jsx(b,{})})]}),e.jsx(N,{}),s&&e.jsx("div",{className:"flex justify-end px-5 md:px-12 mt-6 ",children:s.saveButton})]});function o({children:a,className:l,name:i,id:r,childrenCN:c,nameCN:d}){return e.jsxs("div",{className:`w-full bg-white p-4 md:p-7 rounded-lg flex flex-col ${l} space-y-1 relative`,id:r,children:[e.jsx("div",{className:`poppins text-lg font-extrabold ${d}`,children:i}),e.jsx("div",{className:`w-full block whitespace-pre-line ${c}`,children:a})]})}function f(){return e.jsxs(o,{name:"About Us",id:"aboutUs",children:[t.aboutUs,s&&s.aboutUs]})}function v(){const a={email:e.jsx(k,{}),instagram:e.jsx(H,{}),facebook:e.jsx(y,{}),x:e.jsx(O,{}),linkedin:e.jsx(S,{}),default:e.jsx($,{})};return e.jsxs(o,{name:"Contacts and Information",id:"contacts",children:[e.jsx("ul",{className:"w-full space-y-2 pl-2 relative",children:t.contacts.map((l,i)=>e.jsxs("li",{className:"flex flex-col  sm:flex-row sm:items-center quicksand gap-x-2",children:[e.jsxs("div",{className:"flex gap-x-2",children:[e.jsx("div",{children:a[l.platform]}),e.jsxs("div",{className:"font-semibold",children:[l.name,":"]})]}),e.jsx("button",{className:"truncate flex-1 text-left hover:outline hover:outline-1 rounded-md hover:outline-gray-500 hover:px-2 transition-all",onClick:()=>j(l.address),children:l.address})]},i))}),s&&s.contacts]})}function w(){const a=t.officers;return e.jsxs(o,{name:"Officers",className:"h-full",id:"officers",children:[e.jsx("ul",{className:"w-full space-y-2 pl-2",children:a.map((l,i)=>{var r,c,d,m;return e.jsxs("li",{className:"flex items-center",children:[e.jsx("span",{className:"mr-3",children:"•"}),e.jsxs("div",{children:[e.jsxs("div",{className:"nunito font-extrabold text-md leading-6",children:[(r=l==null?void 0:l.user)==null?void 0:r.firstname,(c=l==null?void 0:l.user)!=null&&c.middlename?` ${(d=l==null?void 0:l.user)==null?void 0:d.middlename[0]}.`:""," ",(m=l==null?void 0:l.user)==null?void 0:m.lastname]}),e.jsx("div",{className:"-mt-1 quicksand text-sm",children:l.position})]})]},i)})}),e.jsxs("div",{className:"absolute top-3 right-3 text-xs text-slate-400/70 italic text-right leading-3",children:["Last Update:",e.jsx("br",{}),t.latestOfficerUpdate]}),s&&s.officers]})}function b(){return e.jsxs(o,{name:"Social Activities",id:"facebookLink",children:[e.jsx(F,{link:t.fb_link}),s&&s.social]})}function N(){return e.jsxs(o,{name:"Showcase Photos",id:"photos",className:"overflow-x-hidden",children:[e.jsx("div",{className:"h-52 md:h-80 w-full flex flex-row overflow-x-auto gap-x-6 pb-1 relative",children:t.photos.map((a,l)=>e.jsxs(M,{children:[e.jsx(I,{className:"contents",children:e.jsxs("div",{className:"h-full flex-shrink-0 relative rounded-xl overflow-clip min-w-32",children:[e.jsx("img",{src:a.filename,className:"h-full object-cover",alt:a.caption}),e.jsx("div",{className:"absolute text-sm md:text-base bottom-0 top-28 leading-5 md:top-52 left-0 right-0 bg-gradient-to-b from-transparent to-black text-white px-6 md:px-9 flex items-center quicksand font-bold md:tracking-wide",children:e.jsx("span",{className:"line-clamp-3",children:a.caption})})]})}),e.jsxs(L,{className:"max-w-5xl w-full md:w-fit max-h-[90%]",children:[e.jsxs(_,{children:[e.jsx(z,{children:a.caption}),e.jsx(T,{})]}),e.jsx("div",{className:"overflow-y-auto flex justify-center",children:e.jsx("img",{src:a.filename,className:"object-contain max-w-full h-full max-h-full",alt:a.caption})})]})]},l))}),s&&s.photos]})}}const D=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));export{B as H,H as I,O as a,S as b,$ as c,D as d};
