<template>
  <el-row>
      <el-button size="mini" plain round :style="{margin: '5px'}" v-for="juji in $route.params.juJiList" :key="juji" @click="startPlay(juji.url)">
        {{juji.name}}</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'JujiTab',
  methods: {
    startPlay: function (url) {
      this.$router.push({
        name: 'PlayVideo',
        params: {current: true, type: 'tv', url: url, title: this.$route.params.title, juJiList: this.juJiList}
      })
      console.log('链接：' + url + ' 标题：' + this.$route.params.title)
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
