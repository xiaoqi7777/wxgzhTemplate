
var fs = require('fs')
 
exports.readFileAsync = function(fpath,encodnig){
  return new Promise((resolve,reject)=>{
      fs.readFile(fpath,encodnig,function(err,content){
        if(err) reject(err)
        else{
          // 返回的是 读取的流  需要转换成 字符串 在转换成对象
          resolve(content)
        } 
      })
  })
}

exports.writeFileAsync = function(fpath,content){
  return new Promise((resolve,reject)=>{ 
      fs.writeFile(fpath,content,function(err){
        if(err) reject(err)
        else resolve(content)
      })
  })
}