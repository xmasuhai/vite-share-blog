import {Button} from 'ant-design-vue';
import {defineComponent, inject} from 'vue';
import 'ant-design-vue/dist/antd.css';

export default defineComponent({
  name: 'BlogIndex',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const message = inject('$message');
    return {
      message
    };
  },
  render() {
    // noinspection JSXNamespaceValidation
    return (
      <>
        <Button>博客首页</Button>
      </>
    );
  }

});
