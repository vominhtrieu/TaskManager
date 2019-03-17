const express = require("express");
const router = express.Router();
const passport = require("passport");
var Subject = require("../models/Subject");
var User = require("../models/User");

router.get("/", function(req, res)
{
    Subject.find({}, function(err, subjects)
    {
        if(err)
        {
            console.log(err);
            res.send("Something went wrong!!!");
        }
        else
        {
            res.render("home.ejs", {subjects: subjects});
        }
    });
});

router.get("/login", function(req, res)
{
    res.render("login.ejs");
});

router.get("/signup", function(req, res)
{
    res.render("signUp.ejs");
});

router.get("/logout", function(req, res)
{
    req.logout();
    res.redirect("/");
});

router.get("*", function(req, res)
{
    res.send("Trang này không tồn tại.");
});

router.post("/login", passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res){});

router.post("/signup", function(req, res)
{
    User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/signup");
        }
        else
        {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});
module.exports = router;