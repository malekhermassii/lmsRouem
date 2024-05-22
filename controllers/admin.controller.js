 // Admin , admin
 const Admin = require("../models/admin.model");
 const bcrypt = require("bcryptjs");
 const jwt = require('jsonwebtoken');
 
 exports.createAdmin = async (req, res) => {
     try {
         // Check if required fields are provided
         if (!req.body.email || !req.body.password || !req.body.adminName) {
             return res.status(400).send({
                 message: "Admin name, email, and password are required"
             });
         }
 
         // Check if an admin with the same email already exists
         const adminExist = await Admin.findOne({ email: req.body.email });
         if (adminExist) {
             return res.status(400).json({ message: "An admin with the same email already exists" });
         }
 
         // Determine the role based on the number of existing admins
         const countAdmins = await Admin.countDocuments();
         const role = countAdmins === 0 ? "super-admin" : "admin";
 
         // Generate salt and hash password
         const salt = await bcrypt.genSalt(10);
         const hash = await bcrypt.hash(req.body.password, salt);
 
         // Create new admin object
         const admin = new Admin({
             adminName: req.body.adminName, // Use adminName to populate username
             email: req.body.email,
             password: hash,
             role: role,
         });
 
         // Save admin to database
         const savedAdmin = await admin.save();
         res.send(savedAdmin);
     } catch (error) {
         console.error(error); // Log the actual error object
         res.status(500).json({ message: "Server Error", error: error.message }); // Send error message back to client
     }
 };
 
 exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found with this email" });
        }

        const isMatched = await bcrypt.compare(password, admin.password);

        if (isMatched) {
            // Check if the admin is already verified
            if (!admin.isVerified) {
                admin.isVerified = true;
                await admin.save();
            }
            // 
            // Create a token()
            const token = jwt.sign(
                { adminId: admin._id, email: admin.email },
                process.env.JWT_SECRET, 
                { expiresIn: '24h' } // Token expires in 24 hour
            );
            return res.status(200).json({
                message: "Authentication successful",
                admin,
                token
            });
        } else {
            return res.status(401).json({ message: "Failed authentication" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
// logout
// controller: 
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

exports.findAll = (req , res)=>{
    // find
    Admin.find()
    .then((admins)=>{
        res.send(admins)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
// findOne 
exports.findOne = (req , res)=>{
    // findById
    Admin.findById(req.params.adminId)
    .then((admin)=>{
        if(!admin){
            return res.status(404).send({
                message : "admin not found with this id"+ req.params.adminId
            })
        }
        res.send(admin)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
// update 
exports.UpdateAdmin = (req , res)=>{
    Admin.findByIdAndUpdate(req.params.adminId , { 
        adminName : req.body.adminName ,
        email : req.body.email,
        password : req.body.password,
        role: req.body.role
    } , 
    { new : true})
    .then((admin)=>{
        if(!admin){
            return res.status(404).send({
                message : "admin not found with this id "+ req.params.adminId
            })
        }
        res.send(admin)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
// delete
exports.DeleteAdmin = (req , res)=>{
    Admin.findByIdAndDelete(req.params.adminId)
    .then((admin)=>{
        if(!admin){
            return res.status(404).send({
                message : " admin not found with this id" + req.params.adminId
            })
        }
        res.send({ 
            message : "admin deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
