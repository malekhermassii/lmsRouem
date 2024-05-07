const mongoose = require("mongoose")
const Schema = mongoose.Schema
const feedbackSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : "Course"
       
    },
    content: {
        type: String,
      
    },
    rating: {
        type: Number,
       default:0
    }
    },
    {
        timestamps: true
    })
module.exports = mongoose.model("Feedback", feedbackSchema)  