<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2024-01-25 13:34:23
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-25 17:39:26
 * @FilePath: \year-report-github\src\views\ReelScroll.vue
 * @Description: 卷轴展开测试页
-->
<template>
  <div class="container">
    <reel>
      <div style="height: 100%;width: 100%;background-color: coral;"></div>
    </reel>
  </div>
</template>

<script setup>
import reel from "@/components/Reel.vue";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-image: url("@/assets/bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* 或者使用 'contain' 来保持原始比例并适应容器 */
  width: 100%;
  height: 100%;
  perspective: 1000px;
  overflow: hidden;
}
</style>
