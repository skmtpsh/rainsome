import { AccountLogin } from '@/api/login'
import util from '@/utils/index'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login ({ dispatch }, {
      vm,
      username,
      password
    }) {
      return new Promise((resolve, reject) => {
        AccountLogin({
          username,
          password
        })
          .then(async res => {
            util.cookies.set('uuid', 'admin-uuid')
            util.cookies.set('token', res.tokenKey)
            await dispatch('user/set', {
              name: res.userInfo.staffName
            }, { root: true })
            await dispatch('load')
            resolve()
          // const result = response.data
          })
          .catch(error => {
            console.log('error: ', error)
            reject(error)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { vm, confirm = false }) {
      async function logout () {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('user/set', {}, { root: true })
        // 跳转路由
        vm.$router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        vm.$confirm('注销当前账户吗? ', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            logout()
          })
          .catch(() => {
            vm.$message('放弃注销用户')
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load ({ commit, dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('user/load', null, { root: true })
        // DB -> store 加载主题
        // await dispatch('theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        // await dispatch('transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        // await dispatch('size/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
