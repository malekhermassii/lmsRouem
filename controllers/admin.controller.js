 // Admin , admin
 const Admin = require("../models/admin.model");
 const bcrypt = require("bcryptjs");
 
 exports.createAdmin = async (req, res) => {
     try {
         if (!req.body.email || !req.body.password) {
             return res.status(400).send({
                 message: "Email and password are required"
             });
         }
 
         const adminExist = await Admin.findOne({ email: req.body.email });
 
         if (adminExist) {
             return res.status(400).json({ message: "Already have an admin with the same email" });
         }
         const countAdmins = await Admin.countDocuments();
        //  si countAdmins === 0 donc the role gonna be "super-admin" sinon "admin"
         const role = countAdmins === 0 ? "admin" : "teacher"
         const salt = await bcrypt.genSalt(10) 
         const hash = await bcrypt.hash(req.body.password, salt);
 
         const admin = new Admin({
             username: req.body.username,
             email: req.body.email,
             password: hash,
             role : role,
         });
 
         const savedAdmin = await admin.save();
         res.send(savedAdmin);
     } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Server Error" });
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
            return res.status(200).json({ message: "Authentication successful" });
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
        // Don't send any response here, since the session is destroyed
        // You can optionally log a message indicating successful logout
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
        username : req.body.username ,
        email : req.body.email,
        password : req.body.password
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
