import{j as e,r,W as j,Y as f}from"./app-Nah0YeiV.js";import{M as b}from"./MainAdminFrame-D0SRY3mz.js";import{S as N}from"./SuperAdminLayout-C8Y66xxk.js";import{I as v}from"./IconCheckBox-BJDFvKZh.js";import"./IconMenu3-Be-ovQ-L.js";import"./button-NIdFJHNh.js";function w({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-file-upload",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M14 3v4a1 1 0 0 0 1 1h4"}),e.jsx("path",{d:"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"}),e.jsx("path",{d:"M12 11v6"}),e.jsx("path",{d:"M9.5 13.5l2.5 -2.5l2.5 2.5"})]})}function h({handleFileChange:s,fileType:a}){const[t,n]=r.useState(""),i=l=>{const d=l.target.files[0];d&&(n(d.name),s(l,a))};return e.jsxs("div",{className:"flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out",children:[e.jsxs("label",{className:"cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md",children:[e.jsxs("span",{children:["Upload New ",a]}),e.jsx(w,{}),e.jsx("input",{type:"file",accept:".csv,.xlsx",onChange:i,className:"hidden"})]}),t&&e.jsx("span",{className:"ml-3 text-gray-700",children:t})]})}function U(){const[s,a]=r.useState(!1),[t,n]=r.useState(""),[i,l]=r.useState(""),{data:d,setData:c,post:x,reset:m}=j({studentFile:null,organizationFile:null}),p=(o,u)=>{switch(u){case"Student File":c("studentFile",o.target.files[0]);break;case"Organization File":c("organizationFile",o.target.files[0]);break}},g=o=>{o.preventDefault(),a(!0),n(""),l(""),x(route("superadmin.dataupload.file"),{onSuccess:()=>{n("File uploaded successfully!"),m()},onError:u=>{l("Failed to upload file. Please try again.")},onFinish:()=>{a(!1)}})};return e.jsxs("div",{className:"w-full",children:[e.jsx(f,{title:"OSA Dashboard"}),e.jsx(N,{children:e.jsxs(b,{navItems:[{icon:e.jsx(v,{}),label:"Upload",link:"superadmin.dataupload"}],title:"Data Upload",children:[e.jsxs("div",{className:"grid grid-cols-12 p-5 gap-2",children:[e.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[e.jsx("h1",{className:"font-bold",children:"Student Information"}),e.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),e.jsx(h,{handleFileChange:p,fileType:"Student File"})]}),e.jsxs("div",{className:"p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7",children:[e.jsx("h1",{className:"font-bold",children:"Organization List"}),e.jsx("h2",{className:"text-sm",children:"Last Date Uploaded: Aug-09-2024"}),e.jsx(h,{handleFileChange:p,fileType:"Organization File"})]})]}),e.jsxs("div",{className:"p-5",children:[e.jsx("button",{onClick:g,disabled:s,className:"bg-white text-black px-4 py-2 rounded-xl disabled:opacity-50",children:s?"Uploading...":"Upload Files"}),t&&e.jsx("p",{className:"text-green-500 mt-3",children:t}),i&&e.jsx("p",{className:"text-red-500 mt-3",children:i})]})]})})]})}export{U as default};
