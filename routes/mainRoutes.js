var express = require('express');

var router = function router() {
   var mainRouter = express.Router();
   var models = require('../models/modelRequire');

   var userRouter  = require('./userRoutes')(models);


   mainRouter.use('/api/users', userRouter);

   return mainRouter;
}

module.exports = router;