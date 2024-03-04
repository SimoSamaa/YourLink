import { createApp } from 'vue';
import App from './App.vue';

import '@/scss/main-style.scss'
import 'boxicons'
import router from '@/router';
import store from '@/modules/index';

const app = createApp(App);

import AppIcons from '@/components/UI/AppIcons.vue';
import baseButton from '@/components/UI/BaseButton.vue';

app.component('appIcon', AppIcons);
app.component('base-button', baseButton);
// app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('box-');


app.use(store);

app.use(router);

app.mount('#app');
