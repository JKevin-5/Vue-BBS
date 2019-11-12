<template>
    <div role="tablist">
        <!-- 
            sidebar侧边导航栏 论坛分类菜单
            用法：v-for 加上 b-card 为主体 b-collapse 作为风箱式打开菜单 
            -->
        <b-card v-for="menu in menus" :key="menu.bcId" v-bind:name="menu.bcName"  no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab" visible="false" >
                <b-button block href="#" v-b-toggle.accordion-1 variant="success">{{menu.bcName}}</b-button>
            </b-card-header>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">
                <b-card-body v-for="smallComm in menu.smallComms" :key="smallComm.smId" class="p-2" >
                    <b-button block href="#" v-b-toggle.accordion-1 variant="info" @click="Onclick()">{{smallComm.smName}}</b-button>
                </b-card-body>
            </b-collapse>
        </b-card>
        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data (){
        return {
            code: '',
            menus: [],

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
    Onclick: function () {
      this.$parent.change=true
    }
  }
}
</script>