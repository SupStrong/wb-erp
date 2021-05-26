import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View} from "@tarojs/components";
import { API_AUTH_SEND } from "@/http/api/AUTH";
import { showPopup, showLoading } from "@/utils/index";

import "./index.scss";
let timer = null;
class CommonBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyInfo: {
        codeNum: "60",
        hasCode: true,
      },
    };
  }
  handleClick(status){
    if(!status){
      return
    }
    this.props.handleClick()
  }
  render() {
    let {verifyInfo} = this.state
    let {btnText,status,externalClass = "", } = this.props;
    return (
      <View className={`G-common-btn ${externalClass}`} onClick={this.handleClick.bind(this,status)}>
        {btnText}
      </View>
    );
  }
}

export { CommonBtn };
