<template>
  <router-layout>
    <header slot="header">
      <base-header :title="$t('tabbar[3]')" :border="false" />
    </header>
    <main class="flex-xy-center"></main>

    <van-tabs v-model="active" color="#07c160" @click="changeActive">
      <van-tab :title="$t('tabsMenu[0]')">
        <section class="content flex-xy-center">
          <van-button plain type="primary" to="TempIcons">跳转到svg-sprite页</van-button>
        </section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[1]')">
        <section class="content">
          <div class="tip">TAB解决方案，动态修改url地址query参数</div>
          <h5>1.tab切换事件中加入修改参数</h5>
          <p>this.$router.push({ query:merge(this.$route.query,{active:动态传入的值}) })</p>
          <h5>2.如何新增一个参数</h5>
          <p>this.$router.push({ query:merge(this.$route.query,{addParams:'我是新增的一个参数'}) })</p>
          <h5>3.如何替换所有参数</h5>
          <p>this.$router.push({ query:merge({},{maxPrice:'我把所有参数都替换了'}) })</p>
        </section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[2]')">
        <section class="content flex-xy-center">一个勉强可以写app的脚手架</section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[3]')">
        <section class="content flex-xy-center">
          <van-button plain type="primary" @click="switchLanguage">切换语言</van-button>
        </section>
      </van-tab>
      <van-tab :title="$t('tabsMenu[4]')">
        <section class="content flex-xy-center">
          <div class="box">
            <div style="margin-bottom:40px">
              <template v-if="base64Img">
                <van-image width="100" height="100" :src="base64Img" />
              </template>
            </div>
            <div class="flex-xy-center">
              <van-button plain type="primary" @click="photograph">拍照演示</van-button>
            </div>
          </div>
        </section>
      </van-tab>
    </van-tabs>
  </router-layout>
</template>

<script lang="ts">
const merge = require('webpack-merge');
import { Locale } from 'vant';
import enUS from '@/assets/languages/vant/en-US';
import zhCN from '@/assets/languages/vant/zh-CN';
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseHeader from '@/pages/components/BaseHeader.vue';
import { reqNews } from '@/api/api';
import { setLocalStorage, getLocalStorage, getHasPermission } from '@/util/util';
@Component({
  name: 'Member',
  components: {
    BaseHeader,
  },
})
export default class Member extends Vue {
  private active: number = 0;
  private base64Img: string = '';

  // 测试使用apicloud的api获取图片
  private async photograph() {
    const that = this;
    if (Vue.prototype.appGlobal) {
      // 演示获取摄像头权限
      let camera = new Promise((resolve, reject) => {
        getHasPermission('camera', function(ret: any) {
          if (ret) {
            resolve(ret);
          } else {
            reject(ret);
          }
        });
      });

      // 演示获取相册权限
      let photos = new Promise((resolve, reject) => {
        getHasPermission('photos', function(ret: any) {
          if (ret) {
            resolve(ret);
          } else {
            reject(ret);
          }
        });
      });

      Promise.all([camera, photos])
        .then(result => {
          if (!result[0]) {
            that.$toast('获取不到摄像头权限');
            return;
          }
          if (!result[1]) {
            that.$toast('获取不到相册权限');
            return;
          }
          api.getPicture(
            {
              sourceType: 'camera',
              encodingType: 'jpg',
              mediaValue: 'pic',
              destinationType: 'base64',
              allowEdit: true,
              quality: 50,
              targetWidth: 100,
              targetHeight: 100,
              saveToPhotoAlbum: false,
            },
            function(ret: any) {
              if (ret) {
                that.base64Img = ret.base64Data;
              } else {
                that.$toast('不拍啦');
              }
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.$toast('请在apicloud中测试该功能');
    }
  }

  // 动态修改参数
  private async changeActive(e: any) {
    this.$router.push({
      query: merge(this.$route.query, { active: e }),
    });
  }

  // 切换语言
  private async switchLanguage(e: any) {
    let lang: string = '';
    if (getLocalStorage('language')) {
      if (getLocalStorage('language') === 'zh_CN') {
        lang = 'en_US';
        Locale.use('en_US', enUS);
      } else {
        lang = 'zh_CN';
        Locale.use('zh_CN', zhCN);
      }
    } else {
      lang = 'zh_CN';
    }
    this.$i18n.locale = lang;
    setLocalStorage('language', lang);
    this.$dialog.alert({
      message: lang === 'zh_CN' ? '完成' : 'ok',
    });
  }

  private async mounted() {
    const active: number = this.$route.query && this.$route.query.active ? ~~this.$route.query.active : 0;
    this.active = active;
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 200px;
  padding: 30px;
  font-size: 14px;
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
