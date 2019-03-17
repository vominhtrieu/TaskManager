const express = require("express");
const router = express.Router();
var Subject = require("../models/Subject");

router.get("/subjects/:id/addTask", isLoggedIn, function(req, res)
{
    Subject.findById(req.params.id, function(err, subject)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/");
        }
        else
            res.render("addTask.ejs", {subject: subject});
    });
});

router.post("/subjects/:id/addTask", function(req, res)
{
    Subject.findById(req.params.id, function(err, subject)
    {
        if(err)
            console.log(err);
        else
        {
            subject.tasks.push(req.body.task);
            subject.save();
            res.redirect("/subjects/" + req.params.id);
        }
    })
});

router.post("/subjects/:id/deleteTask/:index", function(req, res)
{
    Subject.findById(req.params.id, function(err, subject)
    {
        subject.tasks.splice(req.params.index, 1);
        subject.save();
        res.redirect("/subjects/" + req.params.id);
    });
});

function isLoggedIn(req, res, next)
{
    if(req.user)
        next();
    else
        res.redirect("/login");
}

module.exports = router;