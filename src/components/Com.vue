<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{title}}</h1>
        </div>

        <!-- 帖子主体部分-->

        <div class="fly-panel detail-box">
        <div class="detail-body photos detail-box" id="ph" v-html="context">
        <!--  <p>
            该模版由 layui官方社区（<a href="http://fly.layui.com/" target="_blank">fly.layui.com</a>）倾情提供，只为表明我们对 layui 执着的信念、以及对未来持续加强的承诺。该模版基于 layui 搭建而成，可作为极简通用型社区的页面支撑。
          </p>
          <p>更新日志：</p>
          <pre>
          # v3.0 2017-11-30
          * 采用 layui 2.2.3 作为 UI 支撑
          * 全面同步最新的 Fly 社区风格，各种细节得到大幅优化
          * 更友好的响应式适配能力
          </pre>

          下载<hr>
          <p>
            官网：<a href="http://www.layui.com/template/fly/" target="_blank">http://www.layui.com/template/fly/</a><br>
            码云：<a href="https://gitee.com/sentsin/fly/" target="_blank">https://gitee.com/sentsin/fly/</a><br>
            GitHub：<a href="https://github.com/layui/fly" target="_blank">https://github.com/layui/fly</a>
          </p>-->
        </div>
      </div>

       <!-- 回帖部分-->

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li data-id="111" class="jieda-daan" v-for="(item,index) in findReply">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
               <!-- <a class="fly-avatar" href="">
                  <img :src="item.photo" alt=" ">
                </a>-->
                <router-link :to="{name:'MyHome',query:{userId:item.userId}}" target="_blank" class="fly-avatar">
                 <img :src="item.photo" alt=" ">
                </router-link>
                <div class="fly-detail-user">
             <!--     <a href="" class="fly-link">
                    <cite>{{item.name}}</cite>
                  </a>-->
                  <router-link :to="{name:'MyHome',query:{userId:item.userId}}" target="_blank" class="fly-link">
                    <cite>{{item.name}}</cite>
                  </router-link>
                  <span v-if="item.userId == userId">(楼主)</span>
                </div>

                <div class="detail-hits">
                  <span>{{item.createTime}}</span>
                </div>

              </div>
              <div class="detail-body jieda-body photos" v-html="item.text">

              </div>


              <!--                   分割                           -->


              <div style="padding-left: 80px">
                <ul class="jieda" id="jieda">
                  <li data-id="111" class="jieda-daan" v-for="(it,i) in item.replyUserEntity">
                    <a name="item-1111111111"></a>
                    <div class="detail-about detail-about-reply">
                     <!-- <a class="fly-avatar" href="">
                        <img style="width: 30px;height: 30px"  :src="it.photo" alt=" ">
                      </a>-->
                      <router-link :to="{name:'MyHome',query:{userId:it.userId}}" target="_blank" class="fly-avatar">
                        <img style="width: 30px;height: 30px"  :src="it.photo" alt=" ">
                      </router-link>
                      <div class="fly-detail-user">
                        <!--<a href="" class="fly-link">
                          <cite>{{it.name}}</cite>
                        </a>-->
                        <router-link :to="{name:'MyHome',query:{userId:it.userId}}" target="_blank" class="fly-link">
                          <cite>{{it.name}}</cite>
                        </router-link>
                        <span v-if="it.userId == userId">(楼主)</span>
                        <span>回复:</span>
                        <router-link :to="{name:'MyHome',query:{userId:it.coverUserId}}" target="_blank" class="fly-link">
                          <cite>{{it.coverName}}</cite>
                        </router-link>
                        <span v-if="it.coverUserId == userId">(楼主)</span>
                        <span>{{it.createTime}}</span>
                      </div>
                    </div>
                    <div class="detail-body jieda-body photos" v-html="it.note">

                    </div>
                    <div class="jieda-reply">
                      <span type="reply" @click="reply(it)">
                      <i class="iconfont icon-svgmoban53"></i>
                       回复
                      </span>
                     <!-- <div class="jieda-admin">
                        &lt;!&ndash;  <span type="edit">编辑</span>&ndash;&gt;
                        <span type="del">删除</span>
                      </div>-->
                    </div>
                  </li>
                </ul>
              </div>
              <div class="jieda-reply">
              <!--<span class="jieda-zan zanok" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>66</em>
              </span>-->
                <span type="reply" @click="reply(item)">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                <div class="jieda-admin">
                <!--  <span type="edit">编辑</span>-->
                <!--  <span type="del">删除</span>-->
                </div>
              </div>
            </li>

          <!--  <li data-id="111">
              <a name="item-1111111111"></a>
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>贤心</cite>
                  </a>
                </div>
                <div class="detail-hits">
                  <span>2017-11-30</span>
                </div>
              </div>
              <div class="detail-body jieda-body photos">
                <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
              </div>
              <div class="jieda-reply">
              &lt;!&ndash;<span class="jieda-zan" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>0</em>
              </span>&ndash;&gt;
                <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                </div>
              </div>
            </li>-->

            <li class="fly-none">消灭零回复</li>
          </ul>

          <div style="text-align: center">
          <div id="demo0"></div>
          </div>

          <div class="layui-form layui-form-pane">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
            </fieldset>
            <textarea class="layui-textarea" id="edit" style="display: none">

            </textarea>
            <button class="layui-btn" id="editSumbit" style="margin-top: 20px" lay-filter="*" lay-submit>提交回复</button>
          </div>
        </div>
    </div>


      <div class="layui-col-md4">

        <dl class="fly-panel fly-list-one">
          <dt class="fly-panel-title">热议</dt>
          <dd v-for="(item,index) in hostArticleTitle">
            <router-link :to="{name:'Com',query:{articleId:item.articleId}}" target="_blank">{{item.articleTitle}}</router-link>
            <span><i class="iconfont icon-pinglun1"></i>{{item.replyCount}}</span>
          </dd>
          <!-- 无数据时 -->
          <!--
          <div class="fly-none">没有相关数据</div>
          -->
        </dl>


        <div class="fly-panel">
          <dt class="fly-panel-title">留言</dt>
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
                  <el-button type="success" @click="saveCommunication" style="margin-bottom:3px; margin-top:10px;margin-left:250px;width: 100px;height: 30px;float: right">发送</el-button>
                  <hr />
                </div>
              </transition>
            </div>
            <ul>
              <li v-for="(item,index) in communication">
                <h3>{{item.text}}</h3>
                <span class="fly-list-info">{{item.name}}</span>
                <span class="fly-list-info">{{item.createTime}}</span>
                <hr/>
              </li>
            </ul>
            <div class="block" style="text-align: center" id="communicationPage">
              <el-pagination @current-change="findCommunication"
                             @prev-click="findCommunication"
                             :page-size= 5
                             @next-click="findCommunication"
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
            <dd v-for="(item,index) in visitor">
            <!--  <a href="user/home.html">
                <img
                  :src="item.photo"><cite>{{item.name}}</cite>
              </a>-->
              <router-link :to="{name:'MyHome',query:{userId:item.userId}}" target="_blank">
                <img
                  :src="item.photo"><cite>{{item.name}}</cite>
              </router-link>
              <i style="font-size: 10px">{{item.loginTime}}</i>
            </dd>
          </dl>
        </div>


        <div class="fly-panel">
          <h3 class="fly-panel-title">相关连接</h3>
          <ul class="fly-panel-main fly-list-static">
            <li v-for="(item,index) in connectData">
              <a :href="item.connect" target="_blank" >{{item.note}}</a>
            </li>
          </ul>
        </div>

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
        title:'',
        connectData:[],
        textarea:'',
        show:false,
        articleId:'',
        context:'',
        findReply:[],
        count:0,
        currentPage:1,
        userId:'',
        coverUserId:'',
        communicationCount:0,
        communication:'',
        communicationPage:'',
        visitor:[],
        hostArticleTitle:[]
      }

    },
    mounted:function() {
      this.connect();
      this.edit();
     // this.page();
      //this.findReplyA();
      $("#ph img").css("cursor","pointer");
      this.photo();
      this.findCommunication();
      this.findVisitor();
      this.findHostArticleTitle();
    },
    methods:{

      reply (it){
        const  that = this;
        const checkLogin = this.$checkLogin();
        const name = it.name;
        const coverUserId = it.userId;
        const photo = this.$cookie.get("photo");
        const nameA = this.$cookie.get("name");
        const userId = this.$cookie.get("userId");
        const replyId = it.replyId;
        console.log("----------"+replyId)
        console.log(it.name)
        var i = layer.open({
            type: 1,
            title: '回复',
            skin: 'layui-layer-rim', //加上边框
            area: ['820px', '350px'], //宽高
            content: '<textarea class="layui-textarea" id="rep" style="display: none">'+'</textarea>' +
              '<button class="layui-btn" id="repsumbit" style="margin-top: 20px;margin-left: 600px" lay-filter="*" lay-submit>提交回复</button>'
          })

        console.log("Com  "+checkLogin)
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
                url:that.devUrl+'replyUser/saveReplyUser',
                type:'POST', //GET
                async:false,    //或false,是否异步
                xhrFields: {withCredentials: true},
                crossDomain:true,
                data:{
                  coverUserId:coverUserId,
                  note:content,
                  photo:photo,
                  name:nameA,
                  userId:userId,
                  replyId:replyId,
                  coverName:name,
                  articleId:that.articleId
                },
                success:function(respose){
                  console.log(respose);
                  layer.close(i);
                  that.findReplyA();
                  layer.msg('回复成功');
                }
              })
            }
          })
        })
      },

      connect () {
        var that = this;
        $.ajax({
          url:that.devUrl+'connect/connectDesc',
          xhrFields: {withCredentials: true},
          crossDomain:true,
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{

          },
          success:function(respose){
            console.log(respose)
            that.connectData = respose.data
          }
        })
      },
      edit () {
        const that = this;
        const checkLogin = this.$checkLogin();
        const photo = this.$cookie.get("photo");
        const nameA = this.$cookie.get("name");
        const userId = this.$cookie.get("userId");
        layui.use('layedit',function () {
          var layedit = layui.layedit;
          var index = layedit.build('edit', {
            height: 180 //设置编辑器高度
          });
          $('#editSumbit').on('click',function () {
            var content =  layedit.getContent(index);
            console.log(content)

            console.log("Com  "+checkLogin)

            if (!checkLogin){
              that.$router.replace('/user/login');
              that.$message({
                showClose: true,
                message: '请先登录',
                customClass: 'article',
                type: 'warning'
              });
            }else {
            if (content == '') {
              layer.msg('请填写内容');
            }else{
              $.ajax({
                url:that.devUrl+'reply/saveReply',
                type:'POST', //GET
                async:false,    //或false,是否异步
                xhrFields: {withCredentials: true},
                crossDomain:true,
                data:{
                  text:content,
                  photo:photo,
                  name:nameA,
                  userId:userId,
                  articleId:that.articleId
                },
                success:function(respose){
                  console.log(respose);
                  that.findReplyA();
                  layer.msg('回复成功');
                  }
                 })
              }
            }
          })
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
            ,count: 40
            ,jump: function(obj){
            /*  that.currentPage = obj.curr
              console.log( obj.curr)
              that.begin();*/
            }
          });
        })
      },
      article () {
        var that = this;
        $.ajax({
          url:that.devUrl+'article/articleText',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{
            articleId:that.articleId
          },
          success:function(respose){
            console.log(respose)
            that.context = respose.data.articleEntitys.article;
            that.userId = respose.data.articleEntitys.userId;
            console.log( that.userId)
            that.title = respose.data.articleEntitys.articleTitle;
          }
        })
      },
      findReplyA () {
        var that = this;
        $.ajax({
          url:that.devUrl+'reply/findReply',
          type:'GET', //GET
          async:true,    //或false,是否异步
          data:{
            articleId:that.articleId,
            currentPage: that.currentPage
          },
          success:function(respose){
            console.log(respose)
            that.findReply = respose.data
            console.log("123");
          }
        })
      },
      photo () {
        layui.use('layer',function () {
          layer.ready(function () { //为了layer.ext.js加载完毕再执行
            layer.photos({
              photos: '#ph'
              //0-6的选择，指定弹出图片动画类型，默认随机
            });
          });
        })
      },
      saveCommunication () {
        var that = this;
        const  flag = this.$checkLogin();
        if (!flag){
          that.$router.replace('/user/login');
          that.$message({
            showClose: true,
            message: '请先登录',
            customClass: 'article',
            type: 'warning'
          });
        }else if (this.textarea!=''){
          $.ajax({
            url:that.devUrl+'communication/saveCommunication',
            type:'post', //GET
            async:false,    //或false,是否异步
            xhrFields: {withCredentials: true},
            crossDomain:true,
            data:{
              userId:that.$cookie.get("userId"),
              name:that.$cookie.get("name"),
              text:that.textarea
            },
            success:function(respose){
              console.log(respose)
              if (respose.code==200){
                that.textarea = '';
                layui.use('layer',function () {
                  const  layer = layui.layer;
                  layer.msg('留言成功');
                  that.findCommunication();
                })
              }
            }
          })
        }else {
          layui.use('layer',function () {
            const layer = layui.layer;
            layer.msg('请填写内容');
          })
        }
      },
      findCommunication (obj) {
        console.log("findCommunication:"+obj)
        const that = this;
        $.ajax({
          url:that.devUrl+'communication/findAllCommunication',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{
            //currentPage:that.communicationPage
            currentPage:obj
          },
          success:function(respose){
            console.log(respose)
            that.communication = respose.data;
            that.communicationCount = respose.count;
          }
        })
      },
      findVisitor () {
        const that = this;
        $.ajax({
          url:that.devUrl+'user/visitor',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{

          },
          success:function(respose){
            console.log(respose)
            that.visitor= respose.data;
          }
        })
      },
      findHostArticleTitle () {
        const that = this;
        $.ajax({
          url:that.devUrl+'ArticleTitle/findHostArticleTitle',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{

          },
          success:function(respose){
            console.log("findHostArticleTitle: "+respose.data)
            that.hostArticleTitle= respose.data;
            console.log(that.hostArticleTitle)
          }
        })
      }
    },
    created: function () {

     this.articleId = this.$route.query.articleId;
      this.article();
      this.findReplyA();
    }

  }
</script>

<style scoped>

</style>
