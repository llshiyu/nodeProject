//express_demo.js 文件
var express = require('express');

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

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.post('/getlist', function (req, res) {
    console.log(req.body);
    var response = {data: []};
    if (req.body.name && req.body.desc) {
        response = {
            data: [{
                name: req.body.name,
                desc: req.body.desc
            }]
        };
    }

    res.end(JSON.stringify(response))
});

var server = app.listen(8081, '0.0.0.0', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});