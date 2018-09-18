
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var config = require('./config')
var reply = require('./wx/reply')
var app = new Koa()

app.use(wechat(config.wechat))

  app.listen(8001)
  console.log('跑起来了')