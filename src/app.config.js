export default {
  pages: [
    'pages/login/index',
    'pages/work-platform/index',
    "pages/tabs/user/index",
    "pages/tabs/console/index",
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
        "text": "工作台",
        "pagePath": "pages/tabs/console/index",
        "iconPath": "./assets/images/tabbar/bar01.png",
        "selectedIconPath": "./assets/images/tabbar/bar1.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/tabs/user/index",
        "iconPath": "./assets/images/tabbar/bar02.png",
        "selectedIconPath": "./assets/images/tabbar/bar2.png"
      }
    ],
  },
  subPackages: [
    {
      "root": "pages/user",
      "name": "user",
      "pages": [
        'bind-mobile/index',
        'edit-password/index',
        'select-merchant/index'
      ]
     },
     {
      "root": "pages/delivery",
      "name": "delivery",
      "pages": [
        'delivery-order/show-delivery/index',
        'delivery-order/lists/index',
        'delivery-order/goods-details/index',
        'delivery-order/select-goods/index',
        'delivery-order/serial-lists/index'
      ]
     }
  ]
}
