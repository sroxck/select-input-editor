<!--
 * @Author: sroxck
 * @Date: 2023-11-06 11:26:12
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-06 16:55:31
 * @Description: 
-->
<script setup lang="ts">
const toolList = [
  {
    name: 'fontbold', handle: () => {
      console.log('333333')
    }
  },
  {
    name: 'italic', handle: () => {
      console.log('333333')
    }
  },
  {
    name: 'zitidaxiao', handle: () => {
      console.log('333333')
    }
  },
  {
    name: 'zitixiahuaxian', handle: () => {
      console.log('333333')
    }
  },
  {
    name: 'lianjie', handle: () => {
      console.log('333333')
    }
  },
]
const divRef = ref<HTMLElement | null>(null)
defineExpose({
  divRef
})
</script>

<template>
<div class="tools" ref="divRef">
  <button v-for="item,index in toolList" :key="index">
    <el-icon @click="item.handle">
      <SvgIcon :name="item.name" size="large"></SvgIcon>
    </el-icon>
  </button>
</div></template>
<style lang="stylus">
.tools 
  z-index 22
  height 36px
  width 200px
  position absolute
  display flex
  align-items center
  justify-content space-around
  border 1px solid #eee
  border-radius 10px
  background #fff
  opacity 1
  </style>
