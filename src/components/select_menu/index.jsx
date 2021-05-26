import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View ,Button} from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
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
  setSateData(data){
  }

  render() {
    const { currentListIdx } = this.state;
    const isIphone = this.props.isIphone['isIphone'];
    const userInfo = this.props.userInfo['userInfo'];
    return (
      <View className='index'>
        <Button onClick={this.setSateData.bind(this)}>anniu</Button>
      </View>
    );
  }
}

export default Index;
