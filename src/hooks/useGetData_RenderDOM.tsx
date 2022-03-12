import EmptyPage from '@/components/EmptyPage';
import UserInfo from '@/components/user-authentication/UserInfo';
import useGetBlogList from '@/hooks/useGetBlogList';
import useAuthStore from '@/store/modules/auth';
import blogIndex from '@/styles/blog-index.module.scss';
import cssUser from '@/styles/blog-user.module.scss';
import splitDate from '@/utils/splitDate';
import {Pagination} from 'ant-design-vue';
import classNames from 'classnames';

export default function useGetData_RenderDOM(blogUser: 'self' | 'others') {
  const getUser = () => {
    const authStore = useAuthStore();
    return ref(authStore.getUser);
  };

  // response data
  const {
    blogDataList,
    currentPage,
    allPages,
    pageSize,
    user: getOthers,
    showEmptyPage,
    onPageChange
  } = useGetBlogList(blogUser);

  const user = blogUser === 'self'
    ? getUser()  // 从 Store 中取出当前已登录用户数据，据此来渲染用户信息
    : getOthers; // 从 getBlogByUserId 得到的 blogDataList[0] 中取出用户数据，据此来渲染用户信息

  // 渲染空白页占位
  const renderEmptyPage = () => {
    return (
      <EmptyPage/>
    );
  };

  // 渲染用户信息
  const renderUserInfo = () => {
    if (user.value) {
      const {avatar, username,} = user.value;

      return (
        <UserInfo username={username}
                  avatar={avatar}/>
      );
    }
  };

  // 渲染分页
  const renderPagination = () => {
    return (
      <section class={blogIndex.pagination}
               id="pagination">
        <Pagination total={allPages.value}
                    pageSize={pageSize.value}
                    v-model:current={currentPage.value}
                    onChange={onPageChange}/>
      </section>
    );
  };

  // 渲染文章列表
  const renderArticleList = () => {
    return (
      <section>
        {blogDataList.value && blogDataList.value.map((blogData) => {
          const {/*atIndex, */updatedAt, createdAt, description, id: blogId, title, user} = blogData;
          const {/*avatar, username, */id: userId, updatedAt: updateUserAt, createdAt: createUserAt} = user;
          const {date, month, year} = splitDate(createdAt);

          const renderDate = () => {
            return (
              <div class={cssUser.date}>
                <span class={classNames([cssUser.day, cssUser.dateItem])}>
                  {date}
                  </span>
                <span class={cssUser.dateItem}>
                {month}
                </span>
                <span class={cssUser.dateItem}>
                {year}
                </span>
              </div>
            );
          };

          const renderMyBlogLink = () => {
            return (
              <>
                <router-link to={`/edit/${1}`}
                             class={cssUser.edit}>
                  编辑
                </router-link>
                <a href="#"
                   class={cssUser.delete}>
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

          const renderArticleDescription = () => {
            return (
              <>
                <h3 class={cssUser.title}>
                  {title}
                </h3>
                <p class={classNames([cssUser.description, blogIndex.omitText])}>
                  {description}
                </p>

                <div class={cssUser.actions}>
                  {
                    blogUser === 'self'
                      ? renderMyBlogLink()
                      : renderUserBlogLink()
                  }
                  <router-link to={`/detail/${blogId}`}
                               class={cssUser.detailLink}>
                    博客详情&gt;&gt;&gt;
                  </router-link>
                </div>
              </>
            );
          };

          return (
            <article key={`${blogId}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}>
              <div class={cssUser.item}>
                {renderDate()}
                {renderArticleDescription()}
              </div>
              <hr/>
            </article>
          );
        })}
      </section>
    );
  };

  // 渲染该组件所有页面
  const renderFullPage = () => {
    return (
      <>
        {renderArticleList()}
        {renderPagination()}
      </>
    );
  };

  return {
    showEmptyPage,
    renderUserInfo,
    renderEmptyPage,
    renderFullPage,
  };
}
