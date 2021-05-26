import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import { API_AUTH_SEND } from "@/http/api/AUTH";
import { showPopup, showLoading } from "@/utils/index";

import "./index.scss";
let timer = null;
let lockStatus = false
class VerifyBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyInfo: {
        codeNum: "60",
        showBtn: true,
      },
    };
  }
  async getVerCode(e) {
    e.stopPropagation(); // 阻止冒泡
    let { source, mobile } = this.props;
    if(mobile.length !== 11){
      showPopup('请填写正确的手机号')
      return
    }
    if(lockStatus){
      return
    }
    lockStatus = true
    try {
      let { status, message, data } = await API_AUTH_SEND({
        source,
        mobile,
      });
      lockStatus = false
      if (!status) {
        showPopup(message);
        return;
      }
      showPopup("验证码已发送");
      this.stopCountdown(false);
      this.startCountdown();
    } catch (err) {
      lockStatus = false
    }
  }
  startCountdown() {
    let { verifyInfo } = this.state;
    timer = setInterval(() => {
      if (verifyInfo.codeNum > 0 && verifyInfo.codeNum <= 60) {
        verifyInfo.codeNum--;
      } else {
        this.stopCountdown(true);
        return false;
      }
      this.setState({
        verifyInfo,
      });
    }, 1000);
  }
  stopCountdown(status) {
    let {verifyInfo} = this.state
    verifyInfo.codeNum = 60;
    verifyInfo.showBtn = status;
    this.setState({
      verifyInfo,
    });
    clearInterval(timer);
    timer = null;
  }
  render() {
    let { verifyInfo } = this.state;
    let { externalClass = "" } = this.props;
    return (
      <View className={`G-verify-btn ${externalClass}`}>
        {verifyInfo.showBtn ? (
          <View
            className='ver-code G-Fsize-16'
            onClick={this.getVerCode.bind(this)}
          >
            获取验证码
          </View>
        ) : (
          <View className='G-Fsize-14 G-color-999 ver-code'>
            {verifyInfo.codeNum}s后重新获取
          </View>
        )}
      </View>
    );
  }
}

export { VerifyBtn };
