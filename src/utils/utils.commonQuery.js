import dayjs from 'dayjs'
import md5 from 'js-md5'

export const getParam = (name) => {
  var search = document.location.search
  var pattern = new RegExp('[?&]' + name + '\\=([^&]+)', 'g')
  var matcher = pattern.exec(search)
  var items = null
  if (matcher !== null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}

export const getAppKey = (appId) => {
  const AppSet = [
    {
      id: 'qiandada12345678',
      key: '65ba977f450a8a94dd2b90a3abcb9512'
    }
  ]
  return AppSet.filter(item => {
    if (item.id === appId) {
      return item
    }
  })
}

// 公用CommonQuery
export const commonQuery = () => {
  let AppKey = ''
  // 根据传参获取appId
  // let AppID = getParam('appId')
  // 临时用固定appId
  let AppID = 'qiandada12345678'
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key

  let TimeStamp = dayjs(Date.now()).format('YYYYMMDDHHmmss')
  // let SignSystem = md5(AppKey + AppID + TimeStamp)
  let SignSystem = md5(AppKey + TimeStamp)

  return {
    // appKey: AppKey,
    timestamp: TimeStamp,
    signSystem: SignSystem
    // appId: AppID
  }
}
/**
 * 公用UrlQuery
*/
// let URL = location.search
// const urlQuery = ({
//   token = '',
//   type = '',
//   platform = '',
//   mobile = ''
// } = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
//   return {
//     token,
//     type,
//     platform,
//     mobile
//   }
// }

const requestQuery = () => {
  // return Object.assign(urlQuery(), commonQuery())
  return Object.assign({}, commonQuery())
}

export default requestQuery
