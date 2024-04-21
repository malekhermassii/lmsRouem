const feedback = require('../models/feedback.model')
exports.createfeedback = (req, res) => {
    const newFeedback = new feedback({
        student: req.body.student,
        // course
        content: req.body.content,
        rating: req.body.rating,
    })
    newFeedback.save()
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            })
        })
}

exports.findAll = (req, res) => {
    feedback.find()
        .then((feedbacks) => {
            res.send(feedbacks)
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            })
        })
}
//findebyId
exports.findOne = (req, res) => {
    feedback.findById(req.params.feedbackId)
        .then((feedback) => {
            if (!feedback) {
                return res.status(404).send({
                    message: "feedback not found with this id: " + req.params.feedbackd
                })
            }
            res.send(feedback);
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error retrieving feedback with id: " + req.params.feedbackId
            })
        })
}
exports.Updatefeedback = (req, res) => {
    feedback.findByIdAndUpdate(req.params.feedbackId, {
        student: req.body.student,
        content: req.body.content,
        rating: req.body.rating,
    },
        { new: true })
        .then(feedback => {
            if (!feedback) {
                return res.status(404).send({
                    message: "Feedback not found with this id " + req.params.feedbackId
                })
            }
            res.send(feedback)
        })
        .catch(error => {
            res.status(500).send({
                message: "Feedback not found with this id " + req.params.feedbackId
            })
        })
}
exports.deletefeedback = (req, res) => {
    feedback.findByIdAnddelete(req.param.feedbackid)
        .then(feedback => {
            if (!feedback) {
                return res.status(404).send({
                    message: "Feedback not found with this id " + req.params.feedbackId
                })
            }
            res.send({
                message: "feedback successfully"
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Server side error"
            })
        })
}
// ahmed ( bad exerience )