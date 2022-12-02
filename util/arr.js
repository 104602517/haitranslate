
const isSameValueInArr = (arr) => {
    let isSame = true;

    if (arr.length > 0) {
       isSame = arr.every((item) => {
           const {  value } = item;
           return value === arr[0].value
        })
    } 
    
    return isSame
}

module.exports = {
    isSameValueInArr
}