const koa = require('koa2');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const router = new Router();
const cors = require('koa2-cors')

const app =new koa();

const routerWx = require('./router/wx')
const routerVue = require('./router/vue')
const wx = require('./wx')

wx.entryFn()


// bodyparser post 接收参数 转换成对象   这个中间件要放前面
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(cors({
  origin: function (ctx) {
          return "*"; // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(require('koa-static')(__dirname+'/public'))






app.use(async (ctx, next) => {
  console.log(`请求的URL${ctx.request.url}`)
  console.log('response',ctx.query)
  await next()
})





router.use('/wx',routerWx.routes())
router.use('/vue',routerVue.routes())



app.use(router.routes(),router.allowedMethods())
app.listen(8001,()=>{
  console.log('开启境外~~~')
})
// 建议不要在前端页面 启动
