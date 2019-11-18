<template>
  <b-container fluid>
    <!-- 顶部置顶楼信息 -->
    <b-row class=" shadow p-4 mb-5 bg-white rounded "  >
        <b-col>
            <b-row>
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 30px;">{{data.items.postTitle}}<hr class="my-1" style="background-color: black"></b-card-text>
            </b-row>
            <b-row>
                <b-button  variant="outline-primary" size="sm" @click="changeFocusTop"  >{{focusTop}}</b-button>
            </b-row>
            <b-row>
                <p>{{data.items.postDesc}}</p>
            </b-row>
            <b-row>
                <b-col align-self='end'></b-col>
                    <div class="pr-5">{{data.items.user.userNickName}}</div>
            </b-row>
            <b-row>
                <b-col align-self='end'></b-col>
                <div>{{data.items.postCreateTime}}</div>
            </b-row>
            <b-row>
                <b-col align-self='end'></b-col>
                
            </b-row>
        </b-col>
        
        
        
    </b-row >
    <!-- 中部回复楼层信息 -->
    <b-row v-for="card in data.items.cards" :key="card.cardId" class="mb-2">
        <b-col md=12>
        <b-card class="pl-4" >
            <b-row>
            <!-- 该楼层用户信息 -->
            <b-col md="2" >
                <b-row>
                    <b-img class="ml-2 mt-4" :src="'http://123.207.219.166:8080/'+card.user.userPicture" width="80" height="70" alt="placeholder"></b-img>
                </b-row>
                <b-row >
                    <b-card-text >{{card.user.userNickName}}</b-card-text>  
                </b-row>
                <b-row>
                    <b-button variant="outline-primary" size="sm" >私聊</b-button>
                    <b-button v-if="!card.user.userFocus" variant="outline-primary" size="sm" class="ml-1" @click="changeFocusUser(card.user.userId)">关注</b-button>
                    <b-button v-if="card.user.userFocus" variant="outline-primary" size="sm" class="ml-1" @click="changeFocusUser(card.user.userId)">已关注</b-button>
                </b-row>
            </b-col>
            <!-- 该楼层回复信息 -->
            <b-col md="9" style="border: black solid thin;border-radius: 10px">
                <b-row class="pt-3 pl-3 ">
                    {{card.cardDesc}}
                </b-row>
            </b-col>
            <b-col md="2"></b-col>
            <!-- 评论该楼层 -->
            <b-col md="9" >
                <b-row class="pt-2 ">
                    <b-col md="10">
                        <b-form-input size="sm" v-model="text" placeholder="吐槽下"></b-form-input>
                    </b-col>
                    <b-col md="2">
                        <b-button variant="outline-primary" size="sm" @click="sendComment(card)">发送</b-button>
                    </b-col>
                </b-row>
                <b-row v-for="cardComm in card.cardComms" :key="cardComm.cardCommId" class="pt-2 pl-3" >
                    <b-card-text class="pr-2" style="font-weight:bold;font-family: Serif;font-size: 15px;">{{cardComm.user.userNickName}}:</b-card-text>
                    <b-card-text style="font-size: 14px;">{{cardComm.cardCommDesc}}<hr class="my-1" ></b-card-text>
                </b-row>
            </b-col>
            </b-row>
        </b-card>
        </b-col>
    </b-row>
    <!-- 底部评论框 -->
    <b-row class="mt-2">
        <b-col>
            <b-card>
                <b-form-textarea
                    id="textarea"
                    v-model="floorComment"
                    placeholder="评论一下吧！"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <b-row class="mr-1 mt-1">
                    <b-col align-self='end'></b-col>
                    <b-button variant="outline-primary" @click="sendFloor">发送</b-button>
                </b-row>
            </b-card>
        </b-col>
    </b-row>

    </b-container>
</template>

<script>
import axios from 'axios';
import List from '../components/Postlist.vue'
inject: ['reload']


export default {
   props: ['id'],
   data() {
        return {
            buttonFocus: false,
            text:'',
            textarea:'',
            floorComment:'',
            focusTop: '关注',
            data:{
                items:{
                    postTitle:'',
                    postDesc:'',
                    postCreateTime:'',
                    postFocus:'',
                    user:{
                        userNickName:'',
                        userFocus:''
                    }
                }
            }   
        }
    },
    mounted(){
        axios.get("/post/detail/"+this.id+"?userId="+this.$cookies.get("user").userId+"&pageSize=100")
            .then(response => (
                this.data = response.data.data,
                console.log(response.data.data),
                this.focusTop = response.data.data.items.postFocus? '已关注':'关注'
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods:{
        //取关/关注人
        changeFocusUser:function(userId){
        this.$axios({
          method:"put",
          url:"/user_sub",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            "userSubIdARef": this.$cookies.get('user').userId,
            "userSubIdBRef": userId,
          }
        })
        .then((response) => {
            if(response.data.code==200){
                if(response.data.msg=='关注人成功'){
                    this.focusTop='已关注'
                    console.log(response.data.msg+userId);
                }else{
                    this.focusTop='关注'
                    console.log(response.data.msg);   
                }       
            }
        })
        },
        //取关/关注帖
        changeFocusTop:function(){
        this.$axios({
          method:"put",
          url:"/post_sub",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            "postSubPostIdRef": this.id,
            "postSubUserIdRef": this.$cookies.get('user').userId,
          }
        })
        .then((response) => {
            if(response.data.code==200){
                if(response.data.msg=='关注帖成功'){
                    this.focusTop='已关注'
                    console.log(response.data.msg);
                }else{
                    this.focusTop='关注'
                    console.log(response.data.msg);   
            }       
        }
        })
        .catch(error => console.log(error),
        )
        },
        //回复非置顶楼
        sendComment:function (card){
            if(this.text!=''){
        this.$axios({
          method:"put",
          url:"/card_comm",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            "cardCommDesc": this.text,
            "cardCommCardIdRef": card.cardId,
            "cardCommUserIdRef": this.$cookies.get('user').userId
          }
        })
        .then((response) => {
            if(response.data.code==200){
                this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          });
          this.$router.go(0);
            }else{
                this.$bvToast.toast(response.data.msg, {
            title: `发送失败`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          });
            }
        })}else{
            this.$bvToast.toast("不能发送空评论", {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          });
        }
        },
        //回复置顶楼
        sendFloor:function (){
            if(this.floorComment!=''){
                this.$axios({
          method:"put",
          url:"/card",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            "cardDesc": this.floorComment,
            "cardPostIdRef": this.id,
            "cardUserIdRef": this.$cookies.get('user').userId
          }
        })
        .then((response) => {
            console.log(response.data.code)
            if(response.data.code==200){
                this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          });
          this.$router.go(0);
            }else{
                this.$bvToast.toast("发送失败", {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          });
            }
        })
            }else{
                this.$bvToast.toast("不能发送空评论", {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          });
            }
        }
    }
}
</script>