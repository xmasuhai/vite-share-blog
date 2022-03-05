// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {responseAuthData, responseBlogDetail, userAuthInfo} from '@/types/responseData';

const URL = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_info: '/auth',
};

export default {
  register(data: userAuthInfo): Promise<responseAuthData> {
    return request(URL.register, 'POST', data);
  },
  login(data: userAuthInfo): Promise<responseAuthData> {
    return request(URL.login, 'POST', data);
  },
  logout(): Promise<responseBlogDetail> {
    // 用户登出，删除 jwt parameters
    window.localStorage
      ? localStorage.removeItem('token')
      : (localStorage.token = null);
    return request(URL.logout, 'GET');
  },
  getInfo(): Promise<responseBlogDetail> {
    return request(URL.get_info, 'GET');
  },
};
