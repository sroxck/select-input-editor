<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-23 16:56:34
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  value?: string,
}>()

// defineEmits(['update:modelValue','blur','focus','input','keypress','keydown'])
const divRef = ref(null)
defineExpose({
  divRef
})
</script>
<template>
  <div contenteditable="true" :value="value" ref="divRef"
   
   >
    {{ value }}
  </div>
</template>
