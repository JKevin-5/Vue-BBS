<template>
<b-container >
<!--导航栏-->
  <b-row align-v="start" class="justify-content-md-center">
      <b-col >
        <Navbar/>
      </b-col>
  </b-row>
<!--动态面板-->
  <b-row align-v="center" >
      <b-col md="1"></b-col>
      <b-col>
          <router-view></router-view>
      </b-col>
      <b-col md="1"></b-col>
  </b-row>
</b-container>

</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Userinfo/Header.vue'

export default {
  name: 'navbar',
  components: {
    Navbar,
    Header
  },
  mounted(){
    //console.log(this.$cookies.get('user'));
  }
}
</script>

