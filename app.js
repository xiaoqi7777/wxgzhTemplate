
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var path = require('path')
var wechat_file = path.join(__dirname,'/config/wechat.txt')
var util = require('./libs/util')
var reply = require('./wx/reply')
var config = require('./config')

var app = new Koa()

app.use(wechat(config.wechat))

  app.listen(8001)
  console.log('跑起来了')