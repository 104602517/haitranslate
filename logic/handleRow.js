
const {appenFile} = require('../util/file.js')

 


module.exports = function handleRow({handleInfo, preInfo, afterInfo, line, fileName, TRANSLATION_ORIGINN_DATA}){
    let newLine = null;
    let newInfo = null;
    let matchedResults = []
    let PreMatches = []
    let preAfterMatches = []

    TRANSLATION_ORIGINN_DATA = [...TRANSLATION_ORIGINN_DATA]

    
    console.log(handleInfo)
    matchedResults = TRANSLATION_ORIGINN_DATA.filter((translation) =>  {
        const res = translation.key === handleInfo && handleInfo.key

        return res;
    })
    if(matchedResults.length > 1){


        PreMatches = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>   {
            const preTranslation = TRANSLATION_ORIGINN_DATA[index -1] ||{}
            return translation.key === handleInfo.key && preTranslation.key === preInfo && preInfo.key
        })

        
        if(PreMatches.length){
            console.log('PreMatches', PreMatches.length)

        }

         if(PreMatches.length > 1){

          
            preAfterMatches = TRANSLATION_ORIGINN_DATA.filter( (translation, index) =>
         {
            const preTranslation = TRANSLATION_ORIGINN_DATA[index -1] ||{}
            const afterTranslation =  TRANSLATION_ORIGINN_DATA[index +1] ||{}
            return translation.key === handleInfo.key && preTranslation.key ===  preInfo && preInfo.key
            && afterTranslation.key === afterInfo && afterInfo.key
         }
             )

             if(preAfterMatches.length === 1){
                 newInfo = preAfterMatches[0]
             }else{
                   
                    
                // 如果找不到或者有多个写入到文件夹
                if(line){
                    appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

                }

                     
             }
   
         }else if(preAfterMatches.length === 1){
            console.log('pre')
             newInfo = PreMatches[0]
         }else{
             // 如果找不到或者有多个写入到文件夹
             if(line){
                appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

            }

         }

    }
    else if(matchedResults.length === 1) {
        console.log('matchedResults')

        newInfo = matchedResults[0]
    }else{
   // 如果找不到或者有多个写入到文件夹
   if(line){
     appenFile('./nonMacthes.js', line + ' \\\\' + fileName  + ' \n  ',)

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