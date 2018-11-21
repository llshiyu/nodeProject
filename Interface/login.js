var operationFile = require('./operationFile');
var util = require('./util');

var resData;
// operationFile.readFile((res, code, data) => {
//     if (code === 0) {
//         resData = data; // 存取json文件
//     }
// }); // 先读文件，方便之后查询

/***
 * 注册用户
 * @param res
 * @param callback
 */
function addUser(res, callback) {
    let data = util.deepClone(resData);
    let addI = -1;
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].username === res.username) {
            addI = i;
        }
    }
    if (addI === -1) {
        data.data.push(res);//将传来的对象push进数组对象中
        console.log('in', data.data, 'end');
        let str = JSON.stringify(data);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        operationFile.writeFile(str, callback);
    } else {
        callback('用户名已存在', 200002);
    }
}

/***
 * 登录--查询用户名 密码  是否一致
 * @param res
 * @param callback
 */
function selectUser(res, callback) {
    let data = util.deepClone(resData);
    let selI = -1;
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].username == res.username) {
            selI = i;
        }
    }
    if (selI !== -1) {
        if (data.data[selI].password === res.password) {
            callback('success', 0)
        } else {
            callback('密码不正确', 200001)
        }
    } else {
        callback('用户不存在', 200000);
    }
}


exports.addUser = addUser;
exports.selectUser = selectUser;