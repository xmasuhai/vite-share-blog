import {defineComponent,} from 'vue';
import cssDetail from '@/styles/blog-detail.module.scss';

export default defineComponent({
  name: 'BlogDetail',
  props: {},
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        <section class={cssDetail.userInfo}>
          <img src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
               alt=""
               class={cssDetail.avatar}/>
          <h3>前端异步大揭秘</h3>
          <p>
            <router-link to="/user">若愚</router-link>
            发布于3天前
          </p>
        </section>

        <section class="article">
          <h1 id="css-网格布局学习指南">CSS 网格布局学习指南</h1>
          <p>文章正文,省略一万字...</p>
        </section>
      </>
    );
  }

});
