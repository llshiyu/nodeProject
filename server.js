let http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8889);

console.log("server running at http://localhost:8889");