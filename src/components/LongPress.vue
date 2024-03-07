<!--
 * @Author: 李一 375987927@qq.com
 * @Date: 2024-01-19 09:24:44
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-06 17:20:33
 * @FilePath: \year-report-github\src\components\LongPress.vue
 * @Description: 长按弹出组件
-->
<template>
  <div class="container">
    <nut-progress
      v-show="counter < 100"
      :percentage="counter"
      stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
      status="active"
    />
    <nut-animate type="twinkle" v-show="counter < 100" loop>
      <el-button ref="longPress" v-show="counter < 100" color="#626aef"
        >长按打开惊喜</el-button
      >
    </nut-animate>
    <nut-popup
      position="right"
      z-index="99000"
      :style="{ width: '750px', height: '100%', padding: '15px' }"
      v-model:visible="showRight"
    >
    <p style="width: 100%;text-align: center;font-size: 40px;">培训大礼包</p>
    <h1>1、培训流程</h1>
    <img style="width: 100%;height: 600px;" :src="px1"/>
    <h1>2、培训提升</h1>
    <img style="width: 100%;height: 600px;" :src="px2"/>
    <h1>3、培训成果物</h1>
    <el-descriptions
    class="margin-top"
    :column="2"
    size="default"
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          前期准备
        </div>
      </template>
      <el-tag size="small"><a href="https://neusoft.feishu.cn/docx/QowidyPnWogx3gxoPE8cqAMyn3e">开发准备工作</a></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          技术培训
        </div>
      </template>
      <el-tag size="small"><a href="https://neusoft.feishu.cn/mindnotes/FLjPbtdOPm57bYngprKctD8nnmd">前端知识图谱</a></el-tag><br>
      <el-tag type="success" size="small"><a href="https://neusoft.feishu.cn/file/OexsbR3ZHo8VJOxgJOFcA300nHf">前端培训PPT</a></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          自学提升
        </div>
      </template>
      <el-tag size="small"><a href="https://neusoft.feishu.cn/sheets/Up4ssR2EBhhnJptAg8ycgA1Tnfb">前端自学计划表</a></el-tag><br>
      <el-tag type="warning" size="small"><a href="https://neusoft.feishu.cn/docx/X7NwdQZamosCAnxZyDZciOZDnjx">前端基础自学资料</a></el-tag><br>
      <el-tag type="danger" size="small"><a href="https://neusoft.feishu.cn/docx/doxcnKppPi12fbHvEn5NZOFBRth">vue3基础知识文档</a></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          demo练习
        </div>
      </template>
      <el-tag size="small"><a href="https://neusoft.feishu.cn/docx/HXCxdRlr7o7IqNxvt3DcMbCdnlc">代码规范文档</a></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          考核沟通
        </div>
      </template>
      <el-tag size="small"><a href="https://neusoft.feishu.cn/base/D7kabBfOiaoEAbsJWzWcfqE4nzd?table=tbljeeIpq88ROaOv&view=vewQYjNser">培训考核表</a></el-tag>
    </el-descriptions-item>
  </el-descriptions>
  </nut-popup>
    <nutbig-marquee
      v-show="counter >= 100"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      :speed="200"
      :circle="20"
      @start-turns="startTurns"
      @end-turns="endTurns"
    >
    </nutbig-marquee>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import px1 from "./images/培训1.png"
import px2 from "./images/培训2.png"
import { onLongPress, useInterval, useMousePressed } from "@vueuse/core";
const longPress = ref(null);
// 对应长按触发的变量
const longPressed = ref(false);
// 右侧popup弹出框显隐控制变量
const showRight = ref(false);
// 改变触发变量值
const onLongPressCallback = (e) => {
  longPressed.value = true;
};
// 调用vueuse的onLongPress方法，长按2秒触发
onLongPress(longPress, onLongPressCallback, { delay: 3000 });

// 监听按钮鼠标按下事件
const { pressed } = useMousePressed({ target: longPress });

// 转盘上要展示的奖品数据
const prizeList = ref([
  {
    id: "xiaomi",
    prizeName: "小米手机",
    prizeImg:
      "https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png",
  },
  {
    id: "blue",
    prizeColor: "rgb(251, 219, 216)",
    prizeName: "蓝牙耳机",
    prizeImg:
      "https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg",
  },
  {
    id: "thanks",
    prizeName: "谢谢参与",
    prizeImg: new URL("./images/谢谢参与.svg", import.meta.url),
  },
  {
    id: "apple",
    prizeName: "apple watch",
    prizeImg:
      "https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png",
  },
  {
    id: "fruit",
    prizeColor: "rgba(246, 142, 46, 0.5)",
    prizeName: "培训大礼包",
    prizeImg: new URL("./images/心-礼包.svg", import.meta.url),
  },
  {
    id: "thanks",
    prizeName: "谢谢参与",
    prizeImg: new URL("./images/谢谢参与.svg", import.meta.url),
  },
  {
    id: "fish",
    prizeName: "海鲜套餐",
    prizeImg:
      "https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png",
  },
  {
    id: "thanks",
    prizeName: "谢谢参与",
    prizeImg: new URL("./images/谢谢参与.svg", import.meta.url),
  },
]);

// 转盘样式的选项
const styleOpt = reactive({
  prizeItem: {},
  startStyle: {},
  contentBg: {
    background: "rgb(255, 231, 149)",
  },
});
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1);
// 转盘开始方法
const startTurns = () => {
  prizeIndex.value = 4;
};
// 转盘结束方法
const endTurns = () => {
  setTimeout(() => {
    showRight.value = true;
  }, 1000);
};
// 调用VueUse定时方法
const { counter, reset, pause, resume } = useInterval(20, {
  controls: true,
  immediate: false,
});
// 监听pressed
watch(pressed, (val) => {
  if (val) {
    resume();
  } else {
    pause();
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  :deep(ul) {
    position: absolute;
    top: 0;
    left: 0;
  }
  :deep(.nut-progress .nut-progress-outer) {
    background-color: rgb(230, 217, 183);
  }
  img {
    width: 200px;
    height: 100px;
  }
}
</style>
