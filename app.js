const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportStrategy = require("passport-strategy");
const expressSession = require("express-session");

var User = require("./models/User");

//Routes
var indexRoutes = require("./routes/index");
var subjectRoutes = require("./routes/subject");
var taskRoutes = require("./routes/task");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(expressSession({
    secret: "drfghdjned jhecjheniulkwoiduyewfudutyweguhdij",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", taskRoutes);
app.use("/", subjectRoutes);
app.use("/", indexRoutes);

mongoose.connect("mongodb://localhost:27017/CongViec", {useNewUrlParser: true});

app.listen(80);