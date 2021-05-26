import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Image } from "@tarojs/components";
import { API_AUTH_USER, API_AUTH_UNTIE, API_AUTH_BINDWX } from "@/http/api/AUTH";
import {
  showPopup,
  showLoading,
  initToken,
  initUser,
  wxLogin,
  getUserProfile,
  saveWxUser,
} from "@/utils/index";

import "./index.scss";

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS(),
    // isIphone: state.isIphone.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // ...bindActionCreators(UserInfo, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: {},
    };
  }
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  async getData() {
    try {
      let { status, message, data: userInfo } = await API_AUTH_USER({
        tenant_id: this.props.userInfo.userInfo.tenant_id,
      });
      if (!status) {
        showPopup(message);
        return;
      }
      this.setState({ userInfo });
    } catch (err) {
      showPopup("载入商家数据错误");
    }
  }
  outLogin() {
    Taro.showModal({
      title: "提示",
      content: "确定退出登录？",
      confirmColor: "#111111",
      cancelColor: "#2950F0",
      success(res) {
        if (!res.confirm) {
          return;
        }
        showPopup("退出登录成功！");
        initUser({});
        initToken("");
        setTimeout(() => {
          Taro.reLaunch({
            url: "/pages/login/index",
          });
        }, 2000);
      },
    });
  }
  changeUser() {
    Taro.navigateTo({
      url: "/pages/user/select-merchant/index",
    });
  }
  changePassword(mobile) {
    Taro.navigateTo({
      url: `/pages/user/edit-password/index?mobile=${mobile}`,
    });
  }

  getAuthInfo({ mobile, openid, unionid, token, nickname }) {
    //写入nickname
    let { userInfo } = this.props.userInfo;
    userInfo.nickname = nickname;
    initUser(userInfo);
  }
  async cancleWx(nickname) {
    Taro.showModal({
      title: "提示",
      content: "解绑微信后，将不能通过微信登录和接收推送的消息，确定解绑？",
      confirmColor: "#111111",
      cancelColor: "#2950F0",
      success: async (res) => {
        if (!res.confirm) {
          return;
        }
        let { status, message } = await API_AUTH_UNTIE();
        showPopup(message);
        if (!status) {
          return;
        }
        //删除nickname
        let { userInfo } = this.props.userInfo;
        userInfo.nickname = "";
        initUser(userInfo);
      },
    });
  }
  async bindWx(){
    Taro.showModal({
      title: "提示",
      content: "是否绑定微信，进行授权操作？",
      confirmColor: "#111111",
      cancelColor: "#2950F0",
      success: async (res) => {
        if (!res.confirm) {
          return;
        }
        let { data } = await getUserProfile();
        await saveWxUser(data);
        let { openid } = wx.getStorageSync("codeUserInfo");
        let {status,message} = await API_AUTH_BINDWX({openid})
        showPopup(message)
        if(!status){
          return
        }
        


      },
    });
  }
  async userBindWx() {
    




  }
  render() {
    let { userInfo } = this.props.userInfo;
    let { code } = this.state;
    return (
      <View className='page'>
        <View className='hd'>
          <Image className='avatar' src={userInfo.avatar} />
          <View className='user-con'>
            <View className='nickname'>{userInfo.name}</View>
            <View className='company'>{userInfo.company}</View>
          </View>
        </View>
        <View className='user-opreate'>
          <View
            className='user-opreate-item'
            onClick={this.changeUser.bind(this)}
          >
            <View className='item-title'>
              <View className='icon-box'>
                <View className='iconfont iconqiehuanshanghu'></View>
              </View>
              <View className='item-title-text'>切换商户</View>
            </View>
            <View className='item-des'>
              <View className='iconfont icongengduo'></View>
            </View>
          </View>
          {userInfo.nickname ? (
            <View
              className='user-opreate-item'
              onClick={this.cancleWx.bind(this, userInfo.nickname)}
            >
              <View className='item-title'>
                <View className='icon-box'>
                  <View className='iconfont iconjiebangweixin'></View>
                </View>
                <View className='item-title-text'>解绑微信</View>
              </View>
              <View className='item-des'>
                {userInfo.nickname}
                <View className='iconfont icongengduo'></View>
              </View>
            </View>
          ) : (
            <View
              className='user-opreate-item'
              onClick={this.bindWx.bind(this)}
            >
              <View className='item-title'>
                <View className='icon-box'>
                  <View className='iconfont iconjiebangweixin'></View>
                </View>
                <View className='item-title-text'>绑定微信</View>
              </View>
              <View className='item-des'>
                <View className='iconfont icongengduo'></View>
              </View>
            </View>
          )}
          <View
            className='user-opreate-item'
            onClick={this.changePassword.bind(this, userInfo.mobile)}
          >
            <View className='item-title'>
              <View className='icon-box'>
                <View className='iconfont iconxiugaimima'></View>
              </View>
              <View className='item-title-text'>修改密码</View>
            </View>
            <View className='item-des'>
              <View className='iconfont icongengduo'></View>
            </View>
          </View>
          <View
            className='user-opreate-item'
            onClick={this.outLogin.bind(this)}
          >
            <View className='item-title'>
              <View className='icon-box'>
                <View className='iconfont icontuichudenglu'></View>
              </View>
              <View className='item-title-text'>退出登录</View>
            </View>
            <View className='item-des'>
              <View className='iconfont icongengduo'></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
