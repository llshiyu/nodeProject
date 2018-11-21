var operationFile = require('./operationFile');
var util = require('./util');


function getResData(callback) {
    operationFile.readFile((res, code, data) => {
        if (code === 0) {
            callback(data) // 存取json文件
        }
    });
}

function getNameIndex(res, callback) {
    getResData((d) => {
        let data = util.deepClone(d);
        let t = -1;
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].username === res.username) {
                t = i;
            }
        }
        callback(data, d, t)
    })
}

/***
 * 添加
 * @param res
 * @param callback
 */
function addData(res, callback) {
    getNameIndex(res, (data, d, t) => {
        if (t === -1) {
            data.data.push(res);//将传来的对象push进数组对象中
            data.total = data.data.length;//定义一下总条数，为以后的分页打基础
            let str = JSON.stringify(data);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            operationFile.writeFile(str, callback);
        } else {
            callback('用户名已存在', 200002)
        }
    })
}

/***
 * 删除--根据name删除
 * @param res
 * @param callback
 */
function delData(res, callback) {
    getNameIndex(res, (data, d, t) => {
        if (t !== -1) {
            data.data.splice(t, 1);
            data.total = data.data.length;
            let str = JSON.stringify(data);
            operationFile.writeFile(str, callback);
        } else {
            callback('没找到', 200005);
        }
    });
}


/***
 * 查询--根据name查询
 * @param res
 * @param callback
 */
function selectData(res, callback) {
    getNameIndex(res, (data, d, t) => {
        if (!res.username) {
            callback('success', 0, d);
            return
        }
        if (t !== -1) {
            let newData = data.data.slice(t, t + 1);
            data.data = newData;
            data.total = data.data.length;
            callback('success', 0, data)
        } else {
            callback('没找到', 200005);
        }
    });
}

/***
 * 修改--根据name修改pwd
 * @param res
 * @param callback
 */
function updateData(res, callback) {
    getNameIndex(res, (data, d, t) => {
        if (t !== -1) {
            data.data[t].password = res.password;
            let str = JSON.stringify(data);
            operationFile.writeFile(str, callback)
        } else {
            callback('没找到', 200005)
        }
    });
}

exports.addData = addData;
exports.delData = delData;
exports.selectData = selectData;
exports.updateData = updateData;