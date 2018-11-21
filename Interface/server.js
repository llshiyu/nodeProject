var express = require('express');
var dataList = require('./dataList');
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

function sendRes(res, data, code, msg) {
    let d = {data: data, meta: {code: code, message: msg}};
    res.end(JSON.stringify(d));
}

app.post('/login', function (req, res) {
    if (req.body.username && req.body.password) {
        dataList.selectData(req.body, function (msg, code, data) {
            sendRes(res, {}, code, msg)
        })
    } else {
        sendRes(res, {}, 200006, '所有字段必须有值')
    }
});


app.post('/addData', function (req, res) {
    if (req.body.username && req.body.password) {
        dataList.addData(req.body, function (msg, code) {
            sendRes(res, {}, code, msg)
        })
    } else {
        sendRes(res, {}, 200006, '所有字段必须有值')
    }
});
app.post('/delData', function (req, res) {
    if (req.body.username) {
        dataList.delData(req.body, (msg, code) => {
            sendRes(res, {}, code, msg)
        })
    } else {
        sendRes(res, {}, 200006, '所有字段必须有值')
    }
});
app.post('/selectData', function (req, res) {
    dataList.selectData(req.body, function (msg, code, data) {
        sendRes(res, data ? data : {}, code, msg)
    })
});
app.post('/updateData', function (req, res) {
    if (req.body.username && req.body.password) {
        dataList.updateData(req.body, function (msg, code) {
            sendRes(res, {}, code, msg)
        })
    } else {
        sendRes(res, {}, 200006, '所有字段必须有值')
    }
});


var server = app.listen(8082, '0.0.0.0', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

exports.server = server;