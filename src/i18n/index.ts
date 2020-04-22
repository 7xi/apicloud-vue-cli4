import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// 注册i18n实例并引入语言文件
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: require('@/assets/languages/zh_cn.json'),
    en_US: require('@/assets/languages/en_us.json'),
  },
});

export default i18n;
