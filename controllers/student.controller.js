const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");

// Create a new student
exports.createStudent = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Email and password are required"
        });
    }
    Student.findOne({ email: req.body.email }, (error, studentExist) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
        if (studentExist) {
            return res.status(400).json({ message: "A student with the same email already exists" });
        }
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Server Error" });
            }
            bcrypt.hash(req.body.password, salt, (error, hash) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Server Error" });
                }
                const student = new Student({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    image : req.file ? req.file.filename : null,
                    isVerified : req.body.isVerified , 
                    courses: req.body.courses,
                });
                student.save()
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: error.message || "Server side error"
                        });
                    });
            });
        });
    });
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
        password: hash,
        image : req.file ? req.file.filename : null,
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

