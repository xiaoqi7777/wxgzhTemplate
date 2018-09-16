
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var config = {
  wechat:{
    appID : 'wx3df629936bf31f75',
    appSecret : '036989030fec913af6365b7695ffa918',
    token : 'sg92322',
  }
}

var app = new Koa()

app.use(wechat(config.wechat))

  app.listen(8001)
  console.log('跑起来了')