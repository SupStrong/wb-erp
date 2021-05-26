import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View,Input,Text,Icon,Button } from "@tarojs/components";
import "./index.scss";

class DeliversyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
    }
  }
  handleChange(event) {
    this.setState({ keywords: event.target.value });
  }
  render() {
    let { keywords } = this.state;
    let { data = {} } = this.props;
    return (
      <View className='order-list-main'>
        <View className='order-list'>
          <View className='order-list-item'>
            <View className='order-list-title'>单据编号：</View>
            <View className='order-list-info bill-number'>SHD2009876543456</View>
            <View className='G-Fsize-16 order-status G-color-2EB872'>待取货</View>
          </View>
          <View className='order-list-item'>
            <View className='order-list-title'>取货仓库：</View>
            <View className='order-list-info order-warehouse G-limit-one'>仓库一仓库一仓库一仓库一</View>
          </View>
          <View className='order-list-item'>
            <View className='order-list-title'>期望交货：</View>
            <View className='order-list-info order-date G-limit-one'><Text className='Text G-color-11'>2021-04-122021-04-122021-04-12</Text></View>
          </View>
          <View className='order-list-item'>
            <View className='order-list-title'>客户名称：</View>
            <View className='customer-info fl-row-end'>
              <View className='order-list-info customer-name G-limit-one'>
              刘哥刘哥刘哥刘哥
              </View>
              <Text className='G-Ml-10'>15534109927</Text>
            </View>
              <Icon className='iconfont icondadianhua G-Ml-10  customer-mobile-icon'></Icon>
          </View>
          <View className='order-list-item'>
            <View className='order-list-title'>收货地址：</View>
            <View className='order-list-info customer-address G-limit-one'>北京市北京市大兴区崔家窑中路123</View>
            <Icon className='iconfont icondaohang G-Ml-10 customer-address-icon'></Icon>
          </View>
          <View className='order-btn fl-column-center'>我要送货</View>
        </View>
      </View>
    )
  }
}

export { DeliversyDetail };
