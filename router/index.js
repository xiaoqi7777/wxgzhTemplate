const Router = require('koa-router');

let router= new Router()

router.get('/',(x,next)=>{
  x.body = '123'
})











module.exports = router