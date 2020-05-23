module.exports = (page) => {
  return (req, res, next) => {
    res.render(page, { questions: res.locals.questions, title: res.locals.questionnaire.title })
  }
}
