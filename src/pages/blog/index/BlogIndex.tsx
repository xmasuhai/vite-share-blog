import {defineComponent, inject, ref} from 'vue';
// request API
import {getIndexBlogs} from '@/api/blog';
// CSS module
import blogIndex from '@/styles/blog-index.module.scss';
// UI lib
import {message} from 'ant-design-vue';
import {blogFullInfo} from '@/types/responseData';

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    const popMessage = inject<typeof message>('$message');

    const blogDataList = ref<blogFullInfo[] | undefined>([]);
    const totalPage = ref(0);
    const currentPage = ref(1);

    // 调用 getIndexBlogs API 获取所有博客列表
    const getBlogList = async () => {
      const {data: BlogList, msg, total, page} = await getIndexBlogs();
      popMessage && popMessage.success(msg);
      BlogList && (blogDataList.value = BlogList);
      total && (totalPage.value = total);
      page && (currentPage.value = page);
    };

    getBlogList()
      .then(() => {});

    return {
      popMessage,
      blogDataList,
      currentPage,
      totalPage,
      getBlogList
    };
  },
  render() {
    return (
      <section class={blogIndex.blogPost}>
        {this.blogDataList && this.blogDataList.map((blogData) => {
          const {/*atIndex, */updatedAt, createdAt, description, id, title, user} = blogData;
          const {avatar, id: userId, username, updatedAt: updateUserAt, createdAt: createUserAt} = user;
          return (
            <article class={blogIndex.item}
                     key={`${id}${userId}${updatedAt}${createdAt}${updateUserAt}${createUserAt}`}>
              <figure class={blogIndex.avatar}>
                <img class={blogIndex.img}
                     src={avatar}
                     alt={username}/>
                <figcaption class={blogIndex.info}>
                  {username}
                </figcaption>
              </figure>

              <h3 class={blogIndex.title}>
                {title}
                <span class={blogIndex.date}>
              {createdAt}
            </span>
              </h3>

              <p class={blogIndex.description}>
                {description}
              </p>

              <p class={blogIndex.detailLink}>
                <router-link to={`/detail/${id}`}>
                  详细 &gt;&gt;&gt;
                </router-link>
              </p>

            </article>

          );

        })}
      </section>
    );
  }

});
