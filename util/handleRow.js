
const {appenFile} = require('./file.js')

function keyQquuals({TRANSLATION_ORIGINN_DATA,handleInfo, preInfo, afterInfo}){

    return {
        isEqualHandleKey: function(index){
            // console.log(TRANSLATION_ORIGINN_DATA[index], handleInfo.key)

            if(!handleInfo) return false

            return  TRANSLATION_ORIGINN_DATA[index] && TRANSLATION_ORIGINN_DATA[index].key === handleInfo.key
        },
        isEqualPreKey: function(index){
            if(!preInfo) return false
            return  TRANSLATION_ORIGINN_DATA[index] && TRANSLATION_ORIGINN_DATA[index].key ===  preInfo.key
        },
        isEqualAfterKey: function(index){
            if(!afterInfo) return false

            return  TRANSLATION_ORIGINN_DATA[index] && TRANSLATION_ORIGINN_DATA[index].key === afterInfo.key
        }
    }
}


module.exports = function handleRow({handleInfo, preInfo, afterInfo, line, fileName, TRANSLATION_ORIGINN_DATA}){

    let newLine = null;
    let newInfo = null;
    let matchedResults = []
    let PreMatches = []
    let preAfterMatches = []


    const keyQquualFn =  keyQquuals({TRANSLATION_ORIGINN_DATA,handleInfo, preInfo, afterInfo})

    matchedResults = TRANSLATION_ORIGINN_DATA.filter((translation,index) => keyQquualFn.isEqualHandleKey(index))

    // console.log(matchedResults)
    if(matchedResults.length > 1){
        PreMatches = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>  keyQquualFn.isEqualPreKey(index-1) && keyQquualFn.isEqualHandleKey(index))

         if(PreMatches.length > 1){
            preAfterMatches = TRANSLATION_ORIGINN_DATA.filter( (translation, index) =>
              keyQquualFn.isEqualPreKey(index-1)
             && keyQquualFn.isEqualHandleKey(index)
             && keyQquualFn.isEqualAfterKey(index+1)
             )

             if(preAfterMatches.length === 1){
                 newInfo = preAfterMatches[0]
             }else{
                    // 这种情况极少， 不做替换
                    
    
                     // 写入到文件夹
                 appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

                     
             }
   
         }else if(preAfterMatches.length === 1){
             newInfo = PreMatches[0]
         }else{
            // 写入到文件夹
             appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

         }

    }
    else if(matchedResults.length === 1) {
        newInfo = matchedResults[0]
    }else{

        // 写入到文件夹
        appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

    }
   
    // 组合newLine
    if(newInfo){
        newLine = newInfo.key + ': "' + newInfo.value + '", \n'
    }


    // console.log("newline" ,newLine)

    return newLine;

}