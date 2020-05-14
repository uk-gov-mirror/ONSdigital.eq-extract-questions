const parseQuestionText = (questionText) => {
  const parsedText = questionText
    .replace(/metadata/g, "")
    .replace(/{{/g, "")
    .replace(/ }}/g, "")
    .replace(/']/g, "]")
    .replace(/\['/g, "[")
    .replace(/&apos;/g, "'")
    .replace(/format_date/g, "")
    .replace(/first_non_empty_item/g, "")
  return parsedText
}

module.exports = { parseQuestionText }
