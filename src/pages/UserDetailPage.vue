<template>
    <div>
        <!-- 用户资料 -->
        <el-row class="user-info">
            <!-- 用户头像 -->
            <el-col :span="4">
              <img class="user-icon" :src="imageSrc"/>
            </el-col>

            <!--用户详情-->
            <el-col :span="8" class="user-detail">
                <p class="user-name">{{ getLoginUserInfo.name }}</p>
                <p class="user-age">{{ getLoginUserInfo.age }}</p>
                <p class="user-description">{{ getLoginUserInfo.description }}</p>
            </el-col>

            <!-- 用户标签 -->
            <el-col :span="10" class="user-label">
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
            </el-col>
        </el-row>

        <!-- 用户数据统计 -->
        <div class="user-statistics">

        </div>

        <!-- 用户已经看过的电影 -->
        <el-row class="movies-list">
            <el-col :span="24">
              <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span style="float: left;margin: 0 0 0 0;width: 200px">看过的电影</span>
                    <el-button style="float: right;line-height: 0" type="text">更多</el-button>
                </div>
                <movie-grid :movieList="getMovieList"></movie-grid>
              </el-card>
            </el-col>
        </el-row>

        <!-- 用户想要看的电影 -->
        <el-row class="movies-list">
            <el-col :span="24">
              <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span style="float: left;margin: 0 0 0 0;width: 200px">想看的电影</span>
                    <el-button style="float: right;line-height: 0" type="text">更多</el-button>
                </div>
                <movie-grid :movieList="getMovieList"></movie-grid>
              </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import MovieGrid from '../components/MovieGrid'

export default {
  data () {
    return {
      userInfo: {},
      showItemNum: 12,

      // 用于本地测试的数据
      movieList: [],
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690'
    }
  },

  components: {
    'movie-grid': MovieGrid
  },

  created () {
    console.log('refresh')
    axios
      .get('/api/movie/1299731', {
        params: {
          sim: true,
          start: 0,
          count: 20
        }
      })
      .then(response => {
        this.movieList = response.data
      })
  },

  computed: {
    getMovieList: function () {
      var len = this.movieList.length
      if (len > this.showItemNum) {
        len = this.showItemNum
      }
      return this.movieList.slice(0, len)
    },

    getLoginUserInfo () {
      return this.$store.getters.getLoginUserInfo
    }
  }
}
</script>

<style scoped>

.user-info{
    margin: 0 0 0 0;
    width: 100%;
}

.user-detail{
    font-size: 14px;
    text-align: left;
    margin-left: 40px
}

.user-name{
    font-size: 20px;

}

.user-icon{
    left: 40px;
    top: 100px;
    width: 150px;
    height: 150px;
    line-height: 20px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 50%
}

.user-label{
  margin-left: 60px;
}

.movies-list{
    width: 100%;
    margin-top: 30px;
}

.text{
    font-size: 14px;
    height: 100%
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

.card-header{
    display: flex;
    flex-direction: row;
    justify-content: felx-start;
    align-items: center;
    font-size: 14px
}
</style>
