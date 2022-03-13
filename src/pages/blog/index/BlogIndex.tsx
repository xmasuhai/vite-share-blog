import UserLink from '@/components/user-authentication/UserLink';
import classNames from 'classnames';
import {defineComponent,/* inject, */ref} from 'vue';
import {useRouter, useRoute} from 'vue-router';
// request API
import {getIndexBlogs} from '@/api/blog';
// CSS module
import blogIndex from '@/styles/blog-index.module.scss';
// UI lib
import {Pagination} from 'ant-design-vue';
import {blogFullInfo} from '@/types/responseData';
// utils
import {scrollToTop} from '@/utils/scrollToTop';
import {beautifyDate} from '@/utils/beautifyDate';

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    // const popMessage = inject<typeof message>('$message');
    const router = useRouter(); // 路由实例
    const route = useRoute();// 当前路由

    // data
    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const allPages = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);

    // 调用 getIndexBlogs API 获取所有博客列表
    const invokeBlogByUserIdAPI = async (pageNum: number) => {
      const {
        /*msg,*/
        data: blogList,
        total: totalDataCount,
        totalPage,
        page
      } = await getIndexBlogs({page: pageNum}); // 默认为 第一页
      // popMessage && popMessage.success(msg);
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
      // 从路由URL路径参数取出当前页码值 route.query.page 'http://localhost:3000/#/?page=1'
      currentPage.value = parseInt(route.query.page as string) || 1;
      await invokeBlogByUserIdAPI(currentPage.value);
    };

    // 博客页跳转逻辑 跳转页码 重新获取对应页码的数据 显示在首页
    const onPageChange = async (newPage: number) => {
      await invokeBlogByUserIdAPI(newPage);
      // 使用 router.push 编程式导航至 新的页码值
      // 显示在路由URL路径参数中 例如：'http://localhost:3000/#/?page=2'
      await router.push({path: '/', query: {page: newPage}});
      // 回城
      scrollToTop();
    };

    // 挂载时 获取并显示博客列表，（也可直接放在setup中，除非 配置SSR）
    onBeforeMount(async () => {
      await getBlogList();
    });

    return {
      blogDataList,
      currentPage,
      allPages,
      pageSize,
      getBlogList,
      onPageChange
    };
  },
  render() {
    return (
      <>
        {/* 首页博客列表 */}
        <section class="article-list">
          {this.blogDataList && this.blogDataList.map((blogData) => {
            const {/*atIndex, */updatedAt, createdAt, description, id: blogId, title, user} = blogData;
            const {avatar, id: userId, username, updatedAt: updateUserAt, createdAt: createUserAt} = user;

            return (
              /* 文章条目 */
              <article class={blogIndex.item}
                       key={`${blogId}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}>

                {/* 作者信息 */}
                <figure class={blogIndex.avatar}>
                  <UserLink userId={userId}>
                    <img class={blogIndex.img}
                         src={avatar}
                         alt={username}/>
                  </UserLink>
                  <figcaption class={blogIndex.info}>
                    <UserLink userId={userId}>
                      {username}
                    </UserLink>
                  </figcaption>
                </figure>

                {/* 博客概览 */}
                <h3 class={blogIndex.title}>
                  <span class={blogIndex.text}>{title}</span>
                  <span class={blogIndex.date}>
                    {`${beautifyDate(createdAt)}`} {/* 美化时间显示 */}
                  </span>
                </h3>
                <p class={classNames([blogIndex.description, blogIndex.omitText])}>
                  {description}
                </p>

                {/* 跳转到博客详细 */}
                <p class={blogIndex.detailLink}>
                  <router-link to={`/detail/${blogId}`}>
                    详细 &gt;&gt;&gt;
                  </router-link>
                </p>

              </article>
            );
          })}
        </section>

        {/* 分页 */}
        <section class={blogIndex.pagination}
                 id="pagination">
          <Pagination total={this.allPages}
                      pageSize={this.pageSize}
                      v-model:current={this.currentPage}
                      onChange={this.onPageChange}/>
        </section>
      </>
    );
  }

});
