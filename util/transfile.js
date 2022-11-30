
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
    let otherLines = '';
    let newLine = null;

    rl.on('line', (line) => {

      const lineInfo = getKeyValue(line)

      // console.log("lineInfo", lineInfo)
      // 如果line是第一行
      if(!preInfo){
         preInfo = getKeyValue(line)
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
         otherLines += line
      }else{
         newData += newLine;
         newData += otherLines;
         newLine = null;
      }

    });

    await events.once(rl, 'close');

    return newData;

}




module.exports = transfile;