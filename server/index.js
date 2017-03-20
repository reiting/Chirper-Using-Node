var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

//creates event listener basically for server
var server = http.createServer(function (req, res) {
    //breaks the URL up into pieces so I can use them
    var parsedURL = url.parse(req.url, true);
    // console.log(parsedURL);
    //if the URL path is a slash
    if (parsedURL.pathname == "/") {
        //sets the var to the path name that leads to index.html
        var htmlPath = path.join(__dirname, "..", "client", "index.html");
        //if the filepath is the var
        fs.readFile(htmlPath, function (err, data) {
            if (err) {
                console.log("There has been an error");
            } else {
                //write to the head 200 (ok) and return this content type
                res.writeHead(200, { "Content-Type": "text/html" });
                //write to the document
                res.write(data);
                //end
                res.end();
            }
        });
    }
    else if (parsedURL.pathname == "/scripts.js") {
        var jsPath = path.join(__dirname, "..", "client", "scripts.js");
        fs.readFile(jsPath, function (err, data) {
            if (err) {
                console.log("Uh-oh, you had an error!");
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/javascript"
                });
                res.write(data);
                res.end();
            }
        })
    }
    else if (parsedURL.pathname == "/styles.css") {
        var cssPath = path.join(__dirname, "..", "client", "styles.css");
        fs.readFile(cssPath, function (err, data) {
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
    else if (parsedURL.pathname == "/api/chirps") {
        var filePath = path.join(__dirname, "..", "server", "data.json");
        if (req.method === "GET") {
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    console.log("What What! There's a problem!");
                } else {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.write(data);
                    res.end();
                }
            })
        } else if (req.method === "POST") {
            console.log('making a post request');
            //set empty value for the new chirp
            var newChirp = '';
            //when you get the new data from the post, and convert to JS object
            req.on('data', function (json) {
                newChirp = JSON.parse(json);
            });

            //when you end this, 
            req.on('end', function () {
                console.log('posting');
                fs.readFile(filePath, function(err, data) {
                    console.log(filePath);
                    if (err) {
                        console.log("Your POST request is so wrong");
                    } else {
                        console.log(data);
                        //read the file, get the entire array and push the new chirp to it
                        var jsonData = JSON.parse(data.toString('utf-8').trim());
                        //pushes new chirp to the array
                        jsonData.push(newChirp);
    
                        //make array JSON again
                        var finalChirp = JSON.stringify(jsonData);
                        //then write the new stuff to the file
                        fs.writeFile(filePath, finalChirp, 'utf-8', function(err) {
                            var code = 201,
                                header = {
                                    'Content-Type': 'application/json'
                                };
                            
                            res.writeHead(code, header);
                            res.end(finalChirp);
                        });
                    }
                });
            })
        }
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.write("Not Found");
        res.end();
    }
});
server.listen(3000);