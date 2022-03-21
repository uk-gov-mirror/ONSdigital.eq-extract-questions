module.exports = (req, res, next) => {
  const authorUrlAWS = process.env.AUTHOR_SCHEMA_URL_AWS || ""
  const authorUrlGCP = process.env.AUTHOR_SCHEMA_URL_GCP || ""
  if (req.body.author_qid) {
    res.locals.urlAWS = authorUrlAWS + req.body.author_qid
  }
  if (req.body.author_qid) {
    res.locals.urlGCP = authorUrlGCP + req.body.author_qid
  }
  if (!res.locals.url) {
    res.locals.url = req.body.url || req.query.url
  }
  next()
}
