<!--
 * @Author: sroxck
 * @Date: 2023-10-26 14:57:13
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-26 14:57:52
 * @Description: 
-->
<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SvgIcon",
});

export type IconSize = "default" | "small" | "large";

export type IconColor =
  | "primary"
  | "default"
  | "success"
  | "warn"
  | "error"
  | (string & {});

const props = withDefaults(
  defineProps<{
    /** icon 的前缀 */
    prefix?: string;
    /** icon 名称 */
    name: string;
    /** icon 的颜色 */
    color?: IconColor;
    /** icon 的尺寸 */
    size?: IconSize | number;
  }>(),
  {
    prefix: "#icon-",
    size: "default",
    color: "default",
  }
);

const sizeMap: Record<IconSize, number> = {
  default: 16,
  small: 12,
  large: 24,
};

const colorMap: Record<IconColor, string> = {
  primary: "#409EFF",
  success: "#67C23A",
  error: "#bb1b1b",
  warn: "#F56C6C",
  default: "#333333",
};

const colorRef = computed(() => {
  return colorMap[props.color] || props.color;
});

const sizeRef = computed(() => {
  if (typeof props.size === "string") {
    return sizeMap[props.size];
  }
  return props.size;
});

</script>

<template>
   <svg
    :style="{ width: sizeRef + 'px', height: sizeRef + 'px' }"
    class="svg-icon-wrapper"
  >
    <use :xlink:href="prefix + name" :fill="colorRef"></use>
  </svg>

</template>
<style>
.svg-icon-wrapper {
  display: inline-block;
}
</style>
