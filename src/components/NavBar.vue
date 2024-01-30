<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-26 15:57:51
 * @FilePath: \newbee-mall-vue3-app\src\components\NavBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link  class="nav-list-item active" to="home">
        <i class="nbicon nblvsefenkaicankaoxianban-1"></i>
        <span>首页</span>
      </router-link>
      <!-- <router-link  class="nav-list-item" to="category">
        <i class="nbicon nbfenlei"></i>
        <span>分类</span>
      </router-link> -->
      <router-link id="step6" class="nav-list-item" to="cart">
        <i><van-icon  name="point-gift-o" :badge="!cart.count ? '' : cart.count" /></i>
        <span>结算单</span>
      </router-link>
      <router-link id="step7" class="nav-list-item" :to="{ path: '/user'}">
        <i class="nbicon nblvsefenkaicankaoxianban-"></i>
        <span>我的收获</span>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getLocal } from '@/common/js/utils'
const route = useRoute()
const cart = useCartStore()
onMounted(() => {
  const token = getLocal('token')
  const path = route.path
  // if (token && !['/home', '/category'].includes(path)) {
  //   cart.updateCart()
  // }
  
})
</script>

<style lang="less" scoped >
    @import '../common/style/mixin';
    .nav-bar{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 5px 0;
      z-index: 1000;
      background: linear-gradient(to right, #e6eee3, #b8e7a6);
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      .nav-list {
        width: 100%;
        .fj();
        flex-direction: row;
        padding: 0;
        .nav-list-item {
          display: flex;
          flex: 1;
          flex-direction: column;
          text-align: center;
          color: #666;
          &.router-link-active {
            color: @primary;
          }
          i {
            text-align: center;
            font-size: 22px;
          }
          span{
            font-size: 12px;
          }
          .van-icon-shopping-cart-o {
            margin: 0 auto;
            margin-bottom: 2px;
          }
        }
      }
    }
</style>
