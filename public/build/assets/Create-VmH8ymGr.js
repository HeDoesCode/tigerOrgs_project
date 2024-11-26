import{W as o,j as e,Y as m}from"./app-BPM_M96_.js";import{I as d}from"./IconCheckBox-BlTLrjug.js";import{I as c,a as x}from"./IconStars-C56gI7RT.js";import{M as p}from"./MainAdminFrame-4zRrp3Pp.js";import{A as u}from"./AdminLayout-DTH3A8xR.js";import"./utils-BpEC-At6.js";import"./button-BcM0xAfE.js";import"./index-CqBjJmTE.js";import"./createLucideIcon-DVoN4DpU.js";import"./IconMenu3-AzUlFVcs.js";import"./Logo-CCsSDMWG.js";import"./index-B6Z4SFs-.js";function S({orgID:t}){const{data:s,setData:i,post:n,errors:r}=o({name:"",description:""}),l=a=>{a.preventDefault(),n(route("admin.criteria.store",[t]),s)};return e.jsxs("div",{className:"w-full",children:[e.jsx(m,{title:"Admin Dashboard"}),e.jsx(u,{orgID:t,children:e.jsx(p,{navItems:[{icon:e.jsx(c,{}),label:"Recruitment Form",link:"admin.forms",params:{orgID:t}},{icon:e.jsx(x,{}),label:"Manage Criteria",link:"admin.criteria.index",params:{orgID:t}},{icon:e.jsx(d,{}),label:"Student Applications",link:"admin.applications",params:{orgID:t}}],title:"Create Criteria",children:e.jsx("div",{className:" bg-white min-h-screen ",children:e.jsxs("div",{className:"flex flex-col justify-center m-4 p-4 max-w-3xl mx-auto rounded-xl",children:[e.jsx("h1",{className:"font-semibold text-3xl mb-4 px-2 text-center",children:"Create Criteria"}),e.jsxs("form",{action:"",method:"POST",className:"bg-whiterounded",onSubmit:l,children:[e.jsxs("label",{htmlFor:"name",className:"block",children:["Name",e.jsx("span",{className:"text-red-600",children:"*"})," ",r.name?e.jsx("span",{className:"text-red-600",children:r.name}):""]}),e.jsx("input",{type:"text",id:"name",className:"w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-4 p-2",placeholder:"Position title...",required:!0,value:s.name,onChange:a=>i("name",a.target.value)}),e.jsxs("label",{htmlFor:"desc",className:"block",children:["Description",e.jsx("span",{className:"text-red-600",children:"*"})," ",r.description?e.jsx("span",{className:"text-red-600",children:r.description}):""]}),e.jsx("textarea",{name:"",id:"desc",className:"w-full bg-transparent rounded-xl border-[1.5px] h-96 border-x-stone-600 mb-2",placeholder:"Describe the criteria that the candidate must possess...",required:!0,value:s.description,onChange:a=>{i("description",a.target.value)}}),e.jsx("div",{className:"flex justify-end space-x-3",children:e.jsx("button",{type:"submit",className:"bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full",children:"Save"})})]})]})})})})]})}export{S as default};
