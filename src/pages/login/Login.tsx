import {defineComponent, ref} from 'vue';
import cssAuth from '@/styles/auth.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';

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

          <UserInput title="用户名"
                     errorText="当前用户名已注册"
                     doubleBind={this.username}/>

          <UserInput title="密码"
                     inputType="password"
                     errorText="当前用户名或密码不匹配"
                     doubleBind={this.password}/>

          <UserSubmitBtnTip btnName="立即登录"
                            tipText="没有账号？"
                            linkTo="/register"
                            linkText="注册新用户"/>

        </section>
      </>
    );
  }

});
