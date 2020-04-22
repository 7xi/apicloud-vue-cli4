<template>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button } from 'vant';
import { getHasPermission } from '@/util/util';
@Component({
  components: {
    [Button.name]: Button,
  },
})
export default class extends Vue {
  private base64Img: string = '';

  // 测试使用apicloud的api获取图片
  private async photograph() {
    const that = this;
    if (this.$appMode) {
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
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.content {
  height: 200px;
  @include content(30px, 14px);
}
</style>
