<template>
  <vue-route-transition id="app" :keepAlive="true"></vue-route-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Mutation, State, Getter } from 'vuex-class';
@Component
export default class extends Vue {
  private active: number = 0;
  @Mutation('SET_APPCONFIG_MUTATION') private actionAppConfig: any;
  @Getter('appConfig') private getterAppConfig: any;

  // 设置APP顶部状态栏沉浸式样式
  private async setBarStyle() {
    if (api.systemType == 'android' && parseInt(api.systemVersion) < 6) {
      api.setStatusBarStyle({
        style: 'dark',
        color: 'rgba(0,0,0,.4)',
      });
    } else {
      api.setStatusBarStyle({
        style: 'dark',
        color: 'rgba(0,0,0,0)',
      });
    }
  }

  // 获取沉浸式头部和底部占用的像素距离
  private async setSafeArea() {
    const appConfig = JSON.parse(JSON.stringify(this.getterAppConfig));
    appConfig.appSafeAreaHeader = api.safeArea.top;
    appConfig.appSafeAreaFooter = api.safeArea.bottom;
    this.actionAppConfig(appConfig);
  }

  private async created() {
    if (this.$appMode) {
      this.setBarStyle();
      this.setSafeArea();
    }
  }
}
</script>

<style lang="scss">
/*横向弹性盒子*/

.flex-box-x {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  display: flex;
}

.flex-box-x > .col-xs-x {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

/*纵向弹性盒子*/

.flex-box-y {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  display: flex;
}

.flex-box-y > .col-xs-y {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

/*水平居中*/

.flex-x-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: flex;
  text-align: center;
}

/*垂直居中*/

.flex-y-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkflex;
}

/*水平垂直居中*/

.flex-xy-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
}

/*顶部对齐*/

.flex-top-center {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -ms-grid-row-align: flex-start;
  align-items: flex-start;
  display: flex;
}

/*底部对齐*/

.flex-botttom-center {
  -webkit-box-align: end;
  -ms-flex-align: end;
  -ms-grid-row-align: flex-end;
  align-items: flex-end;
  display: flex;
}

.scroll-y {
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar {
  display: none;
}

/*自动隐藏文字*/

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ellipsis-1 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

input {
  border: 0px;
  outline: none;
}

img {
  content: normal !important;
}
</style>
