const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: "A user with the same email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: req.file ? req.file.filename : null, // Using ternary to handle cases where no file is uploaded
            // isVerified: req.body.isVerified,
            courses: req.body.courses,
            password: hash
        });

        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            // Check if the user is already verified
            if (!user.isVerified) {
                user.isVerified = true;
                await user.save();
            }
            // 
            // Create a token()
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET, 
                { expiresIn: '24h' } // Token expires in 24 hour
            );
            return res.status(200).json({
                message: "Authentication successful",
                user,
                token
            });
        } else {
            return res.status(401).json({ message: "Failed authentication" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// Logout
exports.logout = (req , res)=>{
    req.session.destroy(error => {
        if(error){
            console.log("logout failed" , error);
            return res.status(500).json({ message: "Logout failed" });
        }
        return res.status(200).json({ message: "Logout successful" });
        console.log("Logout successful");
    });
};
// Find all users
exports.findAll = (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

// Find one user by ID
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with this id" + req.params.userId
                });
            }
            res.send(user);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

// Update user
exports.updateUser = async (req, res) => {
    const { name, email, image } = req.body;
    User.findByIdAndUpdate(req.params.userId, {
        name: name,
        email: email,
        image: image
    }, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with this id " + req.params.userId
                });
            }
            res.send(user);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};


// Delete user
exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with this id" + req.params.userId
                });
            }
            res.send({
                message: "User deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Server side error"
            });
        });
};

