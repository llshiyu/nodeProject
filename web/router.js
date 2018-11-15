function route(handle,pathname,response,request) {
    console.log('router '+pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
    }else{
        console.log('no route');
        response.writeHead(404,{'content-type':'text/plain'});
        response.write('404 Not found');
        response.end();
    }

}

exports.route = route