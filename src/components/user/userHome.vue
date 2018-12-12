<template>
  <div class="layui-card" style="margin-left: 50px;margin-right: 50px;margin-top: -50px;">
  <el-container style="height: 500px; border: 1px solid #eee;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2']" :router = true>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>帖子管理</template>
          <el-menu-item-group>
            <el-menu-item index="/user/card/myCard">我的帖子</el-menu-item>
            <el-menu-item index="/user/card/myReply">我的回复</el-menu-item>
            <el-menu-item index="2-3">帖子回复</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i>账号管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">我的主页</el-menu-item>
            <el-menu-item index="3-2">我的好友</el-menu-item>
            <el-menu-item index="/user/card/myInfo">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
     <router-view></router-view>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  export default {


  }
</script>

<style scoped>

</style>
