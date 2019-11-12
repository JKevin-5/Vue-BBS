<template>
    <b-card border-variant="light" header="个人信息">
        <b-card-text>姓名：{{username}}</b-card-text>
        <b-card-text>学号：{{userStuNo}}</b-card-text>
    </b-card>
    
</template>
<script>
  export default {
    data() {
      return {
        username: '李雷雷',
        userStuNo: '2016011xxx'
      }
    }
  }
</script>