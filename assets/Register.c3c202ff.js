import{e as m,k as t,o as h,u as w,f as g,g as s,w as k,x as f,A as C,F as y}from"./vendor.925d87d6.js";import{u as L,a as U,c as v,U as r,b as T,m as x}from"./useIdentifyCompName.ca76d400.js";import{u as H}from"./useIfLoading.d1a945f6.js";import{u as I}from"./index.15c4d6a0.js";var z=m({name:"Register",props:{},components:{},setup(){const e=t(!1),p=L();h(async()=>{await p()}),U();const l=I(),d=w(),n=t(""),i=t(""),u=t(""),c=g(()=>({username:n.value,password:u.value})),o=a=>{l.register(a).then(()=>(e.value=H().loading.value,d.push({path:"/login"})))};return{username:n,password:i,passwordCheck:u,userLoginInfo:c,onRegister:o,keyUpHandler:a=>{["Enter"].includes(a.key)&&o({username:n.value,password:i.value})},clickHandler:a=>{o(a)},isLoading:e}},render(){return s(y,null,[s("section",{class:v.login},[s(r,{title:"\u7528\u6237\u540D",errorText:"\u5F53\u524D\u7528\u6237\u540D\u5DF2\u6CE8\u518C",username:this.username,"onUpdate:username":e=>this.username=e,autoComplete:"new-password"},null),s(r,{title:"\u5BC6\u7801",inputType:"password",errorText:"\u5F53\u524D\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u5339\u914D",password:this.password,"onUpdate:password":e=>this.password=e,autoComplete:"new-password"},null),s(r,{title:"\u786E\u8BA4\u5BC6\u7801",inputType:"password",placeholder:"\u8BF7\u91CD\u590D\u8F93\u5165\u4E00\u904D\u5BC6\u7801",errorText:"\u4E24\u6B21\u5BC6\u7801\u8F93\u5165\u4E0D\u4E00\u81F4",passwordCheck:this.passwordCheck,"onUpdate:passwordCheck":e=>this.passwordCheck=e,onKeyUp:this.keyUpHandler,autoComplete:"new-password"},null),s(T,{btnName:"\u7ACB\u5373\u6CE8\u518C",tipText:"\u5DF2\u6709\u8D26\u53F7\uFF1F",linkTo:"/login",linkText:"\u7ACB\u5373\u767B\u5F55",onHandleSubmit:()=>{this.clickHandler(this.userLoginInfo)}},null)]),k(s("section",{class:x.mask},[s(C,{tip:"Loading...",size:"large",spinning:this.isLoading},null)]),[[f,this.isLoading]])])}});export{z as default};