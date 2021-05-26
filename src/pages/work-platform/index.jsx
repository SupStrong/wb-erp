import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View ,Button,coverView,coverImage,Camera} from "@tarojs/components";
import { API_DATA } from "@/http/api/DEMO";
import * as UserInfo from "@/actions/userInfo";
import { INITUSER } from "../../constants/userInfo";

import "./index.scss";

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
      id: 0,
      currentListIdx: 0,
      scanFunctionIsUseAble: true
    };
  }
  componentDidMount() {
    let id = getCurrentInstance().router.params.id;
    this.setState({ id: id }, () => {
      this.getData();
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  async getData() {
    try {
      let { data } = await API_DATA({
        page: 1,
      });
    } catch (err) {
      // showPopup("载入远程数据错误");
    }
  }
  goQuestionDes() {
    Taro.navigateTo({
      url: ``,
    });
  }
    takeCode(e) {
    //   let { scanFunctionIsUseAble } = this.state;
    // console.log(scanFunctionIsUseAble,e,"this.state.scanFunctionIsUseAble");
    // if (this.state.scanFunctionIsUseAble){
    // console.log('开始扫码', 'success')
    // this.setState({
    // scanFunctionIsUseAble: false,
    // })
    // console.log("e: " + e);
    // var fileCode = e.detail.result;
    // console.log("fileCode: " + fileCode);
    // }
    }
  render() {
    const { currentListIdx } = this.state;
    const isIphone = this.props.isIphone['isIphone'];
    const userInfo = this.props.userInfo['userInfo'];
    return (
      <View className='index'>
       <Camera mode='scanCode' device-position='back' flash='off' onError='error' onInitDone='takeCode' style='width: 100%; height: 300px;' onScanCode={this.takeCode} scan-area='[0,0,200, 200]'>
      </Camera>
      </View>
    );
  }
}

export default Index;
