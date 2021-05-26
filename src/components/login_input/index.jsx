import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Input } from "@tarojs/components";
import "./index.scss";

class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { inputValue, keywords, placeholderText, iconName,externalClass='',type='number',disabled='' } = this.props;
    return (
      <View className= {`G-login-input ${externalClass}`}>
        <View className={`iconfont ${iconName}`}></View>
        <Input
          type={type}
          className = 'input-el'
          value={inputValue}
          disabled={disabled}
          onInput={(e) => {
            this.props.handleChange({ keywords, value: e.target.value });
          }}
          placeholder={placeholderText}
        />
        {this.props.children}
      </View>
    );
  }
}

export { LoginInput };
