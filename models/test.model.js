const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

const testSchema = new Schema({
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', required: true 
    },
    questions: [questionSchema],
    passingScore: { type: Number, required: true }
});

module.exports = mongoose.model('Test', testSchema);
