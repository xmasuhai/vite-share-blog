import {ref, defineComponent} from 'vue';
import logo from '@/assets/logo.png';

const msg = ref(`'Hello Vue 3.0 + Vite!'`);

export default defineComponent({
  render: () => (
    <>
      <img alt="Vue logo"
           src={logo}/>
      <h1>{msg}</h1>
    </>
  ),
});
