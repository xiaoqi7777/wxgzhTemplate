const moment = require('moment');
//产生随机数
const randomstring = require('randomstring');
const querystring = require('querystring');
const crypto = require('crypto');
const xmljs = require('xml-js');
const axios = require('axios');
const qrcode = require('qrcode');
const config = require('../config')
const Router = require('koa-router');

let router = new Router()

let appid = 'wx3df629936bf31f75';
let notify_url = config.wxpay.notify_url;
let key = config.wxpay.key
let mch_id = config.wxpay.mch_id;
let unifiedorder = config.wxpay.unifiedorder;
let nonce_str = randomstring.generate(32)
let sign = '' //签名
let body = '商品名称'
let total_fee = '1'
let detail = '商品详情'
let trade_type = 'NATIVE'
let product_id = '007'
let out_trade_no = moment().local().format('YYYYMMDDhhmmss') //商户订单号

let order = {
  appid,
  mch_id,
  out_trade_no,
  body,
  total_fee,
  product_id,
  notify_url,
  nonce_str,
  trade_type
}



/*
xml用法
  var convert = require('xml-js');
  result = convert.js2xml(js, options);     // to convert javascript object to xml text
  result = convert.json2xml(json, options); // to convert json text to xml text
  result = convert.xml2js(xml, options);    // to convert xml text to javascript object
  result = convert.xml2json(xml, options);  // to convert xml text to json text
*/

// 签名算法
function wxSign(order, key) {
  //对参数进行排序  
  let sortedOrder = Object.keys(order).sort().reduce((total, valu) => {
    total[valu] = order[valu]
    return total
  }, {})
  // console.log('排序',sortedOrder)

  /*
    stringify这个方法是将一个对象序列化成一个字符串，与querystring.parse相对。
    参数：obj指需要序列化的对象
　　　separator（可省）用于连接键值对的字符或字符串，默认值为"&";
　　　eq（可省）用于连接键和值的字符或字符串，默认值为"=";
　　　options（可省）传入一个对象，该对象可设置encodeURIComponent这个属性：
　　　  encodeURIComponent:值的类型为function，可以将一个不安全的url字符串转换成百分比的形式，默认值为querystring.escape()。
  */
  //转换成字符串  querystring 和 JSON 那两个方法差不多(一个是处理对象 一个是JSON对象)
  //若是不加后面的参数 会导致结果被转换成百分比的形式
  let stringifiedOrder = querystring.stringify(sortedOrder, null, null, {
    encodeURIComponent: querystring.unescape
  })
  // console.log('被转换成字符串',stringifiedOrder)

  let stringifiedOrderWithKey = `${stringifiedOrder}&key=${key}`
  // console.log('带key的字符串',stringifiedOrderWithKey)
  //计算签名
  let sign = crypto.createHash('md5').update(stringifiedOrderWithKey).digest('hex').toUpperCase();
  return sign
}




router.get('/wx', async (x, next) => {
  //获取签名
  sign =  wxSign(order, key)
  //转换成 xml 格式
  let xmlOrder = xmljs.js2xml({
    xml: { 
      ...order,
      sign
      }
    },{
      compact: true
    })
  // console.log('xml',xmlOrder)

  //请求统一下单接口 (2个参数 发送地址 xml格式的订单)
  let unifiedorderResponse  = await axios.post(unifiedorder, xmlOrder);
  //响应的 数据是一个xml格式的
  console.log('统一下单影响',unifiedorderResponse)
  
  let _prepay = xmljs.xml2js(unifiedorderResponse.data, {
    compact: true,
    cdataKey: 'value',
    textKey:'value'
  }) 
  console.log('将获取的xml数据转换成js对象',_prepay)


  x.body = '123'
})
module.exports = router