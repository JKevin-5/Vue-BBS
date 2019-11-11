<template>
<b-container>
  <!--个人信息header-->
   <b-row class="justify-content-md-center">
      <b-col md="1"></b-col>
      <b-col ><Header/></b-col>
      <b-col md="1"></b-col> 
    </b-row> 
  <!--底部-->
  <b-row class="pt-4">
    <!--左侧分页面栏-->
      <b-col md="1"></b-col> 
      <b-col md="2" >
        <div style="background-color: white;  >">
          <b-nav vertical class="text-center" >
            <b-nav-item to="/home/userinfo" style="color:black">个人信息</b-nav-item>
            <b-nav-item router-link to="/home/userinfo/focus">我的关注</b-nav-item>
            <b-nav-item>我的发帖</b-nav-item>
            <b-nav-item>回复我的</b-nav-item>
            <b-nav-item>我的商城</b-nav-item>
          </b-nav>
        </div>
      </b-col>
      <!--右侧显示界面-->
      <b-col md="8">
        <router-view></router-view>
      </b-col>
      <b-col md="1"></b-col>
  </b-row>
</b-container>
    
</template>
<script>
// @ is an alias to /src
import Header from '@/components/Userinfo/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
