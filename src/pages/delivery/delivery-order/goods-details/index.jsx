import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Text, Image } from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
import { Search } from "@/components/search";
import { TabMenu } from "@/components/tab_menu";
import { DeliversyLists } from "@/components/delivery/lists";
import "./index.scss";
import { List } from "_immutable@3.8.2@immutable";

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS(),
    isIphone: state.isIphone.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(UserInfo, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: {
        serials: [],
      },
      status:''
    };
  }
  componentDidMount() {
    let listData = getCurrentInstance().router.params.item;
    let status = getCurrentInstance().router.params.status;
    this.setState({ 
      listData: JSON.parse(listData),
      status:status
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  render() {
    let { listData,status } = this.state;
    let waitSerialsList = listData.serials.filter((item) => item.status == 0);
    return (
      <View className='index'>
        <View className='goods-details'>
          <View className='goods-image'>
            <Image className='goods-img' src={listData.image} />
          </View>
          <View className='goods-info'>
            <View className='G-color-11 G-Fsize-16 G-color-11 G-Fsize-16 G-limit-2'>{listData.name}</View>
            <View className='G-color-7f G-Fsize-14 G-Mt-10 goods-code'>
              <View className='title G-color-7f'>商品条码：</View>
              <View className='text G-color-7f G-Fsize-14 G-limit-one'>
                {listData.code}
              </View>
            </View>
            <View className='G-color-7f G-Fsize-14 G-Mt-5 goods-spec'>
              <View className='title G-color-7f'>商品规格：</View>
              <View className='text G-color-7f spec G-Fsize-14'>
                {listData.model}
              </View>
            </View>
          </View>
        </View>
        {listData.type == 1 && (
          <>
            <View className='delivery-number G-color-7f fl-row-left'>
              待送货数量：<Text className='G-color-11'>{listData.num}</Text>
            </View>
            <View className='serial-list'>
              <View className='scroll-serial'>
                <View className='title'>商品序列号</View>
                <View className='scroll-main'>
                  {listData.serials.map((item, index) => (
                    <View className='scroll-main-list' key={index}>
                      {item.serial}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
        {listData.type == 1 && status == 2 && (
          <>
            <View className='delivery-number G-color-7f fl-row-left'>
              已送货数量：<Text className='G-color-11'>{listData.success}</Text>
            </View>
            <View className='serial-list'>
              <View className='scroll-serial'>
                <View className='title'>商品序列号</View>
                <View className='scroll-main'>
                  {waitSerialsList.map((item, index) => (
                    <View className='scroll-main-list' key={index}>
                      {item.serial}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
        <View className='goods-remarks'>
          <View className='G-color-7f goods-remarks-title'>此商品备注：</View>
          <View className='G-color-11 goods-remarks-text'>
            {listData.remark}
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
