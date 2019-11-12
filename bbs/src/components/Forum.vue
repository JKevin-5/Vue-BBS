<template>
<b-container>
<b-row class="justify-content-md-center">
    <b-col md="2" >        
        <!-- 侧边导航栏 论坛分类 -->
        <Tree-view/>
    </b-col>
    <b-col md="10">
        <!-- 显示界面 -->
        
        <router-view></router-view>
    </b-col>
</b-row>
</b-container> 
</template>
<script>

</script>
