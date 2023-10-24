/*
 * @Author: sroxck
 * @Date: 2023-10-19 16:23:39
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 11:14:12
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
    selectListVisible.value = false
    activeSelectIndex.value = 0
    e.target.removeAttribute('data-placeholder')

  }

  /** */
  const titleEvent = (event: Event, title: boolean) => {
    console.log(event)
    const e = event as BlockEvent
    if (e.target.innerText.length != 0) {
      e.target.setAttribute('data-placeholder', '');
    } else {
      e.target.setAttribute('data-placeholder', title ? 'Form Title' : textPlaceHolder)
    }
    selectList.value = components
  }

  /** 获取焦点: 如果输入框无文本,则增加PlaceHolder */
  const focusEvent = (event: Event, title: boolean) => {
    console.log(event)
    const e = event as BlockEvent
    if (e.target.innerText.length != 0) {
      e.target.setAttribute('data-placeholder', '');
    } else {
      e.target.setAttribute('data-placeholder', title ? 'Form Title' : textPlaceHolder)
    }
    selectList.value = components
  }

  /**
   * 输入事件
   * 1. 如果输入 '/' 则开启 select 组件选择下拉列表,否则关闭
   * 2. 如果在 '/' 后继续输入,则开启搜索模式,匹配下拉列表中包含输入的值并显示
   * @param BlockEvent 
   */
  const inputEvent = (event: Event, index: Number) => {
    console.log(event, 'event', index)
    const e = event as BlockEvent
    blocks.value[String(index)].input = e.target.innerText

    console.log(e, 'e')
    const initData = e.target.textContent!
    e.target.setAttribute('data-placeholder', initData.length <= 0 ? textPlaceHolder : '');
    if (e.data == '/') {
      const lastTextNode = e.target.lastChild;
      const range = document.createRange();
      range.selectNode(lastTextNode!);
      const rect = range.getBoundingClientRect();
      console.log(rect, 'rect')
      const select: any = document.querySelector('.select')!
      select.style.top = `${rect.bottom}px`;
      select.style.left = `${rect.left}px`;
      selectListVisible.value = true
    }
    if (!e.target.innerText.includes('/')) {
      selectListVisible.value = false
    }
    if (e.target.innerText.includes('/')) {
      const component = e.target.innerText.split('/').at(-1)!
      if (component == '') return selectList.value = components
      console.log(222222)
      selectList.value = components.filter(item => item.name.includes(component)).length > 0 ? components.filter(item => item.name.includes(component)) : [{
        name: '暂无匹配数据',
        component: 'none',
        active: false,
      }]
    }
  }

  /**
   * 键盘事件
   * 如果按下 'Enter' 则进入判断,Select下拉列表处于开启时,新增当前选择的组件,否则新增一个文本
   * @param BlockEvent 
   */
  const keyPressEvent = (event: Event, index: number) => {
    const e = event as BlockEvent as any
    // 获取光标之后的文本,回车的时候如果光标后面有文本则换到下一行 
    const text = e.target.innerText.split('/')
    const value = e.target.innerText
    const selObj = window.getSelection()!.anchorOffset;
    const enterTextBefore = value.split('').splice(selObj).join('')
    if (e.code == 'Enter') {
      e.preventDefault()
      if (!selectListVisible.value) {
        blocks.value.splice(index + 1, 0, { input: `` });
        // 把当前行光标后的内容替换为空
        e.target.innerText = e.target.innerText.replace(enterTextBefore, '')
        //设置回车后的下一行的内容为光标后的值
        blocks.value[index + 1].input = enterTextBefore
        nextTick(() => {
          blocksRef.value.at(Number(index) + 1).divRef.focus()
        })
      }
      if (selectListVisible.value) {
        if (selectList.value[activeSelectIndex.value]?.component == 'none') return
        blocks.value.push({ name: selectList.value[activeSelectIndex.value]?.component || '' });

        e.target.innerText = text.slice(0, text.length - 1).join('/')
        e.target.blur()
        selectListVisible.value = false
        activeSelectIndex.value = 0
        updateSelection()
        nextTick(() => {
          blocksRef.value.at(-1).removeAttribute('data-placeholder');
          blocksRef.value.at(-1).setAttribute('contenteditable', 'false')
          blocks.value.push({ name: 'text' });
          blocksRef.value.at(-1).focus()
        })

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
  onMounted(() => updateSelection())
  const isFormStart = ref(false)

  const titlePressEvent = (event: Event, index: number = 0) => {
    const e = event as BlockEvent as any
    // 获取光标之后的文本,回车的时候如果光标后面有文本则换到下一行 
    const value = e.target.innerText
    const selObj = window.getSelection()!.anchorOffset;
    const enterTextBefore = value.split('').splice(selObj).join('')
    if (e.code == 'Enter') {
      e.preventDefault()
      isFormStart.value = true
      if (!selectListVisible.value) {
        // blocks.value.splice(0, 0, { input: `` });
        // 把当前行光标后的内容替换为空
        e.target.innerText = e.target.innerText.replace(enterTextBefore, '')
        //设置回车后的下一行的内容为光标后的值
        blocks.value[0].input = enterTextBefore
        nextTick(() => {
          blocksRef.value.at(0).divRef.focus()
        })
      }
    }
  }
  return {
    isFormStart,
    titleEvent,
    titlePressEvent,
    inputEvent,
    keyPressEvent,
    keyDownEvent,
    focusEvent,
    blurEvent,
  }
}
