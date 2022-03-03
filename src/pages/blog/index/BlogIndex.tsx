import {defineComponent, inject, ref} from 'vue';
import {useRouter} from 'vue-router';
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
    const router = useRouter(); // 路由实例
    // data
    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const allPages = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);

    // 调用 getIndexBlogs API 获取所有博客列表
    const getBlogList = async () => {
      // 从路由URL路径参数取出当前页码值
      const {data: BlogList, msg, total: totalData, totalPage, page} = await getIndexBlogs({page: currentPage.value});
      popMessage && popMessage.success(msg);
      BlogList && (blogDataList.value = BlogList);
      totalData && totalPage && (allPages.value = (pageSize.value * totalPage));
      page && (currentPage.value = page);

    };

    const onPageChange = async (newPage: number) => {
      const res = await getIndexBlogs({page: newPage});
      blogDataList.value = res.data;
      res.total && (allPages.value = res.total);
      res.page && (currentPage.value = res.page);
      await router.push({path: '/', query: {page: newPage}});
      scrollToTop();
    };

    /*
    *
    * window.requestAnimationFrame() 告诉浏览器希望执行一个动画，
    * 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
    * 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    * requestAnimationFrame：优势：由系统决定回调函数的执行时机
    * 60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿
    *
    * */
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };

    getBlogList()
      .then(() => {});

    return {
      popMessage,
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
        <section class={blogIndex.pagination} id="pagination">
          <Pagination total={this.allPages}
                      pageSize={this.pageSize}
                      v-model:current={this.currentPage}
                      onChange={this.onPageChange}/>
        </section>
      </>
    );
  }

});
