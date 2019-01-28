
const axios = require('axios')
const fs = require('fs')
const path = require('path')
let pathAdress = path.join(__dirname,'../txt.js')
let util = require('./util')

// 获取票据
async function  getToken(){
    console.log('寄哪里了')
  let appID ='wx3df629936bf31f75'
  let appSecret ='036989030fec913af6365b7695ffa918';
  let api = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`
  let data = await axios.get(api)
  data = data.data
  let accessToken = data.access_token
  console.log(accessToken,data)
  let expires = data.expires_in
  util.writeFile(pathAdress,accessToken)
//   console.log('--',data.data)
}

let data ={
    "button":[
    {    
         "type":"click",
         "name":"今日歌曲",
         "key":"V1001_TODAY_MUSIC"
     },
     {
          "name":"菜单",
          "sub_button":[
          {    
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
           },
           {
                "type":"miniprogram",
                "name":"wxa",
                "url":"http://mp.weixin.qq.com",
                "appid":"wx286b93c14bbf93aa",
                "pagepath":"pages/lunar/index"
            },
           {
              "type":"click",
              "name":"赞一下我们",
              "key":"V1001_GOOD"
           }]
      }]
}

// 定义菜单
async function createMenu(){
    let accessToken =await util.readFile(pathAdress)
    console.log('accessToken',accessToken)
    let api = ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`
    let rs = await axios.post(api,data)
    rs = rs.data
    console.log('定义菜单返结果',rs)
}



async function entryFn(){
    await getToken()
    await createMenu()
    
}


module.exports = {
    entryFn
}


