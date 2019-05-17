import Vue from 'vue'
import Router from 'vue-router'
import FilmCategory from '@/components/FilmCategory'
import Home from '@/components/Home'
import FilmInfo from '@/components/FilmInfo'
import PlayVideo from '@/components/PlayVideo'
import TVCategory from '@/components/TVCategory'
import TVInfo from '@/components/TVInfo'
import JujiTab from '@/components/tabs/JujiTab'
import TopFilmTab from '@/components/tabs/TopFilmTab'
import TopTVTab from '@/components/tabs/TopTVTab'
import TopZongYiTab from '@/components/tabs/TopZongYiTab'
import TopDongMan from '@/components/tabs/TopDongMan'
import AnimationCategory from '@/components/AnimationCategory'
import VarietyCategory from '@/components/VarietyCategory'
import LivePage from '@/components/LivePage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/film',
      name: 'FilmCategory',
      components: {
        default: FilmCategory,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/filmInfo:url',
      name: 'FilmInfo',
      component: FilmInfo
    },
    {
      path: '/playVideo',
      name: 'PlayVideo',
      components: {
        default: PlayVideo,
        firstTab: JujiTab, // 左侧标签tab的路由页面
        secondTab: '',
        thirdTab: ''
      }
    },
    {
      path: '/tv',
      name: 'TVCategory',
      components: {
        default: TVCategory,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/variety',
      name: 'VarietyCategory',
      components: {
        default: VarietyCategory,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/animation',
      name: 'AnimationCategory',
      components: {
        default: AnimationCategory,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/live',
      name: 'LivePage',
      components: {
        default: LivePage,
        firstTab: TopFilmTab,
        secondTab: TopTVTab,
        thirdTab: TopZongYiTab,
        fourth: TopDongMan
      }
    },
    {
      path: '/tvInfo',
      name: 'TVInfo',
      component: TVInfo
    }
  ],
  watch: {
    '$route' (to, from) {
      console.log('路由参数发生变化: to：' + to)
    }
  }
})
