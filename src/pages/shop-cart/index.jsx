import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
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
    let login_status;
    if (submitData.type == 1) {
      login_status = submitData.mobile != "" && submitData.password != "";
    } else {
      login_status = submitData.mobile != "" && submitData.wxcode != "";
    }

    let titleEl = (
      <>
        <View className='page-title'>欢迎使用，请登录</View>
        <View className='login-text'>
          可帮助店员快速处理订单、客户管理、查看数据等，实现移动化办公需求
        </View>
      </>
    );
    return (
      <View className='p15 show-page'>
        <View className='page-bg'></View>
        <View className='bd'>
          {titleEl}
          <LoginInput
            iconName='iconshouji'
            placeholderText='请输入手机号'
            keywords='mobile'
            inputValue={submitData.mobile}
            handleChange={this.handleChange.bind(this)}
          />
          <View className='password-con'>
            <LoginInput
              iconName='iconmima'
              placeholderText='请输入密码'
              keywords='password'
              type='password'
              inputValue={submitData.password}
              handleChange={this.handleChange.bind(this)}
              externalClass={`password ${
                submitData.type == 1 ? "transform-el" : ""
              }`}
            />
            <LoginInput
              iconName='iconmima'
              placeholderText='请输入验证码'
              keywords='password'
              type='number'
              inputValue={submitData.password}
              handleChange={this.handleChange.bind(this)}
              externalClass={`code ${
                submitData.type == 1 ? "transform-el" : ""
              }`}
            >
              <VerifyBtn source='1' mobile={submitData.mobile}></VerifyBtn>
            </LoginInput>
          </View>
          <View className='login-type'>
            <View
              className='password-login G-Fsize-16'
              onClick={this.setLoginType.bind(this)}
            >
              {submitData.type == 1 ? LoginTypeConfig[2] : LoginTypeConfig[1]}
            </View>
          </View>
          <CommonBtn
            btnText='登录'
            externalClass={login_status == true ? "" : "disabled"}
            status={login_status}
            handleClick={this.getToken.bind(this)}
          />
        </View>

        <View className='wechat' onClick={this.wxLoginClick.bind(this)}>
          <View className='text'>快捷登录</View>
          <View className='icon'>
            <View className='iconfont iconweixin'></View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
