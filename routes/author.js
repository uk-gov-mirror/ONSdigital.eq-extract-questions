const express = require('express')
const router = express.Router()
const parseQuestionnaire = require(`../middleware/parseQuestionnaire`)
const fetchSchema = require(`../middleware/fetchSchema`)
const setUrl = require(`../middleware/setUrl`)
const processAuthorQuestionnaire = require(`../middleware/processAuthorQuestionnaire`)
const renderPage = require(`../middleware/renderPage`)

router.route('/url')
  .all(
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire
  )
  .get(
    renderPage("questionnaire-no-buttons.html")
  )
  .post(
    renderPage("questionnaire.html")
  )

router.post('/table',
  setUrl,
  fetchSchema,
  processAuthorQuestionnaire,
  renderPage("output-table.html")
)

router.get('/json',
  parseQuestionnaire,
  processAuthorQuestionnaire,
  renderPage("questionnaire.html")
)

module.exports = router
