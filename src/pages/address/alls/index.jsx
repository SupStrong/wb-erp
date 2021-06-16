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
import selectImg from "@/assets/images/address/select.png";
import editImg from "@/assets/images/address/edit.png";
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
        <View className="address-list G-bg-white">
          <View className='list'>
            <View className='info'>
              <View className='info-address G-Fsize-15'>
                <Text className="G-Fsize-12 G-color-white normal G-Mr-5">默认</Text>
                北京市直辖市朝阳区南四环东路辅路80 盛五金建材门卫
              </View>
              <View className="G-color-666 G-Fsize-15 G-Mt-10">温晓杰  13520010194</View>
            </View>  
            <Image className="edit-btn" src={editImg} />
            <Image className="select-btn" src={selectImg} />
          </View>
          <View className='list'>
            <View className='info'>
              <View className='info-address G-Fsize-15'>
                北京市直辖市朝阳区南四环东路辅路80 盛五金建材门卫
              </View>
              <View className="G-color-666 G-Fsize-15 G-Mt-10">温晓杰  13520010194</View>
            </View>  
            <Image className="edit-btn" src={editImg} />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
