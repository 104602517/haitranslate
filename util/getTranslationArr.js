const fs = require('fs')
const translationData = fs.readFileSync("translation.js","utf-8");  
const getKeyValue = require('./getKeyValue')

module.exports = function(){
    const rows = translationData.split(/[\r\n]/g)
    const translationArray = []

    for(let i = 0; i<rows.length; i++){
        const curRow = rows[i]
        const matches = getKeyValue(curRow)

        if(matches){
            translationArray.push(matches)
        }
         
    }


    return translationArray
    
    
}