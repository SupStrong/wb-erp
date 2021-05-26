import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "@tarojs/components";
import { LoginInput } from "@/components/login_input";
import { VerifyBtn } from "@/components/verify-btn";
import { CommonBtn } from "@/components/common-btn";
import { API_AUTH_BIND } from "@/http/api/AUTH";
import { showPopup, showLoading, initToken } from "@/utils/index";

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
      submitData: {
        mobile: "",
        openid: "",
        unionid: "",
        code: "",
      },
    };
  }
  componentDidMount() {
    let { params } = getCurrentInstance().router;
    let {submitData} = this.state
     Object.assign(submitData,params)
    this.setState({
      submitData,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}
  handleChange({ value, keywords }) {
    let { submitData } = this.state;
    submitData[keywords] = value;
    this.setState({ submitData });
  }

  async authBind() {
    //获取token
    let { status, message,data:{token} } = await API_AUTH_BIND({data:this.state.submitData});
    showPopup(message, status);
    if (!status) {
      return false;
    }
    initToken(token)
    Taro.navigateTo({
      url: `/pages/user/select-merchant/index`,
    });
  }
  getSubmitStatus() {
    let a = JSON.parse(JSON.stringify(this.state.submitData))
    let arr = Object.values(delete a.unionid);
    return arr.every((currentValue) => currentValue.toString().length > 0);
  }
  render() {
    let { submitData } = this.state;
    let login_status = this.getSubmitStatus()
    return (
      <View className='page'>
        <View className='hd'>
        请绑定手机号
        </View>
        <View className='bd'>
          <LoginInput
            iconName='iconshouji'
            placeholderText='请输入手机号'
            keywords='mobile'
            inputValue={submitData.mobile}
            handleChange={this.handleChange.bind(this)}
          />
          <LoginInput
            iconName='iconmima'
            placeholderText='请输入验证码'
            keywords='code'
            inputValue={submitData.code}
            handleChange={this.handleChange.bind(this)}
          >
            <VerifyBtn source='2' mobile={submitData.mobile}></VerifyBtn>
          </LoginInput>
          <CommonBtn
            btnText='确定绑定'
            externalClass={login_status == true ? "" : "disabled"}
            status={login_status}
            handleClick={this.authBind.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default Index;
