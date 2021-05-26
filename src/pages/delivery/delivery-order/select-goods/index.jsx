import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Text, Image, Icon } from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
import { Search } from "@/components/search";
import { TabMenu } from "@/components/tab_menu";
import { DeliversyLists } from "@/components/delivery/lists";
import "./index.scss";
import { API_DELIVERY_ORDER_FINISH } from "@/http/api/DELIVERY";
import { List } from "_immutable@3.8.2@immutable";
import { showPopup } from "@/utils/";

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
      sn: "",
      listData: [],
    };
  }
  componentDidMount() {
    let data = getCurrentInstance().router.params.item;
    let sn = getCurrentInstance().router.params.sn;
    let listData = JSON.parse(data).map((item) => {
      return Object.assign(item, { current: 0 });
    });
    this.setState({ listData: listData, sn: sn });
  }

  componentWillUnmount() {}

  componentDidShow() {
    let { listData } = this.state;
    let pages = Taro.getCurrentPages();
    let currPageData = pages[pages.length - 1].data;
    let index = listData.findIndex(
      (obj) => obj.goods_id == currPageData.goods_id
    );
    listData[index] = {
      ...listData[index],
      serialList: currPageData.serialList,
      current: currPageData.serialList ? currPageData.serialList.length : 0,
    };
    this.setState({ listData: listData });
  }

  setNumber(index, type) {
    let { listData } = this.state;
    if (type == "1") {
      listData[index].current++;
      if (listData[index].current > listData[index].num) {
        listData[index].current = listData[index].num;
        showPopup(`最多可送${listData[index].num}件`);
      }
    } else {
      listData[index].current--;
      if (listData[index].current < +0) {
        listData[index].current = 0;
        showPopup("不能再减少啦~");
      }
    }
    this.setState({ listData: listData });
  }

  onClickScan(item) {
    Taro.navigateTo({
      url: `/pages/delivery/delivery-order/serial-lists/index?sn=${
        this.state.sn
      }&id=${item.id}&goods_id=${item.goods_id}&serialList=${
        JSON.stringify(item.serialList) || []
      }`,
    });
  }

  async onSuccess() {
    let { listData } = this.state;
    let mapData = listData.map((item) => {
      return {
        id: item.id,
        num: item.current,
        serials: item.serialList || [],
      };
    });
    let postData = {
      data: mapData,
      sn: this.state.sn,
    };
    console.log(postData,listData,"postData");

    try {
      let { status, message } = await API_DELIVERY_ORDER_FINISH(postData);
      showPopup(message);
      if (status) {
        Taro.redirectTo({
          url: `/pages/delivery/delivery-order/lists/index`,
        });
      }
    } catch (err) {
      // showPopup("载入远程数据错误");
    }
  }

  render() {
    let { listData } = this.state;
    const isIphone = this.props.isIphone.isIphone;
    return (
      <View className={`${isIphone ? "index ipx" : "index"}`}>
        {listData.map((item, index) => (
          <View className='goods-list' key={index}>
            <View className='goods-details'>
              <View className='goods-image'>
                <Image className='goods-img' src={item.image} />
              </View>
              <View className='goods-info'>
                <View className='G-color-11 G-Fsize-16 G-limit-2'>{item.name}</View>
                <View className='G-color-7f G-Fsize-12 goods-code G-Mt-5'>
                  <View className='title G-color-7f'>商品条码：</View>
                  <View className='text G-color-7f G-Fsize-12 G-limit-one'>
                    {item.code}
                  </View>
                </View>
                <View className='G-color-7f G-Fsize-12 goods-spec'>
                  <View className='title G-color-7f'>商品规格：</View>
                  <View className='text G-color-7f spec G-Fsize-12'>
                    {item.model}
                  </View>
                </View>
                <View className='G-color-7f G-Fsize-12 goods-number'>
                  <View className='title G-color-7f'>待送货数量：</View>
                  <View className='G-Fsize-12 G-color-e00e0c'>{item.num}</View>
                </View>
              </View>
            </View>
            <View className='scan-code fl-row-justy'>
              <View className='scan-code-number G-color-7f'>
                本次送达数量
                {item.type == 1 ? (
                  <>
                    ：<Text className='G-color-11'>{item.current}</Text>
                  </>
                ) : null}
              </View>
              {item.type == 1 ? (
                <View
                  className='scan-code-icon iconfont iconsaoma G-Fsize-20'
                  onClick={this.onClickScan.bind(this, item)}
                ></View>
              ) : (
                <View className='increase-number'>
                  <View
                    className='add-icon G-color-11'
                    onClick={this.setNumber.bind(this, index, "0")}
                  >
                    -
                  </View>
                  <Text className='current-number G-color-11'>
                    {item.current}
                  </Text>
                  <View
                    className='reduce-icon G-color-11'
                    onClick={this.setNumber.bind(this, index, "1")}
                  >
                    +
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
        <View
          className={`footer-btn ${isIphone ? "ipx" : ""}`}
          onClick={this.onSuccess.bind(this)}
        >
          <View className='btn'>送货完成</View>
        </View>
      </View>
    );
  }
}

export default Index;
