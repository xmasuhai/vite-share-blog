import {defineComponent, onMounted, ref,} from 'vue';
// store & router
import useAuthStore from '@/store/modules/auth';
import {logString} from '@/store/modules/auth/interface';
import {useRouter} from 'vue-router';
// hooks
import {useIfLoading} from '@/hooks/useIfLoading';
import {useCheckIsLogin} from '@/hooks/useCheckIsLogin';
import useIdentifyCompName from '@/hooks/useIdentifyCompName';
// Comps
import {Spin} from 'ant-design-vue';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';
// css module
import cssAuth from '@/styles/auth.module.scss';
import maskLayer from '@/styles/mask-layer.module.scss';

export default defineComponent({
  name: 'Register',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    // 是否处于读取中状态，用来判断是否展示骨架屏 默认 false
    const isLoading = ref<boolean>(false);

    const checkIsLogin = useCheckIsLogin();

    onMounted(async () => {
      await checkIsLogin;
    });

    // 拿到当前组件 type 名称，作为判断是否为登录或注册组件的依据
    useIdentifyCompName();

    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const passwordCheck = ref('');

    const userLoginInfo = computed(() => {
      return {
        username: username.value,
        password: passwordCheck.value
      };
    });

    // resolve => router.push
    const onRegister = (logString: logString) => {
      authStore.register(logString)
        .then(() => {
          // 记录 加载状态
          isLoading.value = useIfLoading().value;

          // 成功，跳转首页
          return router.push({path: '/login'});
        }, /* reject */);
    };

    // watch keyup Enter
    const keyUpHandler = (e: KeyboardEvent) => {
      ;['Enter'].includes(e.key) && onRegister({
        username: username.value,
        password: password.value
      });
    };

    const clickHandler = (logString: logString) => {
      onRegister(logString);
    };

    return {
      username,
      password,
      passwordCheck,
      userLoginInfo,
      onRegister,
      keyUpHandler,
      clickHandler,
      isLoading
    };
  },
  render() {
    return (
      <>
        <section class={cssAuth.login}>
          <UserInput title="用户名"
                     errorText="当前用户名已注册"
                     v-model={[this.username, 'username']}
                     autoComplete="new-password"/>

          <UserInput title="密码"
                     inputType="password"
                     errorText="当前用户名或密码不匹配"
                     v-model={[this.password, 'password']}
                     autoComplete="new-password"/>

          <UserInput title="确认密码"
                     inputType="password"
                     placeholder="请重复输入一遍密码"
                     errorText="两次密码输入不一致"
                     v-model={[this.passwordCheck, 'passwordCheck']}
                     onKeyUp={this.keyUpHandler}
                     autoComplete="new-password"/>

          <UserSubmitBtnTip btnName="立即注册"
                            tipText="已有账号？"
                            linkTo="/login"
                            linkText="立即登录"
                            onHandleSubmit={() => {this.clickHandler(this.userLoginInfo);}}/>

        </section>
        <section class={maskLayer.mask}
                 v-show={this.isLoading}>
          <Spin tip="Loading..."
                size="large"
                spinning={this.isLoading}/>
        </section>
      </>
    );
  }

});
