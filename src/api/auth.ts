// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {responseAuthData, userAuthInfo} from '@/types/responseData';

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
  logout() {
    return request(URL.logout);
  },
  getInfo(): Promise<responseAuthData> {
    return request(URL.get_info);
  },
};
