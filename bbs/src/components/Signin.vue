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
                  placeholder="Enter name or number" 
                  v-model="form.username" ></b-form-input>
            </b-form-group>
            
            <b-form-group 
                id="input-group-2"
                label="密码"
                label-for="input-2"
            >
            <b-form-input type="password" id="input-2" required placeholder="Enter password" v-model="form.password" ></b-form-input>
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
        alert(JSON.stringify(this.form))
      }}
  }
</script>