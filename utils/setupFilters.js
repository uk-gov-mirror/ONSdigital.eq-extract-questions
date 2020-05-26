const { parseQuestionText } = require(`./runnerUtils`)

module.exports = (env) => {
  env.addFilter('parseQuestionText', parseQuestionText)
  env.addFilter('is_string', (obj) => {
    return typeof obj === 'string'
  })
}
