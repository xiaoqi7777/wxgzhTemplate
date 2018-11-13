const Router = require('koa-router');

let router= new Router()

router.get('/wx',async (x,next)=>{
  x.body = '123'
})
module.exports = router
