import db from './utils.db'
import commonQuery from './utils.commonQuery'
import cookies from './utils.cookies'

const util = {
  db,
  commonQuery,
  cookies,
  tag: {
    local: 'Hm-Ps',
    cooki: 'Hm-ps'
  }
}
/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '后台管理系统'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

export default util
