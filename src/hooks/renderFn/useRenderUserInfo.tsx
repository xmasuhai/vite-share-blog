// 渲染用户信息
import UserInfo from '@/components/user-authentication/UserInfo';
import {blogUser} from '@/types/responseData';

// 渲染用户信息
export const useRenderUserInfo = (user: blogUser) => {
  if (user) {
    const {avatar, username,} = user;

    return (
      <UserInfo username={username}
                avatar={avatar}/>
    );
  }
};
