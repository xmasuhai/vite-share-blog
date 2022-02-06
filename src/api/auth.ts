// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';

const URL = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_info: '/auth',
};

type userAuthInfo = {
  username: string,
  password: string
}

export default {
  register(data: userAuthInfo) {
    return request(URL.register, 'POST', data);
  },
  login(data: userAuthInfo) {
    return request(URL.login, 'POST', data);
  },
  logout() {
    return request(URL.logout);
  },
  getInfo() {
    return request(URL.get_info);
  },
};
