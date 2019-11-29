<template>
  <router-layout id="__index">
    <router-view></router-view>
    <footer slot="footer">
      <base-tabbar />
    </footer>
  </router-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseTabbar from '@/pages/components/BaseTabbar.vue';
@Component({
  components: {
    BaseTabbar,
  },
})
export default class Index extends Vue {}
</script>
