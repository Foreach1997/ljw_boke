<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
          </ul>
          <div>
            <el-input  placeholder="请输入内容" v-model="title">
              <template slot="prepend">输入标题：</template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
     data () {
       return{
       title:''

       }
     }


    }
</script>

<style>



</style>
