const http = require('http');
const fs = require('fs');
const path = require('path');

let localApiKey = null
try {
    localApiKey = fs.readFileSync('./api-key', 'utf-8');
} catch (e) { /* ignore */
}
console.log(`localApiKey: ${localApiKey}`);

http.createServer(function(request, response) {

    let filePath = '.' + request.url;
    if (filePath === './')
        filePath = './demo.html';
    if (filePath.includes('?'))
        filePath = filePath.split('?')[0];

    console.log(`request starting: ${filePath}`);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
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
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        } else {
            content = content.toString();
            content = content.replaceAll('https://dimait.github.io/honey-badgers/', 'http://localhost:8000/');
            if (localApiKey) {
                content = content.replaceAll('name="api_key"', `name="api_key" value="${localApiKey}"`);
            }
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
