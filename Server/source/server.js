const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../webroot')));

app.get('/', (request, response) => {
  fs.readFile('./webroot/index.html', function(error, html) {
    if (error) throw error
  
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(html);
    response.end();
  });
})

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
