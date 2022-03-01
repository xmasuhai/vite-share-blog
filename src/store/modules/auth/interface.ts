import {responseAuthData} from '@/types/responseData';

export default interface AuthModuleTypes {
  isLogin: boolean
  userData: responseAuthData['data'] | null,
}

export type logString = {
  username: string,
  password: string
}
