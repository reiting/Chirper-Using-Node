var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function (req, res) {
    //breaks the URL up into pieces so I can use them
    var parsedURL = url.parse(req.url, true);
    // console.log(parsedURL);
    //if the URL path is a slash
    if (parsedURL.pathname == "/") {
        //sets the var to the path name that leads to index.html
        var filePath = path.join(__dirname, "..", "client", "index.html");
        //if the filepath is the var
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log("There has been an error");
            } else {
                //write to the head 200 (ok) and return this content type
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                //write to the document
                res.write(data);
                //end
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
    else if (parsedURL.pathname == "/styles.css") {
        var filePath = path.join(__dirname, "..", "client", "styles.css");
        fs.readFile(filePath, function (err, data){
            if (err) {
                console.log("Oh noes! This error!");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/css"
                });
                res.write(data);
                res.end();
            }
        })
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.write("Not Found");
        res.end();
    }

    // if (parsedURL.pathname == "/api/chirps:") {
    //     res.WriteHead
    // }
});
server.listen(3000);