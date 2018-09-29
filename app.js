
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var config = require('./config')
var reply = require('./wx/reply')
var  router = require('./router/index')
var cors = require('./router/cors')
const bodyparser = require('koa-bodyparser')  


var app = new Koa()




// app.use(function *(next){
//   if(this.url.indexOf('/movie')>-1){
//     this.body = '<h1>----1---</h1>'

//     return next
//   }
//   yield next
// })



	//跨域配置
	app.use(cors)


app.use(wechat(config.wechat))

app.use(router.routes(),router.allowedMethods())

app.use(require('koa-static')(__dirname+'/public'))
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


  app.listen(8071)
  console.log('跑起来了')