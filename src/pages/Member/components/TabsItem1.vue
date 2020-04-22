<template>
  <section class="content">
    <div class="tip">TAB解决方案，动态修改url地址query参数</div>
    <h5>1.tab切换事件中加入修改参数</h5>
    <p>this.$router.push({ query:merge(this.$route.query,{active:动态传入的值}) })</p>
    <h5>2.如何新增一个参数</h5>
    <p>this.$router.push({ query:merge(this.$route.query,{addParams:'我是新增的一个参数'}) })</p>
    <h5>3.如何替换所有参数</h5>
    <p>this.$router.push({ query:merge({},{maxPrice:'我把所有参数都替换了'}) })</p>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.content {
  height: 200px;
  @include content(30px, 14px);
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
