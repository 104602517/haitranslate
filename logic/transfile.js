

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
    // 上一行如果是 key:value 存储到lastline中
    let lastLine = ''
    const multiLineStartReg = /(.*):[\s\n\r]*$/
     
    /**
     * 存储key,value在两行的情况， 如
     *     dianJiDaoRuHou:
      '点击“导入”后，系统将自动执行，请确认文件是否正确，确认后请点击导入。',
     */
    let multiLineStart = ''

    for(let i =0; i< fileData.length; i++){
      const item = fileData[i];

       if (item === '\n' || item === '\r') {
          if (multiLineStart) {
             line = multiLineStart + line
             multiLineStart = ''
         }
          
         lineInfo = getKeyValue(line)
 
         if (multiLineStartReg.test(line)) {
            multiLineStart = line
         }

          // 读到第一行
         if(!preInfo && lineInfo){
            preInfo = lineInfo
         }else if(preInfo && !prepreInfo && lineInfo){
            //读到第二行 处理第一行
            newLine = handleRow({preInfo: {}, handleInfo: preInfo, afterInfo: lineInfo, line: lastLine, fileName, TRANSLATION_ORIGINN_DATA})
      
            prepreInfo = preInfo
            preInfo = lineInfo
         }else  if(preInfo && prepreInfo && lineInfo){
             // 读到后面  处理前一行
            newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: lineInfo , line: lastLine, fileName, TRANSLATION_ORIGINN_DATA})
            
            prepreInfo = preInfo
            preInfo = lineInfo;
         }

          if (multiLineStart) {
           
          }
          else if (!lineInfo) {
          // 如果当前行不是 key:value, 缓存起来
             
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

    // 处理最后一个key,value
    if(preInfo){
      newLine = handleRow({handleInfo: preInfo, preInfo: prepreInfo, afterInfo: {} , line:lastLine, fileName, TRANSLATION_ORIGINN_DATA})
    }

    if(newLine){
         newData += '    ' + newLine;
    }

    if(preUnNeedHandleLines){
       newData += preUnNeedHandleLines;
       
       //最后一行
      newData += line;
    }

    return newData;

}

module.exports = transfile;