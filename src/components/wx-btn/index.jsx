import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { Button } from "@tarojs/components";
import {  API_AUTH_AUTHORIZE } from "@/http/api/AUTH";
import { showPopup} from "@/utils/index";

import "./index.scss";

class WxBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getWxAuth({detail:{encryptedData,iv}}){
    //获取token
    let { status, message,data} = await API_AUTH_AUTHORIZE(
      {
        data:{
          code:this.props.code,
          encryptedData,
          iv
        }
      }
    );
    showPopup(message, status);
    this.props.getCode()
    if (!status) {
      return false;
    }
    this.props.getAuthInfo(data);
   }
  render() {
    return (
      <Button
      className='G-wx-btn'
      open-type='getUserInfo'
      onGetUserInfo={this.getWxAuth.bind(this)}
    ></Button>
    );
  }
}

export { WxBtn };
