<template>
    <div
      class="container"
    >
        <el-row type="flex" justify="fspace-between">
            <!-- 网站图标 -->
            <el-col :span="12" >
                <div class="page-logo" @click="pageLogoClicked">
                    <span style="color: #67C23A;font-size: 72px">i<span style="color: #409EFF">Movie</span></span>
                    <span style="color: #909399;font-size: 14px">一个精准的电影推荐网站</span>
                </div>

            </el-col>

            <!-- 用户输入 -->
            <el-col :span="12" style="padding: 92px 126px 92px 126px">
                <el-card :body-style="{ padding: '40px',height: '336px',width: '370px', }">
                    <!-- 输入用户名 -->
                    <div class="input-container">
                        <span>用户名</span>
                        <el-input style="height: 40px;width: 371px;margin: 0 0 0 0" placeholder="请输入用户名" v-model="username"></el-input>
                    </div>

                    <!-- 输入密码 -->
                    <div class="input-container" style="padding-top: 55px">
                        <span>密码</span>
                        <el-input style="height: 40px;width: 371px" v-model="password" placeholder="请输入密码" :type="inputType" show-password @keyup.enter.native="loginBtnClicked">
                            <i slot="suffix" class="el-input__icon el-icon-view el-input__clear" @click="showPasswordBtnClicked"/>
                        </el-input>
                    </div>

                    <!-- 登录按钮 -->
                    <div class="button-container">
                        <el-button type="danger" plain @click="cancelBtnClicked">取消</el-button>
                        <el-button type="primary" plain @click="loginBtnClicked" :loading="isLogining">{{ loginButtonText }}</el-button>
                    </div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      inputType: 'password',
      isLogining: false,
      loginButtonText: '登录'
    }
  },

  methods: {
    pageLogoClicked () {
      this.$router.push({
        name: 'LoginPage'
      })
    },
    cancelBtnClicked () {
      console.log('cancel')
    },

    loginBtnClicked () {
      console.log('login')
      console.log(this.username)
      console.log(this.password)
      var msgBoxTitle = ''
      var msgBoxContent = ''
      if (this.username === '') {
        msgBoxTitle = '输入错误'
        msgBoxContent = '用户名不能为空'
        this.$alert(msgBoxContent, msgBoxTitle, {
          confirmButtonText: '确定'
        })
      } else if (this.password === '') {
        msgBoxTitle = '输入错误'
        msgBoxContent = '密码不能为空'
        this.$alert(msgBoxContent, msgBoxTitle, {
          confirmButtonText: '确定'
        })
      } else {
        this.isLogining = true
        this.loginButtonText = '登录中'
        var formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        axios({
          method: 'POST',
          url: '/static/login',
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            this.isLogining = false
            this.loginButtonText = '登录'
            console.log(response)
            if (response.data.status === 'error') {
              msgBoxTitle = '登录错误'
              switch (response.data.error_code) {
              // 用户不存在
                case 0:
                  msgBoxContent = '用户不存在'
                  break
                  // 密码错误
                case 1:
                  msgBoxContent = '密码错误'
                  break
              }
              this.$alert(msgBoxContent, msgBoxTitle, {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            } else {
              this.$store.commit('setIsLogin', true)
              this.$store.commit('setLoginUserInfo', response.data.userInfo)
              msgBoxContent = '登录成功'
              this.$message({
                message: msgBoxContent,
                type: 'success',
                duration: 500,
                onClose: instance => {
                  console.log('succeed')
                  this.$router.push({
                    name: 'MainPage'
                  })
                }
              })
            }
          })
          .catch(error => {
            this.isLogining = false
            this.loginButtonText = '登录'
            if (error.response) { // 能够正常与服务器进行通信，但是服务器的响应中显示错误
              this.$alert(error.response.status, '网络错误', {
                confirmButtonText: '确定'
              })
            } else if (error.request) { // 能够发送请求，但是服务器无响应
              this.$alert('服务器无响应', '网络错误', {
                confirmButtonText: '确定'
              })
            } else { // 无法发送请求
              this.$alert('无法发送请求', '网络错误', {
                confirmButtonText: '确定'
              })
            }
          })
      }
    },

    showPasswordBtnClicked () {
      console.log('show password')
      if (this.inputType === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    }
  }
}
</script>

<style scoped>
.container{
    height:600px
}
.page-logo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 122px;
    width: 220px;
    padding-top: 200px;
    padding-left: 200px
}

.input-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 371px;
    height: 80px;
    margin: 0 0 0 0;
}

.button-container{
    display: flex;
    justify-content: flex-end;
    padding-top: 55px;
}
</style>
