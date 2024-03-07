<!--
 * @Author: 李一
 * @Date: 2023-12-20 14:19:04
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-26 16:15:18
 * @FilePath: \year-report-github\src\components\RotateCards.vue
 * @Description: 关系图
-->

<template>
  <div id="relation" ref="main" class="chart"></div>
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
const initEchart = () => {
  if (!chart) {
    chart = echarts.init(main.value)
  }

  echartOption = {
    tooltip: {},
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    series: [
        {
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 1500,
                edgeLength: 120,
                layoutAnimation: true,
            },
            symbolSize: 100,
            nodeScaleRatio: 1, //图标大小是否随鼠标滚动而变
            roam: true, //缩放
            draggable: true, //节点是否可以拖拽
            edgeSymbol: ['none', 'arrow'], //线2头标记
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    color: '#FFF',
                },
            },
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#ff9900',
                    },
                    formatter: '{c}',
                },
            },
            symbolKeepAspect: false,
            focusNodeAdjacency: false, // 指定的节点以及其所有邻接节点高亮
            itemStyle: {
                normal: {
                    borderColor: '#29ACFC',
                    borderWidth: 2,
                    shadowColor: '#29ACFC',
                    color: '#29ACFC',
                    curveness: 0.08,
                },
            },

            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0.15,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#ff9900', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#ff9900', // 100% 处的颜色
                            },
                        ],
                        globalCoord: false,
                    },
                },
            },

            data: [
                {
                    name: '提高交付效率',
                    itemStyle: {
                        normal: {
                            color: '#ff9900',
                            borderColor: '#ff9900',
                            shadowColor: '#ff9900',
                        },
                    },
                },
                {
                    name: '修复热更新报错',
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                      tooltip: {
                        formatter: '{b} <br/>1、图表右键可查看对应sql和接口调用结果<br/>2、以浏览器插件形式提供<br/>3、方便开发与实施数据库联调',
                    },
                    name: '查看图表接口插件',
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                    name: '收集整理高频组件',
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                    name: '同构组件',
                    tooltip: {
                        formatter: '{b} <br/>1、通过WebComponent方式实现<br/>2、以安装依赖形式提供<br/>3、搭建大数据组件可视化平台',
                    },
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                    name: '提升研发能力',
                    itemStyle: {
                        normal: {
                            color: '#ff9900',
                            borderColor: '#ff9900',
                            shadowColor: '#ff9900',
                        },
                    },
                },
                {
                    name: '页面进入组件过渡',
                },
                {
                    name: 'tab切换过渡',
                },
                {
                    name: '优化完善3D地图',
                },
                {
                    name: '优化加载，减少白屏时间',
                },
            ],
            links: [
                {
                    source: 0,
                    target: 1,
                    value: '开发体验',
                },
                {
                    source: 0,
                    target: 2,
                    value: '开发体验',
                },
                {
                    source: 0,
                    target: 3,
                    value: '组件复用',
                },
                {
                    source: 0,
                    target: 4,
                    value: '组件复用',
                },
                {
                    source: 5,
                    target: 0,
                    value: '交付',
                },
                {
                    source: 5,
                    target: 6,
                    value: '过渡动画',
                },
                {
                    source: 5,
                    target: 7,
                    value: '过渡动画',
                },
                {
                    source: 5,
                    target: 8,
                    value: '3D交互',
                },
                {
                    source: 5,
                    target: 9,
                    value: '性能提升',
                },
            ],
        },
    ]
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
