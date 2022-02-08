import {defineComponent} from 'vue';

const BlogHeaderProps = {
  desc: String,
  thumb: String,
  title: String,
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  components: {},
  setup(/*props, ctx*/) {

    return {

    }
  },
  render() {
    // noinspection JSXNamespaceValidation
    return (
      <>
        <h1>BlogHeader</h1>
      </>
    );
  }
});
