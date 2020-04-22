<template>
  <router-layout>
    <header slot="header">
      <base-header :title="$t('tabbar[3]')" :border="false" />
    </header>
    <van-tabs v-model="active" color="#07c160" @click="changeActive">
      <van-tab :title="$t('tabsMenu[0]')">
        <section class="content flex-xy-center">
          <van-button plain type="primary" to="TempIcons">跳转到svg-sprite页</van-button>
        </section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[1]')">
        <tabs-item1 />
      </van-tab>
      <van-tab :title="$t('tabsMenu[2]')">
        <section class="content flex-xy-center">一个勉强可以写app的脚手架</section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[3]')">
        <section class="content flex-xy-center">
          <tabs-item3 />
        </section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[4]')">
        <tabs-item4 />
      </van-tab>
      <van-tab title="vuex">
        <tabs-item5 />
      </van-tab>
    </van-tabs>
  </router-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
const merge = require('webpack-merge');
import BaseHeader from '@/pages/components/BaseHeader.vue';
import { Tab, Tabs, Button } from 'vant';
import TabsItem1 from './components/TabsItem1.vue';
import TabsItem3 from './components/TabsItem3.vue';
import TabsItem4 from './components/TabsItem4.vue';
import TabsItem5 from './components/TabsItem5.vue';
import { setLocalStorage, getLocalStorage, getHasPermission } from '@/util/util';
@Component({
  name: 'Member',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    BaseHeader,
    TabsItem1,
    TabsItem3,
    TabsItem4,
    TabsItem5,
  },
})
export default class Member extends Vue {
  private active: number = 0;

  // 动态修改参数
  private async changeActive(e: any) {
    if (e === this.active) return;
    this.$router.push({
      query: merge(this.$route.query, { active: e }),
    });
  }

  private async mounted() {
    const active: number = this.$route.query && this.$route.query.active ? ~~this.$route.query.active : 0;
    this.active = active;
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 200px;
  padding: 30px;
  font-size: 14px;
  .tip {
    font-weight: 600;
    margin-bottom: 20px;
  }
  h5 {
    font-size: 1.1em;
    margin: 10px 0 15px;
  }
  p {
    background: #f6f6f6;
    line-height: 1.5;
    padding: 10px;
    font-size: 0.9em;
    color: #666;
  }
}
</style>
