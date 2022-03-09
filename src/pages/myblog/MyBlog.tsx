import {defineComponent,} from 'vue';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';
import useAuthStore from '@/store/modules/auth/';

const MyBlogProps = {
  isShow: Boolean,
};

export default defineComponent({
  name: 'MyBlog',
  props: MyBlogProps,
  components: {},
  setup(/*props, ctx*/) {
    const authStore = useAuthStore();
    // Store Data
    const userData = authStore.getUser;
    // response data

    return {
      userData,
    };
  },
  render() {
    const renderUserInfo = () => {
      if (this.userData) {
        const {username, avatar} = this.userData;
        return (
          <section class={cssUser.userInfo}>
            {/* 作者 */}
            <img src={`${avatar}`}
                 alt={`${username}`}
                 class={cssUser.avatar}/>
            <h3 class={cssUser.name}>
              {username}
            </h3>
          </section>
        );
      }
    };

    const renderArticleList = () => {
      return (
        <section>

          {/* 一条文章简介 */}
          <article class={cssUser.item}>
            <div class={cssUser.item}>
              {/* 日期 */}
              <div class={cssUser.date}>
                <span class={classNames([cssUser.day, cssUser.dateItem])}>20</span>
                <span class={cssUser.dateItem}>5月</span>
                <span class={cssUser.dateItem}>2021</span>
              </div>

              {/* 文章 */}
              <h3 class={cssUser.title}>前端异步解密</h3>
              <p class={cssUser.article}>
                本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co
                模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...
              </p>
              <div class={cssUser.actions}>
                <router-link to={`/edit/${1}`}>编辑</router-link>
                <a href="#"
                   class={cssUser.delete}>
                  删除
                </a>
              </div>
            </div>
          </article>
        </section>);
    };

    return (
      <>
        {renderUserInfo()}
        {renderArticleList()}
      </>
    );
  }

});
