// var exec = require('child_process').exec;
var queryString = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

function start(response) {
    console.log('open start');
    // exec('ls -ah',function (err,stdout,stderr) {
    //     response.writeHead(200,{'content-type':'text/plain'});
    //     response.write(stdout);
    //     response.end();
    // })

    // exec('find /',
    //     {timeout: 10000,maxBuffer:20000*1024},
    //     function (err,stdout,stderr) {
    //     response.writeHead(200,{'content-type':'text/plain'});
    //     response.write(stdout);
    //     response.end();
    // })

    fs.readFile('index.html',function (err,file) {
        if(err){
            response.writeHead(404,{'content-type':'text/html'});
            response.write('404 Not found');
        }else{
            response.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            response.write(file.toString());
        }
        response.end();
    });

}

function upload(response, request) {
    console.log('open upload');

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        try {
            console.log(files.upload.path,999,fields);
            fs.renameSync(files.upload.path, "./img/test.png");
        } catch (e) {
            console.log('eee', e)
        }
        response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        response.write("提交的image:<br/>");
        response.write("<img src='/show' /><br>");
        response.write("name: "+fields.name+"<br>desc: "+fields.desc);
        response.end();
    });

}

function show(response, request) {
    fs.readFile('./img/img.png', 'binary', function (error, file) {
        if (error) {
            response.writeHead(500, {'content-type': 'text/plain'});
            response.write(error + '\n');
        } else {
            response.writeHead(200, {'content-type': 'image/png'});
            response.write(file, 'binary');
        }
        response.end();
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;