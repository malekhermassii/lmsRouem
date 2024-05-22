module.exports = (app) => {
    const feedbacks = require("../controllers/feedback.controller");

    app.post('/feedbacks', feedbacks.createFeedback);

    app.get("/feedbacks", feedbacks.findAll);

    app.get("/feedbacks/course/:courseId", feedbacks.findFeedbacksByCourseId);

    app.get("/feedbacks/:feedbackId", feedbacks.findOne);

    app.put("/feedbacks/:feedbackId", feedbacks.updateFeedback);

    app.delete("/feedbacks/:feedbackId", feedbacks.DeleteFeedback);
};
