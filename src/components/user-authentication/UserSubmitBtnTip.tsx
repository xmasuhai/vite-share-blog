import {defineComponent,} from 'vue';
import {Button} from 'ant-design-vue';
import classNames from 'classnames';
import cssAuth from '@/styles/auth.module.scss';

const UserSubmitBtnTipProps = {
  btnName: String,
  tipText: String,
  linkTo: String,
  linkText: String
};

export default defineComponent({
  name: 'UserSubmitBtnTip',
  props: UserSubmitBtnTipProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        <Button class={classNames([cssAuth.registerBtn, 'blog-btn'])}>
          {this.btnName}
        </Button>
        <p class={cssAuth.notice}>{this.tipText}
          <router-link to={this.linkTo}
                       class={cssAuth.toLogin}>
            {this.linkText}
          </router-link>
        </p>
      </>
    );
  }

});
