import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Input,Image,Text } from "@tarojs/components";
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


import searchImg from "./search.png";
import closeImg from "./close.png";
import emptyImg from "./empty.png";
import carImg from "./car.png";

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
  handleChange({ value, keywords }) {
    let { submitData } = this.state;
    submitData[keywords] = value;
    this.setState({ submitData });
  }
  setLoginType() {
    let { submitData } = this.state;
    let type = submitData.type == 2 ? 1 : 2;
    Object.assign(submitData, {
      type,
      password: "",
    });
    this.setState({ submitData });
  }
  async getToken() {
    //获取token
    let { status, message, data } = await API_AUTH_LOGIN(this.state.submitData);
    showPopup(message);
    if (!status) {
      return false;
    }
    initToken(data.token);
    Taro.navigateTo({
      url: `/pages/user/select-merchant/index`,
    });
  }
  async wxLoginClick() {
    let { token, unionid, openid } = this.state.codeUserInfo;
    console.log(token,'token',unionid,'unionid',openid,"openid");
    if (token) {
      Taro.navigateTo({
        url: `/pages/user/select-merchant/index`,
      });
      return;
    }
    let { data } = await getUserProfile();
    await saveWxUser(data);
    Taro.navigateTo({
      url: `/pages/user/bind-mobile/index?openid=${openid}&unionid=${unionid}`,
    });
  }
  async codeGetInfo() {
    let code = await wxLogin();
    let {status,message,data:codeUserInfo} = await API_AUTH_UNIONID({code})
    if(!status){
      showPopup(message)
      return
    }
    this.setState({codeUserInfo})
    Taro.setStorageSync("codeUserInfo", codeUserInfo);
    if (codeUserInfo.token) {
      initToken(codeUserInfo.token);
    }
    if (this.props.userInfo.staff_id) {
      Taro.switchTab({
        url: "/pages/tabs/console/index",
      });
    }
  }
  render() {
    let { submitData, code } = this.state;

    return (
      <View className='content'>
        <View className='search'>
          <Image className='search-icon' src={searchImg} />
          <Input
            type='text'
            value=''
            className='search-ipt G-Fsize-14 G-Ml-5'
            disabled
            placeholder='请输入商品名称'
            placeholderClass='ipt-class'
          />
          <Image className='close-icon' src={closeImg} />
        </View>
        {/* 产品库  */}
        {/* <View className='goods'>
          <View className='goods-list'>
              <Image className='goods-list-img' src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd3%2F1704%2Fdb%2F34de73c353d44db5.jpg_480x360x95_a79b1843.jpg&refer=http%3A%2F%2Fimg1.qunarzz.com&app=2002&size=f9999,10000&q=a80&n=0&gz=0n&fmt=jpeg?sec=1625907557&t=b04b0e33778ea90a34632d500406c3c8' />
              <View className='goods-list-content G-Ml-10'>
                <View className='name G-color-333 G-Fsize-15'>卤小满麻椒鸡胗卤小满麻椒鸡</View>
                <View className='unit G-color-666 G-Fsize-13 G-Mt-10'>规格：2.5kg*6/箱   储存方式：冷冻</View>
                <View className='nums G-color-666 G-Fsize-13 G-Mt-10'>库存100 箱</View>
              </View>
              <View className='shop-car'>
                <Image className='car-img' src={carImg} />
                <Text className='G-color-FF7A0F G-Fsize-11 G-Ml-5'>123</Text>
              </View>
          </View>
        </View> */}
        {/* 原材库 */}
        {/* <View className='materials'>
          <View className='materials-list'>
            <View>
              <View className='name G-color-333 G-Fsize-15'>卤小满麻椒鸡胗</View>
              <View className='batch G-color-666 G-Fsize-13 G-Mt-10'>批次：2021-06-01</View>
              <View className='unit G-color-666 G-Fsize-13 G-Mt-10'>厂号：1061       规格：10kg／箱</View>
              <View className='tips G-Mt-10'>
                <Image src={emptyImg} />
                <Text className='G-color-999 G-Fsize-13 G-Ml-5'>用于xxx产品和xxx产品使用</Text>
              </View>
            </View>
            <View className='G-Fsize-14 G-color-FF7A0F'>100箱</View>
          </View>
        </View> */}
        {/* <View className='empty'>
          <Image className='empty-img' src={emptyImg} />
          <View className='G-Fsize-14 G-color-999 G-Mt-15'>暂无数据</View>
        </View> */}
      </View>
    );
  }
}

export default Index;
