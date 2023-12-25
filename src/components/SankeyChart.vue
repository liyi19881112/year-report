<!--
 * @Author: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @Date: 2023-12-25 14:57:12
 * @LastEditors: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @LastEditTime: 2023-12-25 15:04:10
 * @FilePath: \year-report-github\src\components\sankey-chart.vue
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
          name: '里旭',
          itemStyle: {
              color: '#95B334'
          },
      },{
          name: '刘博文',
          itemStyle: {
              color: '#95B334'
          },
      },{
          name: '赵俊博',
          itemStyle: {
              color: '#F1AF23'
          }, 
      },{
          name: '曹翰',
          itemStyle: {
              color: '#F1AF23'
          }, 
      }, {
          name: '王大军',
          itemStyle: {
              color: '#C8493B'
          }, 
      },{
          name: '吉明达',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: '李丽',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: '王冰',
          itemStyle: {
              color: '#C8493B'
          },
      }, {
          name: '达标，满足项目开发',
          itemStyle: {
              color: '#95B334'
          },
          
      }, {
          name: '达标，缺乏开发经验',
          itemStyle: {
              color: '#F1AF23'
          },
      }, {
          name: '不达标',
          itemStyle: {
              color: '#C8493B'
          },
      },],
      links: [{
              source: '里旭',
              target: '达标，满足项目开发',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          },  {
              source: '刘博文',
              target: '达标，满足项目开发',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, {
              source: '赵俊博',
              target: '达标，缺乏开发经验',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, 
          {
              source: '曹翰',
              target: '达标，缺乏开发经验',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.6
              }
          }, 
            
              {
                  source: '王大军',
                  target: '不达标',
                  value: 1,
                  lineStyle: {
                      color: 'source',
                      opacity: 0.5
                  }
              },
              
              
              {
                  source: '吉明达',
                  target: '不达标',
                  value: 1,
                  lineStyle: {
                      color: 'source',
                      opacity: 0.5
                  }
              },
          {
              source: '李丽',
              target: '不达标',
              value: 1,
              lineStyle: {
                  color: 'source',
                  opacity: 0.5
              }
          }, {
              source: '王冰',
              target: '不达标',
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
