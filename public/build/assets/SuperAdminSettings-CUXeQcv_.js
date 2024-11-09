import{r,j as e,Y as x,y as l}from"./app-DMBvuxJw.js";import{M as h}from"./MainAdminFrame-C9P04MO-.js";import{S as p,I as b}from"./SuperAdminLayout-CtMZMiji.js";import{S as o}from"./switch-DDb1Jhsf.js";import{A as c}from"./AdminDialog-l_LhJD2D.js";import"./utils-DPngbp4j.js";import"./button-Cz8TxfBZ.js";import"./IconMenu3-VBrNniLE.js";import"./index-DT0MepzL.js";import"./index-CvCF9zQI.js";import"./index-C1stwmYL.js";import"./index-DkWYE_Rv.js";function A({recruitment:d=!1,manualreg:m=!1}){const[s,u]=r.useState(d),[n,g]=r.useState(m),i=(t,a)=>{l.post(route("superadmin.toggle-setting"),{status:t,setting_name:a},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{a==="Recruitment"?u(t):a==="Manual Registration"&&g(t),l.visit(route("superadmin.settings"))},onError:()=>{console.error(`Failed to toggle ${a} status`)}})};return e.jsxs("div",{className:"w-full",children:[e.jsx(x,{title:"OSA Dashboard - Settings"}),e.jsx(p,{children:e.jsx(h,{navItems:[{icon:e.jsx(b,{}),label:"Controls",link:"superadmin.settings"}],title:"Settings",children:e.jsxs("div",{className:"grid grid-cols-12 gap-2 p-5",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white",children:[e.jsx("h2",{className:"font-bold text-gray-700",children:"Recruitment Settings"}),e.jsx("p",{className:"text-sm mb-2",children:"Enable or disable recruitment functionality for all organizations."}),e.jsx(c,{title:"Enable/Disable Recruitment",description:"Enabling recruitment allows student leaders to manage recruitment statuses. Disabling it will turn off recruitment for all organizations.",trigger:e.jsxs("div",{role:"button",className:`underline font-bold ${s?"text-red-600":"text-green-600"}`,children:[s?"Disable":"Enable"," ","Recruitment"]}),children:e.jsxs("div",{className:"flex items-center space-x-3 mt-4",children:[e.jsx("label",{htmlFor:"recruitment-toggle",className:"text-gray-700",children:"Recruitment"}),e.jsx(o,{id:"recruitment-toggle",checked:s,onCheckedChange:t=>i(t,"Recruitment")}),e.jsx("span",{children:s?"On":"Off"})]})})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white",children:[e.jsx("h2",{className:"font-bold text-gray-700",children:"Manual Registration Settings"}),e.jsx("p",{className:"text-sm mb-2",children:"Enable or disable manual registration of students on the website."}),e.jsx(c,{title:"Enable/Disable Manual Registration",description:`Enabling manual registration allows students to manually register their UST Gmail account on the website. Only use this feature
                                if there is no data acquired from the OICT.`,trigger:e.jsxs("div",{role:"button",className:`underline font-bold ${n?"text-red-600":"text-green-600"}`,children:[n?"Disable":"Enable"," ","Manual Registration"]}),children:e.jsxs("div",{className:"flex items-center space-x-3 mt-4",children:[e.jsx("label",{htmlFor:"manualreg-toggle",className:"text-gray-700",children:"Manual Registration"}),e.jsx(o,{id:"manualreg-toggle",checked:n,onCheckedChange:t=>i(t,"Manual Registration")}),e.jsx("span",{children:n?"On":"Off"})]})})]})]})})})]})}export{A as default};