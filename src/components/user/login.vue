<template>
  <div>
    <div class="layui-col-md6" id="card">
    <div class="layui-card">
    <div class="layui-card-body">
     <div id="lk"><router-link to="/user/reg">立即注册吗?</router-link></div>
      <el-form style="margin-top: 50px;margin-bottom: 30px" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input type="input" style="width: 250px" v-model="ruleForm2.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" style="width: 250px" v-model="ruleForm2.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var userNameA = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var userPasswordA = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          userName: '',
          userPassword: ''
        },
        rules2: {
          userName: [
            { validator: userNameA, trigger: 'blur' }
          ],
          userPassword: [
            { validator: userPasswordA, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $.ajax({
              url:'http://localhost:8080/user/login',
              type:'POST', //GET
              xhrFields: {withCredentials: true},
              crossDomain:true,
              //async:false,    //或false,是否异步
              data:{
                userName:that.ruleForm2.userName,
                userPassword:that.ruleForm2.userPassword
              },
              success:function (res,textStatus, response) {
                if (res.code == 200){
                  console.log(that.$cookie.get("IsFlag"));
                  console.log(document.cookie.split(';'))
                  that.$cookie.set("photo",res.data.photo);
                  that.$cookie.set("name",res.data.name);
                  that.$cookie.set("userId",res.data.userId);
                  //登陆后展示头像和另外一个模块
                $('#loginName').html("<a href='#/user/Detail'><img src="+res.data.photo+" class='layui-nav-img'>"+res.data.name+"</a>");
                $('#quit').show();
                that.$message({
                  showClose: true,
                  message: res.msg,
                  customClass:'elabc',
                  type: 'success'
                });
                  that.$router.replace('/community')
                }else {
                  that.$message({
                    showClose: true,
                    message: res.msg,
                    //duration:2000000,
                    customClass:'elabc',
                    type: 'warning'
                });
                }
                console.log(res)
              },
              complete:function () {
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

  #card{
    position: absolute;
    right: 23%;
  }
  #lk{
    position: absolute;
    left: 400px;
    top: 68px;
    z-index: 100;
  }
  .elabc{
    position: absolute;
    top: 20%;
  }

</style>
