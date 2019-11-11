<template>
  <b-navbar toggleable="lg" type="light" variant="light" position: sticky style="height:60px;width:1140px" class="shadow-sm p-3 mb-4 bg-white " >
    <!--b-navbar-brand 头部导航栏Logo -->
    <b-navbar-brand href="#" tag="h1" class="ml-1 mr-5 pt-1 pb-1 pl-3 pr-3" style="border: black solid thin;border-radius: 10px;font-weight:bold;font-family: Serif">BISTU BBS</b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item router-link to="/home">首页</b-nav-item>
        <b-nav-item router-link to="/home">论坛</b-nav-item>
        <b-nav-item href="#">线下活动</b-nav-item>
        <b-nav-item href="#">二手市场</b-nav-item>
        <b-nav-item href="#">资源库</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto ">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="搜索其实很简单"></b-form-input>
          <b-button variant="outline-dark" size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
        </b-nav-form>
        <b-button variant="link" class="pr-1">
        <img src="@/assets/消息.svg" alt="icon name">
        </b-button>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item router-link to="/home/userinfo">个人信息</b-dropdown-item>
          <b-dropdown-item href="#">登出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>
