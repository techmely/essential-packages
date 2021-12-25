import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
      {
        path: '/table',
        name: 'basetable',
        meta: {
          title: 'basetable',
        },
        component: () => import(/* webpackChunkName: "table" */ '../views/BaseTable.vue'),
      },
      {
        path: '/form',
        name: 'baseform',
        meta: {
          title: 'baseform',
        },
        component: () => import(/* webpackChunkName: "form" */ '../views/BaseForm.vue'),
      },
      {
        path: '/tabs',
        name: 'tabs',
        meta: {
          title: 'tabs',
        },
        component: () => import(/* webpackChunkName: "tabs" */ '../views/Tabs.vue'),
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: 'permission',
          permission: true,
        },
        component: () => import(/* webpackChunkName: "permission" */ '../views/Permission.vue'),
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: 'upload',
        },
        component: () => import(/* webpackChunkName: "upload" */ '../views/Upload.vue'),
      },
      {
        path: '/icon',
        name: 'icon',
        meta: {
          title: 'icon',
        },
        component: () => import(/* webpackChunkName: "icon" */ '../views/Icon.vue'),
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404',
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
      },
      {
        path: '/403',
        name: '403',
        meta: {
          title: '403',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: 'user',
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | techmely-cms`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    next();
  }
});

export default router;
