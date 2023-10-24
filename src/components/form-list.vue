<!--
 * @Author: sroxck
 * @Date: 2023-10-24 15:19:54
 * @LastEditors: sroxck
 * @LastEditTime: 2023-10-24 15:42:13
 * @Description: 
-->
<script setup lang="ts">


</script>

<template>
  <div class="list">
    <div class="list-item">
        <div class="title">
         
          Get started
        </div>
        <div class="text">
          <el-icon><Position /></el-icon>
          Create your first form
        </div>
        <div class="text">
          <el-icon><Files /></el-icon>
          Get started with templates
        </div>
        <div class="text">
          <el-icon><FolderOpened /></el-icon>
          Embed your form
        </div>
        <div class="text">
          <el-icon><Search /></el-icon>
          Help center
        </div>
        <div class="text">
          <el-icon><MagicStick /></el-icon>
          Learn about Tally Pro
        </div>
    </div>
    <div class="list-item">
      <div class="title">
      
        How-to guides
      </div>
      <div class="text">
        <el-icon><Connection /></el-icon>
        Conditional logic
      </div>
      <div class="text">
        <el-icon><Close /></el-icon>
        Calculator
      </div>
      <div class="text">
        <el-icon><Hide /></el-icon>
        Hidden fields
      </div>
      <div class="text">
        <el-icon><Stopwatch /></el-icon>
        Mentions
      </div>
      <div class="text">
        <el-icon><GoldMedal /></el-icon>
        Collect payments
      </div>
    </div>
  </div>
</template>
<style>
.list{
  display: flex;
  margin-top: 50px;
  gap: 80px;
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
