const fs = require('fs')

 
const appenFile = function(filePath, data){

    if(!fs.existsSync(filePath)){

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

const createFile =  async function(filePath){
   
    if(!fs.existsSync(filePath)){

        fs.mkdirSync(filePath)

    }
}


module.exports = {
    appenFile,
    createFile
}