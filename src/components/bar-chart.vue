<!--
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-05 14:23:15
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-05 14:48:53
 * @FilePath: \newbee-mall-vue3-app\src\components\bar-chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div :id="props.id" ref="main" class="chart"></div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import _defaultsDeep from 'lodash/defaultsDeep'
import elementResizeDetectorMaker from 'element-resize-detector'

const props = defineProps({
  id: String,
  incomeData: Object,
  options: Object,
})

const main = ref()
const erd = elementResizeDetectorMaker()
let chart = null
let echartOption = {}
onMounted(() => {
  initEchart()
  setData()
  erd.listenTo(main.value, (element) => {
    chart.resize()
  })
  chart.resize()
})
onBeforeUnmount(() => {
  erd.uninstall(main.value)
})
watch(
  () => props.incomeData,
  (val) => {
    if (val) {
      nextTick(() => {
        setData()
      })
    }
  },
  { deep: true },
)
const initEchart = () => {
  if (!chart) {
    chart = echarts.init(main.value)
  }
  echartOption = {
    tooltip: {
      show: true,
      confine: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0,.8)',
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      show: true,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      top: '2%',
      itemGap: 12,
    },
    grid: {
      top: '15%',
      right: '5%',
      bottom: '5%',
      left: '5%',
      containLabel: true,
    },
    xAxis: [
      {
        name: '',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: 'PingFang SC',
          fontSize: 12,
        },
        // triggerEvent: true,
        type: 'category',
        axisLine: {
          // 坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            width: 2,
            color: 'rgba(231, 231, 231, 0.4)',
          },
        },
        axisLabel: {
          // 坐标轴刻度标签的相关设置
          interval: 0,
          rotate: 0,
          color: 'rgba(0, 0, 0, 0.64)',
          fontFamily: 'PingFang SC',
          fontSize: 12,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisTick: {
          show: false,
        },
        data: [],
      },
    ],
    yAxis: [
      {
        name: '人数（人）',
        nameTextStyle: {
          color: 'rgba(0, 0, 0, 0.64)',
          fontFamily: 'PingFang SC',
          fontSize: 12,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(231, 231, 231, 0.4)',
            type: 'dashed',
            width: 1,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.16)',
          },
        },
        axisLabel: {
          show: true,
          color: 'rgba(0, 0, 0, 0.64)',
          fontFamily: 'PingFang SC',
          fontSize: 12,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    color: ['#1972f9', '#ffbb38', '#49b3ff', '#926bff', '#ff7979', '#0EDCD0'],
    series: [],
  }
  // 使用刚指定的配置项和数据显示图表
  chart.setOption(echartOption)
  echartOption = chart.getOption()
}
const setData = () => {
  if (chart && props.incomeData?.SeriesData?.length > 0) {
    // echartOption = chart.getOption()
    echartOption.xAxis[0].data = props.incomeData.AxisData
    // 横坐标数据大于9条，倾斜显示，防止放不下
    if (props.incomeData.AxisData.length > 9) {
      echartOption.xAxis[0].axisLabel.rotate = 20
    } else {
      echartOption.xAxis[0].axisLabel.rotate = 0
    }
    echartOption.series = []
    for (let i = 0; i < props.incomeData.SeriesData.length; i++) {
      echartOption.series.push({
        name: '',
        type: 'bar',
        barMaxWidth: 16,
        yAxisIndex: 0,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(25, 114, 249, 1)',
            }, // 柱图渐变色
            {
              offset: 1,
              color: 'rgba(25, 114, 249, 0.08)',
            }, // 柱图渐变色
          ]),
          borderColor: 'rgba(255, 165, 31, 0.5)',
          borderWidth: 0,
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            fontSize: 20,
            fontFamily: 'D-DIN Condensed',
            color: '#FFFFFF',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            // distance: 5
          },
        },
        data: [],
      })
      echartOption.series[i].data = props.incomeData.SeriesData[i]
    }
    echartOption = _defaultsDeep({}, props.options, echartOption)
    chart.setOption(echartOption)
  }
}
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
