import {defineComponent,} from 'vue';
import cssDetail from '@/styles/blog-detail.module.scss';
import classNames from 'classnames';
// import useBlogStore from '@/store/modules/blog';

export default defineComponent({
  name: 'BlogDetail',
  props: {},
  components: {},
  setup(/*props, ctx*/) {

/*
    const BlogStore = useBlogStore();

    const blogId = ref('')
    const title = ref('');
    const description = ref('');
    const rawContent = ref('');
    const user = ref({});

    this.blogId = this.$route.params.blogId

    const getBlogDetail = async() => {
      const res = await blog.getDetail({ blogId: this.blogId})
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.createdAt
      this.user = res.data.user
    }

    // 生成 网页内容 HTML
    renderArticleDom = computed(() => {
      return marked(this.rawContent)
    });
*/

    return {};
  },
  render() {
    return (
      <>
        <section class={cssDetail.userBlog}>
          <img src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
               alt="user.name"
               title="user.username"
               class={cssDetail.avatar}/>
          <h3 class={cssDetail.title}>前端异步大揭秘</h3>
          <p class={cssDetail.user}>
            <router-link to="/user/${user.id}"
                         class={cssDetail.userPage}>
              若愚
            </router-link>
            发布于 3天前
          </p>
        </section>

        <section class={classNames([cssDetail.article, 'article'])}>
          {/* renderArticleDom() */}
          <h1 id="css-网格布局学习指南">CSS 网格布局学习指南</h1>
          <p>文章正文,省略一万字...</p>
        </section>
      </>
    );
  }

});
