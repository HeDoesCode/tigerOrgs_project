import{r,j as e,Y as p,y as l}from"./app-CBtMegU5.js";import{M as x}from"./MainAdminFrame-BS8U3bTN.js";import{S as h,I as b}from"./SuperAdminLayout-JJUZvtsO.js";import{S as o}from"./switch-CHDIfF63.js";import{A as c}from"./AdminDialog-DE1Sodbi.js";import"./utils-zaqxGMVH.js";import"./button-9O2ceuIR.js";import"./index-qE0t5k2W.js";import"./createLucideIcon-CP3TYMkH.js";import"./IconMenu3-vr0l91Tp.js";import"./Logo-CXV-52n8.js";import"./index-DddnG5vy.js";import"./index-BEt27YEv.js";import"./index-Dx46mD2O.js";import"./dialog-BSEaYfCx.js";import"./index-DctKFIAY.js";import"./index-k9KardYg.js";function T({recruitment:m=!1,manualreg:d=!1}){const[s,u]=r.useState(m),[i,g]=r.useState(d),a=(t,n)=>{l.post(route("superadmin.toggle-setting"),{status:t,setting_name:n},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{n==="Recruitment"?u(t):n==="Manual Registration"&&g(t),l.visit(route("superadmin.settings"))},onError:()=>{console.error(`Failed to toggle ${n} status`)}})};return e.jsxs("div",{className:"w-full",children:[e.jsx(p,{title:"OSA Dashboard - Settings"}),e.jsx(h,{children:e.jsx(x,{navItems:[{icon:e.jsx(b,{}),label:"Controls",link:"superadmin.settings"}],title:"Settings",children:e.jsxs("div",{className:"grid grid-cols-12 gap-2 p-5",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white",children:[e.jsx("h2",{className:"font-bold text-gray-700",children:"Recruitment Settings"}),e.jsx("p",{className:"text-sm mb-2",children:"Enable or disable recruitment functionality for all organizations."}),e.jsx(c,{title:"Enable/Disable Recruitment",description:"Enabling recruitment allows student leaders to manage recruitment statuses. Disabling it will turn off recruitment for all organizations.",trigger:e.jsxs("div",{role:"button",className:`underline font-bold ${s?"text-red-600":"text-green-600"}`,children:[s?"Disable":"Enable"," ","Recruitment"]}),children:e.jsxs("div",{className:"flex items-center space-x-3 mt-4",children:[e.jsx("label",{htmlFor:"recruitment-toggle",className:"text-gray-700",children:"Recruitment"}),e.jsx(o,{id:"recruitment-toggle",checked:s,onCheckedChange:t=>a(t,"Recruitment")}),e.jsx("span",{children:s?"On":"Off"})]})})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white",children:[e.jsx("h2",{className:"font-bold text-gray-700",children:"Manual Registration Settings"}),e.jsx("p",{className:"text-sm mb-2",children:"Enable or disable manual registration of students on the website."}),e.jsx(c,{title:"Enable/Disable Manual Registration",description:`Enabling manual registration allows students to manually register their UST Gmail account on the website. Only use this feature
                                if there is no data acquired from the OICT.`,trigger:e.jsxs("div",{role:"button",className:`underline font-bold ${i?"text-red-600":"text-green-600"}`,children:[i?"Disable":"Enable"," ","Manual Registration"]}),children:e.jsxs("div",{className:"flex items-center space-x-3 mt-4",children:[e.jsx("label",{htmlFor:"manualreg-toggle",className:"text-gray-700",children:"Manual Registration"}),e.jsx(o,{id:"manualreg-toggle",checked:i,onCheckedChange:t=>a(t,"Manual Registration")}),e.jsx("span",{children:i?"On":"Off"})]})})]})]})})})]})}export{T as default};