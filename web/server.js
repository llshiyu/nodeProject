var http = require('http'),
    url = require('url');

function start(route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;

        route(handle,pathname,response,request);

    }
    http.createServer(onRequest).listen(8090);

    console.log('open http://localhost:8090');
}

exports.start = start;