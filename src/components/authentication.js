/*
 * @Author: 李一 yi_li_neu@neusoft.com
 * @Date: 2023-12-19 14:34:31
 * @LastEditors: 李一 375987927@qq.com
 * @LastEditTime: 2024-01-23 16:29:07
 * @FilePath: \year-report\src\components\authentication.js
 * @Description: 检查用户是否已登录
 */
import { getLocal } from '@/common/js/utils'
const checkUserAuthentication = () => {
    // 检查用户是否已登录
    const login = getLocal('login')
    if(login === '李一已登录') return true
    return false
}

export default checkUserAuthentication