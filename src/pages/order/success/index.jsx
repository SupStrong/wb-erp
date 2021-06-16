import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Image,Text,Input,Button } from "@tarojs/components";
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
        <View className="info-main">
          <View className='list'>
            <View className='info'>
              <View className='info-address G-Fsize-15'>
                <Text className="G-Fsize-12 G-color-white normal G-Mr-5">默认</Text>
                北京市直辖市朝阳区南四环东路辅路80 盛五金建材门卫
              </View>
              <View className="G-color-666 G-Fsize-15 G-Mt-10">温晓杰  13520010194</View>
            </View>  
            <Image className="right-btn" src={rightImg} />
          </View>
          <View className="time">
            <Text className="G-color-34 G-Fsize-15">预计送达时间</Text>
            <Text className="G-color-34 G-Fsize-15">2021-06-07</Text>
          </View>
        </View>
        <View className='goods-list G-Mt-5'>
          <View className="main G-Mb-5 G-bg-white">
            <View className="goods">
              <View className='tips G-Fsize-15 G-color-34'>订单信息</View>
              <View className="list">
                <View className="list-l">
                  <Image className='' src="https://img0.baidu.com/it/u=1095903005,1370184727&fm=26&fmt=auto&gp=0.jpg" />
                  <View className='info G-Ml-10'>
                    <View className='title G-Fsize-15 G-color-333 G-one-cloum'>卤小满麻椒鸡胗卤小满麻椒鸡胗卤小满麻椒鸡胗</View>
                    <View className='unit G-Fsize-13 G-color-666 G-Mt-10'>规格：2.5kg*6/箱</View>
                  </View>
                </View>
                <View className='number G-Fsize-14 G-color-FF7A0F'>×100</View>
              </View>
              <View className="list">
                <View className="list-l">
                  <Image className='' src="https://img0.baidu.com/it/u=1095903005,1370184727&fm=26&fmt=auto&gp=0.jpg" />
                  <View className='info G-Ml-10'>
                    <View className='title G-Fsize-15 G-color-333 G-one-cloum'>卤小满麻椒鸡胗卤小满麻椒鸡胗卤小满麻椒鸡胗</View>
                    <View className='unit G-Fsize-13 G-color-666 G-Mt-10'>规格：2.5kg*6/箱</View>
                  </View>
                </View>
                <View className='number G-Fsize-14 G-color-FF7A0F'>×100</View>
              </View>
            </View>
          </View>
        </View>
        <View className="remarks G-Mt-5 G-bg-white">
          <Text className="G-Fsize-15 G-color-34">备注</Text>
          <Input className="G-Fsize-15 G-color-34 remarks-ipt" placeholder="可以告诉我们您的特殊需求" />
        </View>
        <View className="btn G-bg-white">
          <Text className="G-Fsize-13 G-color-666">合计：160</Text>
          <View className="G-Fsize-14 G-color-white submit-btn">提交订单</View>
        </View>
      </View>
    );
  }
}

export default Index;
