module.exports = (page) => {
  return (req, res, next) => {
    res.render(page, {
      questions: res.locals.questions,
      title: res.locals.questionnaire.title,
      source: res.locals.questionSource,
      optionLabels: res.locals.optionLabels,
      sections: res.locals.questionnaire.sections,
      sectionTitles: res.locals.sectionTitles,
      questionTitles: res.locals.questionTitles
    })
  }
}
