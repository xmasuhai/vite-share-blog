// import {AxiosPromise} from 'axios';

export interface responseData {
  status: string;
  msg: string;
  isLogin?: boolean;
  data: {
    id: number;
    username: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  }
}

export type userAuthInfo = {
  username: string,
  password: string
}
