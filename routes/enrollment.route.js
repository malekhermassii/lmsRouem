const enrollmentController = require("../controllers/enrollment.controller");

module.exports = (app) => {
    app.post('/enroll', enrollmentController.enrollUser); // Correct controller method for enrollment
    app.get('/enroll/check', enrollmentController.checkEnrollment); // To check if user is enrolled
    app.get('/users/:userId/courses', enrollmentController.getUserCourses);
    app.get('/enroll', enrollmentController.getAllEnrollments);
    app.get('/enroll/:enrollId', enrollmentController.getEnrollment);
    app.delete('/enrolls/:enrollId', enrollmentController.DeleteEnrollement);
};
