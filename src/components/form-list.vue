<!--
 * @Author: sroxck
 * @Date: 2023-10-24 15:19:54
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 17:51:38
 * @Description: 
-->
<script setup lang="ts">


</script>

<template>
  <el-row class="list">
    <el-col class="list-item" :span="12" :xs="24">
        <div class="title">
         
          {{$t('list.left.title')}}
        </div>
        <div class="text">
          <el-icon><Position /></el-icon>
          {{$t('list.left.title')}}

        </div>
        <div class="text">
          <el-icon><Files /></el-icon>
          {{$t('list.left.text1')}}

        </div>
        <div class="text">
          <el-icon><FolderOpened /></el-icon>
          {{$t('list.left.text2')}}
        </div>
        <div class="text">
          <el-icon><Search /></el-icon>
          {{$t('list.left.text3')}}
        </div>
        <div class="text">
          <el-icon><MagicStick /></el-icon>
          {{$t('list.left.text4')}}
        </div>
    </el-col>
    <el-col class="list-item" :span="12" :xs="24">
      <div class="title">
      
       {{$t('list.right.title')}}
      </div>
      <div class="text">
        <el-icon><Connection /></el-icon>
        {{$t('list.right.text1')}}
      </div>
      <div class="text">
        <el-icon><Close /></el-icon>
        {{$t('list.right.text2')}}
      </div>
      <div class="text">
        <el-icon><Hide /></el-icon>
        {{$t('list.right.text3')}}
      </div>
      <div class="text">
        <el-icon><Stopwatch /></el-icon>
        {{$t('list.right.text4')}}
      </div>
      <div class="text">
        <el-icon><GoldMedal /></el-icon>
        {{$t('list.right.text5')}}
      </div>
    </el-col>
  </el-row>
</template>
<style>
.list{
  /* display: flex; */
  margin-top: 50px;
  /* gap: 80px; */
  width: 600px;
}

.list-item div{
  padding: 6px 10px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgb(137, 136, 132);
  width: fit-content;
  user-select: none;
}
.text:hover{
  color: rgb(55, 53, 47);
  border-radius: 6px;
  cursor: pointer;

background-color: rgba(55, 53, 47, 0.09);
}
.title{
  color: #000 !important;
  font-weight: 600 !important;
}
</style>
