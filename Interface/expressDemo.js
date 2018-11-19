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
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err) {
            console.log('readDataJson err', err)
        } else {
            let p = data.toString();//将二进制的数据转换为字符串
            resData = JSON.parse(p);//将字符串转换为json对象
            console.log('resData', resData);
            if (callback) {
                callback();
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
    fs.writeFile('./data.json', str, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('----------变化成功-------------');
        callback();
        // readFile(callback);
    });
}

app.get('/getList', function (req, res) {
    readFile(function () {
        res.end(JSON.stringify(resData))
    });
});
app.post('/addData', function (req, res) {
    console.log(req.body, 888);
    let params = {};
    if (req.body.name && req.body.desc) {
        let t = -1;
        for (let i = 0; i < resData.total; i++) {
            if (resData.data[i].name === req.body.name) {
                t = i;
            }
        }
        console.log(t)
        if (t === -1) {
            params = req.body;
            addData(params, function () {
                let d = {data: '添加成功'};
                res.end(JSON.stringify(d));
            });
        } else {
            let d = {data: 'name已存在'};
            res.end(JSON.stringify(d));
        }

    } else {
        let d = {data: '没有输入要添加的值'};
        res.end(JSON.stringify(d));
    }
});
app.post('/delData', function (req, res) {
    console.log(req.body, 999)
    if (req.body.name) {
        delData(req.body.name, function (e) {
            if (e) {
                let d = {data: e};
                res.end(JSON.stringify(d));
            } else {
                let d = {data: '删除成功'};
                res.end(JSON.stringify(d));
            }
        })
    } else {
        let d = {data: '要删除的name不能为空'};
        res.end(JSON.stringify(d));
    }
});
app.post('/selectData', function (req, res) {
    console.log(req.body, 999);
    if (req.body.name) {
        selectData(req.body.name, function (data, f) {
            if (f) {
                let d = {data: f};
                res.end(JSON.stringify(d));
            } else {
                res.end(JSON.stringify(data));
            }
        })
    } else {
        let d = {data: '要查询的name不能为空'};
        res.end(JSON.stringify(d));
    }
});

app.post('/updateData', function (req, res) {
    if (req.body.name && req.body.desc) {
        updateData(req.body.name, req.body.desc, function (e) {
            if (e) {
                let d = {data: e};
                res.end(JSON.stringify(d));
            } else {
                let d = {data: '修改成功'};
                res.end(JSON.stringify(d));
            }
        })
    } else {
        let d = {data: '没有输入要修改的值'};
        res.end(JSON.stringify(d));
    }
});

/***
 * 添加
 * @param params  添加的对象{}
 * @param callback
 */
function addData(params, callback) {
    resData.data.push(params);//将传来的对象push进数组对象中
    resData.total = resData.data.length;//定义一下总条数，为以后的分页打基础
    console.log('in', resData.data, 'end');
    let str = JSON.stringify(resData);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    writeFile(str, callback);
}

/***
 * 删除--根据name删除
 * @param name
 * @param callback
 */
function delData(name, callback) {
    console.log(name, resData.total)
    let data = resData;
    let delI = -1;
    for (let i = 0; i < data.total; i++) {
        if (data.data[i].name == name) {
            delI = i;
        }
    }
    if (delI !== -1) {
        data.data.splice(delI, 1);
        console.log(data);
        data.total = data.data.length;
        let str = JSON.stringify(data);
        writeFile(str, callback);
    } else {
        callback('没找到');
    }

}

/***
 * 查询--根据name查询
 * @param name
 * @param callback
 */
function selectData(name, callback) {
    console.log(name, resData.total)
    let data = resData;
    let selI = -1;
    for (let i = 0; i < data.total; i++) {
        if (data.data[i].name == name) {
            selI = i;
        }
    }
    if (selI !== -1) {
        console.log(data);
        let newData = data.data.slice(selI, selI + 1);
        data.data = newData;
        data.total = data.data.length;
        console.log(newData, 'select')
        // writeFile(str, callback);
        callback(data)
    } else {
        callback('没找到', 1);
    }
}

/***
 * 修改--根据name修改desc
 * @param name
 * @param desc
 * @param callback
 */
function updateData(name, desc, callback) {
    let data = resData;
    let updateI = -1;
    for (let i = 0; i < data.total; i++) {
        if (data.data[i].name === name) {
            updateI = i;
        }
    }
    if (updateI !== -1) {
        data.data[updateI].desc = desc;
        let str = JSON.stringify(data);
        writeFile(str, callback)
    } else {
        callback('没找到')
    }

}


var server = app.listen(8081, '0.0.0.0', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});