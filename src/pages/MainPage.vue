<template>
    <div class="main-container">
        <!-- 首页轮播图 -->
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

        <!-- 选项卡 -->
        <el-tabs v-model="activeCard" type="card">
            <el-tab-pane label="推荐电影" name="recommandedMovie">
                <span slot="label">
                    推荐电影
                    <el-tooltip effect="dark" content="换一批" placement="top-start">
                        <i class="el-icon-refresh" @click="getMoreRecommandedMovies"/>
                    </el-tooltip>
                </span>
                <movie-grid v-if="!simMovies.error" v-bind:movieList="simMovies"></movie-grid>
                <p v-if="simMovies.error">没有更多的推荐电影了</p>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import MovieGrid from '@/components/MovieGrid'
import axios from 'axios'
export default {
  data () {
    return {
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690',
      activeCard: 'recommandedMovie',
      simMovies: [],
      start: 0,
      count: 20
    }
  },
  components: {
    'movie-grid': MovieGrid
  },

  created () {
    axios
      .get('/api/movie/1', {
        params: {
          sim: true,
          start: this.start,
          count: this.count
        }
      })
      .then(response => {
        this.simMovies = response.data
      })
  },
  methods: {
    getMoreRecommandedMovies: function () {
      console.log('refresh')
      this.start += 20
      axios
        .get('/api/movie/1', {
          params: {
            sim: true,
            start: this.start,
            count: this.count
          }
        })
        .then(response => {
          this.simMovies = response.data
          console.log(this.simMovies)
        })
    }
  }

}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
