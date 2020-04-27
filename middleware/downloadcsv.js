const { parse, transforms: { unwind } } = require("json2csv")

const fields = [
  "id",
  "title",
  "answers.id",
  "answers.label",
  "answers.options.label",
  "answers.options.value"
]

const transforms = [unwind({ paths: ["answers", "answers.options"] })]

module.exports = (req, res) => {
  const data = parse(JSON.parse(req.body.questions), { fields, transforms })
  res.attachment("questions.csv")
  res.send(data)
}
