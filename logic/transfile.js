

const handleRow = require('./handleRow')
const getKeyValue = require('../util/getKeyValue')
 

 function transfile({fileData, fileName, TRANSLATION_ORIGINN_DATA}) {

    let newData = ''
    let preInfo = null;
    let prepreInfo = null;
    let preUnNeedHandleLines = '';
    let newLine = null;
    let line = '';
    let lineInfo = {}
    let lastLine = ''

    for(let i =0; i< fileData.length; i++){
      const item = fileData[i];

      if(item === '\n' || item === '\r'){
         lineInfo = getKeyValue(line)

          // 读到第一行
         if(!preInfo && lineInfo){
            preInfo = lineInfo
         }else if(preInfo && !prepreInfo && lineInfo){
            //读到第二行 处理第一行
            newLine = handleRow({preInfo: {}, handleInfo: preInfo, afterInfo: lineInfo, line, fileName, TRANSLATION_ORIGINN_DATA})
      
            prepreInfo = preInfo
            preInfo = lineInfo
         }else  if(preInfo && prepreInfo && lineInfo){
             // 读到后面  处理前一行
            newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: lineInfo , line, fileName, TRANSLATION_ORIGINN_DATA})
            
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
            lastLine = line

         }

         line = ''

      }else{
       line += item
      }
    }

    newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: {} , line:lastLine, fileName, TRANSLATION_ORIGINN_DATA})

    newData += newLine;

    newData += preUnNeedHandleLines;

    return newData;

}

module.exports = transfile;