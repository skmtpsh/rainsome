<template>
<!-- :default-active="$route.name" -->
<!-- :default-active="active" -->
  <el-menu
    :default-active="active"
    @select="handleSel"
    :collapse="asideCollapse"
    :default-openeds="openMenu"
    :mode="mode"
    ref="menu"
    v-if="aside"
    >
    <TreeMenu :treedata="item" :key="index" v-for="(item, index) in aside"></TreeMenu>
  </el-menu>
</template>
<script>
import path from 'path'
import { mapState } from 'vuex'
// import menuAside from '@/menu/aside'
import TreeMenu from '@/components/tree/treemenu'
export default {
  components: {
    TreeMenu
  },
  props: ['mode'],
  data () {
    return {
      active: '',
      openMenu: []
    }
  },
  computed: {
    ...mapState('menu', [
      'aside',
      'asideCollapse'
    ])
  },
  watch: {
    aside () {
      if (this.aside) {
        this.aside.forEach((item) => {
          this.openMenu.push(item.key)
        })
      }
    },
    // 监听路由 控制侧边栏激活状态
    '$route': {
      handler ({ fullPath }) {
        this.active = fullPath
        this.$nextTick(() => {
          if (this.aside.length > 0 && this.$refs.menu) {
            this.$refs.menu.activeIndex = fullPath
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    handleSel (key, keyPath) {
      console.log(key, keyPath)
      let sitePath = path.resolve(process.cwd(), ...keyPath)
      // console.log(sitePath)
      this.$router.push({ path: sitePath })
    }
  },
  created () {
    // this.setSidebarList('mainbar')
    this.aside.forEach((item) => {
      this.openMenu.push(item.key)
    })
  }
}
</script>
