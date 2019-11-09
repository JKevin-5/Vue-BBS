import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/welcome.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs';
        
// 通过use方法加载axios插件
Vue.use(VueAxios,Axios);

Axios.defaults.baseURL = 'http://123.207.219.166:8080';

//Vue.prototype.$axios = Axios;  //在Vue的原型上添加$axios方法
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
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
        path:'signin',
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
