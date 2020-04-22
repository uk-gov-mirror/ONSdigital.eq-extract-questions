const { flatMap, filter } = require("lodash");

const getAllGroups = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "groups"), "groups");
};
const getAllBlocks = (questionnaire) => {
  return flatMap(filter(getAllGroups(questionnaire), "blocks"), "blocks");
};
const getAllQuestions = (questionnaire) => {
  return flatMap(filter(getAllBlocks(questionnaire), "questions"), "questions");
};
module.exports = (req, res, next) => {
  res.locals.jsonData = getAllQuestions(res.locals.questionnaire);
  next()
  
  //res.render("results.html", { data: JSON.stringify(jsonData) });
  //res.render("results.html", { data: jsonData });
};



