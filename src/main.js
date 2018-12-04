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



//Vue.prototype.devUrl = 'http://localhost:8080/';
Vue.prototype.devUrl = 'http://47.107.55.207:8080/';

Vue.prototype.$checkLogin = function () {
  var flag = true;
  var that = this;
  $.ajax({
    url: that.devUrl+'user/checkLogin',
    type: 'GET',
    async: false,
    xhrFields: {withCredentials: true},
    crossDomain:true,
    success: function (res) {
      if (res.code == 200) {
        $('#loginName').html("<a href='#/user/login'><i class='layui-icon'>&#xe66f;</i><span>&nbsp;登录</span></a>");
        flag = false;
        $('#quit').hide();
      } else {
        $('#loginName').html("<a href='#/user/userHome'><img src="+that.$cookie.get('photo')+" class='layui-nav-img'>"+that.$cookie.get('name')+"</a>");
        $('#quit').show();
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
