import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Text,Image } from "@tarojs/components";
import { API_AUTH_LOGIN, API_AUTH_UNIONID, API_AUTH_WXUSER } from "@/http/api/AUTH";
import {
  showPopup,
  showLoading,
  initToken,
  initUser,
  wxLogin,
  getUserProfile,
  saveWxUser
} from "@/utils/index";

import "./index.scss";
 

import topImg from "@/assets/images/order/top.png";
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS().userInfo,
  };
}

@connect(mapStateToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      submitData: {
        mobile: "",
        password: "",
        type: 2,
      },
      codeUserInfo:{}
    };
  }
  componentDidMount() {
    this.codeGetInfo();
  }

  componentWillUnmount() {}

  componentDidShow() {}
  render() {
    let { submitData, code } = this.state;
    return (
      <View className='content'>
          <View className="order-screen G-bg-white">
            <View className="screen-title">
              <View className="G-Fsize-15 G-color-34">2个订单</View>
              <View className="screen">
                <Text className="G-Fsize-15 G-color-666">筛选</Text>
                <Image className="top-icon" src={topImg} />
              </View>
            </View>
          </View>
          <View className="order-list G-bg-white G-Mt-5"> 
            <View>
              <View className="list-t">
                <Text className="G-Fsize-13">2020-06-01  13:35:35</Text>
                <Text className="G-Fsize-13">202006101345060001</Text>
              </View>
              <View className="list-b">
                <View className="G-Fsize-15 G-color-333">商品名称：AAAAAAAAAAA</View>
                <View className="G-Fsize-13 G-color-666">商品规格：2.5kg*6/箱</View>
                <View className="G-Fsize-13 G-color-666">收货箱数：80</View>
                <View className="G-Fsize-13 G-color-666">收货备注：共计100斤</View>
              </View>
              <View className="list-b">
                <View className="G-Fsize-15 G-color-333">商品名称：AAAAAAAAAAA</View>
                <View className="G-Fsize-13 G-color-666">商品规格：2.5kg*6/箱</View>
                <View className="G-Fsize-13 G-color-666">收货箱数：80</View>
                <View className="G-Fsize-13 G-color-666">收货备注：共计100斤</View>
              </View>
            </View>
          </View>
          <View className="order-list G-bg-white G-Mt-5">
            <View>
              <View className="list-t">
                <Text className="G-Fsize-13">2020-06-01  13:35:35</Text>
                <Text className="G-Fsize-13">202006101345060001</Text>
              </View>
              <View className="list-b">
                <View className="G-Fsize-15 G-color-333">商品名称：AAAAAAAAAAA</View>
                <View className="G-Fsize-13 G-color-666">商品规格：2.5kg*6/箱</View>
                <View className="G-Fsize-13 G-color-666">收货箱数：80</View>
                <View className="G-Fsize-13 G-color-666">收货备注：共计100斤</View>
              </View>
            </View>
          </View>
      </View>
    );
  }
}

export default Index;
