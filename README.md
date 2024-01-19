<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-19 10:03:58
 * @FilePath: \year-report\README.md
 * @Description: 笔记汇总
-->
## 技术栈
Vue3 + Pinia + Vant4 + Vite + vue-router + ES6 + sass/less + Element-Plus + Echarts + lodash + VueUse + NutUI

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

- npm i @nutui/nutui-bingo
> NutUI-Bingo 是一个基于 NutUI 的抽奖组件库，京东风格的轻量级移动端组件库

***

## 项目遇到的问题汇总
- 在js里用document原生方法创建元素class的时候，切记`<style>`里不能加scoped，否则元素class样式不会生效
- 字符串里的空格，请使用`\xa0`来标识
- 判断对象数组是否已存在，用`indexOf`和`includes`都不生效，只能判断里面标识譬如id是否相等
- 拖拽表格遇到的坑--因为id作为for循环key，所以两个表格的id不能重复，否则拖拽的时候，会莫名消失
- watch监听，需要默认初始化就获取监听值，需要使用`{ immediate: true }`
- `Element-plus`组件库默认支持 dayjs 进行日期时间处理，所以可以直接导入使用，`import { dayjs } from 'element-plus'`
- css元素的offset-path属性，从路径生成工具：`https://editor.method.ac/`里获取画好的路径,ctrl+u弹出path里的d值，然后动画关键帧`offset-distance`
- 父组件调用子组件实例，子组件不能在父组件里v-if控制显隐，否则获取不到子组件实例。vue3中子组件`<script setup>`里要使用`defineExpose({ 要暴露的方法或者属性名称 })`,与之相对的`setup()`钩子里用`expose({ 要暴露的方法或者属性名称 })`抛出去，父组件才能获取到。vue2中就简单了，直接调用子组件方法是`this.$refs.child.show()`;
- 处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 :deep() 这个伪类
- 如果想让其中一个样式规则应用到全局，比起另外创建一个 `<style>`，可以使用 :global 伪类来实现 (看下面的代码)： 
``` 
   <style scoped>
        :global(.red) {color: red;}
    </style>
```
- css中引用vue3的变量，可以使用v-bind()，切记，如果是使用对象属性值，需要包括在引号中，例如vue3中定义一个`const theme = {color: 'red'}`,css中需要`p {color: v-bind('theme.color');}`
- css原生使用变量   
    1、css中原生的变量定义语法是：变量名前面要加两根连词线 --*  
    2、变量使用语法是：var()函数用于读取变量 var(--*)   
    3、其中 * 表示我们的变量名称    
    4、变量名大小写敏感，--header-color和--Header-Color是两个不同变量   
- WeakMap相比普通map优势在于可以避免内存泄露，WeakMap 只接受对象作为键名，当key为null时，引用对象会被回收，而map的引用对象不会被回收，所以WeakMap可以避免内存泄露。WeakMap 不可遍历，不像 Map，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有 size 属性，也不支持 clear 方法，所以 WeakMap只有四个方法可用：get()、set()、has()、delete()。