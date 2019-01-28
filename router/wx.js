const Router = require('koa-router')
const router = new Router();
//加密
var sha1 = require('sha1')

router.get('/msg', (ctx,next)=>{
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
  
  
module.exports = router