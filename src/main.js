import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from '@/vuex/store.js'
import axios from '@/utils/axios/ajax.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset.css'

Vue.use(ElementUI)

// 全局导航守卫用于登录和权限验证
router.beforeEach((to, from, next) => {
  let userInfo = store.state.userInfo.userInfo
  console.log(userInfo)
  console.log(to.meta)
  // 判断本地是否有用户信息
  console.log(to)
  // 如果是去登录页面不进行鉴权
  if (to.path === '/login') {
    return next()
  }
  if (userInfo) {
    // 有用户信息就进行权限鉴定
    if (to.meta.role.includes(userInfo.role)) {
      next()
    } else {
      ElementUI.Message.warning('权限不足，请向超级管理员申请')
    }
  } else {
    next('/login')
  }
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
