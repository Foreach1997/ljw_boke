<template>
  <div style="margin-top: -80px;" class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
          </ul>
          <div>
            <el-input style="margin-top: 20px;" placeholder="请输入内容" v-model="title">
              <template slot="prepend">输入文章标题：</template>
            </el-input>
            <div class="layui-row">
            <el-select  style="margin-top: 20px;margin-bottom: 20px;"  v-model="type" clearable placeholder="请选择文章类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <textarea class="layui-textarea" id="edit" style="display: none">

            </textarea>
            <button class="layui-btn"  id="editSumbit" style="margin-top: 20px" lay-filter="*" lay-submit>发表</button>
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
       title:'',
         options:[{
           value: '动态',
           label: '动态'
         }, {
           value: '提问',
           label: '提问'
         }, {
           value: '讨论',
           label: '讨论'
         }],
         type: '',
         content:''
       }
     },
      mounted:function () {
        this.edit();
        const checkLogin = this.$checkLogin();
        console.log("report  "+checkLogin)
          if (!checkLogin){
            this.$router.replace('/user/login');
            this.$message({
              showClose: true,
              message: '请先登录',
              customClass: 'article',
              type: 'warning'
            });
          }
      },
      methods:{
        edit () {
          const  that = this;
          layui.use('layedit',function () {
            var layedit = layui.layedit;
            layedit.set({
              uploadImage: {
                url: that.devUrl+'article/uploadPhoto' //接口url
                ,type: '' //默认post
              }
            });
            var index = layedit.build('edit', {
              height: 180 //设置编辑器高度
            });
            $('#editSumbit').on('click',function () {
              var content =  layedit.getContent(index);
              that.content= content;
              console.log(content);
              if (that.title==''){
                that.$message({
                  showClose: true,
                  message: '请填写标题',
                  customClass: 'article',
                  type: 'warning'
                });
              }
              else if (that.type==''){
                that.$message({
                  showClose: true,
                  message: '请填写类型',
                  customClass: 'article',
                  type: 'warning'
                });
              }
              else if (that.content==''){
                that.$message({
                  showClose: true,
                  message: '请填写内容',
                  customClass: 'article',
                  type: 'warning'
                });
              }else {
              $.ajax({
                url:that.devUrl+'article/report',
                type:'post',
                xhrFields: {withCredentials: true},
                crossDomain:true,
                data:{
                  articleTitle: that.title,
                  articleType: that.type,
                  article: that.content,
                  userId: that.$cookie.get('userId'),
                  photo:that.$cookie.get('photo')
                },
                success:function (res) {
                  if (res.code == 200) {
                    that.$router.replace('/community');
                    that.$message({
                      showClose: true,
                      message: '发表成功',
                      customClass: 'article',
                      type: 'success'
                    });
                    }
                  }
                });
              }
            })
          })
        }
      }
    }
</script>

<style>

.article{
  position: absolute;
  top: 20%;
}


</style>
