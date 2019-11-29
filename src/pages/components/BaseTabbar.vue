<template>
  <van-tabbar :fixed="false" v-model="active" active-color="#1C1C1C">
    <van-tabbar-item icon="home-o" to="/">
      <span>首页</span>
      <span class="icon icon-acitityLabel"></span>
    </van-tabbar-item>

    <van-tabbar-item icon="todo-list-o" to="/News">
      <span>新闻</span>
    </van-tabbar-item>

    <van-tabbar-item icon="apps-o" to="/Products">
      <span>产品</span>
    </van-tabbar-item>

    <van-tabbar-item icon="friends-o" to="/Member">
      <span>我的</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class extends Vue {
  private active: number = 0;

  private async setActive() {
    const path = this.$route.path;
    switch (path) {
      case '/':
        this.active = 0;
        break;
      case '/News':
        this.active = 1;
        break;
      case '/Products':
        this.active = 2;
        break;
      case '/Member':
        this.active = 3;
        break;
      default:
        this.active = 0;
        break;
    }
  }

  private async mounted() {
    this.setActive();
  }
}
</script>
