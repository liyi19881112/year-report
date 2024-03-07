/*
 * @Author: 李一
 * @Date: 2023-12-20 14:19:03
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-29 09:55:20
 * @FilePath: \year-report-github\src\main.js
 * @Description: 年度汇报
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton, Highlight } from 'vant'

import App from './App.vue'
import router from './router'
import slideIn from '@/components/vSlideIn'
// 按需引入nutui
import { Marquee } from "@nutui/nutui-bingo";
// import { Progress, Animate, Popup } from '@nutui/nutui';
import NutUI from "@nutui/nutui"
import { IconFont } from '@nutui/icons-vue';
import '@nutui/icons-vue/dist/style_iconfont.css';
import "@nutui/nutui-bingo/dist/style.css";
import "@nutui/nutui/dist/style.css";

import 'lib-flexible/flexible'

import './assets/main.css'
import './common/style/theme.css'
import 'vant/es/toast/style'
// 引入模块后自动生效
import '@vant/touch-emulator';
// 引入获取登录信息方法
import checkUserAuthentication from '@/components/authentication'

const app = createApp(App)

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkUserAuthentication(); // 检查用户是否已登录

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果目标路由需要身份验证且用户未登录，则重定向到登录页面
    next('/login');
  } else {
    // 允许访问目标路由
    next();
  }
});

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Skeleton)
  .use(Highlight)
  .use(Marquee)
  .use(IconFont)
  .use(NutUI)

// 定义全局平滑上升指令
app.directive('slideIn', slideIn);

// 全局过滤器
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}

app.mount('#app')
