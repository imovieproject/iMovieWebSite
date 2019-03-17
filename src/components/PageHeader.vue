<template>
    <div class="page-header">
        <!-- 页面logo -->
        <div class="page-logo" @click="gotoMainPage">
            <p style="color: #67C23A">i<span style="color: #409EFF">Movie</span></p>
        </div>

        <!-- 搜索输入框 -->
        <el-input
          v-if="isLogin"
          class="search-input"
          size="mini"
          placeholder="请输入要搜索的电影名称"
          suffix-icon="el-icon-search"
          v-model="searchInput"
        />

        <!-- 用户头像及用户名 -->
        <div class="user-info" v-if="isLogin">
            <img class="user-logo" v-bind:src="imageSrc"/>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" type="text">{{ getLoginUserName }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                <el-dropdown-item style="color: #F56C6C" divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="login-button" v-if="!isLogin">
          <el-button type="text" @click="loginBtnClicked">登录</el-button>
          <el-button type="text" @click="registerBtnClicked">注册</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: String(''),
      // 测试用图片链接
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690'
    }
  },
  methods: {
    gotoMainPage: function () {
      this.$router.push({
        name: 'MainPage'
      })
    },

    loginBtnClicked () {
      this.$router.push({
        name: 'LoginPage'
      })
    },

    registerBtnClicked () {
      this.$router.push({
        name: 'RegisterPage'
      })
    },

    userInfoBtnClicked () {
      this.$router.push({
        path: `/UserDetailPage/${this.$store.getters.getLoginUserId}`
      })
    },

    handleCommand (command) {
      console.log('command')
      if (command === 'userinfo') {
        this.userInfoBtnClicked()
      } else if (command === 'logout') {
        this.logoutBtnClicked()
      }
    },

    logoutBtnClicked () {
      this.$confirm('确定要退出登录？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setIsLogin', false)
          this.$store.commit('setLoginUserInfo', {})
          this.$router.push({
            name: 'LoginPage'
          })
        })
    }
  },

  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    },

    getLoginUserName () {
      return this.$store.getters.getLoginUserName
    }
  }
}
</script>

<style>
.page-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    position: fixed;
    z-index:999;
    background-color: #FFFFFF;
    border-bottom-style: solid;
  border-bottom-color: rgba(187,187,187,0.5);
  border-bottom-width: 1px;
}

.page-logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    text-align: center;
    height: 60px;
    margin-left: 40px;
    cursor: pointer;
}

.search-input{
    width: 400px;
    margin-left: 400px;
}

.user-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    color: #909399;
    margin-left: 30%;
}

.user-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.login-button {
    margin-left: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    padding-left: 30%;
}
</style>
