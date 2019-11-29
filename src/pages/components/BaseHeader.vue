<template>
  <div>
    <van-nav-bar
      :style="{ paddingTop: getterAppConfig && getterAppConfig.appSafeAreaHeader ? `${getterAppConfig.appSafeAreaHeader}px` : '0px' }"
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :border="border"
      :z-index="Zindex"
      @click-left="handelLeft"
    >
      <template v-if="slotLeft">
        <div slot="left">
          <slot name="screen"></slot>
        </div>
      </template>
      <template v-if="slotTitle">
        <div slot="title">
          <slot name="screen"></slot>
        </div>
      </template>
      <template v-if="slotRight">
        <div slot="right">
          <slot name="screen"></slot>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
@Component
export default class extends Vue {
  // title | 标题
  @Prop({ default: '', type: String }) private title?: string;
  // leftText | 左侧文案
  @Prop({ default: '', type: String }) private leftText?: string;
  // rightText | 右侧文案
  @Prop({ default: '', type: String }) private rightText?: string;
  // leftArrow | 是否显示左侧箭头
  @Prop({ default: false, type: Boolean }) private leftArrow?: boolean;
  // border | 是否显示下边框
  @Prop({ default: true, type: Boolean }) private border?: boolean;
  // Zindex | 元素 z-index
  @Prop({ default: 10, type: Number }) private Zindex?: number;
  // slotLeft | 自定义左侧区域内容
  @Prop({ default: false, type: Boolean }) private slotLeft?: boolean;
  // slotTitle | 自定义标题
  @Prop({ default: false, type: Boolean }) private slotTitle?: boolean;
  // slotRight | 自定义右侧区域内容
  @Prop({ default: false, type: Boolean }) private slotRight?: boolean;

  @Getter('appConfig') private getterAppConfig: any;

  private async handelLeft() {
    this.$router.go(-1);
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  .van-icon {
    color: #323233;
  }
  .van-nav-bar__text {
    color: #323233;
  }
}
</style>
