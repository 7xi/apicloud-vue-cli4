<template>
  <div>
    <van-skeleton title :avatar="SkeletonType" :row="row" :avatar-shape="shape" :avatar-size="avatarSize" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Skeleton extends Vue {
  // 骨架图头像占位图类型 | 默认无头像 | true | false
  @Prop({ default: false, type: Boolean }) private SkeletonType?: boolean;
  // 骨架图头像占位图形状 | 默认头像类型 | round | square
  @Prop({ default: 'round', type: String }) private shape?: string;
  // 骨架图头像占位图大小 | 默认32px
  @Prop({ default: '32', type: String }) private avatarSize?: String;
  // 骨架图显示行数 | 默认3行
  @Prop({ default: 3, type: Number }) private row?: number;
}
</script>
