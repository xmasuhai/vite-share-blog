import {defineComponent, inject, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
// request API
import {getIndexBlogs} from '@/api/blog';
// CSS module
import blogIndex from '@/styles/blog-index.module.scss';
// UI lib
import {message, Pagination} from 'ant-design-vue';
import {blogFullInfo} from '@/types/responseData';

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    const popMessage = inject<typeof message>('$message');
    const route = useRoute(); // 路由列表
    const router = useRouter(); // 路由实例
    // data
    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const totalPage = ref(0);
    const currentPage = ref(1);

    // 调用 getIndexBlogs API 获取所有博客列表
    const getBlogList = async () => {
      // 从路由URL路径参数取出当前页码值
      currentPage.value = parseInt(route.query.page as string) ?? 1;

      const {data: BlogList, msg, total, page} = await getIndexBlogs({page: currentPage.value});
      popMessage && popMessage.success(msg);
      BlogList && (blogDataList.value = BlogList);
      total && (totalPage.value = total);
      page && (currentPage.value = page);
    };

    const onPageChange = async (newPage: number) => {
      const res = await getIndexBlogs({page: newPage});
      blogDataList.value = res.data;
      res.total && (totalPage.value = res.total);
      res.page && (currentPage.value = res.page);
      await router.push({path: '/', query: {page: newPage}});
    };

    getBlogList()
      .then(() => {});

    return {
      popMessage,
      blogDataList,
      currentPage,
      totalPage,
      getBlogList,
      onPageChange
    };
  },
  render() {
    return (
      <>
        {/* 首页内容 */}
        <section class="article-list">
          {this.blogDataList && this.blogDataList.map((blogData) => {
            const {/*atIndex, */updatedAt, createdAt, description, id, title, user} = blogData;
            const {avatar, id: userId, username, updatedAt: updateUserAt, createdAt: createUserAt} = user;

            return (
              /* 文章条目 */
              <article class={blogIndex.item}
                       key={`${id}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}>

                {/* 作者信息 */}
                <figure class={blogIndex.avatar}>
                  <img class={blogIndex.img}
                       src={avatar}
                       alt={username}/>
                  <figcaption class={blogIndex.info}>
                    {username}
                  </figcaption>
                </figure>

                {/* 博客概览 */}
                <h3 class={blogIndex.title}>
                  <span class={blogIndex.text}>{title}</span>
                  <span class={blogIndex.date}>
                    {createdAt} {/* TODO 美化时间显示 friendlyDate(createdAt) */}
                  </span>
                </h3>
                <p class={blogIndex.description}>
                  {description}
                </p>

                {/* 跳转到博客详细 */}
                <p class={blogIndex.detailLink}>
                  <router-link to={`/detail/${id}`}>
                    详细 &gt;&gt;&gt;
                  </router-link>
                </p>

              </article>
            );
          })}
        </section>

        {/* 分页组件 */}
        <section class={blogIndex.pagination}>
          <Pagination total={this.totalPage}
                      v-model:current={this.currentPage}
                      onChange={this.onPageChange}/>
        </section>
      </>
    );
  }

});
