<template>
  <div class="login-container">
    <el-row class="loginRow">
      <el-col :xs="{offset:3,span:18}" :sm="{offset:14,span:8}" :md="{offset:14,span:8}" :lg="{offset:16,span:6}">
        <div class="img-ruleForm">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off">
            <img src="../../assets/img/login/logoimg.png" class="title">
            <div class="title-container">
              <h2>用户登录</h2>
            </div>
            <el-form-item prop="userName">
              <el-input ref="username" v-model="loginForm.userName" placeholder="账号" tabindex="1" placeholder-style="color:#C1CEE0;font-size:14px;" name="userName" type="text" autocomplete="on" @input="delHtmlTag" />
              <i class="iconfont iconbianzubeifen inputimg" />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password" style="margin-bottom: 32px;">
                <el-input
                  ref="password"
                  :key="passwordType"
                  v-model="loginForm.password"
                  placeholder="密码"
                  tabindex="2"
                  placeholder-style="color:#C1CEE0;font-size:14px;"
                  :type="passwordType"
                  name="password"
                  autocomplete="on"
                  @blur="capsTooltip=false"
                  @keyup.native="checkCapslock"
                />
                <i class="iconfont iconbianzubeifen1 inputimg" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>
            <el-button :loading="loading" type="primary" class="loginaButton" @click.native="handleLogin">登录</el-button>

          </el-form>
        </div>
      </el-col>
    </el-row>

    <div class="foot-content">
      <p>浙江省机电设计研究院</p>
      <p style="white-space:nowrap">浙江省杭州市滨江区庙后王路125号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    // 密码校验
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      var myreg = /^[a-zA-Z]\w{3,15}$/
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (pattern.test(value)) {
        callback(new Error('账号不含除-符号以外的符号'))
      } else if (!myreg.test(value)) {
        callback(new Error('账号为4-16位字母或数字,首位必须为字母'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ validator: validatePass2, trigger: 'change' }],
        password: [{ trigger: 'change', validator: validatePassword }] },
      loading: false,
      redirect: undefined,
      otherQuery: {},
      passwordType: 'password',
      capsTooltip: false// 输入密码是否显示
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.userName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    // 绑定enter事件
    this.enterKeyup()
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed()
  },
  methods: {
    // 密码是否显示
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const param = {
            userName: this.loginForm.userName,
            password: this.$md5(this.loginForm.password.trim())
          }
          this.$store.dispatch('user/login', param)
            .then((response) => {
              // debugger
              this.loading = false
              if (response.success === true) {
                this.$router.push({ path: this.redirect || '/dashboard', query: this.otherQuery })
              } else {
                this.$message.error(response.msg)
              }
            })
            .catch((response) => {
              this.loading = false
              if (response instanceof Object && response.msg !== undefined) {
                this.$message.error(response.msg)
              } else {
                this.$message.error(response + '')
              }
            })
        } else {
          return false
        }
      })
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ path: '/forgetPassword' })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    enterKeyupDestroyed() {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup() {
      document.addEventListener('keyup', this.enterKey)
    },
    enterKey(event) {
      const componentName = this.$options.name
      if (componentName === 'Login') {
        const code = event.keyCode
          ? event.keyCode
          : event.which
            ? event.which
            : event.charCode
        if (code === 13) {
          this.handleLogin()
        }
      }
    },
    delHtmlTag(value) {
      value = value.replace(/<\/?[^>]*>/gim, '') // 去掉所有的html标记
      value = value.replace(/(^\s+)|(\s+$)/g, '') // 去掉前后空格
      value = value.replace(/\s/g, '') // 去除文章中间空格
      this.loginForm.userName = value
    }
  }
}
</script>

<style lang="scss" >
.login-container {
  .loginRow{
    margin-top: 11%;
  }
  .el-form-item{
    background: transparent!important
  }
  background: url("../../assets/img/login/login.png");
  background-size:100% 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .title-container{
    h2{
      font-size:24px;
      font-family:"PingFangSC-Medium,PingFang SC";
      font-weight:700;
      color:#292929;
    }
  }
  .game-img{
      float: left;
      margin-top: -80px;
      margin-left: 100px;
  }
  .img-ruleForm{
      // position: fixed;
      // right:13%;
      // top:25%;
      background: #fff;
      // width:444px;
      // height:474px;
      background:rgba(255,255,255,1);
      box-shadow:0px 32px 43px 0px rgba(56,63,208,0.44);
      border-radius:16px;
  }
  .login-form {
    position: relative;
    width: 350px;
    max-width: 100%;
    padding: 40px 28px;
    margin: 0 auto;
    overflow: hidden;
    .title{
          margin: 4% auto;
          width: 100%
    }
    .inputimg{
      position: absolute;
      top: 1px;
      // margin-left: 10px;
      font-size: 20px;
      color:#C1CEE0;
      left: 10px;
    }
    .el-input--medium .el-input__inner {
        height: 40px;
        line-height: 40px;

    }
    .el-input__inner{
        background:rgba(245,247,250,1);
        border-radius:35px;
        border: 1px solid #fff;
        box-sizing: border-box;
        color:black;
        padding-left:40px;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        color: black;
        opacity:0.6;
     }
     .forgetPassWord{
       position: relative;
       z-index: 99;
     }
     .loginaButton{
        font-size: 16px;
        width: 100%;
        margin-bottom: 30px;
        height: 40px;
        background:linear-gradient(90deg,rgba(45,100,235,1) 0%,rgba(99,93,245,1) 100%);
        box-shadow:0px 11px 23px 0px rgba(70,96,239,0.34);
        border-radius:35px;
        border:transparent;
        font-weight:600;
        font-family:"PingFangSC-Medium,PingFang SC" !important;
     }
     .loginaButton:hover{
       opacity: 0.8;
     }
     a:hover{
       text-decoration: underline;
     }
  }
  .foot-content{
      clear: both;
      color: #fff;
      font-size: 14px;
      text-align: center;
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%)
  }

}
</style>
