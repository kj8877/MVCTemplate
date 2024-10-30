const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const xssFilter = require('x-xss-protection');
const helmet = require('helmet');
const { expressCspHeader, INLINE, SELF } = require('express-csp-header');

const app = express();
const port = process.env.PORT || 80;

mongoose.connect('mongodb://127.0.0.1:27017/DBName').catch((error => {
   if (error) console.log('Error', error);
   else console.log('Database is connected');
}));

app.use(cors());
app.use(xssFilter());
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
app.use(helmet());
app.use(
   expressCspHeader({
     directives: {
      'default-src': [
         SELF
      ],
      'script-src': [
         SELF,
         INLINE
      ],
      'style-src': [
         SELF,
         INLINE
      ],
      'img-src': [
         SELF
      ],
      'font-src': [
         SELF
      ],
      'object-src': [
      ],
      // 'worker-src': [NONE],
      // 'block-all-mixed-content': false
     },
   })
);
app.use((req, res, next) => {
   res.set('Access-Control-Allow-Credentials', true);
   res.set('Access-Control-Allow-Origin', req.headers.origin);
   res.set(
     'Access-Control-Allow-Methods',
     'GET,PUT,POST,DELETE,PATCH,OPTIONS'
   );
   res.set(
     'Access-Control-Allow-Headers',
     'Access-Control-Allow-Headers, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
   );
   // res.set('Strict-Transport-Security', 'max-age=');
   res.set('X-Content-Type-Options', 'nosniff');
   // res.set('Referrer-Policy', 'strict-origin');
   res.set('feature-Policy', 'geolocation');
   next();
 });

app.use(express.static(__dirname));
app.use(express.json())

app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: true }));
app.use(bodyParser.json({ parameterLimit: 100000, limit: '50mb', extended: true }));

var mainRouter = require('./routes/mainRoutes.js');

app.use(mainRouter());


app.listen(port, () => {
   console.log('App now listening for requests on port', port);
});