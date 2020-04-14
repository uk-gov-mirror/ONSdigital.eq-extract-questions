const express = require('express')
const fileUpload = require('express-fileupload');
const _ = require("lodash")
const parseQuestionnaire = require(`./middleware/parseQuestionnaire`)
const processQuestionnaire = require(`./middleware/processQuestionnaire`)
const app = express();

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/parsejson',
    fileUpload(),
    parseQuestionnaire,
    processQuestionnaire
)

app.listen(3000, () => console.log('Server started on port 3000'));
