/*
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-19 17:25:15
 * @FilePath: \year-report\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'

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
