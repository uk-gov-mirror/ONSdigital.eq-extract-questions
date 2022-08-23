module.exports = (page) => {
  return (req, res, next) => {
    res.render(page, {
      qid: res.locals.questionnaire.id,
      questions: res.locals.questions,
      title: res.locals.questionnaire.title,
      optionLabels: res.locals.optionLabels,
      sections: res.locals.questionnaire.sections,
      sectionTitles: res.locals.sectionTitles,
      questionTitles: res.locals.questionTitles
    })
  }
}
