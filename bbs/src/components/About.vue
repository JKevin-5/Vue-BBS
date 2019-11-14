<template>
  <form ref="form" >
                    <b-form-group label="标题">
                        <b-form-input v-model="form.postTitle" placeholder="输入帖子标题" required="required"></b-form-input>    
                    </b-form-group>
                    <b-form-group label="发布内容" label-for="textarea"> 
                        <b-form-textarea
                        id="textarea"
                        v-model="form.postDesc"
                        placeholder="写点什么..."
                        rows="3"
                        required="required"
                        max-rows="6">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group id="input-group-4" >
                        <b-button style="summit"  @click="sendPost()" variant="primary" >提交</b-button>
                    </b-form-group>
                </form>
</template>

<script>



export default {
    data (){
        return {
            form: {
              postTitle: '',
              postDesc: '',
              postSmIdRef: 1,
              postUserIdRef: 24
            }

        }
    },
    methods: {
      sendPost: function (){
        this.$axios({
          method:"put",
          url:"/post",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            postTitle: this.form.postTitle,
            postDesc: this.form.postDesc,
            postSmIdRef: 1,
            postUserIdRef: 24
          }
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.msg)
         })
      }
    },
    mounted () {
       
    }
}
</script>