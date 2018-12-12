import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Journal from '../components/Journal'
import Author from '../components/Author'
import Community from '../components/Community'
import Com from '../components/Com'
import Login from '../components/user/login'
import Reg from '../components/user/reg'
import Detail from '../components/user/detail'
import Report from '../components/user/report'
import userHome from '../components/user/userHome'
import MyCard from '../components/user/card/myCard'
import MyInfo from '../components/user/card/myInfo'
import MyReply from '../components/user/card/myReply'

Vue.use(Router)

export default new Router({
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
      path: '/',
      redirect: '/community'
    },
    {
      path: '/com',
      name: 'Com',
      component: Com
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/user/reg',
      component: Reg
    },
    {
      path: '/user/detail',
      component: Detail
    },
    {
      path: '/user/report',
      component: Report
    },
    {
      path: '/user/userHome',
      component: userHome,
      children: [{
        path: '/user/card/myCard',
        component: MyCard
      },
      {
        path: '/user/card/myInfo',
        component: MyInfo
      },
      {
        path: '/user/card/myReply',
        component: MyReply
      }
      ]
    }
  ]
})
