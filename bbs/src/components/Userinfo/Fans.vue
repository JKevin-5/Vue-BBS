<template>
    <b-card border-variant="light" header="我的关注">
        <b-row v-for="focu in focus.items" :key="focu.userId">
            <b-card>
            <b-col>
                <b-img :src="'http://123.207.219.166:8080/'+focu.userPicture" rounded="circle" width="80" height="80" ></b-img>
            </b-col>
            <b-col>
                <b-row class="justify-content-md-center">
                    <b-form-text>{{focu.userNickName}}</b-form-text>
                </b-row>
            </b-col>
            </b-card>
        </b-row>
    </b-card>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return{
            focus: '',
        }
    },
    mounted(){
        axios.get("/user/fans/"+this.$cookies.get('user').userId)
            .then(response => (
                this.focus = response.data.data
                //console.log(this.focus)
                ))
            .catch(error => console.log(error),
            
            )
    }
}
</script>