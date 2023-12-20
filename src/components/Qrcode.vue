<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-30 15:26:03
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-14 16:24:39
 * @FilePath: \newbee-mall-vue3-app\src\components\Qrcode.vue
 * @Description: 生成二维码组件
-->
<template>
    <div id="qrcode" ref="qrcodeDom" class="qrcode-wrap"></div>
  </template>
  
  <script setup>
  import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
  import QRCode from 'qrcodejs2-fix';

  const qrcodeDom = ref(null)
  const qrcode = ref()
  onMounted(()=>{
    nextTick(()=>{
        creatQrCode()
    })
  })

  onBeforeUnmount(()=>{
    if(qrcode){
        qrcode.value.clear()
    }
  })
  
 const creatQrCode = () => {
      let text = 'https://baike.baidu.com/item/%E5%88%98%E7%A7%AF%E4%BB%81/3053145'
      qrcode.value = new QRCode(qrcodeDom.value, {
        text: text, //二维码内容字符串
        width: 128, //图像宽度
        height: 128, //图像高度
        colorDark: '#000000', //二维码前景色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.H, //容错级别
      })
}
  </script>
  <style>
    .qrcode-wrap{
        width: 128px;
        height: 128px;
        margin: auto;
    }
    .qrcode-wrap canvas,
    .qrcode-wrap img {
        width:100%;
        height:100%;
    }
  </style>