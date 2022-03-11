import useAuthStore from '@/store/modules/auth';
import {defineComponent,} from 'vue';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';
import UserInfo from '@/components/user-authentication/UserInfo';
import EmptyPage from '@/components/EmptyPage';
import useGetBlogList from '@/hooks/useGetBlogList';
import splitDate from '@/utils/splitDate';
import blogIndex from '@/styles/blog-index.module.scss';
import {Pagination} from 'ant-design-vue';
import {blogFullInfo} from '@/types/responseData';

const MyBlogProps = {
  isShow: Boolean,
};

export default defineComponent({
  name: 'MyBlog',
  props: MyBlogProps,
  components: {},
  setup(/*props, ctx*/) {
    const authStore = useAuthStore();
    const user = ref(authStore.getUser);
    // response data
    const {
      blogDataList,
      currentPage,
      allPages,
      pageSize,
      showEmptyPage,
      onPageChange
    } = useGetBlogList('self');

    // 渲染空白页占位
    const renderEmptyPage = () => {
      return (
        <EmptyPage/>
      );
    };

    // 从 Store 中取出当前已登录用户数据，据此来渲染用户信息
    const renderUserInfo = () => {
      if (user.value) {
        const {username, avatar} = user.value;

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
          {blogDataList && (blogDataList.value as blogFullInfo[]).map((blogData: blogFullInfo) => {
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
                    <router-link to={`/edit/${1}`}
                                 class={cssUser.edit}>
                      编辑
                    </router-link>
                    <a href="#"
                       class={cssUser.delete}>
                      删除
                    </a>
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
      onPageChange,
      renderUserInfo,
      renderEmptyPage,
      renderFullPage,
    };
  },
  render() {
    return (
      <>
        {this.renderUserInfo()}
        {this.showEmptyPage
          ? this.renderEmptyPage()
          : this.renderFullPage()
        }
      </>
    );
  }

});
