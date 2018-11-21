var fs = require('fs');

/***
 * 读取json文件
 */
function readFile(callback) {
    fs.readFile('./login.json', 'utf-8', function (err, data) {
        if (err) {
            console.log('readDataJson err', err)
        } else {
            let p = data.toString();//将二进制的数据转换为字符串
            // global.resData = JSON.parse(p);//将字符串转换为json对象
            let resData = JSON.parse(p);//将字符串转换为json对象
            if (callback) {
                callback('succ', 0, resData);
            }
        }
    });
}

/***
 * 写入json文件
 * @param str 要写入的内容
 * @param callback 成功后callback
 */
function writeFile(str, callback) {
    fs.writeFile('./login.json', str, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('----------变化成功-------------');
        // callback();
        readFile(callback);
    });
}

exports.readFile = readFile;
exports.writeFile = writeFile;
// exports.resData = resData;

