// Import necessary modules
const express = require("express");
const app = express();
const port = 3002;
const session = require("express-session");
const config = require("./config");
const mongoose = require("mongoose");
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

// Config session
app.use(
    session({
        secret: '123456789',
        resave: false,
        saveUninitialized: false
    })
);

app.post("/logout" , (req, res)=>{
    // Call the logout function from the controller
    controller.logout(req, res);
    // Respond with a success message
    return res.status(200).json({ message: "Logout successful" });
});

// Routes
require("./routes/admin.route")(app);
require("./routes/course.route")(app);
require("./routes/feedback.route")(app);
require("./routes/student.route")(app);

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





