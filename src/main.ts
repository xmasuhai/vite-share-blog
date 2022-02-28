import {createApp} from 'vue';
import App from './App';
import {createPinia} from 'pinia';
import router from './router';
// import 'virtual:svg-icons-register'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
