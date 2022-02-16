import {defineComponent,} from 'vue';

// props
const BlogBodyProps = {
  isSHow: Boolean
};
export default defineComponent({
  name: 'BlogBody',
  props: BlogBodyProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <main>
        <router-view/>
      </main>
    );
  }

});
