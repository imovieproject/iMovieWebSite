<template>
    <div class="page-container">
        <!-- 标题 -->
        <p class="page-title">新用户注册</p>

        <!-- 输入用户名 -->
        <div class="input-container">
            <span>用户名</span>
            <el-input style="height: 50px;width: 360px;margin: 0 0 0 0" placeholder="请输入用户名" v-model="username"></el-input>
        </div>

        <!-- 输入密码 -->
        <div class="input-container" style="padding-top: 40px">
            <span>密码</span>
            <el-input style="height: 50px;width: 360px" v-model="password" placeholder="请输入密码" :type="inputType" show-password @keyup.enter.native="loginBtnClicked">
                <i slot="suffix" class="el-input__icon el-icon-view el-input__clear" style="height: 40px" @click="showPasswordBtnClicked"/>
            </el-input>
        </div>

        <!-- 确认密码 -->
        <div class="input-container" style="padding-top: 40px">
            <span>确认密码</span>
            <el-input style="height: 50px;width: 360px" v-model="confirmPassword" placeholder="请再次输入密码" :type="inputType" show-password @keyup.enter.native="loginBtnClicked">
                <i slot="suffix" class="el-input__icon el-icon-view el-input__clear" style="height: 40px" @click="showPasswordBtnClicked"/>
            </el-input>
        </div>

        <!-- 输入邮箱 -->
        <div class="input-container" style="padding-top: 40px">
            <span>邮箱</span>
            <el-input style="height: 50px;width: 360px;margin: 0 0 0 0" placeholder="请输入邮箱" v-model="email"></el-input>
        </div>

        <!-- 输入生日 -->
        <div class="input-container" style="padding-top: 40px">
            <span>生日</span>
            <el-date-picker type="date" style="height: 50px;width: 360px;margin: 0 0 0 0" placeholder="请输入生日" v-model="birthday"></el-date-picker>
        </div>

        <!-- 输入个性签名 -->
        <div class="input-container" style="padding-top: 40px">
            <span>请用一句话描述一下你自己吧</span>
            <el-input style="height: 50px;width: 360px;margin: 0 0 0 0" placeholder="请输入描述" v-model="description"></el-input>
        </div>

        <!-- 注册按钮 -->
        <div class="register-btn" style="padding-top: 40px">
            <el-button type="primary" @click="registerBtnClicked">注册</el-button>
            <el-button type="danger" @click="cancelBtnClicked">取消</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      birthday: '',
      age: '',
      description: '',
      inputType: 'password'
    }
  },

  methods: {
    getAge (birthday) {
      var userBirthday = new Date(birthday)
      var today = new Date()
      if (birthday === null) {
        return 0
      } else {
        return today.getYear() - userBirthday.getFullYear()
      }
    },

    registerBtnClicked () {
      if (this.username === '') {
        this.$alert('用户名不能为空', '输入错误', {
          confirmButtonText: '确定'
        })
      } else if (this.password === '') {
        this.$alert('密码不能为空', '输入错误', {
          confirmButtonText: '确定'
        })
      } else if (this.confirmPassword === '') {
        this.$alert('请再次输入密码以确认', '输入错误', {
          confirmButtonText: '确定'
        })
      } else if (this.password !== this.confirmPassword) {
        this.$alert('两次输入的密码不一致', '输入错误', {
          confirmButtonText: '确定'
        })
      } else {
        var formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        formData.append('email', this.email)
        formData.append('age', this.getAge(this.birthday))
        formData.append('description', this.description)
        axios
          .post('/static/register', formData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            if (response.data.status === 'error') {
              switch (response.data.error_code) {
                case 0:
                  this.$alert('用户已经存在', '输入错误', {
                    confirmButtonText: '确定'
                  })
                  break
              }
            } else {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 500,
                onClose: instance => {
                  this.$router.push({
                    name: 'MainPage'
                  })
                }
              })
            }
          })
      }
    },

    cancelBtnClicked () {

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
.page-container{
    padding-left: 480px;
    padding-right: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.page-title{
    font-size: 72px;
    color: #409EFF;
    top: 33px;
}

.input-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 360px;
    height: 80px;
    margin: 0 0 0 0;
}
</style>
