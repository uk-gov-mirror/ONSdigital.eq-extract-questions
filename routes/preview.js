const express = require('express')
const router = express.Router()
const fetchSchema = require(`../middleware/fetchSchema`)
const setUrl = require(`../middleware/setUrl`)
const processAuthorQuestionnaire = require(`../middleware/processAuthorQuestionnaire`)
const renderPage = require(`../middleware/renderPage`)
const redirectPost = require('../middleware/redirectPost')

router.route('/preview')
  .get(
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire,
    renderPage("questionnaire.html")
  )
  .post(
    redirectPost('/preview')
  )

router.route('/table')
  .get(
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire,
    renderPage("table.html")
  )
  .post(
    redirectPost('/table')
  )

module.exports = router
