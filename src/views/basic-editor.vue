<!--
 * @Author: sroxck
 * @Date: 2023-10-23 16:12:03
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-06 15:10:02
 * @Description: 
-->
<script setup lang="ts">
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
  console.log(divRef.value,'22')
  if(props.name == 'text' || props.name == '' || props.name == undefined){
    console.log( props.value,'vvv')
    divRef.value!.innerHTML = props.value || ''
  }else{
    console.log( props.name,' props.name')
    console.log( props.value,'vvveee')

  }
})
</script>
<template>
  <div :contenteditable="edit" :value="value" ref="divRef">
    <div></div>
    <slot></slot>
  </div>
</template>
