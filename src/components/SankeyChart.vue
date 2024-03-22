<!--
 * @Author: 李一
 * @Date: 2023-12-25 14:57:12
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-11 16:18:13
 * @FilePath: \year-report-github\src\components\SankeyChart.vue
 * @Description: 桑基图
-->

<template>
  <div id="sankey" ref="main" class="chart"></div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch, onBeforeUnmount } from 'vue'
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
    series: {
      type: 'sankey',
      layout: 'none',
      focusNodeAdjacency: 'allEdges',
      data: [{
          name: 'vue3+ts',
          itemStyle: {
              color: '#95B334'
          },
      },{
          name: 'css动画进阶',
          itemStyle: {
              color: '#95B334'
          },
      },{
          name: 'js红包书基础',
          itemStyle: {
              color: '#F1AF23'
          }, 
      },{
          name: 'Web Components',
          itemStyle: {
              color: '#F1AF23'
          }, 
      }, {
          name: 'lit组件构件库',
          itemStyle: {
              color: '#C8493B'
          }, 
      },{
          name: 'Promise原理',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: 'Web设计模式',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: 'Chrome插件开发',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: '已完成',
          itemStyle: {
              color: '#95B334'
          },
          
      }, {
          name: '进行中',
          itemStyle: {
              color: '#F1AF23'
          },
      }, {
          name: '未开始',
          itemStyle: {
              color: '#C8493B'
          },
      },],
      links: [{
              source: 'vue3+ts',
              target: '已完成',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          },  {
              source: 'css动画进阶',
              target: '已完成',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, {
              source: 'js红包书基础',
              target: '进行中',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, 
          {
              source: 'Web Components',
              target: '进行中',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, 
            
              {
                  source: 'lit组件构件库',
                  target: '未开始',
                  value: 1,
                  lineStyle: {
                      color: 'source',
                      opacity: 0.5
                  }
              },
              
              
              {
                  source: 'Promise原理',
                  target: '未开始',
                  value: 1,
                  lineStyle: {
                      color: 'source',
                      opacity: 0.5
                  }
              },
          {
              source: 'Web设计模式',
              target: '未开始',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.5
              }
          }, {
              source: 'Chrome插件开发',
              target: '未开始',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.5
              }
          },]
      }
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
