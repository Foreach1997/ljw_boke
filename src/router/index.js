import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Journal from '../components/Journal'
import Author from '../components/Author'
import Community from '../components/Community'
import Com from '../components/Com'

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
      path:'/',
      redirect:'/home'
    },
    {
     path:'/com',
     component: Com
    }
  ]
})
