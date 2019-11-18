<template>
  <b-navbar toggleable="lg" type="light" variant="light" position: sticky style="height:60px;width:1140px" class="shadow-sm p-3 mb-4 bg-white " >

    <!-- b-navbar-brand 头部导航栏Logo  -->
    <b-navbar-brand > <img style="max-width:130px" src="@/assets/logo.png"></b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item router-link to="/home/forum">论坛</b-nav-item>
        <b-nav-item href="#">线下活动</b-nav-item>
        <b-nav-item href="#">二手市场</b-nav-item>
        <b-nav-item href="#">资源库</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto ">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="搜索其实很简单"></b-form-input>
          <b-button variant="outline-dark" size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
        </b-nav-form>
        <b-button variant="link" class="pr-1">
        <img src="@/assets/消息.svg" alt="icon name">
        </b-button>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item router-link to="/home/userinfo">个人信息</b-dropdown-item>
          <b-dropdown-item  @click="signOut">登出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>
<script>
export default {
  data(){
    return {
      userName: '' //右上角用户名显示
    }
  },
  mounted(){
      if($cookies.isKey('user')){
        this.userName = this.$cookies.get('user').userNickName
      }else{
        this.userName = 'User'
      }
  },
  methods:{
    signOut: function(){
      this.$cookies.remove('user');
      window.localStorage.removeItem('user');
      this.$router.push('/');
      
    }
  }
}
</script>