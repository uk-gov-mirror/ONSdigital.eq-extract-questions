require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload')
const bodyParser = require("body-parser")
const parseQuestionnaire = require(`./middleware/parseQuestionnaire`)
const fetchSchema = require(`./middleware/fetchSchema`)
const setUrl = require(`./middleware/setUrl`)
const processRunnerQuestionnaire = require(`./middleware/processRunnerQuestionnaire`)
const processAuthorQuestionnaire = require(`./middleware/processAuthorQuestionnaire`)
const downloadcsv = require(`./middleware/downloadcsv`)
const renderPage = require(`./middleware/renderPage`)
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
  res.render('index.html', { title: "Questionnaire Extract Tool" })
})

app.post('/runner-upload',
  fileUpload(),
  parseQuestionnaire,
  processRunnerQuestionnaire,
  renderPage("output.html")
)

app.post('/runner-json',
  parseQuestionnaire,
  processRunnerQuestionnaire,
  renderPage("output.html")
)

app.get('/runner-url',
  setUrl,
  fetchSchema,
  processRunnerQuestionnaire,
  renderPage("url.html")
)

app.post('/runner-url',
  setUrl,
  fetchSchema,
  processRunnerQuestionnaire,
  renderPage("output.html")
)

app.get('/author-json',
  parseQuestionnaire,
  processAuthorQuestionnaire,
  renderPage("output.html")
)

app.get('/author-url',
  setUrl,
  fetchSchema,
  processAuthorQuestionnaire,
  renderPage("url.html")
)

app.post('/author-url',
  setUrl,
  fetchSchema,
  processAuthorQuestionnaire,
  renderPage("output.html")
)

app.post("/download",
  downloadcsv
)

app.listen(3000, () => console.log('Server started on port 3000'))
