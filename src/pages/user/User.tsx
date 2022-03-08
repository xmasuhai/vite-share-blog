import blogIndex from '@/styles/blog-index.module.scss';
import {blogFullInfo, blogUser} from '@/types/responseData';
import splitDate from '@/utils/splitDate';
import {Pagination} from 'ant-design-vue';
import {defineComponent, ref,} from 'vue';
import {getBlogByUserId} from '@/api/blog';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';
import {useRoute, useRouter} from 'vue-router';
import EmptyPage from '@/components/EmptyPage';
import {scrollToTop} from '@/utils/scrollToTop';

export default defineComponent({
  name: 'User',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const route = useRoute();// 获取当前路由
    const router = useRouter();// 获取当前路由
    // response data
    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const allPages = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const user = ref<blogUser | null>(null);
    const userId = ref(0);
    const showEmptyPage = ref(false);

    // 调用 getBlogByUserId API 获取所有博客列表
    const invokeBlogByUserIdAPI = async (pageNum: number) => {
      const {
        data: blogList,
        total: totalDataCount,
        totalPage,
        page
      } = await getBlogByUserId({page: pageNum}, userId.value,);

      blogList && (blogDataList.value = blogList);
      totalDataCount && totalPage && (allPages.value = (pageSize.value * totalPage));
      page && (currentPage.value = page);

      return {
        blogList,
        totalPage,
        page
      };
    };

    const getBlogList = async () => {
      userId.value = parseInt(route.params.userId as string) || 1;
      currentPage.value = parseInt(route.query.page as string) || 1;

      const {blogList,} = await invokeBlogByUserIdAPI(currentPage.value);
      ;(blogList && blogList.length > 0) && (user.value = blogList[0].user);

      // data为空数组，展示空页面
      if (blogList?.length === 0) {
        showEmptyPage.value = true;
      }

    };

    const onPageChange = async (newPage: number) => {
      const {blogList} = await invokeBlogByUserIdAPI(newPage);
      const {user} = blogList ? blogList?.[0] : {user: {id: 0}};
      await router.push({path: `${user.id}`, query: {page: newPage}, replace: true});
      scrollToTop();
    };

    onMounted(async () => {
      await getBlogList();
    });

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
    const renderUserInfo = () => {
      const blogData = this.blogDataList && this.blogDataList[0];

      const {user} = blogData ?? {};
      if (user) {
        const {avatar, username, /*id: userId, updatedAt: updateUserAt, createdAt: createUserAt*/} = user;
        return (
          <div class={cssUser.userInfo}>
            <img src={avatar}
                 alt={username}
                 class={cssUser.avatar}/>
            <h3 class={cssUser.name}>
              {username}
            </h3>
          </div>
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
                                 className={cssUser.delete}>
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
