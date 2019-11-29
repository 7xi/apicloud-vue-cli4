<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SvgIcon extends Vue {
  @Prop(String!) private iconClass!: string;
  @Prop({ default: '', type: String }) private className!: string;
  @Prop({ default: '', type: String }) private indeStyle!: string;

  private get iconName() {
    return `#icon-${this.iconClass}`;
  }
  private get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }
  private get svgStyle() {
    let style = this.indeStyle;
    return style ? style : '';
  }
}
</script>

<style scoped>
.svg-icon {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
