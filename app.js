var  Koa = require('koa')

var sha1 = require('sha1')

var config = {
  wechat:{
    appID : 'wx3df629936bf31f75',
    appSecret : '036989030fec913af6365b7695ffa918',
    token : 'sg92322',
  }
}

var app = new Koa()

app.use(function *(next) {
  console.log('.',this.query)
  let token = config.token
  let signature = this.query.signature
  let nonce = this.query.nonce
  let timestamp = this.query.timestamp
  let ecostr = this.query.ecostr

  var str = [token,timestamp,nonce].sort().join('')
  var sha = sha1(str)

  if(sha === signature){
    this.body = ecostr
  }else{
    this.body = 'wrong---'
  }
})

  app.listen(8001)
  console.log('跑起来了')