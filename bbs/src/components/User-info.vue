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
        <div >
          <b-navbar-nav vertical class="text-center" type="light" >
            <b-nav-item to="/home/userinfo" replace:false>个人信息</b-nav-item>
            <b-nav-item to="/home/userinfo/focus" replace:false>我的关注</b-nav-item>
            <b-nav-item>我的发帖</b-nav-item>
            <b-nav-item>回复我的</b-nav-item>
            <b-nav-item>我的商城</b-nav-item>
          </b-navbar-nav>
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
