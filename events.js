let events = require("events");
let eventEmitter = new events.EventEmitter();

let connectHandler = function connected(a) {
    console.log('连接成功',a);

    eventEmitter.emit('data_received')
};

eventEmitter.on('connection',connectHandler);

eventEmitter.on('data_received',function () {
    console.log('数据连接成功')
});

eventEmitter.emit('connection','参数1');

console.log('程序执行完毕。');

eventEmitter.on('connection',function (a) {
    console.log(a,999)
});
eventEmitter.emit('connection','lalala');

let t = eventEmitter.listenerCount('connection');
console.log(t)