

const handleRow = require('./handleRow')
const getKeyValue = require('../util/getKeyValue')
 

 function transfile({fileData, fileName, TRANSLATION_ORIGINN_DATA}) {

    let newData = ''
    let preInfo = null;
    let prepreInfo = null;
    let preUnNeedHandleLines = '';
    let newLine = '';
    let line = '';
    let lineInfo = {}
    let lastLine = ''

    for(let i =0; i< fileData.length; i++){
      const item = fileData[i];

      if(item === '\n' || item === '\r'){
         lineInfo = getKeyValue(line)
 

         const one = prepreInfo && prepreInfo.key === "qingXuanZeJueSe";
         const tow = lineInfo && lineInfo.key === "qingXuanZeDaiLi"

         if (one && tow) {
            console.log('hahha')
         }

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
         } else {
            
            if(newLine){
               newData += '    ' + newLine;
            }
            newData += preUnNeedHandleLines;

            newLine = '';
            preUnNeedHandleLines = '';
            lastLine = line

         }

         line = ''

      }else{
       line += item
      }
    }

    if(preInfo){
      newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: {} , line:lastLine, fileName, TRANSLATION_ORIGINN_DATA})
    }

    if(newLine){
         newData += '    ' + newLine;

    }

    if(preUnNeedHandleLines){
      newData += preUnNeedHandleLines;
    }

    return newData;

}

module.exports = transfile;