<template>
<b-container class="shadow p-2  bg-white rounded">
    <b-row >
        <!--头像-->
        <b-col md="2" class="pl-5 pt-4" >
            <div  style="position: relative;">
            <b-img  :src="'http://123.207.219.166:8080/'+post.userPicture" width="80" fluid alt="Responsive image" style="position: absolute;"></b-img>
            <b-form-file v-model="picture" accept=".jpg,.png,.gif" id="upload" style="padding-top:15px;opacity: 0;" @change="updatePicture"></b-form-file>
            </div>
        </b-col>
        <!--用户信息显示-->
        <b-col md="10" class="p-3 ">
            <b-row class="">
                <b-col md="6">
                  <b-input  v-model="userNickName" style="font-weight:bold;font-family: Serif;outline:medium;border: 0 none;" type="text" size="lg" :placeholder="post.userNickName" @blur="NickName_loseFocus"></b-input>
                </b-col>
            </b-row>
            <b-row class="pb-2 pl-3" >
              <b-col >
                <b-form-text style="font-weight:bold;font-family: Serif;font-size: 13px" >粉丝：{{post.fansCounts}}   关注：{{post.idolsCounts}}</b-form-text>
             </b-col>
            </b-row>
            <b-row class="pl-3">
                <b-col md="10" >
                  <b-form-input style="" v-model="user_signature" size="sm" :placeholder="post.userMotto" @blur="Signature_losefocus"></b-form-input>
                </b-col>
            </b-row>
            
        </b-col>
    </b-row>
    
</b-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
inject: ['reload']
  export default {
    data() {
      return {
        post: {},
        username: '',
        user_signature: '',
        userNickName:'',
        picture:null

      }
    },
    mounted(){
      axios.get("/user/"+this.$cookies.get('user').userId)
            .then(response => (
                this.post = response.data.data,
                this.user_signature = this.post.userMotto,
                console.log(this.post)
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods:{
      updatePicture: function(p){
        let file = p.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('userPictureFile',file);//通过append向form对象添加数据
        param.append('userId',this.post.userId)
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        axios.post("/user/update_picture?",param,
        { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }},
        )
        .then((response) => {
          console.log(response.data.msg);
          if(response.data.code==200){
            this.$bvToast.toast(response.data.msg, {
          title: `提示信息`,
          toaster: "b-toaster-top-center",
          variant: "success",
          solid: true
        }),
        this.$router.go(0)
          }else{
            this.$bvToast.toast(response.data.msg, {
          title: `提示信息`,
          toaster: "b-toaster-top-center",
          variant: "danger",
          solid: true
        })
          }
        })
        .catch((error)=> {
          console.log(error);
        });
      },
      //修改用户名
      NickName_loseFocus:function(){
        if(this.userNickName!=this.post.userNickName&this.userNickName!=''){
          this.$axios({
          method:"put",
          url:"/user",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            userId: this.post.userId,
            userNickName: this.userNickName,
          }
        })
        .then((response) => {
          //console.log(response.data.msg);
          //alert(response.data.msg);
          if(response.data.code==200){
            axios.get("/user/"+this.$cookies.get('user').userId)
            .then(response => (
                this.post = response.data.data
                ))
            .catch(error => console.log(error),
            )
            this.$cookies.set('user',response.data.data),
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          },
          this.$router.go(0)
          );
          }else{
            this.userNickName= this.post.userNickName,
            this.$bvToast.toast(response.data.msg, {
            title: this.post.userNickName,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true,
            
          });
          }    
        })
        
        }else{
          this.userNickName= this.post.userNickName,
          this.$bvToast.toast("无效更新", {
          title: '提示信息',
          toaster: "b-toaster-top-center",
          variant: "danger",
          solid: true
        })
      }
    },
    Signature_losefocus:function(){
        if(this.user_signature!=''&&this.user_signature!=this.post.userMotto){
          this.$axios({
          method:"put",
          url:"/user",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            userId: this.post.userId,
            userMotto: this.user_signature,
          }
        })
        .then((response) => {
          //console.log(response.data.msg);
          //alert(response.data.msg);
          if(response.data.code==200){
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          });
          
          }else{
            this.user_signature= this.post.userMotto,
            this.$bvToast.toast(response.data.msg, {
            title: '提示信息',
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true,
            
          });
          }    
        })
        }else{
          this.user_signature= this.post.userMotto,
          this.$bvToast.toast("无效更新", {
          title: '提示信息',
          toaster: "b-toaster-top-center",
          variant: "danger",
          solid: true
        })
      }
    }
    }
  }
</script>