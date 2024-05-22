const Enrollment = require("../models/enrollment.model");
// const Course = require("../models/course.model");
const Course =  require("../models/course.model");
const User =  require("../models/user.model");
exports.checkEnrollment = async (req, res) => {
    const { userId, courseId } = req.query;
    try {
        const enrollment = await Enrollment.findOne({ userId, courseId, status: 'active' });
        // The response explicitly states whether the user is enrolled or not
        res.status(200).json({ isEnrolled: !!enrollment });
    } catch (error) {
        console.error("Error checking enrollment:", error);
        res.status(500).json({ message: "Error checking enrollment: " + error.message });
    }
};

exports.enrollUser = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        // Check for existing enrollment to prevent duplicates
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(409).json({ message: "User is already enrolled in this course." });
        }

        // Check if user and course exist
        const userExists = await User.findById(userId);
        const courseExists = await Course.findById(courseId);
        if (!userExists || !courseExists) {
            return res.status(404).json({ message: "User or course not found." });
        }

        const newEnrollment = new Enrollment({ userId, courseId });
        await newEnrollment.save();
        return res.status(201).json(newEnrollment);
    } catch (error) {
        console.error("Enrollment Error:", error);
        return res.status(500).json({ message: "Error enrolling user: " + error.message });
    }
};

// Enrollment Controller

exports.getUserCourses = async (req, res) => {
    try {
        const userId = req.params.userId; // or req.user._id if using authentication middleware
        const enrollments = await Enrollment.find({ userId }).populate('courseId');
        const courses = enrollments.map(enrollment => enrollment.courseId);
        res.json(courses);
    } catch (error) {
        console.error("Error retrieving user courses:", error);
        res.status(500).json({ message: "Error retrieving user courses: " + error.message });
    }
};
exports.getAllEnrollments = async (req, res) => {
    Enrollment.find()
    .then((enrollements)=>{
        res.send(enrollements)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
};

exports.DeleteEnrollement = (req , res)=>{
    Enrollment.findByIdAndDelete(req.params.enrollId)
    .then((enroll)=>{
        if(!enroll){
            return res.status(404).send({
                message : " enroll not found with this id" + req.params.enrollId
            })
        }
        res.send({ 
            message : "enroll deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
exports.getEnrollment = async (req, res) => {
    try {
        const enrollId = req.params.enrollId;
        const enrollment = await Enrollment.findById(enrollId).populate('courseId')
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found." });
        }
        res.send(enrollment);
    } catch (error) {
        console.error("Error retrieving enrollment:", error);
        res.status(500).json({ message: "Error retrieving enrollment: " + error.message });
    }
};
