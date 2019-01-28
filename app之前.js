const koa = require('koa2');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const axios = require('axios')
//加密
var sha1 = require('sha1')
const app =new koa();
const router = new Router();
const cors = require('koa2-cors')

//bodyparser post 接收参数 转换成对象   这个中间件要放前面
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

// let appID ='wx3df629936bf31f75'

// let appSecret ='036989030fec913af6365b7695ffa918';


// /wx/msg?signature=df82f063f4b01b4e5e3609c1af49c8e2afdcd26f&echostr=5698622490869094111&timestamp=1548599965&nonce=45772539

/**
 * signature 签名
 * 
 * echostr 随机字符串
 * timestamp 时间戳
 * nonce 随机数
 * 
 * appSecret
 * appID
 * token 
 * 
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
        if(this.url.indexOf('MP')>-1){
          this.body = 'DG9ftuBEo1b7YsjS'
        }
        else{
          this.body = 'wrong---'
        }
      }

 */

app.use(require('koa-static')(__dirname+'/public'))
//koa-static 作用 静态目录
//开启node服务后  域名+ index.html   可以直接访问public 下面的静态目录
// ctx.query 获取get 请求方式 ?后面携带的参数 变成对象

app.use(async (ctx, next) => {
  console.log(`请求的URL${ctx.request.url}`)
  console.log('response',ctx.query)
  await next()
})
//路由配置
router.get('/ss',(x,next)=>{
  console.log('----gut')
  x.body = '123'
})
async function  getToken(){
  console.log('寄哪里了')
let appID ='wx3df629936bf31f75'
let appSecret ='036989030fec913af6365b7695ffa918';
let api = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`
let data = await axios.get(api)
console.log('--',data.data)
}
getToken()

router.get('/wx/msg', (ctx,next)=>{
  console.log('----微信发来请求--')
  let getData = ctx.query
  //获取微信 通过get发过来的参数
  let {signature,timestamp,echostr,nonce} = getData
  let token = "sg92322";
  
  let str = [token,timestamp,nonce].sort().join('')
  let sha = sha1(str)
  console.log('--',sha)
  console.log('wx',signature)
  if( sha === signature){
    console.log('是微信发的信息')
    ctx.body = echostr



  }else{
    ctx.body = 'wrong'
    console.log('不认识')
  }
})





// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
router.post('/123',(x,next)=>{
  console.log('---',x.query,x.request.body);
  x.body = '123';
})

app.use(router.routes(),router.allowedMethods())
app.listen(8001,()=>{
  console.log('开启境外~~~')
})
// 建议不要在前端页面 启动
