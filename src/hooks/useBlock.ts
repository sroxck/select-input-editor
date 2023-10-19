/*
 * @Author: sroxck
 * @Date: 2023-10-19 16:23:39
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-19 17:21:57
 * @Description: 
 */
import type { BlockEvent } from "@/utils/type"
import { components, textPlaceHolder } from '../utils/dict'
import { nextTick, onMounted, ref, type Ref } from "vue"

const activeSelectIndex = ref(0)

export function useBlock(blocksRef: Ref, blocks: Ref, selectList: Ref, selectListVisible: Ref) {

  /** 失去焦点: 移除PlaceHolder */
  const blurEvent = (event: Event) => {
    const e = event as BlockEvent
    e.target.removeAttribute('data-placeholder')
  }

  /** 获取焦点: 如果输入框无文本,则增加PlaceHolder */
  const focusEvent = (event: Event) => {
    const e = event as BlockEvent
    if (e.target.innerText.length != 0) return
    e.target.setAttribute('data-placeholder', textPlaceHolder)
  }

  /**
   * 输入事件
   * 1. 如果输入 '/' 则开启 select 组件选择下拉列表,否则关闭
   * 2. 如何在 '/' 后继续输入,则开启搜索模式,匹配下拉列表中包含输入的值并显示
   * @param BlockEvent 
   */
  const inputEvent = (event: Event) => {
    const e = event as BlockEvent
    const initData = e.target.textContent!
    e.target.setAttribute('data-placeholder', initData.length <= 0 ? textPlaceHolder : '');
    if (e.data == '/') {
      selectListVisible.value = true
    }
    if (!e.target.innerText.includes('/')) {
      selectListVisible.value = false
    }
    if (e.target.innerText.includes('/')) {
      const component = e.target.innerText.split('/').at(-1)!
      if (component == '') return selectList.value = components
      selectList.value = components.filter(item => item.name.includes(component))
    }
  }

  /**
   * 键盘事件
   * 如果按下 'Enter' 则进入判断,Select下拉列表处于开启时,新增当前选择的组件,否则新增一个文本
   * @param BlockEvent 
   */
  const keyPressEvent = (event: Event) => {
    const e = event as BlockEvent
    if (e.code == 'Enter') {
      e.preventDefault()
      if (!selectListVisible.value) {
        nextTick(() => {
          blocks.value.push({ name: 'blocksRef' });
          (blocksRef.value as any).at(-1).focus()
        })
      }
      if (selectListVisible.value) {
        blocks.value.push({ name: selectList.value[activeSelectIndex.value]?.component || '' });
        e.target.blur()
        nextTick(() => {
          (blocksRef.value as any).at(-1).removeAttribute('data-placeholder');
          (blocksRef.value as any).at(-1).setAttribute('contenteditable', 'false')
          blocks.value.push({ name: 'text' });
        })
        selectListVisible.value = false
        activeSelectIndex.value = 0
        updateSelection()
      }
    }
  }

  /** 更新当前方向键所选择的组件的index */
  const updateSelection = () => {
    for (let i = 0; i < selectList.value.length; i++) {
      if (i === activeSelectIndex.value) {
        selectList.value[i].active = true
      } else {
        selectList.value[i].active = false
      }
    }
  }

  /** 注册方向按键事件,获取当前所选择的组件 */
  const keyDownEvent = (e: any) => {
    // 下箭头事件
    if (e.code == 'ArrowDown') {
      e.preventDefault();
      activeSelectIndex.value = Math.min(selectList.value.length - 1, activeSelectIndex.value + 1);
      updateSelection();
    }
    if (e.code == 'ArrowUp') {
      // 上箭头事件
      e.preventDefault();
      activeSelectIndex.value = Math.max(0, activeSelectIndex.value - 1);
      updateSelection();
    }
  }
  onMounted(()=>updateSelection())
  return {
    inputEvent,
    keyPressEvent,
    keyDownEvent,
    focusEvent,
    blurEvent,
  }
}
