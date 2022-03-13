// 渲染文章 - 链接 renderBlogLink <My/User Blog>
import {onDeleteFnType} from '@/hooks/renderFn/render';
import cssUser from '@/styles/blog-user.module.scss';

export const useRenderBlogLink = (blogId: number, blogUser: string, onDelete: onDeleteFnType) => {
  const renderMyBlogLink = () => {
    return (
      <>
        <router-link to={`/edit/${blogId}`}
                     class={cssUser.edit}>
          编辑
        </router-link>
        <a href="#"
           class={cssUser.delete}
           onClick={(e) => {onDelete(e, blogId);}}>
          删除
        </a>
      </>
    );
  };
  const renderUserBlogLink = () => {
    return (
      <span>
        阅读量
      </span>
    );
  };

  return (
    <>
      {
        blogUser === 'self'
          ? renderMyBlogLink()
          : renderUserBlogLink()
      }
    </>
  );
};
