import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import index from '@/pages/index.vue';

const routes = [
  {
    path: '',
    component: index,
    children: [
      {
        path: '/',
        component: () => import('@/pages/Home/Home.vue'),
      },
      {
        path: '/News',
        component: () => import('@/pages/News/News.vue'),
      },
      {
        path: '/Products',
        component: () => import('@/pages/Products/Products.vue'),
      },
      {
        path: '/Member',
        component: () => import('@/pages/Member/Member.vue'),
      },
    ],
    meta: {
      keepAlive: true,
      closeApp: true,
    },
  },
  {
    path: '/NewsShow',
    name: 'NewsShow',
    component: () => import('@/pages/News/NewsShow.vue'),
    meta: {
      keepAlive: true,
      isback: true,
    },
  },
  {
    path: '/ProductsShow',
    name: 'ProductsShow',
    component: () => import('@/pages/Products/ProductsShow.vue'),
    meta: {
      keepAlive: true,
      isback: true,
    },
  },
  {
    path: '/TempIcons',
    name: 'TempIcons',
    component: () => import('@/pages/TempIcons/TempIcons.vue'),
    meta: {
      keepAlive: true,
      isback: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
