import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  showNaviBar: true,
  isLogin: false,
  loginUserInfo: {
    _id: '',
    name: '',
    email: '',
    age: '',
    description: '',
    movie_statistic: [],
    movie_watched: [],
    movie_towatch: []
  }
}

const getters = {
  showNaviBar () {
    return state.showNaviBar
  },

  isLogin () {
    return state.isLogin
  },

  getLoginUserInfo () {
    return state.loginUserInfo
  },

  getLoginUserName () {
    return state.loginUserInfo.name
  },

  getLoginUserId () {
    return state.loginUserInfo._id
  },

  getLoginUserMovieStatic () {
    return state.loginUserInfo.movie_statistic
  }
}

const mutations = {
  setShowNaviBar (state, isShow) {
    state.showNaviBar = isShow
  },

  setIsLogin (state, isLogin) {
    state.isLogin = isLogin
  },

  setLoginUserInfo (state, loginUserInfo) {
    state.loginUserInfo = loginUserInfo
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
