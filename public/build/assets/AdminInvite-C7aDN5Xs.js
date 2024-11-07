import{j as e,r as x,W as D,Y as F,y as B}from"./app-wTbvq_QV.js";import{A as E}from"./AdminLayout-161wwgiL.js";import{M as T}from"./MainAdminFrame-CZzgPJkk.js";import{A as M,S as H}from"./Searchbar-k3eRUGUx.js";import{I as O,a as R}from"./IconProfile-D6326uKr.js";import{D as W,a as P,b as V,g as j,d as q}from"./dropdown-menu-DaaXx7JZ.js";import{I as C}from"./IconEdit-CsHZr7cq.js";import{A as Q,a as U,b as Y,c as G,d as J,e as K,f as X,g as Z,h as _}from"./alert-dialog-DAaWwLRw.js";import{A}from"./AdminDialog-CzVC1zx-.js";import{I as f}from"./IconInvite-CLL_mbZb.js";import{V as ee}from"./VerticalCard-t5VpOSfY.js";import"./index-fuKT8Dx1.js";import"./IconMenu3-CRQ8g1bN.js";import"./button-UyB_9sy1.js";import"./IconSearch-CY4btdhs.js";import"./index-CkVXNEJA.js";function se({size:n}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:n||"24",height:n||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-user-check",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"}),e.jsx("path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4"}),e.jsx("path",{d:"M15 19l2 2l4 -4"})]})}function te({size:n}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:n||"24",height:n||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-vector-bezier",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M3 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"}),e.jsx("path",{d:"M17 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"}),e.jsx("path",{d:"M10 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"}),e.jsx("path",{d:"M10 8.5a6 6 0 0 0 -5 5.5"}),e.jsx("path",{d:"M14 8.5a6 6 0 0 1 5 5.5"}),e.jsx("path",{d:"M10 8l-6 0"}),e.jsx("path",{d:"M20 8l-6 0"}),e.jsx("path",{d:"M3 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"}),e.jsx("path",{d:"M21 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"})]})}function ne({size:n}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:n||"24",height:n||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M3 21l18 0"}),e.jsx("path",{d:"M5 21v-14l8 -4v18"}),e.jsx("path",{d:"M19 21v-10l-6 -4"}),e.jsx("path",{d:"M9 9l0 .01"}),e.jsx("path",{d:"M9 12l0 .01"}),e.jsx("path",{d:"M9 15l0 .01"}),e.jsx("path",{d:"M9 18l0 .01"})]})}function re({size:n}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:n||"24",height:n||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-mail",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"}),e.jsx("path",{d:"M3 7l9 6l9 -6"})]})}function u({children:n,onclick:o,...t}){const[c,d]=x.useState(!1);return e.jsxs(Q,{open:c,onOpenChange:d,children:[e.jsx(U,{asChild:!0,children:e.jsx("button",{children:t.trigger})}),e.jsxs(Y,{children:[e.jsxs(G,{children:[e.jsx(J,{children:t.title}),e.jsx(K,{children:t.description})]}),e.jsxs(X,{children:[e.jsx(Z,{children:"Cancel"}),e.jsx(_,{onClick:()=>{o()},children:t.accept})]})]})]})}function ae({userID:n,orgID:o,roleID:t}){const{data:c,setData:d,post:m,processing:i}=D({userID:n}),l=r=>{m(route(`admin.${r}`,{orgID:o}),{preserveState:!0,preserveScroll:!0})};return e.jsxs(W,{children:[e.jsx(P,{className:"w-full",disabled:i,children:e.jsx(C,{})}),e.jsxs(V,{children:[t===2?e.jsx(j,{onSelect:r=>{r.preventDefault()},className:"bg-[#f8f8f8] border-gray-300 cursor-pointer",children:e.jsx(u,{trigger:"Make Member",title:"Demote the user as member?",description:"This will disable the user to manage the organization.",accept:"Confirm",onclick:()=>l("make-member")})}):e.jsx(j,{onSelect:r=>{r.preventDefault()},className:"bg-[#f8f8f8] border-gray-300 cursor-pointer",children:e.jsx(u,{trigger:"Make Admin",title:"Make the user as admin?",description:"This will enable the user to manage the organization.",accept:"Confirm",onclick:()=>l("make-admin")})}),e.jsx(q,{}),e.jsx(j,{onSelect:r=>{r.preventDefault()},className:"bg-[#f8f8f8] border-gray-300 cursor-pointer",children:e.jsx(u,{trigger:"Remove Student",title:"Remove the user from the organization",description:"Are you sure you want to delete the user from the organization?",accept:"Confirm",onclick:()=>l("remove-student")})})]})]})}function k({name:n,position:o,college:t,email:c,userID:d,orgID:m,roleID:i,showActions:l=!0,admins:r,setAllAdmins:v,members:p,setAllMembers:b,allAdmins:w}){const g=i===2,N=i===1;return console.log(i),e.jsxs("div",{className:"hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-100 p-3 w-full bg-white rounded-xl",children:[e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsxs("div",{className:`${g?"bg-[#FF9900]":"bg-[#FFBC58]"} p-1 px-4 rounded-2xl flex justify-between items-center`,children:[e.jsx("div",{className:"mx-1 text-gray-800",children:e.jsx(se,{})}),e.jsx("div",{className:"ml-2 poppins",children:g?"Admin":N?"Member":"Unknown"})]}),l&&e.jsx("div",{className:"flex",children:e.jsx("div",{className:"mx-1 text-gray-500 cursor-pointer",children:e.jsx(ae,{userID:d,orgID:m,roleID:i})})})]}),e.jsxs("div",{className:"grid grid-cols-5 mb-1",children:[e.jsx("div",{className:"col-span-1 grid content-center justify-self-center text-gray-500",children:e.jsx(O,{})}),e.jsx("div",{className:"col-span-4 text-lg font-bold truncate",children:n})]}),e.jsxs("div",{className:"grid grid-cols-5 mb-1",children:[e.jsx("div",{className:"col-span-1 grid content-center justify-self-center text-gray-500",children:e.jsx(te,{})}),e.jsx("div",{className:"col-span-4 text-lg font-semibold truncate",children:o})]}),e.jsxs("div",{className:"grid grid-cols-5 mb-1",children:[e.jsx("div",{className:"col-span-1 grid content-center justify-self-center text-gray-500",children:e.jsx(ne,{})}),e.jsx("div",{className:"col-span-4 text-md truncate",children:t})]}),e.jsxs("div",{className:"grid grid-cols-5 mb-1",children:[e.jsx("div",{className:"col-span-1 grid content-center justify-self-center text-gray-500",children:e.jsx(re,{})}),e.jsx("div",{className:"col-span-4 text-md truncate",children:c})]})]})}function Ne({members:n,admins:o,orgID:t,organizationName:c}){const[d,m]=x.useState(""),[i,l]=x.useState([]),r=async s=>{const a=s.target.value;if(m(a),a.length>0)try{const h=await axios.get(`/admin/${t}/search-users`,{params:{query:a}});l(h.data)}catch(h){console.error("Error fetching result:",h)}else l([])},v=s=>{console.log(t),console.log(p.userID),w(`/admin/${t}/addMember/${p.userID}`,{preserveState:!0,preserveScroll:!0})},{data:p,setData:b,post:w,processing:g,errors:N}=D({userID:"",orgID:t,roleID:1}),S=s=>{b("userID",s)},[y,I]=x.useState({orgID:t,message:""});function $(s){const a=s.target.id,h=s.target.value;I(L=>({...L,[a]:h}))}function z(s){s.preventDefault(),B.post(`/admin/${t}/makeAnnouncement`,y)}return e.jsxs("div",{className:"w-full",children:[e.jsx(F,{title:"Admin Dashboard"}),e.jsx(E,{orgID:t,children:e.jsx(T,{navItems:[{icon:e.jsx(C,{}),label:"Edit Page",link:"admin.editpage",params:{orgID:t}},{icon:e.jsx(f,{}),label:"Members",link:"admin.invite",params:{orgID:t}}],title:`Admin Invitation - ${c}`,children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-end me-5 mt-5",children:[e.jsx(A,{title:"Send Announcement",description:"Send Notification to the members of your Organization",trigger:e.jsx(M,{asChild:!0,className:"mr-2 sm:mt-0 bg-white hover:bg-gray-800 hover:text-white",icon:e.jsx(R,{}),name:"Send Announcement"}),children:e.jsxs("form",{onSubmit:z,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"name",className:"block  font-medium text-gray-700",children:"Message:"}),e.jsx("textarea",{id:"message",value:y.message,onChange:$,className:"block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",placeholder:"Type here your announcement",required:!0})]}),e.jsx("div",{className:"mt-4 grid justify-items-end",children:e.jsx("button",{type:"submit",className:"flex px-9  shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white",children:e.jsx("span",{className:"ml-2  poppins truncate sm:block",children:"Announce"})})})]})}),e.jsxs(A,{title:"Add Member Manually",description:"Search to add manually to the Organization",trigger:e.jsx(M,{asChild:!0,className:"mr-2 sm:mt-0 bg-white hover:bg-gray-800 hover:text-white",icon:e.jsx(f,{}),name:"Add Member Manually"}),children:[e.jsx(H,{value:d,onChange:r,placeholder:"Search by name or email"}),e.jsx("div",{children:i.map(s=>e.jsxs(ee,{gridcol:"grid-col-1 md:grid-cols-4",children:[e.jsxs("div",{className:"text-sm font-bold content-center text-center",children:[s.firstname," ",s.lastname]}),e.jsx("div",{className:"truncate col-span-2 content-center text-sm font-semibold text-center",children:s.email}),e.jsx("div",{className:"sm px-4 text-sm content-center justify-self-center ",children:e.jsx(u,{trigger:e.jsxs("div",{role:"button",className:"mr-2 bg-white flex items-center justify-center px-9  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white",name:"Assign",onClick:()=>{S(s.userID)},children:[e.jsx(f,{}),e.jsx("span",{className:"ml-2 poppins hidden truncate sm:block",children:"Assign"})]}),title:`Add ${s.firstname} ${s.lastname} to the organization?`,description:"This adds the chosen user to the organization.",accept:"Confirm",onclick:v})})]},s.userID))})]})]}),e.jsx("div",{className:"pt-5 pl-5 flex justify-between",children:e.jsx("div",{className:"poppins",children:"Current Admin(s):"})}),e.jsx("div",{className:"grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5",children:o.map((s,a)=>e.jsx(k,{isAdmin:!0,name:`${s.firstname} ${s.lastname}`,position:s.position||"Member",email:s.email||"No email available",college:s.college||"N/A",userID:s.userID,orgID:t,roleID:2},s.userID||`admin-${a}`))}),e.jsx("div",{className:"pt-5 pl-5 flex justify-between",children:e.jsx("div",{className:"poppins",children:"Other Members:"})}),e.jsx("div",{className:"grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5",children:n.map((s,a)=>e.jsx(k,{isAdmin:!1,name:`${s.firstname} ${s.lastname}`,position:s.position||"Member",email:s.email||"No email available",college:s.college||"N/A",userID:s.userID,orgID:t,roleID:1},s.userID||`member-${a}`))})]})})})]})}export{Ne as default};
