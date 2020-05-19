const request = require("request-promise-native")

const getQuestionnaireFromURL = async (req, res, next) => {
  try {
    if (!req.body.url) {
      throw new Error(`missing url in json body`)
    }
    const options = {
      json: true,
      uri: req.body.url
    }
    const response = await request(options)
    res.locals.questionnaire = response
    next()
  }
  catch (e) {
    res.status(500).send(`Sorry, something went wrong with the url request; ${e.message}`)
  }
}

module.exports = getQuestionnaireFromURL
