<template>
    <div class="grid-container" v-loading="!isLoaded">
        <el-row type="flex" justify="start">
            <el-col :span="4" v-for="movie in movieList" :key="movie.id" >
                <movie-card v-if="isLoaded" :movieInfo="movie"></movie-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MovieCard from './MovieCard'
import axios from 'axios'
export default {
  data () {
    return {
      movieList: [],
      isLoaded: false
    }
  },
  components: {
    'movie-card': MovieCard
  },
  created () {
    axios
      .get('/api/movie/top250')
      .then((response) => {
        this.movieList = response.data.subjects
        this.isLoaded = true
        console.log(response)
      })
  }
}
</script>

<style>
.el-row{
    flex-wrap: wrap;
}

.grid-container{
  padding: 20px;
}
</style>
