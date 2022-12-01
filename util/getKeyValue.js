
module.exports = function(str){
    const matches = str.match(/([^\s]+):\s+[\'\"](.+)[\'\"].*/)

    if(matches){

        const key = matches[1].replace(/\s*(.+)\s*/g, '$1')
        const value = matches[2]

        return {
            key, value
        }
    }

    return null
   
}