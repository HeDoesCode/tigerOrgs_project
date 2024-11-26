import{j as e,r as x,Y as F,q as _,y as S}from"./app-CQ1v4CXz.js";import{A as $}from"./AdminLayout-CxwGuu2m.js";import{M as z}from"./MainAdminFrame-HGgth6Yz.js";import{I as E}from"./IconCheckBox-BxMpXa6u.js";import{I as B,a as U}from"./IconStars-tPWE3lUe.js";import{A as N}from"./AdminDialog-Cs28KASA.js";import{S as V,a as O,b as T,c as q,d as g}from"./select-31HJZ_vV.js";import{A as H,a as P,b as G,c as J}from"./accordion-BS6vCdjP.js";import"./IconMenu3-C4gMQUm3.js";import"./createLucideIcon-_flAZbB2.js";import"./PrivacyPolicy-DXgBuK9f.js";import"./Logo-Cz12jA4C.js";import"./utils-aYM5bCtc.js";import"./index-DEyZLPC0.js";import"./index-B8eaYLFf.js";import"./button-DYTK1q6P.js";import"./dialog-DnTO6yaC.js";import"./index-fG1OfbE1.js";import"./index-BEgwai2j.js";import"./index-CXnUhIzJ.js";import"./index-Xx_peI74.js";import"./index-DiipibtH.js";import"./check-VgFVxUij.js";function K({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"}),e.jsx("path",{d:"M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"}),e.jsx("path",{d:"M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"})]})}function Y({onClick:s,className:t}){return e.jsx("div",{className:`grid content-center ${t}`,onClick:s,children:e.jsx("div",{className:"justify-self-center",children:e.jsx("div",{className:"size-8 hover:bg-gray-300 flex justify-center items-center rounded-full",children:e.jsx(K,{})})})})}const Q=({item:s,orgID:t,applicationID:n})=>{const i=()=>{if(!s.value)return e.jsx("span",{className:"text-gray-500",children:"No response"});switch(s.type){case"text":case"email":case"number":case"select":case"radio":return e.jsx("span",{className:"text-gray-700",children:s.value});case"checkbox":return e.jsx("div",{className:"space-y-1",children:Array.isArray(s.value)&&s.value.map((o,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("svg",{className:"h-4 w-4 text-blue-500",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),e.jsx("span",{className:"ml-2 text-gray-700",children:o})]},c))});case"image_upload":return typeof s.value=="object"&&s.value.file_path?e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"relative w-full max-w-md rounded-lg overflow-hidden border border-gray-200",children:e.jsx("img",{src:`/admin/${t}/${n}/file/view/${encodeURIComponent(s.value.file_path)}`,alt:s.value.original_filename,className:"w-full h-auto object-cover"})}),e.jsxs("div",{className:"text-sm text-gray-500 space-y-1",children:[e.jsxs("p",{children:["Original filename:"," ",s.value.original_filename]}),e.jsxs("p",{children:["Size: ",y(s.value.file_size)]}),e.jsxs("p",{children:["Uploaded:"," ",new Date(s.value.uploaded_at).toLocaleString()]})]})]}):e.jsx("span",{className:"text-gray-500",children:"No image uploaded"});case"file_upload":return typeof s.value=="object"&&s.value.file_path?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("svg",{className:"h-6 w-6 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"})}),e.jsx("a",{href:`/admin/${t}/${n}/file/view/${encodeURIComponent(s.value.file_path)}`,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-800 underline",children:s.value.original_filename})]}),e.jsxs("div",{className:"text-sm text-gray-500 space-y-1",children:[e.jsxs("p",{children:["Size: ",y(s.value.file_size)]}),e.jsxs("p",{children:["Type: ",s.value.mime_type]}),e.jsxs("p",{children:["Uploaded:"," ",new Date(s.value.uploaded_at).toLocaleString()]})]})]}):e.jsx("span",{className:"text-gray-500",children:"No file uploaded"});default:return e.jsx("span",{className:"text-gray-500",children:"Unsupported response type"})}};return e.jsx("li",{className:"border-b border-gray-200 py-4 last:border-b-0",children:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h4",{className:"font-medium text-gray-900",children:[s.name,s.required==="1"&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsx("div",{className:"ml-4",children:i()})]})})},y=s=>{if(s===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(s)/Math.log(t));return parseFloat((s/Math.pow(t,i)).toFixed(2))+" "+n[i]};function X({item:s,orgID:t,applicationID:n}){return e.jsx(Q,{item:s,orgID:t,applicationID:n})}function Se({orgID:s,formsWithApplications:t}){var p,u;const[n,i]=x.useState(null),o=l=>{i(l)},c=t.find(l=>l.formID===n),a=((p=c==null?void 0:c.applications)==null?void 0:p.length)>0;function f(l){l.preventDefault(),S.post(`/admin/${s}/categorizeApplications/${n}`)}return e.jsxs("div",{className:"w-full",children:[e.jsx(F,{title:"Admin Dashboard"}),e.jsx($,{orgID:s,children:e.jsx(z,{navItems:[{icon:e.jsx(B,{}),label:"Recruitment Form",link:"admin.forms",params:{orgID:s}},{icon:e.jsx(U,{}),label:"Manage Criteria",link:"admin.criteria.index",params:{orgID:s}},{icon:e.jsx(E,{}),label:"Student Applications",link:"admin.applications",params:{orgID:s}}],title:"Manage Student Applications",children:t.length>0?e.jsx("div",{className:"",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 divide-x divide-gray-200",children:[e.jsxs("div",{className:"col-span-5 md:col-span-3 mb-6",children:[e.jsx("div",{className:"hidden sm:block poppins p-5",children:"Available Forms:"}),e.jsx("div",{className:"hidden sm:block h-[500px] overflow-auto",children:t.map(l=>{var m,d;return e.jsx(b,{formID:l.formID,criteriaID:l.criteriaID,name:(m=l.formLayout)==null?void 0:m.name,applicationCount:((d=l.applications)==null?void 0:d.length)||0,selected:n===l.formID,onSelect:()=>o(l.formID)},l.formID)})}),e.jsx(H,{type:"single",collapsible:!0,children:e.jsxs(P,{value:"item-1",children:[e.jsx(G,{className:"text-left p-5 flex sm:hidden",children:"Forms Available"}),e.jsx(J,{children:e.jsx("ul",{className:"bg-transparent flex flex-col pt-2 rounded-md space-y-1",children:t.map(l=>{var m,d;return e.jsx(b,{formID:l.formID,criteriaID:l.criteriaID,name:(m=l.formLayout)==null?void 0:m.name,applicationCount:((d=l.applications)==null?void 0:d.length)||0,selected:n===l.formID,onSelect:()=>o(l.formID)},l.formID)})})})]})})]}),e.jsxs("div",{className:"col-span-1 md:col-span-9 grid-cols-1 min-h-[500px]",children:[e.jsxs("div",{className:"poppins col-span-1 flex justify-between",children:[e.jsxs("h1",{className:"p-5",children:["Application Responses for the form"," ",e.jsx("span",{className:"underline underline-offset-2",children:((u=c==null?void 0:c.formLayout)==null?void 0:u.name)||"Select a form"}),":"]}),console.log(t),n===null?"":e.jsx("form",{onSubmit:f,className:"py-4",children:e.jsx("button",{type:"submit",className:"mr-2 py-1 bg-white flex px-5  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white ease-in-out duration-300 ",children:"Run ATS Analysis"})})]}),c&&a?e.jsx("div",{className:"grid grid-cols-1 min-h-[500px] h-[500px] overflow-auto",children:e.jsxs("table",{className:"mr-5 ml-5 sm:ml-0 sm:mr-3 bg-white divide-y min-h-[500px] rounded-r-xl rounded-l-xl sm:rounded-r-xl sm:rounded-l-none divide-gray-200",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"hidden sm:grid grid-cols-1  sm:grid-cols-9 py-4 text-center ",children:[e.jsx("th",{className:"col-span-1 sm:col-span-2 text-sm",children:"Full Name"}),e.jsx("th",{className:"col-span-1 sm:col-span-2 text-sm",children:"Affiliation"}),e.jsx("th",{className:"col-span-1 sm:col-span-2 text-sm",children:"Email"}),e.jsx("th",{className:`${c.formLayout.criteria===""?"col-span-2 sm:col-span-2":"col-span-1 sm:col-span-1"} text-sm`,children:"Date Submitted"}),c.formLayout.criteria===""?"":e.jsx("th",{className:"col-span-1 sm:col-span-1 text-sm",children:"Similarity Score"}),e.jsx("th",{className:"col-span-1 sm:col-span-1 text-sm",children:"Actions"})]})}),e.jsx("tbody",{children:c.applications.map(l=>e.jsx(Z,{criteria:c.formLayout.criteria,application:l,orgID:s,selectedFormId:n},l.applicationID))})]})}):e.jsx("div",{className:"m-14 sm:m-48 text-xl text-gray-600 font-thin text-center",children:c?"No Responses Found":"Select a form to view responses"})]})]})}):e.jsx("div",{children:e.jsx("div",{className:"m-14 sm:m-48 text-xl text-gray-600 font-thin text-center",children:"No Recruitment Form Found"})})})})]})}function b({formID:s,criteriaID:t,name:n,applicationCount:i,selected:o,onSelect:c}){return e.jsxs("div",{onClick:c,className:`cursor-pointer p-4 text-sm mr-5 ml-5 sm:mr-0 sm:ml-3 ${o?"bg-white":""} hover:bg-white flex justify-between items-center rounded-l-xl rounded-r-xl sm:rounded-r-none sm:rounded-l-xl`,children:[e.jsx("h1",{className:"font-extrabold",children:n}),e.jsx("div",{className:"ml-2 mr-2 rounded-full p-1 text-xs text-center font-bold bg-gray-300",children:i})]})}function Z({criteria:s,application:t,orgID:n,selectedFormId:i}){const{errors:o}=_().props,c=r=>new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit"}),a=t.user,f=t.isMember,[p,u]=x.useState(""),l=r=>{u(r)},[m,d]=x.useState(""),w=r=>{d(r)},[D,A]=x.useState(null),k=r=>{A(r)},[I,M]=x.useState(null),C=r=>{M(r)},h=(()=>{if(!(t!=null&&t.userData))return null;try{return typeof t.userData=="object"?t.userData:JSON.parse(t.userData)}catch(r){return console.error("Error parsing userData:",r),null}})();if(!h||!h.layout)return e.jsx("div",{className:"p-4 text-sm text-yellow-800 bg-yellow-50 rounded-lg",children:"No response data available"});const[L,v]=x.useState(!1);function R(r){r.preventDefault(),S.patch(route("admin.setStatus",n),{formID:i,userID:D,applicationID:I,orgID:n,status:p,message:m},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{v(!1),d("")},onError:()=>{console.error("Save failed. Please try again.")}})}return e.jsxs("tr",{className:"grid grid-cols-1 hover:bg-gray-100 sm:grid-cols-9 py-2 text-center min-h-16",children:[e.jsxs("td",{className:"col-span-1 sm:col-span-2 text-sm content-center",children:[a==null?void 0:a.firstname," ",a==null?void 0:a.lastname]}),e.jsx("td",{className:"col-span-1 sm:col-span-2 text-sm content-center",children:a==null?void 0:a.college}),e.jsx("td",{className:"col-span-1 sm:col-span-2 text-sm content-center truncate",children:a==null?void 0:a.email}),e.jsx("td",{className:`${s===""?"col-span-1 sm:col-span-2":"col-span-1 sm:col-span-1"} text-sm content-center`,children:c(t.created_at)}),s===""?"":e.jsx("td",{className:"col-span-1 sm:col-span-1 px-4 text-sm content-center",children:e.jsx("div",{className:"bg-gray-500 rounded-xl text-white px-2 py-1",children:t.similarityScore!==null?`${t.similarityScore}%`:"Not yet graded"})}),f?e.jsx("td",{className:"col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1",children:e.jsx("div",{className:"bg-[#FFBC58] px-4 py-1 text-black rounded-xl ",children:"Member"})}):t.status==="accepted"?e.jsx("td",{className:"col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1",children:e.jsx("div",{className:"bg-green-400 px-4 py-1 text-black rounded-xl",children:"Accepted"})}):t.status==="rejected"?e.jsx("td",{className:"col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1",children:e.jsx("div",{className:"bg-red-400 px-4 py-1 text-black rounded-xl ",children:"Rejected"})}):e.jsxs("td",{className:"sm:col-span-1 grid-cols-2 text-sm grid sm:grid-cols-2",children:[e.jsx("div",{className:"col-span-1 sm:col-span-1 content-center justify-self-center",children:e.jsx(N,{title:"Answer of the Applicant",trigger:e.jsxs("div",{className:" justify-self-center underline content-center underline-offset-2",children:["View"," ",e.jsx("span",{className:"sm:hidden",children:"Response"})]}),children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-md font-bold",children:"Applicant Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Name:"})," ",a==null?void 0:a.firstname," ",a==null?void 0:a.lastname]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",a==null?void 0:a.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"College:"})," ",a==null?void 0:a.college]}),e.jsx("hr",{className:"my-4"}),e.jsx("h3",{className:"text-lg font-bold",children:"Application Answers"}),e.jsxs("div",{className:"px-6 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold  text-gray-900 mb-6",children:h.name}),t.userData.desc&&e.jsx("p",{className:"text-gray-600  mb-8",children:h.desc}),Object.keys(o).length>0&&e.jsx("div",{className:"bg-red-50 border-l-4 border-red-400 p-4 mb-6",children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"h-5 w-5 text-red-400",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),e.jsxs("div",{className:"ml-3",children:[e.jsx("h3",{className:"font-medium text-red-800",children:"There were errors with your submission"}),e.jsx("ul",{className:"mt-2 text-red-700 list-disc list-inside",children:Object.keys(o).map((r,j)=>e.jsx("li",{children:o[r]},j))})]})]})}),e.jsx("ul",{className:"space-y-6",children:h.layout.map((r,j)=>e.jsx(X,{item:r,orgID:n,applicationID:t.applicationID},j))})]})]})})}),e.jsx("div",{className:"col-span-1 sm:col-span-1 content-center justify-self-center",children:e.jsx(N,{title:`Set the Status for Applicant ${a==null?void 0:a.firstname} ${a==null?void 0:a.lastname}`,trigger:e.jsx(Y,{onClick:()=>{k(a==null?void 0:a.userID),C(t.applicationID)}}),open:L,onOpenChange:r=>v(r),children:e.jsxs("form",{onSubmit:R,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"block text-sm font-bold text-gray-700",children:"Select a Status to be Set for this Application:"}),e.jsxs(V,{required:!0,onValueChange:l,children:[e.jsx(O,{className:"w-full h-12 mb border-gray-300 bg-transparent",children:e.jsx(T,{placeholder:"Select a Status"})}),e.jsxs(q,{className:"border-gray-500 bg-[#EEEEEE] quicksand",children:[e.jsx(g,{value:"accepted",children:"Mark as Accepted"}),e.jsx(g,{value:"pending",children:"Mark as Pending"}),e.jsx(g,{value:"rejected",children:"Mark as Rejected"})]})]}),e.jsx("label",{className:"block text-sm font-bold text-gray-700",children:"Attach a Message/Reason:"}),e.jsx("textarea",{className:"block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",placeholder:p==="pending"?"(This field is required)":"(Optional)",onChange:r=>w(r.target.value)})]}),e.jsx("div",{className:"mt-4 grid justify-items-end",children:e.jsx("button",{type:"submit",className:"flex px-9 shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white",children:e.jsx("span",{className:"ml-2 poppins truncate sm:block",children:"Set Status"})})})]})})})]})]})}export{Se as default};
