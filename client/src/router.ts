import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/modules/index'

import HomePage from '@/views/visitor/HomePage.vue';
import AdminPage from '@/views/admin/AdminPage.vue';
import LinksPage from '@/views/admin/LinksPage.vue';
import AppearancePage from '@/views/admin/AppearancePage.vue';
import AccountPage from '@/views/admin/AccountPage.vue';
import PreviewPage from '@/views/admin/PreviewPage.vue';
import UserProfile from '@/views/visitor/UserProfile.vue';

const notFoundpage = defineAsyncComponent(() => import('@/views/notFoundpage.vue'));
const loginPage = defineAsyncComponent(() => import('@/views/auth/LoginPage.vue'));
const signupPage = defineAsyncComponent(() => import('@/views/auth/signupPage.vue'));


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/'
    },
    {
      path: '',
      component: HomePage,
      name: 'home'
    },
    {
      props: true,
      path: '/:username',
      component: UserProfile,
      name: 'userProfile'
    },
    {
      path: '/auth/login',
      component: loginPage,
      name: 'loginPage',
      meta: { requiresUnauth: true },
    },
    {
      path: '/auth/signup',
      component: signupPage,
      name: 'signupPage',
      meta: { requiresUnauth: true },
    },
    {
      path: '/:not(.*)',
      component: notFoundpage,
      name: 'notFound',
    },
    {
      props: true,
      path: '/reset-password/:token',
      component: () => import('@/views/auth/ResetPassword.vue'),
      name: 'resetPassword',
    },
    {
      path: '/admin',
      component: AdminPage,
      props: true,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin',
          redirect: '/admin/links',
          name: 'links'
        },
        {
          path: 'links',
          component: LinksPage,
          name: 'linksPage',
          meta: { requiresAuth: true },
        },
        {
          path: 'appearance',
          component: AppearancePage,
          name: 'AppearancePage',
          meta: { requiresAuth: true },
        },
        {
          path: 'account',
          component: AccountPage,
          name: 'account',
          meta: { requiresAuth: true },
        },
        {
          path: 'preview',
          component: PreviewPage,
          name: 'preview',
          meta: { requiresAuth: true },
        },
      ],
      name: 'dashboard'
    },
  ] as RouteRecordRaw[]
});

router.beforeEach(function (to, _from, next) {
  const isAuthenticated = store.getters[ 'auth/isAuth' ];
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next('/admin/links')
  } else {
    next()
  }
});

export default router;
