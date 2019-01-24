/*(function () {
  const MyLogin = {}
  MyLogin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myLoginMethod = function () {
      console.log("12331231231")
      const IsFlag =  this.$cookie.get();
      console.log(IsFlag)
      if (IsFlag == "true"){
        $('#loginName').html("<a href='#/user/Detail'><img src="+res.data.photo+" class='layui-nav-img'>"+res.data.name+"</a>")
      }else {
        $('#loginName').html("<a href='#/user/login'><i class='layui-icon'>&#xe66f;</i><span>&nbsp;登录</span></a>");
      }
    }

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {

    }
  }
  window.MyLogin = MyLogin;
})()*/
$(function() {
  alert("123");
})
