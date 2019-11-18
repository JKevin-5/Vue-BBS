<template>
  <b-container >
    <!-- 默认信息显示 -->
        <b-row  v-if="!change" class="justify-content-md-center  m-2" style="shadow p-4 mb-5 bg-white rounded">
            <img src="@/assets/欢迎.png" style="width:670px;">
         </b-row >
        <!-- 子版块信息显示 -->
        <b-row  v-if="change" class="p-3 m-1" style="">
             <b-card class="">
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 30px;">{{inputData.smName}} </b-card-text>
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 20px;">{{inputData.smDesc}}</b-card-text>
            </b-card>
        </b-row>
        <!-- 帖子列表显示界面 -->
        <b-tabs content-class="mt-3 " >
          <b-tab title="最新" @click="reflash" active>
            <b-row>
              <b-col lg="12" >
                <b-card v-for="post in posts.items" :key="post.postId" class="m-1">
                <b-media right-align vertical-align="center"  >
                <template v-slot:aside>
                  <b-img :src="'http://123.207.219.166:8080/'+post.user.userPicture" width="80" alt="placeholder" :title='post.user.userNickName'></b-img>
                </template>
                <h4 class="mt-0 mb-3" @click="onClick(post.postId)" >{{post.postTitle}}</h4>
                <p class="mb-2 ml-1">{{post.user.userNickName}}：{{post.postDesc}}</p>
                <hr class="my-1">
                </b-media>
                <b-card-text class="mt-2" >{{post.postCreateTime}}</b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="最热门" @click="changePopular">
            <b-row>
              <b-col lg="12" >
                <b-card v-for="post in posts.items" :key="post.postId" class="m-1">
                <b-media right-align vertical-align="center"  >
                <template v-slot:aside>
                  <b-img :src="'http://123.207.219.166:8080/'+post.user.userPicture" width="80" alt="placeholder" :title='post.user.userNickName'></b-img>
                </template>
                <h4 class="mt-0 mb-3" @click="onClick(post.postId)">{{post.postTitle}}</h4>
                <p class="mb-2 ml-1">{{post.user.userNickName}}：{{post.postDesc}}</p>
                <hr class="my-1">
                </b-media>
                <b-card-text class="mt-2" >{{post.postCreateTime}}</b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
    
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
    props: {
      inputData: Object,
      change: Boolean
    },
    data (){
        return {
            posts: [],
            smId: '',
            smItems: [],
            form: {
                postTitle: '',
                postDesc: ''
          } 
        }
    },
    watch: {
      inputData:{
　　　　handler(newValue, oldValue) {
          axios.get("/post?pageSize=100&smId="+this.inputData.smId)
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
　　　　},
　　　　deep: true
　　}
        
    },
    mounted () {
      axios.get("/post?pageSize=100&smId="+this.inputData.smId)
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods: {
      reflash: function(){
        axios.get("/post?pageSize=100&smId="+this.inputData.smId)
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
      },
      //重置发帖模态框表单
      resetModal(){
        this.form.postTitle = '',
        this.form.postDesc = '',
        this.modalState = null
    },
    onClick(id){
      this.$router.push('/home/post/'+id)
    },
    changePopular(){
      axios.get("/post?pageSize=100&smId="+this.inputData.smId+"&findType=findByPopular")
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
    }

    }
}
</script>

<style>
#card-header {
  display:inline-block;
  text-align: left;
}
</style>