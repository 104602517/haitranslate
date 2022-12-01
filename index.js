
const update = require('./logic/entry')
const {createFile,createDir} = require('./util/file')
const path = require('path')


  
createDir(resolve('lalanew'))
createFile(resolve('noMatch.js'))

update('lala')


function resolve(fakepath) {
    return path.resolve(__dirname , '.', fakepath)
  }