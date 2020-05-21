module.exports = (req, res, next) => {
  const authorUrl = process.env.AUTHOR_SCHEMA_URL || ""
  const runnerUrl = process.env.RUNNER_SCHEMA_URL || ""
  if (req.body.author_qid) {
    res.locals.url = authorUrl + req.body.author_qid
  }
  else if (req.body.runner_qid) {
    res.locals.url = runnerUrl + req.body.runner_qid
  }
  next()
}
