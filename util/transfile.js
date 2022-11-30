
const  fs = require('fs');
const readline = require('readline');
const events = require('events');
const handleRow = require('./handleRow')
const getKeyValue = require('./getKeyValue')
 

async function transfile({fileUrl, fileName, TRANSLATION_ORIGINN_DATA}) {

   // console.log(fileUrl)
   let newData = ''
   const rl = readline.createInterface({
      input: fs.createReadStream(fileUrl),
      crlfDelay: Infinity
    });

    let preInfo = null;
    let prepreInfo = null;
    let preUnNeedHandleLines = '';
    let newLine = null;

    rl.on('line', (line) => {

      const lineInfo = getKeyValue(line)

      // console.log("lineInfo", lineInfo)
      // 如果line是第一行
      if(!preInfo && lineInfo){
         preInfo = lineInfo
      }

      // 如果line是第二行
      if(preInfo && !prepreInfo){
         
         // 处理第一行
         newLine = handleRow({handleInfo: preInfo, afterInfo: lineInfo, fileName, TRANSLATION_ORIGINN_DATA})
   
         // 重置
         prepreInfo = preInfo
         preInfo = lineInfo
      }

      // 如果是第三行和第三行后面的line
      if(preInfo && prepreInfo){
        
         // 处理前一行
         newLine = handleRow({handleInfo: preInfo, preLine: prepreInfo, afterLine: lineInfo , fileName, TRANSLATION_ORIGINN_DATA})
         
         //重置
         prepreInfo = preInfo
         preInfo = lineInfo;
      }

      // 如果当前行不是 key:value, 缓存起来
      if(!lineInfo){
         line = line + '\n'
         preUnNeedHandleLines += line
      }else{
         newData += preUnNeedHandleLines;

         newData += newLine;
         newLine = '';
         
         preUnNeedHandleLines = '';

      }

    });


    await events.once(rl, 'close');

 
      if(preInfo){
         // 处理最后一行
         newLine = handleRow({handleInfo: preInfo, preLine: prepreInfo, afterLine: {} , fileName, TRANSLATION_ORIGINN_DATA})
          newData += newLine;
         newLine = '';
      }
   
   
       // 处理结尾
       if(preUnNeedHandleLines){
         newData += preUnNeedHandleLines;
         preUnNeedHandleLines = ''
       }

    return newData;

}




module.exports = transfile;