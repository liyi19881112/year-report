<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2023-12-21 15:47:44
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-08 10:23:45
 * @FilePath: \year-report-github\src\components\ThreeHoverCards.vue
 * @Description: 右上角多层hover卡片展示组件
-->
<template>
  <div class="card">
    <div class="logo">
      <!-- <svg class="svg" viewBox="0 0 94 94" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"
        ></path>
        <path
          d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"
        ></path>
        <path
          d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"
        ></path>
      </svg> -->
    </div>
    <div class="title">个人成长</div>
    <div class="box box3">
      <div class="box3-litter-title"><img src="./images/补充.svg" >补充</div>
      <div class="content">
        <span class="box-title">漏洞修复</span>
        <span class="box-text"
          >sql防注入，数据库配置信息加密，Druid弱口令漏洞，SpringBoot Actuator配置不当，未授权访问接口，.htaccess配置文件泄露，数据请求加密，后端请求拦截增加token验证
        </span>
      </div>
    </div>
    <div class="box box2">
      <div class="box2-litter-title"><img src="./images/复盘.svg" >复盘</div>
      <div class="content">
        <span class="box-title">不足之处</span>
        <span class="box-text"
          >打包优化、js红宝书基础、vue源码学习、web性能优化、js设计模式
        </span>
      </div>
    </div>
    <div class="box box1">
      <div class="box1-litter-title"><img src="./images/展望.svg" >展望</div>
      <div class="content">
        <span class="box-title">未来可期</span>
        <span class="box-text"
          >补充自己的技术短板，积极参与到架构升级与组件库平台开发中
        </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin-top: 3%;
  width: 12rem;
  height: 10rem;
  background: linear-gradient(-45deg, rgb(0, 153, 255) 0%, cyan 100%);
  overflow: hidden;
  border: 1px solid black;
  box-shadow: rgba(141, 177, 205, 0.618) 0px 40px 30px -25px;
  transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  img {
    width: 20px;
    height: 20px;
  }
}

.card:hover {
  transform: scale(1.08);
  box-shadow: rgba(141, 177, 205, 0.618) 0px 30px 30px -25px;
}

.icons-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  z-index: 999;
}

.icons-container .svg {
  stroke: white;
  width: 20px;
  transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.icons-container .svg:hover {
  transform: scale(1.5);
  stroke: black;
}

.icons-container .twitter {
  fill: white;
}

.icons-container .twitter:hover {
  fill: black;
  stroke: none;
}

.logo {
  width: 50px;
  padding: 1rem;
}

.logo .svg {
  fill: white;
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: White;
  font-weight: bold;
  font-size: 1.1rem;
}

.box {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: rgba(66, 66, 66, 0.349) 5px 0px 10px 0px inset;
  transition: all 0.5s ease-in-out;
  display: grid;
  place-content: center;
  padding: 2rem 2rem 3rem 2rem;
  border: 1px solid black;
}

.box .content {
  position: relative;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.5s ease-in-out 0.3s;
}

.box .content .box-title {
  display: block;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.box .content .box-text {
  color: rgba(255, 255, 255, 0.738);
  font-size: 0.5rem;
}

.box:hover {
  right: 0;
  top: 0;
  border-radius: 0;
  border: 1px solid transparent;
  box-shadow: rgba(66, 66, 66, 0) 5px 0px 10px 0px inset;
}

.box:hover .content {
  transform: translate(0, 0);
  opacity: 1;
}

.box1 {
  top: -85%;
  right: -40%;
  background: rgb(255, 112, 60);
  border-radius: 200px;
}

.box2 {
  top: -70%;
  right: -45%;
  background: rgb(255, 174, 0);
  border-radius: 200px;
}

.box3 {
  top: -62%;
  right: -30%;
  background: rgb(255, 194, 52);
  border-radius: 200px;
}

.box3:hover .box3-litter-title {
  display: none;
  z-index: 0;
}

.box2:hover .box2-litter-title {
  display: none;
  z-index: 0;
}

.box1:hover .box1-litter-title {
  display: none;
  z-index: 0;
}

.box3-litter-title {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  width: 50px;
  height: 30px;
  left: 23%;
  top: 86%;
}
.box2-litter-title {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  width: 50px;
  height: 30px;
  left: 23%;
  top: 86%;
}

.box1-litter-title {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  width: 50px;
  height: 30px;
  left: 40%;
  top: 88%;
}
</style>
