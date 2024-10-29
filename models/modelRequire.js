var generateModels = function generateModelsFunc() {
   var models = {};

   models.user = require('./userModel')();

   return models;
}
module.exports = generateModels;