var mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
    name: String,
    creator: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    },
    member: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    }],
    tasks: [
        {
            member: String,
            content: String
        }
    ]
});

module.exports = mongoose.model("Subject", subjectSchema);