import {Button, message} from 'ant-design-vue';
import {defineComponent, inject} from 'vue';
// CSS module
import basic from '@/styles/basic.module.scss';

// multiClass
import classnames from 'classnames';

const btnClass = [basic.blogBtn];

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  setup(/*props, ctx*/) {
    const popMessage = inject<typeof message>('$message');

    return {
      popMessage
    };
  },
  render() {
    return (
      <>
        <Button class={classnames(...btnClass)}
                onClick={({/*event: MouseEvent*/}) => {
                  this.popMessage && this.popMessage.error('这是一条错误消息', 2);
                }}>
          博客首页
        </Button>
      </>
    );
  }

});
