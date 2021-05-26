import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button } from "@tarojs/components";
import { API_AUTH_TENANT, API_AUTH_USER } from "@/http/api/AUTH";
import { showPopup, showLoading,initUser } from "@/utils/index";

import "./index.scss";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      merchantIds: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  async getData() {
    try {
      let { status, message, data: listData } = await API_AUTH_TENANT();
      if (!status) {
        showPopup(message);
        return;
      }
      this.setState({ listData });
    } catch (err) {
      showPopup("载入商家数据错误");
    }
  }
  handleClick({tenant_id,status}){
    if(!status){
      Taro.showModal({
        title:'商家提示',
        content:'当前商家未营业，请稍后再试。',
        confirmColor:'#2950F0',
        confirmText:'确定',
        showCancel:false
      })
      return false
    }
    this.getUserInfo(tenant_id)
  }
  async getUserInfo(tenant_id) {
    let {status,message,data} = await API_AUTH_USER({tenant_id})
    if(!status){
      showPopup(message)
      return
    }
    initUser(data)
    Taro.switchTab({
      url: '/pages/tabs/console/index'
    })
  }
  render() {
    const { listData } = this.state;
    return (
      <View class='list'>
        {listData.length > 0 &&
          listData.map((item, index) => {
            return (
              <View
                class={`tenant-box ${item.status == 0 && "disabled"}`}
                key={item.tenant_id}
                onClick={this.handleClick.bind(this,{tenant_id:item.tenant_id,status:item.status})}
              >
                <View class='status-text'>
                  {item.status ? "营业中" : "已打烊"}
                </View>
                <View class='tenant-company'>
                  <View class='name'>{item.company}</View>
                  <View className='iconfont'>  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}

export default Index;
