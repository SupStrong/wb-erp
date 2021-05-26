import Taro from "@tarojs/taro";
// import {initToken} from "@/utils/index";
import envConfig from './env.js'

let status = false
let lock = false
export default class Http {
  get(url, data) {
    return this.commonHttp('GET', url, data)
  }
  post(url, data) {
    return this.commonHttp('POST', url, data)
  }
  async commonHttp(method, url, data) {
    // Taro.addInterceptor(this.interceptor)
    return new Promise(async (resolve, reject) => {
      Taro.showNavigationBarLoading()
      try {
        const res = await Taro.request({
          url: envConfig.baseUrl + url,
          method,
          data,
          header: {
            Authorization: Taro.$store.getState().token.toJS().token ? 'Bearer ' +Taro.$store.getState().token.toJS().token : '' ,
            // appid: envConfig.appid,
            // Accept: envConfig.Accept,
            // Platform:process.env.TARO_ENV
          }
        })
        Taro.hideNavigationBarLoading()
        switch (res.statusCode) {
          case 200:
            return resolve(res.data)
          default:
            reject(new Error(res.data.msg))
        }
      } catch (error) {
        Taro.hideNavigationBarLoading()
        reject(new Error('网络请求出错'))
      }
    })
  }
  async interceptor(chain) {
    const requestParams = chain.requestParams
    const {
      url,
      header
    } = requestParams
    let haveToken = header.token || false
    if (!haveToken && !status) {
      status = true
      lock = true
      let tokenData = await asyncToken()
      header.token = tokenData.data.data.token
      //tokenData.data.data.unionid = '' //调试新用户
      initToken(tokenData.data.data)
    }
    if (lock && !url.includes('/token')) {
      await checkLock()
      header.token = Taro.$store.getState().userInfo.toJS().userInfo.token
    }

    return chain.proceed(requestParams)
      .then(res => {
        return res
      })
  }
}



export const asyncToken = async () => {
  let {
    scene
  } = Taro.getLaunchOptionsSync()
  if (scene == 1154) {
    status = false
    lock = false
    return {
      data: {
        data: {
          token: '',
          mobile: ''
        }
      }
    }
  }

  
  try {
    // await Taro.checkSession()
    const tokenData = await Taro.request({
      url: `${envConfig.baseUrl}Input`,
      method: 'POST',
      data: {
        id: '',
        secret: '',
        mobile: Taro.getStorageSync('userInfo').mobile||'',
       // mobile: '18211024773',
      },
      header: {
        appid: envConfig.appid,
        Accept: envConfig.Accept,
        Platform:process.env.TARO_ENV
      }
    })
    status = false
    lock = false
    return tokenData
  } catch (error) {
    status = false
    lock = false
    // let tokenData = await asyncToken()
    // return tokenData
    return {
      data: {
        data: {
          token: '',
          mobile: ''
        }
      }
    }
  }
}


const checkLock = async () => {
  return new Promise((resolve) => {
    let a = setInterval(() => {
      if (lock == false) {
        resolve()
        clearInterval(a)
      }
    }, 500)

  })
}
