<template>
  <div>
      <el-row v-for="(top, index) in topList" :key="top" :gutter="10" align="middle" :style="{margin: '10px'}">
        <el-button :style="{width: '100%', marginLeft: '10px', marginRight: '10px'}" @click="filmInfo(top.url,top.img,top.name)">
          <el-col :span="2">
            <template v-if="index < '3'"><font color="#dc143c" size="5em">{{top.num}}</font></template>
            <template v-if="index >= '3' && index < '6'"><font color="orange" size="5em">{{top.num}}</font></template>
            <template v-if="index >= '6'"><font color="#909399" size="5em">{{top.num}}</font></template>
          </el-col>
          <el-col :span="12" :style="{textAlign: 'left',marginLeft: '15px'}"><font color="#606266" size="2.5em">{{top.name}}</font></el-col>
          <el-col :span="7" :push="4"><font color="#303133" size="3em">{{top.count}}</font></el-col>
        </el-button>
      </el-row>
  </div>
</template>

<script>
var serverUrl = 'http://localhost:8090'
export default {
  name: 'JujiTab',
  data () {
    return {
      topList: []
    }
  },
  mounted: function () {
    this.$axios.post(serverUrl + '/findTopList', {type: '3'}).then(result => {
      this.topList = result.data.topList
    })
  },
  methods: {
    filmInfo: function (url, img, title) {
      this.$router.push({name: 'FilmInfo', params: {url: url, img: img, title: title}})
    }
  }
}
</script>
<style scoped>
</style>
