import {defineComponent, ref} from 'vue';
// store & router
import useAuthStore from '@/store/modules/auth';
import {useRouter} from 'vue-router';
import {logString} from '@/store/modules/auth/interface';
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
  name: 'Login',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    // 是否处于读取中状态，用来判断是否展示骨架屏 默认 false
    const isLoading = ref<boolean>(false);
    useCheckIsLogin().then();

    // 拿到当前组件 type 名称，作为判断是否为登录或注册组件的依据
    useIdentifyCompName();

    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    // 默认用户提示
    const defaultUsername = ref('admin000');
    const defaultPassword = ref('123456');

    const userLoginInfo = computed(() => {
      return {
        username: username.value,
        password: password.value
      };
    });

    // 是否展示登录错误提示信息 默认不展示
    const showErrorTips = ref<boolean>(false);

    // 登录请求方法
    const onLogin = async (logString: logString) => {
      isLoading.value = true;
      showErrorTips.value = false;
      // 发起登录请求
      const res = await authStore.login(logString);
      // 验证已登录
      if (res.data) {
        // 变更 加载状态 为 加载结果
        isLoading.value = useIfLoading().value;
        // 路由增加一条记录 resolve => router.push
        // 成功，跳转重定向页面 或者 首页 作为保底
        router.push({path: (router.currentRoute.value.query.redirect as string) || '/'  /* 首页保底 */})
          .then(() => {
            isLoading.value = useIfLoading().value;
          });
        window && window.location.reload();
      } else {
        // 验证未登录 展示登录错误提示信息
        res.status === 'fail' && (showErrorTips.value = true);
        isLoading.value = useIfLoading().value;
      }
      return res;
    };

    // 侦听键盘事件 watch keyup Enter 发起登录请求
    const keyUpHandler = (e: KeyboardEvent) => {
      ;['Enter'].includes(e.key) && onLogin(userLoginInfo.value);
    };

    // 点击登录
    const clickHandler = async (logString: logString) => {
      await onLogin(logString);
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
      showError: showErrorTips
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
                            onHandleSubmit={async () => {await this.clickHandler(this.userLoginInfo);}}/>
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
