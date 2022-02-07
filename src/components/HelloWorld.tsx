import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    const count = ref<number>(0);
    return () => (
      <div class="main">
        <h1> {props.msg}</h1>
        <button>{count.value}</button>
      </div>
    );
  },
});
