<!--
 * @Author: 李一
 * @Date: 2023-12-20 14:19:03
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-26 15:26:34
 * @FilePath: \year-report-github\src\App.vue
 * @Description: 年度汇报入口
-->

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <!-- <keep-alive include="ItemDetail"> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
    </router-view>
  </div>
</template>

<script setup>
import { reactive, provide, ref, nextTick } from "vue";
import { useRouter, RouterView } from "vue-router";
const router = useRouter();
const state = reactive({
  transitionName: "slide-left",
});
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
router.beforeEach((to, from) => {
  if (to.meta.index > from.meta.index) {
    state.transitionName = "slide-left"; // 向左滑动
  } else if (to.meta.index < from.meta.index) {
    // 由次级到主级
    state.transitionName = "slide-right";
  } else {
    state.transitionName = ""; // 同级无过渡效果
  }
});
</script>

<style lang="less">
html,
body {
  height: 100%;
  overflow-x: hidden;
  // overflow-y: scroll;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
  z-index: 1000;
}
</style>
