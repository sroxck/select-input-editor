<!--
 * @Author: sroxck
 * @Date: 2023-10-26 10:16:50
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-26 10:43:37
 * @Description: 
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale } = useI18n()


</script>

<template>
  <div class="tool">
    <div>
      <span><el-icon><Star /></el-icon></span>
      <div>

        <el-dropdown @command="(value: string) => locale = value">
          <button>{{$t('button.language')}}</button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
              <el-dropdown-item command="en-us">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <button style="color: rgb(0, 112, 215);">{{$t('button.preview')}}</button>
        <button style="background: rgb(0, 112, 215);color:#fff;">{{$t('button.publish')}}</button>
      </div>
    </div>
  </div>
</template>
<style>
button {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
  height: 28px;
  padding: 0px 8px;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  white-space: nowrap;
  transition: color 100ms ease-in 0s;
  text-align: left;
  color: rgb(119, 118, 114);
  background-color: transparent;

}

.tool {
  position: fixed;
  z-index: 100000000;
  top: 0px;
  right: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 10px 14px 10px 20px;
  background: rgb(255, 255, 255);
  left: 0px;
}

.tool>div {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
