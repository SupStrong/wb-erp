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

import logoImg from "@/assets/images/login/logo.png";

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
        <View className='title-tips'>
          <Image className='logo' src={logoImg} />
          <View className='G-color-333 G-Fsize-20 G-Mt-15 G-bold'>欢迎使用，请登录</View>
          <View className='G-color-999 G-Fsize-14 G-Mt-10 details'>
          为品牌连锁餐饮企业提供专业供应链服务，通过软件可查看商品库存、订单等信息，实现移动化办公管理
          </View>
          <View className='ipt-val'>
            <View className='ipt-val-list'>
              <View className='G-color-333 G-Fsize-16'>账号
              <Text className='G-Ml-5 G-Mr-10'>|</Text>
              </View>
              <Input
                type='text'
                value='' 
                className='search-ipt G-color-999 G-Fsize-16 G-Ml-5'
                disabled
                placeholder='请输入手机号'
                placeholderClass='ipt-class'
              />
            </View>
            <View className='ipt-val-list G-Mt-15'>
              <View className='G-color-333 G-Fsize-16'>密码
              <Text className='G-Ml-5 G-Mr-10'>|</Text>
              </View>
              <Input
                type='text'
                value=''
                className='search-ipt G-color-999 G-Fsize-16 G-Ml-5'
                disabled
                placeholder='请输入密码'
                placeholderClass='ipt-class'
              />
            </View>
          </View>
          <View className='ipt-submit active'>
            <View className='G-Fsize-1 6 G-color-white'>登录</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
