const mongoose = require("mongoose")
const Schema = mongoose.Schema
const feedbackSchema = new Schema ({
    student: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : "Student"
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