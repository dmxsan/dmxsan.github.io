import{e as x,u as g,c as s,a as t,F as u,r as p,f as h,o,g as f,t as i,n as y}from"./BM_Zeb28.js";import{u as v}from"./Cl-EbStk.js";const b={class:"px-7 py-32"},w={class:"max-w-3xl mx-auto"},k={class:"space-y-8"},D=["onClick","onKeydown"],B={class:"space-y-2"},C={class:"flex flex-wrap items-center gap-2 text-sm text-neutral-400"},S={class:"flex flex-wrap gap-2"},K={class:"text-xl font-semibold group-hover:text-neutral-200 transition-colors"},$={class:"text-neutral-400"},T={__name:"blog",async setup(A){let a,c;const{data:_}=([a,c]=x(()=>v("blog-posts",()=>queryContent("blog").find())),a=await a,c(),a),d=n=>{const r=n.split("/").pop().replace(".md","");y(`/blog/${r}`)};g({title:"Blog - Dmxsan",meta:[{name:"description",content:"Thoughts and tutorials on GIS development, machine learning, and open source technologies."}]});const m=n=>n?new Date(n).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"";return(n,r)=>(o(),s("main",b,[t("div",w,[r[0]||(r[0]=t("h1",{class:"text-3xl font-bold mb-8 font-mono"}," Blog ",-1)),t("div",k,[(o(!0),s(u,null,p(h(_),e=>(o(),s("article",{key:e._path,class:"group cursor-pointer p-4 -mx-4 rounded-lg hover:bg-neutral-800/30 transition-colors",tabindex:"0",onClick:l=>d(e._path),onKeydown:f(l=>d(e._path),["enter"])},[t("div",B,[t("div",C,[t("time",null,i(m(e.date)),1),t("div",S,[(o(!0),s(u,null,p(e.tags,l=>(o(),s("span",{key:l,class:"px-2 py-0.5 rounded-full bg-neutral-800 text-xs"},i(l),1))),128))])]),t("h2",K,i(e.title),1),t("p",$,i(e.description),1)])],40,D))),128))])])]))}};export{T as default};
