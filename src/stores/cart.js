/*
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-11-27 09:02:31
 * @LastEditors: 李一 yi_li_neu@neusoft.com
 * @LastEditTime: 2023-12-12 11:09:31
 * @FilePath: \newbee-mall-vue3-app\src\stores\cart.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', () => {
  const count = ref(0) // 结算单数量
  const cartDetail = ref([]) // 结算单数据
  const isDone = ref(false) // 是否完成结算
  const doubleConfirm = ref(false) // 是否通过二次验证

  function updateCart(item) {
    // count.value++
    cartDetail.value.push(item)
    count.value = cartDetail.value.length
  }
  function decreaseCart(item) {
    // count.value === 0 ? count.value = 0 : count.value--
    if (isExist(item)) cartDetail.value.splice(cartDetail.value.indexOf(item), 1)
    count.value = cartDetail.value.length
  }

  function isExist(item) {
    // 判断对象数组是否已存在，用indexOf和includes都不生效，只能判断id是否相等
    const map = cartDetail.value.find((i) => i.id === item.id)
    return map ? true : false
  }

  return { count, cartDetail, isDone, doubleConfirm, updateCart, decreaseCart, isExist }
})
