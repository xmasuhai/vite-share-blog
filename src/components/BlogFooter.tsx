import {defineComponent,} from 'vue';

const BlogFooterProps = {
  desc: String,
  thumb: String,
  title: String,
};

export default defineComponent({
  name: 'BlogFooter',
  props: BlogFooterProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        <h1>BlogFooter</h1>
      </>
    );
  }
});
