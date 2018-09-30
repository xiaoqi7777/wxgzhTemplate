
var sha1 = require('sha1')
var Wechat = require('./wechat')
var getRweBody = require('raw-body')


module.exports = function(config){
  var wechat = new Wechat(config)
  
  return function *(next) {
    let that = this
    let token = config.token
    let signature = this.query.signature
    let nonce = this.query.nonce
    let timestamp = this.query.timestamp
    let echostr = this.query.echostr
  
    var str = [token,timestamp,nonce].sort().join('')
    var sha = sha1(str)
  if(this.method === 'GET'){
      if(sha === signature){
        this.body = echostr
      }else{
        if(this.url.indexOf('MP')>-1){
          this.body = 'DG9ftuBEo1b7YsjS'
        }else if(this.url.indexOf('index')>-1){
          console.log('返回静态首页')
        }else{
          this.body = 'wrong---'
        }
      }
    }else if(this.method === 'POST'){
      if(sha !== signature){
        this.body = 'wrong---'
      }else{
        var data = yield getRweBody(that.req,{
          length : that.length,
          limit : '1mb',
          encoding : that.charset
        })
        console.log('data',data.toString())
      }
    }
    yield next
  }
}
