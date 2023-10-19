<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-19 17:07:55
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { ref } from 'vue';
import { components } from '../utils/dict'
import { useBlock } from '../hooks/useBlock'
const blocks = ref([{ name: 'text' }])
const blocksRef = ref(null)
const selectList = ref(components)
const selectListVisible = ref(false)

const { 
  inputEvent, 
  keyPressEvent, 
  keyDownEvent, 
  focusEvent, 
  blurEvent } = useBlock(blocksRef, blocks, selectList, selectListVisible)

</script>
<template>
  <div class="container">
    <div ref="blocksRef" v-for="item in blocks" :key="item.name" 
      class="container-block" 
      data-placeholder="click this"
      contenteditable="true" 
      @blur="blurEvent" 
      @focus="focusEvent" 
      @input="inputEvent" 
      @keypress="keyPressEvent"
      @keydown="keyDownEvent">
      <component :is="item.name"></component>
    </div>
    <div class="select" v-show="selectListVisible">
      <div 
        v-for="item in selectList" 
        :key="item.component"
        :class="{'select-item':true,active:item.active}" 
        tabindex="0">
          {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style>
.container{
  padding   : 30px 300px;
  margin-top: 30px;
}
.container-block{
  outline   : none;
  margin-top: 20px;
}
.container-block:before {
  color  : gray;
  content: attr(data-placeholder);
}
.select {
  border       : 1px solid #eee;
  padding      : 5px;
  overflow     : auto;
  border-radius: 6px;
}
.select-item {
  padding      : 2px 10px;
  border-radius: 5px;
}
.select-item:hover {
  background-color: rgba(55, 53, 47, 0.09);
}
.active {
  background-color: rgba(55, 53, 47, 0.09);
}
</style>
