import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Input, Text, Icon, Button } from "@tarojs/components";
import "./index.scss";
import { showPopup } from "@/utils/index";
import { WxBtn } from "../../wx-btn";

var QQMapWX = require("../../../utils/qqmap-wx-jssdk");

let qqMap = new QQMapWX({
  key: 'YHBBZ-XJ6W4-NE2UI-X5PMO-FPF6H-KWFFA'
});

class DeliversyLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
    };
  }
  handleChange(event) {
    this.setState({ keywords: event.target.value });
  }
  goRouter = (url) => {
    Taro.navigateTo({
      url: url
    })
  }
  goMap(address,event){
    event.stopPropagation();
    let _this = this;
    qqMap.geocoder({
      address: address,   //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
        complete: res => {
          Taro.openLocation({
            latitude:Number(res.result.location.lat),
            longitude:Number(res.result.location.lng),
            address:address,
            scale: 15
          })
        }
    });
  }
 
  render() {
    let { keywords } = this.state;
    let { data = [] } = this.props;
    let status = [
      {title: "待取货",color: "G-color-e00e0c"},
      {title: "送货中",color: "G-color-e00e0c"},
      {title: "已送货",color: "G-color-2EB872"},
      {title: "已作废",color: "G-color-7F7F7F"},
    ];
    return (
      <>
      {
        data.length == 0? (
          <View className='order-empty G-color-7f'>暂无数据</View>
        ):
        <View className='order-list-main'>
          {data.map((item,index) => (
            <View className='order-list' key={index} onClick={this.goRouter.bind(this,`/pages/delivery/delivery-order/show-delivery/index?sn=${item.serial}`)}>
              <View className='order-list-item'>
                <View className='order-list-title'>单据编号：</View>
                <View className='order-list-info bill-number'>{item.serial}</View>
                <View
                  className={`G-Fsize-16 order-status ${
                    status[item.status].color
                  }`}
                >
                  {status[item.status].title}
                </View>
              </View>
              <View className='order-list-item'>
                <View className='order-list-title'>取货仓库：</View>
                <View className='order-list-info order-warehouse G-limit-one'>
                  {item.depot_name}
                </View>
              </View>
              <View className='order-list-item'>
                <View className='order-list-title'>期望交货：</View>
                <View className='order-list-info order-date G-limit-one'>
                  <Text className='Text G-color-11'>{item.delivery_date}</Text>
                </View>
              </View>
              <View className='order-list-item'>
                <View className='order-list-title'>客户名称：</View>
                <View className='customer-info fl-row-end'>
                  <View className='order-list-info customer-name G-limit-one'>
                    {item.customer_name}
                  </View>
                  <Text className='G-Ml-10'>{item.mobile}</Text>
                </View>
                <Icon
                  className='iconfont icondadianhua G-Ml-10  customer-mobile-icon'
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.makePhoneCall({
                      phoneNumber: item.mobile,
                    });
                  }}
                ></Icon>
              </View>
              <View className='order-list-item'>
                <View className='order-list-title'>收货地址：</View>
                <View className='order-list-info customer-address G-limit-one'>
                  {item.address}
                </View>
                <Icon className='iconfont icondaohang G-Ml-10 customer-address-icon' onClick={this.goMap.bind(this,item.address)}></Icon>
              </View>
              {
                item.status == 0 || item.status == 1 ? (
                  <View className='order-btn fl-column-center'>{item.status == 0 ? '我要取货' : '我要送货'}</View>
                ):null
              }
            </View>
          ))}
        </View>
      }
      </>
    );
  }
}

export { DeliversyLists };
