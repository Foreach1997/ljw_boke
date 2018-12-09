<template>
  <div>
    <div style="width:1000px;margin-left:100px;padding-top: 50px">
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
        <el-button
          @click.native.prevent="deleteRow(scope.$index, scope.row)"
          type="text"
          size="small">
         {{scope.row.articleTitle}}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      },
      deleteRow (index, row) {
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
            console.log(that.tableData)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #info{
    margin-top:2% ;
    margin-left: 25%;
  }
</style>
