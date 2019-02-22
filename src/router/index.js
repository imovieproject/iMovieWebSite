import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage'
import MovieCard from '@/components/MovieCard'
import MovieGrid from '@/components/MovieGrid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/test',
      name: 'MovieCard',
      component: MovieCard
    },
    {
      path: '/testGrid',
      name: 'MovieGrid',
      component: MovieGrid
    }
  ]
})
