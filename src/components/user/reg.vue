<template>
  <div>
    <div class="layui-col-md6" id="card">
      <div class="layui-card">
        <div class="layui-card-body">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userName">
              <el-input type="input" style="width: 250px" v-model="ruleForm2.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input type="password" style="width: 250px" v-model="ruleForm2.userPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="userPasswordA">
              <el-input type="password" style="width: 250px" v-model="ruleForm2.userPasswordA" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名字" prop="name">
              <el-input type="input" placeholder="登录后的名字" style="width: 250px" v-model="ruleForm2.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="input" placeholder="请输入Email" style="width: 250px" v-model="ruleForm2.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
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
      var userName = (rule, value, callback) => {
        var Reg = /^[A-Za-z0-9]+$/;
        if (value === '') {
          callback(new Error('请输入账号'));
        } else if (!Reg.test(value)) {
          callback(new Error('请输入英文和数字'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if (value.min >6){
          callback(new Error('请输入6位以上的密码'));
        } else {
          if (this.ruleForm2.userPassword !== '') {
            this.$refs.ruleForm2.validateField('userPasswordA');
          }
          callback();
        }
      };
      var email = (rule, value, callback) => {
        var Reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+.)+[A-Za-z]{2,4}$/;
        if (value === '') {
          callback(new Error('请输入Email'));
        }else if (!Reg.test(value)){
          callback(new Error('请输入正确Email'));
        }else {
          callback();
        }

      }
      var name = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名字'));
        } else {
          callback();
        }

      }
      var phone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          callback();
        }

      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }
        else if (value !== this.ruleForm2.userPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          userName: '',
          userPassword: '',
          userPasswordA:'',
          name: '',
          email:'',
          phone:''
        },
        rules2: {
          userPassword: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          userPasswordA: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          userName: [
            { validator: userName, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { validator: email,trigger: 'blur'}
          ],
          name: [
            { validator: name,trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $.ajax({
              url:'http://localhost:8080/user/reg',
              type:'POST', //GET
              //sasync:false,    //或false,是否异步
              data:{
                userName:that.ruleForm2.userName,
                password:that.ruleForm2.userPassword,
                name:that.ruleForm2.name,
                email:that.ruleForm2.email
              },
              success:function (res) {
                  if(res.code==200){
                    that.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'success'
                    });
                    that.$router.replace("/user/login");
                  }
              }
            });
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

<style scoped>

  #card{
    position: absolute;
    right: 23%;
  }

</style>
