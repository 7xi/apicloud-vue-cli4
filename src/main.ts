import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import '@/router/permission'; //路由守卫
import store from './store'; //vuex
import RouteTransition from '@/components/vue-route-transition';
import VueLazyLoad from 'vue-lazyload';
import i18n from '@/i18n'; //国际化
import config from '@/util/config'; //配置文件
import '@/components/SvgIcons/index'; // 处理svg图片
import '@/assets/styles/reset.css'; //初始化样式
import 'vant/lib/index.css';
import 'amfe-flexible'; //自动添加缩放比例
const FastClick = require('fastclick'); //解决ios端点击300毫秒延迟
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.$appMode = config.$appMode; //是否开启apicloud模式
declare module 'vue/types/vue' {
  interface Vue {
    $appMode: Boolean;
  }
}

// Vue.use(Vant);
Vue.use(RouteTransition);
Vue.use(VueLazyLoad, {
  error: require('./assets/images/ico/error.png'),
});

if (config.$appMode) {
  // @ts-ignore
  window.apiready = () => {
    new Vue({
      router,
      store,
      i18n,
      render: h => h(App),
    }).$mount('#app');
  };
} else {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
}
