<!-- 电影卡片，在首页显示电影详情 -->
<template>
    <div>
      <div class="card" @click="gotoMovieDetailPage">
        <!-- 当鼠标悬停在卡片上时，显示电影的详细信息 -->
        <el-popover placement="right" trigger="hover">
          <!-- 电影数字评分 -->
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="6" :offset="0" style="height: 100px">
                <p style="margin-top: 60px">评分:</p>
              </el-col>
              <el-col :span="16"><div class="score" ><span v-if="movieInfo.rating">{{ movieInfo.rating.average }}</span></div></el-col>
            </el-row>

            <!-- 电影获得的星星 -->
            <el-row>
              <el-col :span="20" :offset="2"><el-rate v-model="mapMovieScore" disabled/></el-col>
            </el-row>

            <!-- 分割线 -->
            <el-row >
              <el-col class="card-bottom-line" :span="24" ></el-col>
            </el-row>

            <!-- 电影年份 -->
            <el-row >
              <el-col :span="24"><p class="movie-detail-info">年份: {{ movieInfo.year }}</p></el-col>
            </el-row>

            <!-- 电影导演 -->
            <el-row>
              <el-col :span="24"><p class="movie-detail-info">导演: {{ getDirectorString }}</p></el-col>
            </el-row>

            <!-- 电影演员 -->
            <el-row>
              <el-col :span="24"><p class="movie-detail-info">演员: {{ getCastString }}</p></el-col>
            </el-row>

            <!-- 电影卡片显示内容 -->
            <el-card :body-style="{ padding: '0px' }" shadow="hover" slot="reference">
              <img
                :src="getImgCache(movieInfo.image)"
                onerror='this.src="https://images.weserv.nl/?url=http://b-ssl.duitang.com/uploads/item/201801/08/20180108170346_TPWik.thumb.224_0.jpeg"'
                class="image"
              >
              <div style="padding: 10px;">
                <p class="movie-title">{{ movieInfo.title }}</p>
              </div>
            </el-card>
        </el-popover>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    movieInfo: {}
  },
  data () {
    return {
      halfMovieScore: 0,
      altImgPath: 'https://images.weserv.nl/?url=http://b-ssl.duitang.com/uploads/item/201801/08/20180108170346_TPWik.thumb.224_0.jpeg'
    }
  },
  created () {
  },
  methods: {
    // 先跳转到一个空组件再跳转到详情页
    // 如果不这样的话会出现url不改变的情况，产生原因尚不清楚
    gotoMovieDetailPage: function () {
      this.$router.push({
        path: `/EmptyComponent/${this.movieInfo.douban_id}`
      })
    },
    // 直接从豆瓣获取到的链接是无法显示的
    // 这个网址是一个图床
    getImgCache: function (originPath) {
      var newPath = 'https://images.weserv.nl/?url='
      // newPath += this.movieInfo.image
      newPath += originPath
      return newPath
    }
  },
  beforeRouteLeave (to, from, next) {
    var movieID = to.params.movieid
    axios
      .get('/api/movie/subject/' + movieID)
      .then((response) => {
        this.movieInfo = response.data
        console.log(response.data)
      })
  },
  computed: {
    mapMovieScore: function () {
      return this.movieInfo.rating.average / 2
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
    }
  }
}
</script>

<style>
.card{
  width: 180px;
  height:310px;
}

.el-popover {
  padding-top: 0px;
}

.card-bottom-line {
  border-bottom-style: solid;
  border-bottom-width: 1;
  border-bottom-color: rgba(187,187,187,0.5);
  margin-top: 10px;
}

.score {
  font-size: 72px;
}

.time {
    font-size: 13px;
    color: #999;
  }

.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

.image-container{
}

.image {
    width: 178px;
    height: 250px;
    display: block;
  }

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.movie-title{
  height: 28px;
  width: 150px;
  margin: 0 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-summary{
  width:150px;
}

.movie-detail-info{
  width: 150px;
  height: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
