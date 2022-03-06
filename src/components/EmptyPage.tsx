import {defineComponent,} from 'vue';

export default defineComponent({
  name: 'EmptyPage',
  props: {},
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        This is an EmptyPage.
      </>
    );
  }

});
