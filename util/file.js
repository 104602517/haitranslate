const fs = require('fs')
const path = require('path')

 
const appenFile = function(filePath, data){

        fs.appendFile(filePath,data,function(err){
            if(err) {
                return console.log(err);
            }
        })
     
}


const createFile=  async function(filePath){
    
    fs.writeFile(filePath,'' ,function (err) {
        if(err){
            console.log(err);
        } 
    })

}


const createDir=  async function(filePath){
   
    if(fs.existsSync(filePath)){
        removeDir(filePath)

    }
    fs.mkdirSync(filePath)

}


module.exports = {
    appenFile,
    createDir,
    createFile
}



function removeDir(dir) {
    let files = fs.readdirSync(dir)
    for(var i=0;i<files.length;i++){
      let newPath = path.join(dir,files[i]);
      let stat = fs.statSync(newPath)
      if(stat.isDirectory()){
        //如果是文件夹就递归下去
        removeDir(newPath);
      }else {
       //删除文件
        fs.unlinkSync(newPath);
      }
    }
    fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
  }