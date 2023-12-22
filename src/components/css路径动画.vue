<!--
 * @Author: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @Date: 2023-12-21 09:04:55
 * @LastEditors: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @LastEditTime: 2023-12-21 09:07:13
 * @FilePath: \year-report-github\src\components\css路径动画.vue
 * @Description: css路径动画demo
-->
<template>
    <div class="dot"></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
/* 路径生成工具：https://editor.method.ac/ */
.dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: chocolate;
  offset-path: path("m257.99998,203.99999c145,-66 430.00004,11.00004 224.00002,106.00001c-206.00002,94.99998 -369.00002,-40.00002 -224.00002,-106.00001z");
  animation: divMove 3s infinite linear;
}
@keyframes divMove {
  100% {
    offset-distance: 100%;
  }
}
</style>