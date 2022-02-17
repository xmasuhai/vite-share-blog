import {defineComponent,} from 'vue';
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';

export default defineComponent({
  name: 'User',
  props: {},
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        <section class={cssUser.userInfo}>
          <img src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
               alt="avatar"
               class={cssUser.avatar}/>
          <h3 class={cssUser.name}>若愚</h3>
        </section>

        <section>
          <div class={cssUser.item}>
            <div class={cssUser.date}>
              <span class={classNames([cssUser.day, cssUser.dateItem])}>20</span>
              <span class={cssUser.dateItem}>5月</span>
              <span class={cssUser.dateItem}>2021</span>
            </div>
            <h3 class={cssUser.title}>前端异步解密</h3>
            <p class={cssUser.article}>
              本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co
              模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...
            </p>
          </div>

          <div class={cssUser.item}>
            <div class={cssUser.date}>
              <span class={classNames([cssUser.day, cssUser.dateItem])}>20</span>
              <span class={cssUser.dateItem}>5月</span>
              <span class={cssUser.dateItem}>2022</span>
            </div>
            <h3 class={cssUser.title}>前端异步解密</h3>
            <p class={cssUser.article}>
              本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co
              模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...
            </p>
          </div>

        </section>
      </>
    );
  }

});
