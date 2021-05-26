import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View,Input,Text} from "@tarojs/components";
import "./index.scss";

class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListIdx: "-1",
    }
  }
  changeIdx(n) {
    if (n == this.state.currentListIdx) {
      return false
    }
    this.setState({
      currentListIdx: parseFloat(n)
    });
    this.props.changeIdx(n);
  }
  render() {
    let { currentListIdx } = this.state;
    let { data = {},total} = this.props;
    return (
      <View className='tab fl-row-center'>
      {data.map((item, idx) =>
        (
          <View key={idx} className={`G-Fsize-16 G-color-6a tab-item ${currentListIdx == item.id ? 'active' : ''}`} style={`width:${100 / data.length}%`} onClick={this.changeIdx.bind(this, item.id)}>
            {item.isIcon ?( <Text className='icon-text'>{total[item.id].nums}</Text>) : null}
            {item.title}
            </View>)
      )
      }
    </View>
    );
  }
}

export { TabMenu };
