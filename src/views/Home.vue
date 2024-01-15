<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-15 15:31:54
 * @FilePath: \year-report\src\views\Home.vue
 * @Description: 首页
-->

<template>
  <div>
    <header class="home-header wrap" :class="{ active: state.headerScroll }">
      <img v-show="!state.headerScroll" class="logo" :src="neusoft" alt="" >
      <p v-show="state.headerScroll">东软--产品规划发展部</p>
      <div class="header-search">
        <span class="app-name">李一年度成果展示</span>
        <i class="iconfont icon-search"></i>
        <router-link class="search-title" to="./product-list?from=home"
          >一去尘埃任几载，江湖此处更论年。
        </router-link>
      </div>
      <router-link class="login" to="./login" v-if="!state.isLogin"
        >登录</router-link
      >
      <router-link class="login" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <van-barrage
      ref="barrage"
      v-model="barrageList"
      :delay="300"
      :duration="10000"
      rows="8"
      class="barrage"
    ></van-barrage>
    <swiper :list="state.swiperList"></swiper>
    <div class="category-list">
      <div
        v-for="item in state.categoryList"
        v-bind:key="item.categoryId"
        @click="tips"
      >
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">轮回有道红尘过--今年进度列表</header>
      <van-skeleton title :row="3" :loading="state.loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="(item, index) in state.newGoodses"
            :key="index"
          >
            <img :src="item.goodsCoverImg" alt="" @click="goToDetail(item)" />
            <div class="good-desc">
              <div class="title">{{ item.goodsName }}</div>
            </div>
            <van-progress
              :pivot-text="`完成${item.percentage}%`"
              :color="isColor(item.percentage)"
              :percentage="item.percentage"
            />
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="good undo">
      <header class="good-header">不负今生不负卿--来年目标规划</header>
      <div class="undo-title-box">
        <div class="undo-title">势在必行</div>
        <div class="undo-title">锦上添花</div>
      </div>
      <div class="draggable">
        <VueDraggable
          :animation="150"
          ghostClass="ghost"
          group="untodo"
          v-model="todoList1"
        >
          <div v-for="item in todoList1" :key="item.id" class="cursor-move">
            <div class="title">{{ item.name }}</div>
            <ul>
              <li v-for="(detail,index) in item.value" :key="index">{{ detail }}</li>
            </ul>
          </div>
        </VueDraggable>
        <VueDraggable
          :animation="150"
          ghostClass="ghost"
          group="untodo"
          v-model="todoList2"
        >
          <div v-for="item in todoList2" :key="item.id" class="cursor-move">
            <div class="title">{{ item.name }}</div>
            <ul>
              <li v-for="(detail,index) in item.value" :key="index">{{ detail }}</li>
            </ul>
          </div>
        </VueDraggable>
      </div>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, inject } from "vue";
import { useRouter } from "vue-router";
import swiper from "@/components/Swiper.vue";
import navBar from "@/components/NavBar.vue";
import { VueDraggable } from "vue-draggable-plus";
import { showLoadingToast, closeToast, showToast } from "vant";
import neusoft from '@/assets/neusoft.png'

const router = useRouter();
// APP里定义的重刷新事件，暂未使用
const reload = inject("reload");
// 弹幕数据
const list = [
  { id: 1, text: "轻量" },
  { id: 2, text: "可定制的" },
  { id: 3, text: "移动端" },
  { id: 4, text: "Vue" },
  { id: 5, text: "前端培训" },
  { id: 6, text: "VantUI" },
  { id: 7, text: "666" },
];

// 拖拽表格遇到的坑，因为id作为for循环key，所以两个表格的id不能重复，否则拖拽的时候，会莫名消失
// 待完成拖拽项目1
const todoList1 = ref([
  {
    name: "完善技术栈",
    value: ['夯实js基础','前端设计模式','Web Components','Promise原理','web3D可视化技术'],
    id: "1",
  },
  {
    name: "框架升级",
    value: ['组件平台化管理','集成权限控制','实用功能补全'],
    id: "2",
  },
  {
    name: "Johanna",
    value: ['','','',''],
    id: "3",
  },
  {
    name: "Juan",
    value: ['','','',''],
    id: "4",
  },
]);
// 待完成拖拽项目2
const todoList2 = ref([
  {
    name: "技术探索",
    value: ['Uniapp微信小程序', 'Tree sharking等性能优化'],
    id: "1-2",
  },
  {
    name: "明天",
    value: [],
    id: "2-2",
  },
  {
    name: "阅读",
    value: [],
    id: "3-2",
  },
  {
    name: "诗词",
    value: [],
    id: "4-2",
  },
]);

// 弹幕数据
const barrageList = ref([...list]);
const state = reactive({
  swiperList: [], // 轮播图列表
  isLogin: false, // 是否已登录
  headerScroll: false, // 滚动透明判断
  newGoodses: [],
  recommends: [],
  categoryList: [
    {
      name: "",
      imgUrl: new URL("@/assets/text-image3.png", import.meta.url),
      categoryId: 100001,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image4.png", import.meta.url),
      categoryId: 100003,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image5.png", import.meta.url),
      categoryId: 100002,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image6.png", import.meta.url),
      categoryId: 100004,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image7.png", import.meta.url),
      categoryId: 100005,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image8.png", import.meta.url),
      categoryId: 100006,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image9.png", import.meta.url),
      categoryId: 100007,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image10.png", import.meta.url),
      categoryId: 100008,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image1.png", import.meta.url),
      categoryId: 100009,
    },
    {
      name: "",
      imgUrl: new URL("@/assets/text-image2.png", import.meta.url),
      categoryId: 100010,
    },
  ],
  loading: true,
});
// 根据进度不同赋值不同颜色
const isColor = (color) => {
  if (color > 80) {
    return "#5BC89C";
  } else if (color <= 80 && color > 30) {
    return "#f2826a";
  } else {
    return "#ee0a24";
  }
};
onMounted(async () => {
  const token = true;
  if (token) {
    state.isLogin = true;
  }
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  });
  // 轮播图数据
  state.swiperList = [
    {
      carouselUrl: new URL("@/assets/swiper1.png", import.meta.url),
      redirectUrl: "http://10.100.133.11:31805/index",
    },
    {
      carouselUrl: new URL("@/assets/swiper2.png", import.meta.url),
      redirectUrl: "http://192.168.174.28:18019/monitor/#/indexPage",
    },
    {
      carouselUrl: new URL("@/assets/swiper3.png", import.meta.url),
      redirectUrl: "",
    },
  ];
  // 赋值今年完成进度列表
  state.newGoodses = [
    {
      goodsCoverImg: new URL("@/assets/done1.svg", import.meta.url),
      goodsName: "项目研发",
      percentage: "100",
      id: 1,
    },
    {
      goodsCoverImg: new URL("@/assets/done2.svg", import.meta.url),
      goodsName: "漏洞修复",
      percentage: "100",
      id: 2,
    },
    {
      goodsCoverImg: new URL("@/assets/done3.svg", import.meta.url),
      goodsName: "前端培训",
      percentage: "100",
      id: 3,
    },
    {
      goodsCoverImg: new URL("@/assets/done4.svg", import.meta.url),
      goodsName: "诗词创作",
      percentage: "100",
      id: 4,
    },
    {
      goodsCoverImg: new URL("@/assets/done5.svg", import.meta.url),
      goodsName: "兴趣阅读",
      percentage: "100",
      id: 5,
    },
    {
      goodsCoverImg: new URL("@/assets/done6.svg", import.meta.url),
      goodsName: "自我成长",
      percentage: "20",
      id: 6,
    },
  ];
  // 延时设置弹幕数据，保证能逐步错开显示
  setInterval(() => {
    // list.forEach((item)=>{
    //   barrageList.value.push({
    //     id: Math.random(),
    //     text: item.text
    //   })
    // })
    barrageList.value.push({
      id: Math.random(),
      text: list[0].text,
    });
    barrageList.value.push({
      id: Math.random(),
      text: list[1].text,
    });
    barrageList.value.push({
      id: Math.random(),
      text: list[2].text,
    });
    barrageList.value.push({
      id: Math.random(),
      text: list[3].text,
    });
    setTimeout(() => {
      barrageList.value.push({
        id: Math.random(),
        text: list[4].text,
      });
    }, 1000);
    setTimeout(() => {
      barrageList.value.push({
        id: Math.random(),
        text: list[5].text,
      });
    }, 1000);
    setTimeout(() => {
      barrageList.value.push({
        id: Math.random(),
        text: list[6].text,
      });
    }, 1000);
  }, 8000);
  state.loading = false;
  closeToast();
});

nextTick(() => {
  // 监听滚动条，动态设置头部组件背景样式
  document.body.addEventListener("scroll", () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    scrollTop > 600
      ? (state.headerScroll = true)
      : (state.headerScroll = false);
  });
});

const goToDetail = (item) => {
  router.push({ path: `/product/${item.percentage}/${item.id}` });
};

const tips = () => {
  showToast("敬请期待");
};

</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;
  .nbmenu2 {
    color: @primary;
  }
  &.active {
    background: @primary;
    .nbmenu2 {
      color: #fff;
    }
    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    width: 74%;
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }
    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }
    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }
  .login {
    color: @primary;
    line-height: 52px;
    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(36px, 36px);
      margin: 13px auto 8px auto;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 200px;
        height: 120px;
        margin: 0 auto;
        cursor: pointer;
        &:hover {
          animation: scaleAnimation 2s infinite ease-in-out;
        }
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 0 0 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
.floor-list {
  width: 100%;
  padding-bottom: 50px;
  .floor-head {
    width: 100%;
    height: 40px;
    background: #f6f6f6;
  }
  .floor-content {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    .boxSizing();
    .floor-category {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      .boxSizing();
      &:nth-child(2n) {
        border-right: none;
      }
      p {
        font-size: 17px;
        color: #333;
        &:nth-child(2) {
          padding: 5px 0;
          font-size: 13px;
          color: @primary;
        }
      }
      .floor-products {
        .fj();
        width: 100%;
        img {
          .wh(65px, 65px);
        }
      }
    }
  }
}

@keyframes scaleAnimation {
  // 动画设置
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.08);
  }
}

.barrage {
  width: 100%;
  height: 500px;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  top: 5%;
  --van-barrage-font-size: 38px; // 弹幕字号
  --van-barrage-color: rgb(246, 194, 8, 0.5); // 弹幕字体颜色
}
.undo {
  height: 600px;
}
.cursor-move {
  height: 50px;
  width: 300px;
  // background-color: #c8ebfb;
  margin: 5px;
  overflow: hidden;
  transition: all 1s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  &:hover {
    // color: #f45e61;
    height: 200px;
  }
  .title {
    height: 40px;
    line-height: 30px;
    font-size: 15px;
    font-style: oblique;
    text-align: center;
    margin: 0px;
    padding: 0px;
  }
  ul {
    height: 100px;
    li {
      height: 30px;
      width: 60%;
      margin-left: 20%;
      text-align: left;
      font-size: 12px;
      list-style-type: circle;
    }
  }

  // Set up base styles, we're going to scale instead of animating width/height
  &::before,
  &::after {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: center; // Ensure scaling is done from the center (expands outwards)
  }

  // scale3d(<scale-horizontal>, <scale-vertical>, <scale-depth>);
  &::before {
    border-top: 2px solid rgb(240, 116, 54);
    border-bottom: 2px solid rgb(240, 116, 54);
    transform: scale3d(0, 1, 1); // Shrink only width
  }

  &::after {
    border-left: 2px solid rgb(240, 116, 54);
    border-right: 2px solid rgb(240, 116, 54);
    transform: scale3d(1, 0, 1); // Shrink only height
  }

  &:hover::before,
  &:hover::after {
    transform: scale3d(1, 1, 1); // Show full-size
    transition: transform 1.5s;
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.draggable {
  display: flex;
  width: 100%;
  justify-content: center;
  div > div {
    border: 0;
    box-sizing: border-box;
    margin: 1em;
    padding: 1em 2em;

    // Using inset box-shadow instead of border for sizing simplicity
    font-size: inherit;
    font-weight: 700;

    // Required, since we're setting absolute on pseudo-elements
    position: relative;
    vertical-align: middle;

    &::before,
    &::after {
      box-sizing: inherit;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
.undo-title-box {
  display: flex;
  justify-content: center;
  gap: 100px;
  .undo-title {
    width: 150px;
    text-align: center;
    margin: 20px;
    color: #060606;
    line-height: 1.4em;
    letter-spacing: 0.15em;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0.9em 3.5em;
    border: 0.28em solid transparent;
    background: #fff;
    border-radius: 3.5em;
    position: relative;
    z-index: 1;
    overflow: hidden;

    &::before {
      content: "";
      border-radius: 3.5em;
      position: absolute;
      background: inherit;
      top: 0.4em;
      left: 0.4em;
      right: 0.4em;
      bottom: 0.4em;
      z-index: -1;
    }

    &::after {
      content: "";
      //border-radius: 3.5em;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -2;
      transform: rotate(0deg);
      animation: gradient 2s ease alternate infinite;
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }

    &:hover:after {
      -webkit-animation-play-state: running;
      animation-play-state: running;
    }

    &:nth-child(1) {
      &:after {
        background: rgb(51, 203, 235);
        background: -moz-linear-gradient(
          left,
          rgba(51, 203, 235, 1) 0%,
          rgba(40, 214, 98, 1) 30%,
          rgba(240, 119, 57, 1) 70%,
          rgba(227, 54, 107, 1) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(51, 203, 235, 1) 0%,
          rgba(40, 214, 98, 1) 30%,
          rgba(240, 119, 57, 1) 70%,
          rgba(227, 54, 107, 1) 100%
        );
        background: linear-gradient(
          to right,
          rgba(51, 203, 235, 1) 0%,
          rgba(40, 214, 98, 1) 30%,
          rgba(240, 119, 57, 1) 70%,
          rgba(227, 54, 107, 1) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cbeb', endColorstr='#e3366b',GradientType=1 );
        background-size: 300% 300%;
      }
    }

    &:nth-child(2) {
      &:after {
        background: rgb(230, 54, 196);
        background: -moz-linear-gradient(
          left,
          rgba(230, 54, 196, 1) 0%,
          rgba(63, 206, 165, 1) 48%,
          rgba(80, 64, 139, 1) 96%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(230, 54, 196, 1) 0%,
          rgba(63, 206, 165, 1) 48%,
          rgba(80, 64, 139, 1) 96%
        );
        background: linear-gradient(
          to right,
          rgba(230, 54, 196, 1) 0%,
          rgba(63, 206, 165, 1) 48%,
          rgba(80, 64, 139, 1) 96%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e636c4', endColorstr='#50408b',GradientType=1 );
        background-size: 300% 300%;
      }
    }
  }
}

.logo {
  .wh(140px, 30px);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 95% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
