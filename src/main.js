// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import cookie from 'vue-js-cookie'
Vue.config.productionTip = false

Vue.prototype.$login = function () {
  const IsFlag = this.$cookie.get('IsFlag')
  console.log(this.$cookie.get('userId'))
  console.log(this.$cookie.get('JSESSIONID'))
  console.log(IsFlag)
  if (IsFlag == 'true') {
    console.log('312312312')
    $('#loginName').html("<a href='#/user/Detail'><img src=" + this.$cookie.get('photo') + " class='layui-nav-img'>" + this.$cookie.get('name') + '</a>')
    $('#quit').show()
  } else {
    $('#loginName').html("<a href='#/user/login'><i class='layui-icon'>&#xe66f;</i><span>&nbsp;登录</span></a>")
  }
}
Vue.prototype.$checkLogin = function () {
  var flag = true
  $.ajax({
    url: 'http://localhost:8080/user/checkLogin',
    type: 'GET',
    async: false,
    success: function (res) {
      flag = false
      if (res.code == 200) {
        $('#loginName').html("<a href='#/user/login'><i class='layui-icon'>&#xe66f;</i><span>&nbsp;登录</span></a>")
        $('#quit').hide()
      } else {
        $('#loginName').html("<a href='#/user/login'><i class='layui-icon'>&#xe66f;</i><span>&nbsp;登录</span></a>")
      }
    }
  })
  return flag
}

Vue.use(element)
Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookie
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
