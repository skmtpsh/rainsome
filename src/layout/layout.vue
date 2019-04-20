<template>
  <div class="ps-layout">
    <div class="ps-layout-aside-content" flex="dir:top">
      <div class="ps-theme-header" flex-box="0" flex>
        <div class="logo" flex="main:center cross:center" flex-box="0" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}">
          <router-link tag="a" to="/">
            <img v-if="asideCollapse" :src="require(`@/assets/logo_login2.png`)" style="width:30px;"/>
            <img v-else :src="require(`@/assets/logo.png`)" style="width:80px;"/>
          </router-link>
        </div>
        <div class="toggle-aside-btn" flex-box="0"  @click="handleToggleAside" >
          <svg-icon icon-class="toggle" />
        </div>
        <div class="ps-theme-header-menu" flex-box="1">
          <ul class="navbar" flex="cross:stretch">
            <li>
              <router-link tag="a" class="active" to="">标准服务</router-link>
            </li>
            <li>
              <router-link tag="a" to="">标准制修订</router-link>
            </li>
          </ul>
          <!-- <ps-header-full /> -->
        </div>
        <div class="ps-header-right" flex-box="0">
          <ps-header-user/>
          <ps-header-full />
          <ps-header-txt />
        </div>
      </div>
      <div class="ps-theme-container" flex-box="1" flex>
        <div flex-box="0" class="ps-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth
          }"
        >
          <ps-menu-side />
        </div>
        <div flex-box="1" flex class="ps-theme-container-main">
          <transition name="fade-scale">
            <div class="ps-theme-container-main-layer" flex="dir:top">
              <div class="ps-theme-container-main-header" flex-box="0">
                <!-- <ps-Tabs /> -->
              </div>
              <div class="ps-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import psMenuSide from './components/menu-side'
import psHeaderUser from './components/header-user'
import psHeaderFull from './components/header-fullscreen'
import psHeaderTxt from './components/header-txt'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'layout',
  components: {
    psMenuSide,
    psHeaderUser,
    psHeaderFull,
    psHeaderTxt
  },
  data () {
    return {
      asideWidth: '220px',
      asideWidthCollapse: '60px'
    }
  },
  computed: {
    ...mapState({
      keepAlive: state => state.page.keepAlive,
      asideCollapse: state => state.menu.asideCollapse
    }),
    transitionActive () {
      return true
    },
    keepAlive () {
      return []
    }
  },
  methods: {
    ...mapActions('menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
