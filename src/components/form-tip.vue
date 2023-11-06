<!--
 * @Author: sroxck
 * @Date: 2023-10-24 13:34:58
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-06 16:11:17
 * @Description: 
-->
<template>
 <div class="tip">
  {{$t("tip.title")}}
  <em>{{$t("tip.subTitle")}}</em>.
  <br>
  {{$t("tip.centerText")}}
  <em>{{$t("tip.symbol")}}</em>
  {{$t("tip.lastText")}}
</div>
</template>
<style>
.tip {
  margin-top : 40px;
  padding    : 0 8px;
  color      : rgb(55, 53, 47);
  line-height: 1.5;
  font-size  : 16px;
  user-select: none;
}

.tip em {
  position   : relative;
  font-style : normal;
  font-weight: bold;
  background : rgba(248, 28, 229, 0.125);
  color      : rgb(248, 28, 229);
  padding    : 0px 3px;
}
</style>
