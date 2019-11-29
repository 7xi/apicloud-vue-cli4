import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('@/assets/images/svg', false, /\.svg$/);
const requireAll = (requireContext: any) => {
  requireContext.keys().map(requireContext);
};

requireAll(req);
