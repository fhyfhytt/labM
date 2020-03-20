<template>
  <div class="pass-container">
    <el-row class="loginRow">
      <el-col :xs="{offset:2,span:20}" :sm="{offset:8,span:8}" :md="{offset:8,span:8}" :lg="{offset:8,span:8}">
        <div class="form-content">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <img src="../../assets/img/login/logoimg2.png" class="title">
            <el-form-item label="账户名:" prop="userName">
              <el-input v-model="ruleForm.userName" type="text" name="userName" placeholder="输入账户名" autocomplete="off" @input="delHtmlTag" /><br>
            </el-form-item>
            <el-form-item label="新密码:" prop="password">
              <el-input v-model="ruleForm.password" name="password" type="password" autocomplete="off" placeholder="输入新密码" />
            </el-form-item>
            <el-form-item label="确认新密码:" prop="checkPassword">
              <el-input v-model="ruleForm.checkPassword" name="checkPassword" type="password" autocomplete="off" placeholder="确认新密码" />
            </el-form-item>
            <el-form-item>
              <el-button class="passButton" type="primary" @click="submitForm('ruleForm')">重设密码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="passButton2" @click="returnLogin">取消修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { resetLogin } from '@/api/user.js'
export default {
  name: 'ForgetPassword',
  data() {
    var validatePass3 = (rule, value, callback) => {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      var myreg = /^[a-zA-Z]\w{3,15}$/
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (pattern.test(value)) {
        callback(new Error('账号不含除-符号以外的符号'))
      } else if (!myreg.test(value)) {
        callback(new Error('账号为4-16位字母或数字开头必须为字母'))
      } else {
        callback()
      }
    }
    // var validatePass4 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入原密码'))
    //   } else {
    //     callback()
    //   }
    // }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      ruleForm: {
        password: '', // 新密码
        checkPassword: '', // 确认新密码
        userName: '' // 手机号
        // code: ''// 原密码
      },
      rules: {
        userName: [{ validator: validatePass3, trigger: 'blur' }],
        // code: [{ validator: validatePass4, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPassword: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    returnLogin() {
      this.$router.push({ path: 'login' })
      console.log(this.$route)
    },
    delHtmlTag(value) {
      value = value.replace(/<\/?[^>]*>/gim, '') // 去掉所有的html标记
      value = value.replace(/(^\s+)|(\s+$)/g, '')// 去掉前后空格
      value = value.replace(/\s/g, '') // 去除文章中间空格
      this.ruleForm.userName = value
    },
    // 重置密码
    submitForm() {
      const param = {
        userName: this.ruleForm.userName.trim(),
        password: this.$md5(this.ruleForm.checkPassword.trim())
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          resetLogin(param).then(response => {
            if (response.code === 0) {
              this.$message.success('密码重置成功')
              this.$router.push({ path: '/login' })
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  lang="scss">
.pass-container{
  height: 100vh;
  background: url("../../assets/img/login/password-bj.png");
  background-size:100% 100%;
  overflow: hidden;
  .form-content{
    // border: 1px solid #000;
    background: #000;
    background-color:#fff;
    border-radius:16px;
    margin: 20% auto;
    text-align: center;
  }
  .demo-ruleForm{
      z-index: 99;
      position: relative;
      width: 450px;
      max-width: 100%;
      padding: 65px 31px ;
      margin: 0 auto;
      overflow: hidden;
      .el-input__inner {
        border:1px solid rgba(220,223,230,1);
        color:rgba(41,41,41,1);
      }
      .el-form-item.is-error .el-input__inner{
        border-color: #ff4949 !important;
      }
      .title{
        margin-bottom: 68px;
            width: 100%;
      }
      .button-content{
        position: absolute;
        top:1px;
        left:180px;
        width: 60%;
        padding-left: 13px;
        height: 42px;
        line-height: 21px;

        border: none;
      }
      .el-input--medium .el-input__inner {
          height: 42px;
          line-height: 42px;
      }
      .el-input__inner{
          background: transparent;
      }
      .el-form-item__label{
        font-size: 16px;
        color:rgba(41,41,41,1);
        font-weight: 600;
        font-family:"PingFangSC-Medium,PingFang SC" !important;
      }
      .passButton{
        width: 100%;
        font-size: 16px;
        background:linear-gradient(90deg,rgba(45,100,235,1) 0%,rgba(99,93,245,1) 100%);
        box-shadow:0px 11px 23px 0px rgba(70,96,239,0.34);
        border-radius:35px;
        border:none
      }
      .passButton:hover{
       opacity: 0.8;
     }
      .passButton2{
        // background: linear-gradient(to bottom, #2FCCEC, #1776C2);
        background: transparent;
        width: 100%;
        border: 1px solid #2FCCEC;
        font-size: 16px;
        border-radius:35px;
        &:hover{
          // background: linear-gradient(to bottom, #2FCCEC, #1776C2);
          opacity: 0.5;
        }
        // &.el-button:hover, &.el-button:focus{
        //   color: #ffffff
        // }
      }
  }
}
</style>
