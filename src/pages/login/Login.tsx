import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import useAuthStore from '@/store/modules/auth';
import {logString} from '@/store/modules/auth/interface';
import cssAuth from '@/styles/auth.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';
import useIdentifyCompName from '@/hooks/useIdentifyCompName'

const LoginProps = {
  // onHandleSubmit: Function as PropType<() => void>,
};

export default defineComponent({
  name: 'Login',
  props: LoginProps,
  components: {},
  setup(/*props, ctx*/) {
    useIdentifyCompName();
    const authStore = useAuthStore();
    const router = useRouter();

    const username = ref('');
    const password = ref('');

    const userLoginInfo = computed(() => {
      return {
        username: username.value,
        password: password.value
      };
    });

    // resolve => router.push
    const onLogin = (logString: logString) => {
      authStore.login(logString)
        .then(() => {
          // 成功，跳转首页
          return router.push({path: '/'});
        }, /* reject */);
    };

    // watch keyup Enter
    const keyUpHandler = (e: KeyboardEvent) => {
      ;['Enter'].includes(e.key) && onLogin({
        username: username.value,
        password: password.value
      });
    };

    const clickHandler = (logString: logString) => {
      onLogin(logString);
    };

    return {
      username,
      password,
      userLoginInfo,
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
                   onKeyUp={this.keyUpHandler}/>

        <UserSubmitBtnTip btnName="立即登录"
                          tipText="没有账号？"
                          linkTo="/register"
                          linkText="注册新用户"
                          onHandleSubmit={() => {this.clickHandler(this.userLoginInfo);}}/>
      </section>
    );
  }

});
