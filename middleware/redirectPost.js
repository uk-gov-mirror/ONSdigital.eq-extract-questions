module.exports = (page) => {
    return (req, res, next) => {
        if (req.body.qid) {
            res.redirect(`${page}?qid=${req.body.qid}`)
        }
        else {
            res.status(500).send(`Error, no questionniaire ID provided`)
        }
    }
}