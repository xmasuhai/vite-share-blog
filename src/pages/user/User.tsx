import blogIndex from '@/styles/blog-index.module.scss';
import splitDate from '@/utils/splitDate';
import {Pagination} from 'ant-design-vue';
import {defineComponent,} from 'vue';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';
import EmptyPage from '@/components/EmptyPage';
import UserInfo from '@/components/user-authentication/UserInfo';
import useGetBlogList from '@/hooks/useGetBlogList';

export default defineComponent({
  name: 'User',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    // response data
    const {
      blogDataList,
      currentPage,
      allPages,
      pageSize,
      user,
      showEmptyPage,
      onPageChange
    } = useGetBlogList('others');

    return {
      blogDataList,
      currentPage,
      allPages,
      pageSize,
      user,
      showEmptyPage,
      onPageChange
    };
  },
  render() {
    // 从 getBlogByUserId 得到的 blogDataList[0] 中取出用户数据
    const renderUserInfo = () => {
      const blogData = this.blogDataList && this.blogDataList[0];
      const {user} = blogData ?? {};
      if (user) {
        const {avatar, username,} = user;

        return (
          <UserInfo username={username}
                    avatar={avatar}/>
        );
      }
    };

    const emptyPage = () => {
      return (
        <EmptyPage/>
      );
    };

    const renderArticleList = () => {
      return (
        <section>
          {this.blogDataList && this.blogDataList.map((blogData) => {
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
                    <span>
                      阅读量
                    </span>
                    <router-link to={`/detail/${blogId}`}
                                 className={cssUser.detailLink}>
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

    const renderPagination = () => {
      return (
        <section class={blogIndex.pagination}
                 id="pagination">
          <Pagination total={this.allPages}
                      pageSize={this.pageSize}
                      v-model:current={this.currentPage}
                      onChange={this.onPageChange}/>
        </section>
      );
    };

    const renderFullPage = () => {
      return (
        <>
          {renderArticleList()}
          {renderPagination()}
        </>
      );
    };

    return (
      <>
        {renderUserInfo()}
        {this.showEmptyPage
          ? emptyPage()
          : renderFullPage()
        }
      </>
    );
  }

});
