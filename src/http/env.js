let appid = ''
switch (process.env.TARO_ENV) {
  case 'tt':
    appid = 'ttd10ca7b14e371b06' //tt
    break;
  case 'weapp':
    appid = 'wxe2a0a10b4ebcc409'
    break;
  default:
    appid = 'wxe2a0a10b4ebcc409'
}
const config = {
  local: {
    baseUrl: 'https://mockapi.eolinker.com/AYEP4c43673d509eb94fe3c4debdb5e8f00f98f280b8ae1/',
  },
  dev: {
    baseUrl: 'https://api.cw100.com/web/',
  },
  prod: {
    baseUrl: 'https://mockapi.eolinker.com/AYEP4c43673d509eb94fe3c4debdb5e8f00f98f280b8ae1/',
  }
}

export default {
  ...config['dev'],
  appid,
  Accept: 'application/vnd.package.v4+cus_json',
  //微信formid
  formId: JSON.stringify({
    'ask': 'NwM_KbJ9rAebYLrvxuZSUeSD2SATciE0OixgktG6ZMs', //用户提问进展通知
    'answer': 'yjrsBliac4C-3V8K8YSDrqfXkBlQvv2DLAHChyk8gEc', //问题回复提醒
    'zan': 'N42hVI_PO65t1NTSBXbYmehvV9Lcmb8yUy5BUxpPbhE', //回答被点赞通知
    'comment': 'sCsFdRh_QqFYvkf_d12oVsn7rNfv6tAThBaUnGC_WSY', //收到评论通知	
  }),
  //头条formid
  ttFormId: JSON.stringify({
    'follow': 'MSG1140621474f8a617c61edcf36bfa50327ae5be813907', //关注的问题回答通知
    'answer': 'MSG11406218c77c47987c313b4087b604ebece899913907', //问题回复提醒
  })
}
