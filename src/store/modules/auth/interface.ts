import {responseData} from '@/types/responseData';

export default interface AuthModuleTypes {
  isLogin: boolean
  userData: responseData['data'] | null,
}

export type logString = {
  username: string,
  password: string
}
