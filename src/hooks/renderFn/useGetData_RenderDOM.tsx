import {computed} from 'vue';
import {useIfLoading} from '@/hooks/useIfLoading';
import {blogUserType,} from '@/hooks/renderFn/render';
import useAuthStore from '@/store/modules/auth';
import useGetBlogList from '@/hooks/useGetBlogList';

// 渲染文章节点
import {useRenderArticleNode} from '@/hooks/renderFn/useRenderArticleNode';
// 渲染文章列表
import {useRenderArticleList} from '@/hooks/renderFn/useRenderArticleList';
// 渲染分页
import {useRenderPagination} from '@/hooks/renderFn/useRenderPagination';
// 渲染骨架屏
import {useRenderMultiSkeleton} from '@/hooks/renderFn/useRenderMultiSkeleton';
// 渲染用户信息
import {useRenderUserInfo} from '@/hooks/renderFn/useRenderUserInfo';

export default function useGetData_RenderDOM(blogUserStr: blogUserType) {
  // 是否处于读取中状态，用来判断是否展示骨架屏
  const loading = useIfLoading();

  // 从 authStore 中获取已登录用户信息
  const authStore = useAuthStore();
  const getSelf = computed(() => {
    return authStore.getUser;
  });

  // 从 response data 获取数据
  const {
    blogDataList,
    currentPage,
    allPages,
    pageSize,
    user: getOthers,
    showEmptyPage,
    onPageChange,
    onDelete
  } = useGetBlogList(blogUserStr);

  // 判断 用户 为 已登录用户 或 其他用户
  const user = (
    blogUserStr === 'self'
      ? getSelf  // 从 Store 中取出当前已登录用户数据，据此来渲染用户信息
      : getOthers // 从 getBlogByUserId 得到的 blogDataList[0] 中取出用户数据，据此来渲染用户信息
  );

  // 渲染用户信息
  const renderUserInfo = () => {
    return user.value && useRenderUserInfo(user.value);
  };

  // 渲染该组件所有页面
  const renderFullPage = () => {
    return (
      <>
        {/* 渲染骨架屏 */}
        {loading.value && useRenderMultiSkeleton(
          loading.value,
          blogUserStr,
          onDelete,
          false,
          true,
          true,
        )}
        {/* 渲染文章列表 */}
        {blogDataList.value && useRenderArticleList(blogDataList.value, useRenderArticleNode, loading.value, blogUserStr, onDelete)}
        {/* 渲染分页 */}
        {useRenderPagination(allPages.value, pageSize.value, currentPage.value, onPageChange,)}
      </>
    );
  };

  return {
    showEmptyPage,
    renderUserInfo,
    renderFullPage,
  };
}
