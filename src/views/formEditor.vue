<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 15:16:57
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { components } from '../utils/dict'
import { useBlock } from '../hooks/useBlock'
import basicEditor from './basic-editor.vue'
import Tip from '../components/tip.vue'
const blocks = ref([{ input: '', name: 'text' }])
const blocksRef = ref(null)
const selectList = ref(components)
const selectListVisible = ref(false)
const {
  inputEvent,
  titleEvent,
  keyPressEvent,
  titlePressEvent,
  keyDownEvent,
  isFormStart,
  focusEvent,
  blurEvent } = useBlock(blocksRef, blocks, selectList, selectListVisible)

const startForm = () => {
  isFormStart.value = true
  nextTick(() => {
    (blocksRef.value as any)[0].divRef.focus()
  })
}
const { locale } = useI18n()
const zh = () => {
  locale.value = locale.value == 'zh-cn' ? 'en-us' : 'zh-cn'
}
</script>
<template>
  <div class="container">
    <basic-editor 
      @keypress="titlePressEvent($event, 0)" 
      @input="titleEvent($event, true)"  
      class="container-title"
      data-placeholder="Form Title" 
      contenteditable="true"/>
    <div v-show="!isFormStart">
      <div class="container-tip-button">
        <div class="button" style="margin-bottom:15px" @click="startForm">
          <el-icon :size="15" style="margin-right:5px"><Edit /></el-icon>
          <span>{{ $t('button.first') }}</span>
        </div>
        <div class="button" style="" @click="zh">
          <el-icon :size="15" style="margin-right:5px;"><CopyDocument /></el-icon>
          <span>{{ $t('button.last') }}</span></div>
      </div>
      <Tip/>
    </div>
    <div v-show="isFormStart">
      <basic-editor 
        v-for="item, index in blocks" 
        :key="index" 
        :value="item.input" 
        @blur="blurEvent" 
        @input="inputEvent($event, index)" 
        @focus="focusEvent"
        @keypress="keyPressEvent($event, index)" 
        @keydown="keyDownEvent"
        ref="blocksRef" 
        class="container-block"
        data-placeholder="" >
        <component :is="item.name"></component>
      </basic-editor>
    </div>
    <div class="select" v-show="selectListVisible">
      <div v-for="item, index in selectList" :key="index"
        :class="{ 'select-item': true, 
        active: item.active && item.component != '-', noHover: item.component == '-' }"
        tabindex="0">
        <span>
          <el-icon :size="15" style="margin-right:5px" v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
        </span>
        <div v-show="item.component == '-' && index != 0" 
        style="height:1px;background-color: #eee;"></div>
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
  color      : rgb(137, 136, 132);
  font-weight: 500 !important;
  margin-top : 50px;
}

.container-tip-button .button {
  border-radius: 5px;
  padding      : 4px 8px;
  user-select  : none;
  display      : inline-block;
  cursor       : pointer;
  width        : fit-content;
  display      : flex;
  align-items  : center;
}

.container-tip-button .button:hover {
  color: rgb(55, 53, 47);

  background-color: rgba(55, 53, 47, 0.09);
}

.container-tip-button .button:hover svg {
  color: rgb(55, 53, 47);

}



.container {
  padding   : 30px 200px;
  margin-top: 30px;
}

.container-block {
  outline   : none;
  margin-top: 20px;
  padding   : 0 8px;
}

.container-title {
  padding      : 0 8px;
  outline      : none;
  margin-top   : 20px;
  font-size    : 40px;
  margin-bottom: 20px;
  font-weight  : 800;
}



.container-title:before {
  color                  : gray;
  content                : attr(data-placeholder);
  content                : attr(data-placeholder);
  font-weight            : 800;
  color                  : 2;
  caret-color            : 2;
  -webkit-text-fill-color: rgb(187, 186, 184);
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
  background   : #fff;
  line-height  : 1.6;
}

.select-item {
  padding      : 2px 10px;
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
