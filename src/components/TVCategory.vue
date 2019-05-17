<template>
  <el-main >
    <!--分类面板-->
    <el-card class="box-card" style="margin-bottom: 20px" shadow="hover">
      <el-row :gutter="10" style="margin-top: 5px">
        <el-col :span="2"><font size="1em" color="#909399">类型：</font></el-col>
        <el-col v-for="(item,index) in typeName" :key="item" :span="2">
          <template v-if="index < '10'">
            <el-button  size="mini" round @click="switchType(index,'1')">{{item}}</el-button>
          </template>
          <template v-if="index == '10'">
              <el-button size="mini" round type="primary" plain @click="showMoreType('type')">更多</el-button>
          </template>
          <template v-if="index > '10'">
            <el-button class="hiddenType" v-bind:style="{display: moreType, margin: '10px'}" size="mini" round @click="switchType(index,'1')">{{item}}</el-button>
          </template>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 5px">
        <el-col :span="2"><font size="1em" color="#909399">年代：</font></el-col>
        <el-col v-for="(item,index) in year" :key="item" :span="2">
          <template v-if="index < '10'">
            <el-button  size="mini" round @click="switchType(index,'')">{{item}}</el-button>
          </template>
          <template v-if="index == '10'">
            <el-button size="mini" round type="primary" plain @click="showMoreType('')">更多</el-button>
          </template>
          <template v-if="index > '10'">
            <el-button class="hiddenYear" v-bind:style="{display: moreYear, margin: '10px'}" size="mini" round @click="switchType(index,'')">{{item}}</el-button>
          </template>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 5px">
        <el-col :span="2"><font size="1em" color="#909399">地区：</font></el-col>
        <el-col v-for="(item,index) in areaName" :key="item" :span="2">
          <template v-if="index < '10'">
            <el-button  size="mini" round @click="switchType(index,'2')">{{item}}</el-button>
          </template>
          <template v-if="index == '10'">
            <el-button size="mini" round type="primary" plain @click="showMoreType('area')">更多</el-button>
          </template>
          <template v-if="index > '10'">
            <el-button class="hiddenArea" v-bind:style="{display: moreArea, margin: '10px'}" size="mini" round @click="switchType(index,'2')">{{item}}</el-button>
          </template>
        </el-col>
      </el-row>
    </el-card>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/tv' }"><span style="color: #F56C6C">电视剧</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/tv"><span style="color: #F56C6C">电视剧分类</span></a></el-breadcrumb-item>
      <el-breadcrumb-item><span style="color: #F56C6C">{{currentTypeName}} - {{currentYearName}} - {{currentAreaName}}</span></el-breadcrumb-item>
    </el-breadcrumb>
    <!--视频数据卡片-->
    <el-row :gutter="5" style="margin-top: 10px;margin-bottom: 10px" >
      <el-col :span="4" v-for="tv in tvDataList" :key="tv" style="margin-top: 5px">
        <router-link :to="{name:'TVInfo',params:{url:tv.url, img:tv.img, title: tv.title}}" :style="{textDecoration:'none'}">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <img class="item_img" v-bind:src="tv.img" alt="暂无封面">
            <div class="item_detail" style="padding: 5px;">
              <p class="item_title">{{tv.title}}</p>
              <p class="item_info">{{tv.update}}</p>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="720">
      </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
/* eslint-disable no-unused-vars */
import global_ from '../Global'
export default {
  name: 'FilmCategory',
  data () {
    return {
      moreType: 'none',
      moreYear: 'none',
      moreArea: 'none',
      typeName: [], // 分类名
      typeValue: [], // 分类值
      areaName: [], // 地区名
      areaValue: [], // 地区值
      currentArea: 'all',
      currentAreaName: '全部',
      currentYear: '',
      currentYearName: '全部',
      currentType: 'all',
      currentTypeName: '全部',
      year: [], // 年代
      tvDataList: [] // 电影数据
    }
  },
  mounted: function () {
    this.$axios.post(global_.serverUrl + 'tv/findTVList', {'pageNo': 1}).then(result => {
      this.tvDataList = result.data.tvDataList
    })
    this.$axios.post(global_.serverUrl + 'tv/findCategoryList').then(result => {
      this.typeName = result.data.typeName
      this.areaName = result.data.areaName
      this.year = result.data.year
      this.areaValue = result.data.areaValue
      this.typeValue = result.data.typeValue
    })
  },
  methods: {
    // 翻页函数回调
    handleCurrentChange (val) {
      // console.log("当前页:"+ val);
      this.$axios.post(global_.serverUrl + 'tv/findTVList', {'pageNo': val}).then(result => {
        this.tvDataList = result.data.tvDataList
        // console.log("tv数据="+JSON.stringify(result.data.videoDataList));
        // 超自然翻页过渡动画O(∩_∩)O
        var timer = requestAnimationFrame(function fn () {
          var s = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          if (s > 0) {
            s -= 50
            document.documentElement.scrollTop = s
            timer = requestAnimationFrame(fn)
          }
        })
      })
    },
    // 播放视频
    greet: url => {
      // console.log('clickUrl:：' + url)
      // this.$router.push({
      //  path: '/playVideo',
      //  params: {url: url}
      // })
    },
    showMoreType (types) {
      types === 'type' ? this.moreType = this.moreType === 'block' ? 'none' : 'block' : types === 'area' ? this.moreArea = this.moreArea === 'block' ? 'none' : 'block' : this.moreYear = this.moreYear === 'block' ? 'none' : 'block'
    },
    switchType (index, types) {
      console.log('type:' + types + '  index:' + index)
      if (types === '2') {
        this.currentAreaName = this.areaName[index]
        this.currentArea = this.areaValue[index]
      } else if (types === '1') {
        this.currentTypeName = this.typeName[index]
        this.currentType = this.typeValue[index]
      } else {
        this.currentYearName = this.year[index]
        this.currentYear = this.year[index]
        if (this.currentYear === '全部') this.currentYear = 'all'
      }
      const params = {'pageNo': 1, 'year': this.currentYear, 'area': this.currentArea, 'actor': this.currentType}
      console.log('params:' + params)
      this.$axios.post(global_.serverUrl + 'tv/findTVList', params).then(result => {
        this.tvDataList = result.data.tvDataList
      })
    }
  }
}
</script>

<style scoped>
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
