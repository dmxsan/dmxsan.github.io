import{i as b,u as w,a as E,m as x,p as h}from"./ChBTVfoJ.js";import{z as S,A as B,k as z,B as u,i as I,C,c as L,h as P,o as N,D as A,g as c,E as $}from"./DtbfG8E9.js";const q=["src"],M=S({__name:"NuxtImg",props:b,emits:["load","error"],setup(y,{emit:_}){const s=y,v=B(),a=_,p=!1,d=w(),t=E(s),i=z(!1),o=z(),l=u(()=>d.getSizes(s.src,{...t.options.value,sizes:s.sizes,densities:s.densities,modifiers:{...t.modifiers.value,width:h(s.width),height:h(s.height)}})),f=u(()=>{const e={...t.attrs.value,"data-nuxt-img":""};return(!s.placeholder||i.value)&&(e.sizes=l.value.sizes,e.srcset=l.value.srcset),e}),n=u(()=>{let e=s.placeholder;if(e===""&&(e=!0),!e||i.value)return!1;if(typeof e=="string")return e;const r=Array.isArray(e)?e:typeof e=="number"?[e,e]:[10,10];return d(s.src,{...t.modifiers.value,width:r[0],height:r[1],quality:r[2]||50,blur:r[3]||3},t.options.value)}),m=u(()=>s.sizes?l.value.src:d(s.src,t.modifiers.value,t.options.value)),g=u(()=>n.value?n.value:m.value),k=I().isHydrating;return C(()=>{if(n.value||s.custom){const e=new Image;m.value&&(e.src=m.value),s.sizes&&(e.sizes=l.value.sizes||"",e.srcset=l.value.srcset),e.onload=r=>{i.value=!0,a("load",r)},e.onerror=r=>{a("error",r)},x("nuxt-image");return}o.value&&(o.value.complete&&k&&(o.value.getAttribute("data-error")?a("error",new Event("error")):a("load",new Event("load"))),o.value.onload=e=>{a("load",e)},o.value.onerror=e=>{a("error",e)})}),(e,r)=>e.custom?P(e.$slots,"default",$(A({key:1},{...c(p)?{onerror:"this.setAttribute('data-error', 1)"}:{},imgAttrs:{...f.value,...c(v)},isLoaded:i.value,src:g.value}))):(N(),L("img",A({key:0,ref_key:"imgEl",ref:o,class:n.value&&!i.value?e.placeholderClass:void 0},{...c(p)?{onerror:"this.setAttribute('data-error', 1)"}:{},...f.value,...c(v)},{src:g.value}),null,16,q))}});export{M as _};
