const mongoose = require("mongoose")
const AdminSchema = mongoose.Schema({
    username :{
        type : String , 
        unique :[ true , "the admin name should be unique" ]
    }, 
    email:{
        type: String ,
        unique : [ true , "the email should be unique"]
    },
    password : {
        type : String
    }
} , 
{
    timestamps : true
})
module.exports = mongoose.model("Admin" , AdminSchema)
// input : string
// timestamps : creation , update 
