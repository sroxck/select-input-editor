<script lang="ts" setup>
import { nextTick, ref, unref } from 'vue';

const formTitle = ref('')
const popoverRef = ref(null)
const isShow = ref(false)
let selectedIndex = ref(-1)
const placeholderText = ref(`Type '/' to select a component`)
// 保存光标位置
function saveSelection() {
  const selection = window.getSelection() as any;
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }
  return null;
}

// 恢复光标位置
function restoreSelection(range: any) {
  const selection = window.getSelection() as any
  selection.removeAllRanges();
  selection.addRange(range);
}

function change(e: any) {
  const initData = e.target.textContent.trim()
  console.log(initData.length, 'lengthlength')
  if (initData.length <= 0) {
    e.target.setAttribute('data-placeholder', placeholderText.value)
  } else {
    e.target.removeAttribute('data-placeholder');
  }
  if (e.data == '/') {
    isShow.value = true
    // document.querySelector('.select').focus()
  }
  if (!e.target.innerText.includes('/')) {
    isShow.value = false
  }
}
// function keyup (e: any)  {
//   e.preventDefault()


// }
const updateSelection = () => {
  console.log(222222)
  for (let i = 0; i < blocks.value.length; i++) {
    if (i === selectedIndex.value) {
      blocks.value[i].isActive = true
    } else {
      blocks.value[i].isActive = false
    }
  }
}
const blocks = ref([{
  name: '下拉框',
  isActive: false,
  value: 'el-select',
},
{
  name: '输入框',
  isActive: false,

  value: 'el-input',
},
{
  isActive: false,
  name: '时间',
  value: 'el-time-select',
}
  ,

{
  isActive: false,
  name: '评分',
  value: 'el-rate',
}])
// function keypress(e:any){
// e.preventDefault();
// return false
// }
// 保存光标位置
function keydown(e: any) {

  if (e.code == 'Enter') {

    // 在这里进行内容修改
    // e.target.innerHTML = ...


    e.preventDefault()
    if (!isShow.value) {
      textList.value.push({ value: 2,name:'text' });
      nextTick(() => {
        (text.value as any).at(-1).focus()
      })
    }
    if (isShow.value) {
      // 添加组件
      console.log(blocks.value[selectedIndex.value].name, 'selectedIndex')
      // e.target.innerText += blocks.value[selectedIndex.value].name
      // 将元素的光标移动到最后
      // var range = document.createRange();
      // range.selectNodeContents(text.value[text.value.length-1]);
      // range.collapse(false);
      // var sel = window.getSelection();
      // sel.removeAllRanges();
      // sel.addRange(range);
      textList.value.push({ value: 2,name:blocks.value[selectedIndex.value].value });
      e.target.blur()
     nextTick(()=>{
      console.log()
      text.value.at(-1).removeAttribute('data-placeholder')
     })
      isShow.value = false
    }


  }
  if (e.code == 'ArrowDown') {
    // 下箭头事件
    e.preventDefault(); // 阻止默认滚动行为
    selectedIndex.value = Math.min(blocks.value.length - 1, selectedIndex.value + 1);
    updateSelection();
  }
  if (e.code == 'ArrowUp') {
    // 上箭头事件
    e.preventDefault(); // 阻止默认滚动行为
    selectedIndex.value = Math.max(0, selectedIndex.value - 1);
    updateSelection();
  }

}
const dataShow = ref('none')
function focus(e: any) {
  console.log(e.target.innerText.length)
  if (e.target.innerText.length == 0) {
    console.log('双所属')
    e.target.setAttribute('data-placeholder', placeholderText.value)
  }

}
function blur(e: any) {
  e.target.removeAttribute('data-placeholder')

}
const textList = ref([
  { value: 1 ,name:'text'}
])
const text = ref(null)
</script>
<template>
  <div class="" style="margin-top:30px;padding:30px 300px">
    <div ref="text" v-for="item, index in textList" :key="item.value" class="isBlock" @blur="blur" @focus="focus"
      @click="dataShow = 'block'" data-placeholder="click this" contenteditable="true" @input="change" @keydown="keydown">
      <component :is="item.name"></component>
    </div>
    <div class="select" v-show="isShow">
      <div :class="['item', item.isActive ? 'active' : '']" tabindex="0" v-for="item in blocks" :key="item.value">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style>
.isBlock {
  outline: none;
  margin-top: 20px;
  /* border-bottom: 1px solid #000; */
}

.isBlock:before {
  content: attr(data-placeholder);
  color: gray;
}



.select {
  overflow: auto;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.item {
  padding: 2px 10px;
  border-radius: 5px;

}

.item:hover {
  background-color: rgba(55, 53, 47, 0.09);
}

.active {
  background-color: rgba(55, 53, 47, 0.09);

}
</style>
