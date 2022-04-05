const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const {URLSearchParams} = require("url");

const regexes = {
    NAME: /^([a-z]){1,20}$/i,
}

const server = http.createServer(function(req, res) {
    const url = req.url.toLowerCase();
    const method = req.method.toLowerCase();

    if (url === "/") {
        fs.readFile("index.html", function(err, file) {
            if (err) {
                console.log(err);
                res.setHeader("content-type", "text/plain");
                res.write(JSON.stringify(err, null, 2));
            }
            else {
                res.setHeader("content-type", "text/html");
                res.write(file);
            }
            res.end();
        })
    }
    else if (url === "/users") {

        if (method === "post") {
            let receivedData = "";
            
            req
            .on("data", function(chunk) {
                receivedData += chunk;
            })
            .on("end", function() {
                const urlParams = new URLSearchParams(receivedData);
                console.log(urlParams)
            })
        }
    }
})

server.listen(3000, function() {
    console.log("Server started at http://localhost:3000");
})