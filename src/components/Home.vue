<template>
  <el-main >
    <!--触发器，简称轮播图-->
      <el-carousel :interval="3000" type="card" height="280px" arrow="always" >
        <el-carousel-item v-for="banner in bannerList" :key="banner">
          <img class="banner_img" v-bind:src="banner.img"/>
          <p>{{banner.title}}</p>
        </el-carousel-item>
      </el-carousel>

    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><span style="color: #F56C6C">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/"><span style="color: #F56C6C">最热动作片</span></a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--视频数据卡片-->
    <el-row :gutter="5" style="margin-top: 10px">
      <el-col :span="4" v-for="film in filmList" :key="film" style="margin-top: 10px">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img class="item_img" v-bind:src="film.filmPic"  alt="暂无封面">
          <div class="item_detail" style="padding: 5px;">
            <p  class="item_title">{{film.filmTitle}}</p>
            <p class="item_info">{{film.filmCountry}}</p>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px">
      <el-breadcrumb-item :to="{ path: '/' }"><span style="color: #F56C6C">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/"><span style="color: #F56C6C">最热爱情片</span></a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--视频数据卡片-->
    <el-row :gutter="5" style="margin-top: 10px" >
      <el-col :span="4" v-for="film in homeLoveList" :key="film" style="margin-top: 10px">
        <el-card shadow="always" :body-style="{ padding: '0px' }">
          <img class="item_img" v-bind:src="film.filmPic" alt="暂无封面">
          <div class="item_detail" style="padding: 5px;">
            <p  class="item_title">{{film.filmTitle}}</p>
            <p class="item_info">{{film.filmCountry}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import global_ from '../Global'
export default {
  name: 'home',
  data: function () {
    return {
      bannerList: [],
      filmList: [],
      homeLoveList: []
    }
  },
  mounted: function () {
    this.$axios.post(global_.serverUrl + 'findBannerList').then(result => {
      this.bannerList = result.data.bannerList
      // console.log("banner数据="+JSON.stringify(result.data.bannerList));
    })
    this.$axios.post(global_.serverUrl + 'findHotList').then(result => {
      this.filmList = result.data.filmList
    })
    this.$axios.post(global_.serverUrl + 'findHomeLove').then(result => {
      this.homeLoveList = result.data.homeLoveList
    })
    this.startMsg()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '3':window.location.href = global_.serverUrl + 'tvCategory'; break; case '2':window.location.href = global_.serverUrl + 'filmCategory'; break
      }
    },
    startMsg () {
      this.$notify({
        title: '欢迎来到万象影音',
        message: '海量热剧在线影院让您一次看个够',
        offset: 20
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .banner_img{
    width: 100%;
    display: block;
  }

  .item_img {
    width: 100%;
    height: 14em;
    display: block;
  }
  .item_detail{
    display: block;
    height: 4em;
  }
  .item_title{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #303133;
    font-size: 10px;
  }
  .item_info{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #909399;
    font-size: 8px;
  }

</style>
