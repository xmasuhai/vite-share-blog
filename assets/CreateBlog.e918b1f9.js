import{u as r,A as s}from"./ArticleTemplate.38a36eae.js";import{c as n}from"./blog.0eee85ba.js";import{d as l,c as p,G as u,u as i}from"./index.d10dc684.js";import"./index.77e36df0.js";import"./SearchOutlined.15de5285.js";import"./index.9563d230.js";import"./KeyCode.e4ba36c3.js";var w=l({name:"CreateBlog",props:{},components:{},beforeRouteLeave(){if(!window.confirm("Do you really want to leave? you have unsaved changes!"))return!1},setup(){const o=r(),t=u("$message"),a=i();return{postBlog:()=>{n(o.getBlogFullInfo).then(e=>(t&&t.success(e.msg),e.data&&a.push({path:`/detail/${e.data.id}`})))}}},render(){return p(s,{mainTitle:"\u521B\u5EFA\u6587\u7AE0",btnText:"\u53D1\u5E03\u6587\u7AE0",onHandleClick:this.postBlog,mode:"create"},null)}});export{w as default};
