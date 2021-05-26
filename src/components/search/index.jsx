import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View,Input } from "@tarojs/components";
import "./index.scss";

class Search extends Component {
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
    let { TipsText = '请输入文字' } = this.props;
    return (
      <View className='search'>
        <View className='search-box'>
          <View className='box'>
            <View className='iconfont iconsousuo G-color-7f G-Fsize-18'></View>
            <Input
              confirm-type='search'
              value={keywords}
              onInput={(e) => {
                this.handleChange(e);
              }}
              onConfirm={this.props.showInfo.bind(this, keywords)}
              placeholder={TipsText}
              placeholder-class='G-color-a3'
              className='search-text G-Fsize-14 G-color-333'
            />
          </View>
        </View>
      </View>
    );
  }
}

export { Search };
