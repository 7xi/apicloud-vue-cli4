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

router.beforeEach((to: any, from: any, next: any) => {
  if (Vue.prototype.appGlobal) {
    // 判断是否断网
    api.addEventListener(
      {
        name: 'offline',
      },
      (ret: object) => {
        if (ret) {
          alert('没有网络啦~');
        }
      }
    );

    // 判断是否有网

    api.addEventListener(
      {
        name: 'online',
      },
      (ret: object) => {
        if (ret) {
          router.go(-1);
        }
      }
    );

    // APP端返回上一页事件

    if (api.systemType === 'ios') {
      if (to.meta.isback && to.meta.isback === true) {
        // IOS端监听返回事件
        setTimeout(() => {
          api.addEventListener(
            {
              name: 'swiperight',
            },
            () => {
              router.go(-1);
            }
          );
        }, 100);
      } else {
        setTimeout(() => {
          api.addEventListener(
            {
              name: 'swiperight',
            },
            () => {
              return;
            }
          );
        }, 100);
      }
    } else {
      // 安卓端监听返回事件
      let isBack = false;
      api.addEventListener(
        {
          name: 'keyback',
        },
        () => {
          if (to.meta.closeApp && to.meta.closeApp === true) {
            if (isBack) {
              api.closeWidget({
                id: api.appId,
                retData: {
                  name: 'closeWidget',
                },
                silent: true,
              });
            } else {
              isBack = true;
              api.toast({
                msg: '再按一次退出应用',
              });
              setTimeout(() => {
                isBack = false;
              }, 2000);
            }
          } else if (to.meta.isback && to.meta.isback === true) {
            router.go(-1);
          } else {
            return;
          }
        }
      );
    }
  }
  next();
});

export default router;
