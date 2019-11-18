import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Userinfo from '../components/Userinfo.vue'
import Forum from '../components/Forum.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Info from '@/components/Userinfo/Info.vue'
import Focus from '@/components/Userinfo/Focus.vue'
import List from '../components/Postlist.vue'
import About from '../components/About.vue'
import Fans from '@/components/Userinfo/Fans.vue'
import Post from "../components/Post.vue"

// 通过use方法加载axios插件
Vue.use(VueAxios,Axios);


Axios.defaults.baseURL = 'http://123.207.219.166:8080';

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    },
    children: [
      {
        path:'forum',
        name:'forum',
        component: Forum,
        children:[
          {
            path:'lists',
            name:'lists',
            component: List
          }
        ]
      },{
        path:'userinfo',
        name:'userinfo',
        component: Userinfo,
        children:[
          {
            path:'',
            name:'info',
            component: Info
          },{
            path:'focus',
            name:'focus',
            component: Focus
          },{
            path:'fans',
            name:'fans',
            component: Fans
          }
        ]
      },{
        path:'about',
        name:'about',
        component: About
      },{
        path:'post/:id',
        name:'post',
        component: Post,
        props: true
      }
    ]
  },
  {
    path:'/',
    name:'Welcome',
    component: Welcome
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if(localStorage.user){
      console.log("cookie存在");
      next();
    }else{
      console.log("cookie不存在");
      next({
        path: '/', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }else{//如果不需要权限校验，直接进入路由界面
    next();
  }
})

export default router
