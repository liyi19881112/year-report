<!--
 * @Author: liyi19881112 71474753+liyi19881112@users.noreply.github.com
 * @Date: 2023-12-20 16:27:43
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-07 09:15:53
 * @FilePath: \year-report-github\src\components\HoverFilter.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cards">
    <div class="card red">
      <p class="tip">临江仙·琼州之南</p>
      <p class="second-text">
        念落樱残阳西去，五公几度豪杰。白楼轩窗影重重。钟楼思无忆，戏闹潮岸声。<br />
        醉雨肥寒春何处？夷犹几点星光。踏沙不语簇月前。但行南山下，梵音入人家。
      </p>
    </div>
    <div class="card blue">
      <p class="tip">红烛摇</p>
      <p class="second-text">
        戎装数载，飘寄他乡。行军残月天，披卷星帘。少年公子风发起，长缨立马边。<br />
        淡云归鸿，恰囍姻缘。君予千千结，妆黛同心。落雪半掩青山老，新人画白头。
      </p>
    </div>
    <div class="card green">
      <p class="tip">归途</p>
      <p class="second-text">
        一波烟雨青翠了一条小路<br />
舞动的尘埃却模糊了远方<br />
在路上<br />
未知串起了过客的憧憬<br />
对此<br />
我自若坦然<br />
因为<br />
这不是征程<br />
而是归途
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cards {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}

.cards .red {
  background-color: #f43f5e;
}

.cards .blue {
  background-color: #3b82f6;
}

.cards .green {
  background-color: #22c55e;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: auto;
  width: 500px;
  border-radius: 10px;
  gap: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
  padding: 20px 0px;
}

.cards .card p.tip {
  font-size: 2.5em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: 1.5em;
}

.cards .card:hover {
  transform: scale(1.5, 1.5);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}
</style>
