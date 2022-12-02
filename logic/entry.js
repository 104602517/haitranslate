const path = require('path')
const fs = require('fs')

// 读取到翻译的数据源
const TRANSLATION_ORIGINN_DATA = require('../util/getTranslationArr')();  
 
// 具体转换
const transfile = require('./transfile')


function resolve(fakepath) {
  return path.resolve(__dirname , '..', fakepath)
}

function update(rootpath) {
    
    fs.readdir(resolve(rootpath), 'utf8', function(err, dirList) {

    if (err) {
      throw err
    }
    dirList.forEach(function(fileName) {
      const curFileUrl = resolve(`${rootpath}/${fileName}`);
      const newFileUrl = resolve(`${rootpath}-new/${fileName}`);


      let stats = fs.statSync(curFileUrl)

      if (stats.isDirectory()) {
     
        update(`${rootpath}/${fileName}`)
      } else {
        
        fs.readFile(curFileUrl, 'utf8',  function(err, file) {
          if (err) {
            throw err
          }
          let newFile = ''

          newFile =  transfile({fileData:file, fileName, TRANSLATION_ORIGINN_DATA})
      
          // 直接替换
          if (newFile) {
            fs.writeFile(newFileUrl, newFile, 'utf8', function(err) {
              if (err) {
                console.log(err)
                throw err
              }
            })
          }
        })
      }
    })
  })
}

module.exports = update;

