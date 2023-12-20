<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-18 17:40:25
 * @FilePath: \year-report\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 项目使用依赖汇总
- npm i @vant/touch-emulator -S
> vant库pc端适配，自动将移动端的touch事件转换成pc端的mouse事件

***

- npm install lib-flexible --save-dev
> 移动端淘宝的适配方案

***

- npm install qrcodejs2-fix
> 生成二维码库

***

- npm i vanta
> 动态背景库，搭配three插件一起使用

***

- npm install vue-draggable-plus
> 支持vue2和vue3的拖拽组件

***

- npm i -S flipbook-vue
> Flipbook-vue 是一个Viewer 组件库，允许您在图像之间切换，就像在翻书一样

***

## 项目遇到的问题汇总
- 在js里用document原生方法创建元素class的时候，切记`<style>`里不能加scoped，否则元素class样式不会生效
- 字符串里的空格，请使用`\xa0`来标识
- 判断对象数组是否已存在，用`indexOf`和`includes`都不生效，只能判断里面标识譬如id是否相等
- 拖拽表格遇到的坑--因为id作为for循环key，所以两个表格的id不能重复，否则拖拽的时候，会莫名消失
- watch监听，需要默认初始化就获取监听值，需要使用`{ immediate: true }`
- `Element-plus`组件库默认支持 dayjs 进行日期时间处理，所以可以直接导入使用，`import { dayjs } from 'element-plus'`