<!--
 * @Author: 李一
 * @Date: 2023-12-22 15:27:15
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-01 15:03:57
 * @FilePath: \year-report-github\src\components\UpDownRotate.vue
 * @Description: 文件描述
-->
<template>
  <div class="card">
    <div class="upper-part">
      <div class="upper-part-face">培训数字说</div>
      <div class="upper-part-back">
        <van-highlight
          :keywords="keywords"
          :source-string="text"
          highlight-class="custom-class"
        />
      </div>
    </div>
    <div class="lower-part">
      <div class="lower-part-face">用数据说话--</div>
      <div class="lower-part-back">是对决策的基本尊重！</div>
    </div>
  </div>
</template>

<script setup>
const text = "参与培训人员13名；培训总历经270天；产出成果物8篇；举行培训会议次数15次；新培养具备vue3业务开发能力人员4名";
const keywords = ['13', '270', '8', '15', '4'];
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 400px;
  position: relative;
  border-radius: 40px;
  transition: all 0.8s;
  margin-left: 20px;
  perspective: 600px;
  overflow: hidden;
  perspective-origin: center bottom;
  font-size: 13px;
  :deep(.custom-class) {
    color: rgb(255, 115, 0);
    font-size: 25px;
  }
}

.upper-part {
  width: 100%;
  height: 65%;
  border-radius: 40px 40px 0 0;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.9s;
}

.upper-part-face,
.upper-part-back {
  text-align: center;
  background-color: lightgray;
  color: purple;
  border: 3px solid purple;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 40px 40px 0 0;
  font-weight: bold;
  z-index: 2;
  backface-visibility: hidden;
  transition: all 0.6s;
}

.upper-part-back {
  background-color: purple;
  color: lightgray;
  transform: rotatex(180deg);
}

.lower-part {
  width: 100%;
  height: 35%;
  border-radius: 0 0 40px 40px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center top;
  transition: all 0.9s;
}

.lower-part-face,
.lower-part-back {
  background-color: purple;
  width: 100%;
  height: 100%;
  color: lightgray;
  font-weight: bold;
  position: absolute;
  border-radius: 0 0 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0, -0.8px);
  backface-visibility: hidden;
  z-index: 2;
}

.lower-part-back {
  backface-visibility: visible;
  border-radius: 40px;
  color: purple;
  background-color: lightgray;
  transform: rotateX(180deg);
  z-index: 1;
  transition: border-radius 0.6s;
}

.card:hover > .upper-part {
  transform: rotatex(-0.5turn);
}

.card:hover > .lower-part {
  transform: translateY(88.3px) rotateX(0.5turn);
}

.card:hover > .lower-part > .lower-part-back {
  border: 3px solid purple;
  border-radius: 0 0 40px 40px;
}
</style>
