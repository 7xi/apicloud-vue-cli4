<template>
  <div class="vue-route-transition">
    <transition :name="pageDirection" @leave="setRouterMap">
      <template v-if="this.keepAlive && $route.meta.keepAlive">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'vue-route-transition',
})
export default class vueRouteTransition extends Vue {
  @Prop({ default: true, type: Boolean }) private keepAlive!: boolean;
  private localSessionRouteChain = [];
  private addCount: any = 0;
  private routerMap: any = {};
  private pageDirection: any = 'fade';
  private routeChain: any = [];

  private async addRouteChain(route: any) {
    if (this.addCount === 0 && this.localSessionRouteChain.length > 0) {
      // 排除刷新的时候
      this.addCount = 1;
    } else {
      if ((this.addCount !== 0 && this.routeChain[this.routeChain.length - 1].path !== route.path) || this.addCount === 0) {
        this.routeChain.push({
          path: route.path,
        });
        sessionStorage.setItem('$$routeChain', JSON.stringify(this.routeChain));
        this.addCount++;
      }
    }
  }

  private async popRouteChain() {
    this.routeChain.pop();
    sessionStorage.setItem('$$routeChain', JSON.stringify(this.routeChain));
  }

  private async setPageDirection(obj: any) {
    this.pageDirection = obj.dir;
    this.routerMap['to'] = obj.to.path;
    this.routerMap['from'] = obj.from.path;
  }

  private async setRouterMap() {
    let dir = this.pageDirection;
    let to = this.routerMap.to.replace(/\//g, '_');
    let from = this.routerMap.from.replace(/\//g, '_');
    try {
      if (dir === 'slide-left') {
        // 进入
        this.$nextTick(() => {
          let dom: any = document.getElementById(from);
          this.routerMap[from] = dom.scrollTop;
        });
      } else if (dir === 'slide-right') {
        // 返回
        if (this.keepAlive === true && this.$route.meta.keepAlive !== false) {
          this.$nextTick(() => {
            let dom: any = document.getElementById(to);
            dom.scrollTop = this.routerMap[to];
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async beforeCreate() {
    try {
      let arr: any = sessionStorage.getItem('$$routeChain');
      this.localSessionRouteChain = this.$route.path !== '/' ? JSON.parse(arr || []) : [];
    } catch (error) {
      this.localSessionRouteChain = [];
    }
    this.addCount = this.localSessionRouteChain.length;
    this.routeChain = this.localSessionRouteChain;
  }

  private async mounted() {
    this.$router.beforeEach((to, from, next) => {
      // 定义一个可以记录路由路径变化的数据，这里用sessionStorage,或者在window.routeChain等变量
      let routeLength = this.routeChain.length;
      if (routeLength === 0 || this.addCount === 0) {
        this.setPageDirection({ dir: 'slide-left', to, from });
        this.addRouteChain(from);
        this.addRouteChain(to);
      } else if (routeLength === 1) {
        this.setPageDirection({ dir: 'slide-left', to, from });
        this.addRouteChain(to);
      } else {
        let lastBeforeRoute: any = this.routeChain[routeLength - 2];
        if (lastBeforeRoute.path === to.path && to.meta.slideLeft !== true) {
          this.popRouteChain();
          this.setPageDirection({ dir: 'slide-right', to, from });
        } else {
          this.addRouteChain(to);
          this.setPageDirection({ dir: 'slide-left', to, from });
        }
      }
      next();
    });
  }
}
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
.vue-route-transition {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backface-visibility: hidden;
  perspective: 1000;
}
.fade-enter-active {
  animation: pageFadeIn 300ms forwards;
}
@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*路由前进，退出*/

.slide-left-leave-active {
  animation: pageFromCenterToLeft 300ms forwards;
  z-index: 1;
}

/*路由后退，进入*/

.slide-right-enter-active {
  animation: pageFromLeftToCenter 300ms forwards;
  z-index: 1;
}

/*路由后退，退出*/

.slide-right-leave-active {
  animation: pageFromCenterToRight 300ms forwards;
  z-index: 10;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
}

/*路由前进，进入*/

.slide-left-enter-active {
  animation: pageFromRightToCenter 300ms forwards;
  z-index: 10;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
}

/*-------------------------------*/

/*路由前进，进入*/

@keyframes pageFromRightToCenter {
  from {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/*路由前进，退出*/

@keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left:0; */
  }
  to {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
    /* left:-20%; */
  }
}

/*路由后退，进入*/

@keyframes pageFromLeftToCenter {
  from {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
    /* left: -20%; */
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left: 0; */
  }
}

/*路由后退，退出*/

@keyframes pageFromCenterToRight {
  from {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
}
</style>
