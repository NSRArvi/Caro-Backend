import{r as m,K as O,j as s,L as P,$ as k}from"./app-TczWrD66.js";import{A as F}from"./app-layout-zvqnex-e.js";/* empty css            */import"./app-logo-icon-aGxoJXDG.js";import"./index-Cp1WD6q4.js";import"./index-Cgp0GNV7.js";let V={data:""},H=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||V,T=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,W=/\/\*[^]*?\*\/|  +/g,S=/\n+/g,f=(e,t)=>{let r="",a="",o="";for(let n in e){let i=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+i+";":a+=n[1]=="f"?f(i,n):n+"{"+f(i,n[1]=="k"?"":t)+"}":typeof i=="object"?a+=f(i,t?t.replace(/([^,])+/g,l=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,l):l?l+" "+d:d)):n):i!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=f.p?f.p(n,i):n+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},x={},R=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+R(e[r]);return t}return e},G=(e,t,r,a,o)=>{let n=R(e),i=x[n]||(x[n]=(d=>{let p=0,u=11;for(;p<d.length;)u=101*u+d.charCodeAt(p++)>>>0;return"go"+u})(n));if(!x[i]){let d=n!==e?e:(p=>{let u,b,y=[{}];for(;u=T.exec(p.replace(W,""));)u[4]?y.shift():u[3]?(b=u[3].replace(S," ").trim(),y.unshift(y[0][b]=y[0][b]||{})):y[0][u[1]]=u[2].replace(S," ").trim();return y[0]})(e);x[i]=f(o?{["@keyframes "+i]:d}:d,r?"":"."+i)}let l=r&&x.g?x.g:null;return r&&(x.g=x[i]),((d,p,u,b)=>{b?p.data=p.data.replace(b,d):p.data.indexOf(d)===-1&&(p.data=u?d+p.data:p.data+d)})(x[i],t,a,l),i},q=(e,t,r)=>e.reduce((a,o,n)=>{let i=t[n];if(i&&i.call){let l=i(r),d=l&&l.props&&l.props.className||/^go/.test(l)&&l;i=d?"."+d:l&&typeof l=="object"?l.props?"":f(l,""):l===!1?"":l}return a+o+(i??"")},"");function N(e){let t=this||{},r=e.call?e(t.p):e;return G(r.unshift?r.raw?q(r,[].slice.call(arguments,1),t.p):r.reduce((a,o)=>Object.assign(a,o&&o.call?o(t.p):o),{}):r,H(t.target),t.g,t.o,t.k)}let I,$,E;N.bind({g:1});let g=N.bind({k:1});function Z(e,t,r,a){f.p=t,I=e,$=r,E=a}function h(e,t){let r=this||{};return function(){let a=arguments;function o(n,i){let l=Object.assign({},n),d=l.className||o.className;r.p=Object.assign({theme:$&&$()},l),r.o=/ *go\d+/.test(d),l.className=N.apply(r,a)+(d?" "+d:"");let p=e;return e[0]&&(p=l.as||e,delete l.as),E&&p[0]&&E(l),I(p,l)}return o}}var K=e=>typeof e=="function",L=(e,t)=>K(e)?e(t):e,Q=(()=>{let e=0;return()=>(++e).toString()})(),U=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Y=20,z="default",M=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(i=>i.id===t.toast.id?{...i,...t.toast}:i)};case 2:let{toast:a}=t;return M(e,{type:e.toasts.find(i=>i.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(i=>i.id===o||o===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+n}))}}},J=[],X={toasts:[],pausedAt:void 0,settings:{toastLimit:Y}},j={},D=(e,t=z)=>{j[t]=M(j[t]||X,e),J.forEach(([r,a])=>{r===t&&a(j[t])})},B=e=>Object.keys(j).forEach(t=>D(e,t)),ee=e=>Object.keys(j).find(t=>j[t].toasts.some(r=>r.id===e)),_=(e=z)=>t=>{D(t,e)},te=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||Q()}),w=e=>(t,r)=>{let a=te(t,e,r);return _(a.toasterId||ee(a.id))({type:2,toast:a}),a.id},c=(e,t)=>w("blank")(e,t);c.error=w("error");c.success=w("success");c.loading=w("loading");c.custom=w("custom");c.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):B(r)};c.dismissAll=e=>c.dismiss(void 0,e);c.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):B(r)};c.removeAll=e=>c.remove(void 0,e);c.promise=(e,t,r)=>{let a=c.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let n=t.success?L(t.success,o):void 0;return n?c.success(n,{id:a,...r,...r==null?void 0:r.success}):c.dismiss(a),o}).catch(o=>{let n=t.error?L(t.error,o):void 0;n?c.error(n,{id:a,...r,...r==null?void 0:r.error}):c.dismiss(a)}),e};var re=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,se=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ie=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ae} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,oe=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ne=h("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${oe} 1s linear infinite;
`,le=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,de=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ce=h("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${le} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,me=h("div")`
  position: absolute;
`,pe=h("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ue=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,xe=h("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ue} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ge=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?m.createElement(xe,null,t):t:r==="blank"?null:m.createElement(pe,null,m.createElement(ne,{...a}),r!=="loading"&&m.createElement(me,null,r==="error"?m.createElement(ie,{...a}):m.createElement(ce,{...a})))},fe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,he=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,be="0%{opacity:0;} 100%{opacity:1;}",ye="0%{opacity:1;} 100%{opacity:0;}",ve=h("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,je=h("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,we=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=U()?[be,ye]:[fe(r),he(r)];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};m.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?we(e.position||t||"top-center",e.visible):{opacity:0},n=m.createElement(ge,{toast:e}),i=m.createElement(je,{...e.ariaProps},L(e.message,e));return m.createElement(ve,{className:e.className,style:{...o,...r,...e.style}},typeof a=="function"?a({icon:n,message:i}):m.createElement(m.Fragment,null,n,i))});Z(m.createElement);N`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Ne=c;const ke={1:"Pending",2:"Approved",3:"Rejected"},A={1:{badge:"bg-yellow-100 text-yellow-800",dot:"bg-yellow-500"},2:{badge:"bg-green-100 text-green-800",dot:"bg-green-600"},3:{badge:"bg-red-100 text-red-800",dot:"bg-red-600"}};function C({status:e}){const t=A[e]??A[1];return s.jsxs("span",{className:`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${t.badge}`,children:[s.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${t.dot}`}),ke[e]??"Pending"]})}function $e({name:e,image:t,onImageClick:r}){const a=(e==null?void 0:e.split(" ").map(o=>o[0]).join("").toUpperCase().slice(0,2))??"?";return t?s.jsx("img",{src:t,alt:e,onClick:r,className:"w-20 h-20 rounded-full object-cover border-2 border-white shadow cursor-pointer hover:opacity-80 transition"}):s.jsx("div",{className:"w-20 h-20 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-bold border-2 border-white shadow",children:a})}function v({label:e,value:t}){return s.jsxs("div",{className:"flex flex-col gap-0.5 py-2 border-b border-gray-100 last:border-0",children:[s.jsx("span",{className:"text-xs text-gray-500",children:e}),s.jsx("span",{className:"text-sm font-medium text-gray-900",children:t||"—"})]})}function Ee({imageUrl:e,onClose:t}){return m.useEffect(()=>{const r=a=>{a.key==="Escape"&&t()};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[t]),s.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",onClick:t,children:s.jsxs("div",{className:"relative max-w-4xl max-h-[90vh] flex items-center justify-center",onClick:r=>r.stopPropagation(),children:[s.jsx("img",{src:e,alt:"Enlarged view",className:"max-w-full max-h-[90vh] object-contain rounded-lg"}),s.jsx("button",{onClick:t,className:"absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg",children:s.jsx("svg",{className:"w-5 h-5 text-gray-700",viewBox:"0 0 16 16",fill:"none",children:s.jsx("path",{d:"M4 4L12 12M12 4L4 12",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})})]})})}function Ie(){const{rider:e,toastMessage:t}=O().props,[r,a]=m.useState(null);return m.useEffect(()=>{t&&Ne.success(t)},[t]),s.jsxs(F,{children:[s.jsx(P,{title:`Rider Review - ${e.name}`}),r&&s.jsx(Ee,{imageUrl:r,onClose:()=>a(null)}),s.jsx("div",{className:"p-4 md:p-8 w-full space-y-6",children:s.jsxs("div",{className:"max-w-7xl mx-auto space-y-6",children:[s.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[s.jsxs("div",{children:[s.jsx(k,{href:route("riders.account.review.request"),className:"text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2",children:"← Back to Riders"}),s.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Rider Review"})]}),s.jsx(C,{status:e.review_status??1})]}),s.jsxs("div",{className:"bg-white border border-gray-200 rounded-xl p-6",children:[s.jsx("h2",{className:"text-sm font-semibold text-gray-700 mb-5",children:"Rider Information"}),s.jsxs("div",{className:"flex flex-col lg:flex-row gap-8",children:[s.jsx("div",{className:"flex-shrink-0",children:s.jsx($e,{name:e.name,image:e.profile_image,onImageClick:()=>e.profile_image&&a(e.profile_image)})}),s.jsxs("div",{className:"flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3",children:[s.jsx(v,{label:"Full Name",value:e.name}),s.jsx(v,{label:"Email",value:e.email}),s.jsx(v,{label:"Phone",value:e.phone_number}),s.jsx(v,{label:"Gender",value:e.gender}),s.jsx(v,{label:"Date of Birth",value:e.dob}),s.jsx(v,{label:"Member Since",value:new Date(e.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})})]})]})]}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-sm font-semibold text-gray-700 mb-4",children:"Submitted Documents"}),e.user_riders.length>0?s.jsx("div",{className:"space-y-5",children:e.user_riders.map(o=>{const n=o.review_status??1;return s.jsxs("div",{className:"bg-white border border-gray-200 rounded-xl p-6",children:[s.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-sm font-semibold text-gray-900",children:o.document_type}),s.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["#",o.document_number]})]}),s.jsx(C,{status:n})]}),o.remarks&&s.jsx("div",{className:"bg-yellow-50 border border-yellow-100 rounded-lg px-4 py-3 mb-5",children:s.jsxs("p",{className:"text-xs text-yellow-800",children:[s.jsx("span",{className:"font-semibold",children:"Remarks: "}),o.remarks]})}),o.document.length>0&&s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4",children:o.document.map((i,l)=>s.jsx("button",{onClick:()=>a(i),className:"block group text-left",children:s.jsxs("div",{className:"relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50",children:[s.jsx("img",{src:i,alt:`${o.document_type} ${l+1}`,className:"w-full h-56 object-cover group-hover:opacity-75 transition cursor-pointer"}),s.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition",children:s.jsxs("svg",{className:"w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition",viewBox:"0 0 24 24",fill:"none",children:[s.jsx("path",{d:"M21 21H3V3h9V1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9h-2v9z",fill:"currentColor"}),s.jsx("path",{d:"M19 4h-3V1h-2v3h-3v2h3v3h2V6h3V4z",fill:"currentColor"})]})})]})},l))}),s.jsxs("p",{className:"text-xs text-gray-400",children:["Submitted: ",new Date(o.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})]})]},o.id)})}):s.jsx("div",{className:"bg-white border border-gray-200 rounded-xl p-12 text-center",children:s.jsx("p",{className:"text-sm text-gray-400",children:"No documents submitted yet"})})]}),s.jsxs("div",{className:"bg-white border border-gray-200 rounded-xl p-6",children:[s.jsx("p",{className:"text-xs text-gray-500 mb-4",children:"Take action on this rider's account"}),s.jsxs("div",{className:"flex gap-3 flex-wrap",children:[s.jsxs(k,{href:route("riders.rider.account.approve",{user_id:e.id,status_type:2}),className:"inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors",children:[s.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 16 16",fill:"none",children:s.jsx("path",{d:"M3 8.5L6.5 12L13 5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),"Approve Rider"]}),s.jsxs(k,{href:route("riders.rider.account.approve",{user_id:e.id,status_type:3}),className:"inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded-lg transition-colors",children:[s.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 16 16",fill:"none",children:s.jsx("path",{d:"M4 4L12 12M12 4L4 12",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})}),"Reject Rider"]})]})]})]})})]})}export{Ie as default};
