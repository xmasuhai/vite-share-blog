import {Button, message} from 'ant-design-vue';
import {defineComponent, inject} from 'vue';
// CSS module
import basic from '@/styles/basic.module.scss';

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const popMessage = inject<typeof message>('$message');

    return {
      popMessage
    };
  },
  render() {
    return (
      <>
        <Button class={basic.blogBtn} onClick={({/*event: MouseEvent*/}) => {
          // this.popMessage && this.popMessage.error.bind(this, '这是一条错误消息', 2)
          this.popMessage && this.popMessage.error('这是一条错误消息', 2);
        }}>
          博客首页
        </Button>
      </>
    );
  }

});
