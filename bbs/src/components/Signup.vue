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
                :invalid-feedback="invalidFeedback" 
                :valid-feedback="validFeedback" 
                :state="state"
            >
                <b-form-input id="input-1" requierd type="tel"  placeholder="Enter your number" v-model="form.usernumber" :state="state" trim></b-form-input>
            </b-form-group>
            
            <b-form-group 
                id="input-group-2" 
                label="姓名" 
                label-for="input-2"
            >
                <b-form-input id="input-2" type="text" requierd placeholder="Enter your name" v-model="form.username" ></b-form-input>
            </b-form-group>

            <b-form-group 
                id="input-group-3"
                label="密码"
                label-for="input-3"
                description="Your password must be 6-12 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
            >
            <b-form-input type="password" id="input-3" requierd placeholder="Enter your password" v-model="form.password_1" ></b-form-input>
            </b-form-group>

            <b-form-group 
                id="input-group-4"
                label="确认密码"
                label-for="input-4"
            >
            <b-form-input 
              type="password" 
              id="input-4" 
              requierd 
              placeholder="Enter your password again" 
              v-model="form.password_2" ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5">
                <b-form-checkbox-group v-model="form.checked" id="checkboxes-1" >
                <b-form-checkbox value="agree">同意《BISTU-BBS 用户协议》</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            
            <b-button type="submit" variant="primary">提交</b-button>
               
        </b-form>
        
    </div>
    </html>
</template>

<script>
  export default {
    computed: {
      state() {
        return this.form.usernumber.length == 10 ? true : false
      },
      invalidFeedback() {
        if (this.form.usernumber.length > 10) {
          return ''
        } else if (this.form.usernumber.length > 0) {
          return 'Enter 10 numbers'
        } else {
          return 'Please enter something'
        }
      },
      validFeedback() {
        return this.state === true ? 'Thank you' : ''
      }
    },
    data() {
      return {
          form: {
            usernumber: '',
            username: '',
            password_1: '',
            password_2: '',
            checked: []
          }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }}
  }
</script>