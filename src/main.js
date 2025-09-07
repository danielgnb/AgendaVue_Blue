import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import VueTheMask from 'vue-the-mask';
import axios from './axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App);

axios.defaults.baseURL = 'https://localhost:7052';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(VueTheMask);
app.mount('#app');