const { flatMap, filter } = require("lodash");
var difference = require("lodash.difference");
const {
  parse,
  transforms: { unwind },
} = require("json2csv");
const fields = [
  //"id",
  //"title",
  "answers.id",
  "answers.label",
  //"answers.options.label",
  //"answers.options.value",
];
const transforms = [unwind({ paths: ["answers", "answers.options"] })];
const getAllGroups = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "groups"), "groups");
};
const getAllBlocks = (questionnaire) => {
  return flatMap(filter(getAllGroups(questionnaire), "blocks"), "blocks");
};
const getAllQuestions = (questionnaire) => {
  return flatMap(filter(getAllBlocks(questionnaire), "questions"), "questions");
};
module.exports = (req, res) => {
  var jsonData = getAllQuestions(res.locals.questionnaire);
  jsonData = difference(jsonData, [
    ["confirm-zero-employees-answer", ""],
    ["confirm-zero-employees-answer", ""],
    ["please-explain-any-changes", "Comments"]
  ]);
  const data = parse(jsonData, { fields, transforms });
  res.attachment("data.csv");
  res.send(data);
};



