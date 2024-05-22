module.exports = (app) => {
    const test = require('../controllers/test.controller');

// Create a test
app.post('/tests', test.createTest);
// get All
app.get('/tests', test.getAllTests);
// get One
app.get('/tests/:testId', test.findOne);

// Get a test by course ID
app.get('/tests/course/:courseId', test.getTestByCourseId);

// Update a test by ID
app.put('/tests/:testId', test.updateTest);

// Delete a test by ID
app.delete('/tests/:testId', test.deleteTest);
};
