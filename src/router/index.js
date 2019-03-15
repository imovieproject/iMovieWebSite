import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage'
import MovieCard from '@/components/MovieCard'
import MovieGrid from '@/components/MovieGrid'
import MovieDetailPage from '@/pages/MovieDetailPage'
import UserDetailPage from '@/pages/UserDetailPage'
import EmptyComponent from '@/components/EmptyComponent'
import LoginPage from '@/pages/LoginPage'
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
    },
    // {
    //   path: '/testMovieDetailPage',
    //   name: 'MovieDetailPage',
    //   component: MovieDetailPage
    // },
    {
      path: '/MovieDetailPage/:movieid',
      name: 'MovieDetailPage',
      component: MovieDetailPage
    },
    {
      path: '/UserDetailPage/:userid',
      name: 'UserDetailPage',
      component: UserDetailPage
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/EmptyComponent/:movieid',
      name: 'EmptyComponent',
      component: EmptyComponent
    }
  ]
})
