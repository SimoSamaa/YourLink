import { createApp } from 'vue';
import App from './App.vue';

import '@/scss/main-style.scss'
import 'boxicons'
import router from '@/router';
import store from '@/modules/index';

const app = createApp(App);

import AppIcons from '@/components/UI/AppIcons.vue';
import baseButton from '@/components/UI/BaseButton.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import LoadingButton from '@/components/UI/LoadingButton.vue';

app.component('appIcon', AppIcons);
app.component('base-button', baseButton);
app.component('LoadingSpinner', LoadingSpinner);
app.component('LoadingButton', LoadingButton);
// app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('box-');

app.use(store);

app.use(router);

app.mount('#app');
