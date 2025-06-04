exports.id=496,exports.ids=[496],exports.modules={62:(e,t,a)=>{"use strict";a.d(t,{F:()=>n});var r=a(687),o=a(3210),s=a(4772);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}();let n=o.forwardRef(({className:e,children:t,...a},o)=>(0,r.jsxs)(s.bL,{ref:o,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("relative overflow-hidden",e),...a,children:[(0,r.jsx)(s.LM,{className:"h-full w-full rounded-[inherit]",children:t}),(0,r.jsx)(i,{}),(0,r.jsx)(s.OK,{})]}));n.displayName=s.bL.displayName;let i=o.forwardRef(({className:e,orientation:t="vertical",...a},o)=>(0,r.jsx)(s.VM,{ref:o,orientation:t,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("flex touch-none select-none transition-colors","vertical"===t&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===t&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",e),...a,children:(0,r.jsx)(s.lr,{className:"relative flex-1 rounded-full bg-border"})}));i.displayName=s.VM.displayName},126:(e,t,a)=>{"use strict";a.d(t,{s:()=>o});var r=a(3210);let o=(e={})=>{let{onRefresh:t,autoRefresh:a=!0}=e,[o,s]=(0,r.useState)(!1),[n,i]=(0,r.useState)(Date.now()),d=(0,r.useCallback)(async()=>{if(t&&!o){s(!0);try{await t(),i(Date.now())}catch(e){console.error("Error during refresh:",e)}finally{s(!1)}}},[t,o]);return(0,r.useEffect)(()=>{},[d,a]),{isRefreshing:o,lastRefresh:n,refresh:d}}},527:()=>{throw Error('Module build failed (from ./node_modules/next/dist/build/webpack/loaders/next-swc-loader.js):\nError:   \x1b[31mx\x1b[0m Bad character escape sequence, expected 4 hex characters\n    ,-[\x1b[36;1;4mC:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\ui\\common\\UserNav.tsx\x1b[0m:13:1]\n \x1b[2m10\x1b[0m |   DialogContent,\n \x1b[2m11\x1b[0m |   DialogHeader,\n \x1b[2m12\x1b[0m |   DialogTitle,\n \x1b[2m13\x1b[0m | } from "./c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\dialog";\n    : \x1b[35;1m                                                                           ^^\x1b[0m\n \x1b[2m14\x1b[0m | import {\n \x1b[2m15\x1b[0m |   DropdownMenu,\n \x1b[2m15\x1b[0m |   DropdownMenuContent,\r\n    `----\n\n\nCaused by:\n    Syntax Error')},2648:(e,t,a)=>{"use strict";a.d(t,{E:()=>n});var r=a(687);a(3210);var o=a(4224);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}();let s=(0,o.F)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function n({className:e,variant:t,...a}){return(0,r.jsx)("div",{className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())(s({variant:t}),e),...a})}},2762:(e,t,a)=>{"use strict";a.d(t,{default:()=>r});let r=(0,a(2907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\programar\\\\Documents\\\\GitHub\\\\redcreativapro\\\\app\\\\components\\\\AppLayout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\AppLayout.tsx","default")},2857:(e,t,a)=>{"use strict";a.d(t,{Y:()=>i,cn:()=>s,v4:()=>n});var r=a(9384),o=a(2348);function s(...e){return(0,o.QP)((0,r.$)(e))}function n(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function i(e){return e.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")}},3767:(e,t,a)=>{"use strict";a.d(t,{default:()=>ec});var r=a(687),o=a(6189),s=a(3210),n=a.n(s),i=a(2857),d=a(2363),c=a(22),l=a(228),m=a(6085),u=a(9005),p=a(4808),x=a(8887),f=a(2080),h=a(7351),g=a(8179),b=a(2140),v=a(3785),N=a(3772);function y({currentView:e}){let{hasActiveSubscription:t}=(0,N.A)(),a=(0,o.useRouter)(),n=(0,s.useCallback)(t=>{e===t.replace("/","")?window.location.reload():a.push(t)},[e,a]);return(0,r.jsxs)("div",{className:"flex items-center gap-6",children:[(0,r.jsxs)("button",{onClick:()=>n("/blog"),className:"flex items-center space-x-2",children:[(0,r.jsx)("div",{className:"w-8 h-8",children:(0,r.jsxs)("svg",{viewBox:"0 0 100 100",className:"w-full h-full fill-current",children:[(0,r.jsx)("path",{d:"M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"}),(0,r.jsx)("path",{d:"M65 35H35c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V37c0-1.1-.9-2-2-2zm-5 20H40v-4h20v4zm0-8H40v-4h20v4z"})]})}),(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"hidden font-bold lg:inline-block",children:"Red Creativa"}),t()&&(0,r.jsxs)("div",{className:"hidden lg:flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full",children:[(0,r.jsx)(d.A,{className:"h-3 w-3"}),(0,r.jsx)("span",{children:"PRO"})]})]})]}),(0,r.jsxs)("nav",{className:"flex items-center gap-1",children:[(0,r.jsxs)("button",{onClick:()=>n("/recursos"),className:(0,i.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","recursos"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,r.jsx)(c.A,{className:"h-4 w-4"}),"Recursos"]}),(0,r.jsxs)("button",{onClick:()=>n("/calendario"),className:(0,i.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","calendario"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,r.jsx)(l.A,{className:"h-4 w-4"}),"Calendario"]}),(0,r.jsxs)("button",{onClick:()=>n("/scripts"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","scripts"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(c.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Guiones"})]}),(0,r.jsxs)("button",{onClick:()=>n("/prompts"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","prompts"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(m.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Prompts"})]}),(0,r.jsxs)("button",{onClick:()=>n("/miniaturas"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","miniaturas"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(u.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Miniaturas"})]}),(0,r.jsxs)("button",{onClick:()=>n("/tareas"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","tareas"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(p.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Tareas"})]}),(0,r.jsxs)("button",{onClick:()=>n("/chat"),className:(0,i.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","chat"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,r.jsx)(x.A,{className:"h-4 w-4"}),"Chat"]}),(0,r.jsxs)("button",{onClick:()=>n("/blog"),className:(0,i.cn)("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors","blog"===e?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground hover:bg-accent"),children:[(0,r.jsx)(f.A,{className:"h-4 w-4"}),"Blog"]}),(0,r.jsxs)("button",{onClick:()=>n("/aprendizaje"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","aprendizaje"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(h.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Aprendizaje"})]}),(0,r.jsxs)("button",{onClick:()=>n("/proyectos"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","proyectos"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(g.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"Proyectos"})]}),(0,r.jsxs)("button",{onClick:()=>n("/svg-viewer"),className:(0,i.cn)("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md","svg-viewer"===e?"text-primary bg-muted":"text-muted-foreground"),children:[(0,r.jsx)(b.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"hidden md:inline",children:"SVG Viewer"})]}),(0,r.jsx)(v.$,{onClick:()=>n("/precios"),variant:"default",size:"sm",className:"ml-2 font-semibold",children:"Plan Pro"})]})]})}var j=a(4949),w=a(1134),C=a(363),O=a(8971),E=a(9798),U=a(9698);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}();let D=E.bL,T=E.l9;E.YJ,E.ZL,E.Pb,E.z6,s.forwardRef(({className:e,inset:t,children:a,...o},s)=>(0,r.jsxs)(E.ZP,{ref:s,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",t&&"pl-8",e),...o,children:[a,(0,r.jsx)(U.vKP,{className:"ml-auto h-4 w-4"})]})).displayName=E.ZP.displayName,s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(E.G5,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t})).displayName=E.G5.displayName;let A=s.forwardRef(({className:e,sideOffset:t=4,...a},o)=>(0,r.jsx)(E.ZL,{children:(0,r.jsx)(E.UC,{ref:o,sideOffset:t,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...a})}));A.displayName=E.UC.displayName;let _=s.forwardRef(({className:e,inset:t,...a},o)=>(0,r.jsx)(E.q7,{ref:o,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t&&"pl-8",e),...a}));function k(){let{theme:e,setTheme:t}=Object(function(){var e=Error("Cannot find module '../../components/theme-provider'");throw e.code="MODULE_NOT_FOUND",e}())();return(0,r.jsxs)(D,{children:[(0,r.jsx)(T,{asChild:!0,children:(0,r.jsxs)(v.$,{variant:"ghost",size:"icon",className:"focus-visible:ring-0 focus-visible:ring-offset-0",children:[(0,r.jsx)(w.A,{className:"h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 brutal:rotate-0 brutal:scale-100"}),(0,r.jsx)(C.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 brutal:rotate-90 brutal:scale-0"}),(0,r.jsx)(O.A,{className:"absolute h-5 w-5 rotate-90 scale-0 transition-all brutal:rotate-0 brutal:scale-100"}),(0,r.jsx)("span",{className:"sr-only",children:"Cambiar tema"})]})}),(0,r.jsxs)(A,{align:"end",children:[(0,r.jsx)(_,{onClick:()=>t("light"),children:"Claro"}),(0,r.jsx)(_,{onClick:()=>t("dark"),children:"Oscuro"}),(0,r.jsx)(_,{onClick:()=>t("brutal"),children:"Neurobrutalist"}),(0,r.jsx)(_,{onClick:()=>t("system"),children:"Sistema"})]})]})}_.displayName=E.q7.displayName,s.forwardRef(({className:e,children:t,checked:a,...o},s)=>(0,r.jsxs)(E.H_,{ref:s,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:a,...o,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(E.VF,{children:(0,r.jsx)(U.Srz,{className:"h-4 w-4"})})}),t]})).displayName=E.H_.displayName,s.forwardRef(({className:e,children:t,...a},o)=>(0,r.jsxs)(E.hN,{ref:o,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...a,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(E.VF,{children:(0,r.jsx)(U.RiX,{className:"h-4 w-4 fill-current"})})}),t]})).displayName=E.hN.displayName,s.forwardRef(({className:e,inset:t,...a},o)=>(0,r.jsx)(E.JU,{ref:o,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("px-2 py-1.5 text-sm font-semibold",t&&"pl-8",e),...a})).displayName=E.JU.displayName,s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(E.wv,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("-mx-1 my-1 h-px bg-muted",e),...t})).displayName=E.wv.displayName,!function(){var e=Error("Cannot find module '../../components/theme-provider'");throw e.code="MODULE_NOT_FOUND",e}();var M=a(527),L=a(9270),F=a(1860),S=a(2730),P=a(7072);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}(),function(){var e=Error("Cannot find module '../../../../../../../../../ui/dialog'");throw e.code="MODULE_NOT_FOUND",e}();let z=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(P.uB,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",e),...t}));z.displayName=P.uB.displayName;let R=({children:e,...t})=>(0,r.jsx)(Object(function(){var e=Error("Cannot find module '../../../../../../../../../ui/dialog'");throw e.code="MODULE_NOT_FOUND",e}()),{...t,children:(0,r.jsx)(Object(function(){var e=Error("Cannot find module '../../../../../../../../../ui/dialog'");throw e.code="MODULE_NOT_FOUND",e}()),{className:"overflow-hidden p-0",children:(0,r.jsx)(z,{className:"[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",children:e})})}),I=s.forwardRef(({className:e,...t},a)=>(0,r.jsxs)("div",{className:"flex items-center border-b px-3","cmdk-input-wrapper":"",children:[(0,r.jsx)(U.$p$,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),(0,r.jsx)(P.uB.Input,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",e),...t})]}));I.displayName=P.uB.Input.displayName;let B=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(P.uB.List,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("max-h-[300px] overflow-y-auto overflow-x-hidden",e),...t}));B.displayName=P.uB.List.displayName;let G=s.forwardRef((e,t)=>(0,r.jsx)(P.uB.Empty,{ref:t,className:"py-6 text-center text-sm",...e}));G.displayName=P.uB.Empty.displayName;let Z=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(P.uB.Group,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",e),...t}));Z.displayName=P.uB.Group.displayName,s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(P.uB.Separator,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("-mx-1 h-px bg-border",e),...t})).displayName=P.uB.Separator.displayName;let H=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(P.uB.Item,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",e),...t}));H.displayName=P.uB.Item.displayName;var q=a(5140),V=a(4360),$=a(3130),Y=a(2009);let J=new Date;(0,V.a)((0,$.g)(J,0),9);let K=[{id:"1",title:"Team Brainstorming Session",description:"Brainstorming new ideas for the upcoming marketing campaign",start:(0,V.a)(J,10).toISOString(),end:(0,V.a)(J,11).toISOString(),color:"bg-blue-500 text-white",script:"1. Welcome and introduction (5 mins)\n2. Review previous ideas (10 mins)\n3. Brainstorming session (30 mins)\n4. Vote on top ideas (10 mins)\n5. Assign next steps (5 mins)"},{id:"2",title:"Content Review",description:"Review and approve content for the website launch",start:(0,Y.f)((0,V.a)(J,11),2).toISOString(),end:(0,Y.f)((0,V.a)(J,12),2).toISOString(),color:"bg-green-500 text-white"}],W=[{id:"1",title:"Brand Style Guide",description:"Official company brand style guide with logos, colors, and typography",type:"document",tags:["branding","design","guidelines"],createdAt:"2025-05-10T10:30:00Z",rating:4.5,size:"2.3 MB",thumbnailUrl:"https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1",comments:[{id:"1",resourceId:"1",userId:"2",userName:"Alex Johnson",userAvatar:"https://avatars.githubusercontent.com/u/124599?v=4",content:"Excelente gu\xeda, muy completa y bien estructurada.",createdAt:"2025-05-10T11:30:00Z",updatedAt:"2025-05-10T11:30:00Z"}]},{id:"2",title:"Marketing Campaign Photos",description:"Professional photos for the summer marketing campaign",type:"image",tags:["marketing","photography","campaign"],createdAt:"2025-05-09T14:15:00Z",rating:4.8,size:"15.7 MB",thumbnailUrl:"https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"private",ownerId:"1"},{id:"3",title:"Content Calendar Template",description:"Spreadsheet template for planning content across multiple channels",type:"document",tags:["planning","content","template"],createdAt:"2025-05-08T09:45:00Z",rating:4.2,size:"1.1 MB",thumbnailUrl:"https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"4",title:"DALL-E 3",description:"Advanced AI image generation tool",type:"ai-tool",tags:["ai","graphics","generation"],createdAt:"2025-05-07T16:20:00Z",rating:4.9,url:"https://openai.com/dall-e-3",thumbnailUrl:"https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"5",title:"SEO Best Practices 2025",description:"Latest guide on search engine optimization techniques",type:"document",tags:["seo","marketing","guide"],createdAt:"2025-05-06T11:10:00Z",rating:4.4,size:"3.2 MB",thumbnailUrl:"https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"6",title:"Canva Pro",description:"Online graphic design platform with templates",type:"link",tags:["design","graphics","tool"],createdAt:"2025-05-05T08:30:00Z",rating:4.6,url:"https://www.canva.com/pro/",thumbnailUrl:"https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"7",title:"Social Media Engagement Report",description:"Q1 2025 report on social media performance metrics",type:"document",tags:["report","social media","analytics"],createdAt:"2025-05-04T13:25:00Z",rating:4.1,size:"5.7 MB",thumbnailUrl:"https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"},{id:"8",title:"ChatGPT",description:"AI-powered conversation and content generation assistant",type:"ai-tool",tags:["ai","writing","assistant"],createdAt:"2025-05-03T09:15:00Z",rating:4.7,url:"https://chat.openai.com/",thumbnailUrl:"https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",visibility:"public",ownerId:"1"}],Q=[{id:"1",title:"Product Launch Video Script",content:"# Introduction\n\nWelcome to our exciting new product launch...",status:"final",category:"Marketing",tags:["product","launch","promotional"],createdAt:"2025-03-15T10:00:00Z",updatedAt:"2025-03-18T14:30:00Z",versions:[{id:"1-1",content:"# Initial Draft\n\nFirst version of the product launch...",createdAt:"2025-03-15T10:00:00Z",createdBy:{id:"1",name:"Demo User"}},{id:"1-2",content:"# Introduction\n\nWelcome to our exciting new product launch...",createdAt:"2025-03-18T14:30:00Z",createdBy:{id:"1",name:"Demo User"},comment:"Final revisions after team review"}],aiGenerated:!1,seoKeywords:["product launch","innovation","technology"],platforms:["YouTube","Instagram"],assignees:[{id:"1",name:"Demo User",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"}]},{id:"2",title:"Weekly Tutorial Series: Episode 5",content:"# Tutorial Overview\n\nIn this week's episode, we'll cover...",status:"review",category:"Education",tags:["tutorial","series","weekly"],createdAt:"2025-03-20T09:15:00Z",updatedAt:"2025-03-20T15:45:00Z",versions:[{id:"2-1",content:"# Tutorial Overview\n\nIn this week's episode, we'll cover...",createdAt:"2025-03-20T09:15:00Z",createdBy:{id:"2",name:"Alex Johnson"}}],aiGenerated:!0,seoKeywords:["tutorial","learning","education"],platforms:["YouTube","Blog"]},{id:"3",title:"Social Media Campaign Script",content:"# Campaign Strategy\n\nThis month's social media campaign...",status:"draft",category:"Social Media",tags:["campaign","social","strategy"],createdAt:"2025-03-22T11:30:00Z",updatedAt:"2025-03-22T11:30:00Z",versions:[{id:"3-1",content:"# Campaign Strategy\n\nThis month's social media campaign...",createdAt:"2025-03-22T11:30:00Z",createdBy:{id:"3",name:"Sam Taylor"}}],aiGenerated:!1,platforms:["Instagram","TikTok","Twitter"]}];var X=a(2648),ee=a(62),et=a(7566),ea=a(4785);function er(){let[e,t]=(0,s.useState)(!1),[a,n]=(0,s.useState)(""),[i,d]=(0,s.useState)([]),[m,u]=(0,s.useState)(!1),{isAuthenticated:p}=(0,N.A)(),{toast:x}=(0,et.useToast)(),h=(0,o.useRouter)();(0,s.useCallback)(async e=>{if(!e.trim())return void d([]);u(!0);try{let t=await Object(function(){var e=Error("Cannot find module './c:UsersprogramarDocumentsGitHub\redcreativaproapplibsearch'");throw e.code="MODULE_NOT_FOUND",e}())(e,{posts:q.s,events:K,resources:W,scripts:Q});d(t)}catch(e){console.error("Error searching content:",e),x({title:"Error en la b\xfasqueda",description:e.message||"No se pudo realizar la b\xfasqueda",variant:"destructive"}),d([])}finally{u(!1)}},[x]);let g=e=>{if(!p&&("resource"===e.type||"script"===e.type))return void x({title:"Acceso restringido",description:"Reg\xedstrate o inicia sesi\xf3n para acceder a este contenido",variant:"destructive"});t(!1),e.url&&h.push(e.url)},b=e=>{switch(e){case"blog":return(0,r.jsx)(f.A,{className:"h-4 w-4"});case"event":return(0,r.jsx)(l.A,{className:"h-4 w-4"});case"resource":return(0,r.jsx)(O.A,{className:"h-4 w-4"});case"script":return(0,r.jsx)(c.A,{className:"h-4 w-4"})}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(v.$,{variant:"outline",size:"sm",className:"relative h-8 w-8 px-0 lg:h-9 lg:w-60 lg:px-3 lg:justify-start",onClick:()=>t(!0),children:[(0,r.jsx)(L.A,{className:"h-4 w-4 lg:mr-2","aria-hidden":"true"}),(0,r.jsx)("span",{className:"hidden lg:inline-flex",children:"Buscar..."}),(0,r.jsx)("span",{className:"sr-only",children:"Buscar"})]}),(0,r.jsxs)(R,{open:e,onOpenChange:t,children:[(0,r.jsx)(ea.L3,{className:"sr-only",children:"B\xfasqueda"}),(0,r.jsxs)("div",{className:"flex items-center border-b px-3",children:[(0,r.jsx)(L.A,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),(0,r.jsx)(I,{placeholder:"Buscar en todo el contenido...",value:a,onValueChange:n}),a&&(0,r.jsx)(v.$,{variant:"ghost",size:"icon",className:"h-8 w-8",onClick:()=>n(""),children:(0,r.jsx)(F.A,{className:"h-4 w-4"})})]}),(0,r.jsx)(ee.F,{className:"flex-1 px-3",children:(0,r.jsxs)(B,{children:[(0,r.jsx)(G,{children:"No se encontraron resultados."}),m?(0,r.jsx)("div",{className:"flex items-center justify-center py-6",children:(0,r.jsx)(S.A,{className:"h-6 w-6 animate-spin text-muted-foreground"})}):(0,r.jsx)(r.Fragment,{children:i.length>0&&(0,r.jsx)(Z,{heading:"Resultados",children:i.map(e=>(0,r.jsxs)(H,{value:e.id,onSelect:()=>g(e),className:"flex items-center gap-2",children:[b(e.type),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"font-medium",children:e.title}),(0,r.jsx)(X.E,{variant:"secondary",className:"text-xs",children:"blog"===e.type?"Blog":"event"===e.type?"Evento":"resource"===e.type?"Recurso":"Guion"})]}),e.description&&(0,r.jsx)("p",{className:"text-sm text-muted-foreground line-clamp-1",children:e.description})]})]},e.id))})})]})})]})]})}!function(){var e=Error("Cannot find module './c:UsersprogramarDocumentsGitHub\redcreativaproapplibsearch'");throw e.code="MODULE_NOT_FOUND",e}();var eo=a(126),es=a(8122),en=a(8712),ei=a(3931);function ed(){let{needsEmailVerification:e,pendingVerificationEmail:t,clearEmailVerification:a}=(0,N.A)(),{toast:o}=(0,et.useToast)(),[s,i]=n().useState(!1);if(!e||!t)return null;let d=async()=>{i(!0);try{let{error:e}=await Object(function(){var e=Error("Cannot find module './c:UsersprogramarDocumentsGitHub\redcreativaproapplibsupabase'");throw e.code="MODULE_NOT_FOUND",e}()).auth.resend({type:"signup",email:t});if(e)throw e;o({title:"\uD83D\uDCE7 Email reenviado",description:"Hemos enviado un nuevo enlace de verificaci\xf3n a tu correo.",duration:5e3})}catch(e){console.error("Error resending email:",e),o({variant:"destructive",title:"Error al reenviar",description:"No pudimos reenviar el email. Int\xe9ntalo de nuevo m\xe1s tarde."})}finally{i(!1)}};return(0,r.jsx)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:(0,r.jsxs)("div",{className:"flex items-start space-x-3",children:[(0,r.jsx)(ei.A,{className:"h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("h3",{className:"text-sm font-semibold text-blue-900 mb-1",children:"\uD83D\uDCE7 Verifica tu direcci\xf3n de email"}),(0,r.jsxs)("p",{className:"text-sm text-blue-700 mb-3",children:["Hemos enviado un enlace de verificaci\xf3n a"," ",(0,r.jsx)("span",{className:"font-medium",children:t}),". Haz clic en el enlace para activar tu cuenta."]}),(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2",children:[(0,r.jsx)(v.$,{variant:"outline",size:"sm",onClick:d,disabled:s,className:"text-blue-700 border-blue-300 hover:bg-blue-100",children:s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(es.A,{className:"h-4 w-4 mr-2 animate-spin"}),"Reenviando..."]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(es.A,{className:"h-4 w-4 mr-2"}),"Reenviar email"]})}),(0,r.jsxs)(v.$,{variant:"ghost",size:"sm",onClick:a,className:"text-blue-700 hover:bg-blue-100",children:[(0,r.jsx)(F.A,{className:"h-4 w-4 mr-2"}),"Cerrar"]})]}),(0,r.jsxs)("p",{className:"text-xs text-blue-600 mt-2",children:["\uD83D\uDCA1 ",(0,r.jsx)("strong",{children:"Tip:"})," Si no ves el email, revisa tu carpeta de spam o correo no deseado"]})]})]})})}!function(){var e=Error("Cannot find module './c:UsersprogramarDocumentsGitHub\redcreativaproapplibsupabase'");throw e.code="MODULE_NOT_FOUND",e}();let ec=({children:e})=>{console.log("AppLayout: Component is rendering");let{user:t,logout:a}=(0,N.A)();console.log("AppLayout: useAuth returned, user:",t?"exists":"null");let s=(0,o.useRouter)(),n=(0,o.usePathname)(),{isRefreshing:i,refresh:d}=(0,eo.s)(),c=n.slice(1)||"blog";return(0,r.jsxs)("div",{className:"flex h-screen w-screen max-w-full max-h-full bg-background relative",children:[(0,r.jsx)("div",{className:"w-64 min-w-64 border-r bg-card flex-shrink-0",children:(0,r.jsxs)("div",{className:"p-4 h-full overflow-y-auto",children:[(0,r.jsx)("h1",{className:"text-xl font-bold text-foreground mb-4",children:"Red Creativa Pro"}),(0,r.jsx)(j.SideNav,{currentView:c,onShowLanding:()=>{s.push("/presentacion")}})]})}),(0,r.jsxs)("div",{className:"flex-1 flex flex-col min-w-0",children:[(0,r.jsx)("header",{className:"border-b bg-card px-6 py-3 flex-shrink-0",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-4 min-w-0",children:[(0,r.jsx)(y,{currentView:c}),(0,r.jsx)(er,{})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-4 flex-shrink-0",children:[(0,r.jsx)(v.$,{onClick:d,variant:"ghost",size:"sm",disabled:i,className:"transition-all duration-200",children:(0,r.jsx)(es.A,{className:`h-4 w-4 ${i?"animate-spin":""}`})}),(0,r.jsx)(k,{}),t?(0,r.jsx)(M.UserNav,{}):(0,r.jsxs)(v.$,{onClick:()=>{s.push("/auth")},variant:"outline",size:"sm",children:[(0,r.jsx)(en.A,{className:"h-4 w-4 mr-2"}),"Iniciar Sesi\xf3n"]})]})]})}),(0,r.jsx)("main",{className:"flex-1 relative",children:(0,r.jsx)(ee.F,{className:"h-full w-full",children:(0,r.jsxs)("div",{className:"p-6 h-full min-h-full",children:[(0,r.jsx)(ed,{}),e]})})})]})]})}},3785:(e,t,a)=>{"use strict";a.d(t,{$:()=>d});var r=a(687),o=a(3210),s=a(8730),n=a(4224);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}();let i=(0,n.F)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=o.forwardRef(({className:e,variant:t,size:a,asChild:o=!1,...n},d)=>{let c=o?s.DX:"button";return(0,r.jsx)(c,{className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())(i({variant:t,size:a,className:e})),ref:d,...n})});d.displayName="Button"},4785:(e,t,a)=>{"use strict";a.d(t,{Cf:()=>l,L3:()=>u,c7:()=>m,lG:()=>i});var r=a(687),o=a(3210),s=a(6134),n=a(9698);!function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}();let i=s.bL;s.l9;let d=s.ZL;s.bm;let c=o.forwardRef(({className:e,...t},a)=>(0,r.jsx)(s.hJ,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));c.displayName=s.hJ.displayName;let l=o.forwardRef(({className:e,children:t,...a},o)=>(0,r.jsxs)(d,{children:[(0,r.jsx)(c,{}),(0,r.jsxs)(s.UC,{ref:o,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a,children:[t,(0,r.jsxs)(s.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,r.jsx)(n.MKb,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]}));l.displayName=s.UC.displayName;let m=({className:e,...t})=>(0,r.jsx)("div",{className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});m.displayName="DialogHeader";let u=o.forwardRef(({className:e,...t},a)=>(0,r.jsx)(s.hE,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("text-lg font-semibold leading-none tracking-tight",e),...t}));u.displayName=s.hE.displayName,o.forwardRef(({className:e,...t},a)=>(0,r.jsx)(s.VY,{ref:a,className:Object(function(){var e=Error("Cannot find module '../../../../../../../../../lib/utils'");throw e.code="MODULE_NOT_FOUND",e}())("text-sm text-muted-foreground",e),...t})).displayName=s.VY.displayName},4949:()=>{throw Error("Module build failed (from ./node_modules/next/dist/build/webpack/loaders/next-swc-loader.js):\nError:   \x1b[31mx\x1b[0m Bad character escape sequence, expected 4 hex characters\n   ,-[\x1b[36;1;4mC:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\common\\SideNav.tsx\x1b[0m:5:1]\n \x1b[2m2\x1b[0m | \n \x1b[2m3\x1b[0m | import Link from 'next/link';\n \x1b[2m4\x1b[0m | import { useRouter, usePathname } from 'next/navigation';\n \x1b[2m5\x1b[0m | import { Button } from './c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\button';\n   : \x1b[35;1m                                                                                           ^^\x1b[0m\n \x1b[2m6\x1b[0m | import { Separator } from './c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\separator';\n \x1b[2m7\x1b[0m | import { cn } from './c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\lib\\utils';\n \x1b[2m8\x1b[0m | import {\n   `----\n\n\nCaused by:\n    Syntax Error")},5140:(e,t,a)=>{"use strict";a.d(t,{s:()=>r});let r=[{id:"1",title:"Getting Started with Content Creation",content:`# Getting Started with Content Creation

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
- Mantenimiento de est\xe1ndares de calidad`,excerpt:"Aprende a organizar y gestionar tus recursos creativos para maximizar tu productividad.",author:{id:"3",name:"Mar\xeda Gonz\xe1lez",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-13T09:15:00Z",updatedAt:"2025-03-13T09:15:00Z",tags:["organizaci\xf3n","recursos","productividad","gesti\xf3n"],imageUrl:"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},{id:"4",title:"Prompts de IA: Gu\xeda Completa para Crear Contenido Efectivo",content:`# Prompts de IA: Gu\xeda Completa para Crear Contenido Efectivo

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
- Planifica con al menos un mes de anticipaci\xf3n`,excerpt:"Descubre c\xf3mo crear y mantener un calendario editorial que impulse tu estrategia de contenido.",author:{id:"5",name:"Ana Mart\xednez",avatarUrl:"https://avatars.githubusercontent.com/u/124599?v=4"},createdAt:"2025-03-11T11:45:00Z",updatedAt:"2025-03-11T11:45:00Z",tags:["planificaci\xf3n","calendario editorial","estrategia","contenido"],imageUrl:"https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}]},7566:()=>{throw Error("Module build failed (from ./node_modules/next/dist/build/webpack/loaders/next-swc-loader.js):\nError:   \x1b[31mx\x1b[0m Bad character escape sequence, expected 4 hex characters\n   ,-[\x1b[36;1;4mC:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\hooks\\use-toast.ts\x1b[0m:3:1]\n \x1b[2m1\x1b[0m | import * as React from 'react';\n \x1b[2m2\x1b[0m | \n \x1b[2m3\x1b[0m | import type { ToastActionElement, ToastProps } from './c:\\Users\\programar\\Documents\\GitHub\\redcreativapro\\app\\components\\ui\\toast';\n   : \x1b[35;1m                                                                                                                        ^^\x1b[0m\n \x1b[2m4\x1b[0m | \n \x1b[2m5\x1b[0m | const TOAST_LIMIT = 1;\n \x1b[2m5\x1b[0m | const TOAST_REMOVE_DELAY = 1000000;\r\n   `----\n\n\nCaused by:\n    Syntax Error")}};