//https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

/* ***************************************** */
// TIC TAC TOE (node.js server, to run game)
// DEAN JONES 
// DEC. 09, 2017
/* ***************************************** */

var http = require('http');
var fs = require('fs');
var path = require('path');

//CREATE HTTP SERVER
http.createServer(function (request, response) {
    console.log('request starting...');

    //GET URL FOR FILEPATH
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './tictactoe.html';


    //SET CONTENTTYPE
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    //WRITE RESPONSE 
    fs.readFile(filePath, function(error, content) {
        if (error) {
            console.log(error);
            // if(error.code == 'ENOENT'){
            //     fs.readFile('./404.html', function(error, content) {
            //         response.writeHead(200, { 'Content-Type': contentType });
            //         response.end(content, 'utf-8');
            //     });
            // }
            // else {
            //     response.writeHead(500);
            //     response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            //     response.end(); 
            // }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
            console.log("url: ", request.url);
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');

//to run on TERMINAL type (node server.js) in root directory (C:\Users\Pythagoras\Documents\000-Code\tictactoe>node server.js)
//then open BROWSER and type in URL (http://127.0.0.1:8125/)
