<template>
  <router-layout>
    <header slot="header">
      <base-header :title="$t('tabbar[2]')" />
    </header>

    <template v-if="skeletonShow">
      <template v-for="(vo, index) in limit">
        <base-skeleton :key="index" />
      </template>
    </template>
    <template>
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="init">
        <van-cell v-for="(vo, index) in list" :key="index" :title="vo.title" :value="vo.date" :label="vo.description" to="NewsShow" />
      </van-list>
    </template>
  </router-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
import BaseSkeleton from '@/pages/components/BaseSkeleton.vue';
import { reqNews } from '@/api/api';
@Component({
  name: 'News',
  components: {
    BaseHeader,
    BaseSkeleton,
  },
})
export default class News extends Vue {
  private skeletonShow: boolean = true; //骨架图显示状态
  private list: string[] = []; //数据列表
  private loading: boolean = false; //加载状态
  private finished: boolean = false; //是否加载下一页
  private page: number = 1; //页码
  private limit: number = 10; //页码

  // 初始化请求
  private async init() {
    //------STAR-------
    let params = {};
    reqNews(params)
      .then((result: any) => {
        if (this.skeletonShow) this.skeletonShow = false;
        this.loading = false;
        if (this.page === 3) {
          this.finished = true;
        }
        this.list = this.list.concat(result.data.list);
      })
      .catch((error: any) => {
        this.loading = false;
        console.log(error);
      });
    //------END-------
    this.page++;
  }

  private async mounted() {
    this.init();
  }
}
</script>
