import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Input, Icon, Text } from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
import { Search } from "@/components/search";
import { TabMenu } from "@/components/tab_menu";
import { API_DELIVERY_ORDER_CHECK } from "@/http/api/DELIVERY";
import "./index.scss";
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
      postData: {
        sn: "",
        id: "",
        code: "",
        goods_id: "",
      },
      serialCode: "",
      serialList: [],
      setIsJudge: false
    };
  }
  componentDidMount() {
    let postData = {
      sn: getCurrentInstance().router.params.sn,
      id: getCurrentInstance().router.params.id,
      goods_id: getCurrentInstance().router.params.goods_id,
    };
    let serialList =
      getCurrentInstance().router.params.serialList != ""
        ? JSON.parse(getCurrentInstance().router.params.serialList)
        : [];
    this.setState({ postData: postData, serialList: serialList });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  setSerialCode(e) {
    this.setState({
      serialCode: e.detail.value,
      setIsJudge: !!e.detail.value
    });
  }

  confirmSerialCode() {
    let { serialCode } = this.state;
    this.isSerialCode(serialCode);
  }
  deleteSerialCode(item) {
    let { serialList } = this.state;
    let that = this;
    Taro.showModal({
      title: "提示",
      content: "确定要删除该序列号？",
      success: function (res) {
        if (res.confirm) {
          let index = serialList.indexOf(item);
          serialList.splice(index, 1);
          that.setState({
            serialList: serialList,
          });
        }
      },
    });
  }

  onSelectSerial() {
    let pages = Taro.getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      goods_id: this.state.postData.goods_id,
      serialList: this.state.serialList,
    });
    Taro.navigateBack({
      //返回
      delta: 1,
    });
  }
  onCodeScan() {
    let that = this;
    Taro.scanCode({
      onlyFromCamera: true,
      success(code) {
        that.isSerialCode(code.result);
      },
    });
  }
  async isSerialCode(code) {
    let { serialList } = this.state;
    try {
      let { status, message } = await API_DELIVERY_ORDER_CHECK({
        sn: this.state.postData.sn,
        data: {
          id: this.state.postData.id,
          code: code,
        },
      });
      if (status) {
        if(!serialList.includes(code)){
          serialList.push(code);
        }else{
          showPopup('序列号已存在')
        }
        this.setState({
          serialList: serialList,
          serialCode:'',
        });
        return;
      }
      showPopup(message);

    } catch (err) {
      // showPopup("载入远程数据错误");
    }
  }
  render() {
    let { serialCode, serialList, setIsJudge } = this.state;
    const isIphone = this.props.isIphone.isIphone;
    return (
      <View className={`${isIphone ? "index ipx" : "index"}`}>
        <View className='serial-scan G-Mt-10'>
          <View className='title'>
            <View className='scan-text G-color-11'>商品序列号</View>
            <View
              className='scan-icon iconfont iconsaoma G-Fsize-20'
              onClick={this.onCodeScan.bind(this)}
            ></View>
          </View>
          <Input
            className='input-text'
            value={serialCode}
            onInput={this.setSerialCode.bind(this)}
            placeholder='请输入商品序列号或直接扫码录入'
          />

          <View
            className={`${setIsJudge ? "btn isdefine" : "btn"}`}
            onClick={this.confirmSerialCode.bind(this)}
          >
            确定
          </View>
        </View>
        <View className='serial-list G-Mt-10'>
          <View className='title'>
            <Icon className='iconfont iconxuliehaoliebiao'></Icon>
            <Text className='G-Ml-5 G-color-11'>商品序列号列表</Text>
          </View>
          {serialList.map((item, index) => (
            <View className='serial-number' key={index}>
              <View className='number'>{item}</View>
              <Icon
                className='iconfont iconshanchu fl-row-center'
                onClick={this.deleteSerialCode.bind(this, item)}
              ></Icon>
            </View>
          ))}
        </View>
        <View className={`footer-btn ${isIphone ? "ipx" : ""}`}>
          <View className='btn-number G-color-11'>
            共<Text className='number'>{serialList.length}</Text>件
          </View>
          <View className='btn-submit' onClick={this.onSelectSerial.bind(this)}>
            提交
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
