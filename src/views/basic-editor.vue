<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-30 10:40:03
 * @Description: 
-->
<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
const props = defineProps<{
  value?: string,
}>()

const divRef = ref<HTMLElement | null>(null)
defineExpose({
  divRef
})

const edit: any = 'plaintext-only'
onMounted(() => {
  divRef.value!.innerHTML = props.value || ''
})
</script>
<template>
  <div :contenteditable="edit" :value="value" ref="divRef">
    {{ value }}
    <slot></slot>
  </div>
</template>
