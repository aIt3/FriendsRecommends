// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerHelper('isUserCreator', function (a, b, options) {
	if (a == b) { return options.fn(this); }
	return options.inverse(this);
  });
  

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "FriendsRecommends";

app.locals.appTitle = capitalized(projectName);

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESS_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		})
	})
)

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRouter = require('./routes/auth.routes'); // <== has to be added
app.use('/', authRouter); // <== has to be added

const posts = require('./routes/posts.routes'); // <== has to be added
app.use('/', posts); // <== has to be added

// use session.config
//require('./config/session.config')(app);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;


