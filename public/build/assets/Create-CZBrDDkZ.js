import{W as o,j as e,Y as d}from"./app-DMBvuxJw.js";import{I as m}from"./IconCheckBox--F7XVlPw.js";import{I as c,a as x}from"./IconStars-DaECglVk.js";import{M as p}from"./MainAdminFrame-C9P04MO-.js";import{A as u}from"./AdminLayout-D33mBVAu.js";import"./utils-DPngbp4j.js";import"./button-Cz8TxfBZ.js";import"./IconMenu3-VBrNniLE.js";function w({orgID:a}){const{data:r,setData:i,post:n,errors:s}=o({name:"",description:""}),l=t=>{t.preventDefault(),n(route("admin.criteria.store",[a]),r)};return e.jsxs("div",{className:"w-full",children:[e.jsx(d,{title:"Admin Dashboard"}),e.jsx(u,{orgID:a,children:e.jsx(p,{navItems:[{icon:e.jsx(m,{}),label:"Student Applications",link:"admin.applications",params:{orgID:a}},{icon:e.jsx(c,{}),label:"Recruitment Form",link:"admin.forms",params:{orgID:a}},{icon:e.jsx(x,{}),label:"Manage Criteria",link:"admin.criteria.index",params:{orgID:a}}],title:"Create Criteria",children:e.jsx("div",{className:" bg-white min-h-screen ",children:e.jsxs("div",{className:"flex flex-col justify-center m-4 p-4 max-w-3xl mx-auto rounded-xl",children:[e.jsx("h1",{className:"font-semibold text-3xl mb-4 px-2 text-center",children:"Create Criteria"}),e.jsxs("form",{action:"",method:"POST",className:"bg-whiterounded",onSubmit:l,children:[e.jsxs("label",{htmlFor:"name",className:"block",children:["Name",e.jsx("span",{className:"text-red-600",children:"*"})," ",s.name?e.jsx("span",{className:"text-red-600",children:s.name}):""]}),e.jsx("input",{type:"text",id:"name",className:"w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-4 p-2",placeholder:"Position title...",required:!0,value:r.name,onChange:t=>i("name",t.target.value)}),e.jsxs("label",{htmlFor:"desc",className:"block",children:["Description",e.jsx("span",{className:"text-red-600",children:"*"})," ",s.description?e.jsx("span",{className:"text-red-600",children:s.description}):""]}),e.jsx("textarea",{name:"",id:"desc",className:"w-full bg-transparent rounded-xl border-[1.5px] h-96 border-x-stone-600 mb-2",placeholder:"Describe the criteria that the candidate must possess...",required:!0,value:r.description,onChange:t=>{i("description",t.target.value)}}),e.jsx("div",{className:"flex justify-end space-x-3",children:e.jsx("button",{type:"submit",className:"bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full",children:"Save"})})]})]})})})})]})}export{w as default};