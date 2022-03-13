import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import {blogFullInfo} from '@/types/responseData';
import {Skeleton} from 'ant-design-vue';
// 渲染文章列表
import {useRenderArticleList} from '@/hooks/renderFn/useRenderArticleList';

// 渲染骨架屏
export const useRenderSkeleton = (
  isLoading: boolean,
  blogUser: blogUserType,
  onDelete: onDeleteFnType
) => {
  const randomPoNe = () => (Math.round(Math.random()) * 2 - 1);
  const randomDate = () => (new Date(Date.now() + Math.random() * 10000 * 10000 * randomPoNe()));
  const randomId = () => (Math.trunc(Math.random() * 100) + 1);
  const blankBlogData: () => blogFullInfo = () => ({
    atIndex: true,
    id: randomId(),
    title: '',
    description: '',
    content: '',
    user: {
      id: randomId(),
      username: '',
      avatar: '',
      updatedAt: `${randomDate()}`,
      createdAt: `${randomDate()}`,
    },
    createdAt: `${randomDate()}`,
    updatedAt: `${randomDate()}`
  });
  const fakeBlogList = new Array(20).fill(0).map(() => blankBlogData());
  const renderFakeArticleNode = () => {
    return (<Skeleton loading={isLoading} active/>);
  };

  return (
    <>{useRenderArticleList(fakeBlogList, renderFakeArticleNode, isLoading, blogUser, onDelete)}</>
  );
};
