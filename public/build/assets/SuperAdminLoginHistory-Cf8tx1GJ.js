import{j as s,Y as r}from"./app-Cm0bgSGD.js";import{M as t}from"./MainAdminFrame-C883UCyv.js";import{S as l}from"./SuperAdminLayout-BYpCLQC7.js";import{I as m}from"./IconCheckBox-CKT0lfcN.js";import{V as o}from"./VerticalCard-dzaMpYC6.js";import{C as n}from"./CustomPagination-DzRFfPiU.js";import"./IconMenu3-DyyIQKWU.js";import"./button-D1BKqoIE.js";import"./index-D1-yQ-VN.js";function N({loginEntries:i}){return s.jsxs("div",{className:"w-full",children:[s.jsx(r,{title:"OSA Dashboard"}),s.jsx(l,{children:s.jsx(t,{navItems:[{icon:s.jsx(m,{}),label:"Login History",link:"superadmin.loginhistory"}],title:"Activity Log",children:s.jsxs("div",{className:"grid grid-rows-1 p-5 gap-2",children:[i.data.map((e,a)=>s.jsxs(o,{gridcol:"sm:grid-cols-7",children:[s.jsx("div",{className:" col-span-1 ",children:s.jsx("h1",{className:"ml-2  text-center font-semibold text-gray-500",children:e.login_date})}),s.jsx("div",{className:" col-span-5 ",children:s.jsxs("h1",{className:"ml-2  text-center",children:[s.jsx("span",{className:"font-bold text-gray-500",children:`${e.firstname} ${e.lastname}`})," ",s.jsx("span",{className:"text-gray-500 font-medium",children:"accessed the Super Admin Dashboard"})]})}),s.jsx("div",{className:" col-span-1 ",children:s.jsx("h1",{className:"ml-2 text-center font-semibold text-gray-500",children:e.login_time})})]},a)),s.jsx("div",{className:"h-10 w-full",children:s.jsx("div",{className:"fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center",children:s.jsx(n,{page:i})})})]})})})]})}export{N as default};