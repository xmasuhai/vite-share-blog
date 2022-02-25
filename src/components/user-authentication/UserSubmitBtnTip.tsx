import {defineComponent,} from 'vue';
import {Button} from 'ant-design-vue';
import classNames from 'classnames';
import cssAuth from '@/styles/auth.module.scss';

const UserSubmitBtnTipProps = {
  btnName: String,
  tipText: String,
  linkTo: String,
  linkText: String,
};

export default defineComponent({
  name: 'UserSubmitBtnTip',
  props: UserSubmitBtnTipProps,
  emits: ['handleSubmit',],
  components: {},
  setup(props, ctx) {
    const clickHandler = () => {
      ctx.emit('handleSubmit');
    };
    return {
      clickHandler
    };
  },
  render() {
    return (
      <>
        <Button class={classNames([cssAuth.registerBtn, 'blog-btn'])}
                onClick={this.clickHandler}>
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
