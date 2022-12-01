
const {appenFile} = require('../util/file.js')

 const noMatchPath = './noMatch.js'
 

 function createEqualFns({handleInfo, preInfo, afterInfo,TRANSLATION_ORIGINN_DATA}){
    const equalCur = (index)=> {
        const curInfo = TRANSLATION_ORIGINN_DATA[index] || {}
        handleInfo = handleInfo || {}
        return  curInfo.key === handleInfo.key
    }

    const equalPre = (index)=> {
        const curInfo = TRANSLATION_ORIGINN_DATA[index] || {}
        preInfo = preInfo || {}
        return  curInfo.key === preInfo.key
    }

    const equalAfter = (index)=> {
        const curInfo = TRANSLATION_ORIGINN_DATA[index] || {}
        afterInfo = afterInfo || {}
        return  curInfo.key === afterInfo.key
    }

    return {
        equalCur,
        equalPre,
        equalAfter
    }

 }

module.exports = function handleRow({handleInfo, preInfo, afterInfo, line, fileName, TRANSLATION_ORIGINN_DATA}){
    let newLine = null;
    let newInfo = null;
    let matchedResults = []
    let PreMatches = []
     let afterMatches = []
    let preAfterMatches = []


    TRANSLATION_ORIGINN_DATA = [...TRANSLATION_ORIGINN_DATA]

    const { equalCur,
        equalPre,
        equalAfter} = createEqualFns({handleInfo, preInfo, afterInfo,TRANSLATION_ORIGINN_DATA}) 

    
    matchedResults = TRANSLATION_ORIGINN_DATA.filter((translation,index) =>  equalCur(index))

    if(matchedResults.length > 1){

        PreMatches = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>  equalCur(index) && equalPre(index-1))

         if(PreMatches.length > 1){
            // 对比前后
            preAfterMatches = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>  equalCur(index) && equalPre(index-1) && equalAfter(index+1))
           
            if(preAfterMatches.length ===1 ){
             newInfo = preAfterMatches[0]
            }else{
                appenFile(noMatchPath, line + ' \\\\' + fileName  + ' \n  ')

            }

         }else if(preAfterMatches.length === 1){
             newInfo = PreMatches[0]
         }else{
              // 对比后面
              afterMatches = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>  equalCur(index) && equalAfter(index+1))

              if(afterMatches.length === 1){
                 newInfo = afterMatches[0]
              }else{
                appenFile(noMatchPath, line + ' \\\\' + fileName  + ' \n  ')
              }
         }

    }
    else if(matchedResults.length === 1) {
        console.log('matchedResults')

        newInfo = matchedResults[0]
    }else{
        // 如果找不到或者有多个写入到文件夹
        if(line){
            appenFile(noMatchPath, line + ' \\\\' + fileName  + ' \n  ')

        }
    }
   
    // 组合newLine
    if(newInfo){
        newLine = newInfo.key + ': "' + newInfo.value + '", \n'
    }else{
        newLine = line + '\n'
    }


    // console.log("newline" ,newLine)

    return newLine;

}