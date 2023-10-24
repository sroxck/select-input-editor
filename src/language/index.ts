/*
 * @Author: sroxck
 * @Date: 2023-10-24 13:29:08
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 13:29:40
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh_CN'
import enUS from './en_US'
const i18n = createI18n({
  legacy: false,
  locale: 'en-us', // 默认显示语言
  messages: {
    'zh-cn': zhCN,
    'en-us': enUS
  }
})

export default i18n
