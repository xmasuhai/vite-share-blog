import{b as f,k as a,u as g,c as v,e as s,w as k,x as y,A as L,F as U}from"./vendor.c3c68332.js";import{u as T}from"./index.3219fcb2.js";import{u as i}from"./useIfLoading.381d28c1.js";import{u as E,a as H,c as x,U as p,b as I,m as S}from"./mask-layer.module.0c2d9c1c.js";var R=f({name:"Login",props:{},components:{},setup(){const e=a(!1);E().then(),H();const h=T(),u=g(),l=a(""),d=a(""),m=a("admin001"),w=a("123456"),c=v(()=>({username:l.value,password:d.value})),t=a(!1),n=async r=>{e.value=!0,t.value=!1;const o=await h.login(r);return o.data?(e.value=i().value,u.push({path:u.currentRoute.value.query.redirect||"/"}).then(()=>{e.value=i().value}),window&&window.location.reload()):(o.status==="fail"&&(t.value=!0),e.value=i().value),o};return{username:l,password:d,defaultUsername:m,defaultPassword:w,userLoginInfo:c,onLogin:n,keyUpHandler:r=>{["Enter"].includes(r.key)&&n(c.value)},clickHandler:async r=>{await n(r)},isLoading:e,showError:t}},render(){return s(U,null,[s("section",{class:x.login},[s(p,{title:"\u7528\u6237\u540D",errorText:"\u5F53\u524D\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u5339\u914D",username:this.username,"onUpdate:username":e=>this.username=e,placeholder:`\u9ED8\u8BA4\u767B\u5F55\u540D\uFF1A${this.defaultUsername}`,showError:this.showError},null),s(p,{title:"\u5BC6\u7801",inputType:"password",errorText:"\u5F53\u524D\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u5339\u914D",password:this.password,"onUpdate:password":e=>this.password=e,onKeyUp:this.keyUpHandler,placeholder:`\u9ED8\u8BA4\u5BC6\u7801\uFF1A${this.defaultPassword}`,showError:this.showError},null),s(I,{btnName:"\u7ACB\u5373\u767B\u5F55",tipText:"\u6CA1\u6709\u8D26\u53F7\uFF1F",linkTo:"/register",linkText:"\u6CE8\u518C\u65B0\u7528\u6237",onHandleSubmit:async()=>{await this.clickHandler(this.userLoginInfo)}},null)]),k(s("section",{class:S.mask},[s(L,{tip:"Loading...",size:"large",spinning:this.isLoading},null)]),[[y,this.isLoading]])])}});export{R as default};
