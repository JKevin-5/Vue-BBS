<template>
<b-container >
    <!-- 这是登录后默认显示界面 -->
    <!-- 头部信息显示 -->
    <b-row v-if="!change" class="justify-content-md-center p-5" style="border: black solid thin;border-radius: 10px">
        <b-card-text style="font-weight:bold;font-family: Serif;font-size: 40px;">欢迎来到 BISTU BBS！</b-card-text>
    </b-row>
    <!-- 默认显示界面 -->
    <b-row style="border: black solid thin;height: 700px" class="justify-content-md-center p-5 m-2">
    </b-row>
</b-container>
</template>
<script>
  export default {
    data() {
      return {
          //获取父组件的数据
          change : true
      }
    }
  }
</script>