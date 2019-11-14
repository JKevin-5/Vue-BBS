<template>
  <b-container fluid>
    <!-- 默认信息显示 -->
        <b-row v-if="!change" class="justify-content-md-center p-5 m-2" style="border: black solid thin;border-radius: 10px">
            <b-card-text style="font-weight:bold;font-family: Serif;font-size: 40px;">欢迎来到 BISTU BBS！</b-card-text>
         </b-row>
        <!-- 子版块信息显示 -->
        <b-row v-if="change" class="p-3 m-1" style="">
             <b-card class="">
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 30px;">{{inputData.smName}} </b-card-text>
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 20px;">{{inputData.smDesc}}</b-card-text>
            </b-card>
        </b-row>
        <!-- 帖子列表显示界面 -->
        <b-tabs content-class="mt-3" >
          <b-tab title="最热门" @click="reflash">
            <b-row v-for="post in posts.items" :key="post.postId" >
              <b-col lg="1"></b-col>
              <b-col lg="10">
              <b-card>
                <b-card-header>
                 <b-card-text>{{post.postTitle}}</b-card-text>
                </b-card-header>
                <b-card-body>
                  <b-row>
                    <b-col md="10">
                      <b-card-text>{{post.postDesc}}</b-card-text>
                    </b-col>
                    <b-col md="2">
                      <b-img :src="'http://123.207.219.166:8080/'+post.user.userPicture" fluid alt="Responsive image" v-b-tooltip.hover :title='post.user.userNickName'></b-img>
                    </b-col>
                  </b-row>
                </b-card-body>
                <b-card-footer>
                 <b-card-text>{{post.postCreateTime}}</b-card-text>
                </b-card-footer>
              </b-card>
              </b-col>
              <b-col lg="1"></b-col>
            </b-row>
          </b-tab>
          <b-tab title="最新">
            <b-row v-for="post in posts.items" :key="post.postId" >
              <b-col lg="1"></b-col>
              <b-col lg="10">
                <b-card>
                <b-card-header>
                 <b-card-text>{{post.postTitle}}</b-card-text>
                </b-card-header>
                <b-card-body>
                  <b-row>
                    <b-col md="10">
                      <b-card-text>{{post.postDesc}}</b-card-text>
                    </b-col>
                    <b-col md="2">
                      <b-card-text id="tooltip-target-1">{{post.user.userNickName}}</b-card-text>
                      <b-tooltip target="tooltip-target-1" triggers="hover">
                        <b-img :src="'http://123.207.219.166:8080/'+post.user.userPicture" rounded="circle" fluid alt="Responsive image"></b-img>
                      </b-tooltip>
                    </b-col>
                  </b-row>
                </b-card-body>
                <b-card-footer>
                 <b-card-text>{{post.postCreateTime}}</b-card-text>
                </b-card-footer>
              </b-card>
              </b-col>
              <b-col lg="1"></b-col>
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
      change: Boolean,
      required: true
    },
    data (){
        return {
            posts: [],
            smId: '',
            smItems: []
        }
    },
    watch: {
      inputData:{
　　　　handler(newValue, oldValue) {
          axios.get("/post?smId="+this.inputData.smId)
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
      axios.get("/post?smId=")
            .then(response => (
                this.posts = response.data.data
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods: {
      reflash: function(){
        axios.get("/post?smId="+this.inputData.smId)
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