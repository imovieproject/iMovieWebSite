<template>
  <div id="app" style="height: 100%;width: 100%">
    <el-container>
      <el-header style="padding: 0">
        <page-header/>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'

export default {
  name: 'App',
  components: {
    'page-header': PageHeader
  },
  mounted () {
    window.addEventListener('unload', this.saveState)
  },

  methods: {
    saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-main{
  padding: 60px;
  padding-top: 20px
}
</style>
