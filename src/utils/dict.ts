/*
 * @Author: sroxck
 * @Date: 2023-10-19 16:05:30
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-20 10:51:16
 * @Description: 
 */
export const textPlaceHolder = `Type '/' to select a component`
export const components = [
  {
    name:'输入组件',
    component:'-',
    active:false,
  },
  {
    name:'select',
    component:'el-select',
    active:false,
  },
  {
    name:'input',
    component:'el-input',
    active:false,
  },
  {
    name:'time',
    component:'el-time-select',
    active:false,
  },
  {
    name:'rate',
    component:'el-rate',
    active:false,
  },
  {
    name:'input-number',
    component:'el-input-number',
    active:false,
  },
  {
    name:'文本组件',
    component:'-',
    active:false,
  },
  {
    name:'input2',
    component:'el-input1',
    active:false,
  },
  {
    name:'time2',
    component:'el-time-select2',
    active:false,
  },
  {
    name:'rate3',
    component:'el-rate3',
    active:false,
  },
  {
    name:'input-number4',
    component:'el-input-number4',
    active:false,
  },
]
 // 将元素的光标移动到最后
        // var range = document.createRange();
        // range.selectNodeContents(text.value[text.value.length-1]);
        // range.collapse(false);
        // var sel = window.getSelection();
        // sel.removeAllRanges();
        // sel.addRange(range);
