// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {responseAuthData, responseData, userAuthInfo} from '@/types/responseData';


export type AuthURLType = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_info: '/auth',
};

export const AuthURL: AuthURLType = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_info: '/auth',
};

export default {
  register(data: userAuthInfo): Promise<responseAuthData> {
    return request(AuthURL.register, 'POST', data);
  },
  login(data: userAuthInfo): Promise<responseAuthData> {
    return request(AuthURL.login, 'POST', data);
  },
  logout(): Promise<responseData> {
    return request(AuthURL.logout, 'GET');
  },
  getUserInfo(): Promise<responseAuthData> {
    return request(AuthURL.get_info, 'GET');
  },
};
