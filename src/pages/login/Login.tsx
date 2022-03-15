import {useIfLoading} from '@/hooks/useIfLoading';
import {Spin} from 'ant-design-vue';
import {defineComponent, onMounted, ref} from 'vue';
import {useCheckIsLogin} from '@/hooks/useCheckIsLogin';
import {useRouter} from 'vue-router';
import useAuthStore from '@/store/modules/auth';
import {logString} from '@/store/modules/auth/interface';
import cssAuth from '@/styles/auth.module.scss';
import maskLayer from '@/styles/mask-layer.module.scss';
import UserInput from '@/components/user-authentication/UserInput';
import UserSubmitBtnTip from '@/components/user-authentication/UserSubmitBtnTip';
import useIdentifyCompName from '@/hooks/useIdentifyCompName';

const LoginProps = {
  // onHandleSubmit: Function as PropType<() => void>,
};

export default defineComponent({
  name: 'Login',
  props: LoginProps,
  components: {},
  setup(/*props, ctx*/) {
    // 是否处于读取中状态，用来判断是否展示骨架屏
    const isLoading = ref<boolean>(false);

    const checkIsLogin = useCheckIsLogin();

    onMounted(async () => {
      await checkIsLogin();
    });

    // 拿到当前组件 type 名称，作为判断是否为登录或注册组件的依据
    useIdentifyCompName();

    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const defaultUsername = ref('admin001');
    const defaultPassword = ref('123456');

    const userLoginInfo = computed(() => {
      return {
        username: username.value,
        password: password.value
      };
    });

    const showError = ref<boolean>(false);

    // 发起登录请求 路由增加一条记录 resolve => router.push
    const onLogin = (logString: logString) => {
      isLoading.value = false;
      showError.value = false;
      authStore.login(logString)
        .then((res) => {
          if (res.isLogin && res.data) {
            // 变更 加载状态
            isLoading.value = useIfLoading().loading.value;
            // 成功，跳转重定向页面 或者 首页 作为保底
            return router.push({path: (router.currentRoute.value.query.redirect as string) || '/'  /* 首页保底 */});
          } else {
            showError.value = true;
          }
        }, /* reject */);
    };

    // 侦听键盘事件 watch keyup Enter 发起登录请求
    const keyUpHandler = (e: KeyboardEvent) => {
      ;['Enter'].includes(e.key) && onLogin(userLoginInfo.value);
    };

    // 点击登录
    const clickHandler = (logString: logString) => {
      onLogin(logString);
    };

    return {
      username,
      password,
      defaultUsername,
      defaultPassword,
      userLoginInfo,
      onLogin,
      keyUpHandler,
      clickHandler,
      isLoading,
      showError
    };
  },
  render() {
    return (
      <>
        <section class={cssAuth.login}>
          <UserInput title="用户名"
                     errorText="当前用户名或密码不匹配"
                     v-model={[this.username, 'username']}
                     placeholder={`默认登录名：${this.defaultUsername}`}
                     showError={this.showError}/>

          <UserInput title="密码"
                     inputType="password"
                     errorText="当前用户名或密码不匹配"
                     v-model={[this.password, 'password']}
                     onKeyUp={this.keyUpHandler}
                     placeholder={`默认密码：${this.defaultPassword}`}
                     showError={this.showError}/>

          <UserSubmitBtnTip btnName="立即登录"
                            tipText="没有账号？"
                            linkTo="/register"
                            linkText="注册新用户"
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
