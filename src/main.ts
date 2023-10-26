/*
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-26 15:15:22
 * @Description: 
 */
import './assets/main.css'
import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import i18n from './language/index'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import { SvgIconPlugin } from "./components/svg";
app.use(ElementPlus)
app.use(SvgIconPlugin)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
