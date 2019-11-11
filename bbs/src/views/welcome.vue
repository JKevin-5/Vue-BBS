<template>
  <!--主要容器 b-container-->
  <b-container class="justify-content-md-center" >

    <!--头部空白行 b-row-->
    <b-row align-v="start" class="justify-content-md-center" style="height:100px;">
    </b-row>

    <!--中部登录注册框主体 b-row-->
    <b-row align-v="center" class=" shadow p-3 mb-5 bg-white rounded">
      <b-col md="12" class="">
        <b-card no-body  >
          <b-row no-gutters>
            <!--左边图标列 b-col-->
            <b-col md="6">
              <b-card bg-variant="success" text-variant="dark"  class="text-center" style="height:630px;margin:20px">
                <b-card-text style="padding-top: 200px;font-weight:bold;font-family: Serif;font-size: 60px;">欢迎访问 BISTU BBS！</b-card-text>  
              </b-card>
            </b-col>
            <!--右边窗口列 b-col-->
            <b-col md="6" class="d-flex justify-content-center">
              <b-card-body style="max-height:700px;max-width: 400px">
                <b-nav card-header tabs fill style="padding-top: 10px; padding-bottom: 30px">
                  <b-nav-item active router-link to="/">登录</b-nav-item> 
                  <b-nav-item  router-link to="signup">注册</b-nav-item>
                </b-nav>
                <keep-alive>
                <router-view></router-view>
                </keep-alive>
              </b-card-body>
            </b-col>
          </b-row>
         </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<style lang="less">

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>