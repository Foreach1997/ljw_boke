import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Journal from '../components/Journal'
import Author from '../components/Author'
import Community from '../components/Community'
import Com from '../components/Com'
import Login from '../components/user/login'
import Reg from  '../components/user/reg'
import Detail from '../components/user/detail'

Vue.use(Router)

export default new Router({
  /*mode: 'history',
  base: '/ljw_boke/',*/
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/journal',
      component: Journal
    },
    {
      path: '/author',
      component: Author
    },
    {
      path: '/community',
      component: Community
    },
    {
      path:'/',
      redirect:'/community'
    },
    {
     path:'/com',
     component: Com
    },
    {
      path:'/user/login',
      component: Login
    },
    {
      path:'/user/reg',
      component: Reg
    },
    {
      path:'/user/Detail',
      component: Detail
    }
  ]
})
