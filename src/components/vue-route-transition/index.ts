import RouteTransition from './transition.vue';
import Layout from './layout.vue';
import { VueConstructor } from 'vue';

const Plugin = {
  install(Vue: VueConstructor) {
    // @ts-ignore
    Vue.component(Layout.options.name, Layout);
    // @ts-ignore
    Vue.component(RouteTransition.options.name, RouteTransition);
  },
};

// 浏览器环境
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue);
}

export { Plugin, Layout, RouteTransition };

export default Plugin;
