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

const MyBlogProps = {
  isShow: Boolean,
};

export default defineComponent({
  name: 'MyBlog',
  props: MyBlogProps,
  components: {},
  setup(/*props, ctx*/) {
    const {
      blogDataList,
      currentPage,
      allPages,
      pageSize,
      showEmptyPage,
      onPageChange
    } = useGetBlogList('self');

    const authStore = useAuthStore();

    const user = ref(authStore.getUser);

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
    // 从 Store 中取出当前已登录用户数据
    const renderUserInfo = () => {
      if (this.user) {
        const {username, avatar} = this.user;

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
