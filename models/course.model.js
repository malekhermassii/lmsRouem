const mongoose = require("mongoose")
const feedbackSchema = require("./feedback.model")
const courseSchema = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    }, 
    description : {
        type : String , 
        required : true 
    },
    topic:{
        type : String , 
        required : true
    },
    price:{
        type : Number , 
        required : true
    },
    thumbnail:{

    },
    contentVideo :{

    },
    prerequisites : {
        type : String
    },
    rating:{
        type: Number , 
        default : 0
    },
    feedback : [feedbackSchema]
},
{
    timestamps : true
})
module.exports = mongoose.model("Course" , courseSchema)