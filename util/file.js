const fs = require('fs')

const { promises } = require('fs');
/**
 * 文件/目录是否存在
 * @param filePath 文件路径
 * @returns {Promise<boolean>} true:存在;false:不存在
 */
const exists = async filePath => await promises.access(filePath).then(() => true).catch(_ => false)

const appenFile = function(filePath, data){

    if(exists(filePath)){
        fs.appendFile(filePath,data,function(err){
            if(err) {
                return console.log(err);
            }
        })
    }else{
        fs.writeFile(filePath,data,{flag:"a"},function (err) {
            if(err){
                console.log(err);
            }else {
                console.log("写入成功");
            }
        })
    }
  
}


module.exports = {
    exists,
    appenFile
}