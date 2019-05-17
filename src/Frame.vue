<template>
  <div id="app">
    <el-container style="border: 1px solid #eee;">
      <el-header height="120px">
        <div id="logo">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <el-row type="flex" :gutter="70" align="middle">
              <el-col :span="7">
                <font color="#f08080" size="6em">万象影音</font>
              </el-col>
              <el-col :span="7" :push="3">
                <div id="search">
                  <el-input
                    size="medium"
                    placeholder="请输入片名"
                    v-model="input10"
                    clearable
                    suffix-icon="el-icon-search">
                  </el-input>
                </div>
              </el-col>

              <el-col :span="8" :offset="2" :style="{textAlign: 'right'}">
                <div>
                  <el-button plain>登录</el-button>
                  <el-button type="primary" plain>注册</el-button>
                  <el-button type="success" plain>论坛</el-button>
                  <el-button type="info" plain>下载ＡＰＰ</el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <el-menu default-active="1" text-color="#303133" active-text-color="#F56C6C" collapse-transition="true" mode="horizontal"  @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">电影大全</el-menu-item>
          <el-menu-item index="3">热剧放送</el-menu-item>
          <el-menu-item index="4">好看综艺</el-menu-item>
          <el-menu-item index="5">动漫连载</el-menu-item>
          <el-menu-item index="6">电视直播</el-menu-item>
          <el-menu-item index="7">关于我们</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <!--模板在此插入,有router路由动画包裹-->
        <transition name="slide-fade">
          <router-view  style="width: 70%;"/>
        </transition>
        <el-aside width="30%">
            <el-tabs style="margin: 10px;"  type="border-card" value="first" @tab-click="handleClick">
              <el-tab-pane label="电影排行榜" name="first"><router-view name="firstTab"/></el-tab-pane>
              <el-tab-pane label="电视剧排行榜" name="second"><router-view name="secondTab"/></el-tab-pane>
              <el-tab-pane label="综艺排行榜" name="third"><router-view name="thirdTab"/></el-tab-pane>
              <el-tab-pane label="动漫排行榜" name="fourth"><router-view name="fourth"/></el-tab-pane>
            </el-tabs>
        </el-aside>
      </el-container>

      <el-footer>
        <!--友情链接-->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">友情链接</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10" >
          <el-col :span="4"  v-for="item in 12" :key="item" style="margin-top: 10px">
            <el-card class="box-card" shadow="hover">
              <div class="text item">
                {{'友情链接 ' + item }}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 15px;margin-bottom: 20px">
          <el-col :span="24" class="footer">万象影音 Copyright © 2015-2017 Muvod All Rights Reserved</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 15px;margin-bottom: 20px">
        <el-col :span="24" class="footer">E-mail:jsp0369@gmail.com     QQ Group：2341243834</el-col>
        </el-row>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Frame',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '1':
          this.$router.push({path: '/'})
          break
        case '2':
          this.$router.push({path: '/film'})
          break
        case '3':
          this.$router.push({path: '/tv'})
          break
        case '4':
          this.$router.push({path: '/variety'}) // 综艺
          break
        case '5':
          this.$router.push({path: '/animation'}) // 动漫
          break
        case '6':
          this.$router.push({path: '/live'}) // 电视直播
          break
      }
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}

.slide-fade-enter-active {
  transition: all 1s ease-out;
}
/*.slide-fade-leave-active {
  transition: all .4s cubic-bezier(0.8,0.6, 0.4, 0.2);
}
.slide-fade-enter, .slide-fade-leave-to
  !* .slide-fade-leave-active for below version 2.1.8 *! {
  transform: translateX(40px);
  opacity: .5;
}*/
  .footer{
    text-align: center;
  }
</style>
