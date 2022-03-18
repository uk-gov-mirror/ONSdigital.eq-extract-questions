module.exports = (page) => {
  return (req, res, next) => {
    console.log(res.locals.questionnaire.sections)
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
