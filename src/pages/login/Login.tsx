import {defineComponent, ref} from 'vue';
import router from '@/router';
import useAuthStore from '@/store/modules/auth';
import {logString} from '@/store/modules/auth/interface';
import cssAuth from '@/styles/auth.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';

const LoginProps = {
  // onHandleSubmit: Function as PropType<() => void>,
}

export default defineComponent({
  name: 'Login',
  props: LoginProps,
  components: {},
  setup(/*props, ctx*/) {
    const store = useAuthStore();
    // const router = useRouter();

    const username = ref('');
    const password = ref('');

    const asyncLogin = (logString: logString) => {
      return store.login(logString);
    };

    const onLogin = (logString: logString) => {
      asyncLogin(logString)
        .then(() => {
          return router.push({path: '/'});
        });
    };

    const keyUpHandler = (logString: logString) => {
      return (e: KeyboardEvent) => {
        ['Enter'].includes(e.key) && onLogin(logString);
      };
    };

    const clickHandler = (logString: logString) => {
      return onLogin(logString);
    };

    return {
      username,
      password,
      asyncLogin,
      onLogin,
      keyUpHandler,
      clickHandler
    };
  },
  render() {
    return (
      <section class={cssAuth.login}>
        <UserInput title="用户名"
                   errorText="当前用户名已注册"
                   v-model={[this.username, 'username']}/>

        <UserInput title="密码"
                   inputType="password"
                   errorText="当前用户名或密码不匹配"
                   v-model={[this.password, 'password']}
                   keyUpHandler={
                     this.keyUpHandler({username: this.username, password: this.password})
                   }/>

        <UserSubmitBtnTip btnName="立即登录"
                          tipText="没有账号？"
                          linkTo="/register"
                          linkText="注册新用户"
                          onHandleSubmit={this.clickHandler}/>
      </section>
    );
  }

});
