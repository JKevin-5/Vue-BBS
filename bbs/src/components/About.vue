<template>
  <b-card>
    <b-media right-align vertical-align="center">
    <template v-slot:aside>
      <b-img blank blank-color="#ccc" width="80" alt="placeholder"></b-img>
    </template>
    <h5 class="mt-0 mb-1">Media object</h5>
    <p class="mb-0">
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
      Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
      nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </p>
  </b-media>
  </b-card>
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