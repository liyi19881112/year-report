<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2024-01-25 13:34:23
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-25 17:33:50
 * @FilePath: \year-report-github\src\views\ReelScroll.vue
 * @Description: 卷轴展开测试组件
-->
<template>
  <div class="reel-container">
    <div class="reel"></div>
    <div class="scrollContent">
      <slot></slot>
    </div>
    <div class="reel"></div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.reel-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotateA 3s linear;
  animation-fill-mode: forwards;
  .scrollContent {
    width: 0%;
    height: 90%;
    // background-image: url("./images/content.jpg");
    // background-repeat: no-repeat;
    // background-position: center center;
    animation: scrollWidth 3s linear,scrollHeight 1s 3s linear;
    animation-fill-mode: forwards;
    // background-size: cover; /* 或者使用 'contain' 来保持原始比例并适应容器 */
    margin: 0 -35px;
  }
  .reel {
    width: 10%;
    height: 100%;
    animation: reduceWidth 0.1s 4s linear;
    animation-fill-mode: forwards;
    background-image: url("./images/reel.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain; /* 或者使用 'contain' 来保持原始比例并适应容器 */
    z-index: 1;
  }
  @keyframes scrollWidth {
    // 动画设置
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes scrollHeight {
    // 动画设置
    0% {
      height: 90%;
    }
    100% {
      height: 100%;
    }
  }
  @keyframes reduceWidth {
    // 动画设置
    0% {
      width: 10%;
    }
    100% {
      width: 0%;
    }
  }
  @keyframes rotateA {
    // 动画设置
    0% {
      transform: rotateX(45deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
}
</style>
