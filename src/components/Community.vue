<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <div class="fly-panel">
          <div class="fly-panel-title fly-filter">
            <a>置顶</a>
            <router-link to="user/report">发表</router-link>
            <!-- <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>-->
          </div>
          <ul class="fly-list">
            <li v-for="(item, index) in ArticleTitle">
              <a href="user/home.html" class="fly-avatar">
               <!-- <img :src="item.photo" alt="贤心">-->
                <img :src="item.photo" alt="贤心">
              </a>
              <h2>
                <a class="layui-badge">{{item.articleType}}</a>
               <!-- <a href="jie/detail.html">{{item.articleTitle}}</a>-->
                <router-link :to="{name:'Com',query:{articleId:item.articleId}}">{{item.articleTitle}}</router-link>
              </h2>
              <div class="fly-list-info">
                <a href="user/home.html" link>
                  <cite>{{item.name}}</cite>
                </a>
                <span>{{item.createTime}}</span>

                <!--
                                <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
                -->
                <!--
                                <span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
                -->
                <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i>{{item.replyCount}}
              </span>
              </div>
              <div class="fly-list-badge">
                <!--
                <span class="layui-badge layui-bg-black">置顶</span>
                -->
                <span class="layui-badge layui-bg-red" v-if="item.articleType=='精帖'">精帖</span>

              </div>
            </li>
          </ul>
        </div>
        <div class="fly-panel" style="margin-bottom: 0;">

          <div class="fly-panel-title fly-filter">
          <span class="fly-filter-right layui-hide-xs">
          <a href="" class="" :id="item.id"  v-for="(item, index) in solr"
             @click.prevent="type($event)">{{item.name}}</a>
            <!--  <a href="">提问</a>
              <span class="fly-mid"></span>
              <a href="">讨论</a>
              <span class="fly-mid"></span>
              <a href="">公告</a>
              <span class="fly-mid"></span>
              <a href="">热议</a>-->
          </span>
          </div>

          <ul class="fly-list">
            <li v-for="(item,index) in ArticleTitles">
              <a href="user/home.html" class="fly-avatar">
                <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
              </a>
              <h2>
                <a class="layui-badge">{{item.articleType}}</a>
               <!-- <a href="jie/detail.html">{{item.articleTitle}}</a>-->
                <router-link :to="{name:'Com',query:{articleId:item.articleId}}">{{item.articleTitle}}</router-link>
              </h2>
              <div class="fly-list-info">
                <a href="user/home.html" link>
                  <cite>{{item.name}}</cite>
                  <!--
                  <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                  <i class="layui-badge fly-badge-vip">VIP3</i>
                  -->
                </a>
                <span>{{item.createTime}}</span>

                <span class="fly-list-kiss layui-hide-xs" title="浏览量"><i class="layui-icon">&#xe67a;</i>{{item.browseCount}}</span>
                <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
                <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i>{{item.replyCount}}
              </span>
              </div>
              <div class="fly-list-badge">
                <!--<span class="layui-badge layui-bg-red">精帖</span>-->
              </div>
            </li>
          </ul>
          <div style="text-align: center">

            <!--<a href="jie/index.html" class="laypage-next">更多求解</a>-->
            <div id="demo0"></div>
          </div>

        </div>
      </div>
      <div class="layui-col-md4">

        <div class="fly-panel">
          <h3 class="fly-panel-title">相关连接</h3>
          <ul class="fly-panel-main fly-list-static">
            <li v-for="(item,index) in connectData">
              <a :href="item.connect" target="_blank" >{{item.note}}</a>
            </li>
          </ul>
        </div>


        <div class="fly-panel">
          <div class="fly-panel-title">
            <el-button type="primary" @click="show = !show" icon="el-icon-edit">你想说什么?</el-button>
          </div>
          <div class="fly-panel-main">
            <div style="display: flex; margin-top: 5px;">
              <transition name="el-fade-in-linear">
                <div v-show="show">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="留下一点足迹吧?"
                    v-model="textarea">
                  </el-input>
                  <el-button type="success" style="margin-bottom:3px; margin-top:10px;margin-left:250px;width: 100px;height: 30px;float: right">发送</el-button>
                  <hr />
                </div>
              </transition>
            </div>
            <ul>
              <li>
                <h3>123dasda</h3>
                <span class="fly-list-info">小罗</span>
                <span class="fly-list-info">2018-09-10</span>
                <hr/>
              </li>
            </ul>
            <div class="block" style="text-align: center" id="communicationPage">
              <el-pagination
                layout="prev, pager, next"
                :total="communicationCount">
              </el-pagination>
            </div>
            <!-- 已签到状态 -->
            <!--
            <button class="layui-btn layui-btn-disabled">今日已签到</button>
            <span>获得了<cite>20</cite>飞吻</span>
            -->
          </div>
        </div>

        <div class="fly-panel fly-rank fly-rank-reply" id="LAY_replyRank">
          <h3 class="fly-panel-title">来访记录</h3>
          <dl>
            <!--<i class="layui-icon fly-loading">&#xe63d;</i>-->
            <dd>
              <a href="user/home.html">
                <img
                  src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"><cite>贤心</cite><i>来访106次</i>
              </a>
            </dd>
          </dl>
        </div>

        <dl class="fly-panel fly-list-one">
          <dt class="fly-panel-title">热议</dt>
          <dd>
            <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
            <span><i class="iconfont icon-pinglun1"></i> 16</span>
          </dd>
          <!-- 无数据时 -->
          <!--
          <div class="fly-none">没有相关数据</div>
          -->
        </dl>

        <!--<div class="fly-panel">
          <div class="fly-panel-title">
            这里可作为广告区域
          </div>
          <div class="fly-panel-main">
            <a href="http://layim.layui.com/?from=fly" target="_blank" class="fly-zanzhu"
               time-limit="2017.09.25-2099.01.01" style="background-color: #5FB878;">LayIM 3.0 - layui 旗舰之作</a>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ArticleTitle: [],
        solr: [{name: '所有', id: 'ww'},{name: '动态', id: 'qq'}, {name: '提问', id: 'bb'}, {name: '讨论', id: 'aa'}, {name: '公告', id: 'dd'}, {name: '精贴', id: 'ee'}],
        ArticleTitles: [],
        count:0,
        currentPage:1,
        articleType: '',
        connectData:[],
        show:false,
        textarea:'',
        communicationCount:40
      }
    },
    mounted:function() {
      $('#ww').addClass('layui-this')
      this.page();
    },
    methods:{
      type (event) {
        var val = '#' + event.toElement.id
        $(val).addClass('layui-this').siblings().removeClass('layui-this')
        if (event.toElement.innerText == "所有"){
          this.articleType = '';
          this.begin();
          this.page();
        }else {
        this.articleType = event.toElement.innerText
        this.begin();
        this.page();
        }
        console.log(event)
      },
     begin () {
        var that = this;
        $.ajax({
        url:that.devUrl+'ArticleTitle/PageArticleTitles',
        type:'GET', //GET
        async:false,    //或false,是否异步
        data:{
          currentPage: that.currentPage,
          articleType: that.articleType
        },
        success:function(respose){
          console.log(respose)
          that.ArticleTitles = respose.data
          that.count = respose.count;
        }
      })
      },
      page () {
        var that = this;
        layui.use('laypage', function(){
          var laypage = layui.laypage;
          //执行一个laypage实例
          laypage.render({
            elem: 'demo0',
            limit:8
            ,count: that.count
            ,jump: function(obj){
              that.currentPage = obj.curr
              console.log( obj.curr)
              that.begin();
            }
          });
        })
      },
      connect () {
        var that = this;
        $.ajax({
          url:that.devUrl+'connect/connectDesc',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{

          },
          success:function(respose){
            console.log(respose)
            that.connectData = respose.data
          }
        })
      }
    },
    created: function () {
      var that = this
      this.$axios.get(that.devUrl+'ArticleTitle/ArticleTitles')
        .then(function (response) {
          that.ArticleTitle = response.data.data
        })
       this.begin();
       this.connect();
      }
  }
</script>

<style scoped>
/*#communicationPage{
  position: absolute;
  left: 50%;
  right: 50%;

}*/
</style>
