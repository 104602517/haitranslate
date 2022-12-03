// const igoreSymbols = ['!', '！']


// 排除不重要的差异， 如叹号 
const getPureStr = (str) => {
    str = str.replace(/(.*?)([!！]*)$/, '$1')

    return str
}

const isSimpleKey = (key) => {
    const simpleKeys = ['quXiao', 'queDing']
    
    return simpleKeys.includes(key)
}

const isSameValueInArr = (arr) => {
    if(!arr.length) return false

    let isSame = true;
    const firstPureStr = getPureStr(arr[0].value)

    if (arr.length > 0) {
       isSame = arr.every((item) => {
           const { key, value } = item;

           if (isSimpleKey(key)) {
               return true
           }
           return getPureStr(value) === firstPureStr
        })
    } 
    
    return isSame
}

module.exports = {
    isSameValueInArr
}