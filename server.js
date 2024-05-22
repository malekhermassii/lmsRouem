// // to import the env
// require("dotenv").config()
// // Import necessary modules
// const express= require("express")
// const app = express();
// const port = 3002;
// const session = require("express-session");
// const config = require("./config");
// const mongoose = require("mongoose");
// const cors = require("cors") 
// const bodyParser = require("body-parser")
// const multer = require("multer"); 
// const path = require("path")
// const User = require("./controllers/user.controller");
// const Course = require("./controllers/course.controller");
// app.use(cors())
// app.use(bodyParser.json({limit :" 1000mb"}))
// app.use(bodyParser.urlencoded({limit :"1000mb" , extended :true }))
// app.use(bodyParser.json())

// // Session configuration
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });
// app.use(express.static('public'));

// const imageStorage = multer.diskStorage({
//     destination: "./public/images", // Make sure this directory exists
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Prefixing with timestamp to avoid name conflicts
//     }
// });
// // rouem.png(12:30:21 2024/01/01())
// const videoStorage = multer.diskStorage({
//     destination:"./public/videos",
//     filename:(req , file , cb)=>{
//         cb(null , Date.now() + path.extname(file.originalname))
//     }
// })

// // Multer configuration for handling image file uploads
// const uploadImage = multer({
//     storage: imageStorage,
//     fileFilter: (req, file, cb) => {
//         if (["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.mimetype)) {
//             cb(null, true); 
//         } else {
//             cb(new Error("Only JPEG, JPG, PNG, and GIF images are allowed!"), false);
//         }
//     }
// });
// const uploadVideo = multer({
//     storage: videoStorage,
//     fileFilter: (req, file, cb) => {
//         // Check if the field name is 'videos'
//         if (file.fieldname === 'videos') {
//             // Allow only specific video formats
//             if (
//                 file.mimetype === 'video/mp4' ||
//                 file.mimetype === 'video/quicktime' ||
//                 file.mimetype === 'video/x-msvideo'
//             ) {
//                 cb(null, true);
//             } else {
//                 cb(new Error('Only mp4, mov, and avi video formats are allowed'));
//             }
//         } else {
//             cb(new Error('Invalid field name for videos'));
//         }
//     }
// });
// // POST route for creating a new user
// app.post('/users', uploadImage.single('image'), User.createUser);
// // const uploadImages = multer({ storage: imageStorage }); 
// // const uploadVideos = multer({ storage: videoStorage }); 

// app.post('/courses', uploadImage.single('image'), uploadVideo.array('videos', 5), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No image uploaded" });
//     }
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: "No video files uploaded" });
//     }

//     // Delegate to controller
//     Course.createCourse(req, res);
// });
// app.post("/logout" , (req, res)=>{
//     // Call the logout function from the controller
//     controller.logout(req, res);
//     // Respond with a success message
//     return res.status(200).json({ message: "Logout successful" });
// });
// // Routes
// require("./routes/admin.route")(app)
// require("./routes/course.route")(app)
// require("./routes/feedback.route")(app)
// require("./routes/user.route")(app)
// require("./routes/enrollment.route")(app)
// require("./routes/test.route")(app)
// // Database connection
// mongoose.connect(process.env.mongoURI )
// .then(()=>{
//     console.log("successfully connect to mongodb")
// })
// .catch((error)=>{
//     console.log("error to connect to database" , error)
// });

// // Root endpoint
// app.get('/' , (req , res)=> {
//     res.send('our LMS is working')
// });

// // Start server
// app.listen(port , ()=> {
//     console.log(`our app is working on port ${port}`)
// });

// Import necessary modules
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3002;
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const User = require("./controllers/user.controller");
const Course = require("./controllers/course.controller");

app.use(cors());
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, './public/images');
        } else if (file.fieldname === 'videos') {
            cb(null, './public/videos');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Prefixing with timestamp to avoid name conflicts
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image') {
            if (["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Only JPEG, JPG, PNG, and GIF images are allowed!"), false);
            }
        } else if (file.fieldname === 'videos') {
            if (["video/mp4", "video/quicktime", "video/x-msvideo"].includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Only mp4, mov, and avi video formats are allowed'), false);
            }
        } else {
            cb(new Error('Unexpected field'));
        }
    }
});
app.post('/users', upload.single('image'), User.createUser);
app.put('/users/:userId', upload.single('image'), User.createUser);

app.post('/courses', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'videos', maxCount: 5 }
]), (req, res) => {
    if (!req.files['image']) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    if (!req.files['videos'] || req.files['videos'].length === 0) {
        return res.status(400).json({ message: "No video files uploaded" });
    }

    Course.createCourse(req, res);
});

app.put('/courses/:courseId', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'videos', maxCount: 5 }
]), (req, res) => {
    if (!req.files['image']) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    if (!req.files['videos'] || req.files['videos'].length === 0) {
        return res.status(400).json({ message: "No video files uploaded" });
    }

    Course.updateCourse(req, res);
});
require("./routes/admin.route")(app)
require("./routes/course.route")(app)
require("./routes/feedback.route")(app)
require("./routes/user.route")(app)
require("./routes/enrollment.route")(app)
require("./routes/test.route")(app)
// Database connection
mongoose.connect(process.env.mongoURI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to database", error);
    });

// Root endpoint
app.get('/', (req, res) => {
    res.send('Our LMS is working');
});

// Start server
app.listen(port, () => {
    console.log(`Our app is working on port ${port}`);
});

