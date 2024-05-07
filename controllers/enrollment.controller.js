const Enrollment = require("../models/enrollment.model");

exports.enrollStudent = async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        // Prevent duplicate enrollments
        const exists = await Enrollment.findOne({ userId, courseId });
        if (exists) {
            return res.status(400).send('Student is already enrolled in this course.');
        }

        const newEnrollment = new Enrollment({
            userId,
            courseId
        });
        await newEnrollment.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(500).json({ message: "Error enrolling user: " + error.message });
    }
};
