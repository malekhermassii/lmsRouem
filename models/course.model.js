const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    videoURL: {
        type: String
    }
});

const CourseSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
    },
    topic: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    videos: [VideoSchema],
    image: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Course", CourseSchema);
