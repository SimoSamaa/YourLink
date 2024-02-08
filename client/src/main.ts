import { createApp } from 'vue';
import { createStore, Store } from 'vuex';
import App from './App.vue';
import '@/scss/main-style.scss'
import router from './router';

const app = createApp(App)

import AppIcons from '@/components/UI/AppIcons.vue'
import baseButton from '@/components/UI/BaseButton.vue'

app.component('appIcon', AppIcons)
app.component('base-button', baseButton)

const store = createStore({

});

app.use(store);

app.use(router);

app.mount('#app');
