
const update = require('./logic/entry')
const {createFile,createDir} = require('./util/file')
const path = require('path')


  
createDir(resolve('zh-CN-new'))
createFile(resolve('noMatch.js'))

update('zh-CN')


function resolve(fakepath) {
    return path.resolve(__dirname , '.', fakepath)
  }