require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload')
const parseQuestionnaire = require(`./middleware/parseQuestionnaire`)
const fetchSchema = require(`./middleware/fetchSchema`)
const setUrl = require(`./middleware/setUrl`)
const processRunnerQuestionnaire = require(`./middleware/processRunnerQuestionnaire`)
const processAuthorQuestionnaire = require(`./middleware/processAuthorQuestionnaire`)
const downloadcsv = require(`./middleware/downloadcsv`)
const bodyParser = require("body-parser")
const { parseQuestionText } = require(`./utils/runner_utils`)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "10mb" }))
app.use(express.static('static'))

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
})

env.addFilter('parseQuestionText', parseQuestionText)
env.addFilter('is_string', (obj) => {
  return typeof obj === 'string'
})

app.get('/', function (req, res) {
  res.render('index.html', { title: "Extract Question Codes and Titles" })
})

app.post('/runner-upload',
  fileUpload(),
  parseQuestionnaire,
  processRunnerQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.post('/runner-json',
  parseQuestionnaire,
  processRunnerQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.get('/runner-url',
  fetchSchema,
  processRunnerQuestionnaire,
  (req, res) => {
    res.render("url.html", { title: "Results" })
  }
)

app.post('/runner-url',
  setUrl,
  fetchSchema,
  processRunnerQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.post('/author-upload',
  fileUpload(),
  parseQuestionnaire,
  processAuthorQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.get('/author-json',
  parseQuestionnaire,
  processAuthorQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.get('/author-url',
  fetchSchema,
  processAuthorQuestionnaire,
  (req, res) => {
    res.render("url.html", { title: "Results" })
  }
)

app.post('/author-url',
  setUrl,
  fetchSchema,
  processAuthorQuestionnaire,
  (req, res) => {
    res.render("output.html", { questions: res.locals.questions, title: "Results" })
  }
)

app.post("/download",
  downloadcsv
)

app.listen(3000, () => console.log('Server started on port 3000'))
