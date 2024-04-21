// Import necessary modules
const express = require("express");
const app = express();
const port = 3002;
const session = require("express-session");
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors") 
const bodyParser = require("body-parser")
const multer = require("multer");
const path = require("path")
const Student = require("./models/student.model");
// storage setting up
const imageStorage = multer.diskStorage({
    destination:"./public/images",
    filename:(req , file , cb)=>{
        cb(null , Date.now() + path.extname(file.originalname))
    }
})
// rouem.png(12:30:21 2024/01/01())
const videoStorage = multer.diskStorage({
    destination:"./public/videos",
    filename:(req , file , cb)=>{
        cb(null , Date.now() + path.extname(file.originalname))
    }
})
const uploadImage = multer({
    storage: imageStorage,
    fileFilter:(req, file , cb)=>{
        // jpeg , jpg , png , gif
        if(
            file.mimetype =="image/jpeg"||
            file.mimetype =="image/jpg"||
            file.mimetype =="image/png"||
            file.mimetype =="image/gif"

        ){
            cb(null , true)
        }
        else{
            cb(new Error("only jpeg , jpg , png and gif images are allowed"))
        }
    }
})
const uploadVideo = multer({
    storage: videoStorage,
    fileFilter:(req, file , cb)=>{
        // jpeg , jpg , png , gif
        if(
            file.mimetype =="image/mp4"||
            file.mimetype =="image/quicktime"||
            file.mimetype =="image/x-msvideo"
        ){
            cb(null , true)
        }
        else{
            cb(new Error("only mp4 , mov , avi videos are allowed"))
        }
    }
})
app.post('/student/image' , (req , res)=>{
    uploadImage(req, res , function (error){
        if(error){
            console.error(error);
            return res.status(400).json({message : error.message})
        }
        const file = req.file ; 
        if(!file){
            return res.status(400).json({message : "no file uploaded"})
        }
        const data = {
            image : file.filename,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isVerified : req.body.isVerified , 
            courses: req.body.courses,
        };
        Student.create(data)
        .then((done)=>{
            res.redirect("/students")
        })
        .catch((error)=>{
            res.status(500).json({message : "error while adding the student image"})
        })
    })
})

app.use(cors())
app.use(bodyParser.json({limit :" 100mb"}))
app.use(bodyParser.urlencoded({limit :"100mb" , extended :true }))
app.use(bodyParser.json())
// Session configuration
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: false
}));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.post("/logout" , (req, res)=>{
    // Call the logout function from the controller
    controller.logout(req, res);
    // Respond with a success message
    return res.status(200).json({ message: "Logout successful" });
});
// Routes
require("./routes/admin.route")(app)
require("./routes/course.route")(app)
require("./routes/feedback.route")(app)
require("./routes/student.route")(app)
// Database connection
mongoose.connect(config.mongoURI )
.then(()=>{
    console.log("successfully connect to mongodb")
})
.catch((error)=>{
    console.log("error to connect to database" , error)
});

// Root endpoint
app.get('/' , (req , res)=> {
    res.send('our LMS is working')
});

// Start server
app.listen(port , ()=> {
    console.log(`our app is working on port ${port}`)
});









