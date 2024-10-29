var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var getModel = () => {
   
   var userModel = new Schema({
      firstName: {
         type: String,
         required: false
      },
      lastName: {
         type: String,
         required: false
      },
   });

   return productConnection.model('User', userModel);
}

module.exports = getModel;