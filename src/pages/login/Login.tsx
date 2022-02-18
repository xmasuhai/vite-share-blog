import {defineComponent, ref} from 'vue';
import {Input, Button} from 'ant-design-vue';
import cssAuth from '@/styles/auth.module.scss';
import classNames from 'classnames'

export default defineComponent({
  name: 'Login',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const username = ref('');
    const password = ref('');
    return {
      username,
      password
    };
  },
  render() {
    return (
      <>
        <section class={cssAuth.login}>
          <h4 class={cssAuth.name}>用户名</h4>
          <Input v-model={this.username}
                 placeholder="用户名"
                 class={cssAuth.userInput}/>
          <p class={cssAuth.error}>
            当前用户名已注册
          </p>

          <h4 class={cssAuth.password}>密码</h4>
          <Input v-model={this.password}
                 type="password"
                 placeholder="密码"
                 class={cssAuth.userInput}/>
          <p class={cssAuth.error}>当前用户名已注册</p>

          <Button class={classNames([cssAuth.registerBtn, 'blog-btn'])}>
            立即登录
          </Button>
          <p class={cssAuth.notice}>没有账号？
            <router-link to="/register"
                         class={cssAuth.toRegister}>
              注册新用户
            </router-link>
          </p>
        </section>
      </>
    );
  }

});
