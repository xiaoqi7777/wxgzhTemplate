
var  Koa = require('koa')
var  wechat = require('./wechat/g')
var config = require('./config')
var reply = require('./wx/reply')
let Router = require('koa-router');
let router = new Router();


var  routerIndex = require('./router/index')
var  routerWxPlay = require('./router/wxplay')
var cors = require('./router/cors')
const path = require('path')
const bodyparser = require('koa-bodyparser')  
const static = require('koa-static')

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
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
  
app.use(static(
  path.join( __dirname,  '/dist')
))

app.use(wechat(config.wechat))
router.use('/user',routerWxPlay.routes())
router.use(routerIndex.routes())

app.use(router.routes(),router.allowedMethods())
console.log('访问地址',path.join( __dirname,  '/dist'))




  app.listen(8001)
  console.log('跑起来了')