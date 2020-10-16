const { parse, transforms: { unwind } } = require("json2csv")

const get_qcode = (row) => {
  if (row.answers.options && row.answers.options.q_code) {
    return row.answers.options.q_code
  }
  if (row.answers.options && row.answers.options.qCode) {
    return row.answers.options.qCode
  }
  if (row.answers.q_code) {
    return row.answers.q_code
  }
  if (row.answers.qCode) {
    return row.answers.qCode
  }
}

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
    value: (row) => row.answers.secondaryLabel ? `${row.answers.label} / ${row.answers.secondaryLabel}` : row.answers.label
  },
  {
    label: "QCode",
    value: (row) => get_qcode(row)
  },
  {
    label: "Options label",
    value: (row) => row.answers.options ? row.answers.options.map(options => options.label).join(' / ') : ''
  }
]

const transforms = [unwind({ paths: ["answers"], blankOut: true })]

module.exports = (req, res) => {
  const data = parse(JSON.parse(req.body.questions), { fields, transforms })
  res.attachment("questions.csv")

  const parsedText = data
    .replace(/(<([^>]+)>)/gi, "")
    .replace("&#x27;", "'")
  res.send(parsedText)
}
