<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-14 15:16:16
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-29 09:41:56
 * @FilePath: \year-report-github\src\components\RolloverCards.vue
 * @Description: 翻转卡片组件
-->
<template>
  <div class="content">
    <h1 class="heading">2023年主要参与项目汇总</h1>
    <p class="description">悬浮翻转以查看工作内容详情</p>
    <a class="card">
      <div class="front" :style="`background-image: url(${hn1})`">
        <p>海南大数据</p>
      </div>
      <div class="back">
        <div>
          <p>海南大数据与门户系统对接工作支持;</p>
          <p>
            失业保险指数、就业景气指数、充分就业、就业平等、就业市场、失业预警等页面开发。
          </p>
          <button class="button">页面开发</button>
        </div>
      </div></a
    ><a class="card">
      <div
        class="front"
        :style="`background-image: url(${yz1})`"
      >
        <p>扬州大数据</p>
      </div>
      <div class="back">
        <div>
          <p>现场页面问题对应</p>
          <p>配合完成扬州主题样式切换工作</p>
          <p>增加菜单通过登录权限动态获取</p>
          <button class="button">页面开发</button>
        </div>
      </div></a
    ><a class="card">
      <div
        class="front"
        :style="`background-image: url(${tl1})`"
      >
        <p>铁岭大屏</p>
      </div>
      <div class="back">
        <div>
          <p>支持现场菜单及滚动主页开发</p>
          <button class="button">技术支持</button>
        </div>
      </div></a
    ><a class="card">
      <div
        class="front"
        :style="`background-image: url(${gx1})`"
      >
        <p>广西大屏</p>
      </div>
      <div class="back">
        <div>
          <p>权限控制及门户对接</p>
          <button class="button">技术支持</button>
        </div>
      </div></a
    ><a class="card">
      <div
        class="front"
        :style="`background-image: url(${cz})`"
      >
        <p style="color: lightslategrey;">常州个人档案库</p>
      </div>
      <div class="back">
        <div>
          <p>在常人口分析页面开发</p>
          <button class="button">页面开发</button>
        </div></div></a
    ><a class="card">
      <div
        class="front"
        :style="`background-image: url(${gr})`"
      >
        <p style="color: lightslategrey;">数字档案库</p>
      </div>
      <div class="back">
        <div>
          <p>个人标签搜索页面开发</p>
          <p>群体洞察页面开发</p>
          <p>企业全息画像-基础档案页面开发</p>
          <el-popover placement="top" :width="500" trigger="click">
            <template #reference>
              <el-button class="button" style="margin-right: 16px"
                >页面开发</el-button
              >
            </template>
            <el-table :data="daData">
              <el-table-column width="90" property="xh" label="序号" />
              <el-table-column width="410" property="name" label="知识点" />
            </el-table>
          </el-popover>
        </div>
      </div></a
    >
  </div>
</template>

<script setup>
import hn1 from "./images/hn1.png";
import yz1 from "./images/yz1.png";
import tl1 from "./images/tl1.png";
import gx1 from "./images/gx1.png";
import cz from "./images/在常人口分析.png";
import gr from "./images/个人档案.png";

const daData = [
  {
    xh: '1',
    name: '公司gua框架及组件使用'
  },
  {
    xh: '2',
    name: 'vue3+TypeScript项目实战应用'
  },
  {
    xh: '3',
    name: '非大屏项目开发流程与还原度'
  },
  {
    xh: '4',
    name: '静态资源加载优化'
  },
]
</script>

<style lang="scss" scoped>
$primary: hsl(222, 80%, 50%);
$primary-light: hsl(222, 50%, 95%);

$secondary: hsl(350, 80%, 50%);

$red: hsl(10, 80%, 50%);
$orange: hsl(50, 80%, 50%);

*,
*:before,
*:after {
  box-sizing: border-box;
}

@mixin mobile($size: 640px) {
  @media screen and (max-width: $size) {
    @content;
  }
}

.content {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
}

.heading {
  width: 100%;
  margin-left: 1rem;
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1ch;
  line-height: 1;
  padding-bottom: 0.5em;
  margin-bottom: 0.5rem;
  position: relative;

  &:after {
    display: block;
    content: "";
    position: absolute;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
    bottom: 0;
  }
}

.description {
  width: 100%;
  font-size: 0.5rem;
  margin-top: 0;
  margin-left: 1rem;
}

.card {
  color: inherit;
  cursor: pointer;
  width: calc(33% - 2rem);
  min-width: calc(33% - 2rem);
  height: 200px;
  min-height: 200px;
  perspective: 1000px;
  margin: 0.5rem;
  position: relative;
  @include mobile(800px) {
    width: calc(50% - 2rem);
  }
  @include mobile(500px) {
    width: 100%;
  }
}

.front,
.back {
  display: flex;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
  // overflow: hidden;
}

.front {
  background-size: contain;
  background-repeat: no-repeat;
  // background-blend-mode: overlay;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  overflow: hidden;
  font-family: Poppins, sans-serif;
  &:before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
    opacity: 0.25;
    z-index: -1;
  }
  .card:hover & {
    transform: rotateY(180deg);
  }
  .card:nth-child(even):hover & {
    transform: rotateY(-180deg);
  }
}

.back {
  background: #fff;
  transform: rotateY(-180deg);
  font-size: 10px;
  padding: 0 2em;

  .button {
    background: linear-gradient(135deg, adjust-hue($primary, -20deg), $primary);
    margin-top: 10%;

    &:before {
      box-shadow: 0 0 10px 10px rgba($primary, 0.25);
      background-color: rgba($primary, 0.25);
    }
  }

  .card:hover & {
    transform: rotateY(0deg);
  }

  .card:nth-child(even) & {
    transform: rotateY(180deg);

    .button {
      background: linear-gradient(
        135deg,
        adjust-hue($secondary, -20deg),
        $secondary
      );

      &:before {
        box-shadow: 0 0 10px 10px rgba($secondary, 0.25);
        background-color: rgba($secondary, 0.25);
      }
    }
  }

  .card:nth-child(even):hover & {
    transform: rotateY(0deg);
  }
}

.button {
  $height: 40px;
  transform: translateZ($height);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-weight: bold;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 100px;
  font: inherit;
  border: none;
  position: relative;
  transform-style: preserve-3d;
  transition: 300ms ease;
  cursor: pointer;

  &:before {
    transition: 300ms ease;
    position: absolute;
    display: block;
    content: "";
    transform: translateZ(-$height);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    border-radius: 100px;
    left: 10px;
    top: 16px;
  }

  &:hover {
    transform: translateZ($height + 15px);

    &:before {
      transform: translateZ(-($height + 15px));
    }
  }

  &:active {
    transform: translateZ(calc($height / 2));

    &:before {
      transform: translateZ(-(calc($height / 2)));
      top: 12px;
    }
  }
}
</style>
