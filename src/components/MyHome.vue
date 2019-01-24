<template>
  <div class="lay-blog">
      <div class="contar-wrap">
        <div class="container">
          <div class="item" v-for="(item,index) in userArticleTitle">
            <div class="item-box  layer-photos-demo1 layer-photos-demo">
              <h3><router-link :to="{name:'Detail',query:{userArticleId:item.userArticleId}}" target="_blank">{{item.userArticleTitle}}</router-link></h3>
              <h5>发布于：<span>{{item.createTime}}</span></h5>
              {{item.userArticleNote}}
            </div>
            <div class="comment count">
              <a href="" @click.prevent="reply(item)">评论</a>
              <a href="javascript:;" class="like" id="#ke" @click.prevent="agree(item)">点赞</a>
            </div>
          </div>
          <div class="item-btn" v-if="count>5">
            <button class="layui-btn layui-btn-normal">下一页</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
    export default {
        data () {
          return{
            userArticleTitle:[],
            userId:'',
            currentPage:1,
            count:0
          }
        },
        mounted:function (){
             this.findAllUserArticleTitle();
        },
        methods:{
          reply (it){
            console.log(it)
            const  that = this;
            const checkLogin = this.$checkLogin();
            const photo = this.$cookie.get("photo");
            const nameA = this.$cookie.get("name");
            const userId = this.$cookie.get("userId");
            const userArticleId = it.userArticleId;
            var i = layer.open({
              type: 1,
              title: '回复',
              skin: 'layui-layer-rim', //加上边框
              area: ['820px', '350px'], //宽高
              content: '<textarea class="layui-textarea" id="rep" style="display: none">'+'</textarea>' +
                '<button class="layui-btn" id="repsumbit" style="margin-top: 20px;margin-left: 600px" lay-filter="*" lay-submit>提交回复</button>'
            })

            if (!checkLogin){
              layer.close(i);
              that.$router.replace('/user/login');
              that.$message({
                showClose: true,
                message: '请先登录',
                customClass: 'article',
                type: 'warning'
              });
            }

            layui.use(['layedit','layer'],function () {
              var layedit = layui.layedit;
              var layer = layui.layer;
              layedit.set({
                uploadImage: {
                  url: that.devUrl+'article/uploadPhoto' //接口url
                  ,type: 'POST' //默认post
                }
              });
              var index = layedit.build('rep', {
                height: 180 //设置编辑器高度
              });
              $('#repsumbit').on('click',function () {
                var content = layedit.getContent(index);
                if (content == '') {
                  layer.msg('请填写内容');
                }else{
                  $.ajax({
                    url:that.devUrl+'userArticleReply/saveUserArticleReply',
                    type:'POST', //GET
                    async:false,    //或false,是否异步
                    data:{
                      replyText:content,
                      photo:photo,
                      name:nameA,
                      userId:userId,
                      userArticleId:userArticleId
                    },
                    success:function(respose){
                      console.log(respose);
                      layer.close(i);
                     // that.findReplyA();
                      layer.msg('回复成功');
                    }
                  })
                }
              })
            })
          },
          agree(it){
            const that = this;
            const userId = it.userId;
            const userArticleTitleId = it.userArticleTitleId;
            const userIdA = this.$cookie.get("userId");
            const checkLogin = this.$checkLogin();
            if (!checkLogin){
              this.$router.replace('/user/login');
              this.$message({
                showClose: true,
                message: '请先登录',
                customClass: 'article',
                type: 'warning'
              });
            }else {
            if (userId!=userIdA) {
              $.ajax({
                url: that.devUrl + 'userArticle/updateAgree',
                type: 'GET',
                async:false,
                data: {
                  userArticleTitleId:userArticleTitleId
                },
                success:function (res) {
                  layer.msg('+1');
                }

              })
            }else{
              layer.msg('自己请勿点赞');
              }
           }
          },
          page(){
            this.currentPage =  this.currentPage +1;
            this.findAllUserArticleTitle();
          },
          findAllUserArticleTitle (){
            const that = this;
            $.ajax({
              url:that.devUrl + 'userArticle/findAllUserArticleTitle',
              type:'GET',
              data:{
                userId: this.$route.query.userId,
                currentPage:that.currentPage
              },
              success:function (res) {
               that.userArticleTitle = res.data;
               that.count = res.count;
               console.log(res)
              }
            });
          }
        },
       created:function () {



        }
    }
</script>

<style scoped>
 @import "../../static/css/mian.css";

</style>
