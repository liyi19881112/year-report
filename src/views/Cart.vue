<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2023-12-26 11:21:51
 * @FilePath: \newbee-mall-vue3-app\src\views\Cart.vue
 * @Description: 结算单页面
-->

<template>
  <van-watermark
    v-if="state.list.length !== 0"
    :height="150"
    :width="150"
    opacity="0.5"
    content="李一"
  />
  <div class="out-div" v-if="state.list.length !== 0">
    <div class="cart-box">
      <div
        v-slide-in
        class="child"
        v-for="item in state.list"
        :key="item.id"
        @click="toDetail(item)"
      >
        <div class="title">{{ item.name }}</div>
        <gallery></gallery>
        <seal :itemId="item.id" :currentTime="item.currentTime"></seal>
      </div>
    </div>
  </div>
  <van-floating-bubble
    v-model:offset="offset"
    v-if="state.list.length !== 0"
    axis="xy"
    icon="cash-o"
    magnetic="x"
    @click="onChat"
  />
  <van-dialog
    v-model:show="dialogShow"
    title="时间就是金钱，所以我们只认时间"
    show-cancel-button
    theme="round-button"
    confirm-button-text="已完成结算"
    cancel-button-text="取消结算"
    :before-close="beforeClose"
  >
    <div class="settlementDialog" v-show="!toInput">
      <qrcode></qrcode>
      <p style="text-align: center">请使用微信扫码完成结算</p>
    </div>
    <div class="settlementDialog" v-show="toInput">
      <el-input v-model="inputValue" class="w-50 m-2" placeholder="请输入时间">
        <template #suffix>
          <p>天</p>
        </template>
      </el-input>
    </div>
    <!-- <van-switch v-model="toInput" /> -->
    <div style="width: 100%; display: flex; justify-content: center">
      <el-switch
        v-model="toInput"
        class="ml-2"
        inline-prompt
        size="large"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="输入模式"
        inactive-text="扫码模式"
      />
    </div>
  </van-dialog>
  <div class="dialog" v-show="payDialogShow">
    <success-dialog ref="successDialogRef"></success-dialog>
  </div>
  <van-empty
    v-if="state.list.length === 0"
    image="error"
    description="暂无结算单数据"
  />
  <nav-bar></nav-bar>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { showLoadingToast, closeToast, showFailToast } from "vant";
import { useRouter } from "vue-router";
import qrcode from "@/components/Qrcode.vue";
import navBar from "@/components/NavBar.vue";
import seal from '@/components/Seal.vue'
import gallery from '@/components/Gallery.vue'
import successDialog from "@/components/SuccessDialog.vue";

const router = useRouter();
const cart = useCartStore();
const dialogShow = ref(false); // 支付弹窗显示标识
const payDialogShow = ref(false); // 支付成功弹窗显示标识
const toInput = ref(false); // 是否显示输入框
const inputValue = ref(""); // 输入框绑定值
const offset = ref({ x: 0, y: 100 }); // 气泡默认位置
// 获取子组件实例
const successDialogRef = ref(null);

// 已完成的项目列表
const state = reactive({
  list: [],
});

// 从pinia中获取已完成项目
state.list = cart.cartDetail;

onMounted(() => {
  init();
  // nextTick(() => {
  //   // 获取所有子div元素
  //   var childElements = document.querySelectorAll('.child');

  //   // 为每个子div设置随机背景颜色
  //   childElements.forEach(function(element) {
  //     var randomColor = getRandomColor();
  //     element.style.backgroundColor = randomColor;
  //   });
  // })
});

const init = async () => {
  showLoadingToast({ message: "加载中...", forbidClick: true });
  closeToast();
};
// 生成随机颜色
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 气泡点击弹出支付页面
const onChat = () => {
  dialogShow.value = true;
};

// 弹窗关闭事件回调
const beforeClose = (action) => {
  if (action === "confirm") {
    if (!inputValue.value || inputValue.value < 200) {
      showFailToast({
        message: "支付时间不足！",
        className: "failToast",
      });
      return false;
    } else {
      // 清空结算单数据
      cart.count = 0;
      cart.cartDetail = [];
      // 赋值完成标识
      cart.isDone = true;
      // 显示弹窗,5秒钟后自动跳转支付成功页面
      payDialogShow.value = true;
      successDialogRef.value.countDown();
      return true;
    }
  } else {
    return true;
  }
};

const toDetail = (item) => {
  router.push({ path: `/product/${item.percentage}/${item.id}` });
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.out-div {
  width: 100%;
  height: 89%;
  // background-color: rgb(209, 240, 230);
  overflow-y: auto;
}
.cart-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  .child {
    height: 260px;
    width: 50%;
    cursor: pointer;
    background-color: #fff;
    margin: 3em auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    .title {
      width: 100%;
      height: 50px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      line-height: 50px;
    }
  }
}
.settlementDialog {
  display: flex;
  flex-direction: column;
  margin: 10px;
  justify-content: center;
}
.failToast {
  width: 100px;
}
.payDialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    padding: 15px;
    text-align: center;
    height: 100px;
    &:nth-child(1) {
      font-size: 40px;
    }
    &:nth-child(2) {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: inline-block;
        margin: 0 5px;
        background-color: red;
        color: #fff;
      }
    }
  }
}
.dialog {
  .wh(100%, 100%);
  z-index: 2000;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
}
</style>
