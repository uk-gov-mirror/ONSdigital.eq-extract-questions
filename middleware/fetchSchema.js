const request = require("request-promise-native")

const getQuestionnaireFromURL = async (req, res, next) => {
  try {
    if (!req.body.url && !req.query.url) {
      throw new Error(`missing url in request`)
    }
    const options = {
      json: true,
      uri: req.body.url || req.query.url
    }
    console.log('waiting on fetch')
    const response = await request(options)
    res.locals.questionnaire = response
    console.log('fetch complete')
    next()
  }
  catch (e) {
    res.status(500).send(`Sorry, something went wrong with the url request; ${e.message}`)
  }
}

module.exports = getQuestionnaireFromURL
