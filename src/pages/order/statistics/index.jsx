import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View,Text,Image } from "@tarojs/components";
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

import "./index.scss";
 

import locationImg from "@/assets/images/order/location.png";
import mobileImg from "@/assets/images/order/mobile.png";
import albumImg from "@/assets/images/order/album.png";
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
  render() {
    let { submitData, code } = this.state;
    return (
      <View className='content'>
        <View className="status G-Fsize-14 G-color-34 G-bold">已完成</View>
        <View className="tabbar G-bg-white">
          <View className="tabbar-list">
            <View className="G-Fsize-14 btn active">订单信息</View>
            <View className="G-Fsize-14 btn">送货信息</View>
          </View>
        </View>
        {/* 订单信息 */}
        <>
          <View className="G-bg-white G-hide">
            <View className="tabbar-info">
              <View className="info-l">
                <Image className="location-icon" src={locationImg} />
              </View>
              <View className="info-r G-Ml-15">
                <View className="address G-Fsize-15 G-color-34">北京市直辖市朝阳区南四环东路辅路80盛五金 建材门卫</View>
                <View className="mobile G-Fsize-15 G-Mt-10 G-color-666">温晓杰  13520010194 </View>
              </View>
            </View>
            <View className="tabbar-date">
              <Text className="G-Fsize-15 G-color-34">预计送达时间</Text>
              <Text className="G-Fsize-15 G-color-666">2021-06-07</Text>
            </View>
          </View>
          <View className="goods G-bg-white G-Mt-5 G-hide">
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
          </View>
          <View className="ipt G-Mt-5 G-bg-white G-hide">
          <View className="ipt-list">
            <View className="ipt-list-l G-Fsize-15 G-color-34">订单编号</View>
            <View className="ipt-list-r G-Fsize-15 G-color-666">LG202106011345030001</View>
          </View>
          <View className="ipt-list">
            <View className="ipt-list-l G-Fsize-15 G-color-34">下单时间</View>
            <View className="ipt-list-r G-Fsize-15 G-color-666">2021-06-01 13:45:03</View>
          </View>
          <View className="ipt-list">
            <View className="ipt-list-l G-Fsize-15 G-color-34">订单备注</View>
            <View className="ipt-list-r G-Fsize-15 G-color-666">最近货比较紧缺，希望尽快送达</View>
          </View>
        </View>
        </>
        {/* 送货信息 */}
        <>
          <View className="ipt G-bg-white">
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">送货单</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">SHD20210607134503000</View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">送货时间</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">2021-06-07 13:45:03</View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">送达时间</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">2021-06-07 13:45:03</View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">送货人员</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">温晓杰</View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">联系电话</View>
              <View className="ipt-list-r mobile G-Fsize-15 G-color-666">
                <Text className="G-color-666 G-Mr-10 G-Fsize-15">18231404044</Text>
                <Image className="mobile-icon" src={mobileImg} />
              </View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">送货备注</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">该商品生产批次为第20-2-1批次</View>
            </View>
          </View>
          <View className="goods G-bg-white G-Mt-5">
            <View className="list G-Mb-5">
              <View className="list-l">
                <Image className='' src="https://img0.baidu.com/it/u=1095903005,1370184727&fm=26&fmt=auto&gp=0.jpg" />
                <View className='info G-Ml-10'>
                  <View className='title G-Fsize-15 G-color-333 G-one-cloum'>卤小满麻椒鸡胗卤小满麻椒鸡胗卤小满麻椒鸡胗</View>
                  <View className='unit G-Fsize-13 G-color-666 G-Mt-10'>规格：2.5kg*6/箱</View>
                  <View className="G-color-ff002c G-Fsize-10 G-Mt-10">备注：20箱共计30斤</View>
                </View>
              </View>
              <View className='number G-Fsize-14 G-color-FF7A0F'>×100</View>
            </View>
          </View>
          <View className="ipt G-bg-white G-Mt-5">
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">收货时间</View>
              <View className="ipt-list-r G-Fsize-15 G-color-666">2021-06-07 15:45:03</View>
            </View>
            <View className="ipt-list">
              <View className="ipt-list-l G-Fsize-15 G-color-34">收货人</View>
              <View className="ipt-list-r mobile G-Fsize-15 G-color-666">
                <Image className="mobile-icon" src={albumImg} />
              </View>
            </View>
          </View>
        </>
        <View className="footer-btn G-color-white G-Fsize-14">确认收获</View>
      </View>
    );
  }
}

export default Index;
