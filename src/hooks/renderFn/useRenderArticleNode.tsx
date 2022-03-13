import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import {useRenderArticleDescription} from '@/hooks/renderFn/useRenderArticleDescription';
import {useRenderDate} from '@/hooks/renderFn/useRenderDate';
import cssUser from '@/styles/blog-user.module.scss';

// 渲染文章节点
export const useRenderArticleNode = (
  blogId: number,
  userId: number,
  updatedAt: string,
  createdAt: string,
  updateUserAt: string,
  createUserAt: string,
  date: number,
  month: number,
  year: number,
  title: string,
  description: string,
  isLoading: boolean,
  blogUser: blogUserType,
  onDelete: onDeleteFnType
) => {
  return (
    <>
      <article key={`${blogId}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}
               v-show={!isLoading}>
        <div class={cssUser.item}>
          {useRenderDate(date, month, year)}
          {useRenderArticleDescription(title, description, blogId, blogUser, onDelete)}
        </div>
        <hr/>
      </article>
    </>);
};
