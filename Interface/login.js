//express_demo.js 文件
var express = require('express');
var fs = require('fs');

var bodyParser = require('body-parser'); //npm body-parser 这是一个解析数据的中间件

var app = express();

// 解析post传参的
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 跨域的
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


var resData = ''; // 存取json文件
readFile();

/***
 * 读取json文件
 */
function readFile(callback) {
    fs.readFile('./login.json', 'utf-8', function (err, data) {
        if (err) {
            console.log('readDataJson err', err)
        } else {
            let p = data.toString();//将二进制的数据转换为字符串
            resData = JSON.parse(p);//将字符串转换为json对象
            console.log('resData', resData);
            if (callback) {
                callback('succ', 0);
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

app.post('/register', function (req, res) {
    console.log(req.body, 888);
    if (req.body.username && req.body.password) {
        addUser(req.body, function (msg, code) {
            let d = {data: {}, meta: {code: code, message: msg}};
            res.end(JSON.stringify(d));
        })
    } else {
        let d = {data: {}, meta: {code: 200006, message: '所有字段必须有值'}};
        res.end(JSON.stringify(d));
    }
});

/***
 * 注册用户
 * @param res
 * @param callback
 */
function addUser(res, callback) {
    let data = resData;
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
        writeFile(str, callback);
    } else {
        callback('用户名已存在', 200002);
    }
}

app.post('/login', function (req, res) {
    console.log(req.body, 999);
    if (req.body.username && req.body.password) {
        selectUser(req.body, function (msg, code) {
            let d = {
                data: {},
                meta: {
                    code: code,
                    message: msg
                }
            };
            res.end(JSON.stringify(d));
        })
    } else {
        let d = {data: {}, meta: {code: 200006, message: '所有字段必须有值'}};
        res.end(JSON.stringify(d));
    }
});

/***
 * 登录--查询用户名 密码  是否一致
 * @param res
 * @param callback
 */
function selectUser(res, callback) {
    let data = resData;
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


var server = app.listen(8082, '0.0.0.0', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});