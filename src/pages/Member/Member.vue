<template>
  <router-layout>
    <header slot="header">
      <base-header title="我的" :border="false" />
    </header>
    <main class="flex-xy-center"></main>

    <van-tabs v-model="active" color="#07c160" @click="changeActive">
      <van-tab title="svg精灵图">
        <section class="content flex-xy-center">
          <van-button plain type="primary" to="TempIcons">
            跳转到svg-sprite页
          </van-button>
        </section>
      </van-tab>
      <van-tab title="tab解决方案">
        <section class="content">
          <div class="tip">TAB解决方案，动态修改url地址query参数</div>
          <h5>1.tab切换事件中加入修改参数</h5>
          <p>
            this.$router.push({ query:merge(this.$route.query,{active:动态传入的值}) })
          </p>
          <h5>2.如何新增一个参数</h5>
          <p>
            this.$router.push({ query:merge(this.$route.query,{addParams:'我是新增的一个参数'}) })
          </p>
          <h5>3.如何替换所有参数</h5>
          <p>
            this.$router.push({ query:merge({},{maxPrice:'我把所有参数都替换了'}) })
          </p>
        </section>
      </van-tab>
      <van-tab title="关于">
        <section class="content flex-xy-center">
          一个勉强可以写app的脚手架
        </section>
      </van-tab>
    </van-tabs>
  </router-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
const merge = require('webpack-merge');
import { reqNews } from '@/api/api';
@Component({
  name: 'Member',
  components: {
    BaseHeader,
  },
})
export default class Member extends Vue {
  private active: number = 0;
  private async changeActive(e: any) {
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

<style lang="less" scoped>
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
