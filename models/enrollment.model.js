const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: 'active',  // Assuming 'active' means currently enrolled
        enum: ['active', 'completed', 'cancelled']  // Example statuses
    }
}, {
    timestamps: true  // This adds `createdAt` and `updatedAt` fields automatically
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
module.exports = Enrollment;
