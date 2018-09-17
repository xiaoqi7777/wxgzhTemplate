
var fs = require('fs')
 
exports.readFileAsync = function(fpath,encodnig){
  return new Promise((resolve,reject)=>{
      fs.readFile(fpath,encodnig,function(err,content){
        if(err) reject(err)
        else{
          content = JSON.parse(content)
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