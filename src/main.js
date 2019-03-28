import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from '@/vuex/store.js'
import axios from '@/utils/axios/ajax.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset.css'

Vue.use(ElementUI)
// import {
//   Button,
//   Input,
//   Table,
//   TableColumn,
//   Pagination,
//   Upload,
//   Message,
//   Row,
//   Col,
//   Menu,
//   MenuItem,
//   MessageBox
// } from 'element-ui'
// Vue.use(Button).use(Input).use(Upload).use(Row).use(Col).use(Menu).use(MenuItem).use(TableColumn).use(Table).use(Pagination)
// Vue.prototype.$message = Message
// Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
