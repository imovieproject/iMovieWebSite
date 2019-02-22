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
                        <i class="el-icon-refresh" @click="refreshRecommanded"/>
                    </el-tooltip>
                </span>
                <movie-grid></movie-grid>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import MovieGrid from '@/components/MovieGrid'
export default {
  data () {
    return {
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690',
      activeCard: 'recommandedMovie'
    }
  },
  components: {
    'movie-grid': MovieGrid
  },
  methods: {
    refreshRecommanded: function () {
      console.log('click refresh')
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
