<template>
  <el-main >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/film' }"><span style="color: #F56C6C">电影</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/film"><span style="color: #F56C6C">{{$route.params.title}}</span></a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-card shadow="hover" style="width: 100%; margin-top: 10px; padding: 0px">
        <iframe id="video" v-bind:src="url" :style="{width: '100%', height: '500px'}"></iframe>
        <el-collapse >
          <el-collapse-item title="播放线路选择" name="1">
            <el-button v-bind:style="{margin:'5px'}" size="mini" round plain v-for="(xl, index) in 20" :key="xl" @click="switchSource()">
              线路 {{index}}
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-container>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }"><span style="color: #F56C6C">更多</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/"><span style="color: #F56C6C">精彩推荐</span></a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="5" style="margin-top: 10px;margin-bottom: 20px" >
      <el-col :span="4" v-for="film in filmDataList" :key="film" style="margin-top: 5px">
        <router-link :to="{name:'FilmInfo',params:{url:film.url, img:film.img, title: film.title}}">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <img class="item_img" v-bind:src="film.img" alt="暂无封面">
            <div class="item_detail" style="padding: 5px;">
              <p  class="item_title">{{film.title}}</p>
              <p class="item_info">{{film.update}}</p>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
// var vipUrl = 'http://yun.baiyug.cn/vip/index.php?url='
import global_ from '../Global'
var vipUrl = 'http://jqaaa.com/jx.php?url='
export default {
  data () {
    return {
      url: '',
      videoData: {},
      filmDataList: [], // 精彩推荐【猜你喜欢】
      vipXLList: [] // vip解析线路集合
    }
  },
  mounted: function () {
    this.url = vipUrl + this.$route.params.url // 接收页面链接为后台提供数据解析url
    this.$axios.post(global_.serverUrl + 'play/findVipXLList').then(result => {
      this.vipXLList = result.data.vipXLList
    })
    this.$axios.post(global_.serverUrl + 'film/findFilmList', {'pageNo': 1}).then(result => {
      this.filmDataList = result.data.filmDataList
    })
  },
  methods: {
    changeFrameHeight: function () {
    }
  }
}
</script>

<style scoped>
  #cover{
    display: block;
    width: 90%;
  }
  .info .title{
    font-size: 25px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-style: revert;
  }
  el-row{
    margin-top: 10px;
  }
  .play,.source{
    margin: 10px;
  }
  .item_img {
    width: 100%;
    height: 14em;
    display: block;
  }
  router-link{
    height: 19em;
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
