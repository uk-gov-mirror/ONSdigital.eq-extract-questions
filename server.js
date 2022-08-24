require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require("body-parser")
const setupFilters = require(`./utils/setupFilters`)
const indexRouter = require(`./routes/index`)
const previewRouter = require(`./routes/preview`)
const app = express()

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
app.use(bodyParser.json({ limit: "10mb" }))
app.use(express.static('static'))
app.use('/', indexRouter)
app.use('/', previewRouter)

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
})

setupFilters(env)

app.listen(process.env.NODE_PORT || 3050, () => console.log(`Server started on port ${process.env.NODE_PORT || 3050}`))
