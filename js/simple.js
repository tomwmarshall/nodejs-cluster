var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

// go to http://127.0.0.1:8000/

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        var workers = [];
        workers.push(cluster.fork());
        console.log('New worker created from master.');
    }

    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });
/*
    process.on('SIGINT', function(){
        console.log("Exit: "+ process.pid);
        for(var i=0; i<5; i++) {
            console.log("Destroying worker:  " + worker.process.pid);
            workers[i].destroy();
        }
    });
*/

} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('Process ' + process.pid + ' is running.');
    }).listen(8000);
}