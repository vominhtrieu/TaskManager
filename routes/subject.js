const express = require("express");
const router = express.Router();
var Subject = require("../models/Subject");

router.get("/subjects/:id", function(req, res)
{
    Subject.findById(req.params.id).populate("User").exec(function(err, subject)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/");
        }
        else
            res.render("subject.ejs", {subject: subject});
    });
});

router.get("/addSubject", function(req, res)
{
    res.render("addSubject.ejs");
});

router.post("/addSubject", isLoggedIn, function(req, res)
{
    var creator = {
        id: req.user._id,
        name: req.user.name
    };
    var newSubject = {
        name: req.body.name,
        creator: creator,
        member: [creator],
        tasks: []
    };
    Subject.create(newSubject, function(err)
    {
        if(err)
            console(err);
        else
            res.redirect("/");
    });
})

router.post("/subjects/:id/delete", isLoggedIn, function(req, res)
{
    Subject.findById(req.params.id, function(err, subject)
    {
        if(err)
            console.log(err);
        else
        {
            if(req.user._id.toString() === subject.creator.id.toString())
            {                
                Subject.deleteOne({_id: req.params.id}, function(err)
                {
                    if(err)
                        console(err);
                });
            }
            res.redirect("/");
        };
    })
});

router.post("/subjects/:id/enroll", isLoggedIn, function(req, res)
{
    Subject.findById(req.params.id, function(err, subject)
    {
        if(err)
            console.log(err);
        else
        {
            if(req.user._id.toString() !== subject.creator.id.toString())
            {                
                subject.member.push({id: req.user._id, name: req.user.name});
                subject.save();
            }
            res.redirect("/subjects/" + req.params.id);
        };
    });
});

router.post("/subjects/:id/kick/:index", isLoggedIn, function(req, res){
    Subject.findById(req.params.id, function(err, subject)
    {
        if(err)
            console.log(err);
        else
        {
            if(req.user._id.toString() === subject.creator.id.toString())
            {                
                subject.member.splice(req.params.index, 1);
                subject.save();
            }
            res.redirect("/subjects/" + req.params.id);
        };
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