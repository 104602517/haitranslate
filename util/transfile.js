

const handleRow = require('./handleRow')
const getKeyValue = require('./getKeyValue')
 

 function transfile({fileData, fileName, TRANSLATION_ORIGINN_DATA}) {

   // console.log(fileUrl)
   let newData = ''
    

    let preInfo = null;
    let prepreInfo = null;
    let preUnNeedHandleLines = '';
    let newLine = null;
    let line = '';
    let lineInfo = {}

    for(let i =0; i< fileData.length; i++){
      const item = fileData[i];
      line += item

      if(item === '\n' || item === '\r'){
         lineInfo = getKeyValue(line)

          // 如果line是第一行
         if(!preInfo && lineInfo){
            preInfo = lineInfo
         }

         // 如果line是第二行
         if(preInfo && !prepreInfo && lineInfo){
            
            // 处理第一行
            newLine = handleRow({preInfo: {}, handleInfo: preInfo, afterInfo: lineInfo, line, fileName, TRANSLATION_ORIGINN_DATA})
      
            prepreInfo = preInfo
            preInfo = lineInfo
         }

         // 如果是第三行和第三行后面的line
         if(preInfo && prepreInfo && lineInfo){
         
            // 处理前一行
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

         }

         line = ''

      }
    }

    newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: {} , line, fileName, TRANSLATION_ORIGINN_DATA})

    newData += newLine;

    newData += preUnNeedHandleLines;

    return newData;

}

module.exports = transfile;