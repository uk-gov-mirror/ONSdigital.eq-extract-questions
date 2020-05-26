module.exports = (req, res, next) => {
  if (req.files) {
    res.locals.questionnaire = JSON.parse(req.files.jsonFile.data)
  }
  else {
    res.locals.questionnaire = req.body
  }
  next()
}
