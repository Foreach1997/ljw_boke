<template>
  <div id="info">
    <div style="width:1000px;padding-top: 50px">
  <el-table
    :data="tableData"
    >
    <el-table-column
      label="日期"
      prop="createTime">
    </el-table-column>
    <el-table-column
      label="标题"
     >
      <template slot-scope="scope">
       <!-- <el-button
          @click.native.prevent="comRow(scope.$index, scope.row)"
          type="text"
          size="small">
         {{scope.row.articleTitle}}
        </el-button>-->
        <router-link style="color: #01AAED" :to="{name:'Com',query:{articleId:scope.row.articleId}}">{{scope.row.articleTitle}}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
       <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  <div class="block" style="text-align: center" id="communicationPage">
    <el-pagination @current-change="findUserArticleTitle"
                   @prev-click="findUserArticleTitle"
                   :page-size= 5
                   @next-click="findUserArticleTitle"
                   layout="prev, pager, next"
                   :total="count">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        count:0
      }
    },
    mounted:function(){
     this.findUserArticleTitle();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        const that = this;
        layer.confirm('你确定删除吗？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          $.ajax({
            url:that.devUrl+'ArticleTitle/delUserArticleTitle',
            type:'POST', //GET
            async:false,    //或false,是否异步
            xhrFields: {withCredentials: true},
            crossDomain:true,
            data:{
              articleId:row.articleId
            },
            success:function(respose){
              layer.msg('删除成功', {icon: 1});
              that.findUserArticleTitle();
            }
          })
        })
      },
      comRow (index, row) {
        console.log(index, row);

      },
      findUserArticleTitle () {
        const that = this;
        const userId = this.$cookie.get("userId");
        $.ajax({
          url:that.devUrl+'ArticleTitle/userArticleTitle',
          type:'GET', //GET
          async:false,    //或false,是否异步
          data:{
            userId:userId
          },
          success:function(respose){
            console.log("findHostArticleTitle: "+respose.data)
            that.tableData= respose.data;
            that.count = respose.count;
            console.log(that.tableData)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #info{
    margin-left: 3%;
  }
</style>
