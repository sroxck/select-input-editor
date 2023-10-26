/*
 * @Author: sroxck
 * @Date: 2023-10-26 14:58:38
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-26 14:58:45
 * @Description: 
 */
import type { App } from "vue";
import SvgIcon from "./svgIcon.vue";

/**
 * 让 SvgIcon 具有类型提示
 */
declare module "vue" {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon;
  }
}

const SvgIconPlugin = (app: App) => {
  app.component(SvgIcon.name, SvgIcon);
};

export { SvgIcon, SvgIconPlugin };
