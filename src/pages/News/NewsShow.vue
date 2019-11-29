<template>
  <router-layout>
    <header slot="header">
      <base-header title="新闻详情" left-arrow leftText="返回" />
    </header>
    <main>正文</main>
  </router-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
@Component({
  name: 'NewsShow',
  components: {
    BaseHeader,
  },
})
export default class extends Vue {}
</script>
