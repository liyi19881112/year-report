<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-15 09:42:16
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-04 09:49:05
 * @FilePath: \year-report-github\src\components\RedBooks.vue
 * @Description: 小红书同款互动卡片
-->
<template>
  <div class="main">
    <div class="card">
      <div class="additional">
        <div class="user-card">
          <div class="level center">{{ currentItemDetail.text1 }}</div>
          <div class="points center">{{ currentItemDetail.text2 }}</div>
        </div>
        <div class="more-info">
          <h1>{{ currentItemDetail.text3 }}</h1>
          <div class="coords">
            <span>{{ currentItemDetail.text6 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text7 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text8 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text9 }}</span>
          </div>
        </div>
      </div>
      <div class="general">
        <h1>{{ currentItemDetail.text3 }}</h1>
        <p style="font-size: 15px;">
          {{ currentItemDetail.text4 }}
        </p>
        <span class="more">{{ currentItemDetail.text5 }}</span>
      </div>
    </div>

    <div class="card green">
      <div class="additional">
        <div class="user-card">
          <div class="level center">{{ currentItemDetail.text10 }}</div>
          <div class="points center">{{ currentItemDetail.text11 }}</div>
        </div>
        <div class="more-info">
          <h1>{{ currentItemDetail.text12 }}</h1>
          <div class="coords">
            <span>{{ currentItemDetail.text15 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text16 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text17 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text18 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text19 }}</span>
          </div>
        </div>
      </div>
      <div class="general">
        <h1>{{ currentItemDetail.text12 }}</h1>
        <p style="font-size: 15px;">
          {{ currentItemDetail.text13 }}
        </p>
        <span class="more">{{ currentItemDetail.text14 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  itemId: String,
});

// 不同项目信息
const itemCards = [
  {
    text1: '开发需求导向',
    text2: '提升开发效率',
    text3: '开发需求导向',
    text4: '根据团队在开发过程中遇到的问题，进行针对性架构升级，进一步提升开发效率',
    text5: "",
    text6: "1、Config模块化，解决多人编辑同一文件git冲突问题",
    text7: "2、调整Eslint的IDE插件配置",
    text8: "3、布局缩放自适应",
    text9: "",
    text10: "项目需求导向",
    text11: "增加用户体验",
    text12: "项目需求导向",
    text13: "根据实际项目现场需求，增加可复用功能，统一集成到大屏架构种子工程当中",
    text14: "",
    text15: "1、增加主题切换机制",
    text16: "2、集成键盘控制能力",
    text17: "3、开启portal集成支持",
    text18: "4、后端增加国产多数据源支持",
    text19: "5、增加指标说明开关功能",
    id: "2",
  }
];

// 当前需要展示的项目明细
const currentItemDetail = ref();

watch(
  () => props.itemId,
  (val) => {
    currentItemDetail.value = itemCards.find((item) => item.id == val);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css?family=Abel');

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card {
  width: 450px;
  height: 250px;
  background-color: #fff;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin: 0.5rem;
}

.card h1 {
  text-align: center;
}

.card .additional {
  position: absolute;
  width: 150px;
  height: 100%;
  background: linear-gradient(#dE685E, #EE786E);
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}

.card.green .additional {
  background: linear-gradient(#92bCa6, #A2CCB6);
}


.card:hover .additional {
  width: 100%;
  border-radius: 0 5px 5px 0;
}

.card .additional .user-card {
  width: 150px;
  height: 100%;
  position: relative;
  float: left;
}

.card .additional .user-card::after {
  content: "";
  display: block;
  position: absolute;
  top: 10%;
  right: -2px;
  height: 80%;
  border-left: 2px solid rgba(0,0,0,0.025);
}

.card .additional .user-card .level,
.card .additional .user-card .points {
  top: 15%;
  color: #fff;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: bold;
  background: rgba(0,0,0,0.15);
  padding: 0.125rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
}

.card .additional .user-card .points {
  top: 85%;
}

.card .additional .user-card svg {
  top: 50%;
}

.card .additional .more-info {
  width: 300px;
  float: left;
  position: absolute;
  left: 150px;
  height: 100%;
}

.card .additional .more-info h1 {
  color: #fff;
  margin-bottom: 0;
}

.card.green .additional .more-info h1 {
  color: #224C36;
}

.card .additional .coords {
  margin: 0 1rem;
  color: #fff;
  font-size: 0.4rem;
}

.card.green .additional .coords {
  color: #325C46;
}

.card .additional .coords span + span {
  float: right;
}

.card .general {
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 0;
}

.card .general .more {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1em;
}
</style>
