// const igoreSymbols = ['!', '！']


// 排除不重要的差异， 如叹号， 空格， \n
const getPureStr = (str) => {
    str = str.trim()
    str = str.replace(/(.*?)([!！]*)$/, '$1')
    str = str.trim()
}


const isSameValueInArr = (arr) => {
    let isSame = true;
    const firstPureStr = getPureStr(arr[0].value)

    if (arr.length > 0) {
       isSame = arr.every((item) => {
           const {  value } = item;
           return getPureStr(value) === firstPureStr
        })
    } 
    
    return isSame
}

module.exports = {
    isSameValueInArr
}