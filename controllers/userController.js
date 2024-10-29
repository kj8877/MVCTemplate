

var userController = models => {
   function get(req, res) {
      console.log('Hello World');
      res.status(200).send('Hello World');
   }

   return {
      get: get
   };
}

module.exports = userController;