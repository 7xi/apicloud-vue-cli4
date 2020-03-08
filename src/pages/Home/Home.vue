<template>
  <router-layout>
    <header slot="header">
      <base-header :title="$t('tabbar[0]')" />
    </header>

    <section class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(vo, index) in banner" :key="index">
          <img v-lazy="vo.image" />
        </van-swipe-item>
      </van-swipe>
    </section>

    <van-cell-group>
      <van-cell title="应用ID" :value="appGroup.appId" />
      <van-cell title="应用名称" :value="appGroup.appName" />
      <van-cell title="版本号" :value="appGroup.appVersion" />
      <van-cell title="系统类型" :value="appGroup.systemType" />
      <van-cell title="系统版本" :value="appGroup.systemVersion" />
      <van-cell title="引擎版本" :value="appGroup.version" />
      <van-cell title="唯一标识" :value="appGroup.deviceId" />
      <van-cell title="设备型号" :value="appGroup.deviceModel" />
      <van-cell title="设备名称" :value="appGroup.deviceName" />
      <van-cell title="运营商" :value="appGroup.operator" />
      <van-cell title="网络类型" :value="appGroup.connectionType" />
      <van-cell title="屏幕分辨率宽" :value="appGroup.screenWidth" />
      <van-cell title="屏幕分辨率高" :value="appGroup.screenHeight" />
    </van-cell-group>
  </router-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
import { reqBanner } from '@/api/api';
@Component({
  name: 'Home',
  components: {
    BaseHeader,
  },
})
export default class Home extends Vue {
  private banner: string[] = [];
  // 获取系统信息
  private appGroup: object = {
    appId: '',
    appName: '',
    appVersion: '',
    systemType: '',
    systemVersion: '',
    version: '',
    deviceId: '',
    deviceModel: '',
    deviceName: '',
    operator: '',
    connectionType: '',
    screenWidth: '',
    screenHeight: '',
  };

  // 初始化请求
  private async init() {
    //------STAR-------
    let params = {};
    reqBanner(params)
      .then((result: any) => {
        this.$toast(result.msg);
        this.banner = result.data.list;
      })
      .catch((error: any) => {
        console.log(error);
      });
    //------END-------
  }

  private async getAPPInfo() {
    this.appGroup = {
      // @ts-ignore
      appId: window.api.appId,
      // @ts-ignore
      appName: window.api.appName,
      // @ts-ignore
      appVersion: window.api.appVersion,
      // @ts-ignore
      systemType: window.api.systemType,
      // @ts-ignore
      systemVersion: window.api.systemVersion,
      // @ts-ignore
      version: window.api.version,
      // @ts-ignore
      deviceId: window.api.deviceId,
      // @ts-ignore
      deviceModel: window.api.deviceModel,
      // @ts-ignore
      deviceName: window.api.deviceName,
      // @ts-ignore
      operator: window.api.operator,
      // @ts-ignore
      connectionType: window.api.connectionType,
      // @ts-ignore
      screenWidth: window.api.screenWidth,
      // @ts-ignore
      screenHeight: window.api.screenHeight,
    };
  }

  private async mounted() {
    this.init();
    if (Vue.prototype.appGlobal) this.getAPPInfo();
  }
}
</script>

<style lang="less" scoped>
.banner {
  height: 200px;
  background: #f6f6f6;
  img {
    width: 100%;
    height: 200px;
    vertical-align: middle;
  }
}
</style>
