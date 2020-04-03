// call all the required packages
const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

//ROUTES WILL GO HERE
// app.get('/', function (req, res) {
//     res.json({ message: 'WELCOME' });
// });

// ROUTES

app.get('/', function (req, res) {
    console.log('get');
    res.sendFile(__dirname + '/index.html');

});

app.post('/parsejson', fileUpload(), function (req, res) {
    console.log('post');
    console.log(req);
    console.log(req.files.jsonFile.data.toString('utf8'))
    const json = req.files.jsonFile.data.toString('utf8')
    res.json({ message: 'json file' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
