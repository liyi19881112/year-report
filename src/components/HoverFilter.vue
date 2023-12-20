<!--
 * @Author: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @Date: 2023-12-20 16:27:43
 * @LastEditors: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @LastEditTime: 2023-12-20 16:28:15
 * @FilePath: \year-report-github\src\components\HoverFilter.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cards">
    <div class="card red">
      <p class="tip">Hover Me</p>
      <p class="second-text">Lorem Ipsum</p>
    </div>
    <div class="card blue">
      <p class="tip">Hover Me</p>
      <p class="second-text">Lorem Ipsum</p>
    </div>
    <div class="card green">
      <p class="tip">Hover Me</p>
      <p class="second-text">Lorem Ipsum</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cards .red {
  background-color: #f43f5e;
}

.cards .blue {
  background-color: #3b82f6;
}

.cards .green {
  background-color: #22c55e;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100px;
  width: 250px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: 0.7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}
</style>
