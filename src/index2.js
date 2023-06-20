
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
//app.use(express.static(path.resolve(__dirname)));
//app.use(express.static(path.resolve(__dirname, 'build')));
console.log('here?')
console.log(path.resolve('dist'))
app.use(express.static(path.resolve('dist')));
//app.use(express.static(path.join(__dirname, 'src')));
console.log(process.env.NODE_ENV);
console.log(port);
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port);