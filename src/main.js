import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from '@/vuex/store.js'
import axios from '@/utils/axios/ajax.js'
import '@/assets/reset.css'

import { Button, Input, Upload, Message } from 'element-ui'
Vue.use(Button).use(Input).use(Upload)
Vue.prototype.$message = Message

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
