<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-13 15:11:23
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-18 14:17:39
 * @FilePath: \year-report\src\components\Gallery.vue
 * @Description: 照片画廊悬停组件
-->
<template>
    <div class="container" style="width: 96%;">
        <div class="box one" :style="`--img: url(${test})`"></div>
        <div class="box two" :style="`--img: url(${test})`"></div>
        <div class="box three" :style="`--img: url(${test})`"></div>
        <div class="box four" :style="`--img: url(${test})`"></div>
        <div class="box five" :style="`--img: url(${test})`"></div>
    </div>
</template>

<script setup>
import test from './images/test.jpg'

</script>

<style lang="less" scoped>
.container {
    position: relative;
    display: grid;
    width: 100%;
    height: 155px;
    top: 12%;
    margin: 0 13px;
    background: transparent;
    transition: 0.25s;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; // 将容器分为5列
    grid-gap: 20px; // 设置行与列的间隙
    .box {
        position: relative;
        background: var(--img); // 使用上方html中声明的图片路径
        background-position: center;
        background-size: cover; // 设置背景位移
        transition: 0.25s;
        display: flex;
        justify-content: center;
        align-content: center;
        filter: grayscale(1) brightness(1); // 设置容器的灰度和亮度
        &:hover {
            filter: grayscale(0) brightness(1.25); // 鼠标悬停的图片灰度不变，提高亮度
        }
        // 图片上下区域增加渐变效果
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(#000, transparent,transparent,transparent,#000);
            transition: 0.25s;
        }
        // 图片错位排列
        &:nth-child(even) {
            transform: translateY(15px);
        }
        &:nth-child(odd) {
            transform: translateY(-15px);
        }
    }
}

// 每列鼠标悬停的宽度
.container:has(.one:hover) {
    grid-template-columns: 2fr 0.5fr 0.5fr 0.5fr 0.5fr;
}

.container:has(.two:hover) {
    grid-template-columns: 0.5fr 2fr 0.5fr 0.5fr 0.5fr;
}

.container:has(.three:hover) {
    grid-template-columns: 0.5fr 0.5fr 2fr 0.5fr 0.5fr;
}

.container:has(.four:hover) {
    grid-template-columns: 0.5fr 0.5fr 0.5fr 2fr 0.5fr;
}

.container:has(.five:hover) {
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 2fr;
}

</style>