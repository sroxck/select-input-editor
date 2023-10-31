<!--
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-31 11:48:35
 * @Description: 输入型下拉选择器扩展
-->
<script lang="ts" setup>
import { nextTick, ref,unref } from 'vue';
import { components } from '../utils/dict'
import { useBlock } from '../hooks/useBlock'
import basicEditor from './basic-editor.vue'
import FormTip from '../components/form-tip.vue'
import ToolBar from '../components/tool-bar.vue'
import FormList from '../components/form-list.vue'
const blocks = ref([{ input: '', name: 'text' }])
const blocksRef = ref<any>(null)
const selectList = ref(components)
const selectListVisible = ref(false)
import { useTextSelection } from '@vueuse/core'
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
const tools = ref<HTMLElement>()
const currentSelectText = ref('') // 当前选中的文字
const currentSelectIndex = ref(0)
const blockIndex = ref(0)
document.addEventListener('selectionchange', function () {
  // if(state.selection.value.focusOffset!=0){
  //   console.log('测试')
  //   currentSelect = state.selection.value
  // }

});

const mousedownEvent = (e:Event) =>{
 
}
const mouseupEvent = (e: Event, index: number) => {
  blockIndex.value = index
  console.log(state,'state')
  currentSelectIndex.value =  state.ranges.value[0].startOffset
  currentSelectText.value = window.getSelection()!;
  console.log(currentSelectText,'currentSelectText')
  if (currentSelectText.value == '' ) {
    toolShow.value= false
  } else { 
    toolShow.value= true
    tools.value!.style.top = (state.rects.value[0].top + 20) + 'px'
    tools.value!.style.left = (state.rects.value[0].left) + 'px'
  }
}

const jc = (e:any) => {
  console.log(currentSelectIndex,currentSelectText,'加粗按钮被激活')
  // todo: 1 文字匹配需要 根据索引 避免相同文字
  // 2: 需要可以覆盖标签  
  const text = blocksRef.value[blockIndex.value].divRef.innerHTML
  const newText = text.slice(currentSelectIndex.value).replace(unref(currentSelectText),`<b>${unref(currentSelectText)}</b>`)
  const res = text.slice(0, currentSelectIndex.value) + newText
  blocks.value[blockIndex.value].input = res
  blocksRef.value[blockIndex.value].divRef.innerHTML = res
  toolShow.value = false
    console.log("🚀 ~ file: formEditor.vue:84 ~ jc ~ res:", res)
    console.log(text,'text')
  // const newText =text.slice(0, currentSelect.value) + text.slice(currentSelect.value).replace(currentSelectText.value, `<b>${currentSelectText.value}</b>`);
  // console.log(newText, 'newText', text)
  // blocks.value[currentSelectIndex.value].input = newText
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
    <div class="tools" ref="tools" v-show="toolShow">
      <el-button>
        <el-icon @click="jc">
        <SvgIcon name="fontbold" size="large"></SvgIcon>
      </el-icon>
      </el-button>
     <el-button>
      <el-icon>
        <SvgIcon name="italic" size="large"></SvgIcon>
      </el-icon>
     </el-button>
     <el-button>
      <el-icon>
        <SvgIcon name="zitidaxiao" size="large"></SvgIcon>
      </el-icon>
     </el-button>
    <el-button>
      <el-icon>
        <SvgIcon name="zitixiahuaxian" size="large"></SvgIcon>
      </el-icon>
    </el-button>
     <el-button>
      <el-icon>
        <SvgIcon name="lianjie" size="large"></SvgIcon>
      </el-icon>
     </el-button>
    </div>
    <tool-bar></tool-bar>
    <basic-editor @keypress="titlePressEvent($event, 0)" @input="titleEvent($event, true)" class="container-title"
      data-placeholder="Form title" contenteditable="true" />
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
        <basic-editor :name="item.name" :value="item.input" @mousedown="mousedownEvent" @mouseup="mouseupEvent($event, index)" @blur="blurEvent"
          @input="inputEvent($event, index)" @focus="focusEvent" @keypress="keyPressEvent($event, index)"
          @keydown="keyDownEvent($event, index)" ref="blocksRef" class="container-block" data-placeholder="">
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

<style lang="stylus">
.box
 position relative


.tools {
  z-index: 22;
  height: 36px;
  width: 200px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  opacity: 1;

}

.box:focus-within .iconBox {
  display: block;
}

.box:hover .iconBox {
  display: block;
}

.container-tip-button {
  color: rgb(137, 136, 132);
  font-weight: 500 !important;
  margin-top: 50px;
}

.container-tip-button .button {
  border-radius: 5px;
  padding: 4px 8px;
  user-select: none;
  display: inline-block;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
}

.action {
  top: 3px !important;
}

.iconBox {
  display: none;
  position: absolute;
  top: -3px;
  left: -70px;
}

.container-tip-button .button:hover {
  color: rgb(55, 53, 47);

  background-color: rgba(55, 53, 47, 0.09);
}

.container-tip-button .button:hover svg {
  color: rgb(55, 53, 47);

}


.el-icon {
  padding: 3px !important;
  box-sizing: border-box !important;
  width: 24px !important;
  height: 24px !important;
  border-radius: 5px;

}

.el-icon:hover {
  background-color: rgba(55, 53, 47, 0.09);
}

.container {
  padding: 30px 200px;
  margin-top: 30px;
}

.container-block {
  outline: none;
  margin-top: 20px;
  padding: 0 8px;
}


.container-title {
  padding: 0 8px;
  outline: none;
  margin-top: 20px;
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: 800;
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
  line-height: 1.6;
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
