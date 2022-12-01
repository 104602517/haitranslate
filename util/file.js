const fs = require('fs')
const path = require('path')

 
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
   
    if(fs.existsSync(filePath)){
        removeDir(filePath)

    }
    fs.mkdirSync(filePath)

}


module.exports = {
    appenFile,
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