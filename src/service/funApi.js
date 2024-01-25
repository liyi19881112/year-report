/*
 * @Author: 李一 375987927@qq.com
 * @Date: 2024-01-22 10:30:30
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-23 15:08:01
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
  return axios.get('/api.php?api=18&key=385f2dc0fbce565c164b1eb8482b9a66');
}

