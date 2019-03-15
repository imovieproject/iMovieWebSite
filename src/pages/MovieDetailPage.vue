<template>
    <div>
        <el-row>
            <!-- 电影海报 -->
            <el-col :span="6">
                <img class="poster" v-if="movieInfo.image" :src="getCachedImg">
            </el-col>

            <!-- 电影名、主演等-->
            <el-col style="text-align: left;font-weight: normal;" v-if="movieInfo" :span="10">
                <h2 style="font-weight: normal">{{ movieInfo.title }}</h2>
                <h4 style="font-weight: normal">年份: {{ movieInfo.year }}</h4>
                <h4 style="font-weight: normal">类型: {{ getMovieTypeString }}</h4>
                <h4 style="font-weight: normal">导演: {{ getDirectorString }}</h4>
                <h4 style="font-weight: normal">演员: {{ getCastString }}</h4>
            </el-col>

            <el-col :span="8">
                <p>评分:<span style="font-size: 72px" v-if="movieInfo.rating.average">{{ movieInfo.rating.average }}</span></p>
                <el-rate v-model="mapRatingAverage" disabled></el-rate>
            </el-col>
        </el-row>

        <!-- 电影详情 -->
        <el-row style="margin-top: 20px;" type="flex">
          <el-col :span="21" :offset="1">
            <el-tabs v-model="activeTab" type="card">
              <el-tab-pane label="电影详情" name="1">
                <div style="display: flex;justify-content: flex-start">
                  <h4 v-if="movieInfo" style="font-weight: normal;text-align: left">{{ movieInfo.summary }}</h4>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>

        <!-- 相似电影 -->
        <el-row>
          <el-col :span="21" :offset="1">
            <el-tabs type="card" v-model="activeTab">
              <el-tab-pane label="相似电影" name="1">
                <movie-grid :movieList="simMovies"></movie-grid>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import MovieGrid from '../components/MovieGrid'
import axios from 'axios'

export default {
  props: {
  },

  data () {
    return {
      // 用户是否看过这部电影
      isHadWatched: false,
      // 用户自己给电影打的分
      userScore: 0,
      // 相似电影列表
      similarMovieList: [],
      movieInfo: {},
      activeTab: '1',
      simMovies: []
    }
  },

  components: {
    'movie-grid': MovieGrid
  },

  beforeRouteUpdate (to, from, next) {
    var movieID = to.params.movieid
    console.log(movieID)
    axios
      .get('/api/movie/' + movieID)
      .then((response) => {
        this.movieInfo = response.data
        console.log(response.data)
      })
  },

  created () {
    var movieID = this.$route.params.movieid
    axios
      .get('/api/movie/' + movieID)
      .then((response) => {
        this.movieInfo = response.data
        console.log(response.data)
      })

    axios
      .get('/api/movie/' + movieID, {
        params: {
          sim: true,
          start: 0,
          count: 20
        }
      })
      .then((response) => {
        this.simMovies = response.data
        console.log(response.data)
      })
  },
  computed: {
    getCachedImg: function () {
      var newPath = 'https://images.weserv.nl/?url='
      newPath += this.movieInfo.image
      return newPath
    },
    getDirectorString: function () {
      if (this.movieInfo.directors) {
        var directorList = ''
        var i = 0
        for (; i < this.movieInfo.directors.length - 1; i++) {
          directorList += this.movieInfo.directors[i].name + '/'
        }
        directorList = directorList + this.movieInfo.directors[i].name
        return directorList
      }
    },
    getCastString: function () {
      if (this.movieInfo.casts) {
        var castStr = ''
        var i = 0
        for (;i < this.movieInfo.casts.length - 1; i++) {
          castStr += this.movieInfo.casts[i].name + '/'
        }
        castStr += this.movieInfo.casts[i].name
        return castStr
      }
    },
    getMovieTypeString: function () {
      if (this.movieInfo.genres) {
        var typeStr = ''
        var i = 0
        for (;i < this.movieInfo.genres.length - 1; i++) {
          typeStr += this.movieInfo.genres[i] + '/'
        }
        typeStr += this.movieInfo.genres[i]
        return typeStr
      }
    },
    mapRatingAverage: function () {
      if (this.movieInfo.rating.average) {
        return this.movieInfo.rating.average / 2
      }
    }
  }
}
</script>

<style>
.poster{
  border-radius: 5%
}
</style>
