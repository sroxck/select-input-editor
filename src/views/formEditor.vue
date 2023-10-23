<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-23 17:35:18
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { components } from '../utils/dict'
import { useBlock } from '../hooks/useBlock'
import basicEditor from './basic-editor.vue'
const blocks = ref([{ input:'',name: 'text1' },{ input:'',name: 'text2' },{ input:'',name: 'text3' },{ input:'',name: 'text4' },{ input:'',name: 'text5' }])
const blocksRef = ref(null)
const selectList = ref(components)
const selectListVisible = ref(false)

const { 
  inputEvent, 
  keyPressEvent, 
  keyDownEvent, 
  focusEvent, 
  blurEvent } = useBlock(blocksRef, blocks, selectList, selectListVisible)
onMounted(()=>{
  console.log(blocksRef,
  'blocksRef')
})

</script>
<template>
  <div class="container">
    <basicEditor ref="blocksRef" :value="item.input" v-for="item,index in blocks" :key="index" 
      class="container-block" 
      data-placeholder=""
      contenteditable="true" 
      @blur="blurEvent" 
      @input="inputEvent($event,index)"
      @focus="focusEvent" 
      @keypress="keyPressEvent($event, index)"
      @keydown="keyDownEvent">
      <h3>{{ item.input }}</h3>
      <component :is="item.name"></component>
    </basicEditor>
    <div class="select" v-show="selectListVisible">
      <div 
        v-for="item,index in selectList" 
        :key="index"
        :class="{'select-item':true,active:item.active &&item.component!='-',noHover:item.component=='-'}" 
        tabindex="0">
        <div v-show="item.component=='-'&&index!=0"  style="height:1px;background-color: #eee;"></div>
        <span v-show="item.component=='-'" class="category">
          {{ item.name }}
        </span>
        <span v-show="item.component !='-'">{{ item.name }}</span>
          
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
  z-index      : 9999 !important;
  position     : absolute;
  border       : 1px solid #eee;
  padding      : 5px;
  overflow     : auto;
  border-radius: 6px;
  box-shadow   : rgba(0, 0, 0, 0.09) 0px 3px 12px;
  width        : 300px;
  max-height   : 321px;
  background: #fff;

}
.select-item {
  padding      : 2px 10px;
  border-radius: 5px;
}
.select-item:hover {
  background-color: rgba(55, 53, 47, 0.09);
}
.noHover:hover {
  background-color: #fff!important;
}
.active {
  background-color: rgba(55, 53, 47, 0.09);
}
.category{
  font-size: 12px;
}
</style>
