<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md6 fly-home-jie">
          <h3 class="fly-panel-title">最近收到的回复</h3>
          <div style="overflow-x:hidden;height:440px;margin-top: 8px">
          <ul class="home-jieda">
            <li v-for="(item,index) in userReply">
             <!-- <span class="fly-jing">精</span>-->
              <p>
                <span>{{item.createTime}}</span>
                在 <router-link :to="{name:'Com',query:{articleId:item.articleId}}" target="_blank">{{item.articleTitle}}</router-link>中收到 <span style="color: #1d01ff">{{item.name}} : </span>回复：
              </p>
              <div class="home-dacontent" v-html="item.note">
                <!--{{item.note.substr(4,item.note.length)}}-->
              </div>
            </li>
            <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div> -->
          </ul>
          </div>
      </div>

      <div class="layui-col-md6 fly-home-da">
          <h3 class="fly-panel-title">最近的回答</h3>
        <div style="overflow-x:hidden;height:440px;margin-top: 8px">
          <ul class="home-jieda">
            <li v-for="(item,index) in reply">
              <p>
                <span>{{item.createTime}}</span>
                在 <router-link :to="{name:'Com',query:{articleId:item.articleId}}" target="_blank">{{item.articleTitle}}</router-link>中回答：
              </p>
              <div class="home-dacontent" v-html="item.text">
              </div>
            </li>
            <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div> -->
          </ul>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        reply:[],
        userReply:[]
      }
    },
    mounted:function(){
      this.findReply();
      this.findUserReply();
    },
    methods: {
      findReply () {
        const  that = this;
        $.ajax({
          type:'GET',
          url:that.devUrl+'reply/findUserReply',
          data:{
            userId:that.$cookie.get("userId")
          },
          success:function (res) {
            that.reply = res.data;
            console.log(that.reply)
          }

        });
      },
      findUserReply () {
        const that = this;
        $.ajax({
          type: 'GET',
          url: that.devUrl + 'replyUser/findReplyUser',
          data: {
            CoverUserID: that.$cookie.get("userId")
          },
          success: function (res) {
            that.userReply = res.data;
            console.log(that.userReply)
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
