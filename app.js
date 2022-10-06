const express = require('express');
const path = require('path');
const app = express();

const hostname = '192.168.11.139';
const portApp = 3001;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(portApp, hostname, () => {
  console.log(`La aplicacion se está ejecutando en http://${hostname}:${portApp}/`);
});