import {AxiosRequestConfig, AxiosResponse} from 'axios';

// 自定义自己的拦截器类型
export interface Interceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  requestInterceptorCatch?: (err: any) => any,
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  responseInterceptorCatch?: (err: any) => any,
}

// 通过接口继承的方式扩展axios的AxiosRequestConfig类型
export interface Config extends AxiosRequestConfig {
  interceptor?: Interceptor;
}
