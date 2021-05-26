import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button, Image, Icon, Text } from "@tarojs/components";
import { API_AUTH_USER } from "@/http/api/AUTH";
import { showPopup, showLoading, initToken, initUser } from "@/utils/index";
import { menusFormate, getPageList, checkAuth } from "@/utils/auth";

import "./index.scss";

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS().userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // ...bindActionCreators(UserInfo, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }
  componentDidMount() {
    let listData = getPageList(this.props.userInfo.menus);
    this.setState({ listData });
  }

  componentWillUnmount() {}

  componentDidShow() {}
  handleClick(url) {
    Taro.navigateTo({
      url,
    });
  }
  render() {
    let { listData } = this.state;
    return (
      <View className='page'>
        <View className='main-list'>
          {listData.map((groupItem, groupInedx) => {
            return (
              <>
                <View className='title G-color-11 G-Ml-5' key={groupItem.num}>
                  {groupItem.name}
                </View>
                <View className='child-list G-Mt-15'>
                  {groupItem.child.map((item, index) => {
                    return (
                      <View
                        className='child'
                        key={item.num}
                        onClick={this.handleClick.bind(this, item.path)}
                      >
                        <View className={`iconfont ${item.icon}`}></View>
                        <View className='text G-Mt-5 G-color-11'>
                          {item.name}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Index;
