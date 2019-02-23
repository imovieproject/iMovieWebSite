<!--
    设置一个中间控件来解决路由跳转到同一个页面的问题
-->
<template>
    <div>
      <p>test</p>
    </div>
</template>

<script>
export default {
  created () {
    console.log('EmptyComponent')
    this.$router.push({
      name: 'MovieDetailPage',
      params: {
        movieid: this.$route.params.movieid
      }
    })
  }
}
</script>

<style>

</style>
