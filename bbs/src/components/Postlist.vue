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
                <p class="mb-4 ml-1 mt-2">{{post.user.userNickName}}：{{post.postDesc}}</p>
                <hr class="mb-0 mt-2">
                </b-media>
                <b-row class="mt-2">
                <b-card-text class="ml-3" >{{post.postCreateTime}}</b-card-text>
                <b-col align-self='end'></b-col>
                <b-link v-if="isCurrentUser(post.user.userId)" @click="deletePost(post.postId)" class="mr-5">删除</b-link>
                </b-row>
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
                <p class="mb-4 ml-1 mt-2">{{post.user.userNickName}}：{{post.postDesc}}</p>
                <hr class="mb-0 mt-2">
                </b-media>
                <b-row class="mt-2">
                <b-card-text class="ml-3" >{{post.postCreateTime}}</b-card-text>
                <b-col align-self='end'></b-col>
                <b-link v-if="isCurrentUser(post.user.userId)" @click="deletePost(post.postId)" class="mr-5">删除</b-link>
                </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
    
  </b-container>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
inject: ['reload']

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
            currentPage:'',
            totalPage:'',
            currentUserId:this.$cookies.get('user').userId,
            form: {
                postTitle: '',
                postDesc: ''
          } 
        }
    },
    watch: {
      inputData:{
　　　　handler(newValue, oldValue) {
          axios.get("/post?pageSize=100&pageNum=1&smId="+this.inputData.smId)
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
      axios.get("/post?pageSize=100&pageNum=1&smId="+this.inputData.smId)
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods: {
      //该帖是否是当前用户的帖子
      isCurrentUser:function(postUserId) {
        if(postUserId==this.$cookies.get('user').userId){
          return true
        }else{
          return false
        }
      },
      //删除帖子
      deletePost(postId){
        console.log(postId+" 当前"+this.$cookies.get('user').userId)
        this.$axios({
          method:"delete",
          url:"/post",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            "postId": postId,
            "postUserIdRef": this.$cookies.get('user').userId  
          }
        })
        .then(response => (
                console.log(response.data.msg),
                this.$router.go(0)
            ))
        .catch(error => console.log(error)
            )
      },
      //刷新界面
      reflash: function(){
        axios.get("/post?pageSize=100&pageNum=1&smId="+this.inputData.smId)
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
      axios.get("/post?pageSize=100&pageNum=1&smId="+this.inputData.smId+"&findType=findByPopular")
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