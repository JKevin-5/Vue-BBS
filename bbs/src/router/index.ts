import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/welcome.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Userinfo from '../components/User-info.vue'
import Forum from '../components/Forum.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Info from '@/components/Userinfo/Info.vue'
import Focus from '@/components/Userinfo/Focus.vue'
        
// 通过use方法加载axios插件
Vue.use(VueAxios,Axios);

Axios.defaults.baseURL = 'http://123.207.219.166:8080';

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path:'',
        name:'forum',
        component: Forum
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
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path:'/',
    name:'welcome',
    component: Welcome,
    children: [
      {
        path:'',
        name:'signin',
        component: Signin
      },{
        path:'signup',
        name:'signup',
        component: Signup
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
