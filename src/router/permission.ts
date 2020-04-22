/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to,from,next)
 *  当进行路由跳转之前，进行判断 是否已经登录过， 登陆过则允许访问非登录页面，否则回到登录页
 *
 *  to: 即将要进入的目标路由对象
 *  from：即将要离开的路由对象
 *  next: 是一个方法，可以指定路由地址，进行路由跳转
 */

import Vue from 'vue';
import router from './index';
import config from '@/util/config';
import { Toast } from 'vant';

Vue.use(Toast);
router.beforeEach((to: any, from: any, next: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  if (config.$appMode) {
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

router.afterEach(() => {
  Toast.clear();
});
