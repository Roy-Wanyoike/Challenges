let http = require('http');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World I am learning NodeJS + "" Date() \n');

})
.listen(8080);

// Create your own modules
exports.myDateTime = function (){
    return Date();

};
