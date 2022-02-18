import {defineComponent, ref,} from 'vue';
import cssAuth from '@/styles/auth.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';

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
          <UserInput title="用户名"
                     errorText="当前用户名已注册"
                     doubleBind={this.username}/>

          <UserInput title="密码"
                     inputType="password"
                     errorText="当前用户名或密码不匹配"
                     doubleBind={this.password}/>

          <UserInput title="确认密码"
                     inputType="password"
                     placeholder="请重复输入一遍密码"
                     errorText="两次密码输入不一致"/>

          <UserSubmitBtnTip btnName="立即注册"
                            tipText="已有账号？"
                            linkTo="/login"
                            linkText="立即登录"/>

        </section>
      </>
    );
  }

});
