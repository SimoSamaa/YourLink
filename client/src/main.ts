import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';

import '@/scss/main-style.scss';
import 'boxicons';
import router from '@/router';
import store from '@/modules/index';

const app = createApp(App);

import AppIcons from '@/components/UI/AppIcons.vue';
import baseButton from '@/components/UI/BaseButton.vue';
import PlaceholderLoading from '@/components/UI/PlaceholderLoading.vue';

const BaseModal = defineAsyncComponent(() => import('@/components/UI/BaseModal.vue'));
const LoadingSpinner = defineAsyncComponent(() => import('@/components/UI/LoadingSpinner.vue'));
const LoadingButton = defineAsyncComponent(() => import('@/components/UI/LoadingButton.vue'));

app.component('appIcon', AppIcons);
app.component('base-button', baseButton);
app.component('LoadingSpinner', LoadingSpinner);
app.component('LoadingButton', LoadingButton);
app.component('PlaceholderLoading', PlaceholderLoading);
app.component('base-modal', BaseModal);

app.use(store);

app.use(router);

app.mount('#app');


const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme:light)");
const favicon = document.createElement('link');
favicon.rel = 'icon';
document.head.appendChild(favicon);

function handledFaviconMode(e: MediaQueryListEvent) {
  if (e.matches) {
    favicon.href = require('@/assets/icon.png')
  } else {
    favicon.href = require('@/assets/icon-l.png')
  }
};

handledFaviconMode(
  Object.create(null, {
    currentTarget: {
      value: darkModeMediaQuery,
    },
  })
);
darkModeMediaQuery.addListener(handledFaviconMode);
