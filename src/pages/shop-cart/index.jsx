import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Image,Text,Button } from "@tarojs/components";
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
import { LoginInput } from "@/components/login_input";
import { VerifyBtn } from "@/components/verify-btn";
import { CommonBtn } from "@/components/common-btn";

import "./index.scss";

import emptyImg from "@/assets/images/order/empty-order.png";
import checkImg from "@/assets/images/order/select.png";
import noCheckImg from "@/assets/images/order/no-select.png";
import addImg from "@/assets/images/order/add.png";
import reduceImg from "@/assets/images/order/reduce.png";

const LoginTypeConfig = {
  1: "密码登录",
  2: "验证码登录",
};

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
          {/* <View className='empty'>
            <Image className='empty-img' src={emptyImg} />
            <View className='empty-tips G-Mt-15 G-Fsize-14'>您的订单中心还没有商品</View>
            <View className='go-details G-Fsize-13 G-color-white'>去看看</View>
          </View> */}
          <View className='order'>
            <View className='order-list'>
              <View className='list-l'>
                <Image class='select-img' src={checkImg} />
              </View>
              <View className='list-r'>
                  <Image class='order-img' src='https://img2.baidu.com/it/u=2471826223,1654648024&fm=26&fmt=auto&gp=0.jpg' />
                  <View className='G-Ml-10'>
                    <View className='title G-color-333 G-Fsize-15'>小满卤小满麻椒鸡胗卤</View>
                    <View className='unit G-color-666 G-Fsize-14 G-Mt-10'>500g/份</View>
                  </View>
                  <View className='edit-num'>
                    <Image className='reduce-img' src={reduceImg} />
                    <Text className='G-Fsize-14 current-num G-color-333'>1</Text>
                    <Image className='add-img' src={addImg} />
                  </View>
              </View>
            </View>
            <View className='order-list'>
              <View className='list-l'>
                <Image class='select-img' src={noCheckImg} />
              </View>
              <View className='list-r'>
                  <Image class='order-img' src='https://img2.baidu.com/it/u=2471826223,1654648024&fm=26&fmt=auto&gp=0.jpg' />
                  <View className='G-Ml-10'>
                    <View className='title G-color-333 G-Fsize-15'>小满卤小满麻椒鸡胗卤小满卤小满麻椒鸡胗卤</View>
                    <View className='unit G-color-666 G-Fsize-14 G-Mt-10'>500g/份</View>
                  </View>
                  <View className='edit-num'>
                    <Image className='reduce-img' src={reduceImg} />
                    <Text className='G-Fsize-14 current-num G-color-333'>99</Text>
                    <Image className='add-img' src={addImg} />
                  </View>
              </View>
            </View>
          </View>
          <View className='submit'>
            <View className='submit-l'>
              <Image src={noCheckImg} />
              <Text className='G-color-666 G-Fsize-13 G-Ml-5'>全选</Text>
            </View>
            <View className='submit-r'>
                <View className='G-color-white G-Fsize-14'>去下单(233)</View>
            </View>
          </View>
      </View>
    );
  }
}

export default Index;
