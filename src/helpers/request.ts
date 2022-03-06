import {
  blogInfo, blogPostInfo,
  responseAuthData,
  responseBlogDetail,
  responseCreatedBlog,
  responseGetBlogsData, responsePossibleData, userAuthInfo,/*, userAuthInfo*/
} from '@/types/responseData';
import axios, {AxiosRequestConfig, Method,} from 'axios';
import {message} from 'ant-design-vue';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com';

const errorMsg = (msg: string) => {
  message.error(msg);
};

const storeToken = (tokenStr: string) => {
  window.localStorage
    ? localStorage.setItem('token', tokenStr)
    : (localStorage.token = tokenStr);
};

// 函数重载
/*
* Auth
* GET '/auth' @API getInfo()
* GET '/auth/logout' @API logout()
* POST '/auth/register' @API register()
* POST '/auth/login' @API login()
*
* Blog
* GET '/blog' without userId @API getIndexBlogs()
* GET '/blog' with userId @API getBlogs()
* GET '/blog/:blogId' @API getBlogs()
* POST '/blog' @API createBlog()
* PATCH '/blog/:blogId' @API updateBlog()
* DELETE '/blog/:blogId' @API deleteBlog()
* */

// '/auth'
function request(url: '/auth', type: 'GET'): Promise<responseAuthData> // GET '/auth' @API getInfo()
function request(url: '/auth/logout', type: 'GET'): Promise<responseAuthData> // '/auth/logout' @API logout()
function request(url: '/auth/register', type: 'POST', data: { username: string, password: string }): Promise<responseAuthData> // POST '/auth/register' @API register()
function request(url: string, type: 'POST', data: { username: string, password: string }): Promise<responseAuthData> // POST '/auth/login' @API login()
// '/blog'
function request(url: string, type: 'GET', data: { page: number, atIndex: boolean, }): Promise<responseCreatedBlog> // GET '/blog' without userId @API getIndexBlogs()
function request(url: string, type: 'GET', data: { page: number, atIndex?: boolean, userId?: number }): Promise<responseGetBlogsData> // '/blog' with userId @API getBlogs()
function request(url: string, type?: 'GET'): Promise<responseBlogDetail> // GET '/blog/:blogId' @API getBlogs()
function request(url: string, type: 'POST', data: blogPostInfo): Promise<responseBlogDetail> // POST '/blog' @API createBlog()
function request(url: string, type: 'PATCH', data: blogPostInfo): Promise<responseCreatedBlog> // PATCH '/blog/:blogId' @API updateBlog()
function request(url: string, type: 'DELETE'): Promise<responseCreatedBlog> // DELETE '/blog/:blogId' @API deleteBlog()
// 函数签名 signature
function request(
  url: string,
  type: Method = 'GET',
  data?: blogInfo | userAuthInfo | blogPostInfo): Promise<responsePossibleData> {
  return new Promise((resolve, reject) => {
    // 配置axios选项参数
    const option: AxiosRequestConfig = {
      url,
      method: type
    };

    // 配置数据
    type.toUpperCase() === 'GET'
      ? option.params = data // 以查询参数方式 传递数据
      : option.data = data; // 以 application/x-www-form-urlencoded 方式 传递数据

    // 携带JWT，设置请求头字段 axios.defaults.headers.common['Authorization']
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.token;
    }

    axios(option)
      .then(res => {
        // 接口文档约定 res.data.status: 'ok' 见 http://dw-z.ink/2j4pC
        if (res.data.status === 'ok') {
          // jwt
          res.data.token && storeToken(res.data.token);
          // res.data.msg && message.info(res.data.msg); // 具体提示信息由不同组件按需要实现
          return resolve(res.data);
        } else {
          errorMsg(res.data.msg);
          return resolve(res.data); // reject 放到下面 .catch 中统一处理
        }
      })
      .catch(err => {
        errorMsg('网络有异常');
        return reject({msg: '网络有异常', errorDetail: err});
      });
  });
}

export default request;

// 方法使用范例
// request('/auth/login', 'POST', {username: 'Jack', password: '123456'})
// .then(response => { console.log(response.data)})
