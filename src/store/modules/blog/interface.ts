import {responseAuthData} from '@/types/responseData';

export default interface BolgModuleTypes {
  isLogin: boolean
  userData: responseAuthData['data'] | null,
}
