import{j as s,Y as r}from"./app-DJjvf1D5.js";import{M as t}from"./MainAdminFrame-E_1AuHua.js";import{S as l}from"./SuperAdminLayout-DHo7hUZJ.js";import{I as m}from"./IconCheckBox-CtfuhV_G.js";import{V as o}from"./VerticalCard-BiTvQ59T.js";import{C as n}from"./CustomPagination-C8K8QL9t.js";import"./utils-iBxDxxOx.js";import"./button-DK7jQjHP.js";import"./index-BfCmCTf-.js";import"./createLucideIcon-D7r5aWFk.js";import"./IconMenu3-HEwZzqcv.js";import"./Logo-BDpSYOwp.js";import"./index-COWlLtd2.js";function A({loginEntries:e}){return s.jsxs("div",{className:"w-full",children:[s.jsx(r,{title:"OSA Dashboard"}),s.jsx(l,{children:s.jsx(t,{navItems:[{icon:s.jsx(m,{}),label:"Login History",link:"superadmin.loginhistory"}],title:"Activity Log",children:s.jsxs("div",{className:"grid grid-rows-1 p-5 gap-2",children:[e.data.map((i,a)=>s.jsxs(o,{gridcol:"sm:grid-cols-7",children:[s.jsx("div",{className:" col-span-1 ",children:s.jsx("h1",{className:"ml-2  text-center font-semibold text-gray-500",children:i.login_date})}),s.jsx("div",{className:" col-span-5 ",children:s.jsxs("h1",{className:"ml-2  text-center",children:[s.jsx("span",{className:"font-bold text-gray-500",children:`${i.firstname} ${i.lastname}`})," ",s.jsx("span",{className:"text-gray-500 font-medium",children:"accessed the Super Admin Dashboard"})]})}),s.jsx("div",{className:" col-span-1 ",children:s.jsx("h1",{className:"ml-2 text-center font-semibold text-gray-500",children:i.login_time})})]},a)),s.jsx("div",{className:"h-10 w-full",children:s.jsx("div",{className:"fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center",children:s.jsx(n,{page:e})})})]})})})]})}export{A as default};