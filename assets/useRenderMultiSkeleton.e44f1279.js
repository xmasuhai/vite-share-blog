import{e as a,P as q,F as u,b,S as v,w as x,x as w}from"./vendor.c3c68332.js";import{a as y}from"./scrollToTop.c4b43072.js";const D="_article_ieisq_47",M="_item_ieisq_111",B="_avatar_ieisq_111",L="_img_ieisq_111",S="_info_ieisq_116",F="_title_ieisq_138",P="_text_ieisq_146",U="_date_ieisq_154",j="_description_ieisq_163",I="_detail-link_ieisq_172",N="_pagination_ieisq_180",T="_omit-text_ieisq_188";var H={article:D,item:M,avatar:B,img:L,info:S,title:F,text:P,date:U,description:j,"detail-link":"_detail-link_ieisq_172",detailLink:I,pagination:N,"omit-text":"_omit-text_ieisq_188",omitText:T};const Y=(e,t,i,r)=>a("section",{class:H.pagination,id:"pagination"},[a(q,{total:e,pageSize:t,current:i,"onUpdate:current":n=>i=n,onChange:r},null)]);function O(e){const t=typeof e=="object"?e:new Date(e);return{date:t.getDate(),month:t.getMonth()+1,year:t.getFullYear()}}const $=(e,t,i,r,n)=>a("section",null,[e&&e.map(o=>{const{updatedAt:s,createdAt:l,description:d,id:c,title:_,user:h}=o,{id:p,updatedAt:g,createdAt:m}=h,{date:f,month:A,year:k}=O(l);return a(u,null,[t(c,p,s,l,g,m,f,A,k,_,d,i,r,n)])})]),R={isLoading:{type:Boolean,required:!0},blogUser:{type:String,defaults:"self"},onDelete:{type:Function,default:()=>{}},hasAvatar:{type:[Boolean,Object],default:!1},hasParagraph:{type:[Boolean,Object],default:!0},hasTitle:{type:[Boolean,Object],default:!0},showHr:{type:Boolean,default:!0}};var C=b({name:"MultiSkeleton",props:R,components:{},setup(e){const t=e.blogUser,i=e.showHr,r=()=>Math.round(Math.random())*2-1,n=()=>new Date(Date.now()+Math.random()*1e4*1e4*r()),o=()=>Math.trunc(Math.random()*100)+1,s=()=>({atIndex:!0,id:o(),title:"",description:"",content:"",user:{id:o(),username:"",avatar:"",updatedAt:`${n()}`,createdAt:`${n()}`},createdAt:`${n()}`,updatedAt:`${n()}`}),l=new Array(20).fill(0).map(()=>s());return{user:t,isShowHr:i,blankBlogData:s,fakeBlogList:l,renderFakeArticleNode:()=>a("div",{class:y.space},[a(v,{loading:e.isLoading,avatar:e.hasAvatar||!1,paragraph:e.hasParagraph||!0,title:e.hasTitle||!0,active:!0},null),a("br",null,null),x(a("hr",null,null),[[w,i]]),a("br",null,null)])}},render(){return a(u,null,[$(this.fakeBlogList,this.renderFakeArticleNode,this.isLoading,this.user||"self",this.onDelete||(()=>{}))])}});const E=(e,t,i,r,n,o,s)=>a(C,{isLoading:e,blogUser:t,onDelete:i,hasAvatar:r||!1,hasParagraph:n||!0,hasTitle:o||!0,showHr:s},null);export{Y as a,H as b,$ as c,E as u};
