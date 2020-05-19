const express = require('express')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload')
const processRunnerQuestionnaire = require(`./middleware/processRunnerQuestionnaire`)
const processAuthorQuestionnaire = require(`./middleware/processAuthorQuestionnaire`)
const downloadcsv = require(`./middleware/downloadcsv`)
const bodyParser = require("body-parser")
const { parseQuestionText } = require(`./utils/runner_utils`)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
})

env.addFilter('parseQuestionText', parseQuestionText)

app.get('/', function (req, res) {
  res.render('index.html', { title: "Extract Question Codes and Titles" })
})

app.post('/runner-upload',
  fileUpload(),
  processRunnerQuestionnaire,
  (req, res) => {
    res.render("runner-output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.post('/author-upload',
  fileUpload(),
  processAuthorQuestionnaire,
  (req, res) => {
    res.render("author-output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.post("/download",
  downloadcsv
)

app.listen(3000, () => console.log('Server started on port 3000'))
