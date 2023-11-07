<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-07 09:36:15
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { useBlock } from '@/hooks/useBlock';
import { components } from '@/utils/dict';

const blocks = ref([{ input: '', name: 'text' }])
const blocksRef = ref<any>(null)
const selectList = ref(components)
const selectListVisible = ref(false)
const state = useTextSelection()
const life = ref(true)

const {
  inputEvent,
  titleEvent,
  keyPressEvent,
  titlePressEvent,
  keyDownEvent,
  isFormStart,
  focusEvent,
  blurEvent } = useBlock(blocksRef, blocks, selectList, selectListVisible, life)

const startForm = () => {
  isFormStart.value = true
  nextTick(() => {
    (blocksRef.value as any)[0].divRef.focus()
  })
}
const deleteCurrentItem = (index: number) => {
  if (index == 0 && blocks.value.length <= 1) return
  life.value = false
  blocks.value.splice(index, 1)
  nextTick(() => {
    life.value = true
  })
}
const toolShow = ref<boolean>(false)
const tools = ref<HTMLElement | any>()
const currentSelectText: any = ref('') // 当前选中的文字
const currentSelectIndex = ref(0)
const blockIndex = ref(0)
document.addEventListener('selectionchange', function () {
  // if(state.selection.value.focusOffset!=0){
  //   console.log('测试')
  //   currentSelect = state.selection.value
  // }

});

const mousedownEvent = (e: Event) => {

}
const mouseupEvent = (e: Event, index: number) => {
  blockIndex.value = index
  console.log(state.text, 'state')
  currentSelectIndex.value = state.ranges.value[0].startOffset
  currentSelectText.value = window.getSelection()!;
  // setTimeout(()=>{
  // console.log( currentSelectText.value,currentSelectText.value.isCollapsed, 'currentSelectText.value.isCollapsed')

  // },1000)
  setTimeout(() => {
    if (currentSelectText.value.isCollapsed ) {
    toolShow.value = false
  } else {
    toolShow.value = true
    console.log(tools.value, 'tools.value')
    tools.value!.divRef.style.top = (state.rects.value[0].top + 20) + 'px'
    tools.value!.divRef.style.left = (state.rects.value[0].left) + 'px'
  }
  }, 100)
 
}
const select = useTextSelection()
const jc = (e: any) => {
  console.log(currentSelectIndex, currentSelectText, '加粗按钮被激活')
  // todo: 1 文字匹配需要 根据索引 避免相同文字
  // 2: 需要可以覆盖标签  
  // const text = blocksRef.value[blockIndex.value].divRef.innerHTML
  // const newText = text.slice(currentSelectIndex.value).replace(unref(currentSelectText),`<b>${unref(currentSelectText)}</b>`)
  // const res = text.slice(0, currentSelectIndex.value) + newText
  // blocks.value[blockIndex.value].input = res
  // blocksRef.value[blockIndex.value].divRef.innerHTML = res
  // toolShow.value = false
  //   console.log("🚀 ~ file: formEditor.vue:84 ~ jc ~ res:", res)
  //   console.log(text,'text')
  var selection = window.getSelection();
  var range = selection?.getRangeAt(0);
  var span = document.createElement('span');
  span.style.backgroundColor = 'red'
  range && range.surroundContents(span);
  //   匹配每个字
  console.log(range!.startContainer.innerHTML, 'span')
  // e.target.innerHTML = e.target.innerHTML.replace(select.text.value, `<span style="background:red;color:#fff">${select.text.value}</span>`)
  blocks.value[blockIndex.value].input = range!.startContainer.innerHTML
  // console.log(e.target)
  // blocksRef.value[blockIndex.value].divRef.setAttribute('data-value',JSON.stringify(e.target.innerHTML))

  // const newText =text.slice(0, currentSelect.value) + text.slice(currentSelect.value).replace(currentSelectText.value, `<b>${currentSelectText.value}</b>`);
  // console.log(newText, 'newText', text)
  // console.log(blocks.value[currentSelectIndex.value], 'blocks.value[currentSelectIndex.value]')
  // blocksRef.value[currentSelectIndex.value].divRef.innerHTML = newText
  // tools.value!.style.opacity = '0'
}


// 组件列表的点击事件
const selectComponent = (item, index) => {
  if (selectListVisible.value) {
    // if (selectList.value[index.value]?.component == 'none') return
    // blocks.value.push({ name: item?.component || '' ,input:''});
    // // e.target.innerText = text.slice(0, text.length - 1).join('/')
    // // e.target.blur()
    // // selectListVisible.value = false
    // // index.value = 0
    // // updateSelection()
    // nextTick(() => {
    //   // blocksRef.value!.at(-1).divRef.removeAttribute('data-placeholder');
    //   // blocksRef.value!.at(-1).divRef.setAttribute('contenteditable', 'false')
    //   // blocks.value.push({ name: 'text' ,input:''});
    //   // blocksRef.value.at(-1).divRef.focus()
    // })

  }
}
</script>
<template>
  <div class="container">
    <ActiveBar ref="tools" v-show="toolShow"></ActiveBar>
    <tool-bar></tool-bar>
    <basic-editor
      @keypress="titlePressEvent($event, 0)"
      @input="titleEvent($event, true)"
      class="container-title"
      data-placeholder="Form title"
      contenteditable="true" />
    <div v-show="!isFormStart">
      <div class="container-tip-button">
        <div class="button" style="margin-bottom:15px" @click="startForm">
          <el-icon :size="15" style="margin-right:5px">
            <Edit />
          </el-icon>
          <span>{{ $t('button.first') }}</span>
        </div>
        <div class="button" style="">
          <el-icon :size="15" style="margin-right:5px;">
            <CopyDocument />
          </el-icon>
          <span>{{ $t('button.last') }}</span>
        </div>
      </div>
      <form-tip />
    </div>
    <div v-if="isFormStart && life">

      <div v-for="item, index in blocks" :key="index" class="box">
        <div :class="['iconBox', !['text', '', null, undefined].includes(item.name) ? 'action' : '']">
          <el-icon @click="deleteCurrentItem(index)">
            <SvgIcon name="shanchu" size="large"></SvgIcon>
          </el-icon>
          <el-icon>
            <SvgIcon name="tianjia" color="primary" size="large"></SvgIcon>
          </el-icon>
          <el-icon>
            <SvgIcon name="tuozhuai" color="primary" size="large"></SvgIcon>
          </el-icon>
        </div>
        <basic-editor 
          :name="item.name" 
          :value="item.input" 
          @mousedown="mousedownEvent"
          @mouseup="mouseupEvent($event, index)" 
          @blur="blurEvent" 
          @input="inputEvent($event, index)" 
          @focus="focusEvent"
          @keypress="keyPressEvent($event, index)" 
          @keydown="keyDownEvent($event, index)" 
          ref="blocksRef"
          class="container-block" 
          data-placeholder="">
          <component :is="item.name"></component>
        </basic-editor>
      </div>

    </div>
    <FormList v-show="!isFormStart"></FormList>
    <div class="select" v-show="selectListVisible">
      <div @mousedown="selectComponent(item, index)" v-for="item, index in selectList" :key="index" :class="{
        'select-item': true,
        active: item.active && item.component != '-', noHover: item.component == '-'
      }" tabindex="0">
        <span>
          <el-icon :size="15" style="margin-right:5px" v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
        </span>
        <div v-show="item.component == '-' && index != 0" style="height:1px;background-color: #eee;"></div>
        <span v-show="item.component == '-'" class="category">
          {{ item.name }}
        </span>
        <span v-show="item.component != '-'">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" src="./editor.styl"></style>
