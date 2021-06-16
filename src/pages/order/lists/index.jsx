import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Input,Image,Text,Icon  } from "@tarojs/components";
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
    let data = [
      { name:'全部',id:'',nums:''},
      { name:'待确认',id:'',nums:'3'},
      { name:'生产中',id:'',nums:'9'},
      { name:'待配送',id:'',nums:'4'},
      { name:'配送中',id:'',nums:'8'},
      { name:'已完成',id:'',nums:''},
      { name:'已失效',id:'',nums:''},
    ]
    // <View className=""></View>
    // <Text></Text>
    return (
      <View className='content'>
        <View className='tab-list'>
          {data.map(item => (
            <View className="list">
              <View className={item.nums != '' ? 'icon G-Fsize-9' : 'icon G-Fsize-9 active'}>{item.nums}</View>
              <Text className="G-Fsize-14 G-color-34 name G-Mt-5">{item.name}</Text> 
            </View>
          ))}
          
        </View>
        <View className='goods-list'>
          <View className="main G-Mb-5 G-bg-white">
            <View className="time">
              <View className="date G-Fsize-13">2020-06-01  13:35:35</View>
              <View className="status G-Fsize-13 G-color-037BD1">待确认</View>
            </View>
            <View className="goods">
              <View className="list G-Mb-5">
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
            <View className="btn">
              <View className="cancel G-color-037BD1">取消订单</View>
              <View className="show G-color-white">查看详情</View>
            </View>
          </View>
          <View className="main G-bg-white">
            <View className="time">
              <View className="date G-Fsize-13">2020-06-01  13:35:35</View>
              <View className="status G-Fsize-13 G-color-037BD1">待确认</View>
            </View>
            <View className="goods">
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
            <View className="btn">
              <View className="cancel G-color-037BD1">取消订单</View>
              <View className="show G-color-white">查看详情</View>
            </View>
          </View>
        </View>
        
      </View>
    );
  }
}

export default Index;
