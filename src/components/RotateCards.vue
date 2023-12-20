<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-30 15:26:03
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-19 17:35:00
 * @FilePath: \newbee-mall-vue3-app\src\components\Qrcode.vue
 * @Description: 旋转卡片组件
-->
<template>
  <div class="tariffCards">
    <div class="economy">
      <img :src="currentItemDetail?.imgUrl1 || imgUrl1" alt="Economy" height="74" />
      <h3>{{ currentItemDetail?.title1 || '暂无数据' }}</h3>
      <span>{{ currentItemDetail?.desc1 || '暂无数据' }}</span>
    </div>
    <div class="premiumeconomy">
      <img :src="currentItemDetail?.imgUrl2 || imgUrl1" alt="Premium Economy" height="74" />
      <h3>{{ currentItemDetail?.title2 || '暂无数据' }}</h3>
      <span>{{ currentItemDetail?.desc2 || '暂无数据' }}</span>
    </div>
    <div class="business">
      <img :src="currentItemDetail?.imgUrl3 || imgUrl1" alt="Business" height="74" />
      <h3>{{ currentItemDetail?.title3 || '暂无数据' }}</h3>
      <span>{{ currentItemDetail?.desc3 || '暂无数据' }}</span>
    </div>
    <div class="first">
      <img :src="currentItemDetail?.imgUrl4 || imgUrl1" alt="First" height="74" />
      <h3>{{ currentItemDetail?.title4 || '暂无数据' }}</h3>
      <span>{{ currentItemDetail?.desc4 || '暂无数据' }}</span>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import imgUrl1 from "./images/tarcs.png";
const props = defineProps({
  itemId: String,
});

// 不同项目信息
const itemCards = [
  {
    imgUrl1: imgUrl1,
    imgUrl2: imgUrl1,
    imgUrl3: imgUrl1,
    imgUrl4: imgUrl1,
    title1: "测试数据1",
    title2: "测试数据1",
    title3: "测试数据1",
    title4: "测试数据1",
    desc1: "测试数据1",
    desc2: "测试数据1",
    desc3: "测试数据1",
    desc4: "测试数据1",
    id: "2",
  },
  {
    imgUrl1: imgUrl1,
    imgUrl2: imgUrl1,
    imgUrl3: imgUrl1,
    imgUrl4: imgUrl1,
    title1: "测试数据2",
    title2: "测试数据2",
    title3: "测试数据2",
    title4: "测试数据2",
    desc1: "测试数据2",
    desc2: "测试数据2",
    desc3: "测试数据2",
    desc4: "测试数据2",
    id: "4",
  },
  {
    imgUrl1: imgUrl1,
    imgUrl2: imgUrl1,
    imgUrl3: imgUrl1,
    imgUrl4: imgUrl1,
    title1: "测试数据3",
    title2: "测试数据3",
    title3: "测试数据3",
    title4: "测试数据3",
    desc1: "测试数据3",
    desc2: "测试数据3",
    desc3: "测试数据3",
    desc4: "测试数据3",
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
<style scoped>
.tariffCards {
  /* position: absolute;
        top: 50%;
        left: 50%; */
  /* margin: -180px 0 0 -140px; */
  margin-top: 10%;
  user-select: none;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
}

.tariffCards:after {
  position: absolute;
  bottom: -27px;
  left: 5%;
  content: "";
  width: 65%;
  height: 10px;
  border-radius: 100%;
  background-image: radial-gradient(
    rgba(34, 50, 84, 0.04),
    rgba(34, 50, 84, 0)
  );
}

.tariffCards > div {
  position: relative;
  width: 250px;
  height: 120px;
  border-radius: 12px;
  color: white;
  transform: rotateX(45deg) rotateY(-15deg) rotate(45deg);
  transition: all 0.4s ease;
  overflow: hidden;
  cursor: pointer;
}

.tariffCards > div:after {
  position: absolute;
  top: -70px;
  left: 0;
  content: "";
  width: 200%;
  height: 200%;
  background-image: linear-gradient(
    60deg,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0) 80%
  );
  transform: translateX(-100%);
}

.tariffCards > div img {
  margin-top: 15px;
  pointer-events: none;
}

.tariffCards > div h3 {
  position: absolute;
  bottom: 28px;
  left: 15px;
  font-size: 18px;
  font-weight: 800;
}

.tariffCards > div span {
  position: absolute;
  font-weight: 700;
  bottom: 15px;
  left: 15px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
}

.tariffCards > div.economy {
  margin-top: 0;
  z-index: 3;
  background-color: #8063e1;
  background-image: linear-gradient(135deg, #bd7be8, #8063e1);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0px 1px #8063e1;
}

.tariffCards > div.premiumeconomy {
  margin-top: -70px;
  z-index: 2;
  background-color: #3f58e3;
  background-image: linear-gradient(135deg, #7f94fc, #3f58e3);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0px 1px #3f58e3;
}

.tariffCards > div.business {
  margin-top: -70px;
  z-index: 1;
  background-color: #2c6fd1;
  background-image: linear-gradient(135deg, #21bbfe, #2c6fd1);
  box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0px 1px #2c6fd1;
}

.tariffCards > div.first {
  margin-top: -70px;
  background-color: #352f64;
  background-image: linear-gradient(135deg, #415197, #352f64);
  box-shadow: 5px 5px 60px rgba(34, 50, 84, 0.1), 1px 1px 0px 1px #352f64;
}

.tariffCards > div:hover {
  transform: rotateX(34deg) rotateY(-15deg) rotate(10deg) scale(1.6)
    translate(-25px, 50px);
}

.tariffCards > div:hover:after {
  transform: translateX(100%);
  transition: all 1.2s ease-in-out;
}

a {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #0077ff;
  font-size: 14px;
  font-weight: 700;
}
</style>
