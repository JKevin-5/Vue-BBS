<template>
    <html lang="en">
    <div>
        <b-form class="form-login" @submit="onSubmit">
            <b-form-group class="text-center">
              <h2>登录</h2>
            </b-form-group>
            
            <b-form-group 
                id="input-group-1" 
                label="用户名" 
                label-for="input-1" 
            >
                <b-form-input 
                  id="input-1" 
                  required
                  placeholder="请输入您的密码或用户名" 
                  v-model="form.username" ></b-form-input>
            </b-form-group>
            
            <b-form-group 
                id="input-group-2"
                label="密码"
                label-for="input-2"
            >
            <b-form-input type="password" id="input-2" required placeholder="请输入您的密码" v-model="form.password" ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3">
                <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                <b-form-checkbox value="Remember-username" >记住用户名</b-form-checkbox>
                <b-form-checkbox value="Remember-userpassword">记住密码</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            
            <b-form-group id="input-group-4" >
              <b-button type="submit" variant="primary" >提交</b-button>
            </b-form-group>
        </b-form>
        
    </div>
    </html>
</template>
<script>
  import axios from 'axios';
  import qs from 'qs';
  
  export function maketoast(msg) {
      this.$bvToast.toast(msg, {
          title: `提示信息`,
          toaster: "b-toaster-top-right",
          variant: "success",
          solid: true
        })
  }
  //在组件中使用
  export default {
    data() {
      return {
          form: {
            username: '',
            password: '',
            checked: []
          }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        axios.post("/user/sign_in?",qs.stringify({        
          userName: this.form.username,
          userPwd: this.form.password    
        }),
        { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }},
        )
        .then((response) => {
          console.log(response.data);
          //alert(response.data.msg);
          //makeToast(response.data.msg);
          if(response.data.msg=="登录成功"){
            this.$bvToast.toast(response.data.msg, {
          title: `提示信息`,
          toaster: "b-toaster-top-right",
          variant: "success",
          solid: true
         }),
          this.$router.push('/home')
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
    }}
  }
</script>