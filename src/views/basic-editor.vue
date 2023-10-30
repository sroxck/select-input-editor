<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-30 14:08:44
 * @Description: 
-->
<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
const props = defineProps<{
  value?: string,
  name?:string
}>()

const divRef = ref<HTMLElement | null>(null)
defineExpose({
  divRef
})
const edit: any = 'plaintext-only'
onMounted(() => {
  if(props.name == 'text' || props.name == '' || props.name == undefined){
    console.log( props.value,'vvv')
    divRef.value!.innerText = props.value || ''
  }else{
    console.log( props.name,' props.name')
    console.log( props.value,'vvveee')

  }
})
</script>
<template>
  <div :contenteditable="edit" :value="value" ref="divRef">
    {{ value }}
    <slot></slot>
  </div>
</template>
