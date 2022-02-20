// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {responseData, userAuthInfo} from '@/types/responseData';
import {AxiosPromise} from 'axios';

const URL = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_info: '/auth',
};

export default {
  register(data: userAuthInfo): AxiosPromise<responseData> {
    return request(URL.register, 'POST', data);
  },
  login(data: userAuthInfo) {
    return request(URL.login, 'POST', data);
  },
  logout() {
    return request(URL.logout);
  },
  getInfo(): AxiosPromise {
    return request(URL.get_info);
  },
};
