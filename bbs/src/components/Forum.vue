<template>
<b-container>
<b-row class="justify-content-md-center">
    <b-col md="2" >
        <b-row md="12" class="justify-content-md-center p-3"> 
            <b-button v-b-modal.modal-center>发布帖子</b-button>
            <b-modal id="modal-center" centered title="编辑你要发布的帖子">
                <p class="my-4">Vertically centered modal!</p>
            </b-modal>
        </b-row>        
        <!-- 侧边导航栏 论坛分类 -->
        <div role="tablist">
        <!-- sidebar侧边导航栏 论坛分类菜单 用法：v-for 加上 b-card 为主体 b-collapse 作为风箱式打开菜单 -->
        <b-card v-for="menu in menus" :key="menu.bcId" v-bind:name="menu.bcName"  no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab" visible="false" >
                <b-button block href="#" v-b-toggle.accordion-1 variant="success">{{menu.bcName}}</b-button>
            </b-card-header>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">
                <b-card-body v-for="smallComm in menu.smallComms" :key="smallComm.smId" class="p-2" >
                    <b-button block href="#" v-b-toggle.accordion-1 variant="info" @click="Onclick(smallComm.smId,smallComm.smName,smallComm.smDesc)">{{smallComm.smName}}</b-button>
                </b-card-body>
            </b-collapse>
        </b-card>   
        </div>
    </b-col>
    <b-col md="10">
        <!-- 默认信息显示 -->
        <b-row v-if="!change" class="justify-content-md-center p-5 m-2" style="border: black solid thin;border-radius: 10px">
            <b-card-text style="font-weight:bold;font-family: Serif;font-size: 40px;">欢迎来到 BISTU BBS！</b-card-text>
         </b-row>
        <!-- 子版块信息显示 -->
        <b-row v-if="change" class="p-3 m-1" style="">
             <b-card class="">
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 30px;">{{smName}} </b-card-text>
                <b-card-text style="font-weight:bold;font-family: Serif;font-size: 20px;">{{smDesc}}</b-card-text>
            </b-card>
        </b-row>
        <!-- 帖子列表显示界面 -->
        <router-view></router-view>
    </b-col>
</b-row>
</b-container> 
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            change : false,
            code: '',
            menus: [],
            smId: '',
            smName: '',
            smDesc: ''
        }
    },
    mounted () {
        axios
            .get('comm')
            .then(response => (
                this.menus = response.data.data,
                this.code = response.data.code
                ))
            .catch(error => console.log(error))
    },
    methods: {
    Onclick: function (num,name,desc) {
      this.smName =name
      this.smId=num
      this.smDesc=desc
      this.change=true
    }
  }
}
</script>
