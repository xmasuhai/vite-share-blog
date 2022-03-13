import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import {useRenderArticleNode} from '@/hooks/renderFn/useRenderArticleNode';
import {blogFullInfo} from '@/types/responseData';
import splitDate from '@/utils/splitDate';

// 渲染文章列表
export const useRenderArticleList = (
  blogDataList: blogFullInfo[],
  renderFn: typeof useRenderArticleNode,
  isLoading: boolean,
  blogUser: blogUserType,
  onDelete: onDeleteFnType,
) => {
  return (
    <section>
      {blogDataList && blogDataList.map((blogData) => {
        const {/*atIndex, */updatedAt, createdAt, description, id: blogId, title, user} = blogData;
        const {/*avatar, username, */id: userId, updatedAt: updateUserAt, createdAt: createUserAt} = user;
        const {date, month, year} = splitDate(createdAt);

        return (
          <>{
            renderFn(
            blogId,
            userId,
            updatedAt,
            createdAt,
            updateUserAt,
            createUserAt,
            date,
            month,
            year,
            title,
            description,
            isLoading,
            blogUser,
            onDelete,
          )}</>
        );
      })}
    </section>
  );
};
