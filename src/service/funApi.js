/*
 * @Author: 李一
 * @Date: 2024-01-22 10:30:30
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-11 17:36:22
 * @FilePath: \year-report-github\src\service\funApi.js
 * @Description: 好玩的api集合
 */

import axios from '../utils/axios'

// 获取天气预报接口
export function getWeather() {
  axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '/weather' : ''
  return axios.get('/weather/weatherInfo?city=210100&key=8375736fc4765c6e4b99eb4c9569e604');
}

// 获取微博热搜接口
export function getHot() {
  axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '/hot' : ''
  return axios.get('/weibohot/index?key=2038d343fbd01b5c056357376eda2722');
}


