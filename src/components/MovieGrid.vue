<template>
    <div class="grid-container">
        <el-row type="flex" justify="start">
            <el-col :span="4"  v-for="movie in movieList" :key="movie.douban_id" >
                <movie-card :movieInfo="movie"></movie-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MovieCard from './MovieCard'

export default {
  props: {
    movieList: Array
  },

  data () {
    return {
    }
  },

  components: {
    'movie-card': MovieCard
  },

  created () {
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
