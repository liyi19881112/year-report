<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2023-12-20 14:19:05
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-13 10:13:26
 * @FilePath: \year-report-github\src\views\ItemDetail.vue
 * @Description: 详细内容展示
-->

<template>
  <div class="fixed-box" :style="fixedBoxStyleObject" v-show="isShowMenu" ref="fixedBoxRef">
    <span v-show="rightButton" @click="removeFixed">全屏显示</span>
    <div v-show="!rightButton" @click="goToDetail(1)">查看详情</div>
    <div v-show="!rightButton" @click="goToDetail(2)">组件平台</div>
  </div>
  <div class="product-detail">
    <s-header
      back="/home"
      :name="`${currentItemDetail.name}详情`"
    ></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-notice-bar
          left-icon="volume-o"
          :scrollable="true"
          speed="100"
          :text="noticeText"
        />
      </div>
      <div class="product-info">
        <div class="left" v-if="currentItemDetail.id != 4 && currentItemDetail.id != 6">
          <rollover-cards v-if="currentItemDetail.id === 1"></rollover-cards>
          <show-books v-else-if="currentItemDetail.id === 5"></show-books>
          <up-down-rotate v-else-if="currentItemDetail.id === 3"></up-down-rotate>
          <red-books :itemId="itemId" v-else-if="currentItemDetail.id === 2"></red-books>
        </div>
        <long-press v-if="currentItemDetail.id === 3"></long-press>
        <div class="product-intro" v-if="currentItemDetail.id != 1 && currentItemDetail.id != 5">
          <rotate-cards :itemId="itemId" v-if="currentItemDetail.id === 2" @click.right="showContextMenu($event)"></rotate-cards>
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
import longPress from "@/components/LongPress.vue"
import warning from "@/assets/warning.png";
import * as echarts from "echarts";
import { ElLoading, dayjs } from "element-plus";
import { showSuccessToast, showToast, showFailToast } from "vant";
import { setLocal, getLocal } from '@/common/js/utils'
import { getWeather, getHot } from '@/service/funApi'
const route = useRoute();
const router = useRouter();
const cart = useCartStore();
const dialogShow = ref(false);
const rightButton = ref(true)
const inputValue = ref("");
const fixedBoxStyleObject = ref({
  left: '100px',
  top: '100px'
});
const isShowMenu = ref(false)
const fixedBoxRef = ref(null);
// 滚动通知栏内容
const noticeText = ref("");
// const noticeText = ref(
//   '2024年1月25日 天气：晴 西南风 距离过年还有15天\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0食堂人今天又是很多，鸡腿饭吃腻了，啥时候食堂能有旋转火锅呢\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0国民党大选没有获胜，两岸统一之路越发艰辛了\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0上证跌破2800点，刷新2020年4月以来新低'
// );
// 获取到过年时间差
const diffDay = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\距离过年还有' + dayjs('2025-01-28').diff(dayjs(),'day') + '天\xa0\xa0\xa0\ '
noticeText.value += diffDay;
// 根据缓存来判断是否显示天气
if(!getLocal("weather")) {
  setTimeout(() => {
    noticeText.value += getLocal("weather")
  }, 2000)
} else {
  noticeText.value += getLocal("weather")
}
// 根据缓存来判断是否显示微博热搜
if(!getLocal("hot")) {
  setTimeout(() => {
    noticeText.value += getLocal("hot")
  }, 2000)
} else {
  noticeText.value += getLocal("hot")
}


// 获取天气预报信息
const getWeatherInfo = async () => {
  const { data: weatherInfo} = await getWeather()
  let locWeather = ''
  // 对天气预报数据进行处理
  if ( weatherInfo ) {
    const { province, city, temperature, weather, winddirection, windpower, humidity, reporttime } = weatherInfo.lives[0]
    locWeather = '天气情况为：' + reporttime + ' ' + province + '省 ' + city + ' ' + weather + ' ' + winddirection + '风 风力：' + windpower + ' 温度：' + temperature + ' 湿度：' + humidity + '\xa0\xa0\xa0\xa0\xa0\xa0\ '
  }
  setLocal('weather', locWeather)
  console.log('天气接口信息', weatherInfo)
}
// 获取微博热搜榜
const getWeiboHot = async () => {
  const { data: hotInfo } = await getHot()
  // const hotInfo = [
  //   { name: "理想MEGA发布多日未公布订单数" },
  //   { name: "一对夫妇做短剧每月进账4亿多" },
  //   { name: "Doinb老婆疑似被带走" },
  //   { name: "十四届全国人大二次会议今天闭幕" },
  //   { name: "张艺兴起诉芒果扒皮酱" },
  //   { name: "找到了亲妈却删了她的联系方式" },
  //   { name: "董明珠称一年拿几百万愿意多承担一点税" },
  //   { name: "奥斯卡" },
  //   { name: "新闻女王2官宣原班人马" },
  //   { name: "宁德时代暴涨超13%" },
  //   { name: "长安的荔枝今日官宣" },
  //   { name: "周处除三害 贪嗔痴" },
  //   { name: "余承东何小鹏留言支持李想" },
  //   { name: "轰20快将公布" },
  //   { name: "男子因社恐40岁才找到合适的工作" }
  // ]
  let locHot = ''
  console.log('微博热搜接口信息', hotInfo)
  // 对微博热搜数据进行处理
  if ( hotInfo ) {
    locHot = '当日微博热搜内容：' + hotInfo.result.list.map((item, index) => `${index + 1}、${item.hotword}`).join(' ');
  }
  setLocal('hot', locHot)
}
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
  { id: 1, name: "项目研发", percentage: '100' },
  { id: 2, name: "架构升级", percentage: '100' },
  { id: 3, name: "前端培训", percentage: '100' },
  { id: 4, name: "诗词创作", percentage: '100' },
  { id: 5, name: "兴趣阅读", percentage: '100' },
  { id: 6, name: "个人成长", percentage: '60' },
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
  // 先根据缓存判断是否已经请求天气预报信息，防止重复请求
  if (!getLocal("weather")) {
    // 没有缓存，请求数据
    getWeatherInfo();
  }
  // 先根据缓存判断是否已经请求微博热搜信息，防止重复请求
  if (!getLocal("hot")) {
    // 没有缓存，请求数据
    getWeiboHot();
  }
});

const goTo = () => {
  router.push({ path: "/cart" });
};

// 柱形图数据
const barData = ref({
  AxisData: ["2021年", "2022年", "2023年"],
  SeriesData: [[5.8, 5.3, 7.5],[5, 4, 7]],
});

// 柱形图echart配置
const barOptions = {
  grid: {
    top: "20%",
    left: "0%",
  },
  legend: {
    show: true,
  },
  yAxis: [
    {
      name: "万行",
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
    {
      name: "个",
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
      name: "代码量",
      yAxisIndex: 0,
      barGap: 2,
      label: {
        normal: {
            show: true,
            position: 'top',
            // formatter: (e) => {
            //    return e.value + '次';
            // },
            fontSize: 14,
            color: '#000',
            // offset: [0, -5],
         },
      },
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
    {
      name: "主要参与项目数",
      yAxisIndex: 1,
      barGap: 2,
      label: {
         normal: {
            show: true,
            position: 'top',
            // formatter: (e) => {
            //    return e.value + '次';
            // },
            fontSize: 14,
            color: '#000',
            // offset: [0, -5],
         },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(102, 255, 51, 1)",
          }, // 柱图渐变色
          {
            offset: 1,
            color: "rgba(102, 255, 51, 0.08)",
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

// 监听鼠标右键点击事件
const showContextMenu = (e) => {
  e.preventDefault()
  fixedBoxStyleObject.value.left = e.clientX + 'px'
  fixedBoxStyleObject.value.top = e.clientY + 'px'
  isShowMenu.value = true
  setTimeout(() => {
      fixedBoxRef.value.focus()
  },1)
}

const removeFixed = () => {
  isShowMenu.value = false
  document.querySelector(".left").style.display = 'none';
  rightButton.value = false
}

const goToDetail = (id) => {
  isShowMenu.value = false
  // 跳转新窗口
  if (id === 1) window.open('https://naotu.baidu.com/file/788fc8af452a73b1465b33464ba274bf?token=db598ebde126d2c3')
  window.open('https://180.76.167.167:18091/example/#/examples')
}
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
      width: 100%;
      justify-content: center;
      // transition: width 1s;
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
.fixed-box{
  position: fixed;
  color: black;
  padding: 8px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  text-align: center;
  padding: 12px 4px;
  border-radius: 6px;
  border: 1px solid  rgba(222, 222, 222, 0.5);
  background-color:  #ffffff;
  font-size: 14px;
  cursor: pointer;
  z-index: 999;
}
</style>
