import{j as e,q as n,a as r}from"./app-Nah0YeiV.js";import{L as u,I as f,a as p}from"./IconMenu3-Be-ovQ-L.js";function j({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-folder-cog",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12.5 19h-7.5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3"}),e.jsx("path",{d:"M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}),e.jsx("path",{d:"M19.001 15.5v1.5"}),e.jsx("path",{d:"M19.001 21v1.5"}),e.jsx("path",{d:"M22.032 17.25l-1.299 .75"}),e.jsx("path",{d:"M17.27 20l-1.3 .75"}),e.jsx("path",{d:"M15.97 17.25l1.3 .75"}),e.jsx("path",{d:"M20.733 20l1.3 .75"})]})}function v({size:s}){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:s||"24",height:s||"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-users-group",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),e.jsx("path",{d:"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"}),e.jsx("path",{d:"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),e.jsx("path",{d:"M17 10h2a2 2 0 0 1 2 2v1"}),e.jsx("path",{d:"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),e.jsx("path",{d:"M3 13v-1a2 2 0 0 1 2 -2h2"})]})}function b({orgID:s,children:i}){const{orgLogo:o,orgName:a}=n().props;return n(),e.jsx(u,{headerContent:e.jsx(l,{}),sidebar:e.jsx(d,{}),children:i});function l(){return e.jsx("div",{className:"flex-1 flex justify-end",children:e.jsx(r,{href:route("organizations"),className:"p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl",children:e.jsx(f,{size:"27"})})})}function d(){return e.jsxs("div",{className:"border-gray-300 border-r-[1px] fixed -left-16 hover:left-0 sm:left-0 top-0 bottom-0 min-w-16 w-0 sm:w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE] overflow-clip",children:[e.jsx("button",{className:"fixed size-16 left-0 top-0 flex sm:hidden items-center justify-center cursor-default",children:e.jsx(p,{size:"27"})}),e.jsxs("div",{className:"flex z-10",children:[e.jsx("div",{className:"min-h-16 min-w-16 size-16 flex items-center justify-center p-2",children:e.jsx("img",{src:o,alt:"test",className:"bg-cover rounded-full"})}),e.jsx("div",{className:"text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-32 overflow-clip",children:e.jsx("div",{className:"w-32 min-w-32",children:a})})]}),e.jsxs("nav",{className:"flex-1 flex flex-col space-y-3 ml-2 my-2 transition-all group-hover:mr-0 ease-in-out duration-300",children:[e.jsx(t,{icon:e.jsx(j,{size:"100%"}),href:route("admin.editpage",{orgID:s}),desc:"Manage",current:["admin.editpage","admin.invite"].includes(route().current())}),e.jsx(t,{icon:e.jsx(v,{size:"100%"}),href:route("admin.applications",{orgID:s}),desc:"Recruitment",current:["admin.applications","admin.forms","admin.formbuilder","admin.formhistory"].includes(route().current())})]})]});function t({icon:c,href:x,desc:h,current:m}){return e.jsx("div",{className:"flex",children:e.jsxs(r,{className:`flex items-center py-2 pl-3 rounded-l-full overflow-x-clip w-full ${m&&"bg-[#FFBC58]"||"hover:bg-gray-800 hover:text-white"}`,href:x,children:[e.jsx("div",{className:"min-h-7 min-w-7 size-7",children:c}),e.jsx("div",{className:"text-left poppins text-lg overflow-hidden h-min w-full invisible group-hover:visible ml-3 transition-all",children:h})]})})}}}export{b as A};
