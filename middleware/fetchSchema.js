const request = require("request-promise-native")

const getQuestionnaireFromURL = async (req, res, next) => {
  try {
    if (!res.locals.urlAWS && !res.locals.urlGCP) {
      throw new Error(`missing url in request`)
    }
    const options = {
      json: true,
      uri: res.locals.urlAWS
    }
    const response = await request(options)
    res.locals.questionnaire = response
    next()
  }
  catch (e) {
    try {
      const options = {
        json: true,
        uri: res.locals.urlGCP
      }
      const response = await request(options)
      res.locals.questionnaire = response
      next()
    }
    catch (e) {
      res.status(500).send(`Sorry, something went wrong with the url request`)
    }
  }
}

module.exports = getQuestionnaireFromURL
