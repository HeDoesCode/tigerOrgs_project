import{r as u,j as e,y as d}from"./app-CAIQM8jh.js";import{P as f,a as m,b as s,c as x,d as h,e as j,f as v}from"./pagination-CYP6Qb1i.js";function E({page:l,params:i=void 0,preserveScroll:o=!0,preserveState:c=!0}){function r(){const n=document.getElementById("scroll-target");n&&n.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}u.useEffect(()=>(r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}),[l]);function a(n=!1){n&&d.get(n,{params:i},{preserveState:c,preserveScroll:o,replace:!0})}return e.jsx("div",{className:"max-w-full w-fit flex justify-between shadow-md shadow-black/40 py-1 bg-[#EEEEEE] rounded-full overflow-clip px-1",children:e.jsx(f,{className:"contents",children:e.jsxs(m,{className:"contents",children:[e.jsx(s,{children:e.jsx(x,{onClick:()=>a(l.links[0].url),className:`rounded-l-full h-full ${l.current_page===1&&"cursor-not-allowed hover:bg-transparent"}`})}),e.jsx("div",{className:"flex flex-row flex-1 overflow-x-auto scrollbar-thin",children:l.links.map((n,t)=>t!==0&&t!==l.links.length-1?n.label==="..."?e.jsx(s,{children:e.jsx(h,{})},t):e.jsx(s,{id:n.active!==!1?"scroll-target":"",children:e.jsx(j,{onClick:()=>a(n.url),isActive:n.active,children:n.label})},t):null)}),e.jsx(s,{children:e.jsx(v,{onClick:()=>a(l.links[l.links.length-1].url),className:`rounded-r-full h-full ${l.current_page===l.last_page&&"cursor-not-allowed hover:bg-transparent"}`})})]})})})}export{E as C};
