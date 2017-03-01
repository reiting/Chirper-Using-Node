var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function (req, res) {

    var parsedURL = url.parse(req.url, true);
    // console.log(parsedURL);
    if (parsedURL.pathname == "/") {
        var filePath = path.join(__dirname, "..", "client", "index.html");
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log("There has been an error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(data);
                res.end();
            }
        });
    }
     else if (parsedURL.pathname == "/scripts.js") {
        var filePath = path.join(__dirname, "..", "client", "scripts.js");
        fs.readFile(filePath, function (err, data){
            if (err) {
                console.log("Uh-oh, you had an error!");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/javascript"
                });
                res.write(data);
                res.end();
            }
        })
    }
    

    // if (parsedURL.pathname == "/api/chirps:") {
    //     res.WriteHead
    // }
});
server.listen(3000);