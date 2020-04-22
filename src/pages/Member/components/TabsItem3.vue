<template>
  <section class="content flex-xy-center">
    <van-button plain type="primary" @click="switchLanguage">切换语言</van-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import enUS from '@/assets/languages/vant/en-US';
import zhCN from '@/assets/languages/vant/zh-CN';
import { Locale, Button } from 'vant';
import { setLocalStorage, getLocalStorage } from '@/util/util';
@Component({
  components: {
    [Button.name]: Button,
  },
})
export default class extends Vue {
  // 切换语言
  async switchLanguage(e: any) {
    let lang: string = '';
    if (getLocalStorage('language')) {
      if (getLocalStorage('language') === 'zh_CN') {
        lang = 'en_US';
        Locale.use('en_US', enUS);
      } else {
        lang = 'zh_CN';
        Locale.use('zh_CN', zhCN);
      }
    } else {
      lang = 'zh_CN';
    }
    this.$i18n.locale = lang;
    setLocalStorage('language', lang);
    this.$dialog.alert({
      message: lang === 'zh_CN' ? '完成' : 'ok',
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.content {
  height: 200px;
  @include content(30px, 14px);
}
</style>
