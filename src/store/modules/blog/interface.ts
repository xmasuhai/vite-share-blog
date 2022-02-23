import {ActionContext} from 'vuex';
import RootStateTypes from '@/store/interface';

export default interface BlogModuleTypes {
  user: string | null,
  isLogin: boolean
}
export type ActionContextType = ActionContext<BlogModuleTypes, RootStateTypes>;

export type blogState = BlogModuleTypes
