const { flatMap, filter } = require("lodash")

const getAllFolders = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "folders"), "folders")
}

const getAllPages = (questionnaire) => {
  return flatMap(filter(getAllFolders(questionnaire), "pages"), "pages")
}

module.exports = (req, res, next) => {
  res.locals.questions = getAllPages(res.locals.questionnaire)
  res.locals.questionSource = "author"
  next()
}
