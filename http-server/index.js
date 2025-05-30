const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse port from command line args, default to 3000
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
    console.log('Requested URL:', req.url);

    if (req.url === '/') {
        serveFile('home.html', 'text/html', res);
    }
    else if (req.url === '/project.html') {
        serveFile('project.html', 'text/html', res);
    }
    else if (req.url === '/registration' || req.url === '/Registration.html') {
        serveFile('Registration.html', 'text/html', res);
    }
    else if (req.url === '/style.css') {
        serveFile('style.css', 'text/css', res);
    }
    else if (req.url === '/script.js') {
        serveFile('script.js', 'text/javascript', res);
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
});

function serveFile(filename, contentType, res) {
    const filepath = path.join(__dirname, filename);
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error('Error reading file:', filepath, err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }
    });
}

server.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});