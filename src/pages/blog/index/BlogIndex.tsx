import {message} from 'ant-design-vue';
import {defineComponent, inject} from 'vue';
// CSS module
// import basic from '@/styles/basic.module.scss';
import blogIndex from '@/styles/blog-index.module.scss';

// multiClass
// const btnClass = [basic.blogBtn];

import blogApi from '@/api/blog';

const {getBlogs} = blogApi;

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    const popMessage = inject<typeof message>('$message');

    const getBlogList = async () => {
      const BlogDataList = await getBlogs();
    };

    return {
      popMessage
    };
  },
  render() {
    return (
      <>
        <section class={blogIndex.blogPost}>
          <div class={blogIndex.item}>
            <figure class={blogIndex.avatar}>
              <img class={blogIndex.img} src="" alt=""/>
              <figcaption class={blogIndex.info}>姓名</figcaption>
            </figure>

            <h3 class={blogIndex.title}>文章标题
              <span class={blogIndex.date}>时间</span>
            </h3>
            <p class={blogIndex.article}>正文，最多显示前200字</p>
          </div>

          <div class={blogIndex.item}>
            <figure class={blogIndex.avatar}>
              <img class={blogIndex.img} src="" alt=""/>
              <figcaption class={blogIndex.info}>姓名</figcaption>
            </figure>

            <h3 class={blogIndex.title}>文章标题
              <span class={blogIndex.date}>时间</span>
            </h3>
            <p class={blogIndex.article}>正文，最多显示前200字</p>
          </div>

          <div class={blogIndex.item}>
            <figure class={blogIndex.avatar}>
              <img class={blogIndex.img} src="" alt=""/>
              <figcaption class={blogIndex.info}>姓名</figcaption>
            </figure>

            <h3 class={blogIndex.title}>文章标题
              <span class={blogIndex.date}>时间</span>
            </h3>
            <p class={blogIndex.article}>正文，最多显示前200字</p>
          </div>
        </section>
      </>
    );
  }

});
