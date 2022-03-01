// import {AxiosPromise} from 'axios';

type blogFullInfo = {
  id: number, // 博客 id
  title: string,
  description: string,
  user: {
    id: number, // 博客所属用户 id,
    username: string, // 博客所属用户的 username
    avatar: string
  },
  createdAt: string, // 创建时间
  updatedAt: string // 更新时间
}

export interface responseBlogData extends responseData {
  total: number, // 全部博客的总数
  page: number, // 当前页数
  totalPage: number, // 总页数
  data: blogFullInfo | blogFullInfo[]
}

export interface responseAuthData extends responseData {
  isLogin: boolean;
  data: {
    id: number;
    username: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface responseData {
  status: 'ok' | 'fail';
  msg: string;
}

export type userAuthInfo = {
  username: string,
  password: string
}
