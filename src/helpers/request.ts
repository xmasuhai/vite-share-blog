import {responseAuthData, responseCreatedBlog,/*, userAuthInfo*/} from '@/types/responseData';
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

// 函数重写
function request(url: string): Promise<responseAuthData>
function request(url: string, type: Method, data: {}): Promise<responseAuthData>
function request(url: string, type: 'POST', data: {}): Promise<responseCreatedBlog>
function request(url: string, type: Method): Promise<responseCreatedBlog>
function request(url: string,
                 type: Method = 'GET',
                 data = {}): Promise<responseCreatedBlog | responseAuthData> {
  return new Promise((resolve, reject) => {
    // 配置axios选项参数
    const option: AxiosRequestConfig = {
      url,
      method: type
    };

    // 配置数据
    type.toUpperCase() === 'GET'
      ? option.params = data // 以查询参数方式 传递数据
      : option.data = data; // 以json方式 传递数据

    // 用户登出，删除 jwt parameters
    if (url === '/auth/logout') {
      window.localStorage
        ? localStorage.removeItem('token')
        : (localStorage.token = null);
    }

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
