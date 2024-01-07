<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2023-12-20 14:19:05
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2023-12-27 16:19:36
 * @FilePath: \year-report-github\src\views\ItemDetail.vue
 * @Description: 详细内容展示
-->


<template>
  <div class="product-detail">
    <s-header
      back="/home"
      :name="`${currentItemDetail.name}项目详情`"
    ></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-notice-bar
          left-icon="volume-o"
          :scrollable="true"
          :text="noticeText"
        />
      </div>
      <div class="product-info">
        <div class="left">
          <rollover-cards v-if="currentItemDetail.id === 1"></rollover-cards>
          <show-books v-else-if="currentItemDetail.id === 5"></show-books>
          <up-down-rotate v-else-if="currentItemDetail.id === 3"></up-down-rotate>
          <red-books :itemId="itemId" v-else></red-books>
        </div>
        <div class="product-intro" v-if="currentItemDetail.id != 1 && currentItemDetail.id != 5">
          <rotate-cards :itemId="itemId" v-if="currentItemDetail.id === 2"></rotate-cards>
          <hover-filter v-if="currentItemDetail.id === 4"></hover-filter>
          <three-hover-cards v-if="currentItemDetail.id === 6"></three-hover-cards>
          <scroll-ball v-if="currentItemDetail.id === 3"></scroll-ball>
        </div>
      </div>
    </div>
    <div class="detail-content-filter" @click="() => (dialogShow = true)"></div>
    <van-action-bar v-if="isDone">
      <!-- <van-action-bar-icon icon="chat-o" text="客服" /> -->
      <van-action-bar-icon
        icon="point-gift-o"
        :badge="!cart.count ? '' : cart.count"
        @click="goTo()"
        text="结算单"
      />
      <van-action-bar-button
        color="linear-gradient(to right, #ffd01e, #ff8917)"
        type="warning"
        @click="handleAddCart"
        text="加入结算单"
      />
      <van-action-bar-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        type="danger"
        @click="handleRemoveCart"
        text="移除结算单"
      />
    </van-action-bar>
    <van-floating-panel v-else v-model:height="floatHeight" :anchors="anchors">
      <div style="text-align: center; padding: 0 15px">
        <p style="font-weight: bold;" v-show="floatHeight == 80">上拉显示图表分析</p>
        <bar-chart
          id="bar-chart-social"
          style="width: 100%; height: 200px"
          :incomeData="barData"
          :options="barOptions"
        ></bar-chart>
        <half-pie style="width: 100%; height: 300px"></half-pie>
        <sankey-chart style="width: 100%; height: 300px"></sankey-chart>
      </div>
    </van-floating-panel>
    <van-dialog
      v-model:show="dialogShow"
      title="二次密码确认"
      show-cancel-button
      theme="round-button"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="removeFilter"
    >
      <div style="margin: 10px">
        <el-input
          type="password"
          v-model="inputValue"
          class="w-50 m-2"
          placeholder="请输入密码"
          show-password
        >
        </el-input>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import sHeader from "@/components/SimpleHeader.vue";
import rotateCards from "@/components/RotateCards.vue";
import redBooks from '@/components/RedBooks.vue'
import rolloverCards from "@/components/RolloverCards.vue";
import barChart from "@/components/bar-chart.vue";
import showBooks from "@/components/ShowBooks.vue";
import hoverFilter from "@/components/HoverFilter.vue";
import halfPie from "@/components/half-pie-chart.vue";
import threeHoverCards from "@/components/ThreeHoverCards.vue";
import scrollBall from "@/components/ScrollBall.vue"
import upDownRotate from "@/components/UpDownRotate.vue"
import sankeyChart from "@/components/SankeyChart.vue"
import warning from "@/assets/warning.png";
import * as echarts from "echarts";
import { ElLoading, dayjs } from "element-plus";
import { showSuccessToast, showToast, showFailToast } from "vant";
const route = useRoute();
const router = useRouter();
const cart = useCartStore();
const dialogShow = ref(false);
const inputValue = ref("");
// 滚动通知栏内容
const noticeText = ref(
  "今天天气晴好\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0明天也是好日子\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0欢迎大家来"
);
// 增加加载loading
const loadingInstance = ElLoading.service({
  target: document.querySelector(".product-detail"),
  text: "努力加载中...",
});
// 2秒后关闭
setTimeout(() => {
  loadingInstance.close();
}, 2000);

// 根据是否完成工作来显示不同内容判断用flag
const isDone = ref(true);
// 浮动面板锚点位置
const anchors = [
  80,
  Math.round(0.5 * window.innerHeight),
  Math.round(0.8 * window.innerHeight),
];
// 所有需要展示的今年项目明细
const totalItemDetail = [
  { id: 1, name: "项目1", percentage: '100' },
  { id: 2, name: "项目2", percentage: '100' },
  { id: 3, name: "项目3", percentage: '100' },
  { id: 4, name: "项目4", percentage: '100' },
  { id: 5, name: "项目5", percentage: '100' },
  { id: 6, name: "项目6", percentage: '20' },
];
// 当前需要展示的项目明细
const currentItemDetail = ref({});
// 获取传递过来的完成率和项目id参数
const percentage = ref(route.params.percentage);
const itemId = ref(route.params.id);
// 根据项目id获取对应的项目明细
currentItemDetail.value = totalItemDetail.find(
  (item) => item.id == itemId.value
);
// 根据进度判断，显示不同的内容
isDone.value = percentage.value == "100" ? true : false;
const floatHeight = ref(anchors[0]);

nextTick(() => {
  // 一些和DOM有关的东西
  const content = document.querySelector(".detail-content");
  content.scrollTop = 0;
  // 判断，经过二次认证，则初始化去除蒙版
  if (cart.doubleConfirm) {
    document.querySelector(".detail-content-filter").style.display = 'none';
    loadingInstance.close()
  }
});

const goTo = () => {
  router.push({ path: "/cart" });
};

// 养老待遇享受情况数据
const barData = ref({
  AxisData: ["202301", "202302", "202303"],
  SeriesData: [[33, 44, 555]],
});

// 养老待遇享受情况echart配置
const barOptions = {
  grid: {
    top: "5%",
    left: "0%",
  },
  legend: {
    show: false,
  },
  yAxis: [
    {
      name: "",
      nameTextStyle: {
        color: "rgba(0, 0, 0, 0.64)",
        fontFamily: "PingFang SC",
        fontSize: 12,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(231, 231, 231, 0.4)",
          type: "dashed",
          width: 1,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(255, 255, 255, 0.16)",
        },
      },
      axisLabel: {
        show: true,
        color: "rgba(0, 0, 0, 0.64)",
        fontFamily: "PingFang SC",
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "数量",
      yAxisIndex: 0,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(255, 158, 87, 1)",
          }, // 柱图渐变色
          {
            offset: 1,
            color: "rgba(255, 158, 87, 0.08)",
          }, // 柱图渐变色
        ]),
      },
    },
  ],
};

let timeout = ref(null);
// 加入防抖机制，立即执行版本
const handleAddCart = () => {
  // 判断定时器是否存在，存在的话进行清除，重新进行定时器计数
  if (timeout.value) clearTimeout(timeout.value);
  const flag = !timeout.value; //此处是取反操作
  timeout.value = setTimeout(() => {
    timeout.value = null;
  }, 1000);
  // 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
  if (flag) {
    if (!cart.isExist(currentItemDetail.value)) {
      // 赋值加入结算单时间戳
      currentItemDetail.value.currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
      cart.updateCart(currentItemDetail.value);
      showSuccessToast("添加成功");
    } else {
      showToast({
        message: "结算单已存在此项目！",
        icon: "cross",
        className: "warnToast",
      });
    }
  } else {
    showToast({
      message: "请不要重复点击！",
      icon: warning,
      className: "warnToast",
    });
  }
};
// 去除结算单中数据
const handleRemoveCart = () => {
  if (cart.isExist(currentItemDetail.value)) {
    cart.decreaseCart(currentItemDetail.value);
    showSuccessToast("移除成功");
  } else {
    showToast({
      message: "结算单已无此项目！",
      icon: "cross",
      className: "warnToast",
    });
  }
  // router.push({ path: '/cart' })
};
// 去除外层马赛克
const removeFilter = () => {
  if (inputValue.value === "2023") {
    cart.doubleConfirm = true;
    const container = document.querySelector(".detail-content-filter");
    container.style.width = 0;
  } else {
    showFailToast({
      message: "密码错误！",
      className: "failToast",
    });
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.product-detail {
  background-color: #eff2f5;
  height: 100%;
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    height: calc(100vh - 80px);
    overflow: hidden;
    overflow-y: auto;
    .detail-swipe-wrap {
      .notice-swipe {
        height: 40px;
        line-height: 40px;
      }
    }
    .product-info {
      padding: 10px;
      display: flex;
      justify-content: space-around;
      height: 90%;
      .left {
        height: 100%;
        width: 100%;
        overflow-y: auto;
      }
    }
    .product-intro {
      display: flex;
      width: 50%;
      // align-items: center;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }

  .detail-content-filter {
    height: 100%;
    width: (100% + 2px);
    margin-left: -2px;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(8px);
    overflow: hidden;
    overflow-y: auto;
    cursor: pointer;
    z-index: 9;
    border-right: 2px solid rgb(233, 18, 18);
    transition: width 2.5s ease-in-out;
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
.warnToast {
  width: 150px;
}
</style>
