module.exports = (req, res, next) => {
  const authorUrl = process.env.AUTHOR_SCHEMA_URL || ""
  if (req.body.qid) {
    res.locals.url = authorUrl + req.body.qid
  }
  if(req.query.qid) {
    res.locals.url = authorUrl + req.query.qid
  }
  if(req.query.url) {
    res.locals.url = req.query.url
  }
  next()
}
