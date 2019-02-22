<template>
    <div class="page-header">
        <!-- 页面logo -->
        <div class="page-logo">
            <p style="color: #67C23A">i</p>
            <p style="color: #409EFF">Movie</p>
        </div>

        <!-- 搜索输入框 -->
        <el-input class="search-input" size="mini" placeholder="请输入要搜索的电影名称" suffix-icon="el-icon-search" v-model="searchInput"/>

        <!-- 用户头像及用户名 -->
        <div class="user-info">
            <img class="user-logo" v-bind:src="imageSrc"/>
            <p style="margin-left:20px">user name</p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: ' ',
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690'
    }
  }
}
</script>

<style>
.page-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
}

.page-logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    text-align: center;
    height: 60px;
    margin-left: 40px
}

.search-input{
    width: 400px;
    margin-left: 400px;
}

.user-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #909399;
    margin-left: 360px;
    height: 60px;
}

.user-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
</style>
