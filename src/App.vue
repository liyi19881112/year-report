<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-14 10:19:04
 * @FilePath: \year-report\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div id="app">
    <RouterView v-if="isRouterAlive" />
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
