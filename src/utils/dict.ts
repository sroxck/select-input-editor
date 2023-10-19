/*
 * @Author: sroxck
 * @Date: 2023-10-19 16:05:30
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-19 17:00:01
 * @Description: 
 */
export const textPlaceHolder = `Type '/' to select a component`
export const components = [
  {
    name:'select:下拉框',
    component:'el-select',
    active:false,
  },
  {
    name:'input:输入框',
    component:'el-input',
    active:false,
  },
  {
    name:'time:时间选选择器',
    component:'el-time-select',
    active:false,
  },
  {
    name:'rate:星级评分',
    component:'el-rate',
    active:false,
  },
  {
    name:'input-number:数字输入框',
    component:'el-input-number',
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
