<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-17 15:18:47
 * @FilePath: \year-report\src\views\User.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="user-box">
    <s-header :name="'我的收获'"></s-header>
    <van-skeleton title :avatar="true" :row="3" :loading="state.loading">
      <div class="user-info">
        <div class="info">
          <img src="@/assets/fighting.gif" />
          <div class="user-desc">
            <span>昵称：{{ state.user.nickName }}</span>
            <span>登录名：{{ state.user.loginName }}</span>
            <span class="name">个性签名：{{ state.user.introduceSign }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
    <nav-bar></nav-bar>
    <div v-show="isClearing" class="harvest"></div>
    <van-empty v-show="!isClearing" image="error" description="暂无收获数据" />
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick, ref } from "vue";
import navBar from "@/components/NavBar.vue";
import sHeader from "@/components/SimpleHeader.vue";
// import { useRoute } from 'vue-router'
import { useCartStore } from "@/stores/cart";
// const route = useRoute()
const cart = useCartStore();
const state = reactive({
  user: {},
  loading: true,
});
// 是否已结算标识
const isClearing = ref(cart.isDone);
onMounted(async () => {
  state.user = {
    nickName: "爱吃肉的米菲兔",
    loginName: "李一",
    introduceSign: "一天风露，杏花如雪",
  };
  state.loading = false;
  nextTick(() => {
    init();
  });
});

let zindex = 1;
// 创建一个便签
function creatWish(words) {
  let container = document.querySelector(".harvest");
  let div = document.createElement("div");
  // 设置文字
  div.innerHTML = words;
  div.className = "item";

  // 点击事件，让下层的盒子成为第一层的盒子
  div.onclick = function () {
    div.style.zIndex = zindex;
    zindex++;
  };
  // 关闭按钮
  let span = document.createElement("span");
  span.className = "close";
  span.innerHTML = "X";
  div.appendChild(span);

  // 颜色随机
  div.style.background = `rgb(${getRandom(150, 256)},${getRandom(
    150,
    256
  )},${getRandom(150, 256)})`;
  // 位置随机
  let max_X = container.offsetWidth - 144;
  let max_Y = container.offsetHeight - 144;
  div.style.left = `${getRandom(0, max_X)}px`;
  div.style.top = `${getRandom(0, max_Y)}px`;
  // 关闭事件
  span.onclick = function () {
    container.removeChild(div);
  };
  container.appendChild(div);
}
//产生随机数
function getRandom(min, max) {
  let dec = max - min;
  return Math.floor(Math.random() * dec + min);
}
// 生成默认便签内容
function init() {
  let wishes = [
    "组织参与前端技术培训",
    "vue3+ts研发项目开发",
    "开始阅读js红宝书",
    "爸爸的花儿落了， 我也不再是小孩子",
    "lib-flexible移动端适配方案",
    "两三星火是瓜州",
    "一双鬼手，只为沉冤得雪;满怀佛心，唯愿天下太平",
    "移动端项目搭建与开发",
    "hive数据库适配",
    "后端数据加密处理",
    "后端权限拦截与处理",
    "你看到云没有？那些都是天空的翅膀啊",
    "四周是花香，是蜂鸣，春风拂面，是沾衣不染的海棠花雨。",
  ];
  for (let i = 0; i < wishes.length; i++) {
    let wish = wishes[i];
    creatWish(wish);
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 98%;
    margin: 10px;
    height: 130px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      gap: 20px;
      .boxSizing();
      img {
        .wh(100px, 100px);
        border-radius: 50%;
        margin-top: -6px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}

.harvest {
  .wh(100%, 300px);
  position: relative;
}
</style>
<style lang="less">
@import "../common/style/mixin";
.item {
  .wh(100px, 100px);
  padding: 20px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  background: red;
  border-radius: 5px;
  border-bottom-right-radius: 70px 20px;
  /* 盒子阴影 */
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  font-size: 10px;
  left: 100px;
  top: 80px;
  /* 在文字处换行 */
  word-wrap: break-word;
  overflow: hidden;
}

.item .close {
  position: absolute;
  right: 5px;
  top: 2px;
  font-size: 8px;
  cursor: pointer;
}
</style>
