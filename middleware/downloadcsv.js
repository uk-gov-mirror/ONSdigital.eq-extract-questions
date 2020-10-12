const { parse, transforms: { unwind } } = require("json2csv")

const fields = [
  {
    label: "Author short code",
    value: (row) => row.alias
  },
  {
    label: "Question",
    value: (row) => row.title
  },
  {
    label: "Type",
    value: (row) => row.answers.type
  },
  {
    label: "Answer label",
    value: (row) => (row.answers.secondaryLabel ? row.answers.label + ' / ' + row.answers.secondaryLabel : row.answers.label )
  },
  {
    label: "QCode / Answer code",
    value: (row) => row.answers.qCode
  },
  {
    label: "Transformation information",
    value: (row) => (row.answers.options ? row.answers.options.label : '' )
  }
]

const transforms = [unwind({ paths: ["answers", "answers.options"], blankOut: true })]

module.exports = (req, res) => {
  const data = parse(JSON.parse(req.body.questions), { fields, transforms })
  res.attachment("questions.csv")
  
  const parsedText = data
    .replace(/(<([^>]+)>)/gi, "")
    .replace("&#x27;", "'")
  res.send(parsedText)


}
