const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                message: "Email and password are required"
            });
        }

        const studentExist = await Student.findOne({ email: req.body.email });

        if (studentExist) {
            return res.status(400).json({ message: "Already have an student with the same email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            isVerified: req.body.isVerified,
            courses: req.body.courses,
            password: hash
        });

        const savedStudent = await student.save();
        res.send(savedStudent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Login
exports.login = (req, res) => {
    const { email, password } = req.body;
    Student.findOne({ email }, (error, student) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
        if (!student) {
            return res.status(404).json({ message: "Student not found with this email" });
        }
        bcrypt.compare(password, student.password, (error, isMatched) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Server Error" });
            }
            if (isMatched) {
                return res.status(200).json({ message: "Authentication successful" });
            } else {
                return res.status(401).json({ message: "Failed authentication" });
            }
        });
    });
};

// Logout
exports.logout = (req, res) => {
    req.session.student = null;
    req.session.isAuthenticated = false;
    res.redirect("/");
    return res.status(200).json({ message: "Logout successful" });
};

// Find all students
exports.findAll = (req, res) => {
    Student.find()
        .then((students) => {
            res.send(students);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

// Find one student by ID
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
        .then((student) => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with this id" + req.params.studentId
                });
            }
            res.send(student);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

// Update student
exports.updateStudent = (req, res) => {
    Student.findByIdAndUpdate(req.params.studentId,
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image : req.body.image,
        isVerified : req.body.isVerified , 
        courses: req.body.courses,
    }, 
    { new: true })
        .then((student) => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with this id" + req.params.studentId
                });
            }
            res.send(student);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

// Delete student
exports.deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.studentId)
        .then((student) => {
            if (!student) {
                return res.status(404).send({
                    message: "Student not found with this id" + req.params.studentId
                });
            }
            res.send({
                message: "Student deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

