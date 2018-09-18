
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var config = require('./config')
var reply = require('./wx/reply')
var  router = require('./router/index')
var cors = require('./router/cors')


var app = new Koa()

	//跨域配置
	app.use(cors)



app.use(wechat(config.wechat))

app.use(router.routes(),router.allowedMethods())




  app.listen(8001)
  console.log('跑起来了')