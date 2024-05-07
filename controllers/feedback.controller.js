const Feedback = require("../models/feedback.model");
const User = require("../models/user.model"); // Assuming this exists
const Course = require("../models/course.model"); // Assuming this exists

// Create and Save a new Feedback
exports.createFeedback = async (req, res) => {
    try {
        // Find the user and course from the database
        const user = await User.findOne({name :req.body.user});
        const course = await Course.findOne({name :req.body.course});

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
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndRemove(req.params.feedbackId);
        if (!feedback) {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.send({ message: "Feedback deleted successfully!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Feedback not found with id " + req.params.feedbackId
            });
        }
        res.status(500).send({
            message: "Could not delete feedback with id " + req.params.feedbackId
        });
    }
};
































// const feedback = require('../models/feedback.model')
// exports.createfeedback = (req, res) => {
    
//     const newFeedback = new feedback({
//         user: req.body.user,
//         // course
//         content: req.body.content,
//         rating: req.body.rating,
//     })
//     newFeedback.save()
//         .then((data) => {
//             res.send(data)
//         })
//         .catch((error) => {
//             res.status(500).send({
//                 message: error.message || "Server side error"
//             })
//         })
// }

// exports.findAll = (req, res) => {
//     feedback.find()
//         .then((feedbacks) => {
//             res.send(feedbacks)
//         })
//         .catch((error) => {
//             res.status(500).send({
//                 message: error.message || "Server side error"
//             })
//         })
// }
// //findebyId
// exports.findOne = (req, res) => {
//     feedback.findById(req.params.feedbackId)
//         .then((feedback) => {
//             if (!feedback) {
//                 return res.status(404).send({
//                     message: "feedback not found with this id: " + req.params.feedbackd
//                 })
//             }
//             res.send(feedback);
//         })
//         .catch((error) => {
//             res.status(500).send({
//                 message: "Error retrieving feedback with id: " + req.params.feedbackId
//             })
//         })
// }
// exports.Updatefeedback = (req, res) => {
//     feedback.findByIdAndUpdate(req.params.feedbackId, {
//         user: req.body.user,
//         content: req.body.content,
//         rating: req.body.rating,
//     },
//         { new: true })
//         .then(feedback => {
//             if (!feedback) {
//                 return res.status(404).send({
//                     message: "Feedback not found with this id " + req.params.feedbackId
//                 })
//             }
//             res.send(feedback)
//         })
//         .catch(error => {
//             res.status(500).send({
//                 message: "Feedback not found with this id " + req.params.feedbackId
//             })
//         })
// }
// exports.deletefeedback = (req, res) => {
//     feedback.findByIdAnddelete(req.param.feedbackid)
//         .then(feedback => {
//             if (!feedback) {
//                 return res.status(404).send({
//                     message: "Feedback not found with this id " + req.params.feedbackId
//                 })
//             }
//             res.send({
//                 message: "feedback successfully"
//             })
//         })
//         .catch(error => {
//             res.status(500).send({
//                 message: error.message || "Server side error"
//             })
//         })
// }
// // ahmed ( bad exerience )