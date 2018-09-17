
var path = require('path')
var wechat_file = path.join(__dirname,'/config/wechat.txt')
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
    }
  }
}

module.exports = config