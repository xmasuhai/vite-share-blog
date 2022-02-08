import {createApp} from 'vue';
import App from './App';
import router from './router/index';
import {Button} from 'ant-design-vue';

const app = createApp(App);

app.use(router);

app.component('Button', Button);

app.mount('#app');
