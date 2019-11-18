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
              <b-card bg-variant="" text-variant="dark"  class="text-center" style="height:630px;margin:20px">
                <img src="@/assets/logo 2.0.png" style="width:400px;padding-top:160px;">
              </b-card>
            </b-col>
            <!--右边窗口列 b-col-->
            <b-col md="6" class="d-flex justify-content-center">
              <b-card-body style="max-height:700px;max-width: 400px" class="mt-4">
                <b-tabs content-class="mt-3" fill=true>
                  <b-tab title="登录" active >
                      <Signin/>
                  </b-tab>
                  <b-tab title="注册">
                    <keep-alive>
                      <Signup/>
                    </keep-alive>
                  </b-tab>
                </b-tabs>
              </b-card-body>
            </b-col>
          </b-row>
         </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>
<script>
import Signin from "../components/Signin.vue"
import Signup from "../components/Signup.vue"
export default {
  components:{
    Signin,
    Signup
  }
  
}
</script>
