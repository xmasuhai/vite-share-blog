// import {AxiosPromise} from 'axios';

type blogPostInfo = {
  title: string,
  description?: string,
  content: string,
  atIndex: boolean
}

type blogUser = {
  id: number, // 博客所属用户 id,
  username: string, // 博客所属用户的 username
  avatar: string,
  updatedAt: string,
  createdAt: string,
}

type blogFullInfo = {
  atIndex?: boolean,
  id: number, // 博客 id
  title: string,
  description: string,
  content: string,
  user: blogUser,
  createdAt: string, // 创建时间
  updatedAt: string // 更新时间
}

export interface responseBlogDetail extends responseData {
  data: blogFullInfo;
}

export interface responseCreatedBlog extends responseData {
  total?: number, // 全部博客的总数
  page?: number, // 当前页数
  totalPage?: number, // 总页数
  isLogin?: boolean;
  data?: blogFullInfo
}

export interface responseGetBlogsData extends responseData {
  total?: number, // 全部博客的总数
  page?: number, // 当前页数
  totalPage?: number, // 总页数
  isLogin?: boolean;
  data?: blogFullInfo[]
}

export interface responseAuthData extends responseData {
  isLogin?: boolean;
  data?: {
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

export type blogInfo = {
  page: number,
  atIndex: boolean,
  userId?: number
}

export type responsePossibleData = responseAuthData | responseCreatedBlog | responseGetBlogsData | responseBlogDetail
