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

    const blogs = ref<blogFullInfo[] | undefined>([]);
    const totalPage = ref(0);
    const currentPage = ref(1);

    // 调用 getIndexBlogs API 获取所有博客列表
    const getBlogList = async () => {
      const {data: BlogDataList, msg, total, page} = await getIndexBlogs();
      popMessage && popMessage.success(msg);
      BlogDataList && (blogs.value = BlogDataList);
      total && (totalPage.value = total);
      page && (currentPage.value = page);
    };

    getBlogList()
      .then(() => {});

    return {
      popMessage,
      getBlogList
    };
  },
  render() {
    return (
      <section class={blogIndex.blogPost}>

        <article class={blogIndex.item}>
          <figure class={blogIndex.avatar}>
            <img class={blogIndex.img}
                 src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
                 alt=""/>
            <figcaption class={blogIndex.info}>
              姓名
            </figcaption>
          </figure>

          <h3 class={blogIndex.title}>
            文章标题
            <span class={blogIndex.date}>
              时间
            </span>
          </h3>

          <p class={blogIndex.description}>
            正文摘要，最多显示一行文字
          </p>

          <p class={blogIndex.detailLink}>
            详细 &gt;&gt;&gt;
          </p>

        </article>

      </section>
    );
  }

});
