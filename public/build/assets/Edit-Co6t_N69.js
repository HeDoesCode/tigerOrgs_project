import{r as u,j as e,y,Y as L}from"./app-DMBvuxJw.js";import{I as E}from"./IconMailFilled-0tJETbqQ.js";import{U as $}from"./UserLayout-CHCiuE7Q.js";import{D as B,a as O,b as T,c as W,d as A,e as H,g as Y}from"./index-C1stwmYL.js";import{B as R}from"./button-Cz8TxfBZ.js";import M from"./InputContainer-D0OPi3Cd.js";import"./IconMenu3-VBrNniLE.js";import"./utils-DPngbp4j.js";import"./IconProfile-CRLnhI8h.js";import"./dropdown-menu-Bd6Y5sTB.js";import"./index-CNtzkZ4t.js";import"./index-DkWYE_Rv.js";function q({keywords:r,className:a,activeUserKeywords:f}){r=h(r);function h(t){return t.sort((s,o)=>s.keyword.localeCompare(o.keyword))}const[c,p]=u.useState([]),[d,g]=u.useState([]),[m,b]=u.useState(!1);u.useEffect(()=>{j()},[]),u.useEffect(()=>{b(c!==f)},[c]);const j=()=>{p(f);const t=r.filter(s=>!f.some(o=>o.keyword===s.keyword));g(t)},[N,k]=u.useState(""),C=t=>{if(k(t.target.value),t.target.value===""||t.target.value===null){g(h(d));return}const s=d.filter(n=>n.keyword.toLowerCase().includes(t.target.value.toLowerCase())).sort((n,D)=>{const v=t.target.value.toLowerCase(),F=n.keyword.toLowerCase(),I=D.keyword.toLowerCase(),K=F.startsWith(v)?0:1,z=I.startsWith(v)?0:1;return K!==z?K-z:F.indexOf(v)-I.indexOf(v)||F.localeCompare(I)}),o=d.filter(n=>!n.keyword.toLowerCase().includes(t.target.value.toLowerCase())).sort((n,D)=>n.keyword.localeCompare(D.keyword));g([...s,...o])},S=t=>{const s=h([...c,t]);p(s),g(o=>o.filter(n=>n.keyID!==t.keyID))},l=t=>{const s=[t,...d];g(h(s)),p(o=>o.filter(n=>n.keyID!==t.keyID))},x=()=>{y.patch(route("update.user.keywords"),{activeKeywords:c})};return e.jsxs("div",{className:`w-full flex flex-wrap gap-2 min-h-10 border-[1px] rounded-md p-2 relative text-xs overflow-clip group ${a}`,children:[e.jsxs(B,{children:[e.jsx(O,{className:"absolute size-full inset-0",children:e.jsxs("div",{className:"size-full flex items-center justify-center invisible group-hover:visible group-hover:!bg-gray-800/70 text-black/0 group-hover:!text-white transition-all duration-200 ease-in-out",children:[c&&"Edit"||"Add"," Keyword Filters"]})}),e.jsxs(T,{className:"sm:max-w-[32rem] !h-fit max-h-[90%] w-[90%] sm:h-auto overflow-y-auto select-none",children:[e.jsxs(W,{children:[e.jsx(A,{children:"Add/Remove Keyword Filters"}),e.jsxs(H,{className:"!-mb-3",children:["Filter organizations by adding or removing keywords. Save changes when you're done.",e.jsxs("span",{className:`text-red-500 font-bold ${m?"visible":"invisible"}`,children:[e.jsx("br",{}),"You have unsaved changes."]})]})]}),e.jsxs("div",{className:"flex gap-x-3",children:[e.jsx("input",{className:"w-full rounded-md",type:"text",autoComplete:"off",placeholder:"Find Keywords...",name:"keyword_filter",onChange:C,value:N}),e.jsx("button",{onClick:j,className:"h-full px-3 border border-black rounded-md hover:bg-gray-800 hover:text-white transition-all",children:"Reset"})]}),e.jsxs("div",{className:"w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-800 p-2 relative text-xs overflow-clip",children:[c.length!==0&&c.map((t,s)=>e.jsx(i,{name:t.keyword,remove:!0,onClick:()=>l(t)},s)),c.length===0&&e.jsx("div",{className:"pl-1 h-8 flex items-center",children:"(No Keywords Selected)"})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-arrow-up",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M18 11l-6 -6"}),e.jsx("path",{d:"M6 11l6 -6"})]})}),e.jsx("div",{className:"w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-300 p-2 relative text-xs",children:d.map((t,s)=>e.jsx(i,{name:t.keyword,add:!0,onClick:()=>S(t)},s))}),m&&e.jsx(Y,{asChild:!0,children:e.jsxs("div",{className:"w-full flex justify-end space-x-3",children:[e.jsx("div",{className:"text-red-500 font-bold my-auto",children:"You have unsaved changes."}),e.jsx(R,{type:"button",className:"bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black w-fit",onClick:x,children:"Update"})]})})]})]}),f.length!==0?f.map((t,s)=>e.jsx(w,{name:t.keyword},s)):e.jsx("div",{className:"text-gray-500 my-auto flex items-center",children:"(None Selected. We'll use this to recommend organizations to you.)"})]});function w({name:t}){return e.jsx("div",{className:"w-min px-2 py-1 bg-[#ffb700] border border-gray-300 h-fit rounded-md cursor-pointer whitespace-nowrap",children:t})}function i({name:t,remove:s,add:o,...n}){return e.jsxs("button",{...n,className:`select-none w-min px-2 py-1 ${o&&"bg-gray-200"} ${s&&"bg-[#ffb700]"} border border-gray-300 h-8 rounded-md space-x-2 flex items-center ${o&&"hover:bg-gray-300"} ${s&&"hover:bg-[#e6a70b]"} group`,children:[e.jsx("span",{className:"whitespace-nowrap",children:t}),e.jsxs("div",{className:"h-5 aspect-square text-gray-400",children:[s&&e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-circle-x text-black/70",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"})]}),o&&e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-circle-plus",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z"})]})]})]})}}function J({size:r,...a}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:r||"24",height:r||"24",viewBox:"0 0 24 24",fill:(a==null?void 0:a.fill)||"none",stroke:(a==null?void 0:a.stroke)||"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:`icon icon-tabler icons-tabler-outline icon-tabler-circle-minus ${a==null?void 0:a.className}`,children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}),e.jsx("path",{d:"M9 12l6 0"})]})}function re({user:r,activeUserKeywords:a,keywords:f,followedOrgs:h=[]}){const c=`${r.firstname} ${r.lastname} ${r.middlename}`,p=r.section!=null?null:"Specify Section",[d,g]=u.useState([...h]),[m,b]=u.useState(!1),j=()=>{if(JSON.stringify(d)===JSON.stringify(h)){b(!1);return}const l=h.map(({orgID:i})=>i),x=d.map(({orgID:i})=>i),w=l.filter(i=>!x.includes(i));y.patch(route("update.user.follows"),w,{onSuccess:()=>b(!1)})},N=l=>{y.get(route("organizations.home",l))},k=l=>{g(x=>x.filter(i=>i.orgID!==l))};return e.jsxs("div",{className:"w-full",children:[e.jsx(L,{title:"Profile"}),e.jsxs($,{children:[e.jsxs("div",{className:"w-full poppins text-lg md:text-xl font-bold mt-3 mb-5",children:["Manage ",e.jsx("span",{className:"text-[#ffb700]",children:"Profile"})]}),e.jsxs("div",{className:"mt-4 w-full flex flex-col items-center px-5 gap-6",children:[e.jsxs("div",{className:"w-full max-w-[65rem] flex flex-col items-center drop-shadow shadow-black rounded-[2rem] space-y-3 bg-[#F4F4F4] border border-gray-300",children:[e.jsxs("div",{className:"h-36 w-full flex flex-col justify-center px-12 space-y-3 bg-[#ffd875] rounded-[2rem]",children:[e.jsx("span",{className:"poetsen-one text-xl sm:text-3xl uppercase ",children:c}),e.jsxs("div",{className:"flex gap-x-3 text-sm sm:textbase",children:[e.jsx("div",{className:"hidden sm:contents",children:e.jsx(E,{})}),e.jsx("span",{children:r.email})]})]}),e.jsxs("div",{className:"w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-5",children:[e.jsxs("div",{className:"",children:["ID Number:",e.jsx("div",{className:"text-lg font-semibold",children:r.userID})]}),e.jsxs("div",{className:"",children:["Affiliation:",e.jsx("div",{className:"text-lg font-semibold ",children:r.college})]}),e.jsxs("div",{className:"",children:["Stakeholder Category:",e.jsx("div",{className:"text-lg font-semibold ",children:r.status})]}),e.jsx(S,{})]}),e.jsx("div",{className:"mt-10",children:e.jsx(M,{title:"Interests",className:"min-h-11",children:e.jsx(q,{activeUserKeywords:a,keywords:f})})})]})]}),e.jsxs("div",{className:"w-full max-w-[65rem] drop-shadow shadow-black rounded-[2rem] p-8 bg-[#F4F4F4] border border-gray-300",children:[e.jsxs("div",{className:"w-full flex justify-between mb-5",children:[e.jsx("span",{className:"font-bold mb-4",children:"Your followed organizations:"}),h.length!==0&&e.jsxs("div",{className:"h-10 flex gap-x-4 items-center",children:[e.jsx("span",{className:"text-sm text-slate-400/80 italic",children:m&&"Click to unfollow"}),e.jsx("button",{className:`px-3 select-none py-1 text-center w-20 rounded-md h-full ${m?"bg-sky-400":"bg-slate-300"}`,onClick:m?j:()=>b(!0),children:m?"Save":"Edit"})]})]}),e.jsxs("div",{className:"w-full grid grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] gap-4",children:[d.map((l,x)=>e.jsx(C,{org:l},x)),d.length==0&&e.jsx("span",{className:"text-sm text-slate-400/80 italic",children:"No followed organizations..."})]})]})]})]})]});function C({org:l}){return e.jsxs("button",{className:"flex items-center gap-x-3 hover:bg-slate-800 py-2 rounded-lg hover:text-white text-black bg-transparent transition-all",onClick:m?()=>k(l.orgID):()=>N(l.orgID),children:[e.jsx("div",{children:e.jsx(J,{fill:"#ef4444",stroke:"white",size:"27",className:m?"block ml-3":"hidden"})}),e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx("img",{src:`storage/logo/${l.logo}`,className:"aspect-square rounded-full size-12"}),e.jsx("div",{className:"flex-1 line-clamp-2 leading-5 text-left",children:l.name})]})]})}function S(){const[l,x]=u.useState(r.section||""),w=s=>{x(s.target.value)},i=s=>{s.key==="Enter"&&t(l)},t=s=>{s===""||l===r.section||y.patch(route("update.user.section"),{section:s})};return e.jsx(M,{title:"Section",error:p||l!==r.section?"Unsaved":"",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",maxLength:10,placeholder:"[YEAR]-[SECTION] ex. 3-ITG",className:"w-full rounded-l-lg focus:border-black border-transparent",value:l,onChange:w,onKeyDown:i}),l!==r.section&&e.jsx("button",{className:"px-3 border-l border-l-gray-200",onClick:()=>x(r.section||""),children:"Cancel"}),e.jsx("button",{className:`rounded-r-lg border-l border-l-gray-200 px-3 ${l!==r.section?"hover:bg-black/5 text-black":"cursor-not-allowed text-gray-500"}`,disabled:l===r.section,onClick:()=>t(l),children:"Save"})]})})}}export{re as default};