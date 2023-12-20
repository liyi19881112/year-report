<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-15 09:42:16
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-20 09:13:21
 * @FilePath: \year-report\src\components\RedBooks.vue
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
          <h1>{{ currentItemDetail.text6 }}</h1>
          <div class="coords">
            <span>{{ currentItemDetail.text7 }}</span>
          </div>
          <div class="coords">
            <span>{{ currentItemDetail.text8 }}</span>
          </div>
        </div>
      </div>
      <div class="general">
        <h1>{{ currentItemDetail.text3 }}</h1>
        <p>
          {{ currentItemDetail.text4 }}
        </p>
        <span class="more">{{ currentItemDetail.text5 }}</span>
      </div>
    </div>

    <div class="card green">
      <div class="additional">
        <div class="user-card">
          <div class="level center">Level 13</div>
          <div class="points center">5,312 Points</div>
        </div>
        <div class="more-info">
          <h1>Jane Doe</h1>
          <div class="coords">
            <span>Group Name</span>
            <span>Joined January 2019</span>
          </div>
          <div class="coords">
            <span>Position/Role</span>
            <span>City, Country</span>
          </div>
        </div>
      </div>
      <div class="general">
        <h1>Jane Doe</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
          volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut
          pulvinar.
        </p>
        <span class="more">Mouse over the card for more info</span>
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
    text1: '项目一主标题一',
    text2: '左侧副标题一',
    text3: '右侧标题上',
    text4: '右侧默认显示内容上',
    text5: "右侧默认显示内容落款",
    text6: "右侧标题下",
    text7: "1、右侧内容下我是乱七八糟写的，不要当真1",
    text8: "2、右侧内容下我是乱七八糟写的，不要当真2",
    id: "2",
  },
  {
    text1: '项目二',
    text2: '副标题',
    text3: '右侧标题',
    text4: '',
    text5: "测试数据1",
    text6: "测试数据1",
    text7: "测试数据1",
    text8: "测试数据1",
    text9: "测试数据1",
    text10: "测试数据1",
    id: "4",
  },
  {
    text1: '项目三',
    text2: '副标题',
    text3: '右侧标题',
    text4: '',
    text5: "测试数据1",
    text6: "测试数据1",
    text7: "测试数据1",
    text8: "测试数据1",
    text9: "测试数据1",
    text10: "测试数据1",
    id: "6",
  },
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
  font-size: 0.5rem;
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
  font-size: 0.9em;
}
</style>
