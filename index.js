
const update = require('./util/entry')
const {createFile} = require('./util/file')
const path = require('path')


  
createFile(resolve('lalanew'))

update('lala')


function resolve(fakepath) {
    return path.resolve(__dirname , '.', fakepath)
  }