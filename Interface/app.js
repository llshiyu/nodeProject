var express = require('express');
var app = express();

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var list = [
    {
        name: '张三',
        desc: 444,
        age: 12
    },
    {
        name: '李四',
        desc: 678,
        age: 13
    }];

//写个接口
app.get('/getList', function (req, res) {
    res.status(200);
        res.json(list)
});

//配置服务端口

var server = app.listen(8080, function () {
    console.log('Example app listening at http://localhost:8080');
});

