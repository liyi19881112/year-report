<!--
 * @Author: 李一
 * @Date: 2023-12-22 14:44:47
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-28 09:56:06
 * @FilePath: \year-report-github\src\components\ScrollBall.vue
 * @Description: 文件描述
-->
<template>
 <div class="card-2">
        <span id="card-2-h1">培训知识点</span>
        <div class="h1-circle">
             <ul id="h1-circle-ul-1">
            <li>1、ES6新特性</li>
            <li>2、TypeScript类型约束</li>
            <li>3、Vue3基础知识</li>
            </ul>
             <ul id="h1-circle-ul-2">
              <li>3、ref()、reactive()、生命周期变化、setup()使用</li>
              <li>2、数据类型、函数、类、接口、泛型、type类型</li>
              <li>1、变量解构赋值、字符串和数组对象扩展、Promise对象、Module的语法</li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card-2 {
  position: relative;
  width: 300px;
  height: 400px;
  background-image: linear-gradient(to top,rgb(117, 117, 197),#67be96);
  border-radius: 30px;
  border: 2px solid white;
  overflow: hidden;
}

.h1-circle {
  position: absolute;
  right: 70px;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  background-image: radial-gradient(circle at center, #8798c5, #494fa1);
  opacity: .8;
}

.card-2:hover .h1-circle,
.h1-circle:hover {
  animation: moving-weel 1s linear;
  animation-fill-mode: forwards;
}

.h1-circle:not(:hover) {
  animation: moving-weel-2 1s linear;
  animation-fill-mode: backwards;
}

@keyframes moving-weel-2 {
  0% {
    rotate: 160deg;
    right: -170px;
  }

  50% {
    right: 20px;
    rotate: 75deg;
  }

  100% {
    rotate: 0deg;
  }
}

@keyframes moving-weel {
  0% {
    rotate: 0deg;
  }

  50% {
    right: 20px;
    rotate: 90deg;
  }

  100% {
    rotate: 180deg;
    right: -170px;
  }
}

.h1-circle ul li {
  list-style: none;
  color: white;
  font-size: 20px;
  margin: 20px;
}

#h1-circle-ul-1 {
  display: flex;
  flex: 1;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 200px;
  transition: 500ms ease-in;
}

#h1-circle-ul-2 {
  opacity: 0;
  flex: 1;
  flex-direction: column;
  position: absolute;
  top: 30px;
  left: 200px;
  transition: 1s ease-in;
}

#h1-circle-ul-2 li {
  transform: rotate(180deg);
  font-size: 15px;
  margin: 20px;
}

#card-2-h1 {
  position: absolute;
  left: 60px;
  top: 10px;
  color: transparent;
  font-size: 40px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  z-index: 700;
  background: linear-gradient(to bottom right, transparent, white 90%),rgb(117, 190, 117);
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;
  transition: 1s ease-in;
}

.card-2:hover #h1-circle-ul-2 {
  opacity: 1;
  transition: 1s ease-in;
}

.card-2:hover #h1-circle-ul-1 {
  opacity: 0;
  transition: 500ms ease-in;
}
</style>