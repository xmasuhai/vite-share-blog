import {defineComponent, ref} from 'vue';
import cssAuth from '@/styles/auth.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';
import {useRouter} from 'vue-router';
import useAuthStore from '@/store/modules/auth';
import {logString} from '@/store/modules/auth/interface';

export default defineComponent({
  name: 'Login',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const store = useAuthStore();
    // const router = useRouter();

    const username = ref('');
    const password = ref('');

    const asyncLogin = (/*logString: logString*/) => {
      return store.login;
    };

/*
    const onLogin = (logString: logString) => {
      asyncLogin(logString)
        .then(() => {
          router.push({path: '/'})
            .then(() => {});
        });
    };
*/

    return {
      username,
      password,
      asyncLogin,
      // onLogin
    };
  },
  render() {
    return (
      <section class={cssAuth.login}>
        <UserInput title="用户名"
                   errorText="当前用户名已注册"
                   v-model:username={this.username}/>
        <UserInput title="密码"
                   inputType="password"
                   errorText="当前用户名或密码不匹配"
                   v-model:password={this.password}/>
        <UserSubmitBtnTip btnName="立即登录"
                          tipText="没有账号？"
                          linkTo="/register"
                          linkText="注册新用户"/>
      </section>
    );
  }

});
