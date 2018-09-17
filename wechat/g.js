
var sha1 = require('sha1')
var Wechat = require('./wechat')



module.exports = function(config){
  var wechat = new Wechat(config)
  
  
  return function *(next) {
    console.log('.',this.query)
    let token = config.token
    let signature = this.query.signature
    let nonce = this.query.nonce
    let timestamp = this.query.timestamp
    let echostr = this.query.echostr
  
    var str = [token,timestamp,nonce].sort().join('')
    var sha = sha1(str)
  
    if(sha === signature){
      this.body = echostr
    }else{
      this.body = 'wrong---'
    }
  }
}
