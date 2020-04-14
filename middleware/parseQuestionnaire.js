module.exports = (req, res, next) => {
    res.locals.questionnaire = JSON.parse(req.files.jsonFile.data)
    next()
}