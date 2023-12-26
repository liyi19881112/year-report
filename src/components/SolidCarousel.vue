<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2023-12-26 14:10:09
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2023-12-26 14:30:28
 * @FilePath: \year-report-github\src\components\SolidCarousel.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="outside">
    <div class="rotas">
      <div class="sel">
        <img :src="img1" />
        <div></div>
      </div>
      <div>
        <img :src="img2" />
        <div></div>
      </div>
      <div>
        <img :src="img3" />
        <div></div>
      </div>
      <div>
        <img :src="img4" />
        <div></div>
      </div>
      <div>
        <img :src="img5" />
        <div></div>
      </div>
      <div>
        <img :src="img6" />
        <div></div>
      </div>
    </div>
    <div class="changeBtns">
      <div class="left">&lt;</div>
      <div class="right">&gt;</div>
    </div>
  </div>
</template>

<script setup>
import img1 from "./images/云边有个小卖部.jpg";
import img2 from "./images/山茶文具店.jpg";
import img3 from "./images/鲜衣怒马.jpg";
import img4 from "./images/成为雍正.jpg";
import img5 from "./images/我与地坛.jpg";
import img6 from "./images/目送.jpg";

let rotas = $(".rotas");
let rotasPro = $(".rotas >div");
let rightBtn = $(".right");
let leftBtn = $(".left");
let deg = 0;
let degImg = 0;
console.log('获取dom元素', rotas);
</script>

<style lang="scss" scoped>
.outside {
  width: 80%;
  height: 85%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.rotas {
  width: 500px;
  height: 340px;
  transition: all 0.6s linear;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-5deg) rotateY(2deg);
  user-select: none;
}

.rotas > div {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgb(240, 240, 240);
  transform: scale(1.1);
}

.rotas > div div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(30, 30, 30, 0.65);
  transition: all 0.6s linear;
}

.rotas > div.sel div {
  background-color: rgba(30, 30, 30, 0);
}

.rotas > div:nth-of-type(1) {
  transform: translateZ(500px);
}

.rotas > div:nth-of-type(2) {
  transform: rotateY(-60deg) translateZ(500px);
}

.rotas > div:nth-of-type(3) {
  transform: rotateY(-120deg) translateZ(500px);
}

.rotas > div:nth-of-type(4) {
  transform: translateZ(-500px);
}

.rotas > div:nth-of-type(5) {
  transform: rotateY(120deg) translateZ(500px);
}

.rotas > div:nth-of-type(6) {
  transform: rotateY(60deg) translateZ(500px);
}

.rotas img {
  width: 100%;
  height: 100%;
}

.changeBtns {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.changeBtns > div {
  font-size: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(170, 170, 170);
  border: solid 1px;
  cursor: pointer;
  user-select: none;
}
</style>
