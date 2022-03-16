import{e as L,u as k,t as P,k as g,v as $,g as e,w as y,x as B,F as p,j as w,i as b,h as C,r as S}from"./vendor.925d87d6.js";import{U as x,b as D}from"./beautifyDate.a42f1661.js";import{u as U,b as s,a as j}from"./useRenderMultiSkeleton.e92f28ab.js";import{u as N}from"./useIfLoading.d1a945f6.js";import{g as R}from"./blog.81dfdea6.js";import{s as A}from"./scrollToTop.559c9b1c.js";import"./index.15c4d6a0.js";function T(i){return typeof i=="function"||Object.prototype.toString.call(i)==="[object Object]"&&!w(i)}var _=L({name:"BlogIndex",props:{},setup(){const{loading:i}=N(),m=k(),f=P(),c=g([]),d=g(0),t=g(1),a=g(20),o=async l=>{const{data:u,total:h,totalPage:I,page:v}=await R({page:l});return u&&(c.value=u),h&&I&&(d.value=a.value*I),v&&(t.value=v),{blogList:u,totalPage:I,page:v}},r=async()=>{t.value=parseInt(f.query.page)||1,await o(t.value)},n=async l=>{A(),await o(l),await m.push({path:"/",query:{page:l}})};return $(async()=>{A(),await r()}),{blogDataList:c,currentPage:t,allPages:d,pageSize:a,getBlogList:r,onPageChange:n,loading:i}},render(){const i=t=>{const{user:a}=t,{avatar:o,id:r,username:n}=a;return e(p,null,[e("figure",{class:s.avatar},[e(x,{userId:r},{default:()=>[e("img",{class:s.img,src:o,alt:n},null)]}),e("figcaption",{class:s.info},[e(x,{userId:r},T(n)?n:{default:()=>[n]})])])])},m=t=>{const{createdAt:a,description:o,title:r}=t;return e(p,null,[e("h3",{class:s.title},[e("span",{class:s.text},[r]),e("span",{class:s.date},[`${D(a)}`,b(" ")])]),e("p",{class:C([s.description,s.omitText])},[o])])},f=t=>{const{id:a}=t;return e("p",{class:s.detailLink},[e(S("router-link"),{to:`/detail/${a}`},{default:()=>[b("\u8BE6\u7EC6 >>>")]})])},c=t=>{const{updatedAt:a,createdAt:o,id:r,user:n}=t,{id:l,updatedAt:u,createdAt:h}=n;return y(e("article",{class:s.item,key:`${r}${l}${a}${o}${u}${h}`},[i(t),m(t),f(t)]),[[B,!this.loading]])},d=t=>y(e("section",{class:"article-list"},[t.map(a=>e(p,null,[c(a)]))]),[[B,!this.loading]]);return e(p,null,[this.loading&&U(this.loading,"others",()=>{},!0,!0,!0,!1),this.blogDataList&&d(this.blogDataList),j(this.allPages,this.pageSize,this.currentPage,this.onPageChange)])}});export{_ as default};
