<template>
  <el-main >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/film' }"><span style="color: #F56C6C">电影</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/film"><span style="color: #F56C6C">剧集信息</span></a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-card shadow="hover" style="width: 100%; margin-top: 10px; padding: 0px">
        <el-row>
          <el-col :span="8">
            <img id="cover" v-bind:src="$route.params.img">
          </el-col>
          <el-col :span="16">
            <div class="info">
              <p class="title">{{$route.params.title}}</p>
              <el-collapse v-model="activeNames">
                <el-collapse-item title="演员信息" name="1">
                  <el-row :gutter="5"><el-col :span="10"></el-col>{{videoData.year}}<el-col :span="10">{{videoData.area}}</el-col></el-row>
                  <el-row :gutter="5"><el-col :span="10"></el-col>{{videoData.actor}}<el-col :span="10">{{videoData.director}}</el-col></el-row>
                </el-collapse-item>
                <el-collapse-item title="剧情简介" name="2">
                  <div>{{videoData.info}}</div>
                </el-collapse-item>
                <el-collapse-item title="视频源选择" name="3">
                  <div>
                    <el-button round plain v-for="source in vipSourceList" :key="source" @click="switchSource(source.url,source.name)">
                      {{source.name}}
                    </el-button>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="play">
              <el-button type="primary" @click="startPlay()"><i class="el-icon-caret-right"></i>立即播放</el-button>
              <el-button type="primary" plain><i class="el-icon-star-off"></i>添加收藏</el-button>
              <el-button type="primary" plain><i class="el-icon-phone-outline"></i>手机观看</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-container>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }"><span style="color: #F56C6C">更多</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/"><span style="color: #F56C6C">精彩推荐</span></a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="5" style="margin-top: 10px;margin-bottom: 20px" >
      <el-col :span="4" v-for="film in filmDataList" :key="film" style="margin-top: 5px">
        <router-link :to="{name:'PlayVideo',params:{url:film.url, img:film.img, title: film.title}}">
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
export default {
  data () {
    return {
      url: '', // 默认源
      videoData: {},
      activeNames: ['1'],
      filmDataList: [], // 精彩推荐【猜你喜欢】
      vipSourceList: [], // 准备播放界面视频源选择集合
      vipXLList: [] // vip解析线路集合
    }
  },
  mounted: function () {
    var url = this.$route.params.url // 接收页面链接为后台提供数据解析url
    // 请求页面数据和解析链接
    this.$axios.post(global_.serverUrl + 'film/findvipSourceList', {url: url}).then(result => {
      this.vipSourceList = result.data.vipSourceList
      this.videoData = result.data.videoData
    })
    this.$axios.post(global_.serverUrl + 'film/findFilmList', {'pageNo': 1}).then(result => {
      this.filmDataList = result.data.filmDataList
    })
  },
  methods: {
    switchSource: function (url, name) {
      // 更换视频源
      this.url = url
      this.$notify({
        title: '已切换视频源:' + name,
        message: '视频源切换成功，如果播放异常请尝试更换其它视频源',
        type: 'success'
      })
    },
    startPlay: function () {
      // 开始播放
      this.$router.push({name: 'PlayVideo', params: {url: this.url, title: this.$route.params.title}})
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
