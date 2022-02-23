// import {message} from 'ant-design-vue';
import {defineComponent/*, inject*/} from 'vue';
// CSS module
// import basic from '@/styles/basic.module.scss';
import blogIndex from '@/styles/blog-index.module.scss';

// request
// import blogApi from '@/api/blog';

// const {getBlogs} = blogApi;

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    // const popMessage = inject<typeof message>('$message');
    /*
        const getBlogList = async () => {
          const BlogDataList = await getBlogs();
        };
    */

    return {
      // popMessage
    };
  },
  render() {
    return (
      <>
        <section class={blogIndex.blogPost}>

          <article class={blogIndex.item}>
            <figure class={blogIndex.avatar}>
              <img class={blogIndex.img}
                   src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
                   alt=""/>
              <figcaption class={blogIndex.info}>姓名</figcaption>
            </figure>

            <h3 class={blogIndex.title}>
              文章标题
              <span class={blogIndex.date}>
                时间
              </span>
            </h3>
            <p class={blogIndex.article}>正文摘要，最多显示一行文字</p>
          </article>

          <article class={blogIndex.item}>
            <figure class={blogIndex.avatar}>
              <img class={blogIndex.img}
                   src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
                   alt=""/>
              <figcaption class={blogIndex.info}>若愚</figcaption>
            </figure>

            <h3 class={blogIndex.title}>
              前端异步大揭秘
              <span class={blogIndex.date}>
                3天前
              </span>
            </h3>
            <p class={blogIndex.article}>本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node
              用于解决回调的co
              模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...</p>
          </article>

        </section>
      </>
    );
  }

});
