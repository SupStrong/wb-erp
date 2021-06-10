export default {
  pages: [
    'pages/goods/lists/index',
    'pages/address/alls/index',
    'pages/address/news/index',
    'pages/goods/details/index',
    'pages/goods/confirm/index',
    'pages/order/lists/index',
    'pages/order/details/index',
    'pages/order/success/index',
    'pages/shop-cart/index',
    'pages/user/login/index',
    'pages/user/edit/index',
    'pages/user/my/index',
    'pages/materials/lists/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "permission" : {
    "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
},
  "tabBar": {
    "color": "#C8CCD7",
    "backgroundColor": "#FFFFFF",
    "selectedColor": "#222222",
    "borderStyle": "white",
    "list": [{
        "text": "产品库",
        "pagePath": "pages/goods/lists/index",
        "iconPath": "./assets/images/tabbar/bar01.png",
        "selectedIconPath": "./assets/images/tabbar/bar1.png"
      },
      {
        "text": "原材库",
        "pagePath": "pages/materials/lists/index",
        "iconPath": "./assets/images/tabbar/bar02.png",
        "selectedIconPath": "./assets/images/tabbar/bar2.png"
      },{
        "text": "购物车",
        "pagePath": "pages/shop-cart/index",
        "iconPath": "./assets/images/tabbar/bar03.png",
        "selectedIconPath": "./assets/images/tabbar/bar3.png"
      },
      {
        "text": "个人中心",
        "pagePath": "pages/user/my/index",
        "iconPath": "./assets/images/tabbar/bar04.png",
        "selectedIconPath": "./assets/images/tabbar/bar4.png"
      }
    ],
  }
}
