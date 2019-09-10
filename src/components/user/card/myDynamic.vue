<template>
  <div class="layui-container fly-marginTop">
    <div  pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">发表动态<!-- 编辑帖子 --></li>
          </ul>
          <div>
            <el-input style="margin-top: 20px;" placeholder="请输入内容" v-model="title">
              <template slot="prepend">输入文章标题：</template>
            </el-input>
            <el-input style="margin-top: 10px;margin-bottom: 10px;" placeholder="请输入内容" v-model="userArticleText">
              <template slot="prepend">输入文章简介：</template>
            </el-input>
            <div class="layui-row">
            </div>
            <textarea class="layui-textarea" id="edit" style="display: none">

            </textarea>
            <button class="layui-btn"  id="editSumbit" style="margin-top: 20px" lay-filter="*" lay-submit>发表</button>
            <button class="layui-btn" @click="dynamic"  id="myDynamic" style="margin-top: 20px;float: right" lay-filter="*" lay-submit>我的主页</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myDynamic",
        data () {
          return{
           title:'',
           userArticleText:'',
           content:''
          }
        },
        mounted:function () {

          this.edit()

        },
        methods:{
          dynamic(){
            const userId = this.$cookie.get("userId");
            let routeData =  this.$router.resolve({ path: '/MyHome', query: { userId: userId}});
            window.open(routeData.href, '_blank');
          },
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
                else if (that.userArticleText==''){
                  that.$message({
                    showClose: true,
                    message: '请填写内容简介',
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
                    url:that.devUrl+'userArticle/saveUserArticle',
                    type:'post',
                    xhrFields: {withCredentials: true},
                    crossDomain:true,
                    data:{
                      userArticleTitle: that.title,
                      userArticleNote:that.userArticleText,
                      userArticleText: that.content,
                      userId: that.$cookie.get('userId'),
                    },
                    success:function (res) {
                      if (res.code == 200) {
                       // that.$router.replace('/community');
                        that.title = '';
                        that.userArticleText = '';
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
          },

        }
    }
</script>

<style scoped>

</style>
