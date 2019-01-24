<template>
  <div class="lay-blog">
  <div class="container-wrap" style="margin-top: -150px">
    <div class="container container-message container-details">
      <div class="contar-wrap">
        <div class="item">
          <div class="item-box  layer-photos-demo1 layer-photos-demo">
            <h3>{{userArticle.userArticleTitle}}</h3>
            <h5>发布于：<span>{{userArticle.createTime}}</span></h5>
            {{userArticle.userArticleText}}
            <img src="" alt="">
            <div class="count layui-clear">
              <span class="pull-left">阅读 <em>{{userArticle.visitCount}}</em></span>
              <span class="pull-right like"><i class="layui-icon layui-icon-praise"></i><em>{{userArticle.agree}}</em></span>
            </div>
          </div>
        </div>
        <!--<a name="comment"> </a>
        <div class="comt layui-clear">
          <a href="javascript:;" class="pull-left">评论</a>
          <a href="comment.html" class="pull-right">写评论</a>
        </div>-->
        <div id="LAY-msg-box">
          <div class="info-item" v-for="(item,index) in userArticleReply">
            <router-link :to="{name:'MyHome',query:{userId:item.userId}}" target="_blank">
            <img class="info-img" style="width: 80px;height: 80px;" :src="item.photo">
            </router-link>
            <div class="info-text">
              <p class="title count">
                <router-link :to="{name:'MyHome',query:{userId:item.userId}}" target="_blank">
                <span class="name">{{item.name}}</span>
                </router-link>
                <!--  <span class="info-img like"><i class="layui-icon layui-icon-praise"></i>5.8万</span>-->
              </p>
              <div v-html="item.replyText"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userArticle:'',
        userArticleReply:[]
      }
    },
    mounted:function (){
      this.updateVisitCount();
      this.findUserArticle();
      this.findUserArticleReply();
    },
    methods:{
      updateVisitCount () {
        const that = this;
        const userArticleId = this.$route.query.userArticleId;
        $.ajax({
          url:that.devUrl + 'userArticle/updateVisitCount',
          type:'GET',
          async:false,
          data:{
            userArticleId:userArticleId
          },
          success:function (res) {

          }
        })
      },
      findUserArticle () {
        const that = this;
        const userArticleId = this.$route.query.userArticleId;
        $.ajax({
          url:that.devUrl + 'userArticle/findUserArticle',
          type:'GET',
          async:false,
          data:{
            userArticleId:userArticleId
          },
          success:function (res) {
            that.userArticle = res.data;
            console.log(that.userArticle)
          }
        })
      },
      findUserArticleReply () {
        const that = this;
        const userArticleId = this.$route.query.userArticleId;
        $.ajax({
          url:that.devUrl + 'userArticleReply/findUserArticleReply',
          type:'GET',
          async:false,
          data:{
            userArticleId:userArticleId
          },
          success:function (res) {
            that.userArticleReply = res.data;
            console.log(that.userArticleReply)
          }
        })
      }




    }
  }
</script>

<style scoped>
  @import "../../../static/css/mian.css";
</style>
