const { flatMap, filter } = require("lodash")

const getAllFolders = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "folders"), "folders")
}

const getAllPages = (questionnaire) => {
  return flatMap(filter(getAllFolders(questionnaire), "pages"), "pages")
}

const getAllOptionLabels = (questionnaire) => {
  const pages = getAllPages(questionnaire)
  const answers = flatMap(filter(pages, "answers"), "answers")
  const options = flatMap(filter(answers, "options"), "options")
  const optionLabels = {}
  options.forEach((option) => {
    optionLabels[option.id] = option.label
  })
  return optionLabels
}

const getAllSectionTitles = (questionnaire) => {
  const sectionTitles = {}
  questionnaire.sections.forEach((section) => {
    sectionTitles[section.id] = section.title || "undefined title"
  })
  return sectionTitles
}

const getAllQuestionTitles = (questionnaire) => {
  const pages = getAllPages(questionnaire)
  const questionTitles = {}
  pages.forEach((page) => {
    questionTitles[page.id] = page.title || "undefined title"
  })
  return questionTitles
}

module.exports = (req, res, next) => {
  res.locals.questions = getAllPages(res.locals.questionnaire)
  res.locals.optionLabels = getAllOptionLabels(res.locals.questionnaire)
  res.locals.sectionTitles = getAllSectionTitles(res.locals.questionnaire)
  res.locals.questionTitles = getAllQuestionTitles(res.locals.questionnaire)
  next()
}
