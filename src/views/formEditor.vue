<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 10:24:59
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { components } from '../utils/dict'
import { useBlock } from '../hooks/useBlock'
import basicEditor from './basic-editor.vue'
const blocks = ref([{ input: '', name: 'text1' }, { input: '', name: 'text2' }, { input: '', name: 'text3' }, { input: '', name: 'text4' }, { input: '', name: 'text5' }])
const blocksRef = ref(null)
const selectList = ref(components)
const selectListVisible = ref(false)

const {
  inputEvent,
  keyPressEvent,
  keyDownEvent,
  focusEvent,
  blurEvent } = useBlock(blocksRef, blocks, selectList, selectListVisible)
onMounted(() => {
  console.log(blocksRef,
    'blocksRef')
})

</script>
<template>
  <div class="container">
    <basic-editor ref="" class="container-title" data-placeholder="Form Title" contenteditable="true">
    </basic-editor>
    <div class="container-tip-button">
      <div class="button" style="margin-bottom:15px">
        <el-icon :size="15" style="margin-right:5px">
          <Edit />
        </el-icon><span>Press Enter to start form create</span>
      </div>
        <div class="button"  style=""><el-icon :size="15" style="margin-right:5px;">
            <CopyDocument />
          </el-icon><span>Use a template</span></div>
    </div>
    <div class="tip">
      This is a form builder that 
      <em>works like a doc</em>.
      <br>
      Just type 
      <em>/</em>
      to insert form blocks 
    </div>
    <basic-editor ref="blocksRef" :value="item.input" v-for="item, index in blocks" :key="index" class="container-block"
      data-placeholder="" contenteditable="true" @blur="blurEvent" @input="inputEvent($event, index)" @focus="focusEvent"
      @keypress="keyPressEvent($event, index)" @keydown="keyDownEvent">
      <h3>{{ item.input }}</h3>
      <component :is="item.name"></component>
    </basic-editor>
    <div class="select" v-show="selectListVisible">
      <div v-for="item, index in selectList" :key="index"
        :class="{ 'select-item': true, active: item.active && item.component != '-', noHover: item.component == '-' }"
        tabindex="0">
        <div v-show="item.component == '-' && index != 0" style="height:1px;background-color: #eee;"></div>
        <span v-show="item.component == '-'" class="category">
          {{ item.name }}
        </span>
        <span v-show="item.component != '-'">{{ item.name }}</span>

      </div>
    </div>
  </div>
</template>

<style>
.container-tip-button {
  color: rgb(137, 136, 132);
  font-weight: 500 !important;
}

.container-tip-button .button{
  /* height: 24px; */
  /* line-height: 24px; */
  border-radius: 5px;
  padding: 2px 8px;display: inline-block;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
}
.container-tip-button .button:hover {
  color: rgb(55, 53, 47);

  background-color: rgba(55, 53, 47, 0.09);
}
.container-tip-button .button:hover svg{
  color: rgb(55, 53, 47);

}
.tip{
  margin-top: 40px;
  padding: 0 8px;
  color: rgb(55, 53, 47);
    line-height: 1.5;
    font-size: 16px;
}
.tip em{
  position: relative;
    font-style: normal;
    font-weight: bold;
    background: rgba(248, 28, 229, 0.125);
    color: rgb(248, 28, 229);
    padding: 0px 3px;
}
.container {
  padding: 30px 200px;
  margin-top: 30px;
}

.container-block {
  outline: none;
  margin-top: 20px;
}

.container-title {
  padding: 0 8px;
  outline: none;
  margin-top: 20px;
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: 800;
}

.container-block:before {
  font-size: 40px;
  display: block;
  color: gray;
  content: attr(data-placeholder);
}

.container-title:before {
  color: gray;
  content: attr(data-placeholder);
  content: attr(data-placeholder);
  font-weight: 800;
  color: 2;
  caret-color: 2;
  -webkit-text-fill-color: rgb(187, 186, 184);
}

.container-block:before {
  color: gray;
  content: attr(data-placeholder);
}

.select {
  z-index: 9999 !important;
  position: absolute;
  border: 1px solid #eee;
  padding: 5px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  width: 300px;
  max-height: 321px;
  background: #fff;

}

.select-item {
  padding: 2px 10px;
  border-radius: 5px;
}

.select-item:hover {
  background-color: rgba(55, 53, 47, 0.09);
}

.noHover:hover {
  background-color: #fff !important;
}

.active {
  background-color: rgba(55, 53, 47, 0.09);
}

.category {
  font-size: 12px;
}
</style>
