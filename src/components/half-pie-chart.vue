<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-05 14:23:15
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-05 15:20:23
 * @FilePath: \newbee-mall-vue3-app\src\components\bar-chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div id="half-pie" ref="main" class="chart"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import _defaultsDeep from 'lodash/defaultsDeep'
import elementResizeDetectorMaker from 'element-resize-detector'

const main = ref()
const erd = elementResizeDetectorMaker()
let chart = null
let echartOption = {}
onMounted(() => {
  initEchart()
  erd.listenTo(main.value, (element) => {
    chart.resize()
  })
  chart.resize()
})
onBeforeUnmount(() => {
  erd.uninstall(main.value)
})
let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC'
const initEchart = () => {
  if (!chart) {
    chart = echarts.init(main.value)
  }
  let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF']
  let chartData = [{
        name: "本科及以上",
        value: 13211,
        unit: '元'
    },
    {
        name: "高中",
        value: 42111,
        unit: '元'
    },
    {
        name: "初中及以下",
        value: 81711,
        unit: '元'
    },
    {
        name: "其他",
        value: 121711,
        unit: '元'
    }
];
let arrName = [];
let arrValue = [];
let sum = 0;
let pieSeries = [],
    lineYAxis = [];

// 数据处理
chartData.forEach((v, i) => {
    arrName.push(v.name);
    arrValue.push(v.value);
    sum = sum + v.value;
})

// 图表option整理
chartData.forEach((v, i) => {
    pieSeries.push({
        name: '学历',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        center: ["40%", "50%"],
        label: {
            show: false
        },
        data: [{
            value: v.value,
            name: v.name
        }, {
            value: sum - v.value,
            name: '',
            itemStyle: {
                color: "rgba(0,0,0,0)"
            }
        }]
    });
    pieSeries.push({
        name: '',
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [65 - i * 15 + '%',57 - i * 15 + '%'],
        center: ["40%", "50%"],
        label: {
            show: false
        },
        data: [{
            value: 7.5,
            itemStyle: {
                color: "#E3F0FF"
            }
        }, {
            value: 2.5,
            name: '',
            itemStyle: {
                color: "rgba(0,0,0,0)"
            }
        }]
    });
    v.percent = (v.value / sum * 100).toFixed(1) + "%";
    lineYAxis.push({
        value: i,
        textStyle: {
            rich: {
                circle: {
                    color: color[i],
                    padding: [0, 5]
                }
            }
        }
    });
})
  echartOption = {
    color: color,
    grid: {
        top: '15%',
        bottom: '54%',
        left: "40%",
        containLabel: false
    },
    yAxis: [{
        type: 'category',
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            formatter: function(params) {
                let item = chartData[params];
                return '{line|}{circle|●}{name|'+ item.name +'}{bd||}{percent|'+item.percent+'}{value|'+ item.value+'}{unit|元}'
            },
            interval: 0,
            inside: true,
            textStyle: {
                color: "#333",
                fontSize: 14,
                rich: {
                    line: {
                        width: 170,
                        height: 10,
                        backgroundColor: {image: dashedPic}
                    },
                    name: {
                        color: '#666',
                        fontSize: 14,
                    },
                    bd: {
                        color: '#ccc',
                        padding: [0, 5],
                        fontSize: 14,
                    },
                    percent:{
                        color: '#333',
                        fontSize: 14,
                    },
                    value: {
                        color: '#333',
                        fontSize: 16,
                        fontWeight: 500,
                        padding: [0, 0, 0, 20]
                    },
                    unit: {
                        fontSize: 14
                    }
                }
            },
            show: true
        },
        data: lineYAxis
    }],
    xAxis: [{
        show: false
    }],
    series: pieSeries
  }
  // 使用刚指定的配置项和数据显示图表
  chart.setOption(echartOption)
  echartOption = chart.getOption()
}
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
