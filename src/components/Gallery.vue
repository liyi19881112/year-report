<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-13 15:11:23
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-30 15:16:41
 * @FilePath: \year-report\src\components\Gallery.vue
 * @Description: 照片画廊悬停组件
-->
<template>
  <div class="container" style="width: 96%">
    <div class="box one" :style="`--img: url(${getImg(`${itemId}_1`)})`"></div>
    <div class="box two" :style="`--img: url(${getImg(`${itemId}_2`)})`"></div>
    <div class="box three" :style="`--img: url(${getImg(`${itemId}_3`)})`"></div>
    <div class="box four" :style="`--img: url(${getImg(`${itemId}_4`)})`"></div>
    <div class="box five" :style="`--img: url(${getImg(`${itemId}_5`)})`"></div>
  </div>
</template>

<script setup>
import test1_1 from "./images/test.jpg";
import test1_2 from "./images/云边有个小卖部.jpg";
import test1_3 from "./images/云边有个小卖部.jpg";
import test1_4 from "./images/云边有个小卖部.jpg";
import test1_5 from "./images/云边有个小卖部.jpg";
import test2_1 from "./images/content.jpg";
import test2_2 from "./images/云边有个小卖部.jpg";
import test2_3 from "./images/云边有个小卖部.jpg";
import test2_4 from "./images/云边有个小卖部.jpg";
import test2_5 from "./images/云边有个小卖部.jpg";
import test3_1 from "./images/content.jpg";
import test3_2 from "./images/云边有个小卖部.jpg";
import test3_3 from "./images/云边有个小卖部.jpg";
import test3_4 from "./images/云边有个小卖部.jpg";
import test3_5 from "./images/云边有个小卖部.jpg";
import test4_1 from "./images/content.jpg";
import test4_2 from "./images/云边有个小卖部.jpg";
import test4_3 from "./images/云边有个小卖部.jpg";
import test4_4 from "./images/云边有个小卖部.jpg";
import test4_5 from "./images/云边有个小卖部.jpg";
import test5_1 from "./images/content.jpg";
import test5_2 from "./images/云边有个小卖部.jpg";
import test5_3 from "./images/云边有个小卖部.jpg";
import test5_4 from "./images/云边有个小卖部.jpg";
import test5_5 from "./images/云边有个小卖部.jpg";

const props = defineProps({
  itemId: String,
});

const getImg = (id) => {
  switch (id) {
    case "1_1":
      return test1_1;
    case "1_2":
      return test1_2;
    case "1_3":
      return test1_3;
    case "1_4":
      return test1_4;
    case "1_5":
      return test1_5;
    case "2_1":
      return test2_1;
    case "2_2":
      return test2_2;
    case "2_3":
      return test2_3;
    case "2_4":
      return test2_4;
    case "2_5":
      return test2_5;
    case "3_1":
      return test3_1;
    case "3_2":
      return test3_2;
    case "3_3":
      return test3_3;
    case "3_4":
      return test3_4;
    case "3_5":
      return test3_5;
    case "4_1":
      return test4_1;
    case "4_2":
      return test4_2;
    case "4_3":
      return test4_3;
    case "4_4":
      return test4_4;
    case "4_5":
      return test4_5;
    case "5_1":
      return test5_1;
    case "5_2":
      return test5_2;
    case "5_3":
      return test5_3;
    case "5_4":
      return test5_4;
    case "5_5":
      return test5_5;
    default:
      return test1_1;
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  display: grid;
  width: 100%;
  height: 155px;
  top: 12%;
  margin: 0 13px;
  background: transparent;
  transition: 0.25s;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; // 将容器分为5列
  grid-gap: 20px; // 设置行与列的间隙
  .box {
    position: relative;
    background: var(--img); // 使用上方html中声明的图片路径
    background-position: center;
    background-size: cover; // 设置背景位移
    transition: 0.25s;
    display: flex;
    justify-content: center;
    align-content: center;
    filter: grayscale(1) brightness(0.9); // 设置容器的灰度和亮度
    &:hover {
      filter: grayscale(0) brightness(1.05); // 鼠标悬停的图片灰度去掉，提高亮度
    }
    // 图片上下区域增加渐变效果
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        rgba(0,0,0,0.8),
        transparent,
        transparent,
        transparent,
        rgba(0,0,0,0.8)
      );
      transition: 0.25s;
    }
    // 图片错位排列
    &:nth-child(even) {
      transform: translateY(15px);
    }
    &:nth-child(odd) {
      transform: translateY(-15px);
    }
  }
}

// 每列鼠标悬停的宽度
.container:has(.one:hover) {
  grid-template-columns: 2fr 0.5fr 0.5fr 0.5fr 0.5fr;
}

.container:has(.two:hover) {
  grid-template-columns: 0.5fr 2fr 0.5fr 0.5fr 0.5fr;
}

.container:has(.three:hover) {
  grid-template-columns: 0.5fr 0.5fr 2fr 0.5fr 0.5fr;
}

.container:has(.four:hover) {
  grid-template-columns: 0.5fr 0.5fr 0.5fr 2fr 0.5fr;
}

.container:has(.five:hover) {
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 2fr;
}
</style>
