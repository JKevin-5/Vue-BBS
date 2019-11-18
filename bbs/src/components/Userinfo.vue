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
            <b-button to="/home/userinfo" class="m-2">个人信息</b-button>
            <b-button to="/home/userinfo/focus" class="m-2">我的关注</b-button>
            <b-button to="/home/userinfo/fans" class="m-2">我的粉丝</b-button>
            <b-button to="/home/userinfo/focus" class="m-2">我的商城</b-button>
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
import axios from 'axios'

export default {
  data(){
    return{
      user: ''
    }
  },
  components: {
    Header
  },
  mounted(){
      axios.get("/user/"+this.$cookies.get('user').userId)
            .then(response => (
                this.user = response.data.data
                //console.log(this.user)
                ))
            .catch(error => console.log(error),
            
            )
    }
}
</script>
