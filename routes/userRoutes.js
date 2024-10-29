var express = require('express');

var router = models => {
   var userRouter = express.Router();
   var userController = require('../controllers/userController')(models);

   userRouter.route('/')
      .get(userController.get)


   return userRouter;
}
module.exports = router;