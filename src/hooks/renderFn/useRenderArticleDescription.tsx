import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import {useRenderBlogLink} from '@/hooks/renderFn/useRenderBlogLink';
import blogIndex from '@/styles/blog-index.module.scss';

// 渲染文章 - 描述 renderArticleDescription
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';

export const useRenderArticleDescription = (
  title: string,
  description: string,
  blogId: number,
  blogUser: blogUserType,
  onDelete: onDeleteFnType
) => {
  return (
    <>
      <h3 class={cssUser.title}>
        {title}
      </h3>
      <p class={classNames([cssUser.description, blogIndex.omitText])}>
        {description}
      </p>

      <div class={cssUser.actions}>
        {useRenderBlogLink(blogId, blogUser, onDelete)}
        <router-link to={`/detail/${blogId}`}
                     class={cssUser.detailLink}>
          博客详情&gt;&gt;&gt;
        </router-link>
      </div>
    </>
  );
};
