<template>
<!-- 首页/论坛 -->
<b-container>
<b-row class="justify-content-md-center">
    <b-col md="2" >
        <b-row v-if="change" md="12" class="justify-content-md-center p-3"> 
            <b-button  @click="show=true">发布帖子</b-button>
            <!-- 发帖模态框 -->
            <b-modal v-model="show" id="modal-center" hide-footer  centered title="编辑帖子" @show="resetModal" @hidden="sendPost" >
                <form ref="form" @submit="sendPost">
                    <b-form-group label="分区">
                        <b-form-text>{{smItems.smName}}</b-form-text>
                    </b-form-group>
                    <b-form-group label="标题" >
                        <b-form-input id="textTitle" v-model="form.postTitle" placeholder="输入帖子标题" required="required"></b-form-input>    
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
                        <b-button type="button" @click="show=false" variant="primary" >提交</b-button>
                    </b-form-group>
                </form>
            </b-modal>
        </b-row>        
        <!-- 侧边导航栏 论坛分类 -->
        <div role="tablist">
        <!-- sidebar侧边导航栏 论坛分类菜单 用法：v-for 加上 b-card 为主体 b-collapse 作为风箱式打开菜单 -->
        <b-card v-for="menu in menus" :key="menu.bcId" v-bind:name="menu.bcName"  no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab" visible="false" >
                <b-button block  v-b-toggle.accordion-1 variant="success">{{menu.bcName}}</b-button>
            </b-card-header>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">
                <b-card-body v-for="smallComm in menu.smallComms" :key="smallComm.smId" class="p-2" >
                    <b-button block v-b-toggle.accordion-1 variant="info" @click="Onclick(smallComm)"  >{{smallComm.smName}}</b-button>
                </b-card-body>
            </b-collapse>
        </b-card>   
        </div>
    </b-col>
    <b-col md="10">
        <List v-if="update" :inputData="this.smItems" :change="this.change"></List>
    </b-col>
</b-row>
</b-container> 
</template>
<script>
import axios from 'axios';
import List from '../components/List.vue'

export default {
    inject: ['reload'],
    data(){
        return {
            update: true,
            show: false,
            change : false,
            menus: [],
            smItems: {},
            smId: '',
            smName: '',
            smDesc: '',
            modalState: null,
            userID: 24,
            form: {
                postTitle: '',
                postDesc: ''
          } 
        }
    },
    watch:{
        inputData: {
　　　　    handler(newValue, oldValue) {
                //父组件inputData对象改变会触发此函数
　　　　    },
　　　　deep: true
　　}
},
    components:{
        List
    },
    mounted () {
        //默认得到所有帖子信息
        axios
            .get('comm')
            .then(response => (
                this.menus = response.data.data
                ))
            .catch(error => console.log(error))
    },
    methods: {
    //点击侧边导航栏的小社区按钮
    Onclick: function (num) {
      this.smItems=num
      this.change=true
      //this.$router.push({path:`/home/lists/${num}`});
    },
    //重置发帖模态框表单
    resetModal(){
        this.form.postTitle = '',
        this.form.postText = '',
        this.modalState = null
    },
    //发送帖子信息
    sendPost: function (){
        if(this.form.postTitle!=''&&this.form.postDesc!=''){
        this.$axios({
          method:"put",
          url:"/post",
          headers:{
            'Content-type':'application/json'
          },
          data:{
            postTitle: this.form.postTitle,
            postDesc: this.form.postDesc,
            postSmIdRef: this.smItems.smId,
            postUserIdRef: 24
          }
        })
        .then((response) => {
          console.log(response.data);
           this.update = false;
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
                this.update = true});
          this.$bvToast.toast(response.data.msg, {
            title: `提示信息`,
            toaster: "b-toaster-top-center",
            variant: "success",
            solid: true
          });
          
          this.form.postTitle = '';
          this.form.postText = '';
         })
        }
        
      }
    }

}
</script>