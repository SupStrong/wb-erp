import Taro, { getCurrentInstance, showToast } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Icon, Text, Image } from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
import { showPopup } from "@/utils/index";
import {
  API_DELIVERY_ORDER_SHOW,
  API_DELIVERY_ORDER_TAKE,
  API_DELIVERY_ORDER_FINISH,
} from "@/http/api/DELIVERY";
import "./index.scss";

function mapStateToProps(state) {
  return {
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
      isShrink: false,
      getData: {
        order_goods: [],
      },
    };
  }
  componentDidMount() {
    let sn = getCurrentInstance().router.params.sn;
    this.setState({ sn: sn }, () => {
      this.getData();
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  async getData() {
    try {
      let { data } = await API_DELIVERY_ORDER_SHOW({
        sn: this.state.sn,
      });
      this.setState({
        getData: data,
      });
    } catch (err) {
      showPopup("载入远程数据错误");
    }
  }
  async postTake() {
    try {
      let { status, message } = await API_DELIVERY_ORDER_TAKE({
        sn: this.state.sn,
      });
      if (status) {
        showPopup(message);
        Taro.navigateBack({
          delta: 1,
        });
      }
    } catch (err) {
      showPopup("载入远程数据错误");
    }
  }
  goRouter = (url) => {
    Taro.navigateTo({
      url: url,
    });
  };
  openShrink() {
    let { isShrink } = this.state;
    this.setState({
      isShrink: !isShrink,
    });
  }
  setStatus(status) {
    let that = this;
    let { sn, getData } = this.state;
    if (status == 0) {
      Taro.showModal({
        title: "提示",
        content: "确定要对该送货单进行取货吗？",
        success: function (res) {
          if (res.confirm) {
            that.postTake();
          }
        },
      });
    } else if (status == 1) {
      that.goRouter(
        `/pages/delivery/delivery-order/select-goods/index?sn=${sn}&item=${JSON.stringify(
          getData.order_goods
        )}`
      );
    }
  }

  render() {
    let { getData, isShrink, sn } = this.state;
    const isIphone = this.props.isIphone.isIphone;
    let successTotal = 0;
    getData.order_goods.map((item, index) => {
      successTotal += item.success;
    })

    return (
      <View className={`${isIphone ? "index ipx" : "index"}`}>
        <View className='header-info G-Mt-10'>
          <View className='info-main'>
            <View className='info-title'>单据编号：</View>
            <View className='info-text'>{getData.serial}</View>
          </View>
          <View className='info-main'>
            <View className='info-title'>单据日期：</View>
            <View className='info-text'>{getData.billdate}</View>
          </View>
          {isShrink && (
            <>
              <View className='info-main'>
                <View className='info-title'>出库仓库：</View>
                <View className='info-text'>{getData.depot_name}</View>
              </View>
              <View className='info-main'>
                <View className='info-title'>源单据编号：</View>
                <View className='info-text'>{getData.original_serial}</View>
              </View>
              <View className='info-main'>
                <View className='info-title'>客户名称：</View>
                <View className='info-text'>{getData.customer_name}</View>
              </View>
              <View className='info-main'>
                <View className='info-title'>手机号码：</View>
                <View className='info-text'>{getData.mobile}</View>
              </View>
              <View className='info-main'>
                <View className='info-title'>收货地址：</View>
                <View className='info-text'>{getData.address}</View>
              </View>
            </>
          )}
          <View
            className={`info-shrink ${isShrink ? "active" : ""}`}
            onClick={this.openShrink.bind(this)}
          >
            <View className='iconfont iconshangla'></View>
          </View>
          <Icon
            className={`iconfont icon-success iconsonghuowancheng ${
              getData.status != 2 ? "G-hide" : ""
            }`}
          ></Icon>
          <Icon
            className={`iconfont icon-error iconyizuofei ${
              getData.status != 3 ? "G-hide" : ""
            }`}
          ></Icon>
        </View>
        <View className='goods-main'>
          <View className='goods-title'>
            <View className='goods-title-l'>
              <Icon className='goods-title-l-icon iconfont iconsonghuoshangpin'></Icon>
              <Text className='goods-title-l-text'>送货商品</Text>
            </View>
            <View className='goods-title-r'>
              共<Text className='G-color-e00e0c'> {getData.goods_type} </Text>种
              <Text className='G-color-e00e0c'> {getData.goods_total} </Text>件 
              {getData.status == 2 && (<>送达<Text className='G-color-e00e0c'> {successTotal} </Text>件</>)}
            </View>
          </View>

          {getData.order_goods.map((item, index) => (
            <View
              className='goods-list'
              key={index}
              onClick={this.goRouter.bind(
                this,
                `/pages/delivery/delivery-order/goods-details/index?sn=${sn}&status=${getData.status}&item=${JSON.stringify(
                  item
                )}`
              )}
            >
              <View className='goods-list-info'>
                <View className='goods-list-img'>
                  <Image className='image' src={item.image} />
                  {item.type == '1' ? <View className='goods-list-serial'>SN</View> : ''}
                </View>
                <View className='goods-list-text'>
                  <View className='goods-name G-color-11 G-limit-one'>{item.name}</View>
                  <View className='goods-code G-Fsize-12 G-limit-one G-color-7f'>
                    商品条码：{item.code}
                  </View>
                  <View className='goods-norms G-Fsize-12 G-limit-one G-color-7f'>
                    商品规格：{item.model}
                  </View>
                  <View className='goods-number G-Fsize-12 G-limit-one G-color-7f'>
                    待送货数量：
                    <Text className='G-color-e00e0c G-Fsize-12 G-Mr-20'>
                      {item.num}
                    </Text>
                    {getData.status == 2 && (<> 送达数量：
                    <Text className='G-color-e00e0c G-Fsize-12'>
                      {item.success}
                    </Text>
                    </>)}
                  </View>
                </View>
              </View>
              <View className='router-icon iconfont icongengduo'></View>
              <View className='goods-remarks G-limit-one G-Fsize-12 G-color-7f'>
                备注：{item.remark}
              </View>
            </View>
          ))}
        </View>

        <View className='whole-remarks'>
          <View className='G-color-7f whole-remarks-title'>整单备注：</View>
          <View className='G-color-11 whole-remarks-text'>
            {getData.remark}
          </View>
        </View>
        {getData.status == 0 || getData.status == 1 ? (
          <View className={`footer-btn ${isIphone ? "ipx" : ""}`}>
            <View
              className='btn'
              onClick={this.setStatus.bind(this, getData.status)}
            >
              {getData.status == 0 ? "取货完成" : "我要送货"}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Index;
