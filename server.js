const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 80;

mongoose.connect('mongodb://127.0.0.1:27017/DBName').catch((error => {
   if (error) console.log('Error', error);
   else console.log('Database is connected');
}));


var mainRouter = require('./routes/mainRoutes.js');

app.use(mainRouter());


app.listen(port, () => {
   console.log('App now listening for requests on port', port);
});