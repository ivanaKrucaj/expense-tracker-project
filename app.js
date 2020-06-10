require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");

//A library that helps us log the requests in the console
const logger = require("morgan");

// Used to set the favicon for our app
// const favicon = require("serve-favicon");

const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");

// Set up the database
require("./configs/db.config");

// Routers
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");
const siteRouter = require("./routes/site.routes");

const app = express();

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// setting up social login (Google) middleware:
const GoogleStrategy = require("passport-google-oauth20").Strategy;
 
passport.use(
  new GoogleStrategy(
    {
      clientID: "761570140059-mmuar714shr10lfpi6honv4vkmq78ads.apps.googleusercontent.com",
      clientSecret: "oHjPV7r4BMOp8YlbBR6cdGJN",
      callbackURL: "google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);
 
      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }
 
          User.create({ googleID: profile.id })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);

// Sets up morgan in our middleware so that we can see the requests getting logged
app.use(logger("dev"));

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "our-secret-project",
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      // mongooseConnection: mongoose.connection
      //time to live (in seconds)
      ttl: 60 * 60 * 24,
      autoRemove: "disabled",
    }),
  })
);

// a body parser to allow us to parse form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helps us use the cookies from each request
app.use(cookieParser());

// Routes middleware
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", siteRouter);

module.exports = app;
