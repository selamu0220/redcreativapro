exports.id=856,exports.ids=[856],exports.modules={4861:e=>{e.exports={layout:"AppLayout_layout__O4zIa",sidebar:"AppLayout_sidebar__TjS_o",sidebarContent:"AppLayout_sidebarContent__yf5WD",sidebarHeader:"AppLayout_sidebarHeader__TCGIJ",sidebarNav:"AppLayout_sidebarNav__4wP_U",mainContent:"AppLayout_mainContent__hf7mM",topBar:"AppLayout_topBar___A8Fv",topBarContent:"AppLayout_topBarContent__rC0wm",topBarLeft:"AppLayout_topBarLeft__QprPO",topBarRight:"AppLayout_topBarRight__2YeMB",refreshButton:"AppLayout_refreshButton__11QG5",refreshIcon:"AppLayout_refreshIcon__OfcPU",authButton:"AppLayout_authButton__OnZww",authIcon:"AppLayout_authIcon__t90fe",presentationButton:"AppLayout_presentationButton__idTBF",contentArea:"AppLayout_contentArea__GcjLF",scrollableContent:"AppLayout_scrollableContent__4ZKdj",contentPadding:"AppLayout_contentPadding__5cHTn",verificationBanner:"AppLayout_verificationBanner__wosvE",mobileToggle:"AppLayout_mobileToggle__UGZwF",desktopNav:"AppLayout_desktopNav__khNY1",userSection:"AppLayout_userSection___EFPC",searchSection:"AppLayout_searchSection__xb4_7",actionButtons:"AppLayout_actionButtons__YpHsc"}},7566:(e,t,a)=>{"use strict";a.d(t,{dj:()=>m,oR:()=>u});var s=a(43210);let i=0,r=new Map,n=e=>{if(r.has(e))return;let t=setTimeout(()=>{r.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);r.set(e,t)},o=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:a}=t;return a?n(a):e.toasts.forEach(e=>{n(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],c={toasts:[]};function d(e){c=o(c,e),l.forEach(e=>{e(c)})}function u({...e}){let t=(i=(i+1)%Number.MAX_SAFE_INTEGER).toString(),a=()=>d({type:"DISMISS_TOAST",toastId:t});return d({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:e=>{e||a()}}}),{id:t,dismiss:a,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:t}})}}function m(){let[e,t]=s.useState(c);return s.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}},30829:(e,t,a)=>{"use strict";a.d(t,{o:()=>p});var s=a(60687),i=a(43210),r=a.n(i),n=a(63772),o=a(13785),l=a(7566),c=a(19169),d=a(78122),u=a(11860),m=a(80084);function p(){let{needsEmailVerification:e,pendingVerificationEmail:t,clearEmailVerification:a}=(0,n.A)(),{toast:i}=(0,l.dj)(),[p,h]=r().useState(!1);if(!e||!t)return null;let x=async()=>{h(!0);try{let{error:e}=await m.N.auth.resend({type:"signup",email:t});if(e)throw e;i({title:"\uD83D\uDCE7 Email reenviado",description:"Hemos enviado un nuevo enlace de verificaci\xf3n a tu correo.",duration:5e3})}catch(e){console.error("Error resending email:",e),i({variant:"destructive",title:"Error al reenviar",description:"No pudimos reenviar el email. Int\xe9ntalo de nuevo m\xe1s tarde."})}finally{h(!1)}};return(0,s.jsx)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:(0,s.jsxs)("div",{className:"flex items-start space-x-3",children:[(0,s.jsx)(c.A,{className:"h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h3",{className:"text-sm font-semibold text-blue-900 mb-1",children:"\uD83D\uDCE7 Verifica tu direcci\xf3n de email"}),(0,s.jsxs)("p",{className:"text-sm text-blue-700 mb-3",children:["Hemos enviado un enlace de verificaci\xf3n a"," ",(0,s.jsx)("span",{className:"font-medium",children:t}),". Haz clic en el enlace para activar tu cuenta."]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2",children:[(0,s.jsx)(o.$,{variant:"outline",size:"sm",onClick:x,disabled:p,className:"text-blue-700 border-blue-300 hover:bg-blue-100",children:p?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.A,{className:"h-4 w-4 mr-2 animate-spin"}),"Reenviando..."]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.A,{className:"h-4 w-4 mr-2"}),"Reenviar email"]})}),(0,s.jsxs)(o.$,{variant:"ghost",size:"sm",onClick:a,className:"text-blue-700 hover:bg-blue-100",children:[(0,s.jsx)(u.A,{className:"h-4 w-4 mr-2"}),"Cerrar"]})]}),(0,s.jsxs)("p",{className:"text-xs text-blue-600 mt-2",children:["\uD83D\uDCA1 ",(0,s.jsx)("strong",{children:"Tip:"})," Si no ves el email, revisa tu carpeta de spam o correo no deseado"]})]})]})})}},36856:(e,t,a)=>{"use strict";a.d(t,{default:()=>em});var s=a(60687),i=a(16189),r=a(4861),n=a.n(r),o=a(43210),l=a(22857),c=a(10022),d=a(40228),u=a(56085),m=a(9005),p=a(2943),h=a(74808),x=a(58887),g=a(82080),v=a(27351),f=a(18179),j=a(62140),y=a(13785);function b({currentView:e}){let t=(0,i.useRouter)(),a=(0,o.useCallback)(a=>{e===a.replace("/","")?window.location.reload():t.push(a)},[e,t]);return(0,s.jsxs)("div",{className:"flex items-center gap-6",children:[(0,s.jsxs)("button",{onClick:()=>a("/blog"),className:"flex items-center space-x-2",children:[(0,s.jsx)("div",{className:"w-8 h-8",children:(0,s.jsxs)("svg",{viewBox:"0 0 100 100",className:"w-full h-full fill-current",children:[(0,s.jsx)("path",{d:"M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"}),(0,s.jsx)("path",{d:"M65 35H35c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V37c0-1.1-.9-2-2-2zm-5 20H40v-4h20v4zm0-8H40v-4h20v4z"})]})}),(0,s.jsx)("div",{className:"flex items-center gap-2",children:(0,s.jsx)("span",{className:"hidden font-bold lg:inline-block",children:"Red Creativa"})})]}),(0,s.jsxs)("nav",{className:"flex items-center gap-1",children:[(0,s.jsxs)("button",{onClick:()=>a("/recursos"),className:(0,l.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","recursos"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,s.jsx)(c.A,{className:"h-4 w-4"}),"Recursos"]}),(0,s.jsxs)("button",{onClick:()=>a("/calendario"),className:(0,l.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","calendario"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,s.jsx)(d.A,{className:"h-4 w-4"}),"Calendario"]}),(0,s.jsxs)("button",{onClick:()=>a("/scripts"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","scripts"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(c.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Guiones"})]}),(0,s.jsxs)("button",{onClick:()=>a("/prompts"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","prompts"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(u.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Prompts"})]}),(0,s.jsxs)("button",{onClick:()=>a("/miniaturas"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","miniaturas"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(m.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Miniaturas"})]}),(0,s.jsxs)("button",{onClick:()=>a("/editor-video"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","editor-video"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(p.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Editor Video"})]}),(0,s.jsxs)("button",{onClick:()=>a("/tareas"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","tareas"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(h.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Tareas"})]}),(0,s.jsxs)("button",{onClick:()=>a("/chat"),className:(0,l.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","chat"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,s.jsx)(x.A,{className:"h-4 w-4"}),"Chat"]}),(0,s.jsxs)("button",{onClick:()=>a("/blog"),className:(0,l.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","blog"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,s.jsx)(g.A,{className:"h-4 w-4"}),"Blog"]}),(0,s.jsxs)("button",{onClick:()=>a("/aprendizaje"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","aprendizaje"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(v.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Aprendizaje"})]}),(0,s.jsxs)("button",{onClick:()=>a("/proyectos"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","proyectos"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(f.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"Proyectos"})]}),(0,s.jsxs)("button",{onClick:()=>a("/svg-viewer"),className:(0,l.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","svg-viewer"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,s.jsx)(j.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"hidden md:inline",children:"SVG Viewer"})]}),(0,s.jsx)(y.$,{variant:"outline",size:"sm",className:"ml-2 font-semibold cursor-not-allowed opacity-60",disabled:!0,children:"Pr\xf3ximamente"})]})]})}var N=a(22516),A=a(98971),w=a(84113),C=a(58869);function k({currentView:e,onShowLanding:t}){let a=(0,i.useRouter)();(0,i.usePathname)();let r=t=>{e===t?window.location.reload():a.push(`/${t}`)},n=[{title:"Blog",icon:(0,s.jsx)(g.A,{className:"h-5 w-5"}),view:"blog",variant:"blog"===e?"default":"ghost"},{title:"Recursos",icon:(0,s.jsx)(A.A,{className:"h-5 w-5"}),view:"recursos",variant:"recursos"===e?"default":"ghost"},{title:"Calendario",icon:(0,s.jsx)(d.A,{className:"h-5 w-5"}),view:"calendario",variant:"calendario"===e?"default":"ghost"},{title:"Guiones",icon:(0,s.jsx)(c.A,{className:"h-5 w-5"}),view:"scripts",variant:"scripts"===e?"default":"ghost"},{title:"Prompts",icon:(0,s.jsx)(u.A,{className:"h-5 w-5"}),view:"prompts",variant:"prompts"===e?"default":"ghost"},{title:"Miniaturas",icon:(0,s.jsx)(m.A,{className:"h-5 w-5"}),view:"miniaturas",variant:"miniaturas"===e?"default":"ghost"},{title:"Editor de Video",icon:(0,s.jsx)(p.A,{className:"h-5 w-5"}),view:"editor-video",variant:"editor-video"===e?"default":"ghost"},{title:"Tareas",icon:(0,s.jsx)(h.A,{className:"h-5 w-5"}),view:"tareas",variant:"tareas"===e?"default":"ghost"},{title:"Chat",icon:(0,s.jsx)(x.A,{className:"h-5 w-5"}),view:"chat",variant:"chat"===e?"default":"ghost"},{title:"Aprendizaje",icon:(0,s.jsx)(v.A,{className:"h-5 w-5"}),view:"aprendizaje",variant:"aprendizaje"===e?"default":"ghost"},{title:"Proyectos",icon:(0,s.jsx)(f.A,{className:"h-5 w-5"}),view:"proyectos",variant:"proyectos"===e?"default":"ghost"},{title:"SVG Viewer",icon:(0,s.jsx)(j.A,{className:"h-5 w-5"}),view:"svg-viewer",variant:"svg-viewer"===e?"default":"ghost"},{title:"Sobre Red Creativa",icon:(0,s.jsx)(w.A,{className:"h-5 w-5"}),view:"sobre-red-creativa",variant:"sobre-red-creativa"===e?"default":"ghost"},{title:"Sobre el Creador",icon:(0,s.jsx)(C.A,{className:"h-5 w-5"}),view:"sobre-el-creador",variant:"sobre-el-creador"===e?"default":"ghost"}];return(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"px-2",children:[(0,s.jsx)("h2",{className:"mb-3 px-2 text-sm font-medium tracking-wide uppercase text-muted-foreground",children:"Navegaci\xf3n Principal"}),(0,s.jsx)("div",{className:"space-y-1",children:n.map(e=>(0,s.jsxs)("button",{onClick:()=>r(e.view),className:(0,l.cn)("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-accent-foreground w-full text-left leading-none","default"===e.variant?"bg-accent text-accent-foreground":"text-muted-foreground hover:bg-accent"),children:[e.icon,(0,s.jsx)("span",{className:"truncate",children:e.title})]},e.view))}),(0,s.jsx)(N.w,{}),(0,s.jsx)("div",{className:"px-2 space-y-2",children:(0,s.jsx)(y.$,{variant:"ghost",size:"sm",className:"w-full justify-start",onClick:t,children:"\uD83C\uDFAF Presentaci\xf3n"})})]})})}var _=a(97354),I=a(63772),T=a(7566),P=a(64234),S=a(4785),M=a(41980),E=a(95269),B=a(56167),L=a(84361),z=a(92363),R=a(85778),D=a(84027),G=a(40083);function O(){let{user:e,logout:t,hasActiveSubscription:a}=(0,I.A)(),[i,r]=(0,o.useState)(!1),[n,l]=(0,o.useState)("gemini"),[c,d]=(0,o.useState)("gemini-pro"),[u,m]=(0,o.useState)(""),[p,h]=(0,o.useState)(""),[x,g]=(0,o.useState)(.7),[v,f]=(0,o.useState)(2048),{toast:j}=(0,T.dj)(),b=(e,t)=>{let a=e.trim();if(!a)return j({title:"API Key requerida",description:"Por favor, ingresa una API key v\xe1lida",variant:"destructive"}),!1;switch(t){case"gemini":if(!a.startsWith("AI")||a.length<40)return j({title:"API Key inv\xe1lida",description:"La API key de Google AI Studio debe comenzar con 'AI' y tener al menos 40 caracteres",variant:"destructive"}),!1;break;case"openai":if(!a.startsWith("sk-")||a.length<40)return j({title:"API Key inv\xe1lida",description:"La API key de OpenAI debe comenzar con 'sk-' y tener al menos 40 caracteres",variant:"destructive"}),!1;break;case"anthropic":if(!a.startsWith("sk-ant-")||a.length<40)return j({title:"API Key inv\xe1lida",description:"La API key de Anthropic debe comenzar con 'sk-ant-' y tener al menos 40 caracteres",variant:"destructive"}),!1;break;case"cohere":if(a.length<20)return j({title:"API Key inv\xe1lida",description:"La API key de Cohere debe tener al menos 20 caracteres",variant:"destructive"}),!1;break;case"mistral":if(a.length<20)return j({title:"API Key inv\xe1lida",description:"La API key de Mistral debe tener al menos 20 caracteres",variant:"destructive"}),!1}return!0};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(S.lG,{open:i,onOpenChange:r,children:[(0,s.jsxs)(M.rI,{children:[(0,s.jsx)(M.ty,{asChild:!0,children:(0,s.jsx)(y.$,{variant:"ghost",className:"relative h-10 w-10 rounded-full","aria-label":"User menu",children:(0,s.jsxs)(P.eu,{className:"h-10 w-10",children:[(0,s.jsx)(P.BK,{src:"https://avatars.githubusercontent.com/u/124599?v=4",alt:e?.name||"User avatar"}),(0,s.jsx)(P.q5,{children:e?.name?.charAt(0)||"U"})]})})}),(0,s.jsxs)(M.SQ,{className:"w-56",align:"end",forceMount:!0,children:[(0,s.jsx)(M.lp,{className:"font-normal",children:(0,s.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("p",{className:"text-sm font-medium leading-none",children:e?.name||"John Doe"}),a()&&(0,s.jsxs)("div",{className:"flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full",children:[(0,s.jsx)(z.A,{className:"h-3 w-3"}),(0,s.jsx)("span",{children:"PRO"})]})]}),(0,s.jsx)("p",{className:"text-xs leading-none text-muted-foreground",children:e?.email||"john@example.com"}),a()&&(0,s.jsx)("p",{className:"text-xs leading-none text-green-600 font-medium",children:"Plan Pro Activo"})]})}),(0,s.jsx)(M.mB,{}),(0,s.jsxs)(M.I,{children:[(0,s.jsxs)(M._2,{children:[(0,s.jsx)(C.A,{className:"mr-2 h-4 w-4"}),(0,s.jsx)("span",{children:"Perfil"})]}),(0,s.jsxs)(M._2,{children:[(0,s.jsx)(R.A,{className:"mr-2 h-4 w-4"}),(0,s.jsx)("span",{children:"Facturaci\xf3n"})]}),(0,s.jsxs)(M._2,{onClick:()=>r(!0),children:[(0,s.jsx)(D.A,{className:"mr-2 h-4 w-4"}),(0,s.jsx)("span",{children:"Ajustes"})]})]}),(0,s.jsx)(M.mB,{}),(0,s.jsxs)(M._2,{onClick:t,children:[(0,s.jsx)(G.A,{className:"mr-2 h-4 w-4"}),(0,s.jsx)("span",{children:"Cerrar sesi\xf3n"})]})]})]}),(0,s.jsxs)(S.Cf,{className:"sm:max-w-[425px]",children:[(0,s.jsx)(S.c7,{children:(0,s.jsx)(S.L3,{children:"Ajustes de IA"})}),(0,s.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"Proveedor de IA"}),(0,s.jsxs)(L.l6,{value:n,onValueChange:e=>l(e),children:[(0,s.jsx)(L.bq,{children:(0,s.jsx)(L.yv,{placeholder:"Selecciona un proveedor"})}),(0,s.jsxs)(L.gC,{children:[(0,s.jsx)(L.eb,{value:"gemini",children:"Google Gemini"}),(0,s.jsx)(L.eb,{value:"openai",children:"OpenAI"}),(0,s.jsx)(L.eb,{value:"anthropic",children:"Anthropic/Claude"}),(0,s.jsx)(L.eb,{value:"cohere",children:"Cohere"}),(0,s.jsx)(L.eb,{value:"mistral",children:"Mistral AI"})]})]})]}),(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"Modelo"}),(0,s.jsxs)(L.l6,{value:c,onValueChange:e=>d(e),children:[(0,s.jsx)(L.bq,{children:(0,s.jsx)(L.yv,{placeholder:"Selecciona un modelo"})}),(0,s.jsx)(L.gC,{children:(()=>{switch(n){case"gemini":return[{value:"gemini-pro",label:"Gemini Pro"},{value:"gemini-1.5-pro",label:"Gemini 1.5 Pro"},{value:"gemini-1.5-flash",label:"Gemini 1.5 Flash"},{value:"gemini-2.0-flash",label:"Gemini 2.0 Flash"}];case"openai":return[{value:"gpt-4",label:"GPT-4"},{value:"gpt-4-turbo",label:"GPT-4 Turbo"},{value:"gpt-4o",label:"GPT-4o"},{value:"gpt-4o-mini",label:"GPT-4o Mini"},{value:"gpt-3.5-turbo",label:"GPT-3.5 Turbo"}];case"anthropic":return[{value:"claude-3-opus",label:"Claude 3 Opus"},{value:"claude-3-sonnet",label:"Claude 3 Sonnet"},{value:"claude-3-haiku",label:"Claude 3 Haiku"},{value:"claude-3-5-sonnet",label:"Claude 3.5 Sonnet"}];case"cohere":return[{value:"command-r",label:"Command R"},{value:"command-r-plus",label:"Command R Plus"},{value:"command-light",label:"Command Light"}];case"mistral":return[{value:"mistral-large",label:"Mistral Large"},{value:"mistral-medium",label:"Mistral Medium"},{value:"mistral-small",label:"Mistral Small"},{value:"codestral",label:"Codestral"}];default:return[]}})().map(e=>(0,s.jsx)(L.eb,{value:e.value,children:e.label},e.value))})]})]}),(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"API Key"}),(0,s.jsx)(E.p,{type:"password",value:u,onChange:e=>m(e.target.value),placeholder:"Ingresa tu API key"}),(0,s.jsx)("div",{className:"text-sm text-muted-foreground",children:(()=>{switch(n){case"gemini":return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{children:"Obt\xe9n tu API key de Google AI Studio:"}),(0,s.jsxs)("ol",{className:"list-decimal list-inside space-y-1 text-sm",children:[(0,s.jsxs)("li",{children:["Ve a ",(0,s.jsx)("a",{href:"https://makersuite.google.com/app/apikey",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"Google AI Studio"})]}),(0,s.jsx)("li",{children:"Inicia sesi\xf3n con tu cuenta de Google"}),(0,s.jsx)("li",{children:"Crea una nueva API key o usa una existente"}),(0,s.jsx)("li",{children:"La key debe comenzar con 'AI'"})]}),(0,s.jsx)("p",{className:"text-sm text-muted-foreground mt-2",children:"Modelos disponibles:"}),(0,s.jsxs)("ul",{className:"list-disc list-inside text-sm space-y-1",children:[(0,s.jsx)("li",{children:"Gemini Pro: Modelo estable"}),(0,s.jsx)("li",{children:"Gemini 1.5 Pro: Modelo avanzado"}),(0,s.jsx)("li",{children:"Gemini 2.0 Flash: Modelo m\xe1s reciente y r\xe1pido"})]})]});case"openai":return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{children:"Obt\xe9n tu API key del panel de OpenAI:"}),(0,s.jsxs)("ol",{className:"list-decimal list-inside space-y-1 text-sm",children:[(0,s.jsxs)("li",{children:["Ve a ",(0,s.jsx)("a",{href:"https://platform.openai.com/api-keys",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"OpenAI Dashboard"})]}),(0,s.jsx)("li",{children:"Crea una nueva API key"}),(0,s.jsx)("li",{children:"La key debe comenzar con 'sk-'"})]}),(0,s.jsx)("p",{className:"text-sm text-muted-foreground mt-2",children:"Modelos disponibles:"}),(0,s.jsxs)("ul",{className:"list-disc list-inside text-sm space-y-1",children:[(0,s.jsx)("li",{children:"GPT-4: Modelo estable"}),(0,s.jsx)("li",{children:"GPT-4 Turbo: Modelo mejorado"}),(0,s.jsx)("li",{children:"GPT-4o: Modelo m\xe1s reciente y potente"}),(0,s.jsx)("li",{children:"GPT-3.5 Turbo: Modelo m\xe1s econ\xf3mico"})]})]});case"anthropic":return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{children:"Obt\xe9n tu API key del panel de Anthropic:"}),(0,s.jsxs)("ol",{className:"list-decimal list-inside space-y-1 text-sm",children:[(0,s.jsxs)("li",{children:["Ve a ",(0,s.jsx)("a",{href:"https://console.anthropic.com/settings/keys",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"Anthropic Console"})]}),(0,s.jsx)("li",{children:"Crea una nueva API key"}),(0,s.jsx)("li",{children:"La key debe comenzar con 'sk-ant-'"})]}),(0,s.jsx)("p",{className:"text-sm text-muted-foreground mt-2",children:"Modelos disponibles:"}),(0,s.jsxs)("ul",{className:"list-disc list-inside text-sm space-y-1",children:[(0,s.jsx)("li",{children:"Claude 3 Opus: Modelo m\xe1s potente"}),(0,s.jsx)("li",{children:"Claude 3 Sonnet: Equilibrio entre rendimiento y velocidad"}),(0,s.jsx)("li",{children:"Claude 3 Haiku: Modelo m\xe1s r\xe1pido"}),(0,s.jsx)("li",{children:"Claude 3.5 Sonnet: Modelo m\xe1s reciente"})]})]});case"cohere":return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{children:"Obt\xe9n tu API key del panel de Cohere:"}),(0,s.jsxs)("ol",{className:"list-decimal list-inside space-y-1 text-sm",children:[(0,s.jsxs)("li",{children:["Ve a ",(0,s.jsx)("a",{href:"https://dashboard.cohere.com/api-keys",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"Cohere Dashboard"})]}),(0,s.jsx)("li",{children:"Crea una nueva API key"})]}),(0,s.jsx)("p",{className:"text-sm text-muted-foreground mt-2",children:"Modelos disponibles:"}),(0,s.jsxs)("ul",{className:"list-disc list-inside text-sm space-y-1",children:[(0,s.jsx)("li",{children:"Command R: Modelo est\xe1ndar"}),(0,s.jsx)("li",{children:"Command R Plus: Modelo avanzado"}),(0,s.jsx)("li",{children:"Command Light: Modelo ligero y r\xe1pido"})]})]});case"mistral":return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{children:"Obt\xe9n tu API key del panel de Mistral:"}),(0,s.jsxs)("ol",{className:"list-decimal list-inside space-y-1 text-sm",children:[(0,s.jsxs)("li",{children:["Ve a ",(0,s.jsx)("a",{href:"https://console.mistral.ai/api-keys/",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"Mistral Console"})]}),(0,s.jsx)("li",{children:"Crea una nueva API key"})]}),(0,s.jsx)("p",{className:"text-sm text-muted-foreground mt-2",children:"Modelos disponibles:"}),(0,s.jsxs)("ul",{className:"list-disc list-inside text-sm space-y-1",children:[(0,s.jsx)("li",{children:"Mistral Large: Modelo m\xe1s potente"}),(0,s.jsx)("li",{children:"Mistral Medium: Equilibrio entre rendimiento y velocidad"}),(0,s.jsx)("li",{children:"Mistral Small: Modelo m\xe1s econ\xf3mico"}),(0,s.jsx)("li",{children:"Codestral: Especializado en c\xf3digo"})]})]});default:return(0,s.jsx)("div",{className:"space-y-2",children:(0,s.jsx)("p",{children:"Selecciona un proveedor de IA para ver las instrucciones."})})}})()})]}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"Temperatura"}),(0,s.jsx)(E.p,{type:"number",min:"0",max:"2",step:"0.1",value:x,onChange:e=>g(parseFloat(e.target.value)),placeholder:"0.7"}),(0,s.jsx)("div",{className:"text-xs text-muted-foreground",children:"Controla la creatividad (0-2)"})]}),(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"Tokens M\xe1ximos"}),(0,s.jsx)(E.p,{type:"number",min:"1",max:"8192",value:v,onChange:e=>f(parseInt(e.target.value)),placeholder:"2048"}),(0,s.jsx)("div",{className:"text-xs text-muted-foreground",children:"Longitud m\xe1xima de respuesta"})]})]}),(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsx)(B.J,{children:"URL Base (Opcional)"}),(0,s.jsx)(E.p,{type:"url",value:p,onChange:e=>h(e.target.value),placeholder:"https://api.ejemplo.com/v1"}),(0,s.jsx)("div",{className:"text-xs text-muted-foreground",children:"Para proveedores personalizados o proxies"})]}),(0,s.jsx)(y.$,{onClick:()=>{if(!b(u,n))return;let e={provider:n,model:c,apiKey:u.trim(),temperature:x,maxTokens:v,...p&&{baseUrl:p.trim()}};localStorage.setItem("aiSettings",JSON.stringify(e)),j({title:"Configuraci\xf3n guardada",description:"La configuraci\xf3n de IA ha sido actualizada"}),r(!1)},className:"w-full",children:"Guardar Configuraci\xf3n"})]})]})]})})}var U=a(99270),F=a(11860),Z=a(72730),V=a(89698),q=a(27072);let H=o.forwardRef(({className:e,...t},a)=>(0,s.jsx)(q.uB,{ref:a,className:(0,l.cn)("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",e),...t}));H.displayName=q.uB.displayName;let $=({children:e,...t})=>(0,s.jsx)(S.lG,{...t,children:(0,s.jsx)(S.Cf,{className:"overflow-hidden p-0",children:(0,s.jsx)(H,{className:"[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",children:e})})}),K=o.forwardRef(({className:e,...t},a)=>(0,s.jsxs)("div",{className:"flex items-center border-b px-3","cmdk-input-wrapper":"",children:[(0,s.jsx)(V.$p$,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),(0,s.jsx)(q.uB.Input,{ref:a,className:(0,l.cn)("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",e),...t})]}));K.displayName=q.uB.Input.displayName;let J=o.forwardRef(({className:e,...t},a)=>(0,s.jsx)(q.uB.List,{ref:a,className:(0,l.cn)("max-h-[300px] overflow-y-auto overflow-x-hidden",e),...t}));J.displayName=q.uB.List.displayName;let Q=o.forwardRef((e,t)=>(0,s.jsx)(q.uB.Empty,{ref:t,className:"py-6 text-center text-sm",...e}));Q.displayName=q.uB.Empty.displayName;let W=o.forwardRef(({className:e,...t},a)=>(0,s.jsx)(q.uB.Group,{ref:a,className:(0,l.cn)("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",e),...t}));W.displayName=q.uB.Group.displayName,o.forwardRef(({className:e,...t},a)=>(0,s.jsx)(q.uB.Separator,{ref:a,className:(0,l.cn)("-mx-1 h-px bg-border",e),...t})).displayName=q.uB.Separator.displayName;let Y=o.forwardRef(({className:e,...t},a)=>(0,s.jsx)(q.uB.Item,{ref:a,className:(0,l.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",e),...t}));async function X(e,t,a){let s=[],i=e.toLowerCase().split(/\s+/).filter(Boolean);return t.posts&&(!a?.type||a.type.includes("blog"))&&(s=[...s,...t.posts.map(e=>({id:e.id,type:"blog",title:e.title,description:e.excerpt,tags:e.tags,date:e.createdAt,relevance:ee(i,e.title,e.content,e.tags),url:`/blog/${e.id}`}))]),t.resources&&(!a?.type||a.type.includes("resource"))&&(s=[...s,...t.resources.map(e=>({id:e.id,type:"resource",title:e.title,description:e.description,tags:e.tags,url:e.url,relevance:1.5*ee(i,e.title,e.description||"",e.tags)}))]),t.scripts&&(!a?.type||a.type.includes("script"))&&(s=[...s,...t.scripts.map(e=>({id:e.id,type:"script",title:e.title,description:e.content.slice(0,150)+"...",tags:e.tags,date:e.updatedAt,relevance:ee(i,e.title,e.content,e.tags)}))]),t.events&&(!a?.type||a.type.includes("event"))&&(s=[...s,...t.events.map(e=>({id:e.id,type:"event",title:e.title,description:e.description,date:e.start,relevance:ee(i,e.title,e.description||"",[]),url:`/calendar?event=${e.id}`}))]),a?.dateRange&&(s=s.filter(e=>{if(!e.date)return!0;let t=new Date(e.date);return t>=a.dateRange.start&&t<=a.dateRange.end})),a?.tags&&a.tags.length>0&&(s=s.filter(e=>e.tags?.some(e=>a.tags.includes(e)))),s.sort((e,t)=>t.relevance-e.relevance)}function ee(e,t,a,s){let i=0,r=t.toLowerCase(),n=a.toLowerCase(),o=s.map(e=>e.toLowerCase());for(let t of e)r===t?i+=20:r.includes(t)&&(i+=10),o.includes(t)?i+=8:o.some(e=>e.includes(t))&&(i+=5),n.includes(t)&&(i+=3);return i}Y.displayName=q.uB.Item.displayName;var et=a(85140),ea=a(94226),es=a(86734),ei=a(52435),er=a(52648),en=a(62);function eo(){let[e,t]=(0,o.useState)(!1),[a,r]=(0,o.useState)(""),[n,l]=(0,o.useState)([]),[u,m]=(0,o.useState)(!1),{isAuthenticated:p}=(0,I.A)(),{toast:h}=(0,T.dj)(),x=(0,i.useRouter)();(0,o.useCallback)(async e=>{if(!e.trim())return void l([]);m(!0);try{let t=await X(e,{posts:et.s,events:ea._,resources:es.Q,scripts:ei.j});l(t)}catch(e){console.error("Error searching content:",e),h({title:"Error en la b\xfasqueda",description:e.message||"No se pudo realizar la b\xfasqueda",variant:"destructive"}),l([])}finally{m(!1)}},[h]);let v=e=>{if(!p&&("resource"===e.type||"script"===e.type))return void h({title:"Acceso restringido",description:"Reg\xedstrate o inicia sesi\xf3n para acceder a este contenido",variant:"destructive"});t(!1),e.url&&x.push(e.url)},f=e=>{switch(e){case"blog":return(0,s.jsx)(g.A,{className:"h-4 w-4"});case"event":return(0,s.jsx)(d.A,{className:"h-4 w-4"});case"resource":return(0,s.jsx)(A.A,{className:"h-4 w-4"});case"script":return(0,s.jsx)(c.A,{className:"h-4 w-4"})}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(y.$,{variant:"outline",size:"sm",className:"relative h-8 w-8 px-0 lg:h-9 lg:w-60 lg:px-3 lg:justify-start",onClick:()=>t(!0),children:[(0,s.jsx)(U.A,{className:"h-4 w-4 lg:mr-2","aria-hidden":"true"}),(0,s.jsx)("span",{className:"hidden lg:inline-flex",children:"Buscar..."}),(0,s.jsx)("span",{className:"sr-only",children:"Buscar"})]}),(0,s.jsxs)($,{open:e,onOpenChange:t,children:[(0,s.jsx)(S.L3,{className:"sr-only",children:"B\xfasqueda"}),(0,s.jsxs)("div",{className:"flex items-center border-b px-3",children:[(0,s.jsx)(U.A,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),(0,s.jsx)(K,{placeholder:"Buscar en todo el contenido...",value:a,onValueChange:r}),a&&(0,s.jsx)(y.$,{variant:"ghost",size:"icon",className:"h-8 w-8",onClick:()=>r(""),children:(0,s.jsx)(F.A,{className:"h-4 w-4"})})]}),(0,s.jsx)(en.F,{className:"flex-1 px-3",children:(0,s.jsxs)(J,{children:[(0,s.jsx)(Q,{children:"No se encontraron resultados."}),u?(0,s.jsx)("div",{className:"flex items-center justify-center py-6",children:(0,s.jsx)(Z.A,{className:"h-6 w-6 animate-spin text-muted-foreground"})}):(0,s.jsx)(s.Fragment,{children:n.length>0&&(0,s.jsx)(W,{heading:"Resultados",children:n.map(e=>(0,s.jsxs)(Y,{value:e.id,onSelect:()=>v(e),className:"flex items-center gap-2",children:[f(e.type),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"font-medium",children:e.title}),(0,s.jsx)(er.E,{variant:"secondary",className:"text-xs",children:"blog"===e.type?"Blog":"event"===e.type?"Evento":"resource"===e.type?"Recurso":"Guion"})]}),e.description&&(0,s.jsx)("p",{className:"text-sm text-muted-foreground line-clamp-1",children:e.description})]})]},e.id))})})]})})]})]})}var el=a(40126),ec=a(78122),ed=a(98712),eu=a(30829);let em=({children:e})=>{console.log("AppLayout: Component is rendering");let{user:t,logout:a}=(0,I.A)();console.log("AppLayout: useAuth returned, user:",t?"exists":"null");let r=(0,i.useRouter)(),o=(0,i.usePathname)(),{isRefreshing:l,refresh:c}=(0,el.s)(),d=o.slice(1)||"blog";return(0,s.jsxs)("div",{className:n().layout,children:[(0,s.jsx)("div",{className:n().sidebar,children:(0,s.jsxs)("div",{className:n().sidebarContent,children:[(0,s.jsx)("h1",{className:"text-xl font-bold text-foreground mb-4",children:"Red Creativa Pro Beta"}),(0,s.jsx)(k,{currentView:d,onShowLanding:()=>{r.push("/presentacion")}})]})}),(0,s.jsxs)("div",{className:n().mainContent,children:[(0,s.jsx)("header",{className:n().topBar,children:(0,s.jsxs)("div",{className:n().topBarContent,children:[(0,s.jsxs)("div",{className:"flex items-center space-x-4 min-w-0",children:[(0,s.jsx)(b,{currentView:d}),(0,s.jsx)(eo,{})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-4 flex-shrink-0",children:[(0,s.jsx)(y.$,{onClick:c,variant:"ghost",size:"sm",disabled:l,className:"transition-all duration-200",children:(0,s.jsx)(ec.A,{className:`h-4 w-4 ${l?"animate-spin":""}`})}),(0,s.jsx)(_.c,{}),t?(0,s.jsx)(O,{}):(0,s.jsxs)(y.$,{onClick:()=>{r.push("/auth")},variant:"outline",size:"sm",children:[(0,s.jsx)(ed.A,{className:"h-4 w-4 mr-2"}),"Iniciar Sesi\xf3n"]})]})]})}),(0,s.jsx)("main",{className:"flex-1 relative",children:(0,s.jsx)(en.F,{className:"h-full w-full",children:(0,s.jsxs)("div",{className:"p-6 h-full min-h-full",children:[(0,s.jsx)(eu.o,{}),e]})})})]})]})}},40126:(e,t,a)=>{"use strict";a.d(t,{s:()=>i});var s=a(43210);let i=(e={})=>{let{onRefresh:t,autoRefresh:a=!0}=e,[i,r]=(0,s.useState)(!1),[n,o]=(0,s.useState)(Date.now()),l=(0,s.useCallback)(async()=>{if(t&&!i){r(!0);try{await t(),o(Date.now())}catch(e){console.error("Error during refresh:",e)}finally{r(!1)}}},[t,i]);return(0,s.useEffect)(()=>{},[l,a]),{isRefreshing:i,lastRefresh:n,refresh:l}}},52435:(e,t,a)=>{"use strict";a.d(t,{j:()=>s});let s=[{id:"1",title:"Product Launch Video Script",content:"# Introduction\n\nWelcome to our exciting new product launch...",status:"final",category:"Marketing",tags:["product","launch","promotional"],createdAt:"2025-03-15T10:00:00Z",updatedAt:"2025-03-18T14:30:00Z",versions:[{id:"1-1",content:"# Initial Draft\n\nFirst version of the product launch...",createdAt:"2025-03-15T10:00:00Z",createdBy:{id:"1",name:"Demo User"}},{id:"1-2",content:"# Introduction\n\nWelcome to our exciting new product launch...",createdAt:"2025-03-18T14:30:00Z",createdBy:{id:"1",name:"Demo User"},comment:"Final revisions after team review"}],aiGenerated:!1,seoKeywords:["product launch","innovation","technology"],platforms:["YouTube","Instagram"],assignees:[{id:"1",name:"Demo User",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"}],visibility:"private",ownerId:"user1"},{id:"2",title:"Weekly Tutorial Series: Episode 5",content:"# Tutorial Overview\n\nIn this week's episode, we'll cover...",status:"review",category:"Education",tags:["tutorial","series","weekly"],createdAt:"2025-03-20T09:15:00Z",updatedAt:"2025-03-20T15:45:00Z",versions:[{id:"2-1",content:"# Tutorial Overview\n\nIn this week's episode, we'll cover...",createdAt:"2025-03-20T09:15:00Z",createdBy:{id:"2",name:"Alex Johnson"}}],aiGenerated:!0,seoKeywords:["tutorial","learning","education"],platforms:["YouTube","Blog"],visibility:"private",ownerId:"user2"},{id:"3",title:"Social Media Campaign Script",content:"# Campaign Strategy\n\nThis month's social media campaign...",status:"draft",category:"Social Media",tags:["campaign","social","strategy"],createdAt:"2025-03-22T11:30:00Z",updatedAt:"2025-03-22T11:30:00Z",versions:[{id:"3-1",content:"# Campaign Strategy\n\nThis month's social media campaign...",createdAt:"2025-03-22T11:30:00Z",createdBy:{id:"3",name:"Sam Taylor"}}],aiGenerated:!1,platforms:["Instagram","TikTok","Twitter"],visibility:"private",ownerId:"user3"}]},64234:(e,t,a)=>{"use strict";a.d(t,{BK:()=>l,eu:()=>o,q5:()=>c});var s=a(60687),i=a(43210),r=a(11096),n=a(22857);let o=i.forwardRef(({className:e,...t},a)=>(0,s.jsx)(r.bL,{ref:a,className:(0,n.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",e),...t}));o.displayName=r.bL.displayName;let l=i.forwardRef(({className:e,...t},a)=>(0,s.jsx)(r._V,{ref:a,className:(0,n.cn)("aspect-square h-full w-full",e),...t}));l.displayName=r._V.displayName;let c=i.forwardRef(({className:e,...t},a)=>(0,s.jsx)(r.H4,{ref:a,className:(0,n.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",e),...t}));c.displayName=r.H4.displayName},85140:(e,t,a)=>{"use strict";a.d(t,{s:()=>s});let s=[{id:"1",title:"Getting Started with Content Creation",content:`# Getting Started with Content Creation

Creating engaging content is essential for building an audience and establishing your brand. Here are some key tips to get started:

## 1. Know Your Audience

Understanding who you're creating content for is crucial. Research your target audience's:
- Interests
- Pain points
- Preferred platforms
- Content consumption habits

## 2. Plan Your Content Strategy

Develop a content calendar that includes:
- Topics
- Publishing schedule
- Content types
- Distribution channels

## 3. Focus on Quality

Quality always trumps quantity. Ensure your content is:
- Well-researched
- Original
- Valuable to your audience
- Professionally presented`,excerpt:"Learn the fundamentals of content creation and how to build an effective content strategy.",author:{id:"1",name:"Demo User",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-15T10:00:00Z",updatedAt:"2025-03-15T10:00:00Z",tags:["content creation","strategy","marketing"],imageUrl:"https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},{id:"2",title:"Social Media Marketing Tips for 2025",content:`# Social Media Marketing Tips for 2025

Stay ahead of the curve with these essential social media marketing strategies for 2025.

## Emerging Trends

- AI-powered content creation
- Virtual reality experiences
- Short-form video dominance
- Community-driven content

## Best Practices

1. Authenticity is key
2. Engage with your audience
3. Leverage user-generated content
4. Monitor analytics regularly

## Platform-Specific Strategies

### Instagram
- Focus on Reels
- Use interactive stickers
- Optimize your bio

### TikTok
- Participate in trends
- Use popular sounds
- Create native content

### LinkedIn
- Share industry insights
- Engage with thought leaders
- Post consistently`,excerpt:"Discover the latest social media marketing trends and strategies for 2025.",author:{id:"2",name:"Alex Johnson",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-14T15:30:00Z",updatedAt:"2025-03-14T15:30:00Z",tags:["social media","marketing","trends"],imageUrl:"https://images.pexels.com/photos/3850250/pexels-photo-3850250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},{id:"3",title:"C\xf3mo Organizar tus Recursos Creativos de Forma Eficiente",content:`# C\xf3mo Organizar tus Recursos Creativos de Forma Eficiente

La gesti\xf3n efectiva de recursos creativos es fundamental para mantener la productividad y la calidad en tus proyectos.

## Sistema de Categorizaci\xf3n

### Por Tipo de Contenido
- **Im\xe1genes**: Fotograf\xedas, ilustraciones, iconos
- **Videos**: Clips, animaciones, plantillas
- **Audio**: M\xfasica, efectos de sonido, voces
- **Documentos**: Plantillas, gu\xedas, referencias

### Por Proyecto
Organiza los recursos seg\xfan el proyecto espec\xedfico:
- Campa\xf1a de marketing
- Contenido para redes sociales
- Material educativo
- Branding corporativo

## Herramientas de Gesti\xf3n

### Etiquetado Inteligente
Usa etiquetas descriptivas:
- Colores dominantes
- Estilo visual
- Emociones transmitidas
- P\xfablico objetivo

### Metadatos \xdatiles
- Fecha de creaci\xf3n
- Autor o fuente
- Licencia de uso
- Resoluci\xf3n o calidad

## Mejores Pr\xe1cticas

1. **Nomenclatura Consistente**: Usa un sistema de nombres claro
2. **Backup Regular**: Mant\xe9n copias de seguridad
3. **Revisi\xf3n Peri\xf3dica**: Elimina recursos obsoletos
4. **Acceso Compartido**: Facilita la colaboraci\xf3n en equipo

## Beneficios de una Buena Organizaci\xf3n

- Ahorro de tiempo en b\xfasquedas
- Mejor colaboraci\xf3n en equipo
- Reutilizaci\xf3n eficiente de recursos
- Mantenimiento de est\xe1ndares de calidad`,excerpt:"Aprende a organizar y gestionar tus recursos creativos para maximizar tu productividad.",author:{id:"3",name:"Mar\xeda Gonz\xe1lez",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-13T09:15:00Z",updatedAt:"2025-03-13T09:15:00Z",tags:["organizaci\xf3n","recursos","productividad","gesti\xf3n"],imageUrl:"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},{id:"4a",title:"Prompts de IA: Gu\xeda Completa para Crear Contenido Efectivo",content:`# Prompts de IA: Gu\xeda Completa para Crear Contenido Efectivo

Los prompts bien estructurados son la clave para obtener resultados excepcionales con herramientas de inteligencia artificial.

## Anatom\xeda de un Prompt Efectivo

### Componentes Esenciales
1. **Contexto**: Establece el escenario
2. **Tarea**: Define qu\xe9 quieres lograr
3. **Formato**: Especifica c\xf3mo quieres el resultado
4. **Tono**: Indica el estilo de comunicaci\xf3n
5. **Restricciones**: Establece l\xedmites y requisitos

### Ejemplo de Estructura
\`\`\`
Contexto: Eres un experto en marketing digital
Tarea: Crear un plan de contenido para redes sociales
Formato: Lista con 10 ideas espec\xedficas
Tono: Profesional pero accesible
Restricciones: Para una empresa de tecnolog\xeda, audiencia joven
\`\`\`

## Tipos de Prompts por Categor\xeda

### Para Escritura
- Art\xedculos de blog
- Copys publicitarios
- Guiones para videos
- Descripciones de productos

### Para Creatividad Visual
- Descripciones para generaci\xf3n de im\xe1genes
- Conceptos de dise\xf1o
- Paletas de colores
- Composiciones visuales

### Para An\xe1lisis
- Investigaci\xf3n de mercado
- An\xe1lisis de competencia
- Evaluaci\xf3n de tendencias
- Optimizaci\xf3n de contenido

## T\xe9cnicas Avanzadas

### Chain of Thought
Gu\xeda a la IA paso a paso:
1. Analiza el problema
2. Considera las opciones
3. Eval\xfaa pros y contras
4. Proporciona la soluci\xf3n

### Few-Shot Learning
Proporciona ejemplos espec\xedficos:
- Ejemplo 1: [input] → [output deseado]
- Ejemplo 2: [input] → [output deseado]
- Ahora hazlo con: [nuevo input]

## Errores Comunes a Evitar

- Prompts demasiado vagos
- Falta de contexto espec\xedfico
- No especificar el formato deseado
- Ignorar las limitaciones de la IA
- No iterar y mejorar los prompts

## Biblioteca de Prompts \xdatiles

Mant\xe9n una colecci\xf3n organizada de prompts que funcionen bien para diferentes situaciones y \xfasalos como base para crear nuevos.`,excerpt:"Domina el arte de crear prompts efectivos para herramientas de IA y mejora la calidad de tus resultados.",author:{id:"4",name:"Carlos Ruiz",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-12T14:20:00Z",updatedAt:"2025-03-12T14:20:00Z",tags:["IA","prompts","inteligencia artificial","contenido"],imageUrl:"https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},{id:"5",title:"Planificaci\xf3n Editorial: C\xf3mo Crear un Calendario de Contenido Exitoso",content:`# Planificaci\xf3n Editorial: C\xf3mo Crear un Calendario de Contenido Exitoso

Un calendario editorial bien estructurado es la columna vertebral de cualquier estrategia de contenido exitosa.

## Beneficios de la Planificaci\xf3n Editorial

### Consistencia
- Publicaciones regulares
- Mantenimiento de la audiencia
- Construcci\xf3n de autoridad
- Mejor posicionamiento SEO

### Eficiencia
- Producci\xf3n en lotes
- Mejor uso del tiempo
- Reducci\xf3n del estr\xe9s
- Optimizaci\xf3n de recursos

## Elementos Clave del Calendario

### Informaci\xf3n B\xe1sica
- **Fecha de publicaci\xf3n**
- **Plataforma de destino**
- **Tipo de contenido**
- **Tema principal**
- **Palabras clave objetivo**

### Detalles de Producci\xf3n
- **Responsable de creaci\xf3n**
- **Fecha l\xedmite de entrega**
- **Estado del contenido**
- **Recursos necesarios**
- **Aprobaciones requeridas**

## Estrategias de Contenido

### Regla 80/20
- 80% contenido de valor
- 20% contenido promocional

### Variedad de Formatos
- Art\xedculos informativos
- Tutoriales paso a paso
- Casos de estudio
- Contenido visual
- Videos explicativos

### Temas Estacionales
- Eventos del calendario
- Tendencias temporales
- Fechas especiales del sector
- Lanzamientos de productos

## Herramientas Recomendadas

### Gratuitas
- Google Calendar
- Trello
- Notion
- Airtable (plan b\xe1sico)

### De Pago
- CoSchedule
- Hootsuite
- Buffer
- Sprout Social

## Proceso de Implementaci\xf3n

1. **Auditor\xeda de contenido actual**
2. **Definici\xf3n de objetivos**
3. **Investigaci\xf3n de audiencia**
4. **Creaci\xf3n del calendario base**
5. **Asignaci\xf3n de responsabilidades**
6. **Establecimiento de flujos de trabajo**
7. **Monitoreo y ajustes**

## M\xe9tricas de Seguimiento

- Engagement por tipo de contenido
- Alcance y impresiones
- Tr\xe1fico generado
- Conversiones
- Tiempo de permanencia

## Consejos para el \xc9xito

- Mant\xe9n flexibilidad para contenido oportuno
- Revisa y ajusta regularmente
- Involucra a todo el equipo
- Documenta lo que funciona
- Planifica con al menos un mes de anticipaci\xf3n`,excerpt:"Descubre c\xf3mo crear y mantener un calendario editorial que impulse tu estrategia de contenido.",author:{id:"5",name:"Ana Mart\xednez",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-11T11:45:00Z",updatedAt:"2025-03-11T11:45:00Z",tags:["planificaci\xf3n","calendario editorial","estrategia","contenido"],imageUrl:"https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}]},86734:(e,t,a)=>{"use strict";a.d(t,{Q:()=>s});let s=[{id:"1",title:"Brand Style Guide",description:"Official company brand style guide with logos, colors, and typography",type:"document",tags:["branding","design","guidelines"],createdAt:"2025-05-10T10:30:00Z",rating:4.5,size:"2.3 MB",thumbnailUrl:"https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1",comments:[{id:"1",resourceId:"1",userId:"2",userName:"Alex Johnson",userAvatar:"https://avatars.githubusercontent.com/u/124599?v=4",content:"Excelente gu\xeda, muy completa y bien estructurada.",createdAt:"2025-05-10T11:30:00Z",updatedAt:"2025-05-10T11:30:00Z"}]},{id:"2",title:"Marketing Campaign Photos",description:"Professional photos for the summer marketing campaign",type:"image",tags:["marketing","photography","campaign"],createdAt:"2025-05-09T14:15:00Z",rating:4.8,size:"15.7 MB",thumbnailUrl:"https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"private",ownerId:"1"},{id:"3",title:"Content Calendar Template",description:"Spreadsheet template for planning content across multiple channels",type:"document",tags:["planning","content","template"],createdAt:"2025-05-08T09:45:00Z",rating:4.2,size:"1.1 MB",thumbnailUrl:"https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"4",title:"DALL-E 3",description:"Advanced AI image generation tool",type:"ai-tool",tags:["ai","graphics","generation"],createdAt:"2025-05-07T16:20:00Z",rating:4.9,url:"https://openai.com/dall-e-3",thumbnailUrl:"https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"5",title:"SEO Best Practices 2025",description:"Latest guide on search engine optimization techniques",type:"document",tags:["seo","marketing","guide"],createdAt:"2025-05-06T11:10:00Z",rating:4.4,size:"3.2 MB",thumbnailUrl:"https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"6",title:"Canva Pro",description:"Online graphic design platform with templates",type:"link",tags:["design","graphics","tool"],createdAt:"2025-05-05T08:30:00Z",rating:4.6,url:"https://www.canva.com/pro/",thumbnailUrl:"https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"7",title:"Social Media Engagement Report",description:"Q1 2025 report on social media performance metrics",type:"document",tags:["report","social media","analytics"],createdAt:"2025-05-04T13:25:00Z",rating:4.1,size:"5.7 MB",thumbnailUrl:"https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"8",title:"ChatGPT",description:"AI-powered conversation and content generation assistant",type:"ai-tool",tags:["ai","writing","assistant"],createdAt:"2025-05-03T09:15:00Z",rating:4.7,url:"https://chat.openai.com/",thumbnailUrl:"https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"}]},94226:(e,t,a)=>{"use strict";a.d(t,{_:()=>o});var s=a(54360),i=a(73130),r=a(90327);let n=new Date;(0,s.a)((0,i.g)(n,0),9);let o=[{id:"1",title:"Team Brainstorming Session",description:"Brainstorming new ideas for the upcoming marketing campaign",start:(0,s.a)(n,10).toISOString(),end:(0,s.a)(n,11).toISOString(),color:"bg-blue-500 text-white",script:"1. Welcome and introduction (5 mins)\n2. Review previous ideas (10 mins)\n3. Brainstorming session (30 mins)\n4. Vote on top ideas (10 mins)\n5. Assign next steps (5 mins)",visibility:"private",ownerId:"user1"},{id:"2",title:"Content Review",description:"Review and approve content for the website launch",start:(0,r.f)((0,s.a)(n,11),2).toISOString(),end:(0,r.f)((0,s.a)(n,12),2).toISOString(),color:"bg-green-500 text-white",visibility:"private",ownerId:"user1"}]},97354:(e,t,a)=>{"use strict";a.d(t,{c:()=>d});var s=a(60687),i=a(21134),r=a(363),n=a(98971),o=a(13785),l=a(41980),c=a(8359);function d(){let{theme:e,setTheme:t}=(0,c.D)();return(0,s.jsxs)(l.rI,{children:[(0,s.jsx)(l.ty,{asChild:!0,children:(0,s.jsxs)(o.$,{variant:"ghost",size:"icon",className:"focus-visible:ring-0 focus-visible:ring-offset-0",children:[(0,s.jsx)(i.A,{className:"h-5 w-5 rotate-0 scale-100 transition-all"}),(0,s.jsx)(r.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all"}),(0,s.jsx)(n.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all"}),(0,s.jsx)("span",{className:"sr-only",children:"Cambiar tema"})]})}),(0,s.jsxs)(l.SQ,{align:"end",children:[(0,s.jsx)(l._2,{onClick:()=>t("white"),children:"\uD83E\uDD0D Blanco"}),(0,s.jsx)(l._2,{onClick:()=>t("black"),children:"\uD83D\uDDA4 Negro"}),(0,s.jsx)(l._2,{onClick:()=>t("neurobrutalismo"),children:"\uD83C\uDFA8 Neurobrutalismo"})]})]})}}};