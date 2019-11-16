<template>
    <b-card border-variant="light" header="个人信息">
        <b-card-text>姓名：{{student.stuName}}</b-card-text>
        <b-card-text>学号：{{student.stuSno}}</b-card-text>
        <b-card-text>性别：{{student.stuGender}}</b-card-text>
        <b-card-text>创建时间：{{user.userCreateTime}}</b-card-text>
        <b-row>
        <b-col ><b-button @click="show=true" variant="outline-info">修改密码</b-button></b-col>
        <b-modal v-model="show" id="modal-center" hide-footer  centered title="修改密码" @show="resetModal" @hidden="resetModal">
                <form ref="form" @submit="sendInfo">
                    <b-form-group label="密码" label-for="input-1">
                        <b-form-input type="password" id="input-1" v-model="form.oldPassword" placeholder="请输入您的密码" required="required" :state="oldPassword_state" trim></b-form-input>    
                    </b-form-group>

                    <b-form-group label="新密码" label-for="input-2" description="密码在6-10位数之间，必须包含数字和字母">
                        <b-form-input type="password" id="input-2" v-model="form.newPassword" placeholder="请输入您的密码" required="required" :state="newPassword_state" trim></b-form-input>    
                    </b-form-group>
                    <b-form-group id="input-group" >
                        <b-button type="button" @click="sendInfo" variant="primary" >提交</b-button>
                    </b-form-group>
                </form>
            </b-modal>
        </b-row>
       
    </b-card>
    
</template>
<script>
import axios from 'axios'
import qs from 'qs'
  export default {
    computed: {
      //oldpassword 密码框状态 6-8位有大小写字母、数字组合
      oldPassword_state(){
        if(this.form.oldPassword.length !=0 ){
          return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}/.test(this.form.oldPassword) 
        }
      },
      //newpassword 密码框状态 6-8位有大小写字母、数字组合
      newPassword_state(){
        if(this.form.newPassword.length !=0 ){
          return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}/.test(this.form.newPassword) 
        }
      }
    },
    data() {
      return {
        show: false,
        user:'',
        student:{},
        form:{
          oldPassword:'',
          newPassword:''
        }
      }
    },
    mounted(){
      axios.get("/user/"+this.$cookies.get('user').userId)
            .then(response => (
                this.user = response.data.data,
                this.student = response.data.data.stu,
                console.log(response.data.data)
                ))
            .catch(error => console.log(error),
            
            )
    },
    methods:{
      sendInfo: function(){
        if(this.form.oldPassword!=''&&this.form.newPassword!=''){
          axios.post("/user/update_pwd?",qs.stringify({        
          userId: this.$cookies.get('user').userId,
          userOldPwd: this.form.oldPassword,
          userNewPwd: this.form.newPassword    
        }),
        { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }}
        )
        .then((response) => {
          //console.log(response.data.msg);
          this.show=false;
          //alert(response.data.msg);
          if(response.data.code==200){
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          });
          }else{
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          });
          }
          
        })
        .catch((error)=> {
          console.log(error);
          alert("注册出错了");
        });
        }
      },
      //重置发帖模态框表单
      resetModal(){
        this.form.oldPassword = '',
        this.form.newPassword = ''
    },
      

    }
  }
</script>
