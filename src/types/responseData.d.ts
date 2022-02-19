import {AxiosPromise} from 'axios';

export interface responseData {
  data: AxiosPromise<
    {
      status: String;
      msg: String;
      isLogin?: Boolean;
      data?: {
        id: Number;
        username: String;
        avatar: String;
        createdAt: String;
        updatedAt: String;
      }
    }
    >
}
