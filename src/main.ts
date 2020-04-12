import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import RouteTransition from '@/components/vue-route-transition';
import Vant from 'vant';
import VueLazyLoad from 'vue-lazyload';
import i18n from './i18n'; //国际化
import '@/components/SvgIcons/index.ts';
import '@/assets/styles/reset.less';
import 'vant/lib/index.css';
import 'amfe-flexible'; //自动添加缩放比例
const FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.appGlobal = false;

Vue.use(Vant);
Vue.use(RouteTransition);
Vue.use(VueLazyLoad, {
  error: require('./assets/images/ico/error.png'),
});

if (Vue.prototype.appGlobal) {
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
