<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-18 13:58:31
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-07 08:51:36
 * @FilePath: \year-report-github\src\components\ShowBooks.vue
 * @Description: 书架展示组件
-->
<template>
  <div class="bookshelf">
    <div class="book-grid">
      <ul>
        <!-- <li><img :src="img1" /></li> -->
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page1"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page2"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page3"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page4"
          ></flipbook>
        </li>
      </ul>
    </div>
    <!-- <div class="shelf-shadows"></div>
    <div class="shelf"></div> -->
  </div>
  <div class="bookshelf">
    <div class="book-grid">
      <ul>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page5"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page6"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page7"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :clickToZoom="false"
            :singlePage="true"
            :pages="page8"
          ></flipbook>
        </li>
      </ul>
    </div>
    <!-- <div class="shelf-shadows"></div>
    <div class="shelf"></div> -->
  </div>
  <div class="bookshelf">
    <div class="book-grid">
      <ul>
        <li>
          <flipbook
            class="flipbook"
            :singlePage="true"
            :pages="page9"
          ></flipbook>
        </li>
        <li>
          <flipbook
            class="flipbook"
            :singlePage="true"
            :pages="page10"
          ></flipbook>
        </li>
        <li>
          <book-review v-show="bookReviewShow"></book-review>
        </li>
      </ul>
    </div>
  </div>
  <van-floating-bubble
    icon="chat"
    axis="xy"
    magnetic="x"
    v-model:offset="offset"
    @click="bookReviewShow = !bookReviewShow"
    >显隐书评</van-floating-bubble
  >
  <!-- <button @click="bookReviewShow = !bookReviewShow">点击显隐书评</button> -->
</template>

<script setup>
import img1 from "./images/云边有个小卖部.jpg";
import img2 from "./images/山茶文具店.jpg";
import img3 from "./images/鲜衣怒马.jpg";
import img4 from "./images/成为雍正.jpg";
import img5 from "./images/我与地坛.jpg";
import img6 from "./images/目送.jpg";
import img7 from "./images/法医秦明系列.jpg";
import img8 from "./images/太白金星有点烦.jpg";
import img9 from "./images/成龙.jpg";
import img10 from "./images/城南旧事.jpg";
import text1 from "./images/text1.jpg";
import text8 from "./images/text8.jpg";
import text9 from "./images/text9.jpg";
import bottom from "./images/wall-bookshelf.png";
import flipbook from "flipbook-vue";
import bookReview from "@/components/BookReview.vue";
import { ref } from "vue";

const bottomImg = "url(" + bottom + ")";
const page1 = [img1, text1];
const page2 = [img2, text1];
const page3 = [img3, text1];
const page4 = [img4, text1];
const page5 = [img5, text1];
const page6 = [img6, text1];
const page7 = [img7, text1];
const page8 = [img8, text8];
const page9 = [img9, text9];
const page10 = [img10, text9];

const offset = ref({ x: 0, y: 600 }); // 气泡默认位置
// 书评总结是否显示
const bookReviewShow = ref(false);
</script>

<style lang="scss" scoped>
.flipbook {
  width: 200px;
  height: 300px;
  & :deep(.page) {
    box-shadow: 4px 2px 7px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    padding: 0;
  }
}
.bookshelf {
  width: 900px;
  margin: 2rem auto;
  text-align: center;
  position: relative;
  &::after {
    background: v-bind(bottomImg);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom left;
    height: 3.5rem;
    display: block;
    content: "";
    transform: translateY(-1rem);
  }
}

.book-grid {
  z-index: 2;
  position: relative;
  transform: translateY(-15px);
}
.book-grid ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.book-grid ul li {
  justify-self: center;
}
.book-grid ul img {
  display: block;
  box-shadow: 0px -5px 20px 2px rgba(0, 0, 0, 0.3);
  width: 200px;
  height: 300px;
  -o-object-fit: cover;
  object-fit: cover;
}

.shelf-shadows {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.6rem;
  border-radius: 2px;
  //   z-index: 1;
  box-shadow: 0px -5px 3px 0px rgba(170, 170, 170, 0.2),
    0px 15px 20px 0px rgba(170, 170, 170, 0.7),
    0px 5px 5px 0px rgba(119, 119, 119, 0.3);
}

.shelf {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.6rem;
  background-color: #f9f9f9;
  border-radius: 2px;
  //   z-index: 3;
}
</style>
