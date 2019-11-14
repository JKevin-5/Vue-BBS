<template>
    <html lang="en">
    <div>
        <b-form class="form-login" @submit="onSubmit" >
            <b-form-group class="text-center">
              <h2>注册</h2>
            </b-form-group>

            <b-form-group 
                id="input-group-1" 
                label="学号" 
                label-for="input-1" 
                :invalid-feedback="stuNo_invalidFeedback" 
                :state="stuNo_state"
            >
                <b-form-input id="input-1" required="required" type="tel"  placeholder="请输入您的学号" v-model="form.stuNo"  :state="stuNo_state" trim></b-form-input>
            </b-form-group>
            
            <b-form-group 
                id="input-group-2" 
                label="姓名" 
                label-for="input-2"
                :state="name_state"
            >
                <b-form-input id="input-2" type="text" required="required" placeholder="请输入您的姓名" v-model="form.name" :state="name_state" trim></b-form-input>
            </b-form-group>

            <b-form-group 
                id="input-group-3"
                label="密码"
                label-for="input-3"
                description="密码在6-10位数之间，必须包含数字和字母"
            >
            <b-form-input type="password" id="input-3" required="required" placeholder="请输入您的密码" v-model="form.password1" :state="password1_state" trim></b-form-input>
            </b-form-group>

            <b-form-group 
                id="input-group-4"
                label="确认密码"
                label-for="input-4"
                :invalid-feedback="password2_invalidFeedback"
                :state="password2_state"
            >
            <b-form-input type="password" id="input-4" :state="password2_state" required="required" placeholder="请再次输入您的密码" v-model="form.password2" trim></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5">
                <b-form-checkbox-group v-model="form.checked" id="checkboxes-1" required>
                <b-form-checkbox value="agree">同意《BISTU-BBS 用户协议》</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            
            <b-button type="submit" variant="primary">提交</b-button>
               
        </b-form>
        
    </div>
    </html>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  export default {
    //vue 计算属性 computed
    computed: {
      //stuNo 学号框状态 10位数字
      stuNo_state() {
        if(this.form.stuNo.length != 0)
        return /^\d{10}$/.test(this.form.stuNo)
      },
      stuNo_invalidFeedback() {
        if (this.form.stuNo.length > 10) {
          return '您的学号不符合标准'
        } else if (this.form.stuNo.length > 0) {
          return '学号需要达到10位数'
        } 
      },

      //name 姓名框状态 2个字以上的中文
      name_state(){
        if(this.form.name.length !=0)
        return this.form.name.length >= 2 && /^[\u4e00-\u9fa5]{0,}$/.test(this.form.name) ? true :false
      },

      //password1 密码框状态 6-8位有大小写字母、数字组合
      password1_state(){
        if(this.form.password1.length !=0 ){
          return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}/.test(this.form.password1) 
        }
      },

      //password2 密码确认框状态 必须在password1密码正确的前提下进行
      password2_state(){
        if( this.password1_state == true && this.form.password2.length !=0){
            return this.form.password2 == this.form.password1 ? true : false
        }
      },
      password2_invalidFeedback() {
        if(this.form.password2 != this.form.password1){
          return '两次密码输入不一致！'
        }
      }

    },
    data() {
      return {
          form: {
            stuNo: '',
            name:'',
            password1: '',
            password2: '',
            checked: []
          }
      }
    },
    methods: {
      maketoast(msg,variant){
        this.$bvToast.toast(msg, {
          title: `提示信息 ${msg || 'default'}`,
          toaster: "b-toaster-top-center",
          variant: variant,
          solid: true
        })
        },
      onSubmit(evt) {
        evt.preventDefault()
        
        //alert(JSON.stringify(this.form))
        axios.post("/user/sign_up?",qs.stringify({        
          stuName: this.form.name,
          stuSno: this.form.stuNo,
          userPwd: this.form.password2    
        }),
        { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }},
        )
        .then((response) => {
          console.log(response.data);
          //alert(response.data.msg);
          if(response.data.msg=="登录成功"){
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          })
          this.$router.push('/home/forum')
          }else{
            this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "danger",
            solid: true
          })}
          
        })
        .catch((error)=> {
          console.log(error);
          alert("注册出错了");
        });
      }}
  }
</script>