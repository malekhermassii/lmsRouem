const mongoose = require("mongoose")
const AdminSchema =new  mongoose.Schema({
    adminName :{
        type : String , 
        unique :[ true , "the admin name should be unique" ]
    }, 
    email:{
        type: String ,
        unique : [ true , "the email should be unique"]
    },
    password : {
        type : String 
    },
    role:{
        type:String,
        default : "teacher"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
} , 
{
    timestamps : true
})
module.exports = mongoose.model("Admin" , AdminSchema)
// input : string
// timestamps : creation , update 






