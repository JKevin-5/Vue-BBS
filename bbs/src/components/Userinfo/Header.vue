<template>
<b-container class="shadow p-2  bg-white rounded">
    <b-row >
        <!--头像-->
        <b-col md="2" class="pl-5 pt-3">
            <!--
              <b-form-file accept="image/*"></b-form-file>
            -->
            <img src="@/assets/用户头像.svg"   class="img-circle" alt="Circle image">
        </b-col>
        <!--用户信息显示-->
        <b-col md="10" class="p-4">
            <b-col md="3" >
                <b-form-text style="font-size: 25px;">{{username}}</b-form-text>
            </b-col>
            <b-col >
                <b-form-input v-model="user_signature" size="sm" placeholder="介绍下自己吧"></b-form-input>
            </b-col>
            <b-col>
            <b-form-text>信用分：</b-form-text>
            <div class="progress" style="height:10px;">
                <div class="progress-bar" style="width:20%"></div>
            </div>
            </b-col>
        </b-col>
    </b-row>
    
</b-container>
</template>
<script>
  export default {
    data() {
      return {
        username: '李雷雷',
        user_signature: ''
      }
    }
  }
</script>