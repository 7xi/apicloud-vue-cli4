<template>
  <router-layout>
    <header slot="header">
      <base-header left-arrow title="SVG图标示例" />
    </header>
    <div class="list">
      <div class="item" v-for="(vo, index) in list" :key="index" ref="copyText" @click="copyMe(index)">
        <div class="flex-xy-center">
          <svg-icon class="ico" :icon-class="vo" />
        </div>
        <input class="col-xs-x text van-ellipsis" type="text" :value="`<svg-icon icon-class='${vo}' />`" />
      </div>
    </div>
  </router-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
@Component({
  name: 'TempIcons',
  components: {
    BaseHeader,
  },
})
export default class TempIcons extends Vue {
  list: any[] = [];

  private copyMe(index: any): void {
    let dom: any = this.$refs.copyText as HTMLDivElement;
    dom[index].children[1].select();
    document.execCommand('copy');
    this.$toast('复制成功');
  }

  private init(): void {
    const file = require.context('@/assets/images/svg', false, /.svg$/).keys();
    let list: any[] = [];
    file.forEach((vo: any) => {
      list.push(vo.replace(/(.*\/)*([^.]+).*/gi, '$2'));
    });
    this.list = list;
  }

  private async mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>
.list {
  border-left: 2px solid #f3f3f3;
}
.item {
  padding: 5px 0;
  height: 0;
  padding-bottom: calc(100% / 3);
  text-align: left;
  float: left;
  border-right: 2px solid #f3f3f3;
  border-bottom: 2px solid #f3f3f3;
  width: calc(100% / 3);
  box-sizing: border-box;
  background: radial-gradient(circle, #f1f1f1, #ffffff);
  .ico {
    height: 50px;
    width: 50px;
  }
  .text {
    margin-top: 10px;
    font-size: 10px;
    width: 100%;
    background: #fff;
    height: 20px;
    color: #000;
    box-sizing: border-box;
    transform: scale(0.9);
  }
  .copy {
    font-size: 18px;
    margin-left: 20px;
  }
}
</style>
