const { flatMap, filter } = require("lodash")

const getAllGroups = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "groups"), "groups")
}
const getAllBlocks = (questionnaire) => {
  return flatMap(filter(getAllGroups(questionnaire), "blocks"), "blocks")
}
const getAllQuestions = (questionnaire) => {
  return flatMap(filter(getAllBlocks(questionnaire), "questions"), "questions")
}
module.exports = (req, res, next) => {
  res.locals.questions = getAllQuestions(res.locals.questionnaire)
  res.locals.questionSource = "runner"
  next()
}
