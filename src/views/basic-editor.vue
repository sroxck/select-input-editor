<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-27 17:52:50
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue';
 defineProps<{
  value?: string,
}>()

const divRef = ref(null)
defineExpose({
  divRef
})
const edit:any = 'plaintext-only' 
</script>
<template>
  <div :contenteditable="edit" :value="value" ref="divRef">
    {{ value }}
    <slot></slot>
  </div>
</template>
