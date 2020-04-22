const express = require('express')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload');
const _ = require("lodash")
const parseQuestionnaire = require(`./middleware/parseQuestionnaire`)
const processQuestionnaire = require(`./middleware/processQuestionnaire`)
const downloadcsv = require(`./middleware/downloadcsv`);
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('public'))
//app.use(express.static("templates"))

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/',
    fileUpload(),
    parseQuestionnaire,
    processQuestionnaire,
    (req, res) => {
        res.render("results.html", { data: res.locals.jsonData });
    }
)

app.post("/download",
  downloadcsv
);

// app.post('/parsejson',
//     fileUpload(),
//     parseQuestionnaire,
//     processQuestionnaire, function (req, res) {
//         res.redirect('results.html');
//     }
// )

// app.post('/parsejson', function (req, res) {
//     res.redirect('results.html');
// });

app.listen(3000, () => console.log('Server started on port 3000'));
