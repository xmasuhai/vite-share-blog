import {defineComponent, ref,} from 'vue';
import {Input, Button} from 'ant-design-vue';
import cssAuth from '@/styles/auth.module.scss';

export default defineComponent({
  name: 'Register',
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
          <h4>用户名</h4>
          <Input v-model={this.username}
                 placeholder="用户名"/>
          <p class="error">当前用户名已注册</p>
          <h4>密码</h4>
          <Input v-model={this.password}
                 type="password"
                 placeholder="密码"/>
          <p class="error">当前用户名已注册</p>
          <Button>立即注册</Button>
          <p class="notice">已有账号？
            <router-link to="/login">立即登录</router-link>
          </p>
        </section>
      </>
    );
  }

});
