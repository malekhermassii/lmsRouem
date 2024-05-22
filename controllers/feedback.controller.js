const Feedback = require("../models/feedback.model");
const User = require("../models/user.model");
const Course = require("../models/course.model");

// Create and Save a new Feedback
exports.createFeedback = async (req, res) => {
    try {
        // Find the user and course from the database
        const user = await User.findOne({ name: req.body.user });
        const course = await Course.findOne({ name: req.body.course });

        if (!user || !course) {
            return res.status(404).send({
                message: "User or Course not found with provided ",
            });
        }

        // Create a Feedback
        const newFeedback = new Feedback({
            user: user,
            course: course,
            content: req.body.content,
            rating: req.body.rating,
        });
        // Save Feedback in the database
        const savedFeedback = await newFeedback.save();
        res.send(savedFeedback);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the feedback."
        });
    }
};

// Retrieve all Feedbacks from the database.
exports.findAll = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('user').populate('course');
        res.send(feedbacks);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving feedbacks."
        });
    }
};

// Find feedbacks for a specific course by course ID
exports.findFeedbacksByCourseId = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ course: req.params.courseId }).populate('user').populate('course');
        res.send(feedbacks);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving feedbacks for the course."
        });
    }
};

// Find a single Feedback with a feedbackId
exports.findOne = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.feedbackId).populate('user').populate('course');
        if (!feedback) {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.send(feedback);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.status(500).send({
            message: "Error retrieving feedback with id " + req.params.feedbackId
        });
    }
};

// Update a Feedback identified by the feedbackId in the request
exports.updateFeedback = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Feedback content can not be empty"
        });
    }

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.feedbackId, {
            content: req.body.content,
            rating: req.body.rating
        }, { new: true });

        if (!updatedFeedback) {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.send(updatedFeedback);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.status(500).send({
            message: "Error updating feedback with id " + req.params.feedbackId
        });
    }
};

// Delete a Feedback with the specified feedbackId in the request
exports.DeleteFeedback = (req , res)=>{
    Feedback.findByIdAndDelete(req.params.feedbackId)
    .then((feedback)=>{
        if(!feedback){
            return res.status(404).send({
                message : " feedback not found with this id" + req.params.feedbackId
            })
        }
        res.send({ 
            message : "feedback deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
