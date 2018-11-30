<template>
  <div id="info">
    <el-upload style="padding-left: 100px"
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名字" prop="name">
  <el-input type="input" placeholder="登录后的名字" style="width: 250px" v-model="ruleForm2.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="userPassword">
  <el-input type="password" style="width: 250px" v-model="ruleForm2.userPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码"   prop="userPasswordA">
    <el-input type="password" style="width: 250px" v-model="ruleForm2.userPasswordA" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">确认修改</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>
<script>

  export default {
    data() {
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
      var name = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名字'));
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
      }
      return {
        imageUrl: '',
        ruleForm2: {
          userPassword: '',
          userPasswordA:'',
          name: '',
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
          name: [
            { validator: name,trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  #info{
    margin-top:8% ;
    margin-left: 25%;
  }
</style>
