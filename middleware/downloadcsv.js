const { parse, transforms: { unwind } } = require("json2csv")

// const fields = [
//   "id",
//   "title",
//   "answers.id",
//   "answers.label",
//   "answers.options.label",
//   "answers.options.value"
// ]

const fields = [
  "alias",
  "title",
  "answers.qCode", 
  "answers.type",
  "answers.label",
  "answers.options.label"
]

const fieldNames = [
  "Shortcode",
  "Question Title",
  "Qcode",
  "Answers Type",
  "Answers Label",
  "Options Label"
]

const transforms = [unwind({ paths: ["answers", "answers.options"] })]

module.exports = (req, res) => {
  const data = parse(JSON.parse(req.body.questions), { fields, transforms })
  res.attachment("questions.csv")
  // res.send(data)

  const parsedText = data
    .replace(/(<([^>]+)>)/gi, "")
    .replace("&#x27;", "'")
  res.send(parsedText)


}
