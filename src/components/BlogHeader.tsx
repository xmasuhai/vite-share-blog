import {defineComponent} from 'vue';

export default defineComponent({
  name: 'BlogHeader',
  props: {msg: String,},
  components: {},
  setup(/*props, ctx*/) {

    return () => (
      <>
       <h1>BlogHeader.tsx</h1>
      </>
    );
  }
})
