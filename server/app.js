const express = require('express')
const path = require('path')
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const session = require('express-session');
const methodOverride = require('method-override');

const port = process.env.PORT || 8080

const passportFb = require('./boot/passportFb');




const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'Tinder Hack' }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use( express.static( path.join(__dirname, 'public') ) );

app.use('/', routes);



const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('App listening at http://localhost:' + port)
})

