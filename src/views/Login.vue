<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:37:07
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-23 16:24:53
 * @FilePath: \newbee-mall-vue3-app\src\views\LoginNew.vue
 * @Description: 登录页面
-->

<template>
  <div ref="vantaRef" style="width: 100%;height: 100vh;"></div>
  <div class="my-login-box">
    <div class="sign">
      <span class="fast-flicker">年</span>度<span class="flicker">总结</span><span class="flicker">汇报</span>
    </div>
    <form>
        <div class="user-box">
            <input type="text" name="" required="" v-model="state.username">
            <label>汇报人员姓名</label>
        </div>
        <div class="user-box">
            <input type="text" name="" required="" v-model="state.password">
            <label>密码</label>
        </div>
        <a @click="onSubmit">
            <span></span>
            <span></span>
            <span></span>
            <span></span> 开始汇报
        </a>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { setLocal } from '@/common/js/utils'
// import md5 from 'js-md5'
import { showFailToast } from 'vant'
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'

const vantaRef = ref(null)
const vantaEffect = ref()
const state = reactive({
  username: '',
  password: '',
})

onMounted(()=>{
  vantaEffect.value = HALO({
    el: vantaRef.value,
    THREE: THREE,
  })
})

onBeforeUnmount(()=>{
  if (vantaEffect.value) {
    vantaEffect.value.destroy()
  }
})

// 提交登录表单
const onSubmit = async () => {
  if (state.username == '李一' && state.password == '2023') {
    // const { data } = await login({
    //   "loginName": '15998267825',
    //   "passwordMd5": md5('ly12251212')
    // })
    setLocal('login', state.username + '已登录')
    // 需要刷新页面，否则home页面背景乱码
    window.location.href = '/'
  } else {
    showFailToast('用户名或密码错误')
  }
}
</script>

<style lang="less">
html {
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: linear-gradient(#141e30, #243b55);
}
.my-login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(42, 14, 40, .5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}
.my-login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}
.my-login-box .user-box {
    position: relative;
}
.my-login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}
.my-login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}
.my-login-box .user-box input:focus ~ label,
.my-login-box .user-box input:valid ~ label {
    top: -30px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}
.my-login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
}
.my-login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}
.my-login-box a span {
    position: absolute;
    display: block;
}
.my-login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
}
@keyframes btn-anim1 {
    0% {
        left: -100%;
    }
    50%,
    100% {
        left: 100%;
    }
}
.my-login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
}
@keyframes btn-anim2 {
    0% {
        top: -100%;
    }
    50%,
    100% {
        top: 100%;
    }
}
.my-login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
}
@keyframes btn-anim3 {
    0% {
        right: -100%;
    }
    50%,
    100% {
        right: 100%;
    }
}
.my-login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
}
@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }
    50%,
    100% {
        bottom: 100%;
    }
}
.sign {
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  background-image: radial-gradient(
    ellipse 50% 35% at 50% 50%,
    #6b1839,
    transparent
  );
  transform: translate(-50%, -50%);
  letter-spacing: 2;
  left: 50%;
  top: 10%;
  font-family: "Clip";
  text-transform: uppercase;
  font-size: 6em;
  color: #ffe6ff;
  text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
    -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
    0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  animation: shine 2s forwards, flicker 3s infinite;
}

@keyframes blink {
  0%,
  22%,
  36%,
  75% {
    color: #ffe6ff;
    text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
      -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
      0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  }
  28%,
  33% {
    color: #ff65bd;
    text-shadow: none;
  }
  82%,
  97% {
    color: #ff2483;
    text-shadow: none;
  }
}

.flicker {
  animation: shine 2s forwards, blink 3s 2s infinite;
}

.fast-flicker {
  animation: shine 2s forwards, blink 10s 1s infinite;
}

@keyframes shine {
  0% {
    color: #6b1839;
    text-shadow: none;
  }
  100% {
    color: #ffe6ff;
    text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd,
      -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd,
      0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
  }
}

@keyframes flicker {
  from {
    opacity: 1;
  }

  4% {
    opacity: 0.9;
  }

  6% {
    opacity: 0.85;
  }

  8% {
    opacity: 0.95;
  }

  10% {
    opacity: 0.9;
  }

  11% {
    opacity: 0.922;
  }

  12% {
    opacity: 0.9;
  }

  14% {
    opacity: 0.95;
  }

  16% {
    opacity: 0.98;
  }

  17% {
    opacity: 0.9;
  }

  19% {
    opacity: 0.93;
  }

  20% {
    opacity: 0.99;
  }

  24% {
    opacity: 1;
  }

  26% {
    opacity: 0.94;
  }

  28% {
    opacity: 0.98;
  }

  37% {
    opacity: 0.93;
  }

  38% {
    opacity: 0.5;
  }

  39% {
    opacity: 0.96;
  }

  42% {
    opacity: 1;
  }

  44% {
    opacity: 0.97;
  }

  46% {
    opacity: 0.94;
  }

  56% {
    opacity: 0.9;
  }

  58% {
    opacity: 0.9;
  }

  60% {
    opacity: 0.99;
  }

  68% {
    opacity: 1;
  }

  70% {
    opacity: 0.9;
  }

  72% {
    opacity: 0.95;
  }

  93% {
    opacity: 0.93;
  }

  95% {
    opacity: 0.95;
  }

  97% {
    opacity: 0.93;
  }

  to {
    opacity: 1;
  }
}

</style>
