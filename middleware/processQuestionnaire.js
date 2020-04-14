module.exports = (req, res) => {
    res.json(res.locals.questionnaire);
};