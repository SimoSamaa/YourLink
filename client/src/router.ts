import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/visitor/HomePage.vue';
import AdminPage from '@/views/admin/AdminPage.vue';
import LinksPage from '@/views/admin/LinksPage.vue';
import AppearancePage from '@/views/admin/AppearancePage.vue';
import AccountPage from '@/views/admin/AccountPage.vue';
import PreviewPage from '@/views/admin/PreviewPage.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/yourLink'
    },
    {
      path: '/yourLink',
      component: HomePage
    },
    {
      path: '/yourLink/admin',
      component: AdminPage,
      children: [
        {
          path: 'links',
          component: LinksPage,
          name: 'linksPage'
        },
        {
          path: 'appearance',
          component: AppearancePage,
          name: 'AppearancePage'
        },
        {
          path: 'account',
          component: AccountPage,
          name: 'account'
        },
        {
          path: 'preview',
          component: PreviewPage,
          name: 'preview'
        }
      ],
      name: 'dashboard'
    },
  ] as RouteRecordRaw[]
});

export default router
