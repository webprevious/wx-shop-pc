import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import About from '@/views/about'
import Ie from '@/views/test-ie'
import Register from '@/views/register'
import Upload from '@/views/upload'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/ie',
      name: 'Ie',
      component: Ie
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
