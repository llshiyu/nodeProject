/***
 * 深拷贝
 * @param obj
 * @returns {any}
 */
function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}

exports.deepClone = deepClone;