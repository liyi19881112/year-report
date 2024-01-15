<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-12 17:48:54
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-15 16:08:20
 * @FilePath: \year-report\src\components\seal.vue
 * @Description: 生成签章组件
-->
<template>
  <div
    class="seal"
    :style="`position: absolute; right: 5px; top: 7px; border: 3px solid ${
      currentItemDetail?.color || '#FFB6C1'
    }`"
  >
    <div
      class="seal-son"
      :style="`border: 3px solid ${
        currentItemDetail?.color || '#FFB6C1'
      };color: ${currentItemDetail?.color || '#FFB6C1'}`"
    >
      <span
        style="
          position: absolute;
          top: 23%;
          text-align: center;
          font-size: 17px;
          transform: rotate(-45deg);
          right: 37%;
          font-weight: 900;
        "
        >{{ currentItemDetail?.name || "技术类" }}</span
      >
      <span
        style="
          position: absolute;
          top: 45%;
          text-align: center;
          font-size: 10px;
          transform: rotate(-45deg);
          left: 22%;
        "
        >{{ currentTime }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  itemId: String,
  currentTime: String,
});

// 不同项目对应盖章信息
const sealItem = [
  {
    id: "4",
    name: "兴趣类",
    color: "#2ffad4",
  },
  {
    id: "5",
    name: "阅读类",
    color: "#FFBBFF",
  },
  {
    id: "3",
    name: "培训类",
    color: "#FFC125",
  },
];

// 当前需要展示的项目明细
const currentItemDetail = ref();

watch(
  () => props.itemId,
  (val) => {
    currentItemDetail.value = sealItem.find((item) => item.id == val);
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.seal {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .seal-son {
    width: 72px;
    height: 72px;
    border: solid 1px #b4b4b4;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: relative;
  }
}
</style>
