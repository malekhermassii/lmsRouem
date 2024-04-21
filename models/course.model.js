// course : name , desc , topic(it , marketing) , price , videos(class(title , description , videoURL)) , thumbnail(couverture) , feedback
// import to the mongoose 
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Feedback = require("./feedback.model")
const VideoSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type:String
    },
    videoURL :{
        type : String
    }
})
const CourseSchema =new Schema({
    name:{
        type: String ,
        required : true ,
    },
    description: {
        type: String ,

    },
    topic: {
        type: String,
        required : true 
    },
    price: {
        type: Number,
        required: true
    },
    videos: [VideoSchema],
    thumbnail: {
        type: String ,
        default : null
    },
    feedback:[Feedback.schema]

}, {
    timestamps: true,
});
module.exports = mongoose.model("Course" , CourseSchema)
