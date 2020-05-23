const request = require("request-promise-native")

const getQuestionnaireFromURL = async (req, res, next) => {
  try {
    if (!res.locals.url) {
      throw new Error(`missing url in request`)
    }
    const options = {
      json: true,
      uri: res.locals.url
    }
    console.log('waiting on fetch')
    const response = await request(options)
    res.locals.questionnaire = response
    console.log('fetch complete')
    next()
  }
  catch (e) {
    res.status(500).send(`Sorry, something went wrong with the url request`)
  }
}

module.exports = getQuestionnaireFromURL
