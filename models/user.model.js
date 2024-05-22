const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "password must contain at least 6 characters"]
    },
    image: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports  = mongoose.model("User", userSchema);
