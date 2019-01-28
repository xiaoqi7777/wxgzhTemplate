const Router = require('koa-router')
const router = new Router();
//加密
var sha1 = require('sha1')

router.get('/index', (ctx,next)=>{
    console.log('----微信发来请求--')
    

    ctx.body = 'vue'
  })
  
  
module.exports = router