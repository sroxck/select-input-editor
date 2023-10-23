<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-23 17:41:11
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
</script>
<template>
  <div contenteditable="true" :value="value" ref="divRef">
    {{ value }}
  </div>
</template>
