import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Button } from "@tarojs/components";
import * as UserInfo from "@/actions/userInfo";
import { Search } from "@/components/search";
import { TabMenu } from "@/components/tab_menu";
import { DeliversyLists } from "@/components/delivery/lists";
import {
  API_DELIVERY_ORDER_INDEX,
  API_DELIVERY_ORDER_TOTAL,
} from "@/http/api/DELIVERY";
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
let data = [
  {
    id: "-1",
    title: "全部",
  },
  {
    id: "0",
    title: "待取货",
    isIcon: true,
  },
  {
    id: "1",
    title: "送货中",
    isIcon: true,
  },
  {
    id: "2",
    title: "已送货",
  },
  {
    id: "3",
    title: "已作废",
  },
];
@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        status: "",
        keywords: "",
        page: 1,
      },
      getData: [],
      getTotal: [{ nums: 0 },{ nums: 0 }, { nums: 0 }, { nums: 0 }, { nums: 0 }],
    };
  }
  componentDidMount() {
    // this.getData();
  }

  componentWillUnmount() {}

  componentDidShow() {
    this.setState({
      getData: [],
    });
    this.getData();
  }

  onReachBottom() {
    if (this.state.postData.page == 0) {
      return false;
    }
    this.getData();
  }

  async getData() {
    try {
      let { postData, getData } = this.state;
      if (postData.status == -1) {
        postData.status = "";
      }
      let { data } = await API_DELIVERY_ORDER_INDEX(postData);
      postData.page = data.next_page;
      this.setState({
        getData: [...this.state.getData,...data.items],
        postData: postData
      });
      this.getTotal();
    } catch (err) {
      // showPopup("载入远程数据错误");
    }
  }
  async getTotal() {
    try {
      let { data } = await API_DELIVERY_ORDER_TOTAL();
      this.setState({
        getTotal: data,
      });
    } catch (err) {
      // showPopup("载入远程数据错误");
    }
  }
  showInfo(message) {
    let { postData } = this.state;
    postData.keywords = message;
    postData.page = 0;
    this.setState({
      postData: postData,
      getData: []
    });
    this.getData();
  }
  changeIdx(n) {
    let { postData} = this.state;  
    postData.status = n;
    this.setState({
      postData: postData,
      getData: []
    });
    this.getData();
  }

  render() {
    let { getData, getTotal } = this.state;
    return (
      <View className='index main-index'>
        <Search
          showInfo={this.showInfo.bind(this)}
          TipsText='请输入单据、源单据编号；客户、仓库名称'
        ></Search>
        <TabMenu
          data={data}
          total={getTotal}
          changeIdx={this.changeIdx.bind(this)}
        ></TabMenu>
        <DeliversyLists
          data={getData}
          showInfo={this.showInfo.bind(this)}
        ></DeliversyLists>
      </View>
    );
  }
}

export default Index;
