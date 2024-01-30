<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2024-01-25 13:34:23
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-29 17:37:58
 * @FilePath: \year-report-github\src\views\ReelScroll.vue
 * @Description: 卷轴主题展开组件
-->
<template>
  <div class="outter-container">
    <div class="inner-container">
      <div class="views">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
%common-style {
  width: 50px;
  height: 110vh;
  background-image: url("./images/reel.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* 或者使用 'contain' 来保持原始比例并适应容器 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.outter-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner-container {
    width: 0%;
    height: 100vh;
    padding: 0;
    position: relative;
    background-color: red;
    animation: openDraw 10s ease forwards;
    .views {
      overflow: hidden;
      height: 100%;
    }
    &::before,
    &::after {
      @extend %common-style;
      content: "";
      left: -50px;
    }
    &::after {
      right: -50px;
      left: unset;
    }
  }

  @keyframes openDraw {
    0% {
      width: 0%;
      transform: scale(0.8);
      padding: 10px 0;
    }
    60% {
      width: 100%;
      transform: scale(0.8);
      padding: 10px 0;
    }
    100% {
      width: 100%;
      height: 100%;
      transform: scale(1);
      padding: 0;
    }
  }
}
</style>
