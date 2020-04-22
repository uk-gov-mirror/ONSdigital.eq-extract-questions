const express = require('express')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload');
const processQuestionnaire = require(`./middleware/processQuestionnaire`)
const downloadcsv = require(`./middleware/downloadcsv`);
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'))

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/',
    fileUpload(),
    processQuestionnaire,
    (req, res) => {
        res.render("results.html", { questions: res.locals.questions });
    }
)

app.post("/download",
  downloadcsv
);

app.listen(3000, () => console.log('Server started on port 3000'));
