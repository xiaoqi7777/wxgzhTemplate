var path = require('path')
var wechat_file = path.join(__dirname,'/config/wechat.txt')
var wechat_sdk = path.join(__dirname,'/config/sdk.txt')
var util = require('./libs/util')
var config = {
  wechat:{
    appID : 'wx3df629936bf31f75',
    appSecret : '036989030fec913af6365b7695ffa918',
    token : 'sg92322',
    getAccessToken :function(){
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken :function(data){
      data = JSON.stringify(data) 
      return util.writeFileAsync(wechat_file,data)
    },
    getTicket :function(){
      return util.readFileAsync(wechat_sdk)
    },
    saveTicket :function(data){
      data = JSON.stringify(data) 
      return util.writeFileAsync(wechat_sdk,data)
    },
  },
  wxpay:{
    appid: 'wx3df629936bf31f75',
    mch_id: '1511047841',
    key: 'gmklNxpgLPCQrOxji2HzIThpAfiyIVx7 ',
    notify_url: 'http://tsml520.cn/',
    unifiedorder:'https://api.mch.weixin.qq.com/pay/unifiedorder'
  }
}
module.exports = config