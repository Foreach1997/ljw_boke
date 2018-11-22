<template>
  <div>
  <div>
    <ul class="layui-nav layui-bg-blue" style="text-align: center"  lay-filter="">
      <li id="home" class="layui-nav-item layui-this"><router-link to="/home">首页</router-link></li>
      <li id="journal" class="layui-nav-item"><router-link to="/journal">日志</router-link></li>
      <li id="community" class="layui-nav-item"><router-link to="/community">社区</router-link></li>
      <li id="author" class="layui-nav-item"><router-link to="/author">关于作者</router-link></li>
      <li id="login"  class="layui-nav-item">
        <div style="margin-left: 600px;" id="loginName">
          <router-link to="/user/login"><i class="layui-icon">&#xe66f;</i>
            <span>&nbsp;登录</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
  <div id="s" style="width: 100%;height: 110px">

  </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
     return {


     }
  },
  methods:{


  }



}
</script>
<style>
</style>
