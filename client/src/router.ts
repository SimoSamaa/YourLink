import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/visitor/HomePage.vue';
import loginPage from '@/views/auth/LoginPage.vue';
import signupPage from '@/views/auth/signupPage.vue';
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
      redirect: '/'
    },
    {
      path: '',
      component: HomePage
    },
    {
      path: '/auth/login',
      component: loginPage,
      name: 'loginPage'
    },
    {
      path: '/auth/signup',
      component: signupPage,
      name: 'signupPage'
    },
    {
      path: '/admin',
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
