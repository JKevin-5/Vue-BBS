import Vue from 'vue'
import App from './App.vue'
//import App from './views/Login.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Axios from 'axios'
import qs from 'qs';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.prototype.$axios = Axios;

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
