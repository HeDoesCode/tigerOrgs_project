import{R as l,j as s}from"./app-Kp9HHh1H.js";const x=({children:t,className:n,error:r,title:i})=>{const a=l.Children.toArray(t).some(e=>l.isValidElement(e)&&e.props.required),d=l.Children.map(t,e=>{if(l.isValidElement(e)){if(e.type==="input"){const m=e.props.className||"";return l.cloneElement(e,{className:`${m} border-none h-full`.trim()})}return e}return e});return s.jsxs("div",{className:"flex flex-col",children:[s.jsxs("div",{className:"w-full flex justify-between gap-x-1 items-end",children:[s.jsxs("label",{className:"h-fit flex-1 flex-wrap leading-[1.15rem]",children:[i," ",a&&s.jsx("span",{className:"text-red-500 text-xl leading-3",children:"*"})]}),s.jsx("div",{className:`mt-2 flex items-end text-[0.7rem] leading-[0.8rem] py-1 px-2 max-w-32 h-fit text-white rounded-t-lg bg-red-500 ${r?"":"invisible"}`,children:r})]}),s.jsx("div",{className:`w-full min-h-9 bg-white border overflow-clip ${r?"border-red-500 rounded-b-lg rounded-l-lg":"border-gray-300 rounded-lg"} ${n}`,children:d})]})};export{x as default};
