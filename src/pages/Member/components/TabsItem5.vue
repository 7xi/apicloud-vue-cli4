<template>
  <van-cell-group>
    <van-cell title="昵称" :value="about.name" />
    <van-cell title="地址" :value="about.local" />
    <van-cell title="爱好">
      <van-tag type="primary" v-for="(vo, index) in about.likes" :key="index">{{ vo }}</van-tag>
    </van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Tag, Cell, CellGroup } from 'vant';
import { getHasPermission } from '@/util/util';
import { Action, Mutation, State, Getter } from 'vuex-class';
import { About } from '@/store/state';
@Component({
  components: {
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class extends Vue {
  @Mutation('SET_ABOUT_MUTATION') private actionAbout: any;
  @Getter('about') private about!: About;
  private async mounted() {
    this.actionAbout();
  }
}
</script>
