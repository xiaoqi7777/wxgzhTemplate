const Router = require('koa-router')
const router = new Router();
//加密
const sha1 = require('sha1')
const xmljs = require('xml-js');
const wxpay = require('./wxpay') 
//回复
const wechat = require('../wechat')

var getRweBody = require('raw-body')


router.use(wxpay.routes())

let token = "sg92322";

function signatureFn(getData) {
  let {
    signature,
    timestamp,
    echostr,
    nonce
  } = getData

  let str = [token, timestamp, nonce].sort().join('')
  let sha = sha1(str)
  return {
    sha,
    signature,
    echostr
  }
}

router.get('/msg', async (ctx, next) => {
  console.log('----微信发来请求--')
  let getData = ctx.query
  //获取微信 通过get发过来的参数
  // 抽离 签名
  getData = signatureFn(getData)

  if (getData.sha === getData.signature) {
    console.log('是微信发的信息')
    ctx.body = getData.echostr
  } else {
    ctx.body = 'wrong'
    console.log('不认识')
  }
  await next()
})

function transformXmlFn(data) {

  let xml = data.xml
  let obj = {}
  for (let x in xml) {
    obj[x] = xml[x].value
  }
  return obj
}

function parseXML(ctx) {
  // // 获取微信发过来的消息
  // let xml = await getRweBody(ctx.req, {
  //   length: ctx.request.length,
  //   limit: '1mb',
  //   encoding: ctx.request.charset || 'utf-8'
  // })
  return new Promise(function (resolve, reject) {
    let buffers = [];
    ctx.req.on('data', function (data) {
      buffers.push(data);
    });
    ctx.req.on('end', function () {
      // let ret = Buffer.concat(buffers);
      let ret = buffers
      resolve(ret.toString());
    });
  });
}

router.post('/msg', async (ctx, next) => {
  console.log('----微信发来请求--')
  let getData = ctx.query
  //获取微信 通过get发过来的参数
  // 抽离 签名
  getData = signatureFn(getData)
  if (getData.sha === getData.signature) {
    // 是微信提交过来的
    let xml = await parseXML(ctx)

    // textKey 和 cdataKey 配置 是为了获取的结果里面的key是转换成value 
    var options = {
      compact: true,
      textKey: 'value',
      cdataKey: 'value',
    };
    //转xml
    let data = xmljs.xml2js(xml, options)
    //转正常用的对象
    data = transformXmlFn(data)
    console.log('data',data)
    //回复处理
    wechat.reply(ctx,data)
 

  } else {
    ctx.body = 'wrong'
    console.log('不认识')
  }

  await next()
})

// ticket
// noncestr
// timestamp
// url

module.exports = router