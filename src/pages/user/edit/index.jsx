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
         
      </View>
    );
  }
}

export default Index;
