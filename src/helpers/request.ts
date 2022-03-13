import {
  authString,
  blogInfo,
  blogPostInfo,
  blogString,
  responseAuthData,
  responseBlogDetail,
  responseCreatedBlog,
  responseData,
  responseGetBlogsData,
  responsePossibleData,
  userAuthInfo,
  /*, userAuthInfo*/
} from '@/types/responseData';
import axios, {AxiosRequestConfig, Method,} from 'axios';
import {message} from 'ant-design-vue';
import useStore from '@/store';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com';

/* 请求开始，则对 ajaxCount 加 1，请求成功 或是 失败 对 ajaxCount 减 1 */
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const store = useStore();
  // config 请求配置
  console.log('请求拦截器config', config);
  store.updateAjaxCount({ajaxCount: 1});
  console.log('store', store.ajaxCount);

  return config;
}, err => {
  const store = useStore();
  store.updateAjaxCount({ajaxCount: -1});
  return Promise.reject(err);
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
  const store = useStore();

  // res 响应结果
  console.log('响应拦截器res', res);

  // 请求成功 或是 失败 对 ajaxCount 减 1
  store.updateAjaxCount({ajaxCount: -1});
  console.log('store', store.ajaxCount);
  return res;
}, err => {
  const store = useStore();

  store.updateAjaxCount({ajaxCount: -1});
  return Promise.reject(err);
});

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
function request(url: '/auth', type?: 'GET'): Promise<responseAuthData> // GET '/auth' @API getUserInfo()
function request(url: '/auth/logout', type: 'GET'): Promise<responseData> // '/auth/logout' @API logout()
function request(url: '/auth/register', type: 'POST', data: { username: string, password: string }): Promise<responseAuthData> // POST '/auth/register' @API register()
function request(url: '/auth/login', type: 'POST', data: { username: string, password: string }): Promise<responseAuthData> // POST '/auth/login' @API login()
// '/blog'
function request(url: '/blog', type: 'GET', data: { page: number, atIndex: boolean, }): Promise<responseCreatedBlog> // GET '/blog' without userId @API getIndexBlogs()
function request(url: '/blog', type: 'GET', data: { page: number, atIndex?: boolean, userId?: number }): Promise<responseGetBlogsData> // '/blog' with userId @API getBlogs()
function request(url: Exclude<blogString, '/blog'>, type: 'GET'): Promise<responseBlogDetail> // GET '/blog/:blogId' @API getBlogs()
function request(url: '/blog', type: 'POST', data: blogPostInfo): Promise<responseBlogDetail> // POST '/blog' @API createBlog()
function request(url: Exclude<blogString, '/blog'>, type: 'PATCH', data: blogPostInfo): Promise<responseCreatedBlog> // PATCH '/blog/:blogId' @API updateBlog()
function request(url: Exclude<blogString, '/blog'>, type: 'DELETE'): Promise<responseCreatedBlog> // DELETE '/blog/:blogId' @API deleteBlog()
// 函数签名 signature
function request(
  url: authString | blogString,
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
