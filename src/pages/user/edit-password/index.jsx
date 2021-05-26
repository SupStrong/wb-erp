import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "@tarojs/components";
import { LoginInput } from "@/components/login_input";
import { VerifyBtn } from "@/components/verify-btn";
import { CommonBtn } from "@/components/common-btn";
import { API_AUTH_UPDATE } from "@/http/api/AUTH";
import { showPopup, showLoading, setRefrs } from "@/utils/index";

import "./index.scss";

function mapStateToProps(state) {
  return {
    // userInfo: state.userInfo.toJS(),
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
      mobile: "",
      submitData: {
        password: "",
        code: "",
      },
    };
  }
  componentDidMount() {
    let {
      params: { mobile },
    } = getCurrentInstance().router;
    this.setState({
      mobile,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}
  handleChange({ value, keywords }) {
    let { submitData } = this.state;
    submitData[keywords] = value;
    this.setState({ submitData });
  }

  async handleClick() {
    //获取token
    let { status, message } = await API_AUTH_UPDATE({data:this.state.submitData});
    showPopup(message, status);
    if (!status) {
      return false;
    }
    Taro.navigateBack({
      delta:1
    })
  }
  getSubmitStatus() {
    let arr = Object.values(this.state.submitData);
    return arr.every((currentValue) => currentValue.toString().length > 0);
  }
  render() {
    let { submitData, mobile } = this.state;
    let login_status = this.getSubmitStatus();
    return (
      <View className='page'>
        <View className='bd'>
          <LoginInput
            placeholderText='请输入手机号'
            inputValue={mobile}
            handleChange={this.handleChange.bind(this)}
            disabled='disabled'
          >
           <View className='title'>手机号：</View>
          </LoginInput>
          <LoginInput
            placeholderText='请输入验证码'
            keywords='code'
            inputValue={submitData.code}
            handleChange={this.handleChange.bind(this)}
          >
            <View className='title'>验证码：</View>
            <VerifyBtn source='3' mobile={mobile}></VerifyBtn>
          </LoginInput>
          <LoginInput
            placeholderText='请输入新密码'
            keywords='password'
            type='password'
            inputValue={submitData.password}
            handleChange={this.handleChange.bind(this)}
          >
            <View className='title'>新密码：</View>
          </LoginInput>
        </View>
        <CommonBtn
            btnText='确定'
            externalClass={login_status == true ? "" : "disabled"}
            status={login_status}
            handleClick={this.handleClick.bind(this)}
          />
      </View>
    );
  }
}

export default Index;
