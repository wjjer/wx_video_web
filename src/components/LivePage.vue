<template>
  <el-main >
    <!--友情链接-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">电视直播</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10" >
      <el-col :span="4"  v-for="live in liveList" :key="live" style="margin-top: 10px">
        <el-card class="box-card" shadow="hover" @click="play(live.url)">
          <div class="text item">
            {{'友情链接 ' + live.name }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/* eslint-disable no-unused-vars */
import global_ from '../Global'
export default {
  data () {
    return {
      liveList: [] // 电影数据
    }
  },
  mounted: function () {
    this.$axios.post(global_.serverUrl + '/findLiveList').then(result => {
      this.liveList = result.data.liveList
    })
  },
  methods: {
    // 翻页函数回调
    handleCurrentChange (val) {
      // console.log("当前页:"+ val);
    },
    // 播放视频
    play: url => {
      console.log('clickUrl:：' + url)
      // this.$router.push({
      //  path: '/playVideo',
      //  params: {url: url}
      // })
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
