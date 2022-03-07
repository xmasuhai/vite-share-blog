import {blogFullInfo, blogUser} from '@/types/responseData';
import {defineComponent, ref,} from 'vue';
import {getBlogByUserId} from '@/api/blog';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';
import {useRoute,} from 'vue-router';
import EmptyPage from '@/components/EmptyPage';

export default defineComponent({
  name: 'User',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const route = useRoute();// 获取当前路由
    // response data
    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const allPages = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const user = ref<blogUser | null>(null);
    const userId = ref(0);
    const showEmptyPage = ref(false);

    // 调用 getBlogByUserId API 获取所有博客列表
    const getBlogList = async () => {
      userId.value = parseInt(route.params.userId as string) || 1;

      const {
        data: blogList,
        /*total: totalDataCount,*/
        totalPage,
        page
      } = await getBlogByUserId(userId.value, {page: currentPage.value});
      blogList && (blogDataList.value = blogList);
      allPages.value = totalPage;
      currentPage.value = page;
      (blogList && blogList.length > 0) && (user.value = blogList[0].user);

      // data为空数组，展示空页面
      if (blogList?.length === 0) {
        showEmptyPage.value = true;
      }

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
      showEmptyPage
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

    const renderArticle = () => {
      return (
        <section>
          {this.blogDataList && this.blogDataList.map((blogData) => {
            const {/*atIndex, */updatedAt, createdAt, description, id: blogId, title, user} = blogData;
            const {/*avatar, username, */id: userId, updatedAt: updateUserAt, createdAt: createUserAt} = user;

            return (
              <article key={`${blogId}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}>
                <div class={cssUser.item}>
                  <div class={cssUser.date}>
                    <span class={classNames([cssUser.day, cssUser.dateItem])}>
                      20
                    </span>
                    <span class={cssUser.dateItem}>
                      5月
                    </span>
                    <span class={cssUser.dateItem}>
                      2021
                    </span>
                  </div>

                  <h3 class={cssUser.title}>
                    {title}
                  </h3>
                  <p class={cssUser.description}>
                    {description}
                  </p>
                  <div class={cssUser.actions}>
                    <span>
                      阅读量
                    </span>
                    <router-link to={`/detail/${blogId}`}
                                 class={cssUser.delete}>
                      博客详情&gt;&gt;&gt;
                    </router-link>
                  </div>
                </div>
                <hr/>
              </article>
            );
          })}
        </section>
      );
    };

    return (
      <>
        {renderUserInfo()}

        {this.showEmptyPage
          ? emptyPage()
          : renderArticle()
        }
      </>
    );
  }

});
