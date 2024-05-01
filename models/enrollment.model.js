const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports  = mongoose.model('Enrollment', EnrollmentSchema);

