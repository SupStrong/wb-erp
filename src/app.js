import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import * as isIphone from "@/actions/isIphone";
import { Provider } from 'react-redux'
import configStore from './store'
import {initToken,initUser } from "@/utils/index";

import './app.scss'

const store = configStore()

class App extends Component {
  componentDidMount () {
    Taro.$store = store;
    try {
      let token = Taro.getStorageSync('token')
      let userInfo = Taro.getStorageSync('userInfo')

      initToken(token)
      initUser(userInfo)
    } catch (e) {
      // Do something when catch error
    }
   
    let { model } = Taro.getSystemInfoSync();
    const modelArr = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX","iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","unknown<iPhone12,1>","unknown<iPhone12,3>","unknown<iPhone12,5>"];
    for (const iterator of modelArr) {
      if (model.includes(iterator)) {
        store.dispatch(isIphone.init(true));
      }
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App