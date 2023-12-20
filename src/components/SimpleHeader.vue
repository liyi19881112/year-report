<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-12 09:36:37
 * @FilePath: \year-report\src\components\SimpleHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isback" class="nbicon nbfanhui" @click="goBack">返回</i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="nbicon nbmore"></i>
  </header>
  <div class="block" />
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
    noback: {
      type: Boolean,
      default: false
    }
  },
  emits: ['callback'],
  setup(props, ctx) {
    const isback = ref(props.noback)
    const router = useRouter()
    const goBack = () => {
      if (!props.back) {
        router.go(-1)
      } else {
        router.push({ path: props.back })
      }
      ctx.emit('callback')
    }
    return {
      goBack,
      isback
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
      font-size: 14px;
    }
    i {
      cursor: pointer;
    }
  }
  .block {
    height: 44px;
  }
</style>
