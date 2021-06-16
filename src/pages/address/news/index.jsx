import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Input,Text,Image } from "@tarojs/components";
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

import openImg from "@/assets/images/address/open.png";
import addressImg from "@/assets/images/address/address.png";
import rightImg from "@/assets/images/address/right.png";
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
          <View className="ipt-value">
            <View className="list">
              <View className='list-l G-Fsize-15 G-color-34'>收货人</View>
              <View className='list-r'>
                <Input className='ipt G-Fsize-15 G-color-34' value="" placeholder='请输入收货人姓名' />
              </View>
            </View>
            <View className="list">
              <View className='list-l G-Fsize-15 G-color-34'>手机号</View>
              <View className='list-r'>
                <Input className='ipt G-Fsize-15 G-color-34' value="" placeholder='请输入收货人手机号' />
              </View>
            </View>
            <View className="list">
              <View className='list-l G-Fsize-15 G-color-34'>所在地区</View>
              <View className='list-r'>
                <Input className='ipt G-Fsize-15 G-color-34 G-Mr-10' disabled value="" placeholder='请选择省／市／区' />
                <Image className="right-icon" src={rightImg} />
              </View>
            </View>
            <View className="list">
              <View className='list-l G-Fsize-15 G-color-34'>详细地址</View>
              <View className='list-r'>
                <Input className='ipt G-Fsize-15 G-color-34 G-Mr-10' placeholder='请输入详细地址' />
                <Image className="address-icon" src={addressImg} />
              </View>
            </View>
            <View className="list">
              <View className='list-l G-Fsize-15 G-color-34'>门牌号</View>
              <View className='list-r'>
                <Input className='ipt G-Fsize-15 G-color-34' placeholder='街道、门牌号' value="" />
              </View>
            </View>
            <View className="list G-Mt-5">
              <View className='list-l G-Fsize-15 G-color-34'>设为默认地址</View>
              <View className='list-r'>
                <Image className="open-icon" src={openImg} />
              </View>
            </View>
          </View>
      </View>
    );
  }
}

export default Index;
