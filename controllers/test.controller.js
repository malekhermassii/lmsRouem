const Test = require('../models/test.model');
const Course = require('../models/course.model');

// Create a new test for a course
exports.createTest = async (req, res) => {
    try {
        const { courseId, questions, passingScore } = req.body;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create the test
        const test = new Test({
            course: courseId,
            questions,
            passingScore
        });

        await test.save();

        // Link the test to the course
        course.test = test._id;
        await course.save();

        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Function to get all tests
exports.getAllTests = async (req, res) => {
    try {
      const tests = await Test.find();
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  };
// Get a test by course ID
exports.getTestByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        const test = await Test.findOne({ course: courseId });

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// findOne 
exports.findOne = (req , res)=>{
    // findById
    Test.findById(req.params.testId)
    .then((test)=>{
        if(!test){
            return res.status(404).send({
                message : "test not found with this id"+ req.params.testId
            })
        }
        res.send(test)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
// Update a test by ID
exports.updateTest = async (req, res) => {
    try {
        const { testId } = req.params;
        const { questions, passingScore } = req.body;

        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        test.questions = questions || test.questions;
        test.passingScore = passingScore || test.passingScore;

        await test.save();

        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a test by ID
exports.deleteTest = (req, res) => {
    Test.findByIdAndDelete(req.params.testId)
        .then((test) => {
            if (!test) {
                return res.status(404).send({
                    message: "Test not found with id " + req.params.testId
                });
            }

            // Unlink the test from the course
            return Course.findById(test.course).then((course) => {
                if (course) {
                    course.test = undefined;
                    return course.save();
                }
            }).then(() => {
                res.send({
                    message: "Test deleted successfully"
                });
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};