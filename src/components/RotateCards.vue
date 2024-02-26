<!--
 * @Author: 李一
 * @Date: 2023-12-20 14:19:04
 * @LastEditors: 李一
 * @LastEditTime: 2024-02-23 18:04:43
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
            symbolSize: 70,
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
                    tooltip: {
                        formatter: '{b} <br/>性别：男<br/>职务：富阳区灵桥镇灵桥村务农',
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff9900',
                            borderColor: '#ff9900',
                            shadowColor: '#ff9900',
                        },
                    },
                },
                {
                      tooltip: {
                        formatter: '{b} <br/>性别：男<br/>出生年月：19951114<br/>星座：处女座',
                    },
                    name: '王桂花',
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
                        formatter: '{b} <br/>性别：男<br/>出生年月：19951114<br/>星座：处女座',
                    },
                    name: '李思思',
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                    name: '自住房屋',
                    itemStyle: {
                        normal: {
                            color: '#79A437',
                            borderColor: '#79A437',
                            shadowColor: '#79A437',
                        },
                    },
                },
                {
                    name: '车子',
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
                    name: '黄涛',
                },
                {
                    name: '于海',
                },
                {
                    name: '张柏',
                },
                {
                    name: '付梦杰',
                },
            ],
            links: [
                {
                    source: 0,
                    target: 1,
                    value: '夫妻',
                },
                {
                    source: 0,
                    target: 2,
                    value: '父亲',
                },
                {
                    source: 2,
                    target: 0,
                    value: '女儿',
                },
                {
                    source: 0,
                    target: 3,
                    value: '自住',
                },
                {
                    source: 0,
                    target: 4,
                    value: '车主',
                },
                {
                    source: 0,
                    target: 5,
                    value: '租户',
                },
                {
                    source: 5,
                    target: 6,
                    value: '租赁',
                },
                {
                    source: 5,
                    target: 7,
                    value: '租赁',
                },
                {
                    source: 5,
                    target: 8,
                    value: '租赁',
                },
                {
                    source: 5,
                    target: 9,
                    value: '租赁',
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
